/**
 * scripts/migrate-supabase-to-turso.mjs
 *
 * Fetches all data from Supabase (via REST API) and inserts it into Turso.
 * Tables migrated: projects, contact_messages, admin_users, services, site_settings, page_visits
 *
 * Usage (from project root):
 *   node scripts/migrate-supabase-to-turso.mjs
 *
 * Required env vars (reads from .env automatically):
 *   VITE_TURSO_DB_URL       – libsql:// URL of the Turso database
 *   VITE_TURSO_AUTH_TOKEN   – Turso auth token
 */

import { createClient } from '@libsql/client';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ── Load .env ─────────────────────────────────────────────────────────────────
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

// ── Supabase config ───────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://oqklyuzmxvfigbyxrpmg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_GSxOmAESliFWMapcsZq8lg_A291joRm';

// ── Turso config ──────────────────────────────────────────────────────────────
const DB_URL   = process.env.VITE_TURSO_DB_URL;
const DB_TOKEN = process.env.VITE_TURSO_AUTH_TOKEN;

if (!DB_URL) {
  console.error('❌  VITE_TURSO_DB_URL is not set. Add it to .env or export it.');
  process.exit(1);
}

const turso = createClient({ url: DB_URL, authToken: DB_TOKEN });

// ── Helpers ───────────────────────────────────────────────────────────────────
const toJson = (v) => {
  if (v == null) return '[]';
  if (typeof v === 'string') {
    // already a JSON string
    try { JSON.parse(v); return v; } catch { return JSON.stringify(v); }
  }
  return JSON.stringify(v);
};
const toBool = (v) => (v === true || v === 1 || v === '1' ? 1 : 0);
const toText = (v) => (v == null ? null : String(v));
const toReal = (v) => (v == null ? null : Number(v));

async function fetchTable(table) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();
  console.log(`  📥  ${table}: fetched ${data.length} rows`);
  return data;
}

// ── Migration functions ───────────────────────────────────────────────────────

async function migrateProjects(rows) {
  if (!rows.length) { console.log('  ⏭   projects: no rows'); return; }
  let inserted = 0;
  for (const r of rows) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO projects (
        id, title, short_description, detailed_description,
        technologies, frontend_technologies, backend_technologies,
        tools_and_services, images, project_url, repository_url,
        category, project_type, featured, project_status,
        completion_date, hosting_platform, key_features, design_style,
        color_palette, target_audience, is_responsive, accessibility_features,
        main_challenge, innovation, project_result, performance_metrics,
        success_metrics, user_feedback, technical_metrics,
        created_at, updated_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        toText(r.id),
        toText(r.title),
        toText(r.short_description),
        toText(r.detailed_description),
        toJson(r.technologies),
        toJson(r.frontend_technologies),
        toJson(r.backend_technologies),
        toJson(r.tools_and_services),
        toJson(r.images),
        toText(r.project_url),
        toText(r.repository_url),
        toText(r.category),
        toText(r.project_type),
        toBool(r.featured),
        toText(r.project_status),
        toText(r.completion_date),
        toText(r.hosting_platform),
        toJson(r.key_features),
        toText(r.design_style),
        toJson(r.color_palette),
        toText(r.target_audience),
        toBool(r.is_responsive),
        toText(r.accessibility_features),
        toText(r.main_challenge),
        toText(r.innovation),
        toText(r.project_result),
        toJson(r.performance_metrics),
        toJson(r.success_metrics),
        toJson(r.user_feedback),
        toJson(r.technical_metrics),
        toText(r.created_at) || new Date().toISOString(),
        toText(r.updated_at) || new Date().toISOString(),
      ],
    });
    inserted++;
  }
  console.log(`  ✅  projects: inserted/replaced ${inserted} rows`);
}

async function migrateContactMessages(rows) {
  if (!rows.length) { console.log('  ⏭   contact_messages: no rows'); return; }
  let inserted = 0;
  for (const r of rows) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO contact_messages (id, name, email, subject, message, status, created_at)
            VALUES (?,?,?,?,?,?,?)`,
      args: [
        toText(r.id),
        toText(r.name),
        toText(r.email),
        toText(r.subject),
        toText(r.message),
        toText(r.status) || 'unread',
        toText(r.created_at) || new Date().toISOString(),
      ],
    });
    inserted++;
  }
  console.log(`  ✅  contact_messages: inserted/replaced ${inserted} rows`);
}

async function migrateAdminUsers(rows) {
  if (!rows.length) { console.log('  ⏭   admin_users: no rows'); return; }
  let inserted = 0;
  for (const r of rows) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO admin_users (id, email, password_hash, created_at) VALUES (?,?,?,?)`,
      args: [
        toText(r.id),
        toText(r.email),
        toText(r.password_hash),
        toText(r.created_at) || new Date().toISOString(),
      ],
    });
    inserted++;
  }
  console.log(`  ✅  admin_users: inserted/replaced ${inserted} rows`);
}

async function migrateServices(rows) {
  if (!rows.length) { console.log('  ⏭   services: no rows'); return; }
  let inserted = 0;
  for (const r of rows) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO services (
        id, title, description, short_description, icon,
        features, price_from, price_currency, active, order_index, created_at, updated_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        toText(r.id),
        toText(r.title),
        toText(r.description),
        toText(r.short_description),
        toText(r.icon),
        toJson(r.features),
        toReal(r.price_from),
        toText(r.price_currency) || 'PLN',
        toBool(r.active ?? 1),
        r.order_index != null ? Number(r.order_index) : 0,
        toText(r.created_at) || new Date().toISOString(),
        toText(r.updated_at) || new Date().toISOString(),
      ],
    });
    inserted++;
  }
  console.log(`  ✅  services: inserted/replaced ${inserted} rows`);
}

async function migrateSiteSettings(rows) {
  if (!rows.length) { console.log('  ⏭   site_settings: no rows'); return; }
  let inserted = 0;
  for (const r of rows) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO site_settings (id, setting_key, setting_value, setting_type, description, updated_at)
            VALUES (?,?,?,?,?,?)`,
      args: [
        toText(r.id),
        toText(r.setting_key),
        toText(r.setting_value),
        toText(r.setting_type) || 'text',
        toText(r.description),
        toText(r.updated_at) || new Date().toISOString(),
      ],
    });
    inserted++;
  }
  console.log(`  ✅  site_settings: inserted/replaced ${inserted} rows`);
}

async function migratePageVisits(rows) {
  if (!rows.length) { console.log('  ⏭   page_visits: no rows'); return; }
  let inserted = 0;
  for (const r of rows) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO page_visits (id, page_path, visitor_ip, user_agent, referrer, session_id, created_at)
            VALUES (?,?,?,?,?,?,?)`,
      args: [
        toText(r.id),
        toText(r.page_path),
        toText(r.visitor_ip),
        toText(r.user_agent),
        toText(r.referrer),
        toText(r.session_id),
        toText(r.created_at) || new Date().toISOString(),
      ],
    });
    inserted++;
  }
  console.log(`  ✅  page_visits: inserted/replaced ${inserted} rows`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀  Starting Supabase → Turso migration\n');
  console.log(`  Supabase: ${SUPABASE_URL}`);
  console.log(`  Turso:    ${DB_URL}\n`);

  const tables = ['projects', 'contact_messages', 'admin_users', 'services', 'site_settings', 'page_visits'];

  console.log('📦  Fetching data from Supabase...');
  const fetched = {};
  for (const table of tables) {
    try {
      fetched[table] = await fetchTable(table);
    } catch (e) {
      console.warn(`  ⚠️   ${table}: ${e.message}`);
      fetched[table] = [];
    }
  }

  console.log('\n💾  Inserting data into Turso...');
  await migrateProjects(fetched.projects);
  await migrateContactMessages(fetched.contact_messages);
  await migrateAdminUsers(fetched.admin_users);
  await migrateServices(fetched.services);
  await migrateSiteSettings(fetched.site_settings);
  await migratePageVisits(fetched.page_visits);

  console.log('\n✨  Migration complete!\n');
}

main().catch((e) => {
  console.error('❌  Migration failed:', e);
  process.exit(1);
});
