"use client";

import { Project } from "@/types";
import { X, ExternalLink, CheckCircle2, ShieldCheck, Zap, Layers, Award } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-panel relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-8 bg-[#090d16]/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
          aria-label="Zamknij modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title & Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
              {project.category || "Web App"}
            </span>
            {project.completion_date && (
              <span className="text-xs text-slate-400 font-mono">
                Ukończono: {project.completion_date}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {project.short_description}
          </p>
        </div>

        {/* Primary Project Images Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.images.map((imgUrl, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden border border-slate-800 group h-64 bg-slate-950">
                <img
                  src={imgUrl}
                  alt={`${project.title} screen ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}

        {/* Links CTAs */}
        <div className="flex flex-wrap gap-4 pt-2">
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-glow-button px-6 py-3 rounded-full text-sm font-semibold text-white flex items-center gap-2"
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
              className="glass-panel-interactive px-6 py-3 rounded-full text-sm font-medium text-slate-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-cyan-400" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Kod Źródłowy GitHub
            </a>
          )}
        </div>

        {/* Detailed Description */}
        {project.detailed_description && (
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Szczegóły & Opis Projektu
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.detailed_description}
            </p>
          </div>
        )}

        {/* Key Features */}
        {project.key_features && project.key_features.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Kluczowe Funkcjonalności
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.key_features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Breakdown */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            Użyte Technologie
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Innovation & Technical Metrics */}
        {(project.innovation || (project.technical_metrics && project.technical_metrics.length > 0)) && (
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              Innowacje & Wyniki Techniczne
            </h4>
            {project.innovation && (
              <p className="text-xs text-slate-300">{project.innovation}</p>
            )}
            {project.technical_metrics?.map((m, idx) => (
              <div key={idx} className="text-xs text-emerald-400 font-mono">
                ✓ {m}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
