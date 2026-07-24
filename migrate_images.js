const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const turso = createClient({
  url: 'libsql://***REMOVED_TURSO_URL***',
  authToken: '***REMOVED_JWT_TOKEN***'
});

const PUBLIC_PROJECTS_DIR = path.join(__dirname, 'public', 'projects');

if (!fs.existsSync(PUBLIC_PROJECTS_DIR)) {
  fs.mkdirSync(PUBLIC_PROJECTS_DIR, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image, status code: ${res.statusCode}`));
        return;
      }
      
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching projects...');
  const result = await turso.execute('SELECT id, title, images FROM projects');
  
  for (const row of result.rows) {
    const id = row.id;
    const title = row.title;
    
    let images = [];
    try {
      images = JSON.parse(row.images);
    } catch (e) {
      console.log(`Failed to parse images for ${title}, skipping.`);
      continue;
    }
    
    if (!Array.isArray(images) || images.length === 0) continue;
    
    let localImagePaths = [];
    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      if (!url.startsWith('http')) {
        // already local
        localImagePaths.push(url);
        continue;
      }
      
      try {
        const ext = url.split('.').pop().split('?')[0].split('#')[0] || 'jpg';
        const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext.toLowerCase()) ? ext.toLowerCase() : 'jpg';
        const filename = `${id}_${i}.${safeExt}`;
        const dest = path.join(PUBLIC_PROJECTS_DIR, filename);
        
        console.log(`Downloading ${url} to ${filename}...`);
        await downloadImage(url, dest);
        localImagePaths.push(`/projects/${filename}`);
      } catch (err) {
        console.error(`Error downloading ${url}:`, err.message);
        localImagePaths.push(url); // keep original if failed
      }
    }
    
    if (localImagePaths.length > 0) {
      console.log(`Updating DB for ${title}...`);
      await turso.execute({
        sql: 'UPDATE projects SET images = ? WHERE id = ?',
        args: [JSON.stringify(localImagePaths), id]
      });
    }
  }
  
  console.log('Migration complete!');
}

run().catch(console.error);
