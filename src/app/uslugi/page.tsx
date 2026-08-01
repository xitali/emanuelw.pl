import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Globe2, MapPin, ShoppingCart } from "lucide-react";
import Footer from "@/components/Footer";
import ProfessionalNavbar from "@/components/ProfessionalNavbar";
import { serializeJsonLd, SITE_URL } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Usługi web development — strony, sklepy i aplikacje",
  description:
    "Strony internetowe, sklepy, aplikacje webowe i rozwój projektów Next.js. Poznaj zakres, proces, orientacyjne ceny oraz odpowiedzi na pytania.",
  alternates: { canonical: "/uslugi" },
  openGraph: {
    title: "Usługi web development — Emanuel Włoch",
    description:
      "Projektowanie i wdrażanie stron, sklepów oraz aplikacji webowych od interfejsu po produkcję.",
    url: `${SITE_URL}/uslugi`,
    type: "website",
  },
};

const primaryPages = servicePages.filter(
  (page) => !page.slug.endsWith("jaroslaw") && !page.slug.endsWith("rzeszow"),
);
const localPages = servicePages.filter(
  (page) => page.slug.endsWith("jaroslaw") || page.slug.endsWith("rzeszow"),
);
const icons = [Globe2, Code2, ShoppingCart, Code2] as const;

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/uslugi#webpage`,
        url: `${SITE_URL}/uslugi`,
        name: "Usługi web development Emanuela Włocha",
        description: metadata.description,
        inLanguage: "pl-PL",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        author: { "@id": `${SITE_URL}/#emanuel-wloch` },
      },
      {
        "@type": "ItemList",
        itemListElement: servicePages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.shortName,
          url: `${SITE_URL}${page.path}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Strona główna", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Usługi", item: `${SITE_URL}/uslugi` },
        ],
      },
    ],
  };

  return (
    <>
      <ProfessionalNavbar />
      <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#05070c] dark:text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />

        <header className="border-b border-white/10 bg-[#05070c] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-44">
          <div className="mx-auto max-w-[1280px]">
            <nav aria-label="Okruszki" className="text-xs text-white/48">
              <Link href="/" className="hover:text-cyan-200">Strona główna</Link> / <span aria-current="page">Usługi</span>
            </nav>
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">Pełna oferta</p>
                <h1 className="mt-5 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.055em]">Strony, sklepy i aplikacje webowe</h1>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-white/62 sm:text-lg">
                Wybierz usługę zgodną z celem projektu. Na każdej stronie znajdziesz konkretny zakres, przebieg współpracy, orientacyjne ceny i odpowiedzi na realne pytania klientów.
              </p>
            </div>
          </div>
        </header>

        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="core-services">
          <div className="mx-auto max-w-[1280px]">
            <h2 id="core-services" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Główne specjalizacje</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {primaryPages.map((page, index) => {
                const Icon = icons[index] ?? Code2;
                return (
                  <Link key={page.path} href={page.path} className="group min-h-72 rounded-[1.75rem] border border-slate-200 bg-white p-7 transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300"><Icon className="size-5" /></span>
                      <ArrowRight className="size-5 text-slate-400 transition-transform group-hover:translate-x-1 dark:text-white/30" />
                    </div>
                    <h2 className="mt-12 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{page.shortName}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/52">{page.metaDescription}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-20 dark:border-white/10 dark:bg-[#080b12] sm:px-6 lg:px-8" aria-labelledby="local-services">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70"><MapPin className="size-3.5" /> Podkarpackie i współpraca zdalna</div>
            <h2 id="local-services" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Oferta lokalna</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 dark:text-white/52 sm:text-base">Działam z Jarosławia. Rzeszów jest obsługiwanym rynkiem, a projekty dla klientów z całej Polski realizuję również całkowicie zdalnie.</p>
            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {localPages.map((page) => (
                <Link key={page.path} href={page.path} className="group flex items-center justify-between gap-5 rounded-2xl border border-slate-200 p-6 hover:border-cyan-400 dark:border-white/10 dark:hover:border-cyan-300/35">
                  <div><h3 className="font-semibold">{page.shortName}</h3><p className="mt-2 text-sm text-slate-600 dark:text-white/48">{page.lead}</p></div>
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px] rounded-[2rem] bg-[#070910] p-8 text-white sm:p-10 lg:flex lg:items-end lg:justify-between">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/65">Nie wiesz, co wybrać?</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Opisz problem, a dobiorę zakres.</h2></div>
            <Link href="/#kontakt" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black lg:mt-0">Przejdź do formularza <ArrowRight className="size-4" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
