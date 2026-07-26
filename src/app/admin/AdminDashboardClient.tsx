"use client";

import { useState } from "react";
import { Project, ContactMessage, Service, Testimonial } from "@/types";
import { createProjectAction, updateProjectAction, deleteProjectAction, deleteMessageAction, logoutAdminAction, updateServicePriceAction, createTestimonialAction, deleteTestimonialAction } from "@/app/actions/admin";
import { ArrowLeft, MessageSquare, Code2, Rocket, Eye, ShieldCheck, Trash2, Plus, Edit3, X, CheckCircle, Image as ImageIcon, Save, BarChart, Star, Activity, Upload } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";
import { useTheme } from "next-themes";

interface AdminDashboardClientProps {
  messages: ContactMessage[];
  visitsCount: number;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  analytics: { date: string; visits: number }[];
}

export default function AdminDashboardClient({ messages, visitsCount, projects, services, testimonials, analytics }: AdminDashboardClientProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"projects" | "services" | "messages" | "photo" | "testimonials" | "analytics">("projects");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingServicePrices, setEditingServicePrices] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    services.forEach(s => initial[s.id] = s.starting_price);
    return initial;
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  async function handleImageFileUpload(e: React.ChangeEvent<HTMLInputElement>, targetInputName: string, formElement: HTMLFormElement | null) {
    const file = e.target.files?.[0];
    if (!file || !formElement) return;

    setUploadingImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        const input = formElement.querySelector(`input[name="${targetInputName}"]`) as HTMLInputElement | null;
        if (input) {
          const currentVal = input.value.trim();
          input.value = currentVal ? `${currentVal}, ${data.url}` : data.url;
        }
        setActionStatus("Przesłano zdjęcie z komputera!");
        setTimeout(() => setActionStatus(null), 3000);
      } else {
        alert(data.error || "Wystąpił błąd podczas przesyłania pliku.");
      }
    } catch (err) {
      console.error(err);
      alert("Błąd połączenia z serwerem podczas przesyłania.");
    } finally {
      setUploadingImage(false);
    }
  }

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

  async function handleCreateTestimonial(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await createTestimonialAction(formData);
    setLoading(false);
    (e.target as HTMLFormElement).reset();
    setActionStatus("Dodano nową opinię!");
    setTimeout(() => setActionStatus(null), 3000);
  }

  async function handleDeleteTestimonial(id: string) {
    if (!confirm("Czy na pewno chcesz usunąć tę opinię?")) return;
    await deleteTestimonialAction(id);
    setActionStatus("Usunięto opinię!");
    setTimeout(() => setActionStatus(null), 3000);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100 p-4 sm:p-8 md:p-12 space-y-8">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300">
            <ArrowLeft className="w-4 h-4" /> Powrót do Strony Podglądu
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-cyan-600 dark:text-cyan-400" /> Panel CMS & Admin Turso
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Bezpieczne zarządzanie treścią portfolio
          </p>
        </div>

        <div className="flex items-center gap-4">
          <form action={logoutAdminAction}>
            <button type="submit" className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-600 dark:text-rose-300 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors">
              Wyloguj się
            </button>
          </form>
        </div>
      </div>

      {actionStatus && (
        <div role="status" aria-live="polite" className="max-w-7xl mx-auto p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>{actionStatus}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono uppercase">Odsłony Łącznie</span>
            <Eye className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{visitsCount}</div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono uppercase">Wiadomości</span>
            <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{messages.length}</div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono uppercase">Projekty</span>
            <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{projects.length}</div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono uppercase">Usługi</span>
            <Rocket className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{services.length}</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold ${
            activeTab === "projects"
              ? "bg-cyan-50 dark:bg-cyan-500/20 border border-cyan-400 text-cyan-700 dark:text-cyan-300"
              : "glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Code2 className="w-4 h-4" /> Projekty ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold ${
            activeTab === "services"
              ? "bg-amber-50 dark:bg-amber-500/20 border border-amber-400 text-amber-700 dark:text-amber-300"
              : "glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Rocket className="w-4 h-4" /> Ceny Usług ({services.length})
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold ${
            activeTab === "messages"
              ? "bg-purple-50 dark:bg-purple-500/20 border border-purple-400 text-purple-700 dark:text-purple-300"
              : "glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Wiadomości ({messages.length})
        </button>

        <button
          onClick={() => setActiveTab("photo")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold ${
            activeTab === "photo"
              ? "bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-400 text-emerald-700 dark:text-emerald-300"
              : "glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Zdjęcie Profilowe
        </button>

        <button
          onClick={() => setActiveTab("testimonials")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold ${
            activeTab === "testimonials"
              ? "bg-blue-50 dark:bg-blue-500/20 border border-blue-400 text-blue-700 dark:text-blue-300"
              : "glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Star className="w-4 h-4" /> Opinie ({testimonials?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold ${
            activeTab === "analytics"
              ? "bg-rose-50 dark:bg-rose-500/20 border border-rose-400 text-rose-700 dark:text-rose-300"
              : "glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BarChart className="w-4 h-4" /> Analityka
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Lista Projektów w Turso DB</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="neon-glow-button px-5 py-2.5 rounded-full text-xs font-semibold text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Dodaj Nowy Projekt
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-cyan-700 dark:text-cyan-400 text-[10px] font-mono">
                      {proj.project_type || proj.category}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProject(proj)}
                        className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-cyan-600 dark:text-cyan-300 hover:border-cyan-400"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 hover:border-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">{proj.short_description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-mono">
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Zarządzanie Cennikiem Usług w Turso DB</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((serv) => (
              <div key={serv.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{serv.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{serv.short_description}</p>
                
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Cena Od (PLN):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editingServicePrices[serv.id] ?? serv.starting_price}
                      onChange={(e) => setEditingServicePrices({ ...editingServicePrices, [serv.id]: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                    />
                    <button
                      onClick={() => handleSaveServicePrice(serv.id)}
                      className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-lg text-sm font-semibold transition-colors border border-cyan-500/20"
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Przesłane Wiadomości Od Klienów</h2>
          {messages.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono glass-panel bg-white/50 dark:bg-transparent rounded-3xl border-slate-200 dark:border-slate-800">Brak wiadomości w bazie Turso DB.</div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-base">{msg.name}</span>
                      <div className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">{msg.email}</div>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-2 rounded-xl bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-800 hover:border-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-300">Temat: {msg.subject}</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-900">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Photo Tab */}
      {activeTab === "photo" && (
        <div className="max-w-3xl mx-auto glass-panel p-8 rounded-3xl border border-cyan-500/30 bg-white/50 dark:bg-transparent space-y-6">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Twoje Zdjęcie Profilowe</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Status wgrania zdjęcia profilowego</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
            <span>Twoje zdjęcie profilowe zostało pomyślnie wgrane i jest wyświetlane w sekcji Hero!</span>
          </div>
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === "testimonials" && (
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-white/50 dark:bg-transparent space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Dodaj Nową Opinię
            </h2>
            <form onSubmit={handleCreateTestimonial} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 text-xs mb-1 font-mono">Imię i Nazwisko / Nazwa Klienta *</label>
                  <input type="text" name="client_name" required className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 text-xs mb-1 font-mono">Firma / Stanowisko (opcjonalnie)</label>
                  <input type="text" name="company" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 text-xs mb-1 font-mono">Treść Opinii *</label>
                <textarea name="content" required rows={3} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm resize-none focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 text-xs mb-1 font-mono">Ocena (1-5) *</label>
                <input type="number" name="rating" min="1" max="5" defaultValue="5" required className="w-24 px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none" />
              </div>
              <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors">
                {loading ? "Dodawanie..." : "Opublikuj Opinię"}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Opublikowane Opinie</h2>
            {testimonials?.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-mono glass-panel bg-white/50 dark:bg-transparent border-slate-200 dark:border-slate-800 rounded-3xl">Brak dodanych opinii.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials?.map((testim) => (
                  <div key={testim.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{testim.client_name}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-mono">{testim.company}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteTestimonial(testim.id)}
                        className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 hover:border-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex text-amber-500 dark:text-amber-400">
                      {[...Array(testim.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 dark:fill-amber-400" />)}
                    </div>
                    <blockquote className="text-sm text-slate-700 dark:text-slate-300 italic">{testim.content}</blockquote>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-rose-500 dark:text-rose-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ruch na stronie (Ostatnie 30 dni)</h2>
          </div>
          
          <div className="glass-panel p-4 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent h-[400px]">
            {analytics?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#1e293b" : "#e2e8f0"} vertical={false} />
                  <XAxis dataKey="date" stroke={theme === 'dark' ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={theme === 'dark' ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                      borderColor: theme === 'dark' ? '#334155' : '#e2e8f0', 
                      borderRadius: '12px', 
                      color: theme === 'dark' ? '#fff' : '#0f172a' 
                    }}
                    itemStyle={{ color: '#0ea5e9' }}
                  />
                  <Line type="monotone" dataKey="visits" name="Odwiedziny" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: theme === 'dark' ? '#0f172a' : '#ffffff', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#0ea5e9' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 font-mono">Brak danych analitycznych do wyświetlenia.</div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Add Project */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <form onSubmit={handleCreateProject} className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl border border-slate-300 dark:border-cyan-500/40 space-y-4 bg-white dark:bg-[#090d16] text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dodaj Nowy Projekt</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Tytuł Projektu *</label>
                <input type="text" name="title" required placeholder="np. Modern Portfolio" className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Krótki Opis *</label>
                <input type="text" name="short_description" required className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Szczegółowy Opis</label>
                <textarea name="detailed_description" rows={3} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans resize-none" />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Technologie (oddzielone przecinkami)</label>
                <input type="text" name="technologies" placeholder="Next.js 16, TypeScript, Turso, Tailwind" className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Adresy Obrazów (URL lub wgraj z komputera)</label>
                <div className="flex gap-2">
                  <input type="text" name="images" placeholder="/projects/img1.jpg lub https://..." className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
                  <label className="shrink-0 px-4 py-3 rounded-xl bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30 border border-cyan-300 dark:border-cyan-500/40 text-cyan-900 dark:text-cyan-300 font-semibold cursor-pointer flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? "Przesyłanie..." : "Wgraj z Komputera"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileUpload(e, "images", e.currentTarget.closest("form"))}
                    />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">URL Projektu Live</label>
                  <input type="text" name="project_url" placeholder="https://..." className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">URL Repozytorium GitHub</label>
                  <input type="text" name="repository_url" placeholder="https://github.com/..." className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="add-category" className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Kategoria</label>
                  <select id="add-category" name="category" defaultValue="web" className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800">
                    <option value="web">Web</option>
                    <option value="e-commerce">E-commerce</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="add-project-type" className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Typ projektu</label>
                  <input id="add-project-type" name="project_type" defaultValue="web-app" className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800" />
                </div>
                <div>
                  <label htmlFor="add-project-status" className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Status</label>
                  <select id="add-project-status" name="project_status" defaultValue="active" className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800">
                    <option value="active">Aktywny</option>
                    <option value="in-development">W budowie</option>
                    <option value="archived">Archiwalny</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <input type="checkbox" name="featured" className="size-4 accent-cyan-500" />
                Wyróżniony projekt
              </label>
            </div>

            <button type="submit" disabled={loading} className="neon-glow-button w-full py-3 rounded-xl font-semibold text-white">
              {loading ? "Zapisywanie w Turso DB..." : "Zapisz Projekt w Bazie"}
            </button>
          </form>
        </div>
      )}

      {/* Modal: Edit Project */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <form onSubmit={handleUpdateProject} className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl border border-slate-300 dark:border-cyan-500/40 space-y-4 bg-white dark:bg-[#090d16] text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edytuj Projekt</h3>
              <button type="button" onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Tytuł Projektu *</label>
                <input type="text" name="title" defaultValue={editingProject.title} required className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Krótki Opis *</label>
                <input type="text" name="short_description" defaultValue={editingProject.short_description} required className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Szczegółowy Opis</label>
                <textarea name="detailed_description" defaultValue={editingProject.detailed_description} rows={3} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans resize-none" />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Technologie (oddzielone przecinkami)</label>
                <input type="text" name="technologies" defaultValue={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(", ") : (editingProject.technologies || "")} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Adresy Obrazów (URL lub wgraj z komputera)</label>
                <div className="flex gap-2">
                  <input type="text" name="images" defaultValue={Array.isArray(editingProject.images) ? editingProject.images.join(", ") : (editingProject.images || "")} placeholder="/projects/img1.jpg lub https://..." className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
                  <label className="shrink-0 px-4 py-3 rounded-xl bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30 border border-cyan-300 dark:border-cyan-500/40 text-cyan-900 dark:text-cyan-300 font-semibold cursor-pointer flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? "Przesyłanie..." : "Wgraj z Komputera"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileUpload(e, "images", e.currentTarget.closest("form"))}
                    />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">URL Projektu Live</label>
                  <input type="text" name="project_url" defaultValue={editingProject.project_url} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">URL Repozytorium GitHub</label>
                  <input type="text" name="repository_url" defaultValue={editingProject.repository_url} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-sans" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="edit-category" className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Kategoria</label>
                  <select id="edit-category" name="category" defaultValue={editingProject.category || "web"} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800">
                    <option value="web">Web</option>
                    <option value="e-commerce">E-commerce</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-project-type" className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Typ projektu</label>
                  <input id="edit-project-type" name="project_type" defaultValue={editingProject.project_type || "web-app"} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800" />
                </div>
                <div>
                  <label htmlFor="edit-project-status" className="block text-slate-700 dark:text-slate-300 mb-1 font-mono font-semibold">Status</label>
                  <select id="edit-project-status" name="project_status" defaultValue={editingProject.project_status || "active"} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800">
                    <option value="active">Aktywny</option>
                    <option value="in-development">W budowie</option>
                    <option value="archived">Archiwalny</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <input type="checkbox" name="featured" defaultChecked={Boolean(editingProject.featured)} className="size-4 accent-cyan-500" />
                Wyróżniony projekt
              </label>
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
