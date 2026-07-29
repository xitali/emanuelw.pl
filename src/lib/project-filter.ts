import type { Project } from "@/types";

export function projectMatchesCategory(
  project: Project,
  selectedCategory: string,
): boolean {
  if (selectedCategory === "all") return true;

  const projectCategories = [project.category, project.project_type]
    .filter(Boolean)
    .map((value) => value!.toLowerCase());
  const isEcommerce = projectCategories.some(
    (value) => value.includes("e-commerce") || value.includes("ecommerce"),
  );
  const isMobile = projectCategories.some((value) =>
    ["mobile", "android", "ios", "react-native", "kotlin", "swift"].some(
      (mobileCategory) => value.includes(mobileCategory),
    ),
  );

  if (selectedCategory === "e-commerce") return isEcommerce;
  if (selectedCategory === "mobile") return isMobile;
  if (selectedCategory === "web") {
    return !isEcommerce && !isMobile;
  }

  return projectCategories.some((value) => value.includes(selectedCategory));
}
