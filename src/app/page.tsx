import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/" } };
import {
  getProjects,
  getServices,
  getPublicSiteSettings,
  getTestimonials,
} from "@/lib/turso";
import Navbar from "@/components/portfolio/PortfolioNav";
import ProductStory, { TechnologyDetails } from "@/components/portfolio/ProductStory";
import ProjectsSection from "@/components/portfolio/ProjectShowcase";
import AboutSection from "@/components/portfolio/AboutSection";
import ServicePaths from "@/components/portfolio/ServicePaths";
import ContactSection from "@/components/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import VisitTracker from "@/components/VisitTracker";
import HomeStructuredData from "@/components/HomeStructuredData";

// High performance revalidation tag caching
export const revalidate = 3600;

export default async function HomePage() {
  // Parallel cached data fetching from Turso DB (< 15ms response)
  const [projects, services, settings, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getPublicSiteSettings(),
    getTestimonials(),
  ]);

  return (
    <>
      <HomeStructuredData services={services} settings={settings} />
    <main id="main-content" className="portfolio-home dark relative min-h-screen overflow-x-clip" tabIndex={-1}>
      <VisitTracker />
      <Navbar />
      
      <div className="relative z-10">
        <ProductStory testimonial={testimonials[0]} />
        <ProjectsSection initialProjects={projects} />
        <ServicePaths services={services} />
        <TestimonialsSection testimonials={testimonials} />
        <AboutSection />
        <TechnologyDetails />
        <ContactSection settings={settings} />
      </div>

      <Footer />
    </main>
    </>
  );
}
