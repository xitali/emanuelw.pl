import type { Project } from "@/types";

export function selectProjectHighlights(projects: Project[]) {
  const featured = projects.filter(project => Boolean(project.featured)).sort((a, b) => Number(a.project_status === "in-development") - Number(b.project_status === "in-development"));
  return [...featured, ...projects.filter(project => !project.featured)].slice(0, 3);
}
