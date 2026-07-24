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
      { name: "Next.js 15 (App Router)", level: "Zaawansowany / Ekspert", desc: "Server Components, Server Actions, ISR & Edge Routing" },
      { name: "React 19 & TypeScript", level: "Zaawansowany", desc: "Czysty, typowany kod bez błędów w runtime" },
      { name: "Tailwind CSS v4 & Glassmorphism", level: "Ekspert", desc: "Nowoczesne układy z animacjami Framer Motion" },
      { name: "HTML5 / CSS3 / Web Vitals", level: "Ekspert", desc: "Optymalizacja Lighthouse 95+ i WCAG dostępność" },
    ],
    backend: [
      { name: "Node.js / Next.js Server", level: "Zaawansowany", desc: "Wydajne endpointy REST oraz GraphQL API" },
      { name: "Python / Fast-API / Automation", level: "Średniozaawansowany", desc: "Skrypty automatyzujące i integracje botów" },
      { name: "Autentykacja & Bezpieczeństwo", level: "Zaawansowany", desc: "JWT, OAuth, Supabase Auth, RBAC Role" },
    ],
    database: [
      { name: "Turso (LibSQL / SQLite Edge)", level: "Ekspert", desc: "Ultra-szybka baza danych na brzegu AWS EU-West" },
      { name: "Supabase (PostgreSQL & Storage)", level: "Ekspert", desc: "Bazy relacyjne, Row Level Security, R2 / CDN Bucket" },
      { name: "Drizzle ORM & Prisma", level: "Zaawansowany", desc: "Bezpieczne zapytania i szybkie migracje schema" },
    ],
    mobile: [
      { name: "React Native & Expo", level: "Zaawansowany", desc: "Aplikacje mobilne na iOS & Android z jedną bazą kodu" },
      { name: "Flutter & Dart", level: "Średniozaawansowany", desc: "Wydajne hybrydowe interfejsy mobilne" },
      { name: "Electron & Tauri", level: "Zaawansowany", desc: "Natywne aplikacje pulpitowe dla Windows & macOS" },
    ],
  };

  return (
    <section id="technologie" className="py-24 relative z-10 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>Stos Technologiczny</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Narzędzia & <span className="text-gradient-cyan">Technologie</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
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
                      ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20"
                      : "glass-panel text-slate-300 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
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
              className="glass-panel-interactive rounded-2xl p-6 border border-slate-800 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                    {item.level}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
