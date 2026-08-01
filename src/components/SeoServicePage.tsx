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
import Footer from "@/components/Footer";
import ProfessionalNavbar from "@/components/ProfessionalNavbar";
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
    <>
      <ProfessionalNavbar />
      <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#05070c] dark:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />

        <article>
          <header className="relative overflow-hidden border-b border-white/10 bg-[#05070c] px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
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
              className="absolute -right-36 top-20 size-[34rem] rounded-full bg-violet-600/15 blur-[150px]"
            />

            <div className="relative mx-auto max-w-[1280px]">
              <nav aria-label="Okruszki" className="text-xs text-white/48">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="hover:text-cyan-200">Strona główna</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/uslugi" className="hover:text-cyan-200">Usługi</Link></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-white/74">{data.shortName}</li>
                </ol>
              </nav>

              <div className="mt-12 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-20">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70 sm:text-xs">
                    {data.eyebrow}
                  </p>
                  <h1 className="mt-5 max-w-4xl text-[clamp(2.8rem,5.4vw,5.7rem)] font-medium leading-[0.92] tracking-[-0.055em]">
                    {data.title}
                  </h1>
                  <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/64 sm:text-lg">
                    {data.lead}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/#kontakt"
                      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                    >
                      Omów projekt <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      href="/#projekty"
                      className="inline-flex min-h-12 items-center rounded-full border border-white/16 bg-white/[0.04] px-6 text-sm font-semibold text-white/82 hover:border-cyan-300/60 hover:text-white"
                    >
                      Zobacz realizacje
                    </Link>
                  </div>
                </div>

                <aside className="rounded-[1.75rem] border border-white/12 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-7">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/65">
                    <Sparkles className="size-3.5" /> Krótka odpowiedź
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/72 sm:text-base">
                    {data.directAnswer}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {data.areas.map((area) => (
                      <span key={area} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/54">
                        <MapPin className="size-3 text-cyan-300" /> {area}
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
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70">
                    Zakres i rezultat
                  </p>
                  <h2 id="benefits-heading" className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                    Co zyskujesz?
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-white/54 sm:text-base">
                    Każdy element projektu ma wspierać konkretny cel użytkownika lub firmy.
                  </p>
                </div>
                <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-200 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">
                  {data.benefits.map((benefit, index) => {
                    const Icon = benefitIcons[index] ?? Sparkles;

                    return (
                    <section key={benefit.title} className="min-h-48 bg-white p-6 dark:bg-[#090c13] sm:p-7">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-slate-400 dark:text-white/28">0{index + 1}</span>
                        <Icon className="size-4 text-cyan-600 dark:text-cyan-300" />
                      </div>
                      <h3 className="mt-7 text-lg font-semibold">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/50">{benefit.description}</p>
                    </section>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-slate-200 bg-white px-4 py-20 dark:border-white/10 dark:bg-[#080b12] sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-2 lg:gap-20">
              <section aria-labelledby="deliverables-heading">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70">Elementy realizacji</p>
                <h2 id="deliverables-heading" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Co otrzymujesz</h2>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {data.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-white/9 dark:bg-white/[0.025]">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500 dark:text-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 rounded-2xl border border-cyan-200 bg-cyan-50 p-6 dark:border-cyan-300/15 dark:bg-cyan-300/[0.055]">
                  <h3 className="text-sm font-semibold">Dla kogo?</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-white/56">
                    {data.idealFor.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </div>
              </section>

              <section aria-labelledby="process-heading">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70">Przebieg współpracy</p>
                <h2 id="process-heading" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Od celu do produkcji</h2>
                <ol className="mt-8 space-y-3">
                  {data.process.map((step, index) => (
                    <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-2xl border border-slate-200 p-5 dark:border-white/9">
                      <span className="grid size-10 place-items-center rounded-xl bg-slate-950 font-mono text-xs text-white dark:bg-white dark:text-black">0{index + 1}</span>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-white/50">{step.description}</p>
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
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70">Dowody pracy</p>
                  <h2 id="examples-heading" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Powiązane realizacje</h2>
                </div>
                <Link href="/#projekty" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Wszystkie projekty <ArrowRight className="size-4" /></Link>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {featuredCaseStudies.map((item, index) => (
                  <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-transform hover:-translate-y-1 dark:border-white/9 dark:bg-white/[0.025]">
                    <span className="font-mono text-[10px] text-slate-400 dark:text-white/28">0{index + 1}</span>
                    <h3 className="mt-6 text-lg font-semibold group-hover:text-cyan-700 dark:group-hover:text-cyan-300">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/48">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-slate-200 bg-white px-4 py-20 dark:border-white/10 dark:bg-[#080b12] sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-heading">
            <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70">Konkretne odpowiedzi</p>
                <h2 id="faq-heading" className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Najczęstsze pytania</h2>
                <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-white/50">Odpowiedzi są częścią widocznej treści strony — bez ukrywania informacji wyłącznie w danych strukturalnych.</p>
              </div>
              <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-white/9 dark:border-white/9">
                {data.faq.map((item, index) => (
                  <details key={item.question} className="group bg-slate-50 open:bg-white dark:bg-white/[0.02] dark:open:bg-white/[0.045]">
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6">
                      <span className="font-mono text-[10px] text-slate-400 dark:text-white/28">0{index + 1}</span>
                      <h3 className="flex-1 text-sm font-semibold sm:text-base">{item.question}</h3>
                      <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="px-5 pb-6 pl-[4.25rem] text-sm leading-7 text-slate-600 dark:text-white/56 sm:pr-8">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-[#070910] p-7 text-white sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-12">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/65">Następny krok</p>
                <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Opowiedz, jaki rezultat ma dać projekt.</h2>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/48">
                  {data.related.map((item) => <Link key={item.href} href={item.href} className="hover:text-cyan-200">{item.label}</Link>)}
                </div>
              </div>
              <Link href="/#kontakt" className="mt-8 inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black lg:mt-0">Przejdź do formularza <ArrowRight className="size-4" /></Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
