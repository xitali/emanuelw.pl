import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getProjects } from "@/lib/turso";
import PublicPageShell from "@/components/portfolio/PublicPageShell";
import ProjectCatalog from "@/components/portfolio/ProjectCatalog";

export const metadata: Metadata = createPageMetadata({
  title: "Realizacje — strony internetowe, sklepy i aplikacje",
  description: "Zobacz wykonane strony i aplikacje: zakres, rozwiązania, zdjęcia oraz linki do projektów.",
  path: "/realizacje",
});

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ kategoria?: string }> }) {
  const { kategoria } = await searchParams;
  const category = ["web", "e-commerce", "mobile", "apps"].includes(kategoria || "") ? kategoria! : "all";
  return <PublicPageShell><main id="main-content" className="portfolio-subpage"><section className="portfolio-container portfolio-catalog">
    <p className="portfolio-kicker">REALIZACJE / EMANUEL WŁOCH</p><h1>Strony i aplikacje.<br />{" "}Zobacz realizacje.</h1><p>Obejrzyj strony i aplikacje, które przygotowałem. Przy każdej zobaczysz, co zrobiłem, jak to działa i które rozwiązania mogą przydać się również Tobie.</p>
    <ProjectCatalog projects={await getProjects()} category={category} />
  </section></main></PublicPageShell>;
}
