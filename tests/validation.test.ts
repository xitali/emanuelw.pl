import { describe, expect, it } from "vitest";
import {
  contactSchema,
  projectSchema,
  splitCommaSeparated,
} from "../src/lib/validation";
import { PROJECT_QUOTE_PREFILL } from "../src/lib/contact-prefill";

describe("walidacja formularzy", () => {
  it("akceptuje poprawną wiadomość", () => {
    const result = contactSchema.safeParse({
      name: "Jan Kowalski",
      email: "jan@example.com",
      subject: "Nowa strona",
      message: "Proszę o przygotowanie wstępnej wyceny projektu.",
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("odrzuca pole-pułapkę i nieprawidłowy e-mail", () => {
    const result = contactSchema.safeParse({
      name: "Bot",
      email: "nie-email",
      subject: "",
      message: "Automatyczna wiadomość testowa",
      website: "https://spam.example",
    });

    expect(result.success).toBe(false);
  });

  it("normalizuje adres projektu bez protokołu", () => {
    const result = projectSchema.parse({
      title: "Projekt testowy",
      short_description: "Opis projektu mający więcej niż dziesięć znaków.",
      technologies: ["Next.js"],
      images: [],
      project_url: "example.com",
      repository_url: "",
      category: "web",
      project_type: "web-app",
      project_status: "active",
      featured: false,
    });

    expect(result.project_url).toBe("https://example.com");
  });

  it("czyści listę rozdzieloną przecinkami", () => {
    expect(splitCommaSeparated("Next.js, TypeScript, , Zod")).toEqual([
      "Next.js",
      "TypeScript",
      "Zod",
    ]);
  });

  it("przygotowuje czytelny szablon zapytania o wycenę", () => {
    expect(PROJECT_QUOTE_PREFILL.subject).toBe("Zapytanie o wycenę projektu");
    expect(PROJECT_QUOTE_PREFILL.message).toContain("Rodzaj projektu:");
    expect(PROJECT_QUOTE_PREFILL.message).toContain("Budżet orientacyjny:");
    expect(PROJECT_QUOTE_PREFILL.message).toContain("[");
  });
});
