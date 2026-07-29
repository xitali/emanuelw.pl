import { readFile, writeFile } from "node:fs/promises";
import webpush from "web-push";

const envPath = new URL("../.env.local", import.meta.url);
const current = await readFile(envPath, "utf8").catch(() => "");
const hasPublicKey = /^NEXT_PUBLIC_VAPID_PUBLIC_KEY=.+$/m.test(current);
const hasPrivateKey = /^VAPID_PRIVATE_KEY=.+$/m.test(current);

if (hasPublicKey !== hasPrivateKey) {
  throw new Error(
    "W .env.local znajduje się tylko jeden klucz VAPID. Usuń niepełny wpis i uruchom skrypt ponownie.",
  );
}

if (hasPublicKey && hasPrivateKey) {
  console.log("Klucze Web Push są już skonfigurowane w .env.local.");
  process.exit(0);
}

const keys = webpush.generateVAPIDKeys();
const separator = current.length > 0 && !current.endsWith("\n") ? "\n" : "";
const addition = [
  `${separator}NEXT_PUBLIC_VAPID_PUBLIC_KEY=${keys.publicKey}`,
  `VAPID_PRIVATE_KEY=${keys.privateKey}`,
  "VAPID_SUBJECT=mailto:kontakt@emanuelwloch.pl",
  "",
].join("\n");

await writeFile(envPath, current + addition, {
  encoding: "utf8",
  mode: 0o600,
});

console.log(
  "Wygenerowano klucze Web Push i zapisano je bezpiecznie w .env.local.",
);
