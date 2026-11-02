import { describe, expect, it } from "vitest";
import { projectSchema, contactSchema } from "../src/lib/validation";

const project = { title: "Przykładowa realizacja", short_description: "Prawdziwy opis wykonanego projektu", technologies: [], images: [], project_url: "", repository_url: "" };
describe("opis realizacji w panelu", () => {
  it("zachowuje wyzwanie, rezultat i wyniki ze źródłem", () => {
    const parsed = projectSchema.parse({ ...project, main_challenge: "Problem klienta", project_result: "Działający system", success_metrics: ["Wynik potwierdzony przez klienta, 2026-11-02"] });
    expect(parsed.main_challenge).toBe("Problem klienta");
    expect(parsed.project_result).toBe("Działający system");
    expect(parsed.success_metrics).toEqual(["Wynik potwierdzony przez klienta, 2026-11-02"]);
  });
  it("odróżnia pominięte dane od jawnego wyczyszczenia pola", () => {
    expect(projectSchema.parse(project).main_challenge).toBeUndefined();
    expect(projectSchema.parse({ ...project, main_challenge: "", key_features: [] }).key_features).toEqual([]);
    expect(projectSchema.safeParse({ ...project, key_features: ["x".repeat(1001)] }).success).toBe(false);
  });
  it("odrzuca nieprawidłowy kontekst zapytania", () => {
    const lead = { name: "Jan Kowalski", email: "jan@example.com", message: "Proszę o rozmowę o stronie." };
    expect(contactSchema.safeParse({ ...lead, from_project: "nieznany" }).success).toBe(false);
    expect(contactSchema.parse({ ...lead, from_project: "5fa80c09-f256-4dc9-a94e-6a08ae809345" }).from_project).toBe("5fa80c09-f256-4dc9-a94e-6a08ae809345");
  });
});
