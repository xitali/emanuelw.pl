"use server";

import { verifyAdminPassword, createProject, updateProject, deleteProject, deleteContactMessage, updateServicePrice, addTestimonial, deleteTestimonial } from "@/lib/turso";
import { createAdminSession, logoutAdminSession, verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginAdminAction(formData: FormData) {
  const password = formData.get("password") as string;

  if (!password) {
    return { success: false, error: "Wprowadź hasło administratora." };
  }

  const isValid = await verifyAdminPassword(password);
  if (!isValid) {
    return { success: false, error: "Nieprawidłowe hasło administratora!" };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdminAction() {
  await logoutAdminSession();
  redirect("/admin/login");
}

export async function createProjectAction(formData: FormData) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("Brak uprawnień!");

  const title = formData.get("title") as string;
  const short_description = formData.get("short_description") as string;
  const detailed_description = formData.get("detailed_description") as string;
  const technologiesRaw = formData.get("technologies") as string;
  const imagesRaw = formData.get("images") as string;
  const project_url = formData.get("project_url") as string;
  const repository_url = formData.get("repository_url") as string;
  const category = formData.get("category") as string;
  const project_type = formData.get("project_type") as string;

  const technologies = technologiesRaw ? technologiesRaw.split(",").map((t) => t.trim()) : [];
  const images = imagesRaw ? imagesRaw.split(",").map((img) => img.trim()) : [];

  await createProject({
    title,
    short_description,
    detailed_description,
    technologies,
    images,
    project_url,
    repository_url,
    category,
    project_type,
    featured: true,
  });

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function updateProjectAction(id: string, formData: FormData) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("Brak uprawnień!");

  const title = formData.get("title") as string;
  const short_description = formData.get("short_description") as string;
  const detailed_description = formData.get("detailed_description") as string;
  const technologiesRaw = formData.get("technologies") as string;
  const imagesRaw = formData.get("images") as string;
  const project_url = formData.get("project_url") as string;
  const repository_url = formData.get("repository_url") as string;
  const category = formData.get("category") as string;

  const technologies = technologiesRaw ? technologiesRaw.split(",").map((t) => t.trim()) : [];
  const images = imagesRaw ? imagesRaw.split(",").map((img) => img.trim()) : [];

  await updateProject(id, {
    title,
    short_description,
    detailed_description,
    technologies,
    images,
    project_url,
    repository_url,
    category,
  });

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProjectAction(id: string) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("Brak uprawnień!");

  await deleteProject(id);
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteMessageAction(id: string) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("Brak uprawnień!");

  await deleteContactMessage(id);
  revalidatePath("/admin");
  return { success: true };
}

export async function updateServicePriceAction(id: string, priceFrom: number) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("Brak uprawnień!");

  await updateServicePrice(id, priceFrom);
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function createTestimonialAction(formData: FormData) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("Brak uprawnień!");

  const client_name = formData.get("client_name") as string;
  const company = formData.get("company") as string;
  const content = formData.get("content") as string;
  const rating = Number(formData.get("rating") || 5);

  await addTestimonial({
    client_name,
    company,
    content,
    rating
  });

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonialAction(id: string) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) throw new Error("Brak uprawnień!");

  await deleteTestimonial(id);
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}
