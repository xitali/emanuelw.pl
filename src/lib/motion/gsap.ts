import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Jedno miejsce rejestracji wtyczek GSAP (od 3.13 wszystkie wtyczki, w tym
 * SplitText, są darmowe i wchodzą w skład paczki `gsap`).
 */
let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Pasek adresu na telefonach zmienia wysokość podczas scrolla — bez tego animacje „skaczą”.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

/** Wspólne krzywe — te same wartości używa premium.css (--ease-*). */
export const ease = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
} as const;

export { gsap, ScrollTrigger, SplitText };
