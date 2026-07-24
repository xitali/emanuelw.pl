"use server";

import { submitContactMessage } from "@/lib/turso";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Imię musi mieć co najmniej 2 znaki").max(100, "Imię jest za długie"),
  email: z.string().email("Podaj prawidłowy adres e-mail"),
  subject: z.string().max(200, "Temat jest za długi").optional(),
  message: z.string().min(10, "Wiadomość musi mieć minimum 10 znaków").max(2000, "Wiadomość jest za długa (max 2000 znaków)"),
});

// Prosty in-memory Rate Limiter
// Zabezpiecza przed prostym spamem, choć resetuje się przy "cold start" na Vercelu
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuta
const MAX_REQUESTS = 3; // max 3 wiadomości na minutę

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function sendContactMessageAction(formData: FormData) {
  // Pobieranie IP w Next.js Server Actions
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";

  if (isRateLimited(ip)) {
    return { success: false, error: "Zbyt wiele zapytań. Odczekaj chwilę przed wysłaniem kolejnej wiadomości." };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Walidacja Zod
  const validationResult = contactSchema.safeParse({ name, email, subject, message });

  if (!validationResult.success) {
    // Pobieranie pierwszego błędu z Zoda
    const firstError = validationResult.error.issues[0]?.message || "Nieprawidłowe dane formularza";
    return { success: false, error: firstError };
  }

  const validData = validationResult.data;

  try {
    await submitContactMessage({
      name: validData.name,
      email: validData.email,
      subject: validData.subject || "Kontakt z Portfolio",
      message: validData.message,
    });

    revalidatePath("/admin");
    return { success: true, message: "Wiadomość została pomyślnie wysłana i zapisana!" };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Wystąpił błąd podczas wysyłania. Spróbuj ponowne." };
  }
}
