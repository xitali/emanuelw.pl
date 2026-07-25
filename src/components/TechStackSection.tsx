"use client";

import { useState } from "react";
import { Sparkles, Code2, Database, Server, Smartphone, Cpu, CheckCircle } from "lucide-react";

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState<string>("frontend");

  const techCategories = [
    { id: "frontend", label: "Frontend & Web", icon: Code2 },
    { id: "backend", label: "Backend & API", icon: Server },
    { id: "database", label: "Bazy Danych & Edge", icon: Database },
    { id: "mobile", label: "Mobile & Desktop", icon: Smartphone },
  ];

  const technologies = {
    frontend: [
      { name: "Next.js 15 & React 19", level: "Zaawansowany / Ekspert", desc: "Server Components, Server Actions, wydajny App Router i błyskawiczne renderowanie." },
      { name: "TypeScript & tRPC", level: "Zaawansowany", desc: "W pełni typowany kod od frontendu po backend, minimalizujący błędy." },
      { name: "Tailwind CSS v4 & shadcn/ui", level: "Ekspert", desc: "Nowoczesne, piękne komponenty UI z płynnymi mikro-animacjami." },
      { name: "Web Vitals & Optymalizacja", level: "Ekspert", desc: "Maksymalizacja wydajności Lighthouse i perfekcyjna responsywność." },
    ],
    backend: [
      { name: "Node.js & Hono (Edge Computing)", level: "Zaawansowany", desc: "Ultraszybkie endpointy API i logika biznesowa wykonywana blisko użytkownika." },
      { name: "Architektura Event-Driven", level: "Średniozaawansowany", desc: "Skalowalne systemy asynchroniczne gotowe na duże natężenie ruchu." },
      { name: "Zaawansowane Bezpieczeństwo", level: "Zaawansowany", desc: "Logowanie bezhasłowe (Magic Links), JWT, OAuth 2.0 oraz reguły RBAC." },
    ],
    database: [
      { name: "Turso (Edge SQLite)", level: "Ekspert", desc: "Błyskawiczna baza danych replikowana globalnie na brzegu sieci." },
      { name: "Supabase & PostgreSQL", level: "Ekspert", desc: "Potężne bazy relacyjne ze Storage i nasłuchiwaniem zmian w czasie rzeczywistym." },
      { name: "Vector Databases (RAG)", level: "Zaawansowany", desc: "Rozwiązania do błyskawicznego przeszukiwania kontekstowego i zaawansowanych systemów rekomendacji." },
      { name: "Drizzle ORM", level: "Zaawansowany", desc: "Superszybki, bezpieczny ORM do wydajnej i bezbłędnej komunikacji z bazą." },
    ],
    mobile: [
      { name: "React Native & Expo", level: "Zaawansowany", desc: "Wydajne aplikacje mobilne na iOS & Android współdzielące kod z wersją webową." },
      { name: "Flutter & Dart", level: "Średniozaawansowany", desc: "Przepiękne, natywnie skompilowane hybrydowe interfejsy z płynnością 120 FPS." },
      { name: "Tauri (Rust) & Electron", level: "Zaawansowany", desc: "Niezwykle lekkie i wydajne aplikacje desktopowe oparte na kodzie webowym." },
    ],
  };

  return (
    <section id="technologie" className="py-24 relative z-10 border-t border-slate-200 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-700 dark:text-cyan-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>Stos Technologiczny</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Narzędzia & <span className="text-gradient-cyan">Technologie</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Korzystam wyłącznie ze sprawdzonych, nowoczesnych i skalowalnych narzędzi, które zapewniają maksymalną szybkość strony.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {techCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    activeTab === cat.id
                      ? "bg-cyan-50 dark:bg-cyan-500/20 border border-cyan-400 text-cyan-700 dark:text-cyan-300 shadow-lg shadow-cyan-500/20"
                      : "glass-panel text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {technologies[activeTab as keyof typeof technologies].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel-interactive rounded-2xl p-6 border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 mt-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
                    {item.level}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
