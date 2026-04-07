export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_IMAGES_API_TOKEN;

  if (!accountId || !apiToken) {
    return res.status(500).json({ error: 'Cloudflare credentials not configured' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    return res.status(400).json({ error: 'Content-Type must be multipart/form-data' });
  }

  // Read raw request body
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks);

  // Forward to Cloudflare Images API
  const cfResponse = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': contentType,
      },
      body,
    }
  );

  const cfData = await cfResponse.json();

  if (!cfResponse.ok || !cfData.success) {
    const message =
      cfData.errors && cfData.errors.length > 0
        ? cfData.errors[0].message
        : 'Upload to Cloudflare failed';
    // Forward the original HTTP status so client errors (4xx) are not reported as 500
    const status = cfResponse.status >= 400 && cfResponse.status < 500 ? cfResponse.status : 500;
    return res.status(status).json({ error: message });
  }

  const variants = cfData.result.variants || [];
  const imageUrl =
    variants.find((v) => v.endsWith('/public')) || variants[0] || '';

  return res.status(200).json({ url: imageUrl });
}
