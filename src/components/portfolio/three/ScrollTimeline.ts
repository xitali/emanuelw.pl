import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SceneState } from "./layers";

export function createScrollTimeline(section: HTMLElement, state: SceneState, compact = false, onPhase: (phase: number) => void = () => {}) {
  gsap.registerPlugin(ScrollTrigger);
  let lastPhase = -1;
  const publish = (progress: number) => {
    state.progress = Math.max(0, Math.min(1, progress));
    const phase = Math.min(3, Math.floor(state.progress * 4));
    if (phase !== lastPhase) { onPhase(phase); lastPhase = phase; }
    state.invalidate();
  };
  const context = gsap.context(() => {
    if (compact) {
      gsap.to(state, {
        progress: 1, duration: 2.8, ease: "power1.inOut",
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
        onUpdate: () => publish(state.progress),
      });
    } else {
      // Use one scroll source for the HTML stage and 3D pose, including history restoration.
      const trigger = ScrollTrigger.create({
        trigger: section, start: "top top", end: "bottom bottom", invalidateOnRefresh: true,
        onUpdate: self => publish(self.progress),
        onRefresh: self => publish(self.progress),
      });
      publish(trigger.progress);
    }
  }, section);
  return () => context.revert();
}
