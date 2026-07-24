"use client";

import { useState } from "react";
import { Service } from "@/types";
import { Rocket, Check, Code, Globe, Shield, Star, Smartphone, Zap, Users, Calculator, ArrowRight } from "lucide-react";
import { FadeIn } from "./animations/FadeIn";
import { StaggerContainer, StaggerItem } from "./animations/StaggerContainer";

interface ServicesSectionProps {
  initialServices: Service[];
}

export default function ServicesSection({ initialServices }: ServicesSectionProps) {
  // Map icon names from database strings to Lucide icons
  const getServiceIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "code": case "globe": return Globe;
      case "smartphone": return Smartphone;
      case "star": return Star;
      case "shield": return Shield;
      case "zap": return Zap;
      case "users": return Users;
      default: return Code;
    }
  };

  // Interactive Cost Estimator State
  const [projectType, setProjectType] = useState<string>("landing");
  const [needsCms, setNeedsCms] = useState<boolean>(true);
  const [needsPayments, setNeedsPayments] = useState<boolean>(false);
  const [needsMobile, setNeedsMobile] = useState<boolean>(false);

  const calculateEstimate = () => {
    let base = 600;
    if (projectType === "ecommerce") base = 1800;
    if (projectType === "webapp") base = 1200;
    if (needsCms) base += 300;
    if (needsPayments) base += 500;
    if (needsMobile) base += 1000;
    return base;
  };

  const handleSelectService = (serviceName: string, price: number, currency: string) => {
    const event = new CustomEvent("selectService", {
      detail: {
        subject: `Zapytanie o usługę: ${serviceName}`,
        message: `Dzień dobry,\n\nJestem zainteresowany/a usługą "${serviceName}" (cena od ${price} ${currency}). Proszę o kontakt w celu omówienia szczegółów.\n\nOpis mojego projektu / dodatkowe wymagania:\n- `,
      },
    });
    window.dispatchEvent(event);

    const contactElem = document.getElementById("kontakt");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectCalculator = () => {
    const estimate = calculateEstimate();
    const typeLabel = projectType === "landing" ? "Wizytówka" : projectType === "ecommerce" ? "Sklep E-commerce" : "Aplikacja Webowa";
    
    const event = new CustomEvent("selectService", {
      detail: {
        subject: `Wycena z kalkulatora: ${typeLabel} (~${estimate} PLN)`,
        message: `Dzień dobry,\n\nPrzesyłam wycenę z kalkulatora dla projektu "${typeLabel}".\nParametry: CMS (${needsCms ? 'Tak' : 'Nie'}), Płatności Online (${needsPayments ? 'Tak' : 'Nie'}), Aplikacja Mobilna (${needsMobile ? 'Tak' : 'Nie'}).\nSzacowany budżet: ~${estimate} PLN netto.\n\nProszę o kontakt w celu bezpłatnej konsultacji.\n\nOpis moich potrzeb / uwag do projektu:\n- `,
      },
    });
    window.dispatchEvent(event);

    const contactElem = document.getElementById("kontakt");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="uslugi" className="py-24 relative z-10 bg-[#040710]/80 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <FadeIn direction="up" className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Rocket className="w-3.5 h-3.5" />
            <span>Usługi & Rozwiązania</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Czym Mogę <span className="text-gradient-cyan">Cię Wspomóc?</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Wybierz usługę, aby automatycznie wypełnić formularz kontaktowy z podaną wyceną i zgłosić projekt.
          </p>
        </FadeIn>

        {/* Services Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialServices.map((service) => {
            const IconComp = getServiceIcon(service.icon_name);

            return (
              <StaggerItem key={service.id}>
                <div
                  className="glass-panel-interactive rounded-3xl p-8 flex flex-col justify-between space-y-6 border border-slate-800 h-full"
              >
                <div className="space-y-4">
                  {/* Icon & Title Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                      Usługa
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {service.name}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.full_description || service.short_description}
                  </p>

                  {/* Included features checklist */}
                  {service.included_features && service.included_features.length > 0 && (
                    <div className="pt-4 space-y-2 border-t border-slate-800/80">
                      <div className="text-xs font-mono text-cyan-400 uppercase">W pakiecie:</div>
                      {service.included_features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price tag & CTA */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase">Cena od</div>
                    <div className="text-2xl font-extrabold text-white">
                      {service.starting_price} <span className="text-sm font-normal text-cyan-400">{service.currency}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectService(service.name, service.starting_price, service.currency)}
                    className="px-4 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-semibold text-xs border border-cyan-500/40 transition-all duration-300"
                  >
                    Zamów Usługę
                  </button>
                </div>
              </div>
            </StaggerItem>
          );
          })}
        </StaggerContainer>

        {/* Interactive Estimator Widget */}
        <FadeIn direction="up" delay={0.4} className="glass-panel rounded-3xl p-8 border border-cyan-500/30 max-w-4xl mx-auto space-y-6 bg-slate-950/80">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Interaktywny Kalkulator Projektu</h3>
              <p className="text-xs text-slate-400">Oszacuj przybliżony budżet na swoją stronę lub aplikację w kilka sekund</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Options selection */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase block mb-2">Typ Projektu:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "landing", label: "Wizytówka" },
                    { id: "ecommerce", label: "E-Commerce" },
                    { id: "webapp", label: "Aplikacja Web" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setProjectType(t.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        projectType === t.id
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase block">Dodatkowe Moduły:</label>
                
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <span className="text-xs text-slate-300">Panel CMS / Zarządzanie treścią</span>
                  <input
                    type="checkbox"
                    checked={needsCms}
                    onChange={(e) => setNeedsCms(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <span className="text-xs text-slate-300">Integracja Płatności Online (Stripe/PayU)</span>
                  <input
                    type="checkbox"
                    checked={needsPayments}
                    onChange={(e) => setNeedsPayments(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <span className="text-xs text-slate-300">Dedykowana Aplikacja Mobilna (iOS/Android)</span>
                  <input
                    type="checkbox"
                    checked={needsMobile}
                    onChange={(e) => setNeedsMobile(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 rounded"
                  />
                </label>
              </div>
            </div>

            {/* Estimated Total Display */}
            <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30">
              <div className="space-y-2">
                <div className="text-xs font-mono text-cyan-400 uppercase">Szacowany Budżet:</div>
                <div className="text-4xl font-extrabold text-white">
                  ~{calculateEstimate()} <span className="text-lg font-normal text-cyan-300">PLN netto</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-2">
                  Cena końcowa zależy od wybranej specyfikacji. Wyślij zapytanie, aby otrzymać darmową analizę.
                </p>
              </div>

              <button
                onClick={handleSelectCalculator}
                className="neon-glow-button mt-6 py-3 px-6 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-2"
              >
                Przejdź do Zgłoszenia z tą Wyceną
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
