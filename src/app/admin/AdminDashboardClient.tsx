"use client";

import ProjectCaseFields from "@/components/ProjectCaseFields";
import { useEffect, useState, type ReactNode } from "react";
import { Project, ContactMessage, Service, Testimonial } from "@/types";
import { createProjectAction, updateProjectAction, deleteProjectAction, deleteMessageAction, logoutAdminAction, updateServicePriceAction, createTestimonialAction, deleteTestimonialAction } from "@/app/actions/admin";
import { ArrowLeft, MessageSquare, Code2, Rocket, Eye, ShieldCheck, Trash2, Plus, Edit3, X, CheckCircle, Image as ImageIcon, Save, BarChart, Star, Activity, Upload } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import AdminAppManager from "@/components/AdminAppManager";

interface AdminDashboardClientProps {
  messages: ContactMessage[];
  visitsCount: number;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  analytics: { date: string; visits: number }[];
  initialTab?: "projects" | "messages";
  initialMessageId?: string;
  summary?: ReactNode;
}

export default function AdminDashboardClient({ messages, visitsCount, projects, services, testimonials, analytics, initialTab = "projects", initialMessageId, summary }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "services" | "messages" | "photo" | "testimonials" | "analytics">(initialTab);
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
  const isProjectModalOpen = isAddModalOpen || Boolean(editingProject);

  useBodyScrollLock(isProjectModalOpen);

  useEffect(() => {
    if (!initialMessageId) return;

    window.setTimeout(() => {
      document
        .getElementById(`message-${initialMessageId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }, [initialMessageId]);

  useEffect(() => {
    if (!isProjectModalOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not([type="hidden"]):not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]') || []).filter(el => el.getClientRects().length > 0);
    focusable()[0]?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const nodes = focusable(), first = nodes[0], last = nodes[nodes.length - 1];
      if (!first) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", trapFocus);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsAddModalOpen(false);
      setEditingProject(null);
    };

    document.addEventListener("keydown", handleEscape);
    return () => { document.removeEventListener("keydown", handleEscape); document.removeEventListener("keydown", trapFocus); previousFocus?.focus(); };
  }, [isProjectModalOpen]);

  async function handleImageFileUpload(e: React.ChangeEvent<HTMLInputElement>, targetInputName: string, formElement: HTMLFormElement | null) {
    const file = e.target.files?.[0];
    if (!file || !formElement) return;

    setUploadingImage(true);
    try {
      if (file.size > 10 * 1024 * 1024) throw new Error("Obraz przekracza 10 MB.");
      const extension = ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" } as Record<string, string>)[file.type];
      if (!extension) throw new Error("Wybierz JPG, PNG, WebP lub AVIF.");
      const { upload } = await import("@vercel/blob/client");
      const blob = await upload(`projects/${crypto.randomUUID()}.${extension}`, file, { access: "public", handleUploadUrl: "/api/upload/direct", contentType: file.type });
      const data = { success: true, url: blob.url };
      if (data.success && data.url) {
        const input = formElement.querySelector(`input[name="${targetInputName}"]`) as HTMLInputElement | null;
        if (input) {
          const currentVal = input.value.trim();
          input.value = currentVal ? `${currentVal}, ${data.url}` : data.url;
        }
        setActionStatus("Przesłano zdjęcie z komputera!");
        setTimeout(() => setActionStatus(null), 3000);
      } else {
        alert("Wystąpił błąd podczas przesyłania pliku.");
      }
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Błąd połączenia z serwerem podczas przesyłania.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleCreateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await createProjectAction(formData);
    if (!result.success) { setLoading(false); alert(result.error); return; }
    setLoading(false);
    setIsAddModalOpen(false);
    setActionStatus("Dodano realizację.");
    setTimeout(() => setActionStatus(null), 3000);
  }

  async function handleUpdateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingProject) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await updateProjectAction(editingProject.id, formData);
    if (!result.success) { setLoading(false); alert(result.error); return; }
    setLoading(false);
    setEditingProject(null);
    setActionStatus("Zapisano zmiany realizacji.");
    setTimeout(() => setActionStatus(null), 3000);
  }

  async function handleDeleteProject(id: string) {
    if (!confirm("Czy na pewno chcesz usunąć tę realizację?")) return;
    await deleteProjectAction(id);
    setActionStatus("Usunięto realizację.");
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
    setActionStatus("Zapisano cenę usługi.");
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
    <main className="admin-dashboard min-h-screen bg-[var(--p-bg)]  text-[var(--p-text)]  p-4 sm:p-8 md:p-12 space-y-8">

      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--p-border)]  pb-6">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-[var(--p-accent)]  hover:text-[var(--p-accent)] ">
            <ArrowLeft className="w-4 h-4" /> Zobacz stronę
          </Link>
          <h1 className="text-3xl font-extrabold text-[var(--p-text)]  flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[var(--p-accent)] " /> Twoja strona. Twój panel.
          </h1>
          <p className="text-xs sm:text-sm text-[var(--p-muted)] ">
            Zarządzaj realizacjami, ofertą i wiadomościami w jednym miejscu.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <form action={logoutAdminAction}>
            <button type="submit" className="admin-secondary">
              Wyloguj się
            </button>
          </form>
        </div>
      </div>

      {summary}

      {actionStatus && (
        <div role="status" aria-live="polite" className="max-w-7xl mx-auto p-4 rounded-2xl bg-[#acd1e814]  border border-[var(--p-border)]  text-[var(--p-accent)]  text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[var(--p-accent)] " />
          <span>{actionStatus}</span>
        </div>
      )}

      <AdminAppManager />

      {/* KPI Stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="admin-panel p-6 rounded-[var(--p-radius)] border border-[var(--p-border)]  bg-[var(--p-surface)]  space-y-2">
          <div className="flex items-center justify-between text-[var(--p-muted)] ">
            <span className="text-xs font-mono uppercase">Odsłony łącznie</span>
            <Eye className="w-5 h-5 text-[var(--p-accent)] " />
          </div>
          <div className="text-3xl font-extrabold text-[var(--p-text)] ">{visitsCount}</div>
        </div>

        <div className="admin-panel p-6 rounded-[var(--p-radius)] border border-[var(--p-border)]  bg-[var(--p-surface)]  space-y-2">
          <div className="flex items-center justify-between text-[var(--p-muted)] ">
            <span className="text-xs font-mono uppercase">Wiadomości</span>
            <MessageSquare className="w-5 h-5 text-[var(--p-accent)] " />
          </div>
          <div className="text-3xl font-extrabold text-[var(--p-text)] ">{messages.length}</div>
        </div>

        <div className="admin-panel p-6 rounded-[var(--p-radius)] border border-[var(--p-border)]  bg-[var(--p-surface)]  space-y-2">
          <div className="flex items-center justify-between text-[var(--p-muted)] ">
            <span className="text-xs font-mono uppercase">Projekty</span>
            <Code2 className="w-5 h-5 text-[var(--p-accent)] " />
          </div>
          <div className="text-3xl font-extrabold text-[var(--p-text)] ">{projects.length}</div>
        </div>

        <div className="admin-panel p-6 rounded-[var(--p-radius)] border border-[var(--p-border)]  bg-[var(--p-surface)]  space-y-2">
          <div className="flex items-center justify-between text-[var(--p-muted)] ">
            <span className="text-xs font-mono uppercase">Usługi</span>
            <Rocket className="w-5 h-5 text-[var(--p-accent)] " />
          </div>
          <div className="text-3xl font-extrabold text-[var(--p-text)] ">{services.length}</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div aria-label="Sekcje panelu" className="admin-tabs max-w-7xl mx-auto flex flex-wrap gap-3">
        <button
          aria-pressed={activeTab === "projects"}
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-6 py-3 rounded-md text-xs font-semibold ${
            activeTab === "projects"
              ? "bg-[#acd1e814]  border border-[var(--p-border)] text-[var(--p-accent)] "
              : "admin-panel text-[var(--p-muted)]  hover:text-[var(--p-text)] "
          }`}
        >
          <Code2 className="w-4 h-4" /> Projekty ({projects.length})
        </button>

        <button
          aria-pressed={activeTab === "services"}
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-6 py-3 rounded-md text-xs font-semibold ${
            activeTab === "services"
              ? "bg-[#acd1e814]  border border-[var(--p-border)] text-[var(--p-accent)] "
              : "admin-panel text-[var(--p-muted)]  hover:text-[var(--p-text)] "
          }`}
        >
          <Rocket className="w-4 h-4" /> Ceny usług ({services.length})
        </button>

        <button
          aria-pressed={activeTab === "messages"}
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 px-6 py-3 rounded-md text-xs font-semibold ${
            activeTab === "messages"
              ? "bg-[#acd1e814]  border border-[var(--p-border)] text-[var(--p-accent)] "
              : "admin-panel text-[var(--p-muted)]  hover:text-[var(--p-text)] "
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Wiadomości ({messages.length})
        </button>

        <button
          aria-pressed={activeTab === "photo"}
          onClick={() => setActiveTab("photo")}
          className={`flex items-center gap-2 px-6 py-3 rounded-md text-xs font-semibold ${
            activeTab === "photo"
              ? "bg-[#acd1e814]  border border-[var(--p-border)] text-[var(--p-accent)] "
              : "admin-panel text-[var(--p-muted)]  hover:text-[var(--p-text)] "
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Zdjęcie profilowe
        </button>

        <button
          aria-pressed={activeTab === "testimonials"}
          onClick={() => setActiveTab("testimonials")}
          className={`flex items-center gap-2 px-6 py-3 rounded-md text-xs font-semibold ${
            activeTab === "testimonials"
              ? "bg-[#acd1e814]  border border-[var(--p-border)] text-[var(--p-accent)] "
              : "admin-panel text-[var(--p-muted)]  hover:text-[var(--p-text)] "
          }`}
        >
          <Star className="w-4 h-4" /> Opinie ({testimonials?.length || 0})
        </button>

        <button
          aria-pressed={activeTab === "analytics"}
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-6 py-3 rounded-md text-xs font-semibold ${
            activeTab === "analytics"
              ? "bg-rose-50  border border-rose-400 text-rose-700 "
              : "admin-panel text-[var(--p-muted)]  hover:text-[var(--p-text)] "
          }`}
        >
          <BarChart className="w-4 h-4" /> Analityka
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--p-text)] ">Twoje realizacje</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="admin-primary px-5 py-2.5 rounded-md text-xs font-semibold text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Dodaj realizację
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="admin-panel p-6 rounded-[var(--p-radius)] border border-[var(--p-border)]  bg-[var(--p-surface)]  space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-accent)]  text-[10px] font-mono">
                      {proj.project_type || proj.category}
                    </span>
                    <div className="flex gap-2">
                      <button
                        aria-label={`Edytuj realizację: ${proj.title}`}
                        onClick={() => setEditingProject(proj)}
                        className="p-2 rounded-lg bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-accent)]  hover:border-[var(--p-border)]"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        aria-label={`Usuń realizację: ${proj.title}`}
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg bg-[var(--p-surface)]  border border-[var(--p-border)]  text-rose-300  hover:border-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--p-text)] ">{proj.title}</h3>
                  <p className="text-xs text-[var(--p-muted)]  line-clamp-3">{proj.short_description}</p>
                </div>

                <div className="pt-3 border-t border-[var(--p-border)]  flex items-center justify-between text-xs text-[var(--p-muted)]  font-mono">
                  <span>Technologie: {proj.technologies?.length || 0}</span>
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
          <h2 className="text-xl font-bold text-[var(--p-text)] ">Ceny Twoich usług</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((serv) => (
              <div key={serv.id} className="admin-panel p-6 rounded-[var(--p-radius)] border border-[var(--p-border)]  bg-[var(--p-surface)]  space-y-4">
                <h3 className="text-lg font-bold text-[var(--p-text)] ">{serv.name}</h3>
                <p className="text-xs text-[var(--p-muted)] ">{serv.short_description}</p>

                <div className="pt-3 border-t border-[var(--p-border)]  space-y-2">
                  <label className="text-xs font-mono text-[var(--p-muted)]  uppercase">Cena Od (PLN):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editingServicePrices[serv.id] ?? serv.starting_price}
                      onChange={(e) => setEditingServicePrices({ ...editingServicePrices, [serv.id]: Number(e.target.value) })}
                      className="w-full bg-[var(--p-surface)]  border border-[var(--p-border)]  rounded-lg px-3 py-2 text-sm text-[var(--p-text)]  focus:border-[var(--p-border)] outline-none"
                    />
                    <button
                      onClick={() => handleSaveServicePrice(serv.id)}
                      className="px-4 py-2 bg-[#acd1e814] hover:bg-[#acd1e814] text-[var(--p-accent)]  rounded-lg text-sm font-semibold transition-colors border border-[var(--p-border)]"
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
          <h2 className="text-xl font-bold text-[var(--p-text)] ">Wiadomości od klientów</h2>
          {messages.length === 0 ? (
            <div className="p-8 text-center text-[var(--p-muted)] font-mono admin-panel bg-[var(--p-surface)]  rounded-[var(--p-radius)] border-[var(--p-border)] ">Nie masz jeszcze wiadomości.</div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div id={`message-${msg.id}`} key={msg.id} className="admin-panel p-6 rounded-[var(--p-radius)] border border-[var(--p-border)]  bg-[var(--p-surface)]  space-y-3 scroll-mt-6">
                  <div className="flex items-center justify-between border-b border-[var(--p-border)]  pb-3">
                    <div>
                      <span className="font-bold text-[var(--p-text)]  text-base">{msg.name}</span>
                      <div className="text-xs text-[var(--p-accent)]  font-mono">{msg.email}</div>
                    </div>
                    <button
                      aria-label={`Usuń wiadomość: ${msg.subject}`}
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-2 rounded-xl bg-[var(--p-surface)]  text-rose-300  border border-[var(--p-border)]  hover:border-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs font-semibold text-[var(--p-muted)] ">Temat: {msg.subject}</div>
                  <p className="text-sm text-[var(--p-text)]  bg-[var(--p-surface)]  p-4 rounded-2xl border border-[var(--p-border)]  whitespace-pre-wrap break-words">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Photo Tab */}
      {activeTab === "photo" && (
        <div className="max-w-3xl mx-auto admin-panel p-8 rounded-[var(--p-radius)] border border-[var(--p-border)] bg-[var(--p-surface)]  space-y-6">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-[var(--p-accent)] " />
            <div>
              <h2 className="text-xl font-bold text-[var(--p-text)] ">Twoje Zdjęcie profilowe</h2>
              <p className="text-xs text-[var(--p-muted)] ">Status wgrania zdjęcia profilowego</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#acd1e814] border border-[var(--p-border)] text-[var(--p-accent)] text-xs sm:text-sm font-mono flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-[var(--p-accent)] shrink-0" />
            <span>Twoje zdjęcie profilowe zostało pomyślnie wgrane i jest wyświetlane w sekcji Hero!</span>
          </div>
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === "testimonials" && (
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="admin-panel p-6 sm:p-8 rounded-[var(--p-radius)] border border-[var(--p-border)] bg-[var(--p-surface)]  space-y-6">
            <h2 className="text-xl font-bold text-[var(--p-text)]  flex items-center gap-2">
              <Plus className="w-5 h-5 text-[var(--p-accent)] " /> Dodaj Nową Opinię
            </h2>
            <form onSubmit={handleCreateTestimonial} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--p-text)]  text-xs mb-1 font-mono">Imię i Nazwisko / Nazwa Klienta *</label>
                  <input type="text" name="client_name" required className="w-full px-4 py-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  text-sm focus:border-[var(--p-border)] outline-none" />
                </div>
                <div>
                  <label className="block text-[var(--p-text)]  text-xs mb-1 font-mono">Firma / Stanowisko (opcjonalnie)</label>
                  <input type="text" name="company" className="w-full px-4 py-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  text-sm focus:border-[var(--p-border)] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[var(--p-text)]  text-xs mb-1 font-mono">Treść Opinii *</label>
                <textarea name="content" required rows={3} className="w-full px-4 py-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  text-sm resize-none focus:border-[var(--p-border)] outline-none" />
              </div>
              <div>
                <label className="block text-[var(--p-text)]  text-xs mb-1 font-mono">Ocena (1-5) *</label>
                <input type="number" name="rating" min="1" max="5" defaultValue="5" required className="w-24 px-4 py-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  text-sm focus:border-[var(--p-border)] outline-none" />
              </div>
              <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl admin-primary text-white font-bold text-sm transition-colors">
                {loading ? "Dodawanie..." : "Opublikuj Opinię"}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--p-text)] ">Opublikowane Opinie</h2>
            {testimonials?.length === 0 ? (
              <div className="p-8 text-center text-[var(--p-muted)] font-mono admin-panel bg-[var(--p-surface)]  border-[var(--p-border)]  rounded-[var(--p-radius)]">Brak dodanych opinii.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials?.map((testim) => (
                  <div key={testim.id} className="admin-panel p-6 rounded-[var(--p-radius)] border border-[var(--p-border)]  bg-[var(--p-surface)]  space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-[var(--p-text)] ">{testim.client_name}</div>
                        <div className="text-xs text-[var(--p-accent)]  font-mono">{testim.company}</div>
                      </div>
                      <button
                        aria-label={`Usuń opinię: ${testim.client_name}`}
                        onClick={() => handleDeleteTestimonial(testim.id)}
                        className="p-2 rounded-lg bg-[var(--p-surface)]  border border-[var(--p-border)]  text-rose-300  hover:border-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex text-[var(--p-accent)] ">
                      {[...Array(testim.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 dark:fill-amber-400" />)}
                    </div>
                    <blockquote className="text-sm text-[var(--p-text)]  italic">{testim.content}</blockquote>
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
            <Activity className="w-6 h-6 text-rose-500 " />
            <h2 className="text-xl font-bold text-[var(--p-text)] ">Ruch na stronie (Ostatnie 30 dni)</h2>
          </div>

          <div className="admin-panel p-4 sm:p-8 rounded-[var(--p-radius)] border border-[var(--p-border)]  bg-[var(--p-surface)]  h-[400px]">
            {analytics?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={"#263038"} vertical={false} />
                  <XAxis dataKey="date" stroke={"#a0a7ab"} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={"#a0a7ab"} fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#13171a",
                      borderColor: "#a0a7ab",
                      borderRadius: '12px',
                      color: "#efefea"
                    }}
                    itemStyle={{ color: '#acd1e8' }}
                  />
                  <Line type="monotone" dataKey="visits" name="Odwiedziny" stroke="#acd1e8" strokeWidth={3} dot={{ r: 4, fill: "#a0a7ab", strokeWidth: 2 }} activeDot={{ r: 6, fill: '#acd1e8' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-[var(--p-muted)] font-mono">Brak danych analitycznych do wyświetlenia.</div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Add Project */}
      {isAddModalOpen && (
        <div className="admin-modal-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain p-4 bg-black/75 backdrop-blur-md">
          <form
            onSubmit={handleCreateProject}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-project-dialog-title"
            className="admin-panel w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain p-6 rounded-[var(--p-radius)] border border-[var(--p-border)]  space-y-4 bg-[var(--p-surface)]  text-[var(--p-text)] "
          >
            <div className="flex items-center justify-between border-b border-[var(--p-border)]  pb-3">
              <h3 id="add-project-dialog-title" className="text-lg font-bold text-[var(--p-text)] ">Dodaj realizację</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} aria-label="Zamknij okno dodawania projektu" className="text-[var(--p-muted)] hover:text-[var(--p-text)] "><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label htmlFor="add-title" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Nazwa realizacji *</label>
                <input id="add-title" type="text" name="title" required placeholder="np. Modern Portfolio" className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
              </div>
              <div>
                <label htmlFor="add-short_description" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Krótki opis *</label>
                <input id="add-short_description" type="text" name="short_description" required className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
              </div>
              <div>
                <label htmlFor="add-detailed_description" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Pełny opis</label>
                <textarea id="add-detailed_description" name="detailed_description" rows={3} className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans resize-none" />
              </div>
              <div>
                <label htmlFor="add-technologies" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Technologie (oddzielone przecinkami)</label>
                 <input id="add-technologies" type="text" name="technologies" placeholder="Next.js, TypeScript" className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
              </div>
              <div>
                <label htmlFor="add-images" className="block text-[var(--p-text)] mb-1">Zdjęcia realizacji — adresy lub pliki</label>
                <div className="flex gap-2">
                  <input id="add-images" type="text" name="images" placeholder="/projects/img1.jpg lub https://..." className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
                  <label className="shrink-0 px-4 py-3 rounded-xl bg-[#acd1e814] hover:bg-[#acd1e814]   border border-[var(--p-border)]  text-[var(--p-accent)]  font-semibold cursor-pointer flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? "Przesyłanie..." : "Dodaj zdjęcie"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileUpload(e, "images", e.currentTarget.closest("form"))}
                    />
                  </label>
                </div>
              </div>
              <ProjectCaseFields />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="add-project_url" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Adres działającej strony</label>
                  <input id="add-project_url" type="text" name="project_url" placeholder="https://..." className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
                </div>
                <div>
                  <label htmlFor="add-repository_url" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Adres repozytorium GitHub</label>
                  <input id="add-repository_url" type="text" name="repository_url" placeholder="https://github.com/..." className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="add-category" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Kategoria</label>
                  <select id="add-category" name="category" defaultValue="web" className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)] ">
                    <option value="web">Web</option>
                    <option value="e-commerce">E-commerce</option>
                    <option value="mobile">Aplikacje mobilne</option><option value="apps">Aplikacje TV i Windows</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="add-project-type" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Typ projektu</label>
                  <input id="add-project-type" name="project_type" defaultValue="web-app" className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)] " />
                </div>
                <div>
                  <label htmlFor="add-project-status" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Status</label>
                  <select id="add-project-status" name="project_status" defaultValue="active" className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)] ">
                    <option value="active">Aktywny</option>
                    <option value="in-development">W budowie</option>
                    <option value="archived">Archiwalny</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 text-[var(--p-text)]  font-semibold">
                <input type="checkbox" name="featured" className="size-4 accent-cyan-500" />
                Wyróżniony projekt
              </label>
            </div>

            <button type="submit" disabled={loading} className="admin-primary w-full py-3 rounded-xl font-semibold text-white">
              {loading ? "Zapisywanie…" : "Zapisz realizację"}
            </button>
          </form>
        </div>
      )}

      {/* Modal: Edit Project */}
      {editingProject && (
        <div className="admin-modal-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain p-4 bg-black/75 backdrop-blur-md">
          <form
            onSubmit={handleUpdateProject}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-project-dialog-title"
            className="admin-panel w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain p-6 rounded-[var(--p-radius)] border border-[var(--p-border)]  space-y-4 bg-[var(--p-surface)]  text-[var(--p-text)] "
          >
            <div className="flex items-center justify-between border-b border-[var(--p-border)]  pb-3">
              <h3 id="edit-project-dialog-title" className="text-lg font-bold text-[var(--p-text)] ">Edytuj realizację</h3>
              <button type="button" onClick={() => setEditingProject(null)} aria-label="Zamknij okno edycji projektu" className="text-[var(--p-muted)] hover:text-[var(--p-text)] "><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label htmlFor="edit-title" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Nazwa realizacji *</label>
                <input id="edit-title" type="text" name="title" defaultValue={editingProject.title} required className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
              </div>
              <div>
                <label htmlFor="edit-short_description" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Krótki opis *</label>
                <input id="edit-short_description" type="text" name="short_description" defaultValue={editingProject.short_description} required className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
              </div>
              <div>
                <label htmlFor="edit-detailed_description" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Pełny opis</label>
                <textarea id="edit-detailed_description" name="detailed_description" defaultValue={editingProject.detailed_description} rows={3} className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans resize-none" />
              </div>
              <div>
                <label htmlFor="edit-technologies" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Technologie (oddzielone przecinkami)</label>
                 <input id="edit-technologies" type="text" name="technologies" defaultValue={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(", ") : (editingProject.technologies || "")} className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
              </div>
              <div>
                <label htmlFor="edit-images" className="block text-[var(--p-text)] mb-1">Zdjęcia realizacji — adresy lub pliki</label>
                <div className="flex gap-2">
                  <input id="edit-images" type="text" name="images" defaultValue={Array.isArray(editingProject.images) ? editingProject.images.join(", ") : (editingProject.images || "")} placeholder="/projects/img1.jpg lub https://..." className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
                  <label className="shrink-0 px-4 py-3 rounded-xl bg-[#acd1e814] hover:bg-[#acd1e814]   border border-[var(--p-border)]  text-[var(--p-accent)]  font-semibold cursor-pointer flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? "Przesyłanie..." : "Dodaj zdjęcie"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileUpload(e, "images", e.currentTarget.closest("form"))}
                    />
                  </label>
                </div>
              </div>
              <ProjectCaseFields project={editingProject} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="edit-project_url" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Adres działającej strony</label>
                  <input id="edit-project_url" type="text" name="project_url" defaultValue={editingProject.project_url} className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
                </div>
                <div>
                  <label htmlFor="edit-repository_url" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Adres repozytorium GitHub</label>
                  <input id="edit-repository_url" type="text" name="repository_url" defaultValue={editingProject.repository_url} className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)]  text-[var(--p-text)]  font-sans" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="edit-category" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Kategoria</label>
                  <select id="edit-category" name="category" defaultValue={editingProject.category || "web"} className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)] ">
                    <option value="web">Web</option>
                    <option value="e-commerce">E-commerce</option>
                    <option value="mobile">Aplikacje mobilne</option><option value="apps">Aplikacje TV i Windows</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-project-type" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Typ projektu</label>
                  <input id="edit-project-type" name="project_type" defaultValue={editingProject.project_type || "web-app"} className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)] " />
                </div>
                <div>
                  <label htmlFor="edit-project-status" className="block text-[var(--p-text)]  mb-1 font-mono font-semibold">Status</label>
                  <select id="edit-project-status" name="project_status" defaultValue={editingProject.project_status || "active"} className="w-full p-3 rounded-xl bg-[var(--p-surface)]  border border-[var(--p-border)] ">
                    <option value="active">Aktywny</option>
                    <option value="in-development">W budowie</option>
                    <option value="archived">Archiwalny</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 text-[var(--p-text)]  font-semibold">
                <input type="checkbox" name="featured" defaultChecked={Boolean(editingProject.featured)} className="size-4 accent-cyan-500" />
                Wyróżniony projekt
              </label>
            </div>

            <button type="submit" disabled={loading} className="admin-primary w-full py-3 rounded-xl font-semibold text-white">
              {loading ? "Zapisywanie zmian..." : "Zapisz zmiany"}
            </button>
          </form>
        </div>
      )}

    </main>
  );
}

