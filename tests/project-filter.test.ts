import { describe, expect, it } from "vitest";
import { projectMatchesCategory } from "../src/lib/project-filter";
import type { Project } from "../src/types";

const project: Project = {
  id: "1",
  title: "Sklep",
  short_description: "Test",
  technologies: [],
  images: [],
  category: "web",
  project_type: "e-commerce",
};

describe("filtrowanie projektów", () => {
  it("nie nakłada kategorii web i e-commerce", () => {
    expect(projectMatchesCategory(project, "web")).toBe(false);
    expect(projectMatchesCategory(project, "e-commerce")).toBe(true);
    expect(projectMatchesCategory(project, "mobile")).toBe(false);
  });

  it("rozpoznaje projekt mobilny", () => {
    const mobileProject: Project = {
      ...project,
      id: "2",
      category: "mobile",
      project_type: "android-app",
    };

    expect(projectMatchesCategory(mobileProject, "mobile")).toBe(true);
    expect(projectMatchesCategory(mobileProject, "web")).toBe(false);
  });

  it("zwraca wszystkie projekty dla filtra all", () => {
    expect(projectMatchesCategory(project, "all")).toBe(true);
  });
});
