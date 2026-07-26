import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("Brak połączenia z Turso.");
}

const client = createClient({ url, authToken });
const migration = await client.execute({
  sql: "SELECT filename FROM schema_migrations WHERE filename = ?",
  args: ["003_push_subscriptions.sql"],
});
const subscriptions = await client.execute(
  "SELECT COUNT(1) AS count FROM push_subscriptions",
);
await client.close();

console.log(
  JSON.stringify({
    migrationApplied: migration.rows.length === 1,
    subscriptions: Number(subscriptions.rows[0]?.count || 0),
  }),
);
