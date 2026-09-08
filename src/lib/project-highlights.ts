import type { Project } from "@/types";

const selection = [
  "09e837ed-2206-49b7-9b81-21c6222a18f5",
  "fe49066a-9990-453d-b368-8f72df1e414a",
  "ecca3780-0d01-489a-a240-a19e632c3a65",
];

export function selectProjectHighlights(projects: Project[]) {
  const selected = selection.flatMap(id => projects.find(project => project.id === id) ?? []);
  const remaining = projects.filter(project => !selected.some(item => item.id === project.id));
  return [...selected, ...remaining].slice(0, 3);
}
