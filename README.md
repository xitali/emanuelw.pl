# Portfolio Emanuel Włoch - Modern Portfolio Website

Nowoczesna strona portfolio z panelem administracyjnym, stworzona w React + TypeScript + Vite.

## 🚀 Funkcjonalności

### Strona główna
- **Sekcja Hero** z animowanym tekstem i efektami cząsteczek
- **O mnie** - prezentacja umiejętności i technologii
- **Wybrane projekty** - showcase najważniejszych prac
- **Responsywny design** z obsługą jasnego i ciemnego motywu

### Portfolio
- **Galeria projektów** z filtrowaniem i wyszukiwaniem
- **Szczegółowe strony projektów** z opisami, technologiami i zdjęciami
- **Kategorie projektów** (Web Development, Mobile, Desktop)
- **Modal z podglądem** projektów

### Usługi
- **Prezentacja oferowanych usług** z cenami i funkcjami
- **Dynamiczne zarządzanie** usługami przez panel admin
- **Responsywne karty** z animacjami

### Kontakt
- **Formularz kontaktowy** z walidacją
- **Informacje kontaktowe** (email, telefon, lokalizacja)
- **Integracja z bazą danych** do przechowywania wiadomości

### Panel Administracyjny
- **Dashboard** ze statystykami i przeglądem
- **Zarządzanie projektami** (dodawanie, edycja, usuwanie)
- **Zarządzanie wiadomościami** z systemu kontaktowego
- **Zarządzanie usługami** (ceny, opisy, funkcje)
- **Zarządzanie użytkownikami** i uprawnieniami
- **Ustawienia strony** (dane osobowe, linki społecznościowe)
- **Bezpieczne logowanie** z hashowaniem haseł

## 🛠️ Technologie

### Frontend
- **React 19** - biblioteka UI
- **TypeScript** - typowanie statyczne
- **Vite** - bundler i dev server
- **Tailwind CSS** - stylowanie
- **Framer Motion** - animacje
- **React Router** - routing
- **Zustand** - zarządzanie stanem
- **React Hook Form** - obsługa formularzy
- **Lucide React** - ikony

### Backend & Database
- **Supabase** - backend as a service
- **PostgreSQL** - baza danych
- **Row Level Security** - bezpieczeństwo danych

### Narzędzia
- **ESLint** - linting kodu
- **PostCSS** - przetwarzanie CSS
- **bcryptjs** - hashowanie haseł
- **date-fns** - manipulacja datami
- **React Hot Toast** - notyfikacje

## 📦 Instalacja

1. **Klonowanie repozytorium**
```bash
git clone <repository-url>
cd emanuelw.pl
```

2. **Instalacja zależności**
```bash
npm install
```

3. **Konfiguracja środowiska**
Utwórz plik `.env` z następującymi zmiennymi:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Uruchomienie aplikacji**
```bash
npm run dev
```

## 🚀 Skrypty

- `npm run dev` - uruchomienie serwera deweloperskiego
- `npm run build` - budowanie aplikacji produkcyjnej
- `npm run preview` - podgląd zbudowanej aplikacji
- `npm run lint` - sprawdzanie kodu ESLintem

## 📁 Struktura projektu

```
src/
├── components/          # Komponenty wielokrotnego użytku
│   ├── layout/         # Layout i nawigacja
│   └── ui/             # Komponenty UI (Button, Card, Modal)
├── pages/              # Strony aplikacji
│   ├── Home.tsx        # Strona główna
│   ├── Portfolio.tsx   # Galeria projektów
│   ├── Services.tsx    # Strona usług
│   ├── Contact.tsx     # Formularz kontaktowy
│   ├── Dashboard.tsx   # Panel administracyjny
│   └── ...            # Pozostałe strony admin
├── store/              # Zarządzanie stanem (Zustand)
├── lib/                # Konfiguracja (Supabase)
├── types/              # Definicje typów TypeScript
├── utils/              # Funkcje pomocnicze
└── hooks/              # Custom hooks
```

## 🔐 Bezpieczeństwo

- **Hashowanie haseł** za pomocą bcryptjs
- **Row Level Security** w Supabase
- **Walidacja danych** na froncie i backendzie
- **Bezpieczne przechowywanie** tokenów uwierzytelniania

## 🎨 Funkcje UI/UX

- **Ciemny i jasny motyw** z płynnym przełączaniem
- **Animacje** za pomocą Framer Motion
- **Responsywny design** dla wszystkich urządzeń
- **Efekty cząsteczek** na stronie głównej
- **Animowany tekst** w sekcji hero
- **Smooth scrolling** i hover effects

## 📱 Responsywność

Aplikacja jest w pełni responsywna i działa poprawnie na:
- 📱 Telefonach (320px+)
- 📱 Tabletach (768px+)
- 💻 Laptopach (1024px+)
- 🖥️ Desktopach (1280px+)

## 🚀 Deployment

Aplikacja jest skonfigurowana do deploymentu na Vercel z plikiem `vercel.json`.

## 👨‍💻 Autor

**Emanuel Włoch** - Full-stack Developer
- Portfolio: [emanuelw.pl](https://emanuelw.pl)
- Specjalizacja: React, TypeScript, Node.js, UI/UX
