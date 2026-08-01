import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/turso";
import { getProjectPath, SITE_URL, toAbsoluteUrl } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";
import { guidePages } from "@/lib/guide-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-07-31"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/uslugi`,
      lastModified: new Date("2026-07-31"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/o-mnie`,
      lastModified: new Date("2026-07-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...servicePages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: new Date("2026-07-31"),
      changeFrequency: "monthly" as const,
      priority: page.slug.endsWith("jaroslaw") ? 0.9 : 0.8,
    })),
    {
      url: `${SITE_URL}/poradniki`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...guidePages.map((guide) => ({
      url: `${SITE_URL}${guide.path}`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${SITE_URL}/polityka-prywatnosci`,
      lastModified: new Date("2026-07-26"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}${getProjectPath(project)}`,
      lastModified: project.updated_at
        ? new Date(project.updated_at)
        : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      images: project.images
        .map((image) => toAbsoluteUrl(image))
        .filter((image): image is string => Boolean(image)),
    })),
  ];
}
