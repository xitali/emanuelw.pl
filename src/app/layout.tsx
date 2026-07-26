import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emanuelwloch.pl"),
  title: {
    default: "Emanuel Włoch – Tworzenie Stron & Aplikacji Webowych | Full-Stack Architect",
    template: "%s | Emanuel Włoch",
  },
  description:
    "Emanuel Włoch – Nowoczesne strony internetowe, e-commerce, dedykowane aplikacje webowe oraz systemy Edge Rzeszów / Polska. Superszybki czas ładowania i ocena 100/100 Lighthouse.",
  keywords: [
    "Emanuel Włoch",
    "tworzenie stron internetowych Rzeszów",
    "programista Next.js",
    "Full-Stack Software Engineer",
    "aplikacje webowe",
    "sklepy internetowe",
    "architektura Edge",
    "Turso DB",
    "TypeScript",
    "freelancer programista",
    "tworzenie aplikacji Rzeszów",
  ],
  authors: [{ name: "Emanuel Włoch", url: "https://emanuelwloch.pl" }],
  creator: "Emanuel Włoch",
  publisher: "Emanuel Włoch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://emanuelwloch.pl",
  },
  openGraph: {
    title: "Emanuel Włoch – Full-Stack Software Engineer & Edge Architect",
    description:
      "Projektuję i buduję superszybkie strony internetowe, e-commerce oraz zaawansowane aplikacje webowe w architekturze Edge.",
    url: "https://emanuelwloch.pl",
    siteName: "Emanuel Włoch - Web Development & Software Architecture",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1640,
        height: 624,
        alt: "Emanuel Włoch Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emanuel Włoch – Full-Stack Software Engineer",
    description:
      "Projektuję i buduję nowoczesne aplikacje webowe, sklepy internetowe i systemy Edge.",
    creator: "@xitali_",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

// JSON-LD Structured Data Schema.org for Google Search Engine Knowledge Graph
const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Emanuel Włoch",
  url: "https://emanuelwloch.pl",
  image: "https://emanuelwloch.pl/og-image.jpg",
  sameAs: [
    "https://github.com/xitali",
    "https://x.com/xitali_",
    "https://www.linkedin.com/in/emanuelwloch",
  ],
  jobTitle: "Full-Stack Software Engineer & Architect",
  worksFor: {
    "@type": "Organization",
    name: "Emanuel Włoch Software Services",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Turso DB",
    "Tailwind CSS",
    "Web Performance",
    "Edge Architecture",
    "Software Architecture",
  ],
};

const jsonLdBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Emanuel Włoch - Tworzenie Stron & Aplikacji Webowych",
  url: "https://emanuelwloch.pl",
  image: "https://emanuelwloch.pl/og-image.jpg",
  description:
    "Tworzenie superszybkich stron internetowych, aplikacji webowych oraz sklepów e-commerce.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rzeszów",
    addressCountry: "PL",
  },
  priceRange: "$$",
  telephone: "+48 000 000 000",
  email: "emanuel.wloch@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth scroll-pt-28`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBusiness) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-[#060913] dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
