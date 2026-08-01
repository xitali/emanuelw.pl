import type { Project } from "@/types";

export const SITE_URL = "https://emanuelwloch.pl";

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function slugify(value: string): string {
  return value
    .replace(/[łŁ]/g, "l")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function getProjectSegment(project: Pick<Project, "id" | "title">) {
  const slug = slugify(project.title) || "projekt";
  return `${slug}-${project.id}`;
}

export function getProjectPath(project: Pick<Project, "id" | "title">) {
  return `/projekty/${getProjectSegment(project)}`;
}

export function getProjectIdFromSegment(segment: string) {
  const uuidAtEnd = segment.match(
    /([0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i,
  );

  return uuidAtEnd?.[1] ?? segment;
}

export function toAbsoluteUrl(value?: string) {
  if (!value) return undefined;

  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return undefined;
  }
}
