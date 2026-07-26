const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Emanuel Włoch",
  url: "https://emanuelwloch.pl",
  image: "https://emanuelwloch.pl/emanuel_wloch.jpg",
  sameAs: [
    "https://github.com/xitali",
    "https://www.linkedin.com/in/emanuelwloch",
    "https://www.instagram.com/mrmun1o",
  ],
  jobTitle: "Full-Stack Developer",
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Turso DB",
    "Tailwind CSS",
    "Web Performance",
    "Web Development",
  ],
};

const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Emanuel Włoch - Tworzenie Stron & Aplikacji Webowych",
  url: "https://emanuelwloch.pl",
  image: "https://emanuelwloch.pl/emanuel_wloch.jpg",
  description:
    "Tworzenie stron internetowych, aplikacji webowych oraz sklepów e-commerce.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PL",
  },
  priceRange: "$$",
  telephone: "+48 725 403 682",
  email: "emanuel.wloch@gmail.com",
};

export default function HomeStructuredData() {
  return (
    <>
      {[person, professionalService].map((value) => (
        <script
          key={value["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(value).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
