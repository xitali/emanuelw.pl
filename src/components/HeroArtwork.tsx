"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import {
  ArrowUpRight,
  Database,
  Gauge,
  Layers3,
  ShieldCheck,
} from "lucide-react";

interface HeroArtworkProps {
  projectTitle?: string;
  projectImage?: string | null;
  projectType?: string | null;
}

export default function HeroArtwork({
  projectTitle = "Nowoczesny produkt cyfrowy",
  projectImage,
  projectType = "Web application",
}: HeroArtworkProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <div
      role="img"
      aria-label={`Wizualizacja procesu projektowego na przykładzie realizacji ${projectTitle}`}
      className="relative mx-auto aspect-[0.92] w-full max-w-[720px]"
    >
      <motion.div
        className="absolute inset-[3%] overflow-hidden rounded-[2.75rem] border border-white/15 bg-[#080a10] shadow-[0_54px_160px_-48px_rgba(0,0,0,0.95)]"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <MeshGradient
          aria-hidden="true"
          colors={["#07111f", "#0a5e6d", "#3b1c83", "#111827", "#00b8d9"]}
          distortion={0.78}
          swirl={0.62}
          grainMixer={0.18}
          grainOverlay={0.08}
          speed={shouldReduceMotion ? 0 : 0.12}
          frame={8400}
          fit="cover"
          scale={1.15}
          width="100%"
          height="100%"
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
          className="absolute inset-0 z-0 size-full opacity-90"
        />

        <div className="absolute inset-0 z-[1] bg-[linear-gradient(145deg,rgba(3,7,18,0.18),rgba(3,7,18,0.72)_68%,#030712)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_74%_22%,rgba(255,255,255,0.2),transparent_24%)]" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white/68 sm:p-8">
          <span>Design / Development</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" />
            Production
          </span>
        </div>

        <motion.div
          className="absolute inset-x-[8%] top-[17%] z-10 h-[56%] overflow-hidden rounded-[1.5rem] border border-white/16 bg-[#070a11]/86 shadow-[0_34px_100px_-30px_rgba(0,0,0,0.86)] backdrop-blur-xl sm:rounded-[2rem]"
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -7, 0], rotateZ: [-0.6, 0.25, -0.6] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-10 items-center justify-between border-b border-white/10 px-4">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-rose-400/85" />
              <span className="size-2 rounded-full bg-amber-300/85" />
              <span className="size-2 rounded-full bg-emerald-300/85" />
            </div>
            <span className="max-w-[54%] truncate font-mono text-[9px] uppercase tracking-[0.17em] text-white/45">
              {projectTitle}
            </span>
            <ArrowUpRight className="size-3.5 text-white/60" />
          </div>

          <div className="relative h-[calc(100%-2.5rem)] overflow-hidden bg-[#0b0f17]">
            {projectImage ? (
              <>
                <Image
                  src={projectImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 82vw, 520px"
                  className="scale-110 object-cover opacity-30 blur-2xl"
                  aria-hidden="true"
                />
                <div className="absolute inset-3 overflow-hidden rounded-xl border border-white/8 bg-black/20 sm:inset-4">
                  <Image
                    src={projectImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 78vw, 500px"
                    className="object-contain object-center"
                    priority
                  />
                </div>
              </>
            ) : (
              <div className="absolute inset-0 grid grid-cols-[0.38fr_0.62fr] gap-3 p-5">
                <div className="space-y-3 rounded-xl border border-white/8 bg-white/[0.035] p-4">
                  <div className="h-2 w-16 rounded-full bg-cyan-300/70" />
                  <div className="h-1.5 w-full rounded-full bg-white/10" />
                  <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
                  <div className="mt-6 h-8 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                </div>
                <div className="rounded-xl border border-white/8 bg-[radial-gradient(circle_at_65%_30%,rgba(34,211,238,.35),transparent_30%),radial-gradient(circle_at_30%_70%,rgba(139,92,246,.35),transparent_34%),#0d1320]" />
              </div>
            )}
          </div>
        </motion.div>

        <div className="absolute inset-x-[8%] bottom-[7%] z-10 grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: "Interfejs", shortLabel: "UI", icon: Layers3 },
            { label: "Backend", shortLabel: "API", icon: Database },
            { label: "Jakość", shortLabel: "QA", icon: ShieldCheck },
          ].map(({ label, shortLabel, icon: Icon }) => (
            <div
              key={label}
              className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-black/25 px-3 py-3 text-white/75 backdrop-blur-xl sm:rounded-2xl sm:px-4"
            >
              <Icon className="size-3.5 shrink-0 text-cyan-300" />
              <span className="hidden truncate text-[9px] font-medium uppercase tracking-[0.13em] sm:inline sm:text-[10px]">
                {label}
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.13em] sm:hidden">
                {shortLabel}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute -left-1 top-[17%] hidden items-center gap-2 rounded-full border border-white/14 bg-[#0a0d15]/82 px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-white/75 shadow-xl backdrop-blur-xl sm:flex"
        animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Gauge className="size-3.5 text-emerald-300" />
        Szybkość i stabilność
      </motion.div>

      <motion.div
        className="absolute -right-1 bottom-[20%] max-w-[190px] rounded-2xl border border-white/14 bg-[#0a0d15]/86 p-4 text-white shadow-2xl backdrop-blur-xl sm:right-0"
        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-[9px] uppercase tracking-[0.17em] text-white/45">
          Wybrana realizacja
        </div>
        <div className="mt-1.5 line-clamp-2 text-sm font-semibold leading-tight">
          {projectTitle}
        </div>
        <div className="mt-2 text-[10px] text-cyan-200/80">
          {projectType || "Produkt cyfrowy"}
        </div>
      </motion.div>
    </div>
  );
}
