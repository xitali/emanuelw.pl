import type { PublicSiteSettings, Service } from "@/types";
import { SITE_URL } from "@/lib/seo";

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
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Emanuel Włoch",
        url: SITE_URL,
        image: `${SITE_URL}/emanuel_wloch.jpg`,
        sameAs,
        jobTitle: "Full-Stack Developer",
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
        areaServed: ["Rzeszów", "Podkarpackie", "Polska"],
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
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
