"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { projectMatchesCategory } from "@/lib/project-filter";
import { Project } from "@/types";
import ProjectModal from "./ProjectModal";

interface ProjectsSectionProps {
  initialProjects: Project[];
}

interface ProjectShowcaseItemProps {
  project: Project;
  index: number;
  total: number;
  enableMotion: boolean;
  onOpen: (project: Project) => void;
}

const categories = [
  { id: "all", label: "Wszystkie projekty" },
  { id: "web", label: "Strony i aplikacje webowe" },
  { id: "e-commerce", label: "E-commerce" },
  { id: "mobile", label: "Aplikacje mobilne" },
];

const accents = [
  {
    glow: "bg-cyan-400/20 dark:bg-cyan-400/15",
    line: "from-cyan-400 via-sky-500 to-violet-500",
    number: "text-cyan-600 dark:text-cyan-300",
    badge:
      "border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-700 dark:text-cyan-300",
  },
  {
    glow: "bg-violet-500/20 dark:bg-violet-500/15",
    line: "from-violet-400 via-fuchsia-500 to-cyan-400",
    number: "text-violet-600 dark:text-violet-300",
    badge:
      "border-violet-500/25 bg-violet-500/[0.07] text-violet-700 dark:text-violet-300",
  },
  {
    glow: "bg-emerald-400/20 dark:bg-emerald-400/15",
    line: "from-emerald-400 via-cyan-500 to-blue-500",
    number: "text-emerald-600 dark:text-emerald-300",
    badge:
      "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-700 dark:text-emerald-300",
  },
];

function getProjectHost(project: Project) {
  if (!project.project_url) {
    return "case-study.local";
  }

  try {
    return new URL(project.project_url).hostname.replace(/^www\./, "");
  } catch {
    return "case-study.local";
  }
}

function getProjectStatus(project: Project) {
  if (project.project_status === "in-development") {
    return "W realizacji";
  }

  if (project.project_status === "archived") {
    return "Case study";
  }

  return "Projekt komercyjny";
}

function ProjectShowcaseItem({
  project,
  index,
  total,
  enableMotion,
  onOpen,
}: ProjectShowcaseItemProps) {
  const itemRef = useRef<HTMLElement>(null);
  const accent = accents[index % accents.length];
  const mainImage = project.images?.[0] ?? null;
  const projectNumber = String(index + 1).padStart(2, "0");
  const totalNumber = String(total).padStart(2, "0");

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    mass: 0.28,
  });

  const frameY = useTransform(progress, [0, 0.5, 1], [72, 0, -52]);
  const frameScale = useTransform(progress, [0, 0.5, 1], [0.9, 1, 0.94]);
  const frameRotateX = useTransform(progress, [0, 0.5, 1], [5, 0, -3]);
  const frameRotateY = useTransform(progress, [0, 0.5, 1], [-8, 0, 6]);
  const frameOpacity = useTransform(
    progress,
    [0, 0.18, 0.8, 1],
    [0.58, 1, 1, 0.7],
  );
  const contentY = useTransform(progress, [0, 0.5, 1], [34, 0, -24]);
  const contentOpacity = useTransform(
    progress,
    [0, 0.2, 0.82, 1],
    [0.62, 1, 1, 0.76],
  );

  return (
    <article
      ref={itemRef}
      className="relative flex min-h-[760px] items-center py-16 lg:min-h-[88vh] lg:py-20"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-[8%] top-1/2 size-[min(42vw,560px)] -translate-y-1/2 rounded-full blur-[110px] ${accent.glow}`}
      />

      <div className="relative grid w-full items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <motion.div
          className="relative z-10 max-w-xl"
          style={{
            y: enableMotion ? contentY : 0,
            opacity: enableMotion ? contentOpacity : 1,
            willChange: enableMotion ? "transform, opacity" : "auto",
          }}
        >
          <div className="mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.18em]">
            <span className={`text-lg font-semibold ${accent.number}`}>
              {projectNumber}
            </span>
            <span className="h-px w-12 bg-slate-300 dark:bg-white/15" />
            <span className="text-slate-400 dark:text-slate-500">
              {totalNumber}
            </span>
          </div>

          <div className="space-y-5">
            <span
              className={`inline-flex rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] ${accent.badge}`}
            >
              {getProjectStatus(project)}
            </span>

            <h3
              id={`project-title-${project.id}`}
              className="text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-5xl dark:text-white"
            >
              {project.title}
            </h3>

            <p className="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
              {project.short_description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.technologies?.slice(0, 5).map((technology, techIndex) => (
              <span
                key={`${technology}-${techIndex}`}
                className="rounded-full border border-slate-200 bg-white/65 px-3 py-1.5 font-mono text-[10px] text-slate-600 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.035] dark:text-slate-400"
              >
                {technology}
              </span>
            ))}
            {project.technologies && project.technologies.length > 5 && (
              <span className="rounded-full border border-slate-200 bg-white/65 px-3 py-1.5 font-mono text-[10px] text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.035] dark:text-slate-500">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-colors hover:bg-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-4 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-300 dark:focus-visible:ring-offset-slate-950"
          >
            Zobacz case study
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        <motion.div
          className="relative z-10"
          style={{
            y: enableMotion ? frameY : 0,
            scale: enableMotion ? frameScale : 1,
            rotateX: enableMotion ? frameRotateX : 0,
            rotateY: enableMotion ? frameRotateY : 0,
            opacity: enableMotion ? frameOpacity : 1,
            transformPerspective: 1600,
            transformStyle: "preserve-3d",
            willChange: enableMotion ? "transform, opacity" : "auto",
          }}
        >
          <div
            aria-hidden="true"
            className={`absolute -inset-x-8 -bottom-9 h-20 rounded-[50%] bg-gradient-to-r ${accent.line} opacity-20 blur-3xl`}
          />

          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            aria-label={`Zobacz szczegóły projektu ${project.title}`}
            className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-slate-300/80 bg-white text-left shadow-[0_42px_90px_-38px_rgba(15,23,42,0.55)] transition-shadow hover:shadow-[0_52px_110px_-38px_rgba(6,182,212,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-4 dark:border-white/10 dark:bg-[#0b101a] dark:shadow-[0_46px_100px_-38px_rgba(0,0,0,0.9)] dark:focus-visible:ring-offset-slate-950"
          >
            <div className="flex h-11 items-center gap-3 border-b border-slate-200 bg-slate-50/95 px-4 dark:border-white/[0.08] dark:bg-[#111723]">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="mx-auto flex h-6 max-w-[58%] flex-1 items-center justify-center rounded-md border border-slate-200 bg-white px-3 font-mono text-[9px] text-slate-400 dark:border-white/[0.07] dark:bg-white/[0.035] dark:text-slate-500">
                {getProjectHost(project)}
              </div>
              <ArrowUpRight className="size-3.5 text-slate-400 transition-colors group-hover:text-cyan-500" />
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-950">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={`Podgląd projektu ${project.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-[#111827] dark:via-[#0b101a] dark:to-slate-950">
                  <Layers className="size-16 text-slate-400/70 dark:text-slate-700" />
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/16 via-transparent to-white/5"
              />

              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/25 bg-slate-950/75 px-3 py-2 text-[10px] font-medium text-white opacity-100 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1 lg:opacity-0 lg:group-hover:opacity-100">
                <MousePointer2 className="size-3" />
                Otwórz projekt
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </article>
  );
}

export default function ProjectShowcaseSection({
  initialProjects,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(
    null,
  );
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktopState = () => setIsDesktop(mediaQuery.matches);

    updateDesktopState();
    mediaQuery.addEventListener("change", updateDesktopState);

    return () => mediaQuery.removeEventListener("change", updateDesktopState);
  }, []);

  const filteredProjects = initialProjects.filter((project) =>
    projectMatchesCategory(project, selectedCategory),
  );
  const enableMotion = isDesktop && !shouldReduceMotion;

  return (
    <section
      id="projekty"
      aria-labelledby="projects-heading"
      className="relative z-10 overflow-hidden border-t border-slate-200 bg-white/40 py-24 dark:border-white/[0.07] dark:bg-[#070a12]/55"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] px-3.5 py-1.5 font-mono text-xs text-cyan-700 dark:text-cyan-300">
            <Sparkles className="size-3.5" />
            <span>Portfolio realizacji</span>
          </div>

          <h2
            id="projects-heading"
            className="mt-5 text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white"
          >
            Projekty, które
            <span className="block bg-gradient-to-r from-cyan-500 to-violet-600 bg-clip-text text-transparent">
              pracują w produkcji.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Każda realizacja łączy dopracowany interfejs, technologię i konkretny
            cel biznesowy. Przewiń, aby zobaczyć je z bliska.
          </p>

          <div
            className="mt-8 flex flex-wrap justify-center gap-2"
            aria-label="Filtrowanie projektów"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                  selectedCategory === category.id
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950"
                    : "border border-slate-200 bg-white/65 text-slate-600 backdrop-blur-md hover:border-cyan-500/30 hover:text-slate-950 dark:border-white/[0.08] dark:bg-white/[0.035] dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </header>

        <div className="mt-12 divide-y divide-slate-200/80 dark:divide-white/[0.07]">
          {filteredProjects.map((project, index) => (
            <ProjectShowcaseItem
              key={project.id}
              project={project}
              index={index}
              total={filteredProjects.length}
              enableMotion={enableMotion}
              onOpen={setActiveModalProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mx-auto mt-16 max-w-xl rounded-3xl border border-slate-200 bg-white/70 px-6 py-14 text-center text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.035] dark:text-slate-400">
            Brak projektów w tej kategorii.
          </div>
        )}

        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
