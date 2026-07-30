"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Code2, Gauge, Rocket, ShieldCheck } from "lucide-react";

const stages = [
  { label: "Kierunek", icon: Gauge },
  { label: "Projekt i kod", icon: Code2 },
  { label: "Testy", icon: ShieldCheck },
  { label: "Publikacja", icon: Rocket },
] as const;

export default function ServicesArtwork() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <div
      role="img"
      aria-label="Wizualizacja procesu realizacji projektu od ustalenia kierunku do publikacji"
      className="absolute inset-0 overflow-hidden"
    >
      <MeshGradient
        aria-hidden="true"
        colors={["#04111b", "#0f6c75", "#51239c", "#080b12", "#00b8d9"]}
        distortion={0.62}
        swirl={0.48}
        grainMixer={0.16}
        grainOverlay={0.08}
        speed={shouldReduceMotion ? 0 : 0.1}
        frame={5200}
        fit="cover"
        scale={1.1}
        width="100%"
        height="100%"
        minPixelRatio={1}
        maxPixelCount={1280 * 900}
        className="absolute inset-0 size-full opacity-85"
      />

      <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(3,7,18,.08),rgba(3,7,18,.72)_60%,#030712)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,.18),transparent_24%)]" />

      <motion.div
        className="absolute inset-x-[9%] top-[19%] rounded-[1.6rem] border border-white/15 bg-black/25 p-4 shadow-2xl backdrop-blur-xl sm:p-5"
        animate={
          shouldReduceMotion
            ? undefined
            : { y: [0, -7, 0], rotateZ: [-0.35, 0.25, -0.35] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/52">
          <span>Proces realizacji</span>
          <span className="flex items-center gap-2 text-emerald-200/85">
            <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.9)]" />
            Sprawdzony
          </span>
        </div>

        <div className="mt-2">
          {stages.map(({ label, icon: Icon }, index) => (
            <div
              key={label}
              className="flex items-center gap-3 border-b border-white/8 py-3 last:border-0"
            >
              <span className="font-mono text-[9px] text-white/32">
                0{index + 1}
              </span>
              <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/[0.055]">
                <Icon className="size-3.5 text-cyan-200" />
              </span>
              <span className="text-xs font-medium text-white/82">
                {label}
              </span>
              <Check className="ml-auto size-3.5 text-emerald-300/90" />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[7%] right-[7%] rounded-full border border-white/14 bg-black/28 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/72 backdrop-blur-xl"
        animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        Design + development
      </motion.div>
    </div>
  );
}
