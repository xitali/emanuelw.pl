import { readFile } from "node:fs/promises";
import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("Ustaw TURSO_DATABASE_URL i TURSO_AUTH_TOKEN.");
}

const client = createClient({ url, authToken });
const sql = await readFile(
  new URL("../migrations/001_security_and_analytics.sql", import.meta.url),
  "utf8",
);

for (const statement of sql
  .split(";")
  .map((value) => value.trim())
  .filter(Boolean)) {
  await client.execute(statement);
}

await client.close();
console.log("Migracja bazy zakończona.");
