import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/turso";
import { getProjectPath, SITE_URL, toAbsoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    {
      url: SITE_URL,
    },
    {
      url: `${SITE_URL}/tworzenie-stron-internetowych-rzeszow`,
      lastModified: new Date("2026-07-29"),
    },
    {
      url: `${SITE_URL}/polityka-prywatnosci`,
      lastModified: new Date("2026-07-26"),
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}${getProjectPath(project)}`,
      lastModified: project.updated_at
        ? new Date(project.updated_at)
        : undefined,
      images: project.images
        .map((image) => toAbsoluteUrl(image))
        .filter((image): image is string => Boolean(image)),
    })),
  ];
}
