import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Code2, ExternalLink, Gauge, Layers3, Quote, Target } from "lucide-react";
import Footer from "@/components/Footer";
import ProfessionalNavbar from "@/components/ProfessionalNavbar";
import { getProjectById, getProjects } from "@/lib/turso";
import {
  getProjectIdFromSegment,
  getProjectPath,
  getProjectSegment,
  serializeJsonLd,
  SITE_URL,
  toAbsoluteUrl,
} from "@/lib/seo";
import type { Project } from "@/types";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

function compactDescription(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length <= 158 ? normalized : `${normalized.slice(0, 155).trimEnd()}…`;
}

function createProjectFaq(project: Project) {
  return [
    {
      question: `Jaki był cel projektu ${project.title}?`,
      answer: project.detailed_description || project.short_description,
    },
    {
      question: `Jakie było główne wyzwanie w projekcie ${project.title}?`,
      answer: project.main_challenge || "Najważniejszym zadaniem było połączenie czytelnego interfejsu, wydajności i funkcji potrzebnych użytkownikom w jednym spójnym wdrożeniu.",
    },
    {
      question: `Jakie technologie wykorzystano w projekcie ${project.title}?`,
      answer: project.technologies.length > 0
        ? `W projekcie wykorzystano: ${project.technologies.join(", ")}.`
        : "Technologie zostały dobrane do wymagań produktu, bezpieczeństwa i dalszego utrzymania.",
    },
    {
      question: `Jaki był rezultat projektu ${project.title}?`,
      answer: project.project_result || "Powstało responsywne, produkcyjne rozwiązanie realizujące uzgodniony zakres i przygotowane do dalszego rozwoju.",
    },
  ];
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: getProjectSegment(project) }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id: segment } = await params;
  const project = await getProjectById(getProjectIdFromSegment(segment));
  if (!project) return {};

  const path = getProjectPath(project);
  const image = toAbsoluteUrl(project.images[0]);
  const description = compactDescription(project.short_description);

  return {
    title: `${project.title} — case study`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${project.title} — case study`,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Emanuel Włoch – Web Development",
      locale: "pl_PL",
      type: "article",
      publishedTime: project.created_at,
      modifiedTime: project.updated_at,
      authors: ["Emanuel Włoch"],
      images: image ? [{ url: image, alt: `Podgląd projektu ${project.title}` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — case study`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 dark:border-white/9 dark:bg-white/[0.025]">
          <Check className="mt-0.5 size-4 shrink-0 text-emerald-500 dark:text-emerald-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id: segment } = await params;
  const project = await getProjectById(getProjectIdFromSegment(segment));
  if (!project) notFound();

  const canonicalSegment = getProjectSegment(project);
  if (segment !== canonicalSegment) permanentRedirect(getProjectPath(project));

  const projectUrl = `${SITE_URL}${getProjectPath(project)}`;
  const images = project.images.map((image) => toAbsoluteUrl(image)).filter((image): image is string => Boolean(image));
  const faq = createProjectFaq(project);
  const techGroups = [
    { label: "Frontend", items: project.frontend_technologies ?? [] },
    { label: "Backend", items: project.backend_technologies ?? [] },
    { label: "Narzędzia i usługi", items: project.tools_and_services ?? [] },
  ].filter((group) => group.items.length > 0);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${projectUrl}#case-study`,
        mainEntityOfPage: { "@id": `${projectUrl}#webpage` },
        headline: project.title,
        description: compactDescription(project.short_description),
        url: projectUrl,
        image: images,
        inLanguage: "pl-PL",
        datePublished: project.created_at,
        dateModified: project.updated_at,
        keywords: project.technologies,
        about: [project.project_type, project.category, ...project.technologies].filter(Boolean),
        author: { "@id": `${SITE_URL}/#emanuel-wloch` },
        publisher: { "@id": `${SITE_URL}/#emanuel-wloch` },
        sameAs: [project.project_url, project.repository_url].filter(Boolean),
      },
      {
        "@type": "WebPage",
        "@id": `${projectUrl}#webpage`,
        url: projectUrl,
        name: `${project.title} — case study`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${projectUrl}#breadcrumb` },
      },
      {
        "@type": "FAQPage",
        "@id": `${projectUrl}#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${projectUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Strona główna", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projekty", item: `${SITE_URL}/#projekty` },
          { "@type": "ListItem", position: 3, name: project.title, item: projectUrl },
        ],
      },
    ],
  };

  return (
    <>
      <ProfessionalNavbar />
      <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#05070c] dark:text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
        <article>
          <header className="border-b border-white/10 bg-[#05070c] px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
            <div className="mx-auto max-w-[1280px]">
              <nav aria-label="Okruszki" className="text-xs text-white/48">
                <Link href="/" className="hover:text-cyan-200">Strona główna</Link> / <Link href="/#projekty" className="hover:text-cyan-200">Projekty</Link> / <span aria-current="page">{project.title}</span>
              </nav>
              <Link href="/#projekty" className="mt-9 inline-flex items-center gap-2 text-sm text-cyan-200/80"><ArrowLeft className="size-4" /> Wszystkie projekty</Link>
              <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/65">Case study · {project.project_type || project.category || "projekt webowy"}</p>
                  <h1 className="mt-5 text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.055em]">{project.title}</h1>
                </div>
                <p className="text-base leading-8 text-white/62 sm:text-lg">{project.short_description}</p>
              </div>
              <div className="mt-9 flex flex-wrap gap-2">
                {project.technologies.slice(0, 8).map((technology) => <span key={technology} className="rounded-full border border-white/12 px-3 py-1.5 text-[10px] text-white/56">{technology}</span>)}
              </div>
            </div>
          </header>

          {project.images[0] && (
            <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14" aria-label={`Główny podgląd projektu ${project.title}`}>
              <div className="relative mx-auto aspect-video max-w-[1280px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-950 dark:border-white/10">
                <Image src={project.images[0]} alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="scale-110 object-cover opacity-25 blur-2xl" aria-hidden="true" />
                <Image src={project.images[0]} alt={`Podgląd projektu ${project.title}`} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-contain" />
              </div>
            </section>
          )}

          <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24" aria-labelledby="summary-heading">
            <div className="mx-auto max-w-[1280px]">
              <h2 id="summary-heading" className="sr-only">Projekt w skrócie</h2>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 dark:border-white/10 dark:bg-white/10 md:grid-cols-3">
                {[
                  ["Odbiorcy", project.target_audience || "Użytkownicy końcowi i klienci marki"],
                  ["Zakres", project.project_type || project.category || "Produkt webowy"],
                  ["Wdrożenie", project.hosting_platform || project.project_status || "Środowisko produkcyjne"],
                ].map(([label, value]) => <div key={label} className="bg-white p-6 dark:bg-[#090c13]"><div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 dark:text-white/32">{label}</div><p className="mt-3 text-sm font-medium">{value}</p></div>)}
              </div>
            </div>
          </section>

          <section className="border-y border-slate-200 bg-white px-4 py-20 dark:border-white/10 dark:bg-[#080b12] sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70">01 · Kontekst</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Problem i cel projektu</h2></div>
              <div className="space-y-9">
                <p className="whitespace-pre-line text-base leading-8 text-slate-600 dark:text-white/58 sm:text-lg">{project.detailed_description || project.short_description}</p>
                {project.main_challenge && <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-300/15 dark:bg-amber-300/[0.05]"><div className="flex items-center gap-2 text-sm font-semibold"><Target className="size-4 text-amber-600 dark:text-amber-300" /> Główne wyzwanie</div><p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-white/54">{project.main_challenge}</p></div>}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="solution-heading">
            <div className="mx-auto max-w-[1280px]">
              <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70">02 · Realizacja</p><h2 id="solution-heading" className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Rozwiązanie</h2></div><div>{project.innovation && <p className="mb-8 whitespace-pre-line text-base leading-8 text-slate-600 dark:text-white/58 sm:text-lg">{project.innovation}</p>}{project.key_features && project.key_features.length > 0 && <BulletList items={project.key_features} />}</div></div>
            </div>
          </section>

          <section className="border-y border-slate-200 bg-white px-4 py-20 dark:border-white/10 dark:bg-[#080b12] sm:px-6 lg:px-8 lg:py-24" aria-labelledby="architecture-heading">
            <div className="mx-auto max-w-[1280px]">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70"><Layers3 className="size-3.5" /> 03 · Architektura</div>
              <h2 id="architecture-heading" className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Technologie dobrane do celu</h2>
              {techGroups.length > 0 ? <div className="mt-10 grid gap-4 md:grid-cols-3">{techGroups.map((group) => <section key={group.label} className="rounded-2xl border border-slate-200 p-6 dark:border-white/10"><h3 className="text-sm font-semibold">{group.label}</h3><div className="mt-5 flex flex-wrap gap-2">{group.items.map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] dark:bg-white/[0.05]">{item}</span>)}</div></section>)}</div> : <div className="mt-8 flex flex-wrap gap-2">{project.technologies.map((item) => <span key={item} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs dark:border-white/10">{item}</span>)}</div>}
            </div>
          </section>

          {((project.performance_metrics?.length ?? 0) > 0 || (project.technical_metrics?.length ?? 0) > 0 || project.accessibility_features) && (
            <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="quality-heading">
              <div className="mx-auto max-w-[1280px]"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70"><Gauge className="size-3.5" /> 04 · Jakość techniczna</div><h2 id="quality-heading" className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Wydajność, SEO i dostępność</h2><div className="mt-10 grid gap-4 lg:grid-cols-2">{project.performance_metrics && project.performance_metrics.length > 0 && <BulletList items={project.performance_metrics} />}{project.technical_metrics && project.technical_metrics.length > 0 && <BulletList items={project.technical_metrics} />}{project.accessibility_features && <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 dark:border-white/10 dark:bg-white/[0.025] dark:text-white/54 lg:col-span-2">{project.accessibility_features}</p>}</div></div>
            </section>
          )}

          <section className="border-y border-slate-200 bg-white px-4 py-20 dark:border-white/10 dark:bg-[#080b12] sm:px-6 lg:px-8 lg:py-24" aria-labelledby="result-heading">
            <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/70">05 · Efekt</p><h2 id="result-heading" className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Rezultat</h2></div><div><p className="whitespace-pre-line text-base leading-8 text-slate-600 dark:text-white/58 sm:text-lg">{project.project_result || "Powstało responsywne, produkcyjne rozwiązanie realizujące uzgodniony zakres i przygotowane do dalszego rozwoju."}</p>{project.success_metrics && project.success_metrics.length > 0 && <div className="mt-8"><BulletList items={project.success_metrics} /></div>}{project.user_feedback?.[0] && <blockquote className="mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-6 dark:border-cyan-300/15 dark:bg-cyan-300/[0.05]"><Quote className="size-5 text-cyan-600 dark:text-cyan-300" /><p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-white/56">{project.user_feedback[0]}</p></blockquote>}</div></div>
          </section>

          {project.images.length > 1 && <section className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="gallery-heading"><div className="mx-auto max-w-[1280px]"><h2 id="gallery-heading" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Widoki projektu</h2><div className="mt-9 grid gap-4 md:grid-cols-2">{project.images.slice(1).map((image, index) => <div key={`${image}-${index}`} className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 dark:border-white/10"><Image src={image} alt={`Widok ${index + 2} projektu ${project.title}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" /></div>)}</div></div></section>}

          <section className="border-y border-slate-200 bg-white px-4 py-20 dark:border-white/10 dark:bg-[#080b12] sm:px-6 lg:px-8" aria-labelledby="case-faq-heading"><div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20"><h2 id="case-faq-heading" className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Pytania o realizację</h2><div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-white/10 dark:border-white/10">{faq.map((item) => <details key={item.question} className="group"><summary className="cursor-pointer list-none p-5 font-semibold sm:p-6">{item.question}</summary><p className="whitespace-pre-line px-5 pb-6 text-sm leading-7 text-slate-600 dark:text-white/54 sm:px-6">{item.answer}</p></details>)}</div></div></section>

          <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-[1280px] rounded-[2rem] bg-[#070910] p-8 text-white sm:p-10 lg:flex lg:items-end lg:justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/65">Podobny cel?</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Zbudujmy następny case study.</h2><div className="mt-5 flex flex-wrap gap-4 text-xs text-white/48"><Link href="/uslugi" className="hover:text-cyan-200">Zobacz usługi</Link>{project.project_url && <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-cyan-200">Działający projekt <ExternalLink className="size-3" /></a>}{project.repository_url && <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-cyan-200">Repozytorium <Code2 className="size-3" /></a>}</div></div><Link href="/#kontakt" className="mt-8 inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black lg:mt-0">Omów swój projekt <ArrowRight className="size-4" /></Link></div></section>
        </article>
      </main>
      <Footer />
    </>
  );
}
