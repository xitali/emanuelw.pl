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
    default: "Emanuel Włoch – Strony internetowe i aplikacje | Rzeszów",
    template: "%s | Emanuel Włoch",
  },
  description:
    "Projektuję szybkie strony internetowe, sklepy i aplikacje webowe dla firm z Rzeszowa i całej Polski. Zobacz realizacje i omów swój projekt.",
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
    canonical: "https://emanuelwloch.pl",
  },
  openGraph: {
    title: "Emanuel Włoch – Strony internetowe i aplikacje | Rzeszów",
    description:
      "Szybkie strony internetowe, sklepy i aplikacje webowe dla firm z Rzeszowa i całej Polski.",
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
      "Szybkie strony internetowe, sklepy i aplikacje webowe dla firm z Rzeszowa i całej Polski.",
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
