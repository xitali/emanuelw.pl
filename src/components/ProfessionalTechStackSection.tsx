"use client";

import { Tabs } from "@base-ui/react/tabs";
import {
  Braces,
  Check,
  Cloud,
  Code2,
  Database,
  Server,
  ShieldCheck,
} from "lucide-react";

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    eyebrow: "Warstwa doświadczenia",
    icon: Code2,
    intro:
      "Interfejs, który wygląda charakterystycznie, pozostaje czytelny i działa płynnie na każdym ekranie.",
    technologies: [
      {
        name: "Next.js 16 + React 19",
        description: "App Router, Server Components i wydajne renderowanie.",
      },
      {
        name: "TypeScript + Zod",
        description: "Przewidywalny kod i walidacja danych na każdej granicy.",
      },
      {
        name: "Tailwind CSS 4 + Motion",
        description: "Spójny design system i kontrolowane mikrointerakcje.",
      },
      {
        name: "A11y + Core Web Vitals",
        description: "Obsługa klawiatury, reduced motion i stabilny layout.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    eyebrow: "Logika produktu",
    icon: Server,
    intro:
      "Bezpieczna warstwa aplikacyjna, która obsługuje formularze, panel CMS, automatyzacje i integracje.",
    technologies: [
      {
        name: "Server Actions + Route Handlers",
        description: "Logika biznesowa blisko danych i bez zbędnej warstwy API.",
      },
      {
        name: "JOSE + bcrypt",
        description: "Podpisane sesje i bezpieczne przechowywanie haseł.",
      },
      {
        name: "Rate limiting + walidacja",
        description: "Ochrona endpointów przed nadużyciami i błędnymi danymi.",
      },
      {
        name: "Powiadomienia push",
        description: "Obsługa zgłoszeń z panelu oraz dedykowanej aplikacji.",
      },
    ],
  },
  {
    id: "data",
    label: "Dane i cloud",
    eyebrow: "Produkcja i utrzymanie",
    icon: Database,
    intro:
      "Trwałe dane, zoptymalizowane media i wdrożenie przygotowane do rzeczywistego ruchu.",
    technologies: [
      {
        name: "Turso / libSQL",
        description: "Relacyjna baza danych dostępna blisko użytkownika.",
      },
      {
        name: "Vercel + Blob",
        description: "Automatyczne wdrożenia i trwałe przechowywanie mediów.",
      },
      {
        name: "SQL + migracje",
        description: "Jawny schemat, indeksy i powtarzalne zmiany danych.",
      },
      {
        name: "Testy + CI",
        description: "Kontrola typów, lint, testy i build przed publikacją.",
      },
    ],
  },
] as const;

export default function ProfessionalTechStackSection() {
  return (
    <section
      id="technologie"
      aria-labelledby="technology-heading"
      className="relative z-10 overflow-hidden border-y border-white/[0.07] bg-[#070910] py-24 text-white lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage:
            "radial-gradient(circle at 72% 48%, black, transparent 68%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute right-[-14rem] top-[10%] size-[38rem] rounded-full bg-violet-500/12 blur-[160px]"
      />

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[0.9fr_0.7fr] lg:items-end lg:gap-20 lg:pb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/65">
              <Braces className="size-3.5" />
              Sprawdzony warsztat
            </div>
            <h2
              id="technology-heading"
              className="mt-5 text-[clamp(2.85rem,5.5vw,5.75rem)] font-medium leading-[0.88] tracking-[-0.055em]"
            >
              Technologia
              <span className="block text-white/30">ma pomagać.</span>
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-base leading-relaxed text-white/64 sm:text-lg">
              Dobieram narzędzia do celu produktu. Bez technologii dla samej
              technologii — liczą się szybkość, bezpieczeństwo, łatwe
              zarządzanie i koszt utrzymania.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "Typed", icon: Check },
                { label: "Secure", icon: ShieldCheck },
                { label: "Edge-ready", icon: Cloud },
              ].map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-[10px] uppercase tracking-[0.14em] text-white/62"
                >
                  <Icon className="size-3.5 text-cyan-300" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Tabs.Root defaultValue="frontend" className="mt-14 lg:mt-20">
          <Tabs.List
            aria-label="Kategorie technologii"
            className="relative grid max-w-3xl grid-cols-3 gap-1 rounded-2xl border border-white/10 bg-white/[0.025] p-1.5 sm:gap-2 sm:p-2"
          >
            {categories.map(({ id, label, icon: Icon }, index) => (
              <Tabs.Tab
                key={id}
                value={id}
                className="group relative z-10 flex min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-3 text-center text-xs font-medium text-white/48 outline-none transition-colors hover:text-white data-[active]:text-black focus-visible:ring-2 focus-visible:ring-cyan-300 sm:px-4 sm:text-sm"
              >
                <span className="hidden font-mono text-[10px] text-white/30 group-data-[active]:text-black/45 sm:inline">
                  0{index + 1}
                </span>
                <Icon className="size-4 shrink-0 text-cyan-300 group-data-[active]:text-cyan-700" />
                <span className="truncate">{label}</span>
              </Tabs.Tab>
            ))}
            <Tabs.Indicator className="absolute inset-y-1.5 left-[var(--active-tab-left)] z-0 w-[var(--active-tab-width)] rounded-xl bg-white transition-[left,width] duration-300 sm:inset-y-2" />
          </Tabs.List>

          <div className="mt-10 lg:mt-14">
            {categories.map((category) => (
                <Tabs.Panel
                  key={category.id}
                  value={category.id}
                  className="outline-none animate-fadeIn"
                >
                  <div className="grid gap-8 xl:grid-cols-[0.62fr_1.38fr] xl:gap-12">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">
                        {category.eyebrow}
                      </div>
                      <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                        {category.label}
                      </h3>
                      <p className="mt-5 max-w-md text-sm leading-relaxed text-white/56 sm:text-base">
                        {category.intro}
                      </p>
                    </div>

                    <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
                      {category.technologies.map((technology, index) => (
                        <article
                          key={technology.name}
                          className="group min-h-44 bg-[#0a0d15] p-6 transition-colors hover:bg-[#0d121d] sm:p-7"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-white/28">
                              0{index + 1}
                            </span>
                            <span className="size-1.5 rounded-full bg-cyan-300/65 transition-shadow group-hover:shadow-[0_0_16px_rgba(103,232,249,.9)]" />
                          </div>
                          <h4 className="mt-7 text-base font-semibold text-white/90">
                            {technology.name}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-white/45">
                            {technology.description}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                </Tabs.Panel>
            ))}
          </div>
        </Tabs.Root>
      </div>
    </section>
  );
}
