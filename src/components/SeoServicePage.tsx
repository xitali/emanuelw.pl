import PublicPageShell from "@/components/portfolio/PublicPageShell";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ServicePageData } from "@/lib/service-pages";
import { serializeJsonLd, SITE_URL } from "@/lib/seo";

const featuredCaseStudies = [
  {
    href: "/projekty/vip-transfery-platforma-premium-transport-solutions-09e837ed-2206-49b7-9b81-21c6222a18f5",
    title: "VIP Transfery",
    description: "Next.js, SEO lokalne i prezentacja usług premium.",
  },
  {
    href: "/projekty/rzeszow-tatuaz-iluminatia-tattoo-5fa80c09-f256-4dc9-a94e-6a08ae809345",
    title: "Iluminatia Tattoo",
    description: "Strona lokalnego studia, galeria i mierzenie kontaktów.",
  },
  {
    href: "/projekty/dmuchance-afryka-strona-wynajmu-dmuchancow-3bc5ed9c-c7c8-4532-adec-326f78389f0e",
    title: "Dmuchańce Afryka",
    description: "Aplikacja z panelem, galerią i zarządzaniem wydarzeniami.",
  },
] as const;

const benefitIcons = [Search, ShieldCheck, Code2, Clock3] as const;

export function createServiceMetadata(data: ServicePageData): Metadata {
  const url = `${SITE_URL}${data.path}`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: data.path },
    openGraph: {
      title: `${data.metaTitle} | Emanuel Włoch`,
      description: data.metaDescription,
      url,
      siteName: "Emanuel Włoch — strony i aplikacje",
      locale: "pl_PL",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${data.shortName} — Emanuel Włoch`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.metaTitle} | Emanuel Włoch`,
      description: data.metaDescription,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

function createStructuredData(data: ServicePageData) {
  const pageUrl = `${SITE_URL}${data.path}`;
  const pageId = `${pageUrl}#webpage`;
  const serviceId = `${pageUrl}#service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url: pageUrl,
        name: data.metaTitle,
        description: data.metaDescription,
        inLanguage: "pl-PL",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": serviceId },
        author: { "@id": `${SITE_URL}/#emanuel-wloch` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: data.shortName,
        serviceType: data.serviceType,
        description: data.directAnswer,
        url: pageUrl,
        areaServed: data.areas,
        provider: {
          "@type": "Person",
          "@id": `${SITE_URL}/#emanuel-wloch`,
          name: "Emanuel Włoch",
          url: SITE_URL,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: data.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Usługi",
            item: `${SITE_URL}/uslugi`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: data.shortName,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function SeoServicePage({ data }: { data: ServicePageData }) {
  const structuredData = createStructuredData(data);

  return (
    <PublicPageShell>
      <main id="main-content" className="portfolio-subpage">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />

        <article>
          <header className="relative overflow-hidden border-b border-[var(--p-border)] bg-[var(--p-surface)] px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
                backgroundSize: "76px 76px",
                maskImage: "radial-gradient(circle at 72% 38%, black, transparent 72%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -right-36 top-20 size-[34rem] rounded-[var(--p-radius)] bg-[var(--p-surface)] blur-[150px]"
            />

            <div className="relative mx-auto max-w-[1280px]">
              <nav aria-label="Okruszki" className="text-xs text-[var(--p-muted)]">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="hover:text-[var(--p-accent)]">Strona główna</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/uslugi" className="hover:text-[var(--p-accent)]">Usługi</Link></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-[var(--p-muted)]">{data.shortName}</li>
                </ol>
              </nav>

              <div className="mt-12 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-20">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--p-accent)] sm:text-xs">
                    {data.eyebrow}
                  </p>
                  <h1 className="mt-5 max-w-4xl text-[clamp(2.8rem,5.4vw,5.7rem)] font-medium leading-[0.92] tracking-[-0.055em]">
                    {data.title}
                  </h1>
                  <p className="mt-7 max-w-3xl text-base leading-relaxed text-[var(--p-muted)] sm:text-lg">
                    {data.lead}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/#kontakt"
                      className="portfolio-button"
                    >
                      Omów projekt <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      href="/#projekty"
                      className="portfolio-button portfolio-button--secondary"
                    >
                      Zobacz realizacje
                    </Link>
                  </div>
                </div>

                <aside className="rounded-[var(--p-radius)] border border-[var(--p-border)] bg-[var(--p-surface)] p-6 backdrop-blur-xl sm:p-7">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--p-accent)]">
                    <Sparkles className="size-3.5" /> Krótka odpowiedź
                  </div>
                  <p className="mt-5 text-sm leading-7 text-[var(--p-muted)] sm:text-base">
                    {data.directAnswer}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {data.areas.map((area) => (
                      <span key={area} className="portfolio-tag">
                        <MapPin className="size-3 text-[var(--p-accent)]" /> {area}
                      </span>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </header>

          <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="benefits-heading">
            <div className="mx-auto max-w-[1280px]">
              <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--p-accent)] dark:text-[var(--p-accent)]">
                    Zakres i rezultat
                  </p>
                  <h2 id="benefits-heading" className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                    Co zyskujesz?
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-[var(--p-muted)] dark:text-[var(--p-muted)] sm:text-base">
                    Każdy element projektu ma wspierać konkretny cel użytkownika lub firmy.
                  </p>
                </div>
                <div className="grid gap-px overflow-hidden rounded-[var(--p-radius)] border border-[var(--p-border)] bg-[var(--p-surface)] dark:border-[var(--p-border)] dark:bg-[var(--p-surface)] sm:grid-cols-2">
                  {data.benefits.map((benefit, index) => {
                    const Icon = benefitIcons[index] ?? Sparkles;

                    return (
                    <section key={benefit.title} className="min-h-48 bg-[var(--p-surface)] p-6 dark:bg-[var(--p-surface)] sm:p-7">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[var(--p-muted)] dark:text-[var(--p-muted)]">0{index + 1}</span>
                        <Icon className="size-4 text-[var(--p-accent)] dark:text-[var(--p-accent)]" />
                      </div>
                      <h3 className="mt-7 text-lg font-semibold">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--p-muted)] dark:text-[var(--p-muted)]">{benefit.description}</p>
                    </section>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-[var(--p-border)] bg-[var(--p-surface)] px-4 py-20 dark:border-[var(--p-border)] dark:bg-[var(--p-surface)] sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-2 lg:gap-20">
              <section aria-labelledby="deliverables-heading">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--p-accent)] dark:text-[var(--p-accent)]">Elementy realizacji</p>
                <h2 id="deliverables-heading" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Co otrzymujesz</h2>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {data.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-[var(--p-radius)] border border-[var(--p-border)] bg-[var(--p-surface)] p-4 text-sm dark:border-[var(--p-border)] dark:bg-[var(--p-surface)]">
                      <Check className="mt-0.5 size-4 shrink-0 text-[var(--p-accent)] dark:text-[var(--p-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 rounded-[var(--p-radius)] border border-[var(--p-border)] bg-[var(--p-surface)] p-6 dark:border-[var(--p-border)] dark:bg-[var(--p-surface)]">
                  <h3 className="text-sm font-semibold">Dla kogo?</h3>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--p-muted)] dark:text-[var(--p-muted)]">
                    {data.idealFor.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </div>
              </section>

              <section aria-labelledby="process-heading">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--p-accent)] dark:text-[var(--p-accent)]">Przebieg współpracy</p>
                <h2 id="process-heading" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Od celu do produkcji</h2>
                <ol className="mt-8 space-y-3">
                  {data.process.map((step, index) => (
                    <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-[var(--p-radius)] border border-[var(--p-border)] p-5 dark:border-[var(--p-border)]">
                      <span className="portfolio-tag">0{index + 1}</span>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--p-muted)] dark:text-[var(--p-muted)]">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="examples-heading">
            <div className="mx-auto max-w-[1280px]">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--p-accent)] dark:text-[var(--p-accent)]">Dowody pracy</p>
                  <h2 id="examples-heading" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Powiązane realizacje</h2>
                </div>
                <Link href="/#projekty" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--p-accent)] dark:text-[var(--p-accent)]">Wszystkie projekty <ArrowRight className="size-4" /></Link>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {featuredCaseStudies.map((item, index) => (
                  <Link key={item.href} href={item.href} className="group rounded-[var(--p-radius)] border border-[var(--p-border)] bg-[var(--p-surface)] p-6 transition-transform hover:-translate-y-1 dark:border-[var(--p-border)] dark:bg-[var(--p-surface)]">
                    <span className="font-mono text-[10px] text-[var(--p-muted)] dark:text-[var(--p-muted)]">0{index + 1}</span>
                    <h3 className="mt-6 text-lg font-semibold group-hover:text-[var(--p-accent)] dark:group-hover:text-[var(--p-accent)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--p-muted)] dark:text-[var(--p-muted)]">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-[var(--p-border)] bg-[var(--p-surface)] px-4 py-20 dark:border-[var(--p-border)] dark:bg-[var(--p-surface)] sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-heading">
            <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--p-accent)] dark:text-[var(--p-accent)]">Konkretne odpowiedzi</p>
                <h2 id="faq-heading" className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Najczęstsze pytania</h2>
                <p className="mt-5 text-sm leading-relaxed text-[var(--p-muted)] dark:text-[var(--p-muted)]">Odpowiedzi są częścią widocznej treści strony — bez ukrywania informacji wyłącznie w danych strukturalnych.</p>
              </div>
              <div className="divide-y divide-slate-200 overflow-hidden rounded-[var(--p-radius)] border border-[var(--p-border)] dark:divide-white/9 dark:border-[var(--p-border)]">
                {data.faq.map((item, index) => (
                  <details key={item.question} className="group bg-[var(--p-surface)] open:bg-[var(--p-surface)] dark:bg-[var(--p-surface)] dark:open:bg-[var(--p-surface)]">
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6">
                      <span className="font-mono text-[10px] text-[var(--p-muted)] dark:text-[var(--p-muted)]">0{index + 1}</span>
                      <h3 className="flex-1 text-sm font-semibold sm:text-base">{item.question}</h3>
                      <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="px-5 pb-6 pl-[4.25rem] text-sm leading-7 text-[var(--p-muted)] dark:text-[var(--p-muted)] sm:pr-8">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[var(--p-radius)] bg-[var(--p-surface)] p-7 text-white sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-12">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--p-accent)]">Następny krok</p>
                <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Opowiedz, jaki rezultat ma dać projekt.</h2>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--p-muted)]">
                  {data.related.map((item) => <Link key={item.href} href={item.href} className="hover:text-[var(--p-accent)]">{item.label}</Link>)}
                </div>
              </div>
              <Link href="/#kontakt" className="portfolio-button mt-8 shrink-0 lg:mt-0">Przejdź do formularza <ArrowRight className="size-4" /></Link>
            </div>
          </section>
        </article>
      </main>
    </PublicPageShell>
  );
}
