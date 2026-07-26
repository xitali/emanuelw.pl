import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("Ustaw TURSO_DATABASE_URL i TURSO_AUTH_TOKEN.");
}

const client = createClient({ url, authToken });
const now = new Date().toISOString();

await client.batch(
  [
    {
      sql: `UPDATE projects
            SET project_url = ?, updated_at = ?
            WHERE id = ?`,
      args: [
        "https://sercemototrasy.pl",
        now,
        "2c00a565-5ac0-4735-a0e5-47f1a4d806c7",
      ],
    },
    {
      sql: `UPDATE projects
            SET technologies = ?, frontend_technologies = ?,
                backend_technologies = ?, tools_and_services = ?,
                detailed_description = ?, innovation = ?,
                project_result = ?, performance_metrics = ?,
                success_metrics = ?, updated_at = ?
            WHERE id = ?`,
      args: [
        JSON.stringify([
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Turso (libSQL)",
          "Tailwind CSS v4",
          "Framer Motion",
          "Zod",
          "Recharts",
          "Vercel",
        ]),
        JSON.stringify([
          "Next.js 16 App Router",
          "React 19",
          "TypeScript",
          "Tailwind CSS v4",
          "Framer Motion",
          "Recharts",
        ]),
        JSON.stringify([
          "Turso (libSQL)",
          "Next.js Server Actions",
          "Next.js Route Handlers",
          "JOSE",
          "bcrypt",
          "Zod",
        ]),
        JSON.stringify([
          "Turso Database",
          "Vercel",
          "Vercel Blob",
          "Lucide Icons",
          "Dedykowany CMS",
          "Vitest",
          "GitHub Actions",
        ]),
        "Portfolio i panel CMS zbudowane w Next.js 16 i React 19. Aplikacja prezentuje projekty, usługi i opinie, obsługuje formularz kontaktowy, bezpieczne logowanie administratora, zarządzanie treścią, trwałe pliki oraz anonimowe statystyki odsłon.",
        "Połączenie Server Components i Server Actions z bazą Turso, walidacją Zod, trwałym ograniczaniem liczby żądań i panelem administracyjnym.",
        "Responsywne portfolio z publicznymi case studies, formularzem kontaktowym oraz panelem CMS.",
        JSON.stringify([]),
        JSON.stringify([
          "Responsywny interfejs",
          "Dostępność klawiaturą",
          "Automatyczna walidacja w CI",
        ]),
        now,
        "5187fe58-43e9-46a8-aba5-7016acfbc55a",
      ],
    },
    {
      sql: `UPDATE projects
            SET tools_and_services = ?, updated_at = ?
            WHERE id = ?`,
      args: [
        JSON.stringify([
          "Google Maps API",
          "Google Fonts (Montserrat, Poppins)",
          "Font Awesome 6.5.2",
        ]),
        now,
        "fe49066a-9990-453d-b368-8f72df1e414a",
      ],
    },
    {
      sql: `UPDATE projects
            SET performance_metrics = ?, updated_at = ?
            WHERE id = ?`,
      args: [
        JSON.stringify([
          "Optymalizacja bundla z Vite",
          "Lazy loading komponentów",
          "Efektywne zapytania do Supabase",
        ]),
        now,
        "ecca3780-0d01-489a-a240-a19e632c3a65",
      ],
    },
    {
      sql: `UPDATE services
            SET description = ?, features = ?, updated_at = ?
            WHERE id = ?`,
      args: [
        "Pomagam utrzymać stabilność aplikacji: monitoruję dostępność, planuję aktualizacje zależności, analizuję incydenty i dobieram skalowanie do rzeczywistego ruchu. Zakres oraz czas reakcji ustalamy przed rozpoczęciem współpracy.",
        JSON.stringify([
          "Monitoring dostępności",
          "Plan kopii zapasowych",
          "Aktualizacje bezpieczeństwa",
          "Analiza wydajności",
          "Raportowanie i uzgodniony czas reakcji",
        ]),
        now,
        "68561921-fb1d-4e02-ac39-f094faec52ca",
      ],
    },
    {
      sql: `UPDATE services
            SET features = ?, updated_at = ?
            WHERE id = ?`,
      args: [
        JSON.stringify([
          "Audyt wydajności",
          "Odświeżenie interfejsu",
          "Redukcja długu technologicznego",
          "Poprawa bezpieczeństwa",
          "Optymalizacja zapytań do bazy",
        ]),
        now,
        "91af5810-355b-4553-ba01-331438f9859a",
      ],
    },
  ],
  "write",
);

await client.close();
console.log("Dane produkcyjne zostały poprawione.");
