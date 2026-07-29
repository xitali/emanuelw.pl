"use client";

import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Plus,
  Sparkles,
} from "lucide-react";
import { projectMatchesCategory } from "@/lib/project-filter";
import { Project } from "@/types";
import ProjectModal from "./ProjectModal";

interface ProjectsSectionProps {
  initialProjects: Project[];
}

interface ProjectDeckCardProps {
  project: Project;
  index: number;
  activeIndex: number;
  shouldReduceMotion: boolean;
  onOpen: (project: Project) => void;
}

const categories = [
  { id: "all", label: "Wszystkie" },
  { id: "web", label: "Web" },
  { id: "e-commerce", label: "E-commerce" },
  { id: "mobile", label: "Mobile" },
];

const projectAccents = [
  {
    primary: "#61f4de",
    secondary: "#5167ff",
    glow: "rgba(81, 103, 255, 0.34)",
    soft: "rgba(97, 244, 222, 0.12)",
  },
  {
    primary: "#d8ff5f",
    secondary: "#7c3aed",
    glow: "rgba(124, 58, 237, 0.34)",
    soft: "rgba(216, 255, 95, 0.1)",
  },
  {
    primary: "#ff7ad9",
    secondary: "#4f8cff",
    glow: "rgba(255, 122, 217, 0.28)",
    soft: "rgba(79, 140, 255, 0.12)",
  },
  {
    primary: "#ffb65c",
    secondary: "#ff4d8d",
    glow: "rgba(255, 77, 141, 0.28)",
    soft: "rgba(255, 182, 92, 0.11)",
  },
];

function getProjectStatus(project: Project) {
  if (project.project_status === "in-development") {
    return "W realizacji";
  }

  if (project.project_status === "archived") {
    return "Case study";
  }

  return "Online";
}

function ProjectDeckCard({
  project,
  index,
  activeIndex,
  shouldReduceMotion,
  onOpen,
}: ProjectDeckCardProps) {
  const distance = index - activeIndex;
  const isActive = distance === 0;
  const isPast = distance < 0;
  const visibleDistance = Math.min(Math.max(distance, -1), 3);
  const accent = projectAccents[index % projectAccents.length];
  const mainImage = project.images?.[0] ?? null;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(pointerX, { stiffness: 180, damping: 24 });

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!isActive || shouldReduceMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerX.set(x * 5);
    pointerY.set(y * -4);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        x: isPast ? "-12%" : `${visibleDistance * 5.5}%`,
        y: isPast ? "11%" : `${visibleDistance * -3.2}%`,
        scale: isPast ? 0.88 : 1 - Math.max(visibleDistance, 0) * 0.055,
        rotateZ: isPast ? -3 : visibleDistance * 1.8,
        opacity: isPast
          ? 0
          : visibleDistance === 0
            ? 1
            : Math.max(0.12, 0.55 - visibleDistance * 0.14),
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 82, damping: 22, mass: 0.72 }
      }
      style={{
        zIndex: 30 - Math.abs(distance),
        pointerEvents: isActive ? "auto" : "none",
        transformPerspective: 1800,
        transformOrigin: "50% 80%",
      }}
      aria-hidden={!isActive}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(project)}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        onPointerCancel={resetPointer}
        aria-haspopup="dialog"
        aria-label={`Zobacz szczegóły projektu ${project.title}`}
        className="group relative block size-full overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#111318] text-left shadow-[0_42px_120px_-34px_rgba(0,0,0,0.92)] outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#050506] xl:rounded-[3.5rem]"
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={`Podgląd projektu ${project.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 64vw"
            className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
            priority={index === 0}
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-[radial-gradient(circle_at_30%_25%,#252a34,#101216_48%,#08090b)]">
            <Layers className="size-20 text-white/15" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 opacity-40"
          style={{
            background: `radial-gradient(circle at 70% 100%, ${accent.glow}, transparent 58%)`,
          }}
        />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7">
          <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.17em] text-white/75 backdrop-blur-xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-xl transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-7">
          <div className="max-w-[72%]">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              {project.project_type || project.category || "Digital product"}
            </span>
            <p className="mt-2 line-clamp-1 text-lg font-medium tracking-[-0.02em] text-white sm:text-2xl">
              {project.title}
            </p>
          </div>
          <span
            className="hidden h-1.5 w-16 rounded-full sm:block"
            style={{
              background: `linear-gradient(90deg, ${accent.primary}, ${accent.secondary})`,
              boxShadow: `0 0 24px ${accent.glow}`,
            }}
          />
        </div>
      </motion.button>

      {isActive && mainImage && !shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[8%] top-[102%] h-[24%] overflow-hidden opacity-[0.13] blur-[2px]"
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent 88%)",
            transform: "scaleY(-1)",
            transformOrigin: "top",
          }}
        >
          <Image
            src={mainImage}
            alt=""
            fill
            sizes="55vw"
            className="object-cover object-bottom"
          />
        </div>
      )}
    </motion.div>
  );
}

function MobileProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const accent = projectAccents[index % projectAccents.length];
  const mainImage = project.images?.[0] ?? null;

  return (
    <article className="border-t border-white/10 py-10 first:border-t-0">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-haspopup="dialog"
        className="group w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#050506]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111318]">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={`Podgląd projektu ${project.title}`}
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <Layers className="size-16 text-white/15" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-xl">
            <ArrowUpRight className="size-4" />
          </span>
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="h-1 w-14 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accent.primary}, ${accent.secondary})`,
              }}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
            <span>{getProjectStatus(project)}</span>
            <span>•</span>
            <span>{project.project_type || project.category || "Projekt"}</span>
          </div>
          <h3 className="mt-3 text-3xl font-medium leading-none tracking-[-0.04em] text-white">
            {project.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/55">
            {project.short_description}
          </p>
        </div>
      </button>
    </article>
  );
}

export default function ImmersiveProjectsSection({
  initialProjects,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(
    null,
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const filteredProjects = initialProjects.filter((project) =>
    projectMatchesCategory(project, selectedCategory),
  );
  const activeProject =
    filteredProjects[Math.min(activeIndex, filteredProjects.length - 1)] ??
    null;
  const activeAccent =
    projectAccents[activeIndex % projectAccents.length] ?? projectAccents[0];

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (filteredProjects.length < 2) {
      return;
    }

    const nextIndex = Math.min(
      filteredProjects.length - 1,
      Math.max(0, Math.round(latest * (filteredProjects.length - 1))),
    );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  function scrollToProject(index: number) {
    const stage = stageRef.current;

    if (!stage || filteredProjects.length < 2) {
      return;
    }

    const bounds = stage.getBoundingClientRect();
    const stageTop = window.scrollY + bounds.top;
    const scrollableDistance = Math.max(
      stage.offsetHeight - window.innerHeight,
      0,
    );

    window.scrollTo({
      top:
        stageTop +
        scrollableDistance * (index / (filteredProjects.length - 1)),
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      id="projekty"
      aria-labelledby="projects-heading"
      className="relative z-10 overflow-clip bg-[#050506] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-4 pt-24 sm:px-6 lg:px-8 lg:pt-32">
        <header className="relative border-b border-white/10 pb-14 lg:pb-20">
          <div className="flex items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            <div className="flex items-center gap-3">
              <Plus className="size-3 text-white" />
              <span>Selected work</span>
            </div>
            <span>2022 — 2026</span>
            <div className="hidden items-center gap-3 sm:flex">
              <span>Scroll to explore</span>
              <ArrowDownRight className="size-3 text-white" />
            </div>
          </div>

          <div className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-5 flex items-center gap-2 text-xs text-white/50">
                <Sparkles className="size-3.5" />
                <span>Interaktywne portfolio realizacji</span>
              </div>
              <h2
                id="projects-heading"
                className="max-w-6xl text-[clamp(3.8rem,10vw,9.5rem)] font-medium leading-[0.78] tracking-[-0.075em]"
              >
                Wybrane
                <span className="block text-white/22">projekty.</span>
              </h2>
            </div>

            <p className="max-w-sm pb-1 text-sm leading-relaxed text-white/50 sm:text-base lg:pb-2">
              Produkty cyfrowe projektowane od interfejsu po zaplecze.
              Każdy ekran poniżej prowadzi do pełnego case study.
            </p>
          </div>

          <div
            className="mt-12 flex flex-wrap gap-2"
            aria-label="Filtrowanie projektów"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(category.id);
                  setActiveIndex(0);
                }}
                aria-pressed={selectedCategory === category.id}
                className={`rounded-full border px-4 py-2 text-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  selectedCategory === category.id
                    ? "border-white bg-white text-black"
                    : "border-white/12 bg-white/[0.025] text-white/55 hover:border-white/35 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </header>
      </div>

      {filteredProjects.length > 0 ? (
        <>
          <div
            ref={stageRef}
            className="relative mx-auto hidden max-w-[1500px] px-8 lg:block"
            style={{
              height: `${Math.max(140, filteredProjects.length * 72)}vh`,
            }}
          >
            <div className="sticky top-[72px] flex h-[calc(100vh-72px)] min-h-[650px] items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`ambient-${activeProject?.id ?? "empty"}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
                >
                  <div
                    className="absolute right-[4%] top-[14%] size-[48vw] max-h-[720px] max-w-[720px] rounded-full blur-[150px]"
                    style={{
                      background: activeAccent.glow,
                      opacity: 0.48,
                    }}
                  />
                  <div
                    className="absolute bottom-[8%] left-[4%] size-[24vw] max-h-[360px] max-w-[360px] rounded-full blur-[130px]"
                    style={{
                      background: activeAccent.soft,
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="relative grid w-full grid-cols-[0.62fr_1.38fr] items-center gap-16 xl:gap-24">
                <div className="relative z-40">
                  <div className="mb-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    <span className="text-white">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-12 bg-white/20" />
                    <span>{String(filteredProjects.length).padStart(2, "0")}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeProject && (
                      <motion.div
                        key={activeProject.id}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 24, filter: "blur(8px)" }
                        }
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: -18, filter: "blur(6px)" }
                        }
                        transition={{ duration: shouldReduceMotion ? 0 : 0.42 }}
                      >
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.17em] text-white/40">
                          <span
                            className="size-1.5 rounded-full"
                            style={{
                              background: activeAccent.primary,
                              boxShadow: `0 0 15px ${activeAccent.primary}`,
                            }}
                          />
                          <span>{getProjectStatus(activeProject)}</span>
                          <span>•</span>
                          <span>
                            {activeProject.project_type ||
                              activeProject.category ||
                              "Projekt cyfrowy"}
                          </span>
                        </div>

                        <h3 className="mt-5 text-[clamp(2.8rem,4.8vw,5.8rem)] font-medium leading-[0.88] tracking-[-0.06em]">
                          {activeProject.title}
                        </h3>

                        <p className="mt-7 max-w-md text-base leading-relaxed text-white/52">
                          {activeProject.short_description}
                        </p>

                        <div className="mt-8 flex max-w-md flex-wrap gap-x-4 gap-y-2">
                          {activeProject.technologies
                            ?.slice(0, 5)
                            .map((technology, technologyIndex) => (
                              <span
                                key={`${technology}-${technologyIndex}`}
                                className="font-mono text-[10px] uppercase tracking-[0.13em] text-white/35"
                              >
                                {technology}
                              </span>
                            ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveModalProject(activeProject)}
                          aria-haspopup="dialog"
                          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/16 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white outline-none backdrop-blur-xl transition-all hover:border-white hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#050506]"
                        >
                          Zobacz case study
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <nav
                    className="mt-14 flex items-center gap-2"
                    aria-label="Wybór projektu"
                  >
                    {filteredProjects.map((project, index) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => scrollToProject(index)}
                        aria-label={`Przejdź do projektu ${project.title}`}
                        aria-current={index === activeIndex ? "true" : undefined}
                        className="group flex h-8 items-center outline-none"
                      >
                        <span
                          className={`block h-px transition-all duration-500 ${
                            index === activeIndex
                              ? "w-10 bg-white"
                              : "w-4 bg-white/20 group-hover:bg-white/55"
                          }`}
                        />
                      </button>
                    ))}
                  </nav>
                </div>

                <div
                  className="relative h-[min(62vh,680px)] min-h-[460px]"
                  style={{ perspective: "1800px" }}
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectDeckCard
                      key={project.id}
                      project={project}
                      index={index}
                      activeIndex={activeIndex}
                      shouldReduceMotion={shouldReduceMotion}
                      onOpen={setActiveModalProject}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:hidden">
            {filteredProjects.map((project, index) => (
              <MobileProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={setActiveModalProject}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-2xl px-4 py-28 text-center text-white/45 sm:px-6">
          Brak projektów w tej kategorii.
        </div>
      )}

      <div className="relative mx-auto max-w-[1500px] px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="flex items-center justify-between border-t border-white/10 pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          <span>End of selected work</span>
          <div className="flex items-center gap-2">
            <span>Masz projekt?</span>
            <ArrowDownRight className="size-3 text-white" />
          </div>
        </div>
      </div>

      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
