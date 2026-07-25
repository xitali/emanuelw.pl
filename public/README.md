# Favicon — Emanuel Włoch

Znak nawiązuje bezpośrednio do ikony terminala użytej w nagłówku portfolio. Gradient turkus–niebieski–fiolet jest zgodny z głównymi akcentami strony, a uproszczona geometria pozostaje czytelna przy 16 × 16 px.

## Pliki

- `favicon.svg` — główny, skalowalny favicon
- `favicon.ico` — zgodność ze starszymi przeglądarkami; rozmiary 16, 32 i 48 px
- `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`
- `apple-touch-icon.png` — 180 × 180 px
- `android-chrome-192x192.png`, `android-chrome-512x512.png`
- `site.webmanifest`

## Wdrożenie

Skopiuj pliki do katalogu publicznego aplikacji, a w sekcji `<head>` dodaj:

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#060913">
```

Po wdrożeniu wykonaj pełne odświeżenie strony (`Ctrl+F5`). Favicony są agresywnie buforowane przez przeglądarki.
