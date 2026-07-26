"use server";

import { submitContactMessage } from "@/lib/turso";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { contactSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { after } from "next/server";
import { notifyAboutContactMessage } from "@/lib/push";

export async function sendContactMessageAction(formData: FormData) {
  const validation = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!validation.success) {
    if (formData.get("website")) {
      return { success: true, message: "Wiadomość została wysłana." };
    }

    return {
      success: false,
      error:
        validation.error.issues[0]?.message ??
        "Sprawdź dane w formularzu.",
    };
  }

  const headersList = await headers();
  const ip = getClientIp(headersList);
  const rateLimit = await checkRateLimit({
    namespace: "contact",
    identifier: ip,
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return {
      success: false,
      error: `Zbyt wiele prób. Spróbuj ponownie za około ${Math.ceil(
        rateLimit.retryAfter / 60,
      )} min.`,
    };
  }

  try {
    const { website: _website, ...validData } = validation.data;
    void _website;
    const savedMessage = await submitContactMessage({
      ...validData,
      subject: validData.subject || "Kontakt z portfolio",
    });
    after(async () => {
      await notifyAboutContactMessage({
        id: savedMessage.id,
      });
    });
    revalidatePath("/admin");
    return { success: true, message: "Wiadomość została wysłana. Dziękuję!" };
  } catch (error) {
    console.error("Nie udało się zapisać wiadomości:", error);
    return {
      success: false,
      error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
    };
  }
}
