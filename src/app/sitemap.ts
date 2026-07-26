import { MetadataRoute } from 'next';
import { getProjects } from "@/lib/turso";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://emanuelwloch.pl';
  const projects = await getProjects();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/projekty/${project.id}`,
      lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
