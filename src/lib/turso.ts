/**
 * src/lib/turso.ts
 *
 * Replaces src/lib/supabase.ts.
 * Provides the same { data, error } API shape used by all stores,
 * backed by Turso (libSQL / SQLite) instead of Supabase.
 *
 * Arrays are stored as JSON TEXT in SQLite and parsed on read.
 * Booleans are stored as INTEGER (0/1) and coerced on read.
 */

import { createClient } from '@libsql/client/web';
import bcrypt from 'bcryptjs';

// ========================
// Client
// ========================

export const client = createClient({
  url: import.meta.env.VITE_TURSO_DB_URL as string,
  authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN as string,
});

// ========================
// Utilities
// ========================

const uuid = (): string => crypto.randomUUID();
const now = (): string => new Date().toISOString();
const parseArr = (v: unknown): string[] => {
  if (!v) return [];
  if (typeof v === 'string') {
    try { return JSON.parse(v); } catch { return []; }
  }
  if (Array.isArray(v)) return v as string[];
  return [];
};
const toJson = (v: unknown): string => JSON.stringify(v ?? []);
const bool = (v: unknown): boolean => v === 1 || v === '1' || v === true;
const maybeNum = (v: unknown): number | undefined =>
  v != null && v !== '' ? Number(v) : undefined;

/** Wrap a successful result */
const ok = <T>(data: T) => ({ data, error: null } as const);
/** Wrap an error result */
const fail = (e: unknown) => ({
  data: null,
  error: e instanceof Error ? e : new Error(String(e)),
} as const);

// ========================
// Row types (mirror Supabase shape)
// ========================

export interface ProjectRow {
  id: string;
  title: string;
  short_description?: string;
  detailed_description?: string;
  technologies: string[];
  frontend_technologies?: string[];
  backend_technologies?: string[];
  tools_and_services?: string[];
  images: string[];
  project_url?: string;
  repository_url?: string;
  category: string;
  project_type?: string;
  featured: boolean;
  project_status?: string;
  completion_date?: string;
  hosting_platform?: string;
  key_features?: string[];
  design_style?: string;
  color_palette?: string[];
  target_audience?: string;
  is_responsive?: boolean;
  accessibility_features?: string;
  main_challenge?: string;
  innovation?: string;
  project_result?: string;
  performance_metrics?: string[];
  success_metrics?: string[];
  user_feedback?: string[];
  technical_metrics?: string[];
  created_at: string;
  updated_at: string;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface AdminUserRow {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface ServiceRow {
  id: string;
  title: string;
  description: string;
  short_description: string;
  icon: string;
  features: string[];
  price_from?: number;
  price_currency: string;
  active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingRow {
  id: string;
  setting_key: string;
  setting_value?: string;
  setting_type: string;
  description?: string;
  updated_at: string;
}

export interface PageVisitRow {
  id: string;
  page_path: string;
  visitor_ip?: string;
  user_agent?: string;
  referrer?: string;
  session_id?: string;
  created_at: string;
}

// ========================
// Database type (kept for backward compat with stores that import it)
// ========================

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: ProjectRow;
        Insert: Partial<ProjectRow> & { title: string; category: string };
        Update: Partial<ProjectRow>;
      };
      contact_messages: {
        Row: ContactMessageRow;
        Insert: Omit<ContactMessageRow, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<ContactMessageRow>;
      };
      admin_users: {
        Row: AdminUserRow;
        Insert: Omit<AdminUserRow, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<AdminUserRow>;
      };
      services: {
        Row: ServiceRow;
        Insert: Omit<ServiceRow, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<ServiceRow>;
      };
      site_settings: {
        Row: SiteSettingRow;
        Insert: Omit<SiteSettingRow, 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<SiteSettingRow>;
      };
      page_visits: {
        Row: PageVisitRow;
        Insert: Omit<PageVisitRow, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<PageVisitRow>;
      };
    };
  };
}

// ========================
// Row mappers
// ========================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapProject = (r: any): ProjectRow => ({
  id: r.id as string,
  title: r.title as string,
  short_description: r.short_description as string | undefined,
  detailed_description: r.detailed_description as string | undefined,
  technologies: parseArr(r.technologies),
  frontend_technologies: parseArr(r.frontend_technologies),
  backend_technologies: parseArr(r.backend_technologies),
  tools_and_services: parseArr(r.tools_and_services),
  images: parseArr(r.images),
  project_url: r.project_url as string | undefined,
  repository_url: r.repository_url as string | undefined,
  category: r.category as string,
  project_type: r.project_type as string | undefined,
  featured: bool(r.featured),
  project_status: r.project_status as string | undefined,
  completion_date: r.completion_date as string | undefined,
  hosting_platform: r.hosting_platform as string | undefined,
  key_features: parseArr(r.key_features),
  design_style: r.design_style as string | undefined,
  color_palette: parseArr(r.color_palette),
  target_audience: r.target_audience as string | undefined,
  is_responsive: bool(r.is_responsive),
  accessibility_features: r.accessibility_features as string | undefined,
  main_challenge: r.main_challenge as string | undefined,
  innovation: r.innovation as string | undefined,
  project_result: r.project_result as string | undefined,
  performance_metrics: parseArr(r.performance_metrics),
  success_metrics: parseArr(r.success_metrics),
  user_feedback: parseArr(r.user_feedback),
  technical_metrics: parseArr(r.technical_metrics),
  created_at: r.created_at as string,
  updated_at: r.updated_at as string,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapMessage = (r: any): ContactMessageRow => ({
  id: r.id as string,
  name: r.name as string,
  email: r.email as string,
  subject: r.subject as string,
  message: r.message as string,
  status: r.status as 'unread' | 'read' | 'replied',
  created_at: r.created_at as string,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapAdminUser = (r: any): AdminUserRow => ({
  id: r.id as string,
  email: r.email as string,
  password_hash: r.password_hash as string,
  created_at: r.created_at as string,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapService = (r: any): ServiceRow => ({
  id: r.id as string,
  title: r.title as string,
  description: r.description as string,
  short_description: r.short_description as string,
  icon: r.icon as string,
  features: parseArr(r.features),
  price_from: maybeNum(r.price_from),
  price_currency: (r.price_currency as string) || 'PLN',
  active: bool(r.active),
  order_index: Number(r.order_index ?? 0),
  created_at: r.created_at as string,
  updated_at: r.updated_at as string,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapSiteSetting = (r: any): SiteSettingRow => ({
  id: r.id as string,
  setting_key: r.setting_key as string,
  setting_value: r.setting_value as string | undefined,
  setting_type: (r.setting_type as string) || 'text',
  description: r.description as string | undefined,
  updated_at: r.updated_at as string,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapPageVisit = (r: any): PageVisitRow => ({
  id: r.id as string,
  page_path: r.page_path as string,
  visitor_ip: r.visitor_ip as string | undefined,
  user_agent: r.user_agent as string | undefined,
  referrer: r.referrer as string | undefined,
  session_id: r.session_id as string | undefined,
  created_at: r.created_at as string,
});

// ========================
// DB helpers
// ========================

export const db = {
  // ── Projects ──────────────────────────────────────────────────
  projects: {
    getAll: async () => {
      try {
        const rs = await client.execute(
          'SELECT * FROM projects ORDER BY created_at DESC'
        );
        return ok(rs.rows.map(mapProject));
      } catch (e) { return fail(e); }
    },

    getFeatured: async () => {
      try {
        const rs = await client.execute(
          'SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC'
        );
        return ok(rs.rows.map(mapProject));
      } catch (e) { return fail(e); }
    },

    getByCategory: async (category: string) => {
      try {
        const rs = await client.execute({
          sql: 'SELECT * FROM projects WHERE category = ? ORDER BY created_at DESC',
          args: [category],
        });
        return ok(rs.rows.map(mapProject));
      } catch (e) { return fail(e); }
    },

    getById: async (id: string) => {
      try {
        const rs = await client.execute({
          sql: 'SELECT * FROM projects WHERE id = ? LIMIT 1',
          args: [id],
        });
        if (rs.rows.length === 0) return fail(new Error('Project not found'));
        return ok(mapProject(rs.rows[0]));
      } catch (e) { return fail(e); }
    },

    create: async (p: Database['public']['Tables']['projects']['Insert']) => {
      const id = p.id ?? uuid();
      const ts = now();
      try {
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
            id, p.title, p.short_description ?? null, p.detailed_description ?? null,
            toJson(p.technologies), toJson(p.frontend_technologies),
            toJson(p.backend_technologies), toJson(p.tools_and_services),
            toJson(p.images), p.project_url ?? null, p.repository_url ?? null,
            p.category, p.project_type ?? null, p.featured ? 1 : 0,
            p.project_status ?? null, p.completion_date ?? null,
            p.hosting_platform ?? null, toJson(p.key_features),
            p.design_style ?? null, toJson(p.color_palette),
            p.target_audience ?? null, p.is_responsive ? 1 : 0,
            p.accessibility_features ?? null, p.main_challenge ?? null,
            p.innovation ?? null, p.project_result ?? null,
            toJson(p.performance_metrics), toJson(p.success_metrics),
            toJson(p.user_feedback), toJson(p.technical_metrics),
            p.created_at ?? ts, p.updated_at ?? ts,
          ],
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM projects WHERE id = ?', args: [id],
        });
        return ok(mapProject(rs2.rows[0]));
      } catch (e) { return fail(e); }
    },

    update: async (id: string, p: Database['public']['Tables']['projects']['Update']) => {
      const fields: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const args: any[] = [];
      const set = (col: string, val: unknown) => { fields.push(`${col} = ?`); args.push(val); };

      if (p.title !== undefined) set('title', p.title);
      if (p.short_description !== undefined) set('short_description', p.short_description);
      if (p.detailed_description !== undefined) set('detailed_description', p.detailed_description);
      if (p.technologies !== undefined) set('technologies', toJson(p.technologies));
      if (p.frontend_technologies !== undefined) set('frontend_technologies', toJson(p.frontend_technologies));
      if (p.backend_technologies !== undefined) set('backend_technologies', toJson(p.backend_technologies));
      if (p.tools_and_services !== undefined) set('tools_and_services', toJson(p.tools_and_services));
      if (p.images !== undefined) set('images', toJson(p.images));
      if (p.project_url !== undefined) set('project_url', p.project_url);
      if (p.repository_url !== undefined) set('repository_url', p.repository_url);
      if (p.category !== undefined) set('category', p.category);
      if (p.project_type !== undefined) set('project_type', p.project_type);
      if (p.featured !== undefined) set('featured', p.featured ? 1 : 0);
      if (p.project_status !== undefined) set('project_status', p.project_status);
      if (p.completion_date !== undefined) set('completion_date', p.completion_date);
      if (p.hosting_platform !== undefined) set('hosting_platform', p.hosting_platform);
      if (p.key_features !== undefined) set('key_features', toJson(p.key_features));
      if (p.design_style !== undefined) set('design_style', p.design_style);
      if (p.color_palette !== undefined) set('color_palette', toJson(p.color_palette));
      if (p.target_audience !== undefined) set('target_audience', p.target_audience);
      if (p.is_responsive !== undefined) set('is_responsive', p.is_responsive ? 1 : 0);
      if (p.accessibility_features !== undefined) set('accessibility_features', p.accessibility_features);
      if (p.main_challenge !== undefined) set('main_challenge', p.main_challenge);
      if (p.innovation !== undefined) set('innovation', p.innovation);
      if (p.project_result !== undefined) set('project_result', p.project_result);
      if (p.performance_metrics !== undefined) set('performance_metrics', toJson(p.performance_metrics));
      if (p.success_metrics !== undefined) set('success_metrics', toJson(p.success_metrics));
      if (p.user_feedback !== undefined) set('user_feedback', toJson(p.user_feedback));
      if (p.technical_metrics !== undefined) set('technical_metrics', toJson(p.technical_metrics));

      set('updated_at', now());
      args.push(id);

      try {
        await client.execute({
          sql: `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`,
          args,
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM projects WHERE id = ?', args: [id],
        });
        return ok(rs2.rows.map(mapProject));
      } catch (e) { return fail(e); }
    },

    delete: async (id: string) => {
      try {
        await client.execute({ sql: 'DELETE FROM projects WHERE id = ?', args: [id] });
        return ok(null);
      } catch (e) { return fail(e); }
    },
  },

  // ── Contact Messages ──────────────────────────────────────────
  contactMessages: {
    getAll: async () => {
      try {
        const rs = await client.execute(
          'SELECT * FROM contact_messages ORDER BY created_at DESC'
        );
        return ok(rs.rows.map(mapMessage));
      } catch (e) { return fail(e); }
    },

    getUnread: async () => {
      try {
        const rs = await client.execute(
          "SELECT * FROM contact_messages WHERE status = 'unread' ORDER BY created_at DESC"
        );
        return ok(rs.rows.map(mapMessage));
      } catch (e) { return fail(e); }
    },

    create: async (m: Database['public']['Tables']['contact_messages']['Insert']) => {
      const id = m.id ?? uuid();
      const ts = m.created_at ?? now();
      try {
        await client.execute({
          sql: 'INSERT INTO contact_messages (id, name, email, subject, message, status, created_at) VALUES (?,?,?,?,?,?,?)',
          args: [id, m.name, m.email, m.subject, m.message, m.status ?? 'unread', ts],
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM contact_messages WHERE id = ?', args: [id],
        });
        return ok(mapMessage(rs2.rows[0]));
      } catch (e) { return fail(e); }
    },

    updateStatus: async (id: string, status: 'unread' | 'read' | 'replied') => {
      try {
        await client.execute({
          sql: 'UPDATE contact_messages SET status = ? WHERE id = ?',
          args: [status, id],
        });
        return ok(null);
      } catch (e) { return fail(e); }
    },

    delete: async (id: string) => {
      try {
        await client.execute({ sql: 'DELETE FROM contact_messages WHERE id = ?', args: [id] });
        return ok(null);
      } catch (e) { return fail(e); }
    },
  },

  // ── Admin Users ───────────────────────────────────────────────
  adminUsers: {
    getAll: async () => {
      try {
        const rs = await client.execute(
          'SELECT * FROM admin_users ORDER BY created_at DESC'
        );
        return ok(rs.rows.map(mapAdminUser));
      } catch (e) { return fail(e); }
    },

    getByEmail: async (email: string) => {
      try {
        const rs = await client.execute({
          sql: 'SELECT * FROM admin_users WHERE email = ? LIMIT 1',
          args: [email],
        });
        if (rs.rows.length === 0) return fail(new Error('User not found'));
        return ok(mapAdminUser(rs.rows[0]));
      } catch (e) { return fail(e); }
    },

    getById: async (id: string) => {
      try {
        const rs = await client.execute({
          sql: 'SELECT * FROM admin_users WHERE id = ? LIMIT 1',
          args: [id],
        });
        if (rs.rows.length === 0) return fail(new Error('User not found'));
        return ok(mapAdminUser(rs.rows[0]));
      } catch (e) { return fail(e); }
    },

    create: async (u: { email: string; password_hash: string }) => {
      const id = uuid();
      const ts = now();
      try {
        await client.execute({
          sql: 'INSERT INTO admin_users (id, email, password_hash, created_at) VALUES (?,?,?,?)',
          args: [id, u.email, u.password_hash, ts],
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM admin_users WHERE id = ?', args: [id],
        });
        return ok(mapAdminUser(rs2.rows[0]));
      } catch (e) { return fail(e); }
    },

    update: async (id: string, u: Database['public']['Tables']['admin_users']['Update']) => {
      const fields: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const args: any[] = [];
      if (u.email !== undefined) { fields.push('email = ?'); args.push(u.email); }
      if (u.password_hash !== undefined) { fields.push('password_hash = ?'); args.push(u.password_hash); }
      if (fields.length === 0) return fail(new Error('Nothing to update'));
      args.push(id);
      try {
        await client.execute({
          sql: `UPDATE admin_users SET ${fields.join(', ')} WHERE id = ?`,
          args,
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM admin_users WHERE id = ?', args: [id],
        });
        return ok(mapAdminUser(rs2.rows[0]));
      } catch (e) { return fail(e); }
    },

    delete: async (id: string) => {
      try {
        await client.execute({ sql: 'DELETE FROM admin_users WHERE id = ?', args: [id] });
        return ok(null);
      } catch (e) { return fail(e); }
    },
  },

  // ── Services ──────────────────────────────────────────────────
  services: {
    getAll: async () => {
      try {
        const rs = await client.execute(
          'SELECT * FROM services ORDER BY order_index ASC'
        );
        return ok(rs.rows.map(mapService));
      } catch (e) { return fail(e); }
    },

    getActive: async () => {
      try {
        const rs = await client.execute(
          'SELECT * FROM services WHERE active = 1 ORDER BY order_index ASC'
        );
        return ok(rs.rows.map(mapService));
      } catch (e) { return fail(e); }
    },

    getById: async (id: string) => {
      try {
        const rs = await client.execute({
          sql: 'SELECT * FROM services WHERE id = ? LIMIT 1',
          args: [id],
        });
        if (rs.rows.length === 0) return fail(new Error('Service not found'));
        return ok(mapService(rs.rows[0]));
      } catch (e) { return fail(e); }
    },

    create: async (s: Database['public']['Tables']['services']['Insert']) => {
      const id = s.id ?? uuid();
      const ts = now();
      try {
        await client.execute({
          sql: `INSERT INTO services
            (id, title, description, short_description, icon, features,
             price_from, price_currency, active, order_index, created_at, updated_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
          args: [
            id, s.title, s.description, s.short_description, s.icon,
            toJson(s.features), s.price_from ?? null,
            s.price_currency ?? 'PLN', s.active ? 1 : 0,
            s.order_index ?? 0, ts, ts,
          ],
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM services WHERE id = ?', args: [id],
        });
        return ok(mapService(rs2.rows[0]));
      } catch (e) { return fail(e); }
    },

    update: async (id: string, s: Database['public']['Tables']['services']['Update']) => {
      const fields: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const args: any[] = [];
      const set = (col: string, val: unknown) => { fields.push(`${col} = ?`); args.push(val); };
      if (s.title !== undefined) set('title', s.title);
      if (s.description !== undefined) set('description', s.description);
      if (s.short_description !== undefined) set('short_description', s.short_description);
      if (s.icon !== undefined) set('icon', s.icon);
      if (s.features !== undefined) set('features', toJson(s.features));
      if (s.price_from !== undefined) set('price_from', s.price_from);
      if (s.price_currency !== undefined) set('price_currency', s.price_currency);
      if (s.active !== undefined) set('active', s.active ? 1 : 0);
      if (s.order_index !== undefined) set('order_index', s.order_index);
      set('updated_at', now());
      args.push(id);
      try {
        await client.execute({
          sql: `UPDATE services SET ${fields.join(', ')} WHERE id = ?`,
          args,
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM services WHERE id = ?', args: [id],
        });
        return ok(mapService(rs2.rows[0]));
      } catch (e) { return fail(e); }
    },

    delete: async (id: string) => {
      try {
        await client.execute({ sql: 'DELETE FROM services WHERE id = ?', args: [id] });
        return ok(null);
      } catch (e) { return fail(e); }
    },
  },

  // ── Site Settings ─────────────────────────────────────────────
  siteSettings: {
    getAll: async () => {
      try {
        const rs = await client.execute(
          'SELECT * FROM site_settings ORDER BY setting_key ASC'
        );
        return ok(rs.rows.map(mapSiteSetting));
      } catch (e) { return fail(e); }
    },

    getByKey: async (key: string) => {
      try {
        const rs = await client.execute({
          sql: 'SELECT * FROM site_settings WHERE setting_key = ? LIMIT 1',
          args: [key],
        });
        if (rs.rows.length === 0) return fail(new Error('Setting not found'));
        return ok(mapSiteSetting(rs.rows[0]));
      } catch (e) { return fail(e); }
    },

    getByKeys: async (keys: string[]) => {
      try {
        const placeholders = keys.map(() => '?').join(', ');
        const rs = await client.execute({
          sql: `SELECT * FROM site_settings WHERE setting_key IN (${placeholders})`,
          args: keys,
        });
        return ok(rs.rows.map(mapSiteSetting));
      } catch (e) { return fail(e); }
    },

    create: async (s: Database['public']['Tables']['site_settings']['Insert']) => {
      const id = s.id ?? uuid();
      const ts = s.updated_at ?? now();
      try {
        await client.execute({
          sql: `INSERT INTO site_settings (id, setting_key, setting_value, setting_type, description, updated_at)
                VALUES (?,?,?,?,?,?)`,
          args: [id, s.setting_key, s.setting_value ?? null, s.setting_type ?? 'text', s.description ?? null, ts],
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM site_settings WHERE id = ?', args: [id],
        });
        return ok(mapSiteSetting(rs2.rows[0]));
      } catch (e) { return fail(e); }
    },

    update: async (id: string, s: Database['public']['Tables']['site_settings']['Update']) => {
      const fields: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const args: any[] = [];
      if (s.setting_key !== undefined) { fields.push('setting_key = ?'); args.push(s.setting_key); }
      if (s.setting_value !== undefined) { fields.push('setting_value = ?'); args.push(s.setting_value); }
      if (s.setting_type !== undefined) { fields.push('setting_type = ?'); args.push(s.setting_type); }
      if (s.description !== undefined) { fields.push('description = ?'); args.push(s.description); }
      fields.push('updated_at = ?'); args.push(now());
      args.push(id);
      try {
        await client.execute({
          sql: `UPDATE site_settings SET ${fields.join(', ')} WHERE id = ?`,
          args,
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM site_settings WHERE id = ?', args: [id],
        });
        return ok(mapSiteSetting(rs2.rows[0]));
      } catch (e) { return fail(e); }
    },

    updateByKey: async (key: string, value: string) => {
      const ts = now();
      try {
        await client.execute({
          sql: 'UPDATE site_settings SET setting_value = ?, updated_at = ? WHERE setting_key = ?',
          args: [value, ts, key],
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM site_settings WHERE setting_key = ?', args: [key],
        });
        if (rs2.rows.length === 0) return fail(new Error('Setting not found'));
        return ok(mapSiteSetting(rs2.rows[0]));
      } catch (e) { return fail(e); }
    },

    delete: async (id: string) => {
      try {
        await client.execute({ sql: 'DELETE FROM site_settings WHERE id = ?', args: [id] });
        return ok(null);
      } catch (e) { return fail(e); }
    },
  },

  // ── Page Visits ───────────────────────────────────────────────
  pageVisits: {
    getAll: async () => {
      try {
        const rs = await client.execute(
          'SELECT * FROM page_visits ORDER BY created_at DESC LIMIT 500'
        );
        return ok(rs.rows.map(mapPageVisit));
      } catch (e) { return fail(e); }
    },

    getStats: async () => {
      try {
        const rs = await client.execute(
          'SELECT page_path, created_at FROM page_visits ORDER BY created_at DESC'
        );
        return ok(rs.rows.map(r => ({
          page_path: r.page_path as string,
          created_at: r.created_at as string,
        })));
      } catch (e) { return fail(e); }
    },

    getTotalCount: async () => {
      try {
        const rs = await client.execute(
          'SELECT COUNT(*) as cnt FROM page_visits'
        );
        const count = Number(rs.rows[0]?.cnt ?? 0);
        return { count, error: null };
      } catch (e) {
        return { count: null, error: e instanceof Error ? e : new Error(String(e)) };
      }
    },

    getByDateRange: async (startDate: string, endDate: string) => {
      try {
        const rs = await client.execute({
          sql: 'SELECT * FROM page_visits WHERE created_at >= ? AND created_at <= ? ORDER BY created_at DESC',
          args: [startDate, endDate],
        });
        return ok(rs.rows.map(mapPageVisit));
      } catch (e) { return fail(e); }
    },

    create: async (v: Database['public']['Tables']['page_visits']['Insert']) => {
      const id = v.id ?? uuid();
      const ts = v.created_at ?? now();
      try {
        await client.execute({
          sql: `INSERT INTO page_visits (id, page_path, visitor_ip, user_agent, referrer, session_id, created_at)
                VALUES (?,?,?,?,?,?,?)`,
          args: [id, v.page_path, v.visitor_ip ?? null, v.user_agent ?? null,
                 v.referrer ?? null, v.session_id ?? null, ts],
        });
        const rs2 = await client.execute({
          sql: 'SELECT * FROM page_visits WHERE id = ?', args: [id],
        });
        return ok(mapPageVisit(rs2.rows[0]));
      } catch (e) { return fail(e); }
    },

    delete: async (id: string) => {
      try {
        await client.execute({ sql: 'DELETE FROM page_visits WHERE id = ?', args: [id] });
        return ok(null);
      } catch (e) { return fail(e); }
    },
  },
};

// ========================
// Authentication
// ========================

export const auth = {
  login: async (email: string, password: string) => {
    const { data: user, error } = await db.adminUsers.getByEmail(email);
    if (error || !user) {
      throw new Error('Nieprawidłowe dane logowania');
    }
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error('Nieprawidłowe dane logowania');
    }
    return {
      user: { id: user.id, email: user.email, createdAt: user.created_at },
      token: `${user.id}_${Date.now()}`,
    };
  },
};
