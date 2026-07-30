import {
  getProjects,
  getServices,
  getPublicSiteSettings,
  getPageVisitsCount,
  getTestimonials,
} from "@/lib/turso";
import Navbar from "@/components/ProfessionalNavbar";
import BackgroundGlow from "@/components/BackgroundGlow";
import HeroSection from "@/components/ProfessionalHeroSection";
import ProjectsSection from "@/components/ImmersiveProjectsSection";
import ServicesSection from "@/components/ProfessionalServicesSection";
import TechStackSection from "@/components/ProfessionalTechStackSection";
import ContactSection from "@/components/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import VisitTracker from "@/components/VisitTracker";
import HomeStructuredData from "@/components/HomeStructuredData";
import ScrollBuildSection from "@/components/ScrollBuildSection";

// High performance revalidation tag caching
export const revalidate = 3600;

export default async function HomePage() {
  // Parallel cached data fetching from Turso DB (< 15ms response)
  const [projects, services, settings, visitCount, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getPublicSiteSettings(),
    getPageVisitsCount(),
    getTestimonials(),
  ]);

  return (
    <>
      <HomeStructuredData services={services} settings={settings} />
    <main className="relative min-h-screen text-slate-900 dark:text-slate-100 overflow-x-clip selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-200">
      <VisitTracker />
      <BackgroundGlow />
      <Navbar />
      
      <div className="relative z-10">
        <HeroSection
          email={settings.personal_email}
          projectCount={projects.length}
          featuredProject={
            projects[0]
              ? {
                  title: projects[0].title,
                  image: projects[0].images?.[0] ?? null,
                  type:
                    projects[0].project_type ||
                    projects[0].category ||
                    "Produkt cyfrowy",
                }
              : undefined
          }
        />
        <ScrollBuildSection />
        <ProjectsSection initialProjects={projects} />
        <ServicesSection initialServices={services} />
        <TechStackSection />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection settings={settings} />
      </div>

      <Footer visitCount={visitCount} />
    </main>
    </>
  );
}
