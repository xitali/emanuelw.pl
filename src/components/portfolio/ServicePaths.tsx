"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { openContactForm } from "@/lib/contact-prefill";
import ProfessionalServicesSection from "@/components/ProfessionalServicesSection";

const paths = [
  { title: "Strona firmowa", goal: "Buduj zaufanie. Ułatw kontakt.", description: "Dla firm, które chcą czytelnie pokazać ofertę i pomóc klientowi podjąć decyzję.", scope: "Projekt graficzny, oferta, realizacje, formularz kontaktowy i przygotowanie pod wyszukiwarki.", href: "/tworzenie-stron-internetowych" },
  { title: "Sklep internetowy", goal: "Przeprowadź klienta do zakupu.", description: "Dla marek, które chcą sprzedawać online i sprawnie obsługiwać zamówienia.", scope: "Katalog, koszyk, płatności i zarządzanie zamówieniami — integracje dobieramy do Twojego procesu.", href: "/sklepy-internetowe" },
  { title: "Aplikacja dla firmy", goal: "Uprość codzienną pracę.", description: "Dla zespołów, które potrzebują rezerwacji, panelu klienta lub własnego narzędzia.", scope: "Projekt procesu, interfejs, konta użytkowników, baza danych i potrzebne integracje.", href: "/tworzenie-aplikacji-webowych" },
];

export default function ServicePaths({ services }: { services: Service[] }) {
  return <section id="uslugi" className="service-paths portfolio-container" aria-labelledby="paths-heading">
    <header className="portfolio-section-heading"><div><p className="portfolio-kicker">OFERTA DOPASOWANA DO CELU</p><h2 id="paths-heading">Czego potrzebuje<br /><span>Twoja firma?</span></h2></div><p>Najpierw cel i zakres.<br />Potem projekt, kod i wdrożenie.</p></header>
    <div className="service-path-grid">{paths.map((path, i) => <article key={path.href} className="service-path-card">
      <p className="portfolio-kicker">0{i + 1} / {path.title}</p><h3>{path.goal}</h3><p>{path.description}</p><p className="service-path-scope">{path.scope}</p>
      <button className="portfolio-button" onClick={() => openContactForm({ subject: path.title, message: `Interesuje mnie: ${path.title.toLowerCase()}.\nCel projektu: \nPlanowany termin: `, badge: "Wybrana usługa została wpisana do formularza." })}>Omów projekt <ArrowUpRight size={17} /></button>
      <Link className="portfolio-text-link" href={path.href}>Zakres i pytania <ArrowUpRight size={15} /></Link>
    </article>)}</div>
    <ol className="service-steps"><li><strong>01 / Rozmowa</strong><span>Poznaję firmę, odbiorców i cel.</span></li><li><strong>02 / Zakres i wycena</strong><span>Ustalamy elementy projektu i termin.</span></li><li><strong>03 / Realizacja</strong><span>Oceniasz projekt i kolejne etapy.</span></li><li><strong>04 / Przekazanie</strong><span>Testy, wdrożenie i omówienie obsługi.</span></li></ol>
    <details className="service-more"><summary>Pozostałe usługi i orientacyjna wycena <span aria-hidden="true">+</span></summary><ProfessionalServicesSection initialServices={services} sectionId="szczegoly-uslug" /></details>
  </section>;
}
