"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Check,
  Code2,
  Globe2,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { openContactForm } from "@/lib/contact-prefill";
import type { Service } from "@/types";

const ServicesArtwork = dynamic(() => import("./ServicesArtwork"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_65%_25%,rgba(34,211,238,.24),transparent_30%),radial-gradient(circle_at_30%_70%,rgba(139,92,246,.28),transparent_36%),#070910]"
    />
  ),
});

interface ServicesSectionProps {
  initialServices: Service[];
}

const projectTypes = [
  { id: "landing", label: "Strona firmowa", base: 600 },
  { id: "ecommerce", label: "E-commerce", base: 1800 },
  { id: "webapp", label: "Aplikacja webowa", base: 1200 },
] as const;

const extraModules = [
  {
    id: "cms",
    label: "Panel CMS",
    description: "Samodzielna edycja treści",
    price: 300,
  },
  {
    id: "payments",
    label: "Płatności online",
    description: "Stripe, PayU lub Przelewy24",
    price: 500,
  },
  {
    id: "mobile",
    label: "Aplikacja mobilna",
    description: "Dedykowany interfejs Android",
    price: 1000,
  },
] as const;

type ProjectType = (typeof projectTypes)[number]["id"];
type ExtraModule = (typeof extraModules)[number]["id"];

function getServiceIcon(iconName: string) {
  switch (iconName.toLowerCase()) {
    case "globe":
    case "code":
      return Globe2;
    case "smartphone":
      return Smartphone;
    case "star":
      return Star;
    case "shield":
      return Shield;
    case "zap":
      return Zap;
    case "users":
      return Users;
    default:
      return Code2;
  }
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("pl-PL").format(value);
}

export default function ProfessionalServicesSection({
  initialServices,
}: ServicesSectionProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [projectType, setProjectType] = useState<ProjectType>("landing");
  const [selectedModules, setSelectedModules] = useState<Set<ExtraModule>>(
    new Set(["cms"]),
  );

  const activeProject =
    projectTypes.find((item) => item.id === projectType) ?? projectTypes[0];
  const estimate =
    activeProject.base +
    extraModules.reduce(
      (total, module) =>
        total + (selectedModules.has(module.id) ? module.price : 0),
      0,
    );

  function toggleModule(id: ExtraModule) {
    setSelectedModules((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function selectService(service: Service) {
    openContactForm({
      subject: `Zapytanie o usługę: ${service.name}`,
      message: `Dzień dobry,\n\nJestem zainteresowany/a usługą „${service.name}” (cena od ${formatPrice(service.starting_price)} ${service.currency}). Proszę o kontakt w celu omówienia szczegółów.\n\nOpis mojego projektu / dodatkowe wymagania:\n- `,
      badge: "Wybrana usługa została wpisana w formularzu.",
    });
  }

  function selectEstimate() {
    const modules = extraModules
      .filter((module) => selectedModules.has(module.id))
      .map((module) => module.label)
      .join(", ");

    openContactForm({
      subject: `Wycena projektu: ${activeProject.label} (~${formatPrice(estimate)} PLN)`,
      message: `Dzień dobry,\n\nInteresuje mnie projekt typu „${activeProject.label}”.\nWybrane moduły: ${modules || "bez dodatkowych modułów"}.\nOrientacyjny budżet: około ${formatPrice(estimate)} PLN.\n\nProszę o bezpłatną konsultację i dokładną wycenę.\n\nOpis moich potrzeb:\n- `,
      badge: "Parametry wyceny zostały wpisane w formularzu.",
    });
  }

  return (
    <section
      id="uslugi"
      aria-labelledby="services-heading"
      className="relative z-10 overflow-hidden border-t border-slate-200 bg-slate-50 py-24 text-slate-950 dark:border-white/[0.07] dark:bg-[#05070c] dark:text-white lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-16rem] top-[22rem] size-[34rem] rounded-full bg-cyan-400/[0.07] blur-[150px]"
      />

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <header className="grid gap-8 border-b border-slate-200 pb-12 dark:border-white/10 lg:grid-cols-[0.9fr_0.7fr] lg:items-end lg:gap-20 lg:pb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200/70">
              <Sparkles className="size-3.5" />
              Projekt, kod i wdrożenie
            </div>
            <h2
              id="services-heading"
              className="mt-5 max-w-4xl text-[clamp(2.85rem,5.5vw,5.75rem)] font-medium leading-[0.88] tracking-[-0.055em]"
            >
              Usługi, które
              <span className="block text-slate-400 dark:text-white/32">
                dowożą rezultat.
              </span>
            </h2>
          </div>

          <div className="max-w-xl lg:justify-self-end">
            <p className="text-base leading-relaxed text-slate-600 dark:text-white/62 sm:text-lg">
              Łączę projektowanie, frontend i zaplecze w jeden spójny proces.
              Dostajesz działający produkt, jasny zakres i rozwiązania dobrane
              do realnego celu.
            </p>
            <Link
              href="/tworzenie-stron-internetowych-rzeszow"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              Oferta dla klientów z Rzeszowa
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </header>

        <div className="mt-12 grid items-start gap-4 lg:mt-16 lg:grid-cols-[0.68fr_1.32fr] lg:gap-5">
          <motion.aside
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
            className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#070910] text-white shadow-[0_38px_100px_-50px_rgba(15,23,42,.8)] lg:sticky lg:top-24 lg:min-h-[560px]"
          >
            <ServicesArtwork />
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-6 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
              <span>Od pomysłu do produkcji</span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-300" />
                Dostępny
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7">
              <p className="max-w-sm text-sm leading-relaxed text-white/64">
                Każdy etap ma konkretny cel, wynik i miejsce na Twoją decyzję.
              </p>
            </div>
          </motion.aside>

          <div className="space-y-3">
            {initialServices.map((service, index) => {
              const Icon = getServiceIcon(service.icon_name);
              const features = service.included_features?.slice(0, 3) ?? [];

              return (
                <motion.article
                  key={service.id}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 22 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.55,
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                  }}
                  className="group relative overflow-hidden rounded-[1.65rem] border border-slate-200 bg-white p-6 shadow-[0_22px_60px_-45px_rgba(15,23,42,.5)] transition-colors hover:border-cyan-300/70 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none dark:hover:border-cyan-300/25 sm:p-7"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-20 size-44 rounded-full bg-gradient-to-br from-cyan-300/10 to-violet-500/10 blur-3xl transition-transform duration-700 group-hover:scale-125"
                  />

                  <div className="relative grid gap-6 sm:grid-cols-[3.25rem_1fr] xl:grid-cols-[3.25rem_1fr_auto] xl:items-start">
                    <div className="grid size-12 place-items-center rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-300/18 dark:bg-cyan-300/8 dark:text-cyan-200">
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-slate-400 dark:text-white/30">
                          0{index + 1}
                        </span>
                        <span className="h-px w-8 bg-slate-200 dark:bg-white/10" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-cyan-700 dark:text-cyan-200/65">
                          Usługa
                        </span>
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-[1.7rem]">
                        {service.name}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-white/56">
                        {service.full_description ||
                          service.short_description}
                      </p>

                      {features.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {features.map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] text-slate-600 dark:border-white/9 dark:bg-white/[0.035] dark:text-white/58"
                            >
                              <Check className="size-3 text-emerald-500 dark:text-emerald-300" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-end justify-between border-t border-slate-200 pt-5 dark:border-white/10 sm:col-start-2 xl:col-start-auto xl:flex-col xl:items-end xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0">
                      <div className="xl:text-right">
                        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400 dark:text-white/32">
                          Cena od
                        </div>
                        <div className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                          {formatPrice(service.starting_price)}{" "}
                          <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
                            {service.currency}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => selectService(service)}
                        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-4 text-xs font-semibold transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-white/15 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                      >
                        Zapytaj
                        <ArrowRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_34px_90px_-58px_rgba(15,23,42,.6)] dark:border-white/10 dark:bg-[#090c13] dark:shadow-none lg:mt-20">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-300/18 dark:bg-cyan-300/8 dark:text-cyan-200">
                  <Calculator className="size-4.5" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">
                    Szybka wycena projektu
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-white/42">
                    Wybierz zakres — wynik aktualizuje się automatycznie.
                  </p>
                </div>
              </div>

              <fieldset className="mt-8">
                <legend className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 dark:text-white/42">
                  Typ projektu
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      aria-pressed={projectType === type.id}
                      onClick={() => setProjectType(type.id)}
                      className={`min-h-12 rounded-xl border px-3 text-left text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                        projectType === type.id
                          ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-black"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-400 dark:border-white/10 dark:bg-white/[0.025] dark:text-white/52 dark:hover:border-white/25"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-7">
                <legend className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 dark:text-white/42">
                  Dodatkowe moduły
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {extraModules.map((module) => {
                    const selected = selectedModules.has(module.id);
                    return (
                      <label
                        key={module.id}
                        className={`relative cursor-pointer rounded-xl border p-4 transition-colors ${
                          selected
                            ? "border-cyan-400/70 bg-cyan-50 dark:border-cyan-300/30 dark:bg-cyan-300/[0.07]"
                            : "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.025]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleModule(module.id)}
                          className="sr-only"
                        />
                        <span className="flex items-start justify-between gap-3">
                          <span>
                            <span className="block text-xs font-semibold">
                              {module.label}
                            </span>
                            <span className="mt-1 block text-[10px] leading-relaxed text-slate-500 dark:text-white/42">
                              {module.description}
                            </span>
                          </span>
                          <span
                            className={`grid size-5 shrink-0 place-items-center rounded-md border ${
                              selected
                                ? "border-cyan-500 bg-cyan-500 text-white"
                                : "border-slate-300 dark:border-white/20"
                            }`}
                          >
                            {selected && <Check className="size-3" />}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            <div className="relative flex flex-col justify-between overflow-hidden border-t border-white/10 bg-[#070910] p-7 text-white sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 size-72 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/18 blur-[90px]"
              />
              <div className="relative">
                <div className="font-mono text-[9px] uppercase tracking-[0.19em] text-cyan-200/65">
                  Orientacyjny budżet
                </div>
                <div
                  role="status"
                  aria-live="polite"
                  aria-label={`Orientacyjny budżet: około ${formatPrice(estimate)} PLN`}
                  className="mt-4 flex items-baseline gap-2 tracking-[-0.055em]"
                >
                  <span className="text-3xl text-white/40">~</span>
                  <span aria-hidden="true">
                    <NumberFlow
                      value={estimate}
                      locales="pl-PL"
                      className="text-[clamp(3.2rem,6vw,5.75rem)] font-medium leading-none"
                    />
                  </span>
                  <span className="text-sm font-medium tracking-normal text-cyan-200/80">
                    PLN
                  </span>
                </div>
                <p className="mt-5 max-w-sm text-xs leading-relaxed text-white/48">
                  To punkt startowy, nie automatyczna oferta. Dokładną cenę
                  podaję po krótkiej rozmowie i poznaniu zakresu.
                </p>
              </div>

              <button
                type="button"
                onClick={selectEstimate}
                className="relative mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-transform hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Wyślij ten zakres
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
