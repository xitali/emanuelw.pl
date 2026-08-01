import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Code2, MapPin } from "lucide-react";
import Footer from "@/components/Footer";
import ProfessionalNavbar from "@/components/ProfessionalNavbar";
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
    <>
      <ProfessionalNavbar />
      <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#05070c] dark:text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
        <article>
          <header className="border-b border-white/10 bg-[#05070c] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-44">
            <div className="mx-auto max-w-[1280px]">
              <nav aria-label="Okruszki" className="text-xs text-white/48"><Link href="/" className="hover:text-cyan-200">Strona główna</Link> / <span aria-current="page">O mnie</span></nav>
              <div className="mt-12 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-20">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04]">
                  <Image src="/emanuel_wloch.jpg" alt="Emanuel Włoch, full-stack developer z Jarosławia" fill priority sizes="(max-width: 1024px) 90vw, 420px" className="object-cover" />
                </div>
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70"><MapPin className="size-3.5" /> Jarosław / współpraca zdalna</p>
                  <h1 className="mt-5 text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.06em]">Emanuel Włoch</h1>
                  <p className="mt-6 text-xl font-medium text-white/82 sm:text-2xl">Full-Stack Developer</p>
                  <p className="mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">Projektuję i wdrażam cyfrowe produkty od pierwszej struktury interfejsu po bazę danych, bezpieczeństwo oraz produkcyjne uruchomienie. Rozwijam projekty webowe od 2019 roku i stawiam na rozwiązania, które da się mierzyć, utrzymać i dalej rozwijać.</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/#kontakt" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black">Omów projekt <ArrowRight className="size-4" /></Link>
                    <a href="https://github.com/xitali" target="_blank" rel="me noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white/82 hover:border-cyan-300/60"><Code2 className="size-4" /> GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="approach-heading">
            <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70">Sposób pracy</p><h2 id="approach-heading" className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Technologia ma rozwiązywać problem</h2><p className="mt-6 text-base leading-8 text-slate-600 dark:text-white/54">Zaczynam od celu użytkownika i ograniczeń projektu. Dopiero później dobieram architekturę, narzędzia i efekty wizualne. Dzięki temu strona nie jest jedynie efektowną wizytówką — ma jasną rolę biznesową i techniczne podstawy do rozwoju.</p></div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {expertise.map((item) => <li key={item} className="flex min-h-28 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 dark:border-white/10 dark:bg-white/[0.03]"><Check className="mt-0.5 size-4 shrink-0 text-emerald-500 dark:text-emerald-300" /> {item}</li>)}
              </ul>
            </div>
          </section>

          <section className="border-y border-slate-200 bg-white px-4 py-20 dark:border-white/10 dark:bg-[#080b12] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1280px]"><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Sprawdź ofertę i dowody pracy</h2><div className="mt-9 grid gap-4 md:grid-cols-3">
              <Link href="/uslugi" className="group rounded-2xl border border-slate-200 p-6 dark:border-white/10"><h3 className="font-semibold">Usługi</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/50">Pełny zakres stron, sklepów, aplikacji i wsparcia Next.js.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Zobacz ofertę <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>
              <Link href="/#projekty" className="group rounded-2xl border border-slate-200 p-6 dark:border-white/10"><h3 className="font-semibold">Case studies</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/50">Problemy, rozwiązania, technologie i efekty ukończonych projektów.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Zobacz realizacje <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>
              <a href={USEME_URL} target="_blank" rel="me noopener noreferrer" className="group rounded-2xl border border-slate-200 p-6 dark:border-white/10"><h3 className="font-semibold">Profil Useme</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/50">Zewnętrzny profil wykonawcy potwierdzający specjalizację i lokalizację.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Otwórz profil <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></a>
            </div></div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
