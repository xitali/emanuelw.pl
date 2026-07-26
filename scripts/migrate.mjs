import { readdir, readFile } from "node:fs/promises";
import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("Ustaw TURSO_DATABASE_URL i TURSO_AUTH_TOKEN.");
}

const client = createClient({ url, authToken });
const migrationsDirectory = new URL("../migrations/", import.meta.url);

await client.execute(`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    filename TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL
  )
`);

const files = (await readdir(migrationsDirectory))
  .filter((filename) => filename.endsWith(".sql"))
  .sort();

for (const filename of files) {
  const existing = await client.execute({
    sql: "SELECT 1 FROM schema_migrations WHERE filename = ? LIMIT 1",
    args: [filename],
  });
  if (existing.rows.length > 0) continue;

  const sql = await readFile(new URL(filename, migrationsDirectory), "utf8");
  const statements = sql
    .split(";")
    .map((value) => value.trim())
    .filter(Boolean);

  await client.batch(
    [
      ...statements,
      {
        sql: "INSERT INTO schema_migrations (filename, applied_at) VALUES (?, ?)",
        args: [filename, new Date().toISOString()],
      },
    ],
    "write",
  );
}

await client.close();
console.log(`Migracje bazy zakończone (${files.length} plików).`);
