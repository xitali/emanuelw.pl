import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronDown, Clock3 } from "lucide-react";
import Footer from "@/components/Footer";
import ProfessionalNavbar from "@/components/ProfessionalNavbar";
import { getGuidePage, guidePages } from "@/lib/guide-pages";
import { serializeJsonLd, SITE_URL } from "@/lib/seo";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guidePages.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = getGuidePage((await params).slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: guide.path },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${SITE_URL}${guide.path}`,
      type: "article",
      publishedTime: "2026-08-01",
      modifiedTime: "2026-08-01",
      authors: ["Emanuel Włoch"],
      images: [{ url: `${SITE_URL}/og-image.jpg`, alt: guide.title }],
    },
    twitter: { card: "summary_large_image", title: guide.metaTitle, description: guide.metaDescription, images: [`${SITE_URL}/og-image.jpg`] },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = getGuidePage((await params).slug);
  if (!guide) notFound();

  const pageUrl = `${SITE_URL}${guide.path}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        headline: guide.title,
        description: guide.metaDescription,
        datePublished: "2026-08-01",
        dateModified: "2026-08-01",
        inLanguage: "pl-PL",
        author: { "@id": `${SITE_URL}/#emanuel-wloch` },
        publisher: { "@id": `${SITE_URL}/#emanuel-wloch` },
        image: `${SITE_URL}/og-image.jpg`,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: guide.title,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Strona główna", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Poradniki", item: `${SITE_URL}/poradniki` },
          { "@type": "ListItem", position: 3, name: guide.title, item: pageUrl },
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
            <div className="mx-auto max-w-[1120px]">
              <nav aria-label="Okruszki" className="text-xs text-white/48"><Link href="/" className="hover:text-cyan-200">Strona główna</Link> / <Link href="/poradniki" className="hover:text-cyan-200">Poradniki</Link> / <span aria-current="page">{guide.metaTitle}</span></nav>
              <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">{guide.eyebrow}</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.92] tracking-[-0.055em]">{guide.title}</h1>
              <p className="mt-7 max-w-3xl text-base leading-8 text-white/62 sm:text-lg">{guide.lead}</p>
              <div className="mt-7 flex items-center gap-2 text-xs text-white/40"><Clock3 className="size-3.5" /> Aktualizacja: 1 sierpnia 2026 · autor: <Link href="/o-mnie" rel="author" className="text-cyan-200/75 hover:text-cyan-200">Emanuel Włoch</Link></div>
            </div>
          </header>

          <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18" aria-labelledby="answer-heading">
            <div className="mx-auto max-w-[1120px] rounded-[1.75rem] border border-cyan-200 bg-cyan-50 p-7 dark:border-cyan-300/15 dark:bg-cyan-300/[0.055] sm:p-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300/70">Odpowiedź w skrócie</p>
              <h2 id="answer-heading" className="sr-only">Krótka odpowiedź</h2>
              <p className="mt-5 text-base leading-8 text-slate-700 dark:text-white/68 sm:text-lg">{guide.directAnswer}</p>
            </div>
          </section>

          <div className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
            <div className="mx-auto max-w-[1120px] space-y-16">
              {guide.sections.map((section, index) => (
                <section key={section.title} aria-labelledby={`guide-section-${index}`} className="grid gap-8 border-t border-slate-200 pt-12 dark:border-white/10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
                  <div><p className="font-mono text-[10px] text-cyan-700 dark:text-cyan-300/65">0{index + 1}</p><h2 id={`guide-section-${index}`} className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{section.title}</h2></div>
                  <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-white/56">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.points && <ul className="mt-7 grid gap-3 sm:grid-cols-2">{section.points.map((point) => <li key={point} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 dark:border-white/9 dark:bg-white/[0.025] dark:text-white/60"><Check className="mt-0.5 size-4 shrink-0 text-emerald-500 dark:text-emerald-300" /> {point}</li>)}</ul>}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <section className="border-y border-slate-200 bg-white px-4 py-20 dark:border-white/10 dark:bg-[#080b12] sm:px-6 lg:px-8" aria-labelledby="guide-faq">
            <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:gap-16">
              <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70">Dalsze pytania</p><h2 id="guide-faq" className="mt-4 text-4xl font-semibold tracking-[-0.045em]">Najczęstsze odpowiedzi</h2></div>
              <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-white/9 dark:border-white/9">{guide.faq.map((item) => <details key={item.question} className="group"><summary className="flex cursor-pointer list-none items-center gap-4 p-5 font-semibold"><span className="flex-1">{item.question}</span><ChevronDown className="size-4 transition-transform group-open:rotate-180" /></summary><p className="px-5 pb-6 text-sm leading-7 text-slate-600 dark:text-white/54">{item.answer}</p></details>)}</div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-[1120px] rounded-[2rem] bg-[#070910] p-8 text-white sm:p-10"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/65">Czytaj dalej</p><div className="mt-5 flex flex-wrap gap-3">{guide.related.map((item) => <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/14 px-5 text-sm font-semibold hover:border-cyan-300/60">{item.label} <ArrowRight className="size-3.5" /></Link>)}</div></div></section>
        </article>
      </main>
      <Footer />
    </>
  );
}
