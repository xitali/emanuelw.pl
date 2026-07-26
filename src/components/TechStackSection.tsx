"use client";

import { useState } from "react";
import { Code2, Database, Server, Cpu, CheckCircle } from "lucide-react";

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState<string>("frontend");

  const techCategories = [
    { id: "frontend", label: "Frontend & Web", icon: Code2 },
    { id: "backend", label: "Backend & API", icon: Server },
    { id: "database", label: "Bazy Danych & Edge", icon: Database },
  ];

  const technologies = {
    frontend: [
      { name: "Next.js 16 & React 19", level: "Codzienna praca", desc: "App Router, Server Components, Server Actions i renderowanie po stronie serwera." },
      { name: "TypeScript & Zod", level: "Codzienna praca", desc: "Typowanie aplikacji oraz walidacja danych na granicy frontendu i backendu." },
      { name: "Tailwind CSS v4 & Framer Motion", level: "Codzienna praca", desc: "Responsywne interfejsy i dopracowane mikroanimacje." },
      { name: "Dostępność & wydajność", level: "Stały proces", desc: "Semantyczny HTML, obsługa klawiatury, optymalizacja obrazów i testy produkcyjne." },
    ],
    backend: [
      { name: "Next.js Server Actions & Route Handlers", level: "Wdrożone", desc: "Logika formularzy, panel CMS i zabezpieczone endpointy API." },
      { name: "JOSE, bcrypt i rate limiting", level: "Wdrożone", desc: "Podpisane sesje, haszowane hasła oraz ochrona formularzy i API przed nadużyciami." },
      { name: "Vercel & Blob Storage", level: "Wdrożone", desc: "Hosting aplikacji i trwałe przechowywanie obrazów przesyłanych przez CMS." },
    ],
    database: [
      { name: "Turso (libSQL)", level: "Wdrożone", desc: "Relacyjna baza danych dla projektów, usług, opinii, wiadomości i statystyk." },
      { name: "SQL & migracje", level: "Wdrożone", desc: "Jawne schematy, indeksy, zapytania parametryzowane i powtarzalne migracje." },
      { name: "Anonimowa analityka", level: "Wdrożone", desc: "Dzienne agregaty odsłon bez zapisywania adresów IP i danych przeglądarki." },
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
          <div role="tablist" aria-label="Kategorie technologii" className="flex flex-wrap justify-center gap-2 pt-4">
            {techCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  role="tab"
                  aria-selected={activeTab === cat.id}
                  aria-controls="technology-panel"
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
        <div id="technology-panel" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
