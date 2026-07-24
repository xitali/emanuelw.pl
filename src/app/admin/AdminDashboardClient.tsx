"use client";

import { useState } from "react";
import { Project, ContactMessage, Service } from "@/types";
import { createProjectAction, updateProjectAction, deleteProjectAction, deleteMessageAction, logoutAdminAction, updateServicePriceAction } from "@/app/actions/admin";
import { ArrowLeft, MessageSquare, Code2, Rocket, Eye, ShieldCheck, Clock, Mail, Trash2, Plus, Edit3, X, CheckCircle, Image as ImageIcon, Save } from "lucide-react";
import Link from "next/link";

interface AdminDashboardClientProps {
  messages: ContactMessage[];
  visitsCount: number;
  projects: Project[];
  services: Service[];
}

export default function AdminDashboardClient({ messages, visitsCount, projects, services }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "services" | "messages" | "photo">("projects");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingServicePrices, setEditingServicePrices] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    services.forEach(s => initial[s.id] = s.starting_price);
    return initial;
  });
  const [loading, setLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  async function handleCreateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await createProjectAction(formData);
    setLoading(false);
    setIsAddModalOpen(false);
    setActionStatus("Dodano nowy projekt do Turso DB!");
    setTimeout(() => setActionStatus(null), 3000);
  }

  async function handleUpdateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingProject) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await updateProjectAction(editingProject.id, formData);
    setLoading(false);
    setEditingProject(null);
    setActionStatus("Zaktualizowano projekt!");
    setTimeout(() => setActionStatus(null), 3000);
  }

  async function handleDeleteProject(id: string) {
    if (!confirm("Czy na pewno chcesz usunąć ten projekt z bazy danych Turso?")) return;
    await deleteProjectAction(id);
    setActionStatus("Usunięto projekt z bazy Turso!");
    setTimeout(() => setActionStatus(null), 3000);
  }

  async function handleDeleteMessage(id: string) {
    if (!confirm("Czy na pewno chcesz usunąć tę wiadomość?")) return;
    await deleteMessageAction(id);
    setActionStatus("Usunięto wiadomość!");
    setTimeout(() => setActionStatus(null), 3000);
  }

  async function handleSaveServicePrice(id: string) {
    const newPrice = editingServicePrices[id];
    if (newPrice === undefined) return;
    setLoading(true);
    await updateServicePriceAction(id, newPrice);
    setLoading(false);
    setActionStatus("Zaktualizowano cenę usługi w bazie Turso DB!");
    setTimeout(() => setActionStatus(null), 3000);
  }

  return (
    <main className="min-h-screen bg-[#060913] text-slate-100 p-4 sm:p-8 md:p-12 space-y-8">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300">
            <ArrowLeft className="w-4 h-4" /> Powrót do Strony Podglądu
          </Link>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-cyan-400" /> Panel CMS & Admin Turso
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Pełny CRUD dla bazy danych `emanuelw-xitali.aws-eu-west-1.turso.io`
          </p>
        </div>

        <div className="flex items-center gap-4">
          <form action={logoutAdminAction}>
            <button type="submit" className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold hover:bg-rose-900/60 transition-colors">
              Wyloguj się
            </button>
          </form>
        </div>
      </div>

      {actionStatus && (
        <div className="max-w-7xl mx-auto p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>{actionStatus}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Odsłony Łącznie</span>
            <Eye className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{visitsCount}</div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Wiadomości</span>
            <MessageSquare className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{messages.length}</div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Projekty</span>
            <Code2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{projects.length}</div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Usługi</span>
            <Rocket className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{services.length}</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold ${
            activeTab === "projects"
              ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300"
              : "glass-panel text-slate-400 hover:text-white"
          }`}
        >
          <Code2 className="w-4 h-4" /> Projekty ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold ${
            activeTab === "services"
              ? "bg-amber-500/20 border border-amber-400 text-amber-300"
              : "glass-panel text-slate-400 hover:text-white"
          }`}
        >
          <Rocket className="w-4 h-4" /> Ceny Usług ({services.length})
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold ${
            activeTab === "messages"
              ? "bg-purple-500/20 border border-purple-400 text-purple-300"
              : "glass-panel text-slate-400 hover:text-white"
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Wiadomości ({messages.length})
        </button>

        <button
          onClick={() => setActiveTab("photo")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold ${
            activeTab === "photo"
              ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300"
              : "glass-panel text-slate-400 hover:text-white"
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Zdjęcie Profilowe
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Lista Projektów w Turso DB</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="neon-glow-button px-5 py-2.5 rounded-full text-xs font-semibold text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Dodaj Nowy Projekt
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 text-[10px] font-mono">
                      {proj.project_type || proj.category}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProject(proj)}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 hover:border-cyan-400"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-rose-400 hover:border-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3">{proj.short_description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Tech: {proj.technologies?.length || 0}</span>
                  <span>{proj.created_at ? new Date(proj.created_at).toLocaleDateString() : ""}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-white">Zarządzanie Cennikiem Usług w Turso DB</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((serv) => (
              <div key={serv.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white">{serv.name}</h3>
                <p className="text-xs text-slate-400">{serv.short_description}</p>
                
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase">Cena Od (PLN):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editingServicePrices[serv.id] ?? serv.starting_price}
                      onChange={(e) => setEditingServicePrices({ ...editingServicePrices, [serv.id]: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm"
                    />
                    <button
                      onClick={() => handleSaveServicePrice(serv.id)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <Save className="w-4 h-4" /> Zapisz
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === "messages" && (
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-white">Przesłane Wiadomości Od Klienów</h2>
          {messages.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono glass-panel rounded-3xl">Brak wiadomości w bazie Turso DB.</div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-bold text-white text-base">{msg.name}</span>
                      <div className="text-xs text-cyan-400 font-mono">{msg.email}</div>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-2 rounded-xl bg-slate-900 text-rose-400 border border-slate-800 hover:border-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs font-semibold text-slate-300">Temat: {msg.subject}</div>
                  <p className="text-sm text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-900">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Photo Tab */}
      {activeTab === "photo" && (
        <div className="max-w-3xl mx-auto glass-panel p-8 rounded-3xl border border-cyan-500/30 space-y-6">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Twoje Zdjęcie Profilowe</h2>
              <p className="text-xs text-slate-400">Status wgrania zdjęcia profilowego</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
            <span>Twoje zdjęcie profilowe zostało pomyślnie wgrane i jest wyświetlane w sekcji Hero!</span>
          </div>
        </div>
      )}

      {/* Modal: Add Project */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form onSubmit={handleCreateProject} className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl border border-cyan-500/40 space-y-4 bg-[#090d16]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Dodaj Nowy Projekt do Turso DB</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Tytuł Projektu *</label>
                <input type="text" name="title" required className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Krótki Opis *</label>
                <input type="text" name="short_description" required className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Szczegółowy Opis</label>
                <textarea name="detailed_description" rows={3} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none" />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Technologie (oddzielone przecinkami)</label>
                <input type="text" name="technologies" placeholder="Next.js 15, TypeScript, Turso, Tailwind" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Adresy Obrazów (URL oddzielone przecinkami)</label>
                <input type="text" name="images" placeholder="https://example.com/img1.jpg" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-mono">URL Projektu Live</label>
                  <input type="text" name="project_url" placeholder="https://..." className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-mono">URL Repozytorium GitHub</label>
                  <input type="text" name="repository_url" placeholder="https://github.com/..." className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="neon-glow-button w-full py-3 rounded-xl font-semibold text-white">
              {loading ? "Zapisywanie w Turso DB..." : "Zapisz Projekt w Bazie"}
            </button>
          </form>
        </div>
      )}

      {/* Modal: Edit Project */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form onSubmit={handleUpdateProject} className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl border border-cyan-500/40 space-y-4 bg-[#090d16]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Edytuj Projekt</h3>
              <button type="button" onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Tytuł Projektu *</label>
                <input type="text" name="title" defaultValue={editingProject.title} required className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Krótki Opis *</label>
                <input type="text" name="short_description" defaultValue={editingProject.short_description} required className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Szczegółowy Opis</label>
                <textarea name="detailed_description" defaultValue={editingProject.detailed_description} rows={3} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none" />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Technologie (oddzielone przecinkami)</label>
                <input type="text" name="technologies" defaultValue={editingProject.technologies?.join(", ")} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Adresy Obrazów (URL oddzielone przecinkami)</label>
                <input type="text" name="images" defaultValue={editingProject.images?.join(", ")} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-mono">URL Projektu Live</label>
                  <input type="text" name="project_url" defaultValue={editingProject.project_url} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-mono">URL Repozytorium GitHub</label>
                  <input type="text" name="repository_url" defaultValue={editingProject.repository_url} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="neon-glow-button w-full py-3 rounded-xl font-semibold text-white">
              {loading ? "Zapisywanie zmian..." : "Zapisz Zmiany w Turso DB"}
            </button>
          </form>
        </div>
      )}

    </main>
  );
}
