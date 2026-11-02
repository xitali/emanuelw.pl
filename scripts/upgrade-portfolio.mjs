import { createClient } from "@libsql/client";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { upgradePublishing } from "./upgrade-project-publishing.mjs";

export async function upgradePortfolio(client) {
  await upgradePublishing(client);
  for (const filename of ["007_email_outbox.sql", "008_project_media.sql", "009_conversion_events.sql"]) {
    if ((await client.execute({ sql: "SELECT 1 FROM schema_migrations WHERE filename = ?", args: [filename] })).rows.length) continue;
    const statements = (await readFile(new URL(`../migrations/${filename}`, import.meta.url), "utf8")).split(";").map(value => value.trim()).filter(Boolean);
    await client.batch([...statements, { sql: "INSERT INTO schema_migrations VALUES (?, ?)", args: [filename, new Date().toISOString()] }], "write");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!process.argv.includes("--apply")) throw new Error("Wykonaj kopię danych i uruchom z --apply.");
  const client = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
  try { await upgradePortfolio(client); console.log("Portfolio migrations complete."); }
  finally { client.close(); }
}
