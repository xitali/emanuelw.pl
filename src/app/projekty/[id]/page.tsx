import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Code2, ArrowLeft } from "lucide-react";
import { getProjectById, getProjects } from "@/lib/turso";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return {};

  return {
    title: project.title,
    description: project.short_description,
    alternates: { canonical: `/projekty/${project.id}` },
    openGraph: {
      title: project.title,
      description: project.short_description,
      images: project.images[0] ? [project.images[0]] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-800 dark:bg-[#060913] dark:text-slate-200">
      <article className="mx-auto max-w-5xl space-y-10">
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
