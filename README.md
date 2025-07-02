<!-- README.md -->

# Emanuel Włoch - Portfolio Website

## Opis projektu

Profesjonalna strona portfolio programisty full-stack z funkcjonalnością PHP. Strona zawiera sekcje: hero, o mnie, usługi, projekty, cennik i kontakt z funkcjonalnym formularzem.

## Technologie

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: PHP 7.4+
- **Styling**: Custom CSS z gradientami i animacjami
- **SEO**: Strukturalne dane JSON-LD, meta tagi, sitemap.xml
- **PWA**: Web App Manifest

## Funkcjonalności

### ✨ Główne funkcje
- Responsywny design
- Dynamiczne generowanie meta tagów
- Funkcjonalny formularz kontaktowy z walidacją
- Automatyczne zarządzanie rokiem w stopce
- Zaawansowane SEO i strukturalne dane
- Progressive Web App (PWA)

### 📧 Formularz kontaktowy
- Walidacja po stronie serwera
- Zabezpieczenie przed XSS
- Komunikaty sukcesu i błędów
- Zachowanie danych po błędzie walidacji

### 🔍 Optymalizacja SEO
- Meta tagi Open Graph i Twitter Card
- Strukturalne dane Schema.org
- Sitemap.xml
- Robots.txt
- Breadcrumbs

## Struktura plików

```
.
├── index.php           # Główny plik strony z logiką PHP
├── styles.css          # Style CSS
├── script.js           # JavaScript (jeśli potrzebny)
├── favicon.svg         # Ikona strony
├── robots.txt          # Instrukcje dla robotów
├── sitemap.xml         # Mapa strony
├── site.webmanifest    # Manifest PWA
├── .gitignore          # Pliki ignorowane przez Git
└── README.md           # Ten plik
```

### Meta tagi

Meta tagi są generowane dynamicznie przez funkcję `generateMetaTags()`.

## Bezpieczeństwo

- Wszystkie dane wejściowe są sanityzowane przez `htmlspecialchars()`
- Walidacja email po stronie serwera
- Zabezpieczenie przed XSS
- CSRF protection (można dodać token)

## Licencja

© 2025 Emanuel Włoch. Wszystkie prawa zastrzeżone.

## Kontakt

- Email: emanuel.wloch@icloud.com
- Telefon: +48 725 403 682
- Website: https://emanuelw.pl

---

**Wersja**: 2.0.0 (PHP)
**Ostatnia aktualizacja**: Styczeń 2025