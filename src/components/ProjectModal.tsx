"use client";

import { Project } from "@/types";
import Image from "next/image";
import { X, ExternalLink, CheckCircle2, ShieldCheck, Zap, Layers, Award } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { getProjectPath } from "@/lib/seo";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function parseArray(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter((item): item is string => typeof item === "string");
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return val.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(Boolean(project));

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  if (!project || typeof document === "undefined") return null;

  const images = parseArray(project.images);
  const technologies = parseArray(project.technologies);
  const keyFeatures = parseArray(project.key_features);
  const technicalMetrics = parseArray(project.technical_metrics);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md animate-fadeIn"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        tabIndex={-1}
        className="glass-panel relative w-full max-w-4xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-3xl border border-slate-300 dark:border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-8 bg-white dark:bg-[#090d16] text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500 transition-colors shadow-sm"
          aria-label="Zamknij modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title & Header */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-500/40 text-cyan-900 dark:text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
              {project.category || project.project_type || "Web App"}
            </span>
            {project.completion_date && (
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono font-medium">
                Ukończono: {project.completion_date}
              </span>
            )}
          </div>
          <h2 id="project-dialog-title" className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {project.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {project.short_description}
          </p>
        </div>

        {/* Primary Project Images Gallery */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((imgUrl, idx) => (
              <div key={idx} className="group relative h-64 overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <Image
                  src={imgUrl}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="scale-110 object-cover opacity-28 blur-2xl"
                  aria-hidden="true"
                />
                <div className="absolute inset-2 overflow-hidden rounded-xl bg-black/10">
                  <Image
                    src={imgUrl}
                    alt={`${project.title} – ekran ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Links CTAs */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href={getProjectPath(project)}
            className="px-6 py-3 rounded-full text-sm font-semibold text-cyan-900 bg-cyan-100 hover:bg-cyan-200 border border-cyan-300 dark:bg-cyan-950 dark:hover:bg-cyan-900 dark:text-cyan-200 dark:border-cyan-700 flex items-center gap-2 transition-colors"
          >
            Pełne case study
          </Link>
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-glow-button px-6 py-3 rounded-full text-sm font-semibold text-white flex items-center gap-2 shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              Odwiedź Stronę Live
            </a>
          )}
          {project.repository_url && (
            <a
              href={project.repository_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-700 flex items-center gap-2 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 fill-slate-900 dark:fill-cyan-400" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Kod Źródłowy GitHub
            </a>
          )}
        </div>

        {/* Detailed Description */}
        {project.detailed_description && (
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              Szczegóły & Opis Projektu
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
              {project.detailed_description}
            </p>
          </div>
        )}

        {/* Key Features */}
        {keyFeatures.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Kluczowe Funkcjonalności
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {keyFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Breakdown */}
        {technologies.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Użyte Technologie
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-slate-900 border border-cyan-200 dark:border-slate-800 text-cyan-900 dark:text-cyan-300 text-xs font-mono font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Innovation & Technical Metrics */}
        {(project.innovation || technicalMetrics.length > 0) && (
          <div className="p-5 rounded-2xl bg-cyan-50/90 dark:bg-cyan-950/30 border border-cyan-300 dark:border-cyan-500/40 space-y-2.5">
            <h4 className="text-sm font-bold text-cyan-900 dark:text-cyan-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Innowacje & Wyniki Techniczne
            </h4>
            {project.innovation && (
              <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{project.innovation}</p>
            )}
            {technicalMetrics.map((m, idx) => (
              <div key={idx} className="text-xs text-emerald-800 dark:text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">✓</span> {m}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
