import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/components/portfolio/portfolio.css";
import "@/components/portfolio/premium.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0b0d0f",
  colorScheme: "dark",
};

// Ustawia stan „ruch włączony” PRZED pierwszym malowaniem, żeby animacje wejścia nie migotały.
// Bez ruchu (prefers-reduced-motion) lub gdy hydracja nie ruszy w 4,5 s — treść zostaje w pełni widoczna.
const motionBootstrap = `(function(){try{var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("js-motion");setTimeout(function(){if(!d.classList.contains("motion-armed"))d.classList.remove("js-motion")},4500)}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://emanuelwloch.pl"),
  title: {
    default: "Emanuel Włoch – Strony internetowe i aplikacje | Jarosław",
    template: "%s | Emanuel Włoch",
  },
  description:
    "Projektuję szybkie strony internetowe, sklepy i aplikacje webowe dla firm z Jarosławia, Podkarpacia i całej Polski. Zobacz realizacje i omów swój projekt.",
  applicationName: "Portfolio Emanuela Włocha",
  category: "technology",
  authors: [{ name: "Emanuel Włoch", url: "https://emanuelwloch.pl" }],
  creator: "Emanuel Włoch",
  publisher: "Emanuel Włoch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {

  },
  openGraph: {
    title: "Emanuel Włoch – Strony internetowe i aplikacje | Jarosław",
    description:
      "Szybkie strony internetowe, sklepy i aplikacje webowe dla firm z Jarosławia, Podkarpacia i całej Polski.",
    url: "https://emanuelwloch.pl",
    siteName: "Emanuel Włoch – Web Development",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "https://emanuelwloch.pl/og-image.jpg",
        secureUrl: "https://emanuelwloch.pl/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Emanuel Włoch Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emanuel Włoch – Strony internetowe i aplikacje",
    description:
      "Szybkie strony internetowe, sklepy i aplikacje webowe dla firm z Jarosławia, Podkarpacia i całej Polski.",
    images: ["https://emanuelwloch.pl/og-image.jpg"],
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
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
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
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
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
