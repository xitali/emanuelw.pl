import PublicPageShell from "@/components/portfolio/PublicPageShell";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Code2, MapPin } from "lucide-react";
import { serializeJsonLd, SITE_URL } from "@/lib/seo";

const USEME_URL = "https://useme.com/pl/roles/contractor/emanuel-wloch%2C525723/";

export const metadata: Metadata = {
  title: "O mnie — Emanuel Włoch, Full-Stack Developer",
  description:
    "Poznaj Emanuela Włocha — full-stack developera z Jarosławia. Next.js, React, TypeScript, backend, bazy danych i wdrożenia produkcyjne.",
  alternates: { canonical: "/o-mnie" },
  openGraph: {
    title: "Emanuel Włoch — Full-Stack Developer z Jarosławia",
    description: "Projektuję i wdrażam strony, sklepy oraz aplikacje webowe od interfejsu po bezpieczny backend.",
    url: `${SITE_URL}/o-mnie`,
    type: "profile",
    images: [{ url: `${SITE_URL}/emanuel_wloch.jpg`, alt: "Emanuel Włoch" }],
  },
};

const expertise = [
  "Next.js, React i TypeScript",
  "backend, API oraz relacyjne bazy danych",
  "wydajność, dostępność i SEO techniczne",
  "bezpieczeństwo aplikacji i wdrożeń",
  "Vercel, automatyzacja i utrzymanie produkcji",
];

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/o-mnie#webpage`,
        url: `${SITE_URL}/o-mnie`,
        name: "O Emanuelu Włochu",
        inLanguage: "pl-PL",
        dateModified: "2026-07-31",
        mainEntity: { "@id": `${SITE_URL}/#emanuel-wloch` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#emanuel-wloch`,
        name: "Emanuel Włoch",
        url: `${SITE_URL}/o-mnie`,
        image: `${SITE_URL}/emanuel_wloch.jpg`,
        jobTitle: "Full-Stack Developer",
        description: "Full-stack developer z Jarosławia projektujący strony internetowe, sklepy i aplikacje webowe.",
        homeLocation: { "@type": "Place", name: "Jarosław, Podkarpackie, Polska" },
        knowsLanguage: ["pl", "en"],
        knowsAbout: expertise,
        sameAs: ["https://github.com/xitali", USEME_URL, "https://www.instagram.com/mrmun1o", "https://facebook.com/emanuel.wloch"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Strona główna", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "O mnie", item: `${SITE_URL}/o-mnie` },
        ],
      },
    ],
  };

  return (
    <PublicPageShell>
      <main id="main-content" className="portfolio-subpage">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
        <article>
          <header className="border-b border-[var(--p-border)] bg-[var(--p-surface)] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-44">
            <div className="mx-auto max-w-[1280px]">
              <nav aria-label="Okruszki" className="text-xs text-[var(--p-muted)]"><Link href="/" className="hover:text-[var(--p-accent)]">Strona główna</Link> / <span aria-current="page">O mnie</span></nav>
              <div className="mt-12 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-20">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--p-radius)] border border-[var(--p-border)] bg-[var(--p-surface)]">
                  <Image src="/emanuel_wloch.jpg" alt="Emanuel Włoch, full-stack developer z Jarosławia" fill priority sizes="(max-width: 1024px) 90vw, 420px" className="object-cover" />
                </div>
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--p-accent)]"><MapPin className="size-3.5" /> Jarosław / współpraca zdalna</p>
                  <h1 className="mt-5 text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.06em]">Emanuel Włoch</h1>
                  <p className="mt-6 text-xl font-medium text-[var(--p-muted)] sm:text-2xl">Full-Stack Developer</p>
                  <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--p-muted)] sm:text-lg">Projektuję i wdrażam cyfrowe produkty od pierwszej struktury interfejsu po bazę danych, bezpieczeństwo oraz produkcyjne uruchomienie. Rozwijam projekty webowe od 2019 roku i stawiam na rozwiązania, które da się mierzyć, utrzymać i dalej rozwijać.</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/#kontakt" className="portfolio-button">Omów projekt <ArrowRight className="size-4" /></Link>
                    <a href="https://github.com/xitali" target="_blank" rel="me noopener noreferrer" className="portfolio-button portfolio-button--secondary"><Code2 className="size-4" /> GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="approach-heading">
            <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--p-accent)] dark:text-[var(--p-accent)]">Sposób pracy</p><h2 id="approach-heading" className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Technologia ma rozwiązywać problem</h2><p className="mt-6 text-base leading-8 text-[var(--p-muted)] dark:text-[var(--p-muted)]">Zaczynam od celu użytkownika i ograniczeń projektu. Dopiero później dobieram architekturę, narzędzia i efekty wizualne. Dzięki temu strona nie jest jedynie efektowną wizytówką — ma jasną rolę biznesową i techniczne podstawy do rozwoju.</p></div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {expertise.map((item) => <li key={item} className="flex min-h-28 items-start gap-3 rounded-[var(--p-radius)] border border-[var(--p-border)] bg-[var(--p-surface)] p-5 text-sm leading-6 dark:border-[var(--p-border)] dark:bg-[var(--p-surface)]"><Check className="mt-0.5 size-4 shrink-0 text-[var(--p-accent)] dark:text-[var(--p-accent)]" /> {item}</li>)}
              </ul>
            </div>
          </section>

          <section className="border-y border-[var(--p-border)] bg-[var(--p-surface)] px-4 py-20 dark:border-[var(--p-border)] dark:bg-[var(--p-surface)] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1280px]"><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Sprawdź ofertę i dowody pracy</h2><div className="mt-9 grid gap-4 md:grid-cols-3">
              <Link href="/uslugi" className="group rounded-[var(--p-radius)] border border-[var(--p-border)] p-6 dark:border-[var(--p-border)]"><h3 className="font-semibold">Usługi</h3><p className="mt-3 text-sm leading-7 text-[var(--p-muted)] dark:text-[var(--p-muted)]">Pełny zakres stron, sklepów, aplikacji i wsparcia Next.js.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--p-accent)] dark:text-[var(--p-accent)]">Zobacz ofertę <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>
              <Link href="/#projekty" className="group rounded-[var(--p-radius)] border border-[var(--p-border)] p-6 dark:border-[var(--p-border)]"><h3 className="font-semibold">Case studies</h3><p className="mt-3 text-sm leading-7 text-[var(--p-muted)] dark:text-[var(--p-muted)]">Problemy, rozwiązania, technologie i efekty ukończonych projektów.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--p-accent)] dark:text-[var(--p-accent)]">Zobacz realizacje <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>
              <a href={USEME_URL} target="_blank" rel="me noopener noreferrer" className="group rounded-[var(--p-radius)] border border-[var(--p-border)] p-6 dark:border-[var(--p-border)]"><h3 className="font-semibold">Profil Useme</h3><p className="mt-3 text-sm leading-7 text-[var(--p-muted)] dark:text-[var(--p-muted)]">Zewnętrzny profil wykonawcy potwierdzający specjalizację i lokalizację.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--p-accent)] dark:text-[var(--p-accent)]">Otwórz profil <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></a>
            </div></div>
          </section>
        </article>
      </main>
    </PublicPageShell>
  );
}
