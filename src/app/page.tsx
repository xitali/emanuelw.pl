import { getProjects, getServices, getSiteSettings, getPageVisitsCount, getTestimonials } from "@/lib/turso";
import Navbar from "@/components/Navbar";
import BackgroundGlow from "@/components/BackgroundGlow";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import TechStackSection from "@/components/TechStackSection";
import ContactSection from "@/components/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import VisitTracker from "@/components/VisitTracker";

// High performance revalidation tag caching
export const revalidate = 3600;

export default async function HomePage() {
  // Parallel cached data fetching from Turso DB (< 15ms response)
  const [projects, services, settings, visitCount, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getSiteSettings(),
    getPageVisitsCount(),
    getTestimonials(),
  ]);

  return (
    <main className="relative min-h-screen text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-200">
      <VisitTracker />
      <BackgroundGlow />
      <Navbar />
      
      <div className="relative z-10 space-y-12">
        <HeroSection />
        <ProjectsSection initialProjects={projects} />
        <ServicesSection initialServices={services} />
        <TechStackSection />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection settings={settings} />
      </div>

      <Footer visitCount={visitCount} />
    </main>
  );
}
