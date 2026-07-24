"use client";

import { useState } from "react";
import { Project } from "@/types";
import ProjectModal from "./ProjectModal";
import { Sparkles, Layers, ArrowUpRight } from "lucide-react";

interface ProjectsSectionProps {
  initialProjects: Project[];
}

export default function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: "Wszystkie Projects" },
    { id: "web", label: "Web Development" },
    { id: "e-commerce", label: "E-commerce" },
    { id: "mobile", label: "Aplikacje Mobilne" },
  ];

  const filteredProjects = initialProjects.filter((project) => {
    if (selectedCategory === "all") return true;
    const cat = (project.category || project.project_type || "").toLowerCase();
    return cat.includes(selectedCategory);
  });

  return (
    <section id="projekty" className="py-24 relative z-10 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio Realizacji</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Wybrane <span className="text-gradient-cyan">Projekty Komercyjne</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Zobacz przykłady moich prac – od ekskluzywnych platform transportowych po złożone systemy e-commerce z systemem rezerwacji.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                    : "glass-panel text-slate-300 hover:text-white hover:border-cyan-500/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const hasImage = project.images && project.images.length > 0;
            const mainImg = hasImage ? project.images[0] : null;

            return (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="glass-panel-interactive rounded-3xl overflow-hidden cursor-pointer flex flex-col group border border-slate-800"
              >
                {/* Image / Banner */}
                <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                  {mainImg ? (
                    <img
                      src={mainImg}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
                      <Layers className="w-12 h-12 text-slate-700" />
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-wider">
                      {project.project_type || project.category || "Web App"}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-400 transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                      {project.short_description}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[11px] font-mono border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies && project.technologies.length > 4 && (
                        <span className="px-2 py-1 rounded-md bg-slate-900 text-cyan-400 text-[11px] font-mono">
                          +{project.technologies.length - 4} więcej
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Drawer */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
