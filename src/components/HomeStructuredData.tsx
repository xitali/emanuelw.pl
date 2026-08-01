import type { PublicSiteSettings, Service } from "@/types";
import { serializeJsonLd, SITE_URL } from "@/lib/seo";

const USEME_URL = "https://useme.com/pl/roles/contractor/emanuel-wloch%2C525723/";

interface HomeStructuredDataProps {
  services: Service[];
  settings: PublicSiteSettings;
}

export default function HomeStructuredData({
  services,
  settings,
}: HomeStructuredDataProps) {
  const personId = `${SITE_URL}/#emanuel-wloch`;
  const websiteId = `${SITE_URL}/#website`;
  const sameAs = [
    settings.social_github,
    settings.social_linkedin,
    settings.social_instagram,
    settings.social_facebook,
    USEME_URL,
  ].filter(Boolean);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: "Emanuel Włoch – strony internetowe i aplikacje",
        inLanguage: "pl-PL",
        publisher: { "@id": personId },
        about: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Emanuel Włoch",
        url: `${SITE_URL}/o-mnie`,
        image: `${SITE_URL}/emanuel_wloch.jpg`,
        sameAs,
        jobTitle: "Full-Stack Developer",
        mainEntityOfPage: { "@id": `${SITE_URL}/o-mnie#webpage` },
        hasOccupation: {
          "@type": "Occupation",
          name: "Full-Stack Developer",
          occupationLocation: {
            "@type": "City",
            name: "Jarosław",
          },
        },
        homeLocation: {
          "@type": "Place",
          name: "Jarosław, Podkarpackie, Polska",
        },
        knowsLanguage: ["pl", "en"],
        email: settings.personal_email,
        telephone: settings.personal_phone,
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Aplikacje webowe",
          "Sklepy internetowe",
          "Wydajność stron internetowych",
        ],
        areaServed: ["Jarosław", "Rzeszów", "Podkarpackie", "Polska"],
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          price: service.starting_price,
          priceCurrency: service.currency,
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description:
              service.short_description || service.full_description,
            provider: { "@id": personId },
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(structuredData),
      }}
    />
  );
}
