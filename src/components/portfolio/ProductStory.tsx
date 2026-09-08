"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { createSceneState, productLayers } from "./three/layers";
import { createScrollTimeline } from "./three/ScrollTimeline";
import StaticProduct from "./three/StaticProduct";
import type { Testimonial } from "@/types";

const Scene = dynamic(() => import("./three/ExplodedScene"), { ssr: false, loading: () => <StaticProduct /> });

export default function ProductStory({ testimonial }: { testimonial?: Testimonial }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [state] = useState(createSceneState);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [compact, setCompact] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const mobile = matchMedia("(max-width: 1023px)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup: (() => void) | undefined;
    let frame = 0;
    const setup = () => {
      cleanup?.();
      cancelAnimationFrame(frame);
      const reduce = motion.matches || paused;
      setCompact(mobile.matches); setReduced(reduce);
      Object.assign(state, { progress: 0, explosion: reduce ? 0.65 : 0, turn: 0, zoom: 0, retreat: 0 });
      // Measure only after React commits the compact/reduced layout.
      frame = requestAnimationFrame(() => {
        if (section.current && !reduce) cleanup = createScrollTimeline(section.current, state);
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
  return <>
    <section ref={section} className={`product-story${reduced ? " is-reduced" : ""}`} aria-label="Od pomysłu do kompletnego produktu">
      <div ref={stage} className="product-stage">
        <div className="product-stage-grid" aria-hidden="true" />
        <div className="product-hero-copy">
          <p className="portfolio-kicker"><span className="status-dot" /> STRONY I APLIKACJE / JAROSŁAW, PL</p>
          <h1>Buduj zaufanie.<br /><span>Rozwijaj firmę.</span></h1>
          <p className="product-intro">Projektuję strony, sklepy i aplikacje dla firm.<br className="desktop-break" /> Pomagam pokazać ofertę, ułatwić zakup<br className="desktop-break" /> i usprawnić codzienną pracę.</p>
          <div className="portfolio-actions"><a className="portfolio-button" href="#kontakt">Omów projekt <ArrowUpRight size={18} /></a><a className="portfolio-text-link" href="#projekty">Zobacz realizacje <ArrowUpRight size={16} /></a></div>
          {testimonial && <figure className="hero-proof"><blockquote>„{testimonial.content.split(/(?<=[.!?])\s/)[0]}”</blockquote><figcaption>{testimonial.client_name}{testimonial.company ? ` · ${testimonial.company}` : ""}<a href="#opinie">Przeczytaj opinie <ArrowUpRight size={13} /></a></figcaption></figure>}
        </div>
        <div className="product-visual" aria-hidden="true">
          <div className="product-orbit" /><div className="product-orbit orbit-two" />
          <div className="product-canvas">{ready ? <Scene state={state} active={active} compact={compact} reduced={reduced} /> : <StaticProduct />}</div>
          <span className="product-annotation">EW — PRODUKT CYFROWY<br /><small>PROJEKTOWANIE I TECHNOLOGIA</small></span>
          <span className="product-crosshair">+</span>
        </div>
        <div className="product-story-copy">
          <p className="portfolio-kicker">POD POWIERZCHNIĄ / 01—07</p>
          <h2>Każda warstwa.<br /><span>Ma znaczenie.</span></h2>
          <p>To, co widzisz, to dopiero początek.<br />Za interfejsem stoi cały system.</p>
          <ol>{productLayers.map((layer, index) => <li key={layer.id}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{layer.label}</strong><small>{layer.technologies.join(" · ")}</small></div></li>)}</ol>
        </div>
        <div className="product-finale"><p className="portfolio-kicker">WSZYSTKO DZIAŁA RAZEM</p><h2>Od warstw<br />do rezultatów.</h2><a href="#projekty" className="portfolio-text-link">Zobacz, co z tego powstaje <ArrowDownRight /></a></div>
        <div className="product-stage-footer"><a href="#technologie"><ArrowDown size={15} /><span>PRZEWIŃ. ZAJRZYJ GŁĘBIEJ.</span></a><span className="product-footer-note">PROJEKT → KOD → WDROŻENIE</span><button className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Włącz animacje" : "Ogranicz ruch"}</button><span className="story-meter" aria-hidden="true"><i /></span></div>
      </div>
    </section>
  </>;
}

export function TechnologyDetails() {
  return <section id="technologie" className="portfolio-stack portfolio-container" aria-labelledby="stack-heading">
      <div><p className="portfolio-kicker">02 / WARSZTAT</p><h2 id="stack-heading">Spójność.<br /><span>Na każdym poziomie.</span></h2><p>Dobieram narzędzia do potrzeb produktu.<br />Od doświadczenia użytkownika po wdrożenie.</p></div>
      <div className="stack-details">{productLayers.map((layer, i) => <details key={layer.id} open={i === 0}><summary><span>0{i + 1}</span>{layer.label}<span className="detail-plus">+</span></summary><p>{layer.description}</p><div className="portfolio-tags">{layer.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></details>)}</div>
    </section>;
}
