import { describe, expect, it } from "vitest";
import { selectProjectHighlights } from "../src/lib/project-highlights";
import { contactSchema } from "../src/lib/validation";
import { messageWithSource } from "../src/lib/contact-sources";
import type { Project } from "../src/types";

describe("wyróżnione realizacje", () => {
  it("uzupełnia wybór dostępnymi projektami bez duplikowania ani modyfikowania danych", () => {
    const projects = ["a", "09e837ed-2206-49b7-9b81-21c6222a18f5", "b", "c"].map(id => ({ id }) as Project);
    expect(selectProjectHighlights(projects).map(p => p.id)).toEqual([projects[1].id, "a", "b"]);
    expect(projects.map(p => p.id)).toEqual(["a", projects[1].id, "b", "c"]);
    expect(selectProjectHighlights([])).toEqual([]);
  });
});

describe("źródło kontaktu", () => {
  const message = { name: "Jan Kowalski", email: "jan@example.com", message: "Proszę o kontakt w sprawie strony." };
  it("pozostawia źródło opcjonalne i zachowuje oryginalną treść", () => {
    expect(contactSchema.parse(message).source).toBe("");
    expect(messageWithSource(message.message, "")).toBe(message.message);
  });
  it("zapisuje wybrane źródło i odrzuca wartości spoza formularza", () => {
    expect(contactSchema.parse({ ...message, source: "Polecenie" }).source).toBe("Polecenie");
    expect(messageWithSource(message.message, "Polecenie")).toContain("Źródło kontaktu (wskazane w formularzu): Polecenie");
    expect(contactSchema.safeParse({ ...message, source: "nieznane\nźródło" }).success).toBe(false);
  });
});
