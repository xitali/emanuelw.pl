import { productLayers } from "./three/layers";

/** Pas technologii — dane z `layers.ts`, więc zawsze zgodny z sekcją „Warsztat”. Treść zdublowana dla pętli bez szwu. */
const items = Array.from(new Set(productLayers.flatMap(layer => layer.technologies)));

export default function TechMarquee() {
  return <div className="tech-marquee" role="region" aria-label="Technologie, których używam" data-reveal>
    <div className="tech-marquee-track">
      <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
      <ul aria-hidden="true">{items.map(item => <li key={item}>{item}</li>)}</ul>
    </div>
  </div>;
}
