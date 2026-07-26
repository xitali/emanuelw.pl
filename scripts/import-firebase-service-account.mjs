import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const serviceAccountPath = process.argv[2];

if (!serviceAccountPath) {
  console.error(
    "Użycie: npm run firebase:import -- C:\\sciezka\\service-account.json",
  );
  process.exit(1);
}

const expectedProjectId = "emanuel-admin";
const source = JSON.parse(
  await readFile(resolve(serviceAccountPath), { encoding: "utf8" }),
);

if (
  source.type !== "service_account" ||
  source.project_id !== expectedProjectId ||
  typeof source.client_email !== "string" ||
  typeof source.private_key !== "string"
) {
  throw new Error(
    `Nieprawidłowy klucz Firebase. Oczekiwano projektu ${expectedProjectId}.`,
  );
}

const envPath = resolve(".env.local");
let envText = "";

try {
  envText = await readFile(envPath, { encoding: "utf8" });
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const values = {
  FIREBASE_PROJECT_ID: source.project_id,
  FIREBASE_CLIENT_EMAIL: source.client_email,
  FIREBASE_PRIVATE_KEY_BASE64: Buffer.from(source.private_key, "utf8").toString(
    "base64",
  ),
};

for (const [name, value] of Object.entries(values)) {
  const line = `${name}=${value}`;
  const pattern = new RegExp(`^${name}=.*$`, "m");

  if (pattern.test(envText)) {
    envText = envText.replace(pattern, line);
  } else {
    envText = `${envText.trimEnd()}\n${line}\n`;
  }
}

await writeFile(envPath, envText, {
  encoding: "utf8",
  mode: 0o600,
});

console.log(
  "Klucz Firebase został zapisany w ignorowanym pliku .env.local. Żadna wartość sekretu nie została wyświetlona.",
);
