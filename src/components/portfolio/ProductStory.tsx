"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import StageVisuals from "./StageVisuals";
import { IconArrowDown, IconArrowUpRight, layerIcons } from "./icons";
import { createSceneState, productLayers } from "./three/layers";
import { createScrollTimeline } from "./three/ScrollTimeline";
import type { Testimonial } from "@/types";
import { useMotionPaused } from "@/lib/motion/preference";

export const deliveryStages = [
  { title: "Cel", description: "Co chcesz osiągnąć i jak ma Ci w tym pomóc strona?", detail: "Twój pomysł i potrzeby" },
  { title: "Projekt", description: "Razem omówimy wygląd i rozrysujemy Twoją stronę.", detail: "Tak będzie wyglądała Twoja strona" },
  { title: "Realizacja", description: "Sprawdzisz stronę na komputerze, tablecie i telefonie.", detail: "Sprawdź, jak to działa" },
  { title: "Wdrożenie", description: "Uruchomię Twoją stronę i pokażę Ci, jak ją obsługiwać.", detail: "Twoja strona jest gotowa" },
];
export default function ProductStory({ testimonial }: { testimonial?: Testimonial }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [state] = useState(createSceneState);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [compact, setCompact] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useMotionPaused();
  useEffect(() => {
    const mobile = matchMedia("(max-width: 1023px)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup: (() => void) | undefined;
    let frame = 0;
    const setup = () => {
      cleanup?.(); cancelAnimationFrame(frame);
      const reduce = motion.matches || paused;
      setCompact(mobile.matches); setReduced(reduce);
      Object.assign(state, { progress: reduce ? 1 : 0, explosion: 0, turn: 0, zoom: 0, retreat: 0 });
      setPhase(reduce ? 3 : 0);
      frame = requestAnimationFrame(() => {
        if (section.current && !reduce && !mobile.matches) cleanup = createScrollTimeline(section.current, state, false, setPhase);
        state.invalidate();
      });
    };
    setup();
    mobile.addEventListener("change", setup); motion.addEventListener("change", setup);
    const observer = new IntersectionObserver(([entry]) => { setActive(entry.isIntersecting && !document.hidden); if (entry.isIntersecting) setReady(true); }, { rootMargin: "100px" });
    if (stage.current) observer.observe(stage.current);
    const visibility = () => {
      const bounds = stage.current?.getBoundingClientRect();
      setActive(!document.hidden && Boolean(bounds && bounds.bottom > 0 && bounds.top < innerHeight));
    };
    document.addEventListener("visibilitychange", visibility);
    return () => { cancelAnimationFrame(frame); cleanup?.(); observer.disconnect(); mobile.removeEventListener("change", setup); motion.removeEventListener("change", setup); document.removeEventListener("visibilitychange", visibility); };
  }, [state, paused]);
  const selectPhase = (index: number) => {
    if (compact || reduced) {
      state.seek((index + 0.5) / 4);
      setPhase(index);
    } else if (section.current) {
      const bounds = section.current.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + bounds.top + Math.max(0, bounds.height - innerHeight) * (index + 0.5) / 4, behavior: "smooth" });
    }
  };
  return <section ref={section} className={`product-story offer-story${reduced ? " is-reduced" : ""}`} aria-label="Od celu do działającej strony">
    <div ref={stage} className="product-stage">
      <div className="product-stage-grid" aria-hidden="true" />
      <div className="hero-portrait-background" aria-hidden="true">
        <Image src="/emanuel_wloch.jpg" alt="" fill loading="eager" sizes="(max-width: 1023px) 100vw, 50vw" className="hero-portrait-image" />
      </div>
      <div className="product-hero-copy">
        <p className="portfolio-kicker"><span className="status-dot" /> STRONY DLA FIRM / JAROSŁAW I CAŁA POLSKA</p>
        <h1>Strona, która jasno<br />pokazuje ofertę<br /><span>i ułatwia kontakt.</span></h1>
        <p className="product-intro">Potrzebujesz strony dla swojej firmy?<br />Pomogę Ci pokazać ofertę i ułatwić klientom kontakt.<br />Sklep lub aplikacja? Dopasuję je do Twojej firmy.</p>
        <div className="portfolio-actions"><a className="portfolio-button" href="#kontakt">Omów projekt <IconArrowUpRight size={18} /></a><a className="portfolio-text-link" href="#projekty">Zobacz realizacje <IconArrowUpRight size={16} /></a></div>
        <p className="hero-scope-note">Wiesz, co dostaniesz i za ile. Rozmawiasz bezpośrednio ze mną.</p>
        {testimonial && <figure className="hero-proof"><blockquote>„{testimonial.content.split(/(?<=[.!?])\s/)[0]}”</blockquote><figcaption>{testimonial.client_name}{testimonial.company ? ` · ${testimonial.company}` : ""}<a href="#opinie">Przeczytaj opinie <IconArrowUpRight size={13} /></a></figcaption></figure>}
      </div>
      <div className="product-visual">

        <StageVisuals phase={phase} state={state} active={active} compact={compact} reduced={reduced} ready={ready} />
        <div className="delivery-caption"><span>0{phase + 1} / OD POMYSŁU DO PUBLIKACJI</span><strong>{deliveryStages[phase].title}</strong><small>{deliveryStages[phase].detail}</small></div>
        <div className="hero-scene-tabs" aria-label="Wybierz etap">{deliveryStages.map((step,index) => <button key={step.title} type="button" aria-pressed={phase===index} onClick={()=>selectPhase(index)}>{step.title}</button>)}</div>
      </div>
      <ol className="delivery-stages" aria-label="Etapy powstawania strony">{deliveryStages.map((step, index) => <li key={step.title} className={phase === index ? "is-current" : ""} aria-current={phase === index ? "step" : undefined}><button type="button" className="delivery-stage-trigger" aria-label={`Pokaż etap: ${step.title}`} aria-pressed={phase===index} onClick={()=>selectPhase(index)}><span>0{index + 1}</span><div><strong>{step.title}</strong><p>{step.description}</p></div></button></li>)}</ol>
      <div className="product-stage-footer"><a href="#uslugi"><IconArrowDown size={15} /><span>POZNAJ MOJĄ OFERTĘ</span></a><span className="product-footer-note">CEL → PROJEKT → REALIZACJA → WDROŻENIE</span><button className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Włącz animacje" : "Ogranicz ruch"}</button></div>
    </div>
  </section>;
}
export function TechnologyDetails() {
  return <section id="technologie" className="portfolio-stack" aria-labelledby="stack-heading">
    <div><p className="portfolio-kicker">WARSZTAT</p><h2 id="stack-heading">Technologia wspiera<br /><span>Twój cel.</span></h2><p>Nie musisz wybierać technologii.<br />Dobiorę ją do tego, co ma robić Twoja strona lub aplikacja.</p></div>
    <div className="stack-details">{productLayers.map((layer, i) => { const LayerIcon = layerIcons[layer.id as keyof typeof layerIcons]; return <details key={layer.id} open={i === 0}><summary><span>0{i + 1}</span><LayerIcon size={20} />{layer.label}<span className="detail-plus">+</span></summary><p>{layer.description}</p><div className="portfolio-tags">{layer.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></details>; })}</div>
  </section>;
}
