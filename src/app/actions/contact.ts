"use server";

import { submitContactMessage } from "@/lib/turso";
import { revalidatePath } from "next/cache";

export async function sendContactMessageAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Uzupełnij wymagane pola (Imię, Email, Wiadomość)." };
  }

  try {
    await submitContactMessage({
      name,
      email,
      subject: subject || "Kontakt z Portfolio",
      message,
    });

    revalidatePath("/admin");
    return { success: true, message: "Wiadomość została pomyślnie wysłana i zapisana!" };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Wystąpił błąd podczas wysyłania. Spróbuj ponowne." };
  }
}
