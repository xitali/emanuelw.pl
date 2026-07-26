import type { Project } from "@/types";

export function projectMatchesCategory(
  project: Project,
  selectedCategory: string,
): boolean {
  if (selectedCategory === "all") return true;

  return [project.category, project.project_type]
    .filter(Boolean)
    .some((value) => value!.toLowerCase().includes(selectedCategory));
}
