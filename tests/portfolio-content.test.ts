import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import records from "../content/portfolio-projects.json";
import { projectSchema } from "../src/lib/validation";

describe("publikowane opisy i rzeczywiste galerie", () => {
  it.each(records)("$slug ma kompletny opis i lokalne zdjęcia", (record) => {
    expect(projectSchema.safeParse({ ...record, is_published: true }).success).toBe(true);
    expect(record.images.length).toBeGreaterThan(1);
    expect(record.image_alts).toHaveLength(record.images.length);
    for (const image of record.images) expect(existsSync(resolve("public", image.slice(1)))).toBe(true);
    expect(record.success_metrics).toEqual([]);
    expect(record.user_feedback).toEqual([]);
  });
  it("zachowuje status testowy Solid Print i sklepu", () => {
    expect(records.find(p => p.slug === "solid-print")?.project_status).toBe("in-development");
    expect(records.find(p => p.slug === "sklep-internetowy-demo")?.project_status).toBe("in-development");
    expect(new Set(records.map(p => p.slug)).size).toBe(records.length);
  });
});
