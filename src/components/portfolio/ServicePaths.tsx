"use client";

import Link from "next/link";
import { IconApp, IconArrowUpRight as ArrowUpRight, IconCart, IconSite } from "./icons";
import type { Service } from "@/types";
import { openContactForm } from "@/lib/contact-prefill";
import ProfessionalServicesSection from "@/components/ProfessionalServicesSection";

const paths = [
  { title: "Strona firmowa", goal: "Buduj zaufanie. Ułatw kontakt.", description: "Chcesz, żeby klient od razu wiedział, czym się zajmujesz i dlaczego warto do Ciebie napisać?", scope: "Dostaniesz stronę z Twoją ofertą, realizacjami i wygodnym kontaktem. Dopasuję ją do telefonu i przygotuję do obecności w Google.", href: "/tworzenie-stron-internetowych", Icon: IconSite },
  { title: "Sklep internetowy", goal: "Przeprowadź klienta do zakupu.", description: "Chcesz sprzedawać w internecie i mieć zamówienia pod kontrolą?", scope: "Otrzymasz katalog produktów, koszyk i panel zamówień. Wspólnie wybierzemy płatności i dostawę odpowiednie dla Twojego sklepu.", href: "/sklepy-internetowe", Icon: IconCart },
  { title: "Aplikacja dla firmy", goal: "Uprość codzienną pracę.", description: "Tracisz czas na arkusze, ręczne rezerwacje lub przekazywanie danych między pracownikami?", scope: "Stworzę dla Ciebie narzędzie do konkretnych zadań: rezerwacji, obsługi klientów lub pracy zespołu. Wybierzemy funkcje, których potrzebujesz.", href: "/tworzenie-aplikacji-webowych", Icon: IconApp },
];

export default function ServicePaths({ services }: { services: Service[] }) {
  return <section id="uslugi" className="service-paths portfolio-container" aria-labelledby="paths-heading">
    <header className="portfolio-section-heading"><div><p className="portfolio-kicker">OFERTA DOPASOWANA DO CELU</p><h2 id="paths-heading">Pokaż ofertę.<br />{" "}<span>Ułatw kolejny krok.</span></h2></div><p>Powiedz, czego potrzebujesz.<br />{" "}Pomogę Ci wybrać odpowiednie rozwiązanie.</p></header>
    <div className="service-path-grid" data-stagger>{paths.map((path, i) => <article key={path.href} className={`service-path-card${i === 0 ? " service-path-card--primary" : ""}`} data-spotlight>
      <span className="ew-icon-badge"><path.Icon /></span><p className="portfolio-kicker">0{i + 1} / {path.title}</p><h3>{path.goal}</h3><p>{path.description}</p><p className="service-path-scope">{path.scope}</p>
      <button className="portfolio-button" onClick={() => openContactForm({ subject: path.title, message: `Interesuje mnie: ${path.title.toLowerCase()}.\nCel projektu: \nPlanowany termin: `, badge: "Wybrana usługa została wpisana do formularza." })}>Omów projekt <ArrowUpRight size={17} /></button>
      <Link className="portfolio-text-link" href={path.href}>Zakres i pytania <ArrowUpRight size={15} /></Link>
    </article>)}</div>
    <p className="service-price-note">Wszystkie podane ceny i orientacyjne wyceny są cenami netto. Przed rozpoczęciem dostaniesz zakres prac i dokładną wycenę.</p>
    <details className="service-more"><summary>Pozostałe usługi i orientacyjna wycena <span aria-hidden="true">+</span></summary><ProfessionalServicesSection initialServices={services} sectionId="szczegoly-uslug" /></details>
  </section>;
}
