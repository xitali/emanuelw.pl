import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SceneState } from "./layers";

export function createScrollTimeline(section: HTMLElement, state: SceneState, compact = false, onPhase: (phase: number) => void = () => {}) {
  gsap.registerPlugin(ScrollTrigger);
  let lastPhase = -1;
  const context = gsap.context(() => {
    gsap.to(state, {
      progress: 1, duration: compact ? 2.8 : 1, ease: "none",
      scrollTrigger: compact
        ? { trigger: section, start: "top 70%", once: true }
        : { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.25, invalidateOnRefresh: true },
      onUpdate: () => {
        const phase = Math.min(3, Math.floor(state.progress * 4));
        if (phase !== lastPhase) { onPhase(phase); lastPhase = phase; }
        state.invalidate();
      },
    });
  }, section);
  return () => context.revert();
}
