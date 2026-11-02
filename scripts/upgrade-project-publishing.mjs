import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { createClient } from "@libsql/client";

function slugify(value) {
  return value.replace(/[łŁ]/g, "l").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "projekt";
}

export async function upgradePublishing(client) {
  const tx = await client.transaction("write");
  try {
    const columns = (await tx.execute("PRAGMA table_info(projects)")).rows;
    for (const [name, type] of [["slug", "TEXT"], ["is_published", "INTEGER NOT NULL DEFAULT 1"], ["sort_order", "INTEGER NOT NULL DEFAULT 0"]]) {
      if (!columns.some(column => column.name === name)) await tx.execute(`ALTER TABLE projects ADD COLUMN ${name} ${type}`);
    }
    const rows = (await tx.execute("SELECT id,title,slug FROM projects ORDER BY created_at,id")).rows;
    const used = new Set(rows.filter(row => row.slug).map(row => row.slug));
    for (const row of rows) {
      if (row.slug) continue;
      const base = slugify(String(row.title));
      let slug = base, suffix = 2;
      while (used.has(slug)) slug = `${base}-${suffix++}`;
      used.add(slug);
      await tx.execute({ sql: "UPDATE projects SET slug = ? WHERE id = ?", args: [slug, row.id] });
    }
    await tx.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug) WHERE slug IS NOT NULL");
    await tx.execute("CREATE TABLE IF NOT EXISTS schema_migrations (filename TEXT PRIMARY KEY, applied_at TEXT NOT NULL)");
    await tx.execute({ sql: "INSERT OR IGNORE INTO schema_migrations VALUES (?, ?)", args: ["006_project_publishing.sql", new Date().toISOString()] });
    await tx.commit();
    return rows.length;
  } catch (error) { await tx.rollback(); throw error; }
  finally { tx.close(); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!process.argv.includes("--apply")) throw new Error("Uruchom z --apply po wykonaniu kopii danych projektów.");
  // Confirm the checked-in migration exists before touching the database.
  await readFile(new URL("../migrations/006_project_publishing.sql", import.meta.url), "utf8");
  const client = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
  try { console.log(`Publishing upgrade complete: ${await upgradePublishing(client)} projects.`); }
  finally { client.close(); }
}
