# emanuelwloch.pl

Portfolio i lekki CMS Emanuela Włocha. Produkcja działa pod
[emanuelwloch.pl](https://emanuelwloch.pl).

## Stos

- Next.js 16, React 19 i TypeScript
- Tailwind CSS v4 i Framer Motion
- Turso (libSQL), Vercel Blob
- Zod, JOSE, bcrypt, Vitest i GitHub Actions

## Uruchomienie lokalne

1. Zainstaluj Node.js 20.9 lub nowszy.
2. Wykonaj `npm install`.
3. Skopiuj `.env.example` do `.env.local` i wpisz własne wartości.
4. Wykonaj `npm run db:migrate`.
5. Uruchom `npm run dev`.
6. Otwórz `http://localhost:3000`.

## Wymagane zmienne

- `TURSO_DATABASE_URL` — adres bazy Turso.
- `TURSO_AUTH_TOKEN` — token dostępu do bazy.
- `JWT_SECRET` — losowy sekret sesji, minimum 32 znaki.
- `RATE_LIMIT_SALT` — osobny losowy sekret do anonimizacji identyfikatorów.
- `BLOB_READ_WRITE_TOKEN` — token magazynu Vercel Blob dla obrazów CMS.

Nie wpisuj wartości tych zmiennych do kodu ani do zgłoszeń GitHub.

## Kontrola jakości

`npm run check` uruchamia lint, kontrolę typów, testy i build produkcyjny.
Każdy push oraz pull request jest sprawdzany również przez GitHub Actions.

## Baza danych

- `npm run db:migrate` — tworzy bezpieczny rate limit i anonimowe statystyki.
- `npm run db:repair` — stosuje zatwierdzone poprawki treści produkcyjnych.

Migracje są powtarzalne. Nie usuwają historycznej tabeli `page_visits`.

## Bezpieczeństwo

Zasady zgłaszania problemów opisuje [SECURITY.md](./SECURITY.md).
