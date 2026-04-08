/**
 * scripts/seed-turso.mjs
 *
 * Populates the Turso (libSQL) database for emanuelw.pl with:
 *   - Schema (tables + indexes, idempotent)
 *   - Site settings (personal info, social links)
 *   - Services
 *   - Projects
 *   - Admin user (credentials printed to stdout)
 *
 * Usage:
 *   node scripts/seed-turso.mjs
 *
 * Required env vars (reads from .env automatically):
 *   VITE_TURSO_DB_URL       – libsql:// URL of the Turso database
 *   VITE_TURSO_AUTH_TOKEN   – Turso auth token
 *
 * Optional env vars:
 *   SEED_ADMIN_EMAIL        – Admin e-mail    (default: admin@emanuelw.pl)
 *   SEED_ADMIN_PASSWORD     – Admin password  (default: randomly generated)
 */

import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { randomUUID } from 'crypto';

// ── Load .env ──────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');

if (existsSync(envPath)) {
  const lines = readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!(key in process.env)) process.env[key] = val;
  }
}

// ── Config ─────────────────────────────────────────────────────────────────────

const DB_URL   = process.env.VITE_TURSO_DB_URL;
const DB_TOKEN = process.env.VITE_TURSO_AUTH_TOKEN;

if (!DB_URL) {
  console.error('❌  VITE_TURSO_DB_URL is not set. Add it to .env or export it.');
  process.exit(1);
}

const client = createClient({ url: DB_URL, authToken: DB_TOKEN });
const uuid  = () => randomUUID();
const now   = () => new Date().toISOString();
const json  = (v) => JSON.stringify(v ?? []);

// ── Schema ─────────────────────────────────────────────────────────────────────

const schemaPath = join(__dirname, '..', 'turso-schema.sql');
const schema     = readFileSync(schemaPath, 'utf-8');

async function runSchema() {
  console.log('📐  Applying schema…');
  // Strip comment lines, then split on statement boundaries and filter blanks
  const statements = schema
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n')
    .split(';')
    .map(s => s.trim())
    .filter(s => s);
  for (const stmt of statements) {
    await client.execute(stmt);
  }
  console.log('✅  Schema ready.');
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const ALLOWED_TABLES = new Set(['site_settings', 'services', 'projects', 'admin_users', 'contact_messages', 'page_visits']);

async function count(table) {
  if (!ALLOWED_TABLES.has(table)) throw new Error(`Unknown table: ${table}`);
  const rs = await client.execute(`SELECT COUNT(*) AS n FROM ${table}`);
  return Number(rs.rows[0].n);
}

// ── Seed: Site Settings ────────────────────────────────────────────────────────

const SETTINGS = [
  // Personal info
  { key: 'personal_first_name',  value: 'Emanuel',          type: 'text',  desc: 'Imię' },
  { key: 'personal_last_name',   value: 'Włoch',            type: 'text',  desc: 'Nazwisko' },
  { key: 'personal_email',       value: 'kontakt@emanuelw.pl', type: 'email', desc: 'Adres e-mail' },
  { key: 'personal_phone',       value: '+48 000 000 000',  type: 'text',  desc: 'Numer telefonu' },
  { key: 'personal_title',       value: 'Full-Stack Developer', type: 'text', desc: 'Tytuł zawodowy' },
  { key: 'personal_bio',
    value: 'Pasjonat technologii z doświadczeniem w tworzeniu nowoczesnych aplikacji webowych i desktopowych. Specjalizuję się w React, Node.js i TypeScript.',
    type: 'textarea', desc: 'Krótki opis' },
  // Contact
  { key: 'contact_address',      value: 'Polska',           type: 'text',  desc: 'Adres / lokalizacja' },
  { key: 'contact_availability', value: 'Dostępny na zlecenia', type: 'text', desc: 'Dostępność' },
  // Social
  { key: 'social_github',    value: 'https://github.com/xitali',               type: 'url', desc: 'GitHub' },
  { key: 'social_linkedin',  value: 'https://linkedin.com/in/emanuelwloch',    type: 'url', desc: 'LinkedIn' },
  { key: 'social_instagram', value: '',                                         type: 'url', desc: 'Instagram' },
  { key: 'social_facebook',  value: '',                                         type: 'url', desc: 'Facebook' },
  // Site meta
  { key: 'site_title',       value: 'Emanuel Włoch – Portfolio', type: 'text', desc: 'Tytuł strony' },
  { key: 'site_description', value: 'Portfolio programisty Full-Stack – React, Node.js, TypeScript', type: 'text', desc: 'Opis strony' },
];

async function seedSettings() {
  const existing = await count('site_settings');
  if (existing > 0) {
    console.log(`⏩  site_settings already has ${existing} rows – skipping.`);
    return;
  }
  console.log('⚙️   Seeding site_settings…');
  for (const s of SETTINGS) {
    await client.execute({
      sql: `INSERT OR IGNORE INTO site_settings (id, setting_key, setting_value, setting_type, description, updated_at)
            VALUES (?,?,?,?,?,?)`,
      args: [uuid(), s.key, s.value, s.type, s.desc, now()],
    });
  }
  console.log(`✅  Inserted ${SETTINGS.length} settings.`);
}

// ── Seed: Services ─────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: 'Strona internetowa',
    short_description: 'Nowoczesna, responsywna strona wizytówkowa lub firmowa.',
    description: 'Projektuję i wdrażam strony internetowe dostosowane do potrzeb klienta – od prostych wizytówek po rozbudowane portale. Każda strona jest w pełni responsywna i zoptymalizowana pod SEO.',
    icon: 'Globe',
    features: ['Responsywny design (mobile-first)', 'Optymalizacja SEO', 'Panel administracyjny CMS', 'Integracja z Google Analytics', 'Certyfikat SSL'],
    price_from: 800,
    order_index: 1,
  },
  {
    title: 'Aplikacja webowa',
    short_description: 'Zaawansowana aplikacja webowa z backendem i bazą danych.',
    description: 'Tworzę kompleksowe aplikacje webowe z architekturą full-stack: React/TypeScript na froncie, Node.js/Express lub Next.js na backendzie oraz PostgreSQL lub SQLite jako bazą danych.',
    icon: 'Code',
    features: ['React + TypeScript', 'REST API / GraphQL', 'Autentykacja i autoryzacja', 'Integracje zewnętrzne API', 'Wdrożenie na chmurze'],
    price_from: 2500,
    order_index: 2,
  },
  {
    title: 'Aplikacja desktopowa',
    short_description: 'Natywna lub cross-platformowa aplikacja desktopowa.',
    description: 'Projektuję aplikacje desktopowe na Windows, macOS i Linux przy użyciu technologii Electron lub Tauri. Pozwala to na stworzenie wydajnego narzędzia z interfejsem webowym.',
    icon: 'Zap',
    features: ['Windows / macOS / Linux', 'Electron lub Tauri', 'Integracja z systemem plików', 'Automatyczne aktualizacje', 'Instalator dla klienta'],
    price_from: 3000,
    order_index: 3,
  },
  {
    title: 'Sklep internetowy',
    short_description: 'E-commerce z obsługą płatności i zarządzaniem produktami.',
    description: 'Buduję sklepy internetowe z integracją płatności (Stripe, PayU, Przelewy24), koszykiem, panelem zamówień oraz systemem zarządzania produktami.',
    icon: 'Star',
    features: ['Integracja płatności (Stripe/PayU)', 'Koszyk i zamówienia', 'Panel produktów', 'Faktury PDF', 'Integracja z kurierami'],
    price_from: 3500,
    order_index: 4,
  },
  {
    title: 'Redesign / Optymalizacja',
    short_description: 'Modernizacja istniejącej strony lub aplikacji.',
    description: 'Przeprowadzam audyt i modernizację istniejących projektów: usprawnienie wydajności, odświeżenie wyglądu (UI/UX), refaktoring kodu oraz migrację do nowszych technologii.',
    icon: 'Palette',
    features: ['Audyt wydajności (Core Web Vitals)', 'Modernizacja UI/UX', 'Refaktoring kodu', 'Migracja technologii', 'Raport po optymalizacji'],
    price_from: 500,
    order_index: 5,
  },
  {
    title: 'Wsparcie i utrzymanie',
    short_description: 'Opieka techniczna nad Twoją stroną lub aplikacją.',
    description: 'Świadczę usługi utrzymania i wsparcia technicznego: aktualizacje zależności, monitoring, kopie zapasowe, szybkie poprawki błędów oraz drobne rozbudowy funkcjonalności.',
    icon: 'Shield',
    features: ['Aktualizacje i bezpieczeństwo', 'Monitoring 24/7', 'Kopie zapasowe', 'SLA i czas reakcji', 'Miesięczny raport'],
    price_from: 200,
    order_index: 6,
  },
];

async function seedServices() {
  const existing = await count('services');
  if (existing > 0) {
    console.log(`⏩  services already has ${existing} rows – skipping.`);
    return;
  }
  console.log('🛠️   Seeding services…');
  for (const s of SERVICES) {
    const ts = now();
    await client.execute({
      sql: `INSERT INTO services
              (id, title, description, short_description, icon, features,
               price_from, price_currency, active, order_index, created_at, updated_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        uuid(), s.title, s.description, s.short_description, s.icon,
        json(s.features), s.price_from, 'PLN', 1, s.order_index, ts, ts,
      ],
    });
  }
  console.log(`✅  Inserted ${SERVICES.length} services.`);
}

// ── Seed: Projects ─────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: 'emanuelw.pl – Portfolio',
    short_description: 'Osobiste portfolio programisty z panelem admina i dynamiczną treścią.',
    detailed_description: 'Strona portfolio zbudowana w React + TypeScript z Vite. Dane przechowywane w Turso (libSQL/SQLite). Panel administratora umożliwia zarządzanie projektami, usługami i ustawieniami strony bez potrzeby edycji kodu. Wdrożona na Vercel.',
    frontend_technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    backend_technologies: ['Turso (libSQL)', 'bcryptjs'],
    tools_and_services: ['Vite', 'Vercel', 'GitHub'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Turso'],
    category: 'web',
    project_type: 'Portfolio',
    project_status: 'active',
    featured: true,
    is_responsive: true,
    hosting_platform: 'Vercel',
    project_url: 'https://emanuelw.pl',
    repository_url: 'https://github.com/xitali/emanuelw.pl',
    key_features: [
      'Panel administracyjny (projekty, usługi, ustawienia)',
      'Animacje Framer Motion',
      'Tryb ciemny / jasny',
      'System śledzenia wizyt',
      'Formularz kontaktowy z EmailJS',
    ],
    design_style: 'Dark modern / glassmorphism',
    color_palette: ['#3b82f6', '#8b5cf6', '#f59e0b'],
    target_audience: 'Potencjalni klienci i pracodawcy',
    main_challenge: 'Migracja bazy danych na Turso przy zachowaniu tego samego API shape w storach Zustand.',
    innovation: 'Pełny CMS w SQLite po stronie klienta (Turso edge database) bez potrzeby dedykowanego serwera.',
    project_result: 'Szybka, lekka strona z wynikami Lighthouse 95+ i kosztem infrastruktury bliskim zeru.',
    performance_metrics: ['Lighthouse Performance: 97', 'LCP: 1.2s', 'CLS: 0'],
    success_metrics: ['Wdrożona i działająca produkcyjnie', 'Pełne CRUD dla wszystkich encji'],
    completion_date: '2025-01-01',
  },
  {
    title: 'System Zarządzania Zadaniami',
    short_description: 'Aplikacja do zarządzania zadaniami z tablicą Kanban i powiadomieniami.',
    detailed_description: 'Pełnoprawna aplikacja do zarządzania projektami i zadaniami. Oferuje widok tablicy Kanban (drag-and-drop), śledzenie czasu, komentarze, przydzielanie zadań oraz powiadomienia e-mail. Backend REST API napisany w Node.js/Express z PostgreSQL.',
    frontend_technologies: ['React', 'TypeScript', 'Tailwind CSS', 'React DnD'],
    backend_technologies: ['Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    tools_and_services: ['Docker', 'Railway', 'GitHub Actions'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    category: 'web',
    project_type: 'SaaS',
    project_status: 'active',
    featured: true,
    is_responsive: true,
    hosting_platform: 'Railway',
    key_features: [
      'Tablica Kanban (drag-and-drop)',
      'Śledzenie czasu pracy',
      'Komentarze i priorytety',
      'Powiadomienia e-mail',
      'Eksport raportów PDF',
    ],
    design_style: 'Clean / produktywny',
    target_audience: 'Małe i średnie zespoły programistyczne',
    main_challenge: 'Wydajne renderowanie dużej liczby kart bez przeładowania strony.',
    project_result: 'Skrócenie czasu zarządzania zadaniami o 30% w pilotażowym zespole.',
    completion_date: '2024-06-01',
  },
  {
    title: 'Sklep z Elektroniką – E-commerce',
    short_description: 'Sklep internetowy z integracją Stripe i panelem zarządzania zamówieniami.',
    detailed_description: 'Sklep internetowy z pełnym cyklem zakupowym: przeglądanie katalogu, koszyk, płatność Stripe, e-mail z potwierdzeniem, śledzenie przesyłki. Panel admina do zarządzania produktami i zamówieniami. Frontend w Next.js (SSR/SSG), backend w Node.js.',
    frontend_technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe Elements'],
    backend_technologies: ['Node.js', 'Express', 'PostgreSQL'],
    tools_and_services: ['Stripe', 'SendGrid', 'Vercel', 'Cloudinary'],
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    category: 'web',
    project_type: 'E-commerce',
    project_status: 'active',
    featured: true,
    is_responsive: true,
    hosting_platform: 'Vercel',
    key_features: [
      'Integracja Stripe (płatności kartą)',
      'Koszyk i zamówienia z historią',
      'Panel admina (produkty, zamówienia)',
      'Powiadomienia e-mail (SendGrid)',
      'Optymalizacja obrazów (Cloudinary)',
    ],
    design_style: 'Minimal / e-commerce',
    target_audience: 'Klienci detaliczni',
    main_challenge: 'Bezpieczna obsługa webhooków Stripe i zgodność z PCI DSS.',
    project_result: 'Konwersja 4.2% i czas ładowania strony produktu poniżej 1.5s.',
    completion_date: '2024-09-01',
  },
  {
    title: 'Aplikacja Desktopowa – Menadżer Plików',
    short_description: 'Cross-platformowy menadżer plików z podglądem mediów zbudowany w Electron.',
    detailed_description: 'Aplikacja desktopowa (Windows, macOS, Linux) do zarządzania plikami z podglądem zdjęć, filmów i dokumentów PDF. Wspiera operacje drag-and-drop, grupowe operacje na plikach, zakładki i tryb ciemny. Zbudowana w Electron + React.',
    frontend_technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    backend_technologies: ['Electron', 'Node.js'],
    tools_and_services: ['electron-builder', 'GitHub Actions (CI/CD)'],
    technologies: ['Electron', 'React', 'TypeScript', 'Node.js'],
    category: 'desktop',
    project_type: 'Narzędzie',
    project_status: 'active',
    featured: false,
    is_responsive: false,
    hosting_platform: 'GitHub Releases',
    key_features: [
      'Podgląd zdjęć, filmów i PDF',
      'Drag-and-drop operacje na plikach',
      'Zakładki i historia nawigacji',
      'Wyszukiwanie pełnotekstowe',
      'Tryb ciemny / jasny',
    ],
    target_audience: 'Użytkownicy szukający alternatywy dla systemowego menadżera plików',
    completion_date: '2024-03-01',
  },
  {
    title: 'Dashboard Analityczny',
    short_description: 'Interaktywny dashboard z wykresami i raportami dla danych sprzedażowych.',
    detailed_description: 'Aplikacja webowa prezentująca dane sprzedażowe w formie interaktywnych wykresów i tabel. Umożliwia filtrowanie po zakresie dat, eksport do CSV/PDF oraz wysyłanie raportów e-mailem. Dane pobierane z REST API (Node.js + PostgreSQL).',
    frontend_technologies: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS'],
    backend_technologies: ['Node.js', 'Express', 'PostgreSQL'],
    tools_and_services: ['Vercel', 'Render'],
    technologies: ['React', 'Recharts', 'Node.js', 'PostgreSQL'],
    category: 'web',
    project_type: 'Dashboard',
    project_status: 'active',
    featured: false,
    is_responsive: true,
    hosting_platform: 'Vercel + Render',
    key_features: [
      'Wykresy (liniowe, słupkowe, kołowe)',
      'Filtrowanie po dacie i kategorii',
      'Eksport CSV / PDF',
      'Powiadomienia progowe',
      'Wieloużytkownikowy dostęp z rolami',
    ],
    target_audience: 'Managerowie sprzedaży i analitycy',
    completion_date: '2023-11-01',
  },
];

async function seedProjects() {
  const existing = await count('projects');
  if (existing > 0) {
    console.log(`⏩  projects already has ${existing} rows – skipping.`);
    return;
  }
  console.log('📁  Seeding projects…');
  for (const p of PROJECTS) {
    const ts = p.completion_date ? new Date(p.completion_date).toISOString() : now();
    await client.execute({
      sql: `INSERT INTO projects
              (id, title, short_description, detailed_description,
               technologies, frontend_technologies, backend_technologies, tools_and_services,
               images, project_url, repository_url, category, project_type, featured,
               project_status, completion_date, hosting_platform, key_features,
               design_style, color_palette, target_audience, is_responsive,
               accessibility_features, main_challenge, innovation, project_result,
               performance_metrics, success_metrics, user_feedback, technical_metrics,
               created_at, updated_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        uuid(),
        p.title,
        p.short_description ?? null,
        p.detailed_description ?? null,
        json(p.technologies),
        json(p.frontend_technologies),
        json(p.backend_technologies),
        json(p.tools_and_services),
        json(p.images ?? []),
        p.project_url ?? null,
        p.repository_url ?? null,
        p.category,
        p.project_type ?? null,
        p.featured ? 1 : 0,
        p.project_status ?? null,
        p.completion_date ?? null,
        p.hosting_platform ?? null,
        json(p.key_features),
        p.design_style ?? null,
        json(p.color_palette ?? []),
        p.target_audience ?? null,
        p.is_responsive ? 1 : 0,
        p.accessibility_features ?? null,
        p.main_challenge ?? null,
        p.innovation ?? null,
        p.project_result ?? null,
        json(p.performance_metrics ?? []),
        json(p.success_metrics ?? []),
        json(p.user_feedback ?? []),
        json(p.technical_metrics ?? []),
        ts,
        ts,
      ],
    });
  }
  console.log(`✅  Inserted ${PROJECTS.length} projects.`);
}

// ── Seed: Admin User ───────────────────────────────────────────────────────────

/** Generate a random password: 3 word-segments + digits + symbol */
function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';
  const digits = '23456789';
  let pwd = '';
  for (let i = 0; i < 8; i++)  pwd += chars[Math.floor(Math.random() * chars.length)];
  for (let i = 0; i < 4; i++)  pwd += digits[Math.floor(Math.random() * digits.length)];
  pwd += '!';
  return pwd;
}

async function seedAdmin() {
  const existing = await count('admin_users');
  if (existing > 0) {
    console.log(`⏩  admin_users already has ${existing} rows – skipping.`);
    return;
  }

  const email    = process.env.SEED_ADMIN_EMAIL    || 'admin@emanuelw.pl';
  const password = process.env.SEED_ADMIN_PASSWORD || generatePassword();

  console.log('👤  Seeding admin user…');
  const hash = await bcrypt.hash(password, 12);
  await client.execute({
    sql: 'INSERT INTO admin_users (id, email, password_hash, created_at) VALUES (?,?,?,?)',
    args: [uuid(), email, hash, now()],
  });
  console.log('✅  Admin user created.');
  console.log('');
  console.log('┌────────────────────────────────────────────┐');
  console.log('│  Admin credentials                         │');
  console.log(`│  Email   : ${email.padEnd(33)}│`);
  console.log(`│  Password: ${password.padEnd(33)}│`);
  console.log('│  ⚠️  Save this password – it won\'t repeat!  │');
  console.log('└────────────────────────────────────────────┘');
}


// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('🚀  Turso seed script for emanuelw.pl');
  console.log(`    DB: ${DB_URL}`);
  console.log('');

  await runSchema();
  await seedSettings();
  await seedServices();
  await seedProjects();
  await seedAdmin();

  console.log('');
  console.log('🎉  Done! The Turso database is ready.');
  client.close();
}

main().catch(err => {
  console.error('💥  Seed failed:', err);
  process.exit(1);
});
