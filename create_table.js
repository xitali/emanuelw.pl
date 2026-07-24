const { createClient } = require('@libsql/client');
const turso = createClient({
  url: 'libsql://***REMOVED_TURSO_URL***',
  authToken: '***REMOVED_JWT_TOKEN***'
});

turso.execute(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    company TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    is_published INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).then(() => {
  console.log('Table created successfully');
}).catch(console.error);
