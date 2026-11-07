import ConversionTracker from "@/components/ConversionTracker";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = {
  ...createPageMetadata({ path: "/", title: "Emanuel Włoch — strony internetowe i aplikacje dla firm", description: "Potrzebujesz strony, sklepu lub aplikacji dla swojej firmy? Porozmawiaj z Emanuelem Włochem o projekcie — od ustalenia celu po wdrożenie." }),
  title: { absolute: "Emanuel Włoch — strony internetowe i aplikacje dla firm" },
};
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
import MotionLayer from "@/components/portfolio/motion/MotionLayer";
import DeliveryProcess from "@/components/portfolio/DeliveryProcess";

// High performance revalidation tag caching
export const revalidate = 60;

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
      <VisitTracker /><ConversionTracker /><MotionLayer />
      <Navbar />
      
      <div className="relative z-10">
        <ProductStory testimonial={testimonials[0]} />
        <ServicePaths services={services} />
        <ProjectsSection initialProjects={projects} />
        <DeliveryProcess />
        <TestimonialsSection testimonials={testimonials} />
        <AboutSection />
        <details className="technology-disclosure portfolio-container"><summary>Jakich technologii używam? <span aria-hidden="true">+</span></summary><TechnologyDetails /></details>
        <ContactSection settings={settings} />
      </div>

      <Footer />
    </main>
    </>
  );
}
