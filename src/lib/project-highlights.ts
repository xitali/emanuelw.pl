import type { Project } from "@/types";

export function selectProjectHighlights(projects: Project[]) {
  return [...projects.filter(project => Boolean(project.featured)), ...projects.filter(project => !project.featured)].slice(0, 3);
}
