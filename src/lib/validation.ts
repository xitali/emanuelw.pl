import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .transform((value) => {
    if (!value) return "";
    if (value.startsWith("/")) return value;
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  })
  .refine(
    (value) => {
      if (!value || value.startsWith("/")) return true;
      try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:";
      } catch {
        return false;
      }
    },
    { message: "Podaj prawidłowy adres URL." },
  );

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Imię musi mieć co najmniej 2 znaki.").max(100),
  email: z.email("Podaj prawidłowy adres e-mail.").max(254),
  subject: z.string().trim().max(200).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków.")
    .max(2000, "Wiadomość może mieć maksymalnie 2000 znaków."),
  website: z.string().max(0).optional().default(""),
});

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  short_description: z.string().trim().min(10).max(300),
  detailed_description: z.string().trim().max(5000).optional().default(""),
  technologies: z.array(z.string().trim().min(1).max(60)).max(30),
  images: z.array(optionalUrl).max(12),
  project_url: optionalUrl,
  repository_url: optionalUrl,
  category: z.string().trim().min(2).max(50).default("web"),
  project_type: z.string().trim().min(2).max(50).default("web-app"),
  project_status: z.enum(["active", "in-development", "archived"]).default("active"),
  featured: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  client_name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(120).optional().default(""),
  content: z.string().trim().min(10).max(1000),
  rating: z.coerce.number().int().min(1).max(5),
});

export const idSchema = z.string().uuid();

export const servicePriceSchema = z.object({
  id: idSchema,
  price: z.number().finite().min(0).max(1_000_000),
});

export function splitCommaSeparated(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
