import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SceneState } from "./layers";

export function createScrollTimeline(section: HTMLElement, state: SceneState) {
  gsap.registerPlugin(ScrollTrigger);
  const context = gsap.context(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.3, invalidateOnRefresh: true },
      onUpdate: () => {
        section.style.setProperty("--story-progress", String(state.progress));
        state.invalidate();
      },
    });
    timeline.to(state, { progress: 1, duration: 1 }, 0)
      .to(state, { zoom: 1, turn: 1, duration: 0.18, ease: "power1.inOut" }, 0.1)
      .to(state, { explosion: 1, duration: 0.32, ease: "power2.inOut" }, 0.25)
      .to(state, { turn: 1.5, duration: 0.2 }, 0.57)
      .to(state, { explosion: 0, duration: 0.17, ease: "power2.inOut" }, 0.76)
      .to(state, { retreat: 1, duration: 0.1, ease: "power1.inOut" }, 0.9)
      .to(".product-hero-copy", { autoAlpha: 0, y: -45, duration: 0.12 }, 0.12)
      .fromTo(".product-story-copy", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.25)
      .to(".product-story-copy", { autoAlpha: 0, y: -20, duration: 0.08 }, 0.81)
      .to(".product-annotation", { autoAlpha: 0, duration: 0.1 }, 0.2)
      .fromTo(".product-finale", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.91);
  }, section);
  return () => context.revert();
}
