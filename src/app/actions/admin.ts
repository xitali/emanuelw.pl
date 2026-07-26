"use server";

import {
  verifyAdminPassword,
  createProject,
  updateProject,
  deleteProject,
  deleteContactMessage,
  updateServicePrice,
  addTestimonial,
  deleteTestimonial,
} from "@/lib/turso";
import {
  createAdminSession,
  logoutAdminSession,
  verifyAdminSession,
} from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import {
  idSchema,
  projectSchema,
  servicePriceSchema,
  splitCommaSeparated,
  testimonialSchema,
} from "@/lib/validation";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function requireAdmin() {
  if (!(await verifyAdminSession())) {
    throw new Error("Brak uprawnień.");
  }
}

function projectFromFormData(formData: FormData) {
  return projectSchema.safeParse({
    title: formData.get("title"),
    short_description: formData.get("short_description"),
    detailed_description: formData.get("detailed_description"),
    technologies: splitCommaSeparated(formData.get("technologies")),
    images: splitCommaSeparated(formData.get("images")),
    project_url: formData.get("project_url") ?? "",
    repository_url: formData.get("repository_url") ?? "",
    category: formData.get("category") ?? "web",
    project_type: formData.get("project_type") ?? "web-app",
    project_status: formData.get("project_status") ?? "active",
    featured: formData.get("featured") === "on",
  });
}

export async function loginAdminAction(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length < 8 || password.length > 200) {
    return { success: false, error: "Wprowadź hasło administratora." };
  }

  const headersList = await headers();
  const rateLimit = await checkRateLimit({
    namespace: "admin-login",
    identifier: getClientIp(headersList),
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return {
      success: false,
      error: `Zbyt wiele prób. Spróbuj ponownie za około ${Math.ceil(
        rateLimit.retryAfter / 60,
      )} min.`,
    };
  }

  const isValid = await verifyAdminPassword(password);
  if (!isValid) {
    return { success: false, error: "Nieprawidłowe hasło administratora." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdminAction() {
  await logoutAdminSession();
  redirect("/admin/login");
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin();
  const validation = projectFromFormData(formData);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message ?? "Nieprawidłowe dane projektu.",
    };
  }

  await createProject(validation.data);

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function updateProjectAction(id: string, formData: FormData) {
  await requireAdmin();
  const validId = idSchema.safeParse(id);
  const validation = projectFromFormData(formData);
  if (!validId.success || !validation.success) {
    return { success: false, error: "Nieprawidłowe dane projektu." };
  }

  await updateProject(validId.data, validation.data);

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  await deleteProject(idSchema.parse(id));
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteMessageAction(id: string) {
  await requireAdmin();
  await deleteContactMessage(idSchema.parse(id));
  revalidatePath("/admin");
  return { success: true };
}

export async function updateServicePriceAction(id: string, priceFrom: number) {
  await requireAdmin();
  const data = servicePriceSchema.parse({ id, price: priceFrom });
  await updateServicePrice(data.id, data.price);
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function createTestimonialAction(formData: FormData) {
  await requireAdmin();
  const validation = testimonialSchema.safeParse({
    client_name: formData.get("client_name"),
    company: formData.get("company"),
    content: formData.get("content"),
    rating: formData.get("rating"),
  });
  if (!validation.success) {
    return { success: false, error: "Sprawdź dane opinii." };
  }

  await addTestimonial(validation.data);

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonialAction(id: string) {
  await requireAdmin();
  await deleteTestimonial(idSchema.parse(id));
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}
