"use client";
import { projectLabel } from "@/lib/project-labels";
import { useState } from "react";
import ProjectMedia from "./ProjectMedia";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { projectMatchesCategory } from "@/lib/project-filter";
import { getProjectPath } from "@/lib/seo";
import { selectProjectHighlights } from "@/lib/project-highlights";

const ProjectModal = dynamic(() => import("@/components/ProjectModal"));
const categories = [["all", "Wszystkie"], ["web", "Strony i aplikacje"], ["e-commerce", "Sklepy"], ["mobile", "Aplikacje mobilne"]];

function ProjectCard({ project, index, onOpen, highlighted = false }: { project: Project; index: number; onOpen: () => void; highlighted?: boolean }) {
  return <article className={`showcase-card${index === 0 ? " showcase-featured" : ""}`}>
    {project.images[0] ? <ProjectMedia projectId={project.id} image={project.images[0]} fallbackImage={project.images.find(src => src.startsWith("/projects/"))} title={project.title} onOpen={onOpen} /> : <button className="showcase-type-visual" onClick={onOpen}>{project.title}</button>}
    <div className="showcase-caption"><div><p className="portfolio-kicker">{String(index + 1).padStart(2, "0")} / {projectLabel(project.project_type || project.category)}</p><h3><Link href={getProjectPath(project)}>{project.title}</Link></h3><p>{project.short_description}</p></div><Link className="showcase-arrow" href={getProjectPath(project)} aria-label={`Opis realizacji: ${project.title}`}><ArrowUpRight /></Link></div>
    {highlighted ? <><dl className="project-outcome">{project.main_challenge && <div><dt>Wyzwanie</dt><dd>{project.main_challenge}</dd></div>}{project.project_result && <div><dt>Rezultat</dt><dd>{project.project_result}</dd></div>}</dl><Link className="portfolio-text-link" href={getProjectPath(project)}>Poznaj przebieg realizacji <ArrowUpRight size={16} /></Link></> : <div className="portfolio-tags">{project.technologies.slice(0, 5).map((tech, i) => <span key={`${tech}-${i}`}>{tech}</span>)}</div>}
  </article>;
}

export default function ProjectShowcase({ initialProjects }: { initialProjects: Project[] }) {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState(false);
  const highlights = selectProjectHighlights(initialProjects);
  const available = categories.filter(([id]) => id === "all" || initialProjects.some(project => projectMatchesCategory(project, id)));
  const filtered = initialProjects.filter(project => projectMatchesCategory(project, category));
  return <section id="projekty" className="portfolio-projects portfolio-container" aria-labelledby="projects-heading">
    <header className="portfolio-section-heading"><div><p className="portfolio-kicker">01 / WYBRANE REALIZACJE</p><h2 id="projects-heading">Pomysły w kodzie.<br /><span>Efekty na ekranie.</span></h2></div><p>Różne branże. Różne wyzwania.<br />Ta sama dbałość o każdy detal.</p></header>
    <div className="showcase-grid">{highlights.map((project, index) => <ProjectCard key={project.id} project={project} index={index} highlighted onOpen={() => setSelected(project)} />)}</div>
    {initialProjects.length > 3 && <div className="project-archive"><button className="portfolio-button portfolio-button--secondary" aria-expanded={expanded} aria-controls="project-archive" onClick={() => setExpanded(!expanded)}>{expanded ? "Zwiń wszystkie realizacje" : `Zobacz wszystkie realizacje (${initialProjects.length})`} <ArrowUpRight size={17} /></button><div id="project-archive" hidden={!expanded}>
    <div className="portfolio-filters" role="group" aria-label="Filtrowanie projektów">{available.map(([id, label]) => <button key={id} aria-pressed={id === category} onClick={() => setCategory(id)}>{label}<span>{initialProjects.filter(project => projectMatchesCategory(project, id)).length}</span></button>)}</div>
    <div className="showcase-grid">{filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={() => setSelected(project)} />)}</div>
    </div></div>}
    {!filtered.length && <p className="portfolio-empty">Realizacje są chwilowo niedostępne. <a href="#kontakt">Napisz do mnie — opowiem o swoim portfolio.</a></p>}
    {selected && <ProjectModal dark project={selected} onClose={() => setSelected(null)} />}
  </section>;
}
