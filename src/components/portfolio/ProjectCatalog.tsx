"use client";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectShowcase";
import { projectMatchesCategory } from "@/lib/project-filter";

const ProjectModal = dynamic(() => import("@/components/ProjectModal"));
const categories = [["all", "Wszystkie"], ["web", "Strony i aplikacje internetowe"], ["e-commerce", "Sklepy"], ["mobile", "Aplikacje mobilne"], ["apps", "Aplikacje TV i Windows"]];

export default function ProjectCatalog({ projects, category }: { projects: Project[]; category: string }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = projects.filter(project => projectMatchesCategory(project, category));
  return <><nav className="portfolio-filters" aria-label="Kategorie realizacji">{categories.map(([id, label]) => <Link key={id} className="portfolio-button portfolio-button--secondary" aria-current={id === category ? "page" : undefined} href={id === "all" ? "/realizacje" : `/realizacje?kategoria=${id}`}>{label} ({projects.filter(p => projectMatchesCategory(p, id)).length})</Link>)}</nav>
    <div className="showcase-grid">{filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={() => setSelected(project)} />)}</div>
    {!filtered.length && <p>Brak realizacji w tej kategorii. <Link href="/realizacje">Zobacz wszystkie</Link>.</p>}
    {selected && <ProjectModal dark project={selected} onClose={() => setSelected(null)} />}
  </>;
}
