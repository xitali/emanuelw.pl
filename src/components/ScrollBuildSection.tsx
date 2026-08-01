"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Braces,
  Check,
  Database,
  Gauge,
  Layers3,
  Server,
  ShieldCheck,
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Interfejs",
    description: "Czytelny, responsywny i dostępny na każdym ekranie.",
  },
  {
    number: "02",
    title: "Logika",
    description: "Bezpieczne API, walidacja i panel do zarządzania treścią.",
  },
  {
    number: "03",
    title: "Dane i wdrożenie",
    description: "Trwała baza, monitoring oraz gotowe środowisko produkcyjne.",
  },
] as const;

export default function ScrollBuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (latestScrollY) => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return 0;

    const sectionRect = section.getBoundingClientRect();
    const start = sectionRect.top + latestScrollY;
    const end = start + sectionRect.height - window.innerHeight;
    if (end <= start) return latestScrollY >= start ? 1 : 0;

    return Math.min(1, Math.max(0, (latestScrollY - start) / (end - start)));
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.22,
  });

  const sceneRotateX = useTransform(progress, [0, 0.55, 1], [17, 5, 0]);
  const sceneRotateY = useTransform(progress, [0, 0.6, 1], [-12, 3, 0]);
  const sceneScale = useTransform(progress, [0, 0.7, 1], [0.82, 1.025, 1]);

  const interfaceX = useTransform(progress, [0, 0.72, 1], [-42, -8, 0]);
  const interfaceY = useTransform(progress, [0, 0.72, 1], [-110, -16, 0]);
  const interfaceRotate = useTransform(progress, [0, 0.72, 1], [-6, -1, 0]);
  const interfaceOpacity = useTransform(progress, [0, 0.18, 1], [0.32, 1, 1]);

  const logicX = useTransform(progress, [0, 0.58, 1], [48, 10, 0]);
  const logicY = useTransform(progress, [0, 0.58, 1], [10, 0, 0]);
  const logicRotate = useTransform(progress, [0, 0.58, 1], [5, 1, 0]);
  const logicOpacity = useTransform(progress, [0, 0.2, 1], [0.28, 1, 1]);

  const dataX = useTransform(progress, [0, 0.76, 1], [-30, -6, 0]);
  const dataY = useTransform(progress, [0, 0.76, 1], [125, 18, 0]);
  const dataRotate = useTransform(progress, [0, 0.76, 1], [-4, -1, 0]);
  const dataOpacity = useTransform(progress, [0, 0.24, 1], [0.24, 1, 1]);

  const statusOpacity = useTransform(progress, [0.76, 0.94], [0, 1]);
  const statusY = useTransform(progress, [0.76, 0.94], [14, 0]);

  const staticTransform = shouldReduceMotion ? 0 : undefined;
  const staticOpacity = shouldReduceMotion ? 1 : undefined;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="build-heading"
      className="scroll-build-section relative z-10 border-y border-slate-200/80 bg-white/45 dark:border-white/[0.07] dark:bg-[#070a12]/70 lg:min-h-[165vh]"
    >
      <div className="scroll-build-sticky relative flex items-center overflow-hidden py-24 lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)] lg:py-5">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 72% 48%, rgba(34, 211, 238, 0.14), transparent 26%), radial-gradient(circle at 82% 58%, rgba(139, 92, 246, 0.13), transparent 34%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div className="max-w-xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] px-3.5 py-1.5 font-mono text-xs text-cyan-700 dark:text-cyan-300">
              <Layers3 className="size-3.5" />
              <span>Proces w ruchu</span>
            </div>

            <div className="space-y-5">
              <h2
                id="build-heading"
                className="text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white"
              >
                Buduję cały system,
                <span className="block bg-gradient-to-r from-cyan-500 to-violet-600 bg-clip-text text-transparent">
                  nie tylko ekran.
                </span>
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
                Przewiń dalej. Warstwa po warstwie zobaczysz, jak interfejs,
                logika i dane składają się w jedną dopracowaną aplikację.
              </p>
            </div>

            <div className="relative space-y-6 pl-7">
              <div className="absolute bottom-2 left-[5px] top-2 w-px bg-slate-200 dark:bg-white/10" />
              <motion.div
                aria-hidden="true"
                className="absolute left-[4px] top-2 h-[calc(100%-1rem)] w-[3px] origin-top rounded-full bg-gradient-to-b from-cyan-400 to-violet-500"
                style={{ scaleY: shouldReduceMotion ? 1 : progress }}
              />

              {processSteps.map((step) => (
                <div key={step.number} className="relative">
                  <span className="absolute -left-7 top-1 size-[11px] rounded-full border-2 border-white bg-cyan-500 shadow-[0_0_0_3px_rgba(6,182,212,0.14)] dark:border-[#070a12]" />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400">
                      {step.number}
                    </span>
                    <h3 className="font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-500">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[610px] w-full max-w-[700px] sm:h-[640px] lg:h-[min(660px,calc(100vh-5rem))]">
            <div
              aria-hidden="true"
              className="absolute inset-x-[12%] bottom-[8%] h-[28%] rounded-[50%] bg-cyan-400/10 dark:bg-cyan-400/[0.08]"
              style={{ transform: "rotateX(72deg)" }}
            />

            <div
              className="absolute inset-0"
              style={{ perspective: "1500px", perspectiveOrigin: "50% 48%" }}
            >
              <motion.div
                className="absolute inset-x-[4%] inset-y-[2%] [transform-style:preserve-3d]"
                style={{
                  rotateX: staticTransform ?? sceneRotateX,
                  rotateY: staticTransform ?? sceneRotateY,
                  scale: shouldReduceMotion ? 1 : sceneScale,
                }}
              >
                <motion.article
                  className="absolute inset-x-[5%] top-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_28px_70px_-38px_rgba(15,23,42,0.65)] [backface-visibility:hidden] dark:border-white/10 dark:bg-[#101521] dark:shadow-[0_32px_80px_-34px_rgba(0,0,0,0.9)]"
                  style={{
                    x: staticTransform ?? interfaceX,
                    y: staticTransform ?? interfaceY,
                    z: 36,
                    rotateZ: staticTransform ?? interfaceRotate,
                    opacity: staticOpacity ?? interfaceOpacity,
                    willChange: "transform",
                  }}
                >
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-rose-400" />
                      <span className="size-2 rounded-full bg-amber-400" />
                      <span className="size-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      Warstwa interfejsu
                    </span>
                  </div>
                  <div className="grid grid-cols-[0.36fr_0.64fr] gap-3 p-4">
                    <div className="space-y-2.5">
                      <div className="h-3 w-20 rounded-full bg-slate-900 dark:bg-white" />
                      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/10" />
                      <div className="h-2 w-4/5 rounded-full bg-slate-200 dark:bg-white/10" />
                      <div className="mt-4 h-7 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600" />
                    </div>
                    <div className="relative min-h-[104px] overflow-hidden rounded-xl border border-cyan-500/15 bg-slate-950 p-3.5">
                      <div className="absolute -right-8 -top-10 size-28 rounded-full bg-violet-500/30" />
                      <div className="absolute -bottom-10 left-6 size-24 rounded-full bg-cyan-400/25" />
                      <div className="relative grid h-full grid-cols-2 gap-2">
                        <div className="rounded-lg border border-white/10 bg-white/[0.06]" />
                        <div className="space-y-2">
                          <div className="h-1.5 rounded-full bg-cyan-300/70" />
                          <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
                          <div className="h-12 rounded-lg bg-white/[0.06]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t border-slate-200 px-5 py-2.5 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                    <Braces className="size-4 text-cyan-500" />
                    <span>Next.js 16 · React 19 · TypeScript</span>
                  </div>
                </motion.article>

                <motion.article
                  className="absolute inset-x-[9%] top-[38%] overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fafc] shadow-[0_28px_70px_-38px_rgba(15,23,42,0.65)] [backface-visibility:hidden] dark:border-white/10 dark:bg-[#0c111c] dark:shadow-[0_32px_80px_-34px_rgba(0,0,0,0.9)]"
                  style={{
                    x: staticTransform ?? logicX,
                    y: staticTransform ?? logicY,
                    z: 0,
                    rotateZ: staticTransform ?? logicRotate,
                    opacity: staticOpacity ?? logicOpacity,
                    willChange: "transform",
                  }}
                >
                  <div className="flex items-center justify-between border-b border-slate-200 px-5 py-2.5 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <Server className="size-4 text-violet-500" />
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        Logika aplikacji
                      </span>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      chronione
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-3">
                    {["/api", "auth", "actions"].map((item, index) => (
                      <div
                        key={item}
                        className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-white/[0.08] dark:bg-white/[0.035]"
                      >
                        <div
                          className={`mb-2 size-2 rounded-full ${
                            index === 0
                              ? "bg-cyan-400"
                              : index === 1
                                ? "bg-violet-400"
                                : "bg-emerald-400"
                          }`}
                        />
                        <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 border-t border-slate-200 px-5 py-2.5 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                    <ShieldCheck className="size-4 text-violet-500" />
                    <span>Walidacja · autoryzacja · rate limiting</span>
                  </div>
                </motion.article>

                <motion.article
                  className="absolute inset-x-[13%] top-[68%] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_28px_70px_-38px_rgba(15,23,42,0.65)] [backface-visibility:hidden] dark:border-white/10 dark:bg-[#090e17] dark:shadow-[0_32px_80px_-34px_rgba(0,0,0,0.9)]"
                  style={{
                    x: staticTransform ?? dataX,
                    y: staticTransform ?? dataY,
                    z: -36,
                    rotateZ: staticTransform ?? dataRotate,
                    opacity: staticOpacity ?? dataOpacity,
                    willChange: "transform",
                  }}
                >
                  <div className="flex items-center justify-between border-b border-slate-200 px-5 py-2 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <Database className="size-4 text-cyan-500" />
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        Dane i produkcja
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      online
                    </div>
                  </div>
                  <div className="space-y-2 p-3">
                    {[
                      ["Baza danych", "Turso / libSQL"],
                      ["Pliki", "Vercel Blob"],
                      ["Wdrożenie", "Vercel Edge"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-1 dark:border-white/[0.07]"
                      >
                        <span className="text-[11px] text-slate-500 dark:text-slate-500">
                          {label}
                        </span>
                        <span className="font-mono text-[10px] text-slate-700 dark:text-slate-300">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-emerald-500/25 bg-white/90 px-4 py-2 text-xs font-medium text-emerald-700 shadow-lg shadow-emerald-500/10 dark:bg-[#0b111b]/95 dark:text-emerald-300"
              style={{
                opacity: staticOpacity ?? statusOpacity,
                y: staticTransform ?? statusY,
              }}
            >
              <Check className="size-3.5" />
              <span>System gotowy do produkcji</span>
              <Gauge className="ml-1 size-3.5 text-cyan-500" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
