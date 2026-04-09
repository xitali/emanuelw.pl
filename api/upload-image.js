import { createHmac, createHash, randomBytes } from 'node:crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ALLOWED_EXTENSIONS = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function hmacSha256(key, data) {
  return createHmac('sha256', key).update(data).digest();
}

function sha256Hex(data) {
  return createHash('sha256').update(data).digest('hex');
}

function getSigningKey(secretAccessKey, date, region, service) {
  const kDate = hmacSha256(`AWS4${secretAccessKey}`, date);
  const kRegion = hmacSha256(kDate, region);
  const kService = hmacSha256(kRegion, service);
  return hmacSha256(kService, 'aws4_request');
}

async function putToR2({ accountId, accessKeyId, secretAccessKey, bucket, key, body, contentType }) {
  const region = 'auto';
  const service = 's3';
  const jurisdiction = process.env.R2_JURISDICTION ? `${process.env.R2_JURISDICTION}.` : '';
  const host = `${accountId}.${jurisdiction}r2.cloudflarestorage.com`;

  const now = new Date();
  const iso = now.toISOString(); // "2026-04-07T20:40:07.184Z"
  const date = iso.slice(0, 10).replace(/-/g, ''); // "20260407"
  const datetime = date + 'T' + iso.slice(11, 19).replace(/:/g, '') + 'Z'; // "20260407T204007Z"

  const bodyHash = sha256Hex(body);
  const canonicalUri = `/${bucket}/${encodeURIComponent(key).replace(/%2F/g, '/')}`;

  const headersToSign = {
    'content-type': contentType,
    'host': host,
    'x-amz-content-sha256': bodyHash,
    'x-amz-date': datetime,
  };

  const sortedKeys = Object.keys(headersToSign).sort();
  const canonicalHeaders = sortedKeys.map(k => `${k}:${headersToSign[k]}\n`).join('');
  const signedHeaders = sortedKeys.join(';');

  const canonicalRequest = [
    'PUT',
    canonicalUri,
    '', // empty query string
    canonicalHeaders,
    signedHeaders,
    bodyHash,
  ].join('\n');

  const credentialScope = `${date}/${region}/${service}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    datetime,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join('\n');

  const signingKey = getSigningKey(secretAccessKey, date, region, service);
  const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  const authorization =
    `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return fetch(`https://${host}${canonicalUri}`, {
    method: 'PUT',
    headers: {
      Authorization: authorization,
      'Content-Type': contentType,
      'x-amz-content-sha256': bodyHash,
      'x-amz-date': datetime,
    },
    body,
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Require a secret upload token to prevent unauthorized uploads
  const uploadSecret = process.env.UPLOAD_SECRET;
  if (uploadSecret) {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.toLowerCase().startsWith('bearer ') ? authHeader.slice(7) : '';
    if (token !== uploadSecret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    return res.status(500).json({ error: 'R2 credentials not configured' });
  }

  if (!publicUrl) {
    return res.status(500).json({ error: 'R2_PUBLIC_URL not configured' });
  }

  const rawContentType = req.headers['content-type'] || '';
  const contentType = rawContentType.split(';')[0].trim();

  if (!ALLOWED_EXTENSIONS[contentType]) {
    return res.status(400).json({ error: 'Dozwolone formaty: JPG, PNG, WebP, GIF' });
  }

  // Read raw body with size guard
  const chunks = [];
  let totalSize = 0;
  for await (const chunk of req) {
    totalSize += chunk.length;
    if (totalSize > MAX_FILE_SIZE) {
      return res.status(400).json({ error: 'Maksymalny rozmiar pliku to 10 MB' });
    }
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks);

  // Build a unique, filesystem-safe key derived from the content-type (not user filename)
  const ext = ALLOWED_EXTENSIONS[contentType];
  const key = `${Date.now()}-${randomBytes(8).toString('hex')}.${ext}`;

  const r2Response = await putToR2({
    accountId,
    accessKeyId,
    secretAccessKey,
    bucket,
    key,
    body,
    contentType,
  });

  if (!r2Response.ok) {
    const errorText = await r2Response.text();
    console.error('R2 upload error:', r2Response.status, errorText);
    const status = r2Response.status >= 400 && r2Response.status < 500 ? r2Response.status : 500;
    return res.status(status).json({ error: 'Upload do R2 nie powiódł się' });
  }

  const imageUrl = `${publicUrl.replace(/\/$/, '')}/${key}`;
  return res.status(200).json({ url: imageUrl });
}
