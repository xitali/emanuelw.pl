import PublicPageShell from "@/components/portfolio/PublicPageShell";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Globe2, MapPin, ShoppingCart } from "lucide-react";
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
    <PublicPageShell>
      <main id="main-content" className="portfolio-subpage">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />

        <header className="border-b border-[var(--p-border)] bg-[var(--p-surface)] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-44">
          <div className="mx-auto max-w-[1280px]">
            <nav aria-label="Okruszki" className="text-xs text-[var(--p-muted)]">
              <Link href="/" className="hover:text-[var(--p-accent)]">Strona główna</Link> / <span aria-current="page">Usługi</span>
            </nav>
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--p-accent)]">Pełna oferta</p>
                <h1 className="mt-5 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.055em]">Strony, sklepy i aplikacje webowe</h1>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-[var(--p-muted)] sm:text-lg">
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
                  <Link key={page.path} href={page.path} className="group min-h-72 rounded-[var(--p-radius)] border border-[var(--p-border)] bg-[var(--p-surface)] p-7 transition-transform hover:-translate-y-1 dark:border-[var(--p-border)] dark:bg-[var(--p-surface)] sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-[var(--p-radius)] bg-[var(--p-surface)] text-[var(--p-accent)] dark:bg-[var(--p-surface)] dark:text-[var(--p-accent)]"><Icon className="size-5" /></span>
                      <ArrowRight className="size-5 text-[var(--p-muted)] transition-transform group-hover:translate-x-1 dark:text-[var(--p-muted)]" />
                    </div>
                    <h2 className="mt-12 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{page.shortName}</h2>
                    <p className="mt-4 text-sm leading-7 text-[var(--p-muted)] dark:text-[var(--p-muted)]">{page.metaDescription}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--p-border)] bg-[var(--p-surface)] px-4 py-20 dark:border-[var(--p-border)] dark:bg-[var(--p-surface)] sm:px-6 lg:px-8" aria-labelledby="local-services">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--p-accent)] dark:text-[var(--p-accent)]"><MapPin className="size-3.5" /> Podkarpackie i współpraca zdalna</div>
            <h2 id="local-services" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Oferta lokalna</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--p-muted)] dark:text-[var(--p-muted)] sm:text-base">Działam z Jarosławia. Rzeszów jest obsługiwanym rynkiem, a projekty dla klientów z całej Polski realizuję również całkowicie zdalnie.</p>
            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {localPages.map((page) => (
                <Link key={page.path} href={page.path} className="group flex items-center justify-between gap-5 rounded-[var(--p-radius)] border border-[var(--p-border)] p-6 hover:border-[var(--p-border)] dark:border-[var(--p-border)] dark:hover:border-[var(--p-border)]">
                  <div><h3 className="font-semibold">{page.shortName}</h3><p className="mt-2 text-sm text-[var(--p-muted)] dark:text-[var(--p-muted)]">{page.lead}</p></div>
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px] rounded-[var(--p-radius)] bg-[var(--p-surface)] p-8 text-white sm:p-10 lg:flex lg:items-end lg:justify-between">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--p-accent)]">Nie wiesz, co wybrać?</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Opisz problem, a dobiorę zakres.</h2></div>
            <Link href="/#kontakt" className="portfolio-button mt-8 lg:mt-0">Przejdź do formularza <ArrowRight className="size-4" /></Link>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}
