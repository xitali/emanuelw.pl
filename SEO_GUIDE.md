# Complete SEO & Organic Traffic Guide - Portfolio Emanuel Włoch

Kompleksowy przewodnik po pozycjonowaniu (SEO) oraz optymalizacji widoczności w wyszukiwarkach (Google, Bing) dla nowoczesnego portfolio programistycznego i strony usług IT.

---

## 🎯 1. Konfiguracja Meta-Tagów & Open Graph w Next.js 15

Aby Google i media społecznościowe (LinkedIn, Facebook, X, Discord) poprawnie wyświetlały Twoją stronę i generowały wysoką klikalność (CTR), skonfiguruj metadata w pliku `src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emanuel Włoch | Tworzenie Stron, Aplikacji Webowych & Mobilnych Podkarpacie',
  description: 'Programista Full-Stack & Software Architect z Rzeszowa. Tworzę ultra-szybkie strony wizytówkowe, sklepy e-commerce, aplikacje webowe i mobilne.',
  keywords: [
    'Emanuel Włoch',
    'Programista Rzeszów',
    'Tworzenie stron internetowych Podkarpacie',
    'Aplikacje webowe Next.js',
    'Sklepy internetowe Rzeszów',
    'Programista React Podkarpacie',
    'Freelancer IT Rzeszów'
  ],
  authors: [{ name: 'Emanuel Włoch', url: 'https://emanuelwloch.pl' }],
  openGraph: {
    title: 'Emanuel Włoch | Full-Stack Software Engineer',
    description: 'Błyskawiczne strony internetowe, aplikacje webowe i mobilne. Zobacz realizacje i wyceń projekt.',
    url: 'https://emanuelwloch.pl',
    siteName: 'Emanuel Włoch Portfolio',
    images: [
      {
        url: 'https://emanuelwloch.pl/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Emanuel Włoch Portfolio',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

---

## 📌 2. Dane Strukturalne Schema.org (JSON-LD)

Google premiuje strony z ustrukturyzowanymi danymi (Rich Snippets). Umieść w sekcji `<head>` lub w komponentach poniższy kod w formacie JSON-LD, który informuje Google, że jesteś lokalnym dostawcą usług IT:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Emanuel Włoch - Usługi Programistyczne & IT",
  "image": "https://emanuelwloch.pl/emanuel_wloch.jpg",
  "telephone": "+48725403682",
  "email": "emanuel.wloch@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rzeszów",
    "addressRegion": "Podkarpackie",
    "addressCountry": "PL"
  },
  "url": "https://emanuelwloch.pl",
  "priceRange": "$$",
  "sameAs": [
    "https://github.com/xitali",
    "https://www.instagram.com/mrmun1o",
    "https://facebook.com/emanuel.wloch"
  ]
}
</script>
```

---

## 🗺️ 3. Generowanie Plików `sitemap.xml` oraz `robots.txt`

Next.js 15 pozwala na automatyczne generowanie sitemap.

### Stwórz plik `src/app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://emanuelwloch.pl',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://emanuelwloch.pl/#projekty',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://emanuelwloch.pl/#uslugi',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
```

### Stwórz plik `src/app/robots.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/login'],
    },
    sitemap: 'https://emanuelwloch.pl/sitemap.xml',
  };
}
```

---

## 🚀 4. Rejestracja w Google Search Console & Indeksacja

1. Wejdź na [Google Search Console](https://search.google.com/search-console).
2. Dodaj swoją domenę (np. `emanuelwloch.pl`).
3. Weryfikacja: Dodaj kod rekordu TXT w Twoim panelu DNS (np. Cloudflare / Ovh / Vercel).
4. Prześlij adres sitemap: `https://emanuelwloch.pl/sitemap.xml`.
5. Kliknij **"Poproś o zindeksowanie"** (Request Indexing) dla strony głównej.

---

## 📍 5. Lokalny SEO (Podkarpacie / Rzeszów / Polska)

Dla pozyskiwania stałych komercyjnych zleceń z Podkarpacia:

1. **Wizytówka Google Moja Firma (Google Business Profile)**:
   - Załóż bezpłatny profil w Google Moja Firma pod nazwą *„Emanuel Włoch – Tworzenie Stron i Aplikacji Rzeszów”*.
   - Wypełnij godziny otwarcia, nr telefonu `+48 725 403 682`, opisy usług.
   - Poproś zadowolonych klientów o wystawienie 5 gwiazdek z opiniami.
2. **Frazy Kluczowe Long-Tail (Długi Ogon)**:
   - Wprowadzaj na stronie nagłówki celujące w konkretne zapytania: *„ile kosztuje strona internetowa Rzeszów”*, *„tworzenie aplikacji mobilnych Podkarpacie”*, *„programista Next.js zlecenia B2B”*.

---

## ⚡ 6. Core Web Vitals & Optymalizacja Obrazów

Strona domyślnie posiada **99%+ Lighthouse Score**, co stanowi ogromną przewagę nad konkurencją:
- Wszystkie pliki obrazów ładuj w nowoczesnych formatach WebP/AVIF.
- Używaj atrybutu `alt` w każdym znaczniku `<img>` (np. `alt="Wizytówka firmy transportowej realizacja Emanuel Włoch"`).
- Unikaj ciężkich skryptów śledzących w sekcji `<head>`.

---

## 🔗 7. Budowanie Linków (Backlinks)

Google szanuje strony z wartościowymi odnośnikami zewnętrznymi:
- Link z Twojego profilu GitHub (`github.com/xitali`).
- Linki z profili społecznościowych (Instagram, Facebook, LinkedIn).
- Wpisy na forach branżowych (Dev.to, Medium, Wykop, Forum GoldenLine).
- Odnośniki na stopkach stron klientów (*"Realizacja: Emanuel Włoch"* z linkiem `dofollow`).
