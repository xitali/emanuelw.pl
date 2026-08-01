import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import Footer from "@/components/Footer";
import ProfessionalNavbar from "@/components/ProfessionalNavbar";
import { guidePages } from "@/lib/guide-pages";
import { serializeJsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Poradniki o stronach i aplikacjach webowych",
  description: "Konkretne odpowiedzi o kosztach, terminach, technologiach, SEO i podejmowaniu decyzji przed budową strony lub aplikacji.",
  alternates: { canonical: "/poradniki" },
};

export default function GuidesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/poradniki#webpage`,
    url: `${SITE_URL}/poradniki`,
    name: "Poradniki Emanuela Włocha",
    inLanguage: "pl-PL",
    author: { "@id": `${SITE_URL}/#emanuel-wloch` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guidePages.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: guide.title, url: `${SITE_URL}${guide.path}` })),
    },
  };

  return (
    <>
      <ProfessionalNavbar />
      <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#05070c] dark:text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
        <header className="border-b border-white/10 bg-[#05070c] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-44"><div className="mx-auto max-w-[1280px]"><nav aria-label="Okruszki" className="text-xs text-white/48"><Link href="/" className="hover:text-cyan-200">Strona główna</Link> / <span aria-current="page">Poradniki</span></nav><div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20"><div><p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/70"><BookOpen className="size-3.5" /> Wiedza przed decyzją</p><h1 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.055em]">Poradniki o stronach i aplikacjach</h1></div><p className="text-base leading-8 text-white/62 sm:text-lg">Bez marketingowego unikania odpowiedzi. Koszty, terminy i technologie wyjaśnione tak, aby łatwiej było zaplanować właściwy zakres.</p></div></div></header>
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-[1280px] gap-4 md:grid-cols-2 lg:grid-cols-3">{guidePages.map((guide, index) => <Link key={guide.path} href={guide.path} className="group flex min-h-80 flex-col rounded-[1.75rem] border border-slate-200 bg-white p-7 transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.03]"><span className="font-mono text-[10px] text-cyan-700 dark:text-cyan-300/65">0{index + 1}</span><h2 className="mt-10 text-2xl font-semibold tracking-[-0.035em]">{guide.title}</h2><p className="mt-4 flex-1 text-sm leading-7 text-slate-600 dark:text-white/50">{guide.metaDescription}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Czytaj poradnik <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></section>
      </main>
      <Footer />
    </>
  );
}
