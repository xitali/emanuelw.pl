import { createClient } from "@libsql/client";
import { Project, Service, SiteSetting, ContactMessage } from "@/types";
import { unstable_cache, revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

const url = process.env.TURSO_DATABASE_URL || "libsql://***REMOVED_TURSO_URL***";
const authToken = process.env.TURSO_AUTH_TOKEN || "";

export const turso = createClient({
  url,
  authToken,
});

// Utility helper to safely parse JSON arrays from DB text columns
function safeParseJsonArray(jsonStr: unknown): string[] {
  if (!jsonStr || typeof jsonStr !== 'string') return [];
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed)) {
      return parsed.flatMap(item => {
        if (typeof item === 'string' && item.startsWith('[')) {
          try {
            const inner = JSON.parse(item);
            return Array.isArray(inner) ? inner : [item];
          } catch {
            return item;
          }
        }
        return item;
      });
    }
    return [];
  } catch {
    return [];
  }
}

// ---------------- CACHED DATA FETCHERS ---------------- //

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    try {
      const result = await turso.execute("SELECT * FROM projects ORDER BY created_at DESC");
      return result.rows.map((row) => ({
        id: String(row.id || ''),
        title: String(row.title || ''),
        short_description: String(row.short_description || ''),
        detailed_description: String(row.detailed_description || ''),
        technologies: safeParseJsonArray(row.technologies),
        frontend_technologies: safeParseJsonArray(row.frontend_technologies),
        backend_technologies: safeParseJsonArray(row.backend_technologies),
        tools_and_services: safeParseJsonArray(row.tools_and_services),
        images: safeParseJsonArray(row.images),
        project_url: row.project_url ? String(row.project_url) : undefined,
        repository_url: row.repository_url ? String(row.repository_url) : undefined,
        category: row.category ? String(row.category) : undefined,
        project_type: row.project_type ? String(row.project_type) : undefined,
        featured: row.featured === "1" || row.featured === 1,
        project_status: row.project_status ? String(row.project_status) : undefined,
        completion_date: row.completion_date ? String(row.completion_date) : undefined,
        hosting_platform: row.hosting_platform ? String(row.hosting_platform) : undefined,
        key_features: safeParseJsonArray(row.key_features),
        design_style: row.design_style ? String(row.design_style) : undefined,
        color_palette: safeParseJsonArray(row.color_palette),
        target_audience: row.target_audience ? String(row.target_audience) : undefined,
        is_responsive: row.is_responsive === "1" || row.is_responsive === 1,
        accessibility_features: row.accessibility_features ? String(row.accessibility_features) : undefined,
        main_challenge: row.main_challenge ? String(row.main_challenge) : undefined,
        innovation: row.innovation ? String(row.innovation) : undefined,
        project_result: row.project_result ? String(row.project_result) : undefined,
        performance_metrics: safeParseJsonArray(row.performance_metrics),
        success_metrics: safeParseJsonArray(row.success_metrics),
        user_feedback: safeParseJsonArray(row.user_feedback),
        technical_metrics: safeParseJsonArray(row.technical_metrics),
        created_at: row.created_at ? String(row.created_at) : undefined,
        updated_at: row.updated_at ? String(row.updated_at) : undefined,
      }));
    } catch (error) {
      console.error("Error fetching projects from Turso:", error);
      return [];
    }
  },
  ["projects-list"],
  { revalidate: 3600 }
);

export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    try {
      const result = await turso.execute("SELECT * FROM services ORDER BY CAST(order_index AS INTEGER) ASC");
      return result.rows.map((row) => ({
        id: String(row.id || ''),
        name: String(row.title || row.name || ''),
        full_description: String(row.description || row.full_description || ''),
        short_description: String(row.short_description || ''),
        icon_name: String(row.icon || row.icon_name || 'Code'),
        included_features: safeParseJsonArray(row.features || row.included_features),
        starting_price: Number(row.price_from || row.starting_price || 0),
        currency: String(row.price_currency || row.currency || 'PLN'),
        is_active: row.active === 1 || row.active === "1" || row.is_active === 1 || row.is_active === "1",
        display_order: Number(row.order_index || row.display_order || 0),
        created_at: row.created_at ? String(row.created_at) : undefined,
        updated_at: row.updated_at ? String(row.updated_at) : undefined,
      }));
    } catch (error) {
      console.error("Error fetching services from Turso:", error);
      return [];
    }
  },
  ["services-list"],
  { revalidate: 3600 }
);

export const getSiteSettings = unstable_cache(
  async (): Promise<Record<string, string>> => {
    try {
      const result = await turso.execute("SELECT setting_key, setting_value FROM site_settings");
      const settings: Record<string, string> = {};
      for (const row of result.rows) {
        if (row.setting_key && row.setting_value) {
          settings[String(row.setting_key)] = String(row.setting_value);
        }
      }
      return settings;
    } catch (error) {
      console.error("Error fetching site settings from Turso:", error);
      return {};
    }
  },
  ["site-settings"],
  { revalidate: 3600 }
);

// ---------------- NON-CACHED MUTATIONS & MESSAGES ---------------- //

export async function submitContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  await turso.execute({
    sql: `INSERT INTO contact_messages (id, name, email, subject, message, status, created_at)
          VALUES (?, ?, ?, ?, ?, 'unread', ?)`,
    args: [id, data.name, data.email, data.subject, data.message, createdAt],
  });
  return { id, success: true };
}

export async function recordPageVisit(pagePath: string, userAgent?: string, sessionId?: string) {
  try {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    await turso.execute({
      sql: `INSERT INTO page_visits (id, page_path, visitor_ip, user_agent, referrer, session_id, created_at)
            VALUES (?, ?, NULL, ?, NULL, ?, ?)`,
      args: [id, pagePath, userAgent || null, sessionId || null, createdAt],
    });
  } catch (err) {
    console.error("Error recording page visit:", err);
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const result = await turso.execute("SELECT * FROM contact_messages ORDER BY created_at DESC");
    return result.rows.map((row) => ({
      id: String(row.id),
      name: String(row.name),
      email: String(row.email),
      subject: String(row.subject),
      message: String(row.message),
      status: String(row.status || 'unread'),
      created_at: String(row.created_at || ''),
    }));
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    return [];
  }
}

export async function deleteContactMessage(id: string) {
  await turso.execute({
    sql: "DELETE FROM contact_messages WHERE id = ?",
    args: [id],
  });
}

export async function getPageVisitsCount(): Promise<number> {
  try {
    const result = await turso.execute("SELECT COUNT(*) as count FROM page_visits");
    return Number(result.rows[0]?.count || 0);
  } catch (err) {
    return 0;
  }
}

// ---------------- SERVICE UPDATE OPERATION ---------------- //

export async function updateServicePrice(id: string, priceFrom: number) {
  const updatedAt = new Date().toISOString();
  await turso.execute({
    sql: "UPDATE services SET price_from = ?, updated_at = ? WHERE id = ?",
    args: [priceFrom, updatedAt, id],
  });
  revalidatePath("/");
  return { success: true };
}

// ---------------- PROJECT CRUD OPERATIONS ---------------- //

export async function createProject(projectData: Partial<Project>) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  
  await turso.execute({
    sql: `INSERT INTO projects (
      id, title, short_description, detailed_description, technologies, 
      images, project_url, repository_url, category, project_type, 
      featured, project_status, completion_date, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      projectData.title || "Nowy Projekt",
      projectData.short_description || "",
      projectData.detailed_description || "",
      JSON.stringify(projectData.technologies || []),
      JSON.stringify(projectData.images || []),
      projectData.project_url || "",
      projectData.repository_url || "",
      projectData.category || "web",
      projectData.project_type || "web-app",
      projectData.featured ? "1" : "0",
      projectData.project_status || "active",
      projectData.completion_date || new Date().toISOString().split("T")[0],
      createdAt,
      createdAt
    ],
  });

  revalidatePath("/");
  return { id, success: true };
}

export async function updateProject(id: string, projectData: Partial<Project>) {
  const updatedAt = new Date().toISOString();
  
  await turso.execute({
    sql: `UPDATE projects SET
      title = ?,
      short_description = ?,
      detailed_description = ?,
      technologies = ?,
      images = ?,
      project_url = ?,
      repository_url = ?,
      category = ?,
      project_type = ?,
      featured = ?,
      project_status = ?,
      updated_at = ?
    WHERE id = ?`,
    args: [
      projectData.title || "",
      projectData.short_description || "",
      projectData.detailed_description || "",
      JSON.stringify(projectData.technologies || []),
      JSON.stringify(projectData.images || []),
      projectData.project_url || "",
      projectData.repository_url || "",
      projectData.category || "web",
      projectData.project_type || "web-app",
      projectData.featured ? "1" : "0",
      projectData.project_status || "active",
      updatedAt,
      id
    ],
  });

  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string) {
  await turso.execute({
    sql: "DELETE FROM projects WHERE id = ?",
    args: [id],
  });
  revalidatePath("/");
  return { success: true };
}

// ---------------- ADMIN AUTHENTICATION ---------------- //

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    const envPassword = process.env.ADMIN_PASSWORD || "***REMOVED_SECRET***";
    if (password === envPassword) return true;

    const result = await turso.execute("SELECT password_hash FROM admin_users LIMIT 1");
    if (result.rows.length === 0) return false;

    const hash = String(result.rows[0].password_hash);
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("Error verifying admin password:", error);
    return false;
  }
}
