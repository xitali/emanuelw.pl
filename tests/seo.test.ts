import { describe, expect, it } from "vitest";
import {
  getProjectIdFromSegment,
  getProjectPath,
  serializeJsonLd,
  slugify,
  toAbsoluteUrl,
} from "../src/lib/seo";
import { servicePages } from "../src/lib/service-pages";
import { guidePages } from "../src/lib/guide-pages";

describe("SEO URL helpers", () => {
  it("creates readable ASCII slugs from Polish titles", () => {
    expect(slugify("Rzeszów Tatuaż – Iluminatia Tattoo")).toBe(
      "rzeszow-tatuaz-iluminatia-tattoo",
    );
    expect(slugify("Emanuel Włoch")).toBe("emanuel-wloch");
  });

  it("keeps the stable project id at the end of the readable path", () => {
    const project = {
      id: "5fa80c09-f256-4dc9-a94e-6a08ae809345",
      title: "Rzeszów Tatuaż",
    };

    expect(getProjectPath(project)).toBe(
      "/projekty/rzeszow-tatuaz-5fa80c09-f256-4dc9-a94e-6a08ae809345",
    );
  });

  it("extracts a UUID from both legacy and readable project segments", () => {
    const id = "5fa80c09-f256-4dc9-a94e-6a08ae809345";

    expect(getProjectIdFromSegment(id)).toBe(id);
    expect(getProjectIdFromSegment(`rzeszow-tatuaz-${id}`)).toBe(id);
  });

  it("converts local image paths to absolute URLs", () => {
    expect(toAbsoluteUrl("/projects/example.jpg")).toBe(
      "https://emanuelwloch.pl/projects/example.jpg",
    );
  });

  it("serializes JSON-LD without allowing a closing script injection", () => {
    expect(serializeJsonLd({ value: "</script><script>alert(1)</script>" })).toBe(
      '{"value":"\\u003c/script>\\u003cscript>alert(1)\\u003c/script>"}',
    );
  });
});

describe("SEO service landing pages", () => {
  it("uses unique paths and titles for every search intent", () => {
    expect(servicePages).toHaveLength(6);
    expect(new Set(servicePages.map((page) => page.path)).size).toBe(servicePages.length);
    expect(new Set(servicePages.map((page) => page.metaTitle)).size).toBe(servicePages.length);
  });

  it("provides substantial, visible answer content for every service", () => {
    for (const page of servicePages) {
      expect(page.directAnswer.length).toBeGreaterThan(120);
      expect(page.faq.length).toBeGreaterThanOrEqual(7);
      expect(page.benefits).toHaveLength(4);
      expect(page.process).toHaveLength(4);
    }
  });

  it("keeps Jarosław as the location and Rzeszów as a served market", () => {
    const jaroslaw = servicePages.find((page) => page.slug.endsWith("jaroslaw"));
    const rzeszow = servicePages.find((page) => page.slug.endsWith("rzeszow"));

    expect(jaroslaw?.lead).toContain("Jarosławia");
    expect(rzeszow?.directAnswer).toContain("Działam z Jarosławia");
    expect(rzeszow?.directAnswer).toContain("klienta z Rzeszowa");
  });
});

describe("AEO guide pages", () => {
  it("provides three distinct expert answers", () => {
    expect(guidePages).toHaveLength(3);
    expect(new Set(guidePages.map((guide) => guide.path)).size).toBe(3);
    expect(new Set(guidePages.map((guide) => guide.metaTitle)).size).toBe(3);
  });

  it("keeps every guide substantial and answer-first", () => {
    for (const guide of guidePages) {
      expect(guide.directAnswer.length).toBeGreaterThan(180);
      expect(guide.sections.length).toBeGreaterThanOrEqual(4);
      expect(guide.faq.length).toBeGreaterThanOrEqual(6);
    }
  });
});
