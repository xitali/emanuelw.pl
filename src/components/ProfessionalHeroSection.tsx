"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import {
  ArrowRight,
  Check,
  Copy,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  openContactForm,
  PROJECT_QUOTE_PREFILL,
} from "@/lib/contact-prefill";

const HeroArtwork = dynamic(() => import("./HeroArtwork"), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto aspect-[0.98] w-full max-w-[680px] animate-pulse rounded-[2.5rem] border border-white/10 bg-white/[0.035]"
      aria-hidden="true"
    />
  ),
});

interface FeaturedProjectSummary {
  title: string;
  image?: string | null;
  type?: string | null;
}

interface ProfessionalHeroSectionProps {
  email?: string;
  projectCount?: number;
  featuredProject?: FeaturedProjectSummary;
}

export default function ProfessionalHeroSection({
  email = "kontakt@emanuelwloch.pl",
  projectCount = 0,
  featuredProject,
}: ProfessionalHeroSectionProps) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  function openProjectBrief() {
    openContactForm(PROJECT_QUOTE_PREFILL);
  }

  return (
    <section className="hero-stage relative isolate overflow-hidden bg-[#05070c] pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:min-h-[min(880px,100svh)] lg:pb-14 lg:pt-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, black, black 72%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-[18rem] top-10 size-[38rem] rounded-full bg-cyan-400/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-[14rem] bottom-[-10rem] size-[42rem] rounded-full bg-violet-600/15 blur-[170px]"
      />

      <div className="relative mx-auto grid w-full max-w-[1500px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.96fr_1.04fr] lg:gap-10 lg:px-8 xl:gap-14">
        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-4 rounded-[1.4rem] border border-white/12 bg-white/[0.055] p-2.5 pr-5 backdrop-blur-xl">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-[1.05rem] border border-white/20 bg-slate-800 shadow-[0_16px_42px_-18px_rgba(34,211,238,.45)] sm:size-24">
                <Image
                  src="/emanuel_wloch.jpg"
                  alt="Emanuel Włoch"
                  fill
                  priority
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-[-0.02em] text-white">
                  Emanuel Włoch
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/42">
                  Full-stack developer
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-white/72">
                  <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.9)]" />
                  Dostępny do współpracy
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end rounded-full border border-white/10 bg-black/15 px-3.5 py-2 text-xs text-white/55">
              <MapPin className="size-3.5 text-cyan-300" />
              Jarosław / zdalnie
            </div>
          </div>

          <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/70 sm:text-xs">
            Full-stack development • product design
          </div>

          <h1 className="mt-4 max-w-4xl text-[clamp(2.85rem,4.6vw,5rem)] font-medium leading-[0.92] tracking-[-0.055em]">
            Cyfrowe produkty,
            <span className="block bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
              które robią różnicę.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/66 sm:text-lg">
            Projektuję i wdrażam szybkie strony, sklepy oraz aplikacje webowe —
            od wyrazistego interfejsu po bezpieczny backend i produkcyjne
            wdrożenie.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#projekty"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#05070c]"
            >
              Zobacz wybrane projekty
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={openProjectBrief}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.055] px-6 py-3 text-sm font-medium text-white/85 backdrop-blur-xl transition-all hover:border-cyan-300/70 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <Sparkles className="size-4 text-cyan-300" />
              Omówmy Twój projekt
            </button>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            <div className="bg-[#080b12]/90 px-5 py-4">
              <div className="flex items-baseline gap-1 text-2xl font-semibold tracking-tight">
                {projectCount > 0 ? (
                  <NumberFlow value={projectCount} suffix="+" />
                ) : (
                  <span className="text-base">End-to-end</span>
                )}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/42">
                {projectCount > 0 ? "realizacji w portfolio" : "od pomysłu do wdrożenia"}
              </div>
            </div>
            <div className="bg-[#080b12]/90 px-5 py-4">
              <div className="text-sm font-semibold text-white/90">
                Frontend + backend
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/42">
                jeden spójny proces
              </div>
            </div>
            <div className="bg-[#080b12]/90 px-5 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <ShieldCheck className="size-4 text-emerald-300" />
                Production ready
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/42">
                testy i bezpieczeństwo
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-5 inline-flex items-center gap-2 text-xs text-white/48 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white"
            aria-live="polite"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-300" />
            ) : (
              <Copy className="size-3.5 text-cyan-300" />
            )}
            {copied ? "Adres skopiowany" : email}
          </button>
        </div>

        <div className="relative min-w-0 lg:pl-2">
          <HeroArtwork
            projectTitle={featuredProject?.title}
            projectImage={featuredProject?.image}
            projectType={featuredProject?.type}
          />
        </div>
      </div>
    </section>
  );
}
