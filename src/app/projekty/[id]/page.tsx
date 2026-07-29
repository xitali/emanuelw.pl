import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ExternalLink, Code2, ArrowLeft } from "lucide-react";
import { getProjectById, getProjects } from "@/lib/turso";
import {
  getProjectIdFromSegment,
  getProjectPath,
  getProjectSegment,
  SITE_URL,
  toAbsoluteUrl,
} from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: getProjectSegment(project) }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id: segment } = await params;
  const project = await getProjectById(getProjectIdFromSegment(segment));
  if (!project) return {};

  const path = getProjectPath(project);
  const image = toAbsoluteUrl(project.images[0]);

  return {
    title: project.title,
    description: project.short_description,
    alternates: { canonical: path },
    openGraph: {
      title: project.title,
      description: project.short_description,
      url: `${SITE_URL}${path}`,
      siteName: "Emanuel Włoch – Web Development",
      locale: "pl_PL",
      type: "article",
      publishedTime: project.created_at,
      modifiedTime: project.updated_at,
      images: image
        ? [{ url: image, alt: `Podgląd projektu ${project.title}` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.short_description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id: segment } = await params;
  const project = await getProjectById(getProjectIdFromSegment(segment));
  if (!project) notFound();

  const canonicalSegment = getProjectSegment(project);
  if (segment !== canonicalSegment) {
    permanentRedirect(getProjectPath(project));
  }

  const projectUrl = `${SITE_URL}${getProjectPath(project)}`;
  const images = project.images
    .map((image) => toAbsoluteUrl(image))
    .filter((image): image is string => Boolean(image));
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${projectUrl}/#case-study`,
      name: project.title,
      headline: project.title,
      description: project.short_description,
      url: projectUrl,
      image: images,
      inLanguage: "pl-PL",
      dateCreated: project.created_at,
      dateModified: project.updated_at,
      keywords: project.technologies.join(", "),
      creator: {
        "@type": "Person",
        "@id": `${SITE_URL}/#emanuel-wloch`,
        name: "Emanuel Włoch",
        url: SITE_URL,
      },
      sameAs: [project.project_url, project.repository_url].filter(Boolean),
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
          name: "Projekty",
          item: `${SITE_URL}/#projekty`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-800 dark:bg-[#060913] dark:text-slate-200">
      <article className="mx-auto max-w-5xl space-y-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        <nav aria-label="Okruszki" className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-cyan-700 dark:hover:text-cyan-300">
                Strona główna
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#projekty" className="hover:text-cyan-700 dark:hover:text-cyan-300">
                Projekty
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-800 dark:text-slate-200">
              {project.title}
            </li>
          </ol>
        </nav>

        <Link href="/#projekty" className="inline-flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
          <ArrowLeft className="size-4" /> Wszystkie projekty
        </Link>

        <header className="space-y-5">
          <p className="font-mono text-sm uppercase text-cyan-700 dark:text-cyan-300">
            {project.project_type || project.category || "Projekt webowy"}
          </p>
          <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white sm:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {project.short_description}
          </p>
        </header>

        {project.images[0] && (
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
            <Image
              src={project.images[0]}
              alt={`Podgląd projektu ${project.title}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              O projekcie
            </h2>
            <p className="whitespace-pre-line leading-relaxed">
              {project.detailed_description || project.short_description}
            </p>
            {project.key_features && project.key_features.length > 0 && (
              <>
                <h2 className="pt-4 text-2xl font-bold text-slate-950 dark:text-white">
                  Najważniejsze funkcje
                </h2>
                <ul className="list-disc space-y-2 pl-5">
                  {project.key_features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            {project.main_challenge && (
              <>
                <h2 className="pt-4 text-2xl font-bold text-slate-950 dark:text-white">
                  Wyzwanie
                </h2>
                <p className="whitespace-pre-line leading-relaxed">
                  {project.main_challenge}
                </p>
              </>
            )}

            {project.project_result && (
              <>
                <h2 className="pt-4 text-2xl font-bold text-slate-950 dark:text-white">
                  Rezultat
                </h2>
                <p className="whitespace-pre-line leading-relaxed">
                  {project.project_result}
                </p>
              </>
            )}

            {project.performance_metrics &&
              project.performance_metrics.length > 0 && (
                <>
                  <h2 className="pt-4 text-2xl font-bold text-slate-950 dark:text-white">
                    Wydajność
                  </h2>
                  <ul className="list-disc space-y-2 pl-5">
                    {project.performance_metrics.map((metric) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                </>
              )}
          </section>

          <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div>
              <h2 className="mb-3 font-bold text-slate-950 dark:text-white">
                Technologie
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-lg bg-cyan-50 px-2.5 py-1 text-xs text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200">
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            {project.project_url && (
              <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-cyan-700 dark:text-cyan-300">
                <ExternalLink className="size-4" /> Zobacz działającą stronę
              </a>
            )}
            {project.repository_url && (
              <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-cyan-700 dark:text-cyan-300">
                <Code2 className="size-4" /> Repozytorium
              </a>
            )}
          </aside>
        </div>
      </article>
    </main>
  );
}
