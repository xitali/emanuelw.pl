import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";

const PAGE_PATH = "/tworzenie-stron-internetowych-rzeszow";

export const metadata: Metadata = {
  title: "Tworzenie stron internetowych Rzeszów",
  description:
    "Projektowanie szybkich, responsywnych i bezpiecznych stron internetowych w Rzeszowie. SEO techniczne, wdrożenie i opieka po publikacji.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Tworzenie stron internetowych Rzeszów | Emanuel Włoch",
    description:
      "Szybkie, responsywne i bezpieczne strony internetowe dla firm z Rzeszowa i całej Polski.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
    locale: "pl_PL",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Tworzenie stron internetowych w Rzeszowie – Emanuel Włoch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tworzenie stron internetowych Rzeszów | Emanuel Włoch",
    description:
      "Szybkie, responsywne i bezpieczne strony internetowe dla firm z Rzeszowa i całej Polski.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const benefits = [
  {
    icon: Gauge,
    title: "Szybkość i Core Web Vitals",
    description:
      "Optymalizuję obrazy, kod i sposób ładowania treści, aby strona działała sprawnie także na telefonie.",
  },
  {
    icon: Search,
    title: "SEO techniczne od początku",
    description:
      "Przygotowuję poprawne metadane, strukturę nagłówków, mapę strony, dane uporządkowane i przyjazne adresy URL.",
  },
  {
    icon: Smartphone,
    title: "Pełna responsywność",
    description:
      "Interfejs projektuję z myślą o smartfonach, tabletach i komputerach, bez utraty czytelności lub funkcji.",
  },
  {
    icon: ShieldCheck,
    title: "Bezpieczeństwo i utrzymanie",
    description:
      "Waliduję formularze, ograniczam powierzchnię ataku i mogę zapewnić aktualizacje po uruchomieniu strony.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${PAGE_PATH}/#service`,
    name: "Tworzenie stron internetowych w Rzeszowie",
    serviceType: "Projektowanie i tworzenie stron internetowych",
    description:
      "Projektowanie szybkich, responsywnych i bezpiecznych stron internetowych z SEO technicznym.",
    areaServed: ["Jarosław", "Rzeszów", "Podkarpackie", "Polska"],
    provider: {
      "@type": "Person",
      "@id": `${SITE_URL}/#emanuel-wloch`,
      name: "Emanuel Włoch",
      url: SITE_URL,
    },
    url: `${SITE_URL}${PAGE_PATH}`,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Tworzenie stron internetowych Rzeszów",
      },
    ],
  },
];

export default function WebsiteDevelopmentRzeszowPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#060913] dark:text-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <article>
        <section className="border-b border-slate-200 px-4 pb-20 pt-12 dark:border-slate-800 sm:pb-28 sm:pt-16">
          <div className="mx-auto max-w-5xl space-y-8">
            <nav aria-label="Okruszki" className="text-sm text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-cyan-700 dark:hover:text-cyan-300">
                Strona główna
              </Link>
              <span className="px-2" aria-hidden="true">/</span>
              <span aria-current="page">Tworzenie stron internetowych Rzeszów</span>
            </nav>

            <div className="max-w-4xl space-y-6">
              <p className="font-mono text-sm uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                Jarosław • Rzeszów • Podkarpacie • współpraca zdalna
              </p>
              <h1 className="text-4xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-6xl">
                Tworzenie stron internetowych w Rzeszowie
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
                Projektuję i wdrażam nowoczesne strony, landing page, sklepy oraz
                aplikacje webowe. Otrzymujesz rozwiązanie dopasowane do celu,
                szybkie na telefonie i przygotowane do dalszego rozwoju.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#kontakt"
                  className="neon-glow-button inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white"
                >
                  Bezpłatnie omów projekt
                  <ArrowRight className="size-5" />
                </Link>
                <Link
                  href="/#projekty"
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-800 hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  Zobacz realizacje
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
                Co otrzymujesz w ramach realizacji?
              </h2>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                Zakres ustalam przed rozpoczęciem pracy. Dzięki temu wiesz, co
                powstanie, ile potrwa realizacja i które elementy są potrzebne
                do osiągnięcia Twojego celu.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {benefits.map(({ icon: Icon, title, description }) => (
                <section
                  key={title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <Icon className="mb-4 size-7 text-cyan-600 dark:text-cyan-300" />
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
                    {description}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-20 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <section className="space-y-5">
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
                Jak wygląda współpraca?
              </h2>
              <ol className="space-y-4">
                {[
                  "Krótko opisujesz cel, odbiorców i potrzebne funkcje.",
                  "Otrzymujesz proponowany zakres, wycenę i harmonogram.",
                  "Przygotowuję projekt i pokazuję kolejne etapy do akceptacji.",
                  "Testuję, publikuję stronę i przekazuję ustalenia dotyczące obsługi.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-5">
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
                Strona przygotowana do rozwoju
              </h2>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                Dobieram technologię do projektu, zamiast komplikować prostą
                stronę. W rozbudowanych realizacjach pracuję m.in. z Next.js,
                React, TypeScript, relacyjnymi bazami danych i usługami Vercel.
              </p>
              <ul className="space-y-3">
                {[
                  "czytelny kod i uporządkowana architektura",
                  "formularze i integracje dopasowane do procesu",
                  "możliwość dodania panelu administracyjnego",
                  "analityka bez zbędnego śledzenia użytkowników",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl space-y-8">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
              Najczęstsze pytania
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  question: "Czy pracujesz tylko z klientami z Rzeszowa?",
                  answer:
                    "Nie. Działam z Jarosławia na Podkarpaciu, obsługuję również firmy z Rzeszowa, a cały proces mogę przeprowadzić zdalnie dla klienta z dowolnego miejsca w Polsce.",
                },
                {
                  question: "Czy strona będzie działać na telefonie?",
                  answer:
                    "Tak. Responsywność i wygodna obsługa na małych ekranach są częścią realizacji, a nie płatnym dodatkiem.",
                },
                {
                  question: "Czy pomagasz z domeną i publikacją?",
                  answer:
                    "Tak. Mogę przygotować konfigurację domeny, hostingu, certyfikatu HTTPS oraz wdrożyć gotową stronę.",
                },
                {
                  question: "Ile kosztuje strona internetowa?",
                  answer:
                    "Cena zależy od liczby widoków, treści, formularzy i integracji. Po krótkim opisie potrzeb przygotowuję zakres i konkretną wycenę.",
                },
              ].map(({ question, answer }) => (
                <section
                  key={question}
                  className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
                >
                  <h3 className="font-bold text-slate-950 dark:text-white">
                    {question}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
                    {answer}
                  </p>
                </section>
              ))}
            </div>
            <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-8 text-center dark:border-cyan-900 dark:bg-cyan-950/40">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Masz pomysł na stronę?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
                Opisz krótko, czego potrzebujesz. Odpowiem z pytaniami, które
                pozwolą ustalić realny zakres i budżet.
              </p>
              <Link
                href="/#kontakt"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-600 px-7 py-3.5 font-semibold text-white hover:bg-cyan-500"
              >
                Przejdź do formularza
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
