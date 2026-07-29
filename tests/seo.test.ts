import { describe, expect, it } from "vitest";
import {
  getProjectIdFromSegment,
  getProjectPath,
  slugify,
  toAbsoluteUrl,
} from "../src/lib/seo";

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
});
