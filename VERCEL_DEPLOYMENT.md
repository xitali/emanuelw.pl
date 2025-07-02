# Migracja z PHP na Node.js dla Vercel

## 🔄 Zmiana architektury

**Problem:** Vercel miał problemy z obsługą PHP runtime, powodując błędy deployment

**Rozwiązanie:** Przeprowadzono migrację z PHP na Node.js Express.js, który jest natywnie obsługiwany przez Vercel

## Problem
Vercel pobierał plik PHP zamiast go wykonać, ponieważ domyślnie nie obsługuje PHP w sposób bezpośredni.

## Rozwiązanie

### 1. Utworzenie konfiguracji Vercel
Utworzono plik `vercel.json` z konfiguracją:
- Główna strona używa `index.html` (statyczny)
- Formularz kontaktowy używa API endpoint `/api/contact.php`
- Obsługa statycznych plików (CSS, JS, obrazy)

### 2. Struktura plików
```
.
├── index.html          # Główna strona (statyczna)
├── index.php           # Wersja PHP (dla lokalnego developmentu)
├── api/
│   └── contact.php     # API endpoint dla formularza
├── vercel.json         # Konfiguracja Vercel
└── ...
```

### 3. Jak to działa

**Na Vercel:**
- Strona główna: `index.html` (statyczna, szybka)
- Formularz kontaktowy: `/api/contact` (PHP serverless function)

**Lokalnie:**
- Możesz używać `index.php` z wbudowanym serwerem PHP
- Lub `index.html` z Python/Node.js server

## Deployment na Vercel

### Krok 1: Przygotowanie repozytorium
```bash
git add .
git commit -m "Add Vercel configuration and API endpoint"
git push origin main
```

### Krok 2: Deploy na Vercel
1. Przejdź na https://vercel.com
2. Zaloguj się i połącz z GitHub
3. Wybierz repozytorium `emanuelw.pl`
4. Vercel automatycznie wykryje konfigurację
5. Kliknij "Deploy"

### Krok 3: Weryfikacja
- Strona główna powinna się ładować poprawnie
- Formularz kontaktowy powinien działać przez API

## Alternatywne rozwiązania

### Opcja 1: Tylko HTML (bez PHP)
- Usuń `vercel.json`
- Usuń folder `api/`
- Użyj tylko `index.html`
- Formularz będzie działał tylko po stronie klienta

### Opcja 2: Hosting obsługujący PHP
- **Hostinger** - obsługuje PHP
- **000webhost** - darmowy hosting PHP
- **InfinityFree** - darmowy hosting PHP
- **Nazwa.pl** - polski hosting PHP

### Opcja 3: Vercel + zewnętrzny serwis email
- Użyj EmailJS dla formularza
- Lub Formspree
- Lub Netlify Forms

## Testowanie lokalne

### Z PHP:
```bash
php -S localhost:8000
# Otwórz http://localhost:8000/index.php
```

### Z Python (dla HTML):
```bash
python -m http.server 8000
# Otwórz http://localhost:8000/index.html
```

## Konfiguracja email w produkcji

W pliku `api/contact.php` możesz:

1. **Użyć SendGrid:**
```php
// Zainstaluj SendGrid SDK
// composer require sendgrid/sendgrid
```

2. **Użyć Mailgun:**
```php
// Zainstaluj Mailgun SDK
// composer require mailgun/mailgun-php
```

3. **Użyć SMTP:**
```php
// Zainstaluj PHPMailer
// composer require phpmailer/phpmailer
```

## Monitoring i debugowanie

- Logi Vercel: https://vercel.com/dashboard
- Sprawdź Network tab w DevTools
- Sprawdź Console w przeglądarce

## Wskazówki

1. **Zawsze testuj lokalnie** przed deploymentem
2. **Sprawdź logi Vercel** w przypadku problemów
3. **Użyj HTTPS** w produkcji
4. **Skonfiguruj domeny** w ustawieniach Vercel
5. **Dodaj zmienne środowiskowe** dla kluczy API

---

**Status**: ✅ Gotowe do deployment na Vercel
**Ostatnia aktualizacja**: Styczeń 2025