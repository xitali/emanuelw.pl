# Checklista bezpiecznego wdrożenia

Kod i baza są przygotowane. Nie wysyłaj zmian na `main`, dopóki nie wykonasz
punktów 1–3.

## 1. Dodaj dwa nowe sekrety w Vercel

1. Otwórz [Vercel Dashboard](https://vercel.com/dashboard).
2. Kliknij projekt obsługujący `emanuelwloch.pl`.
3. Kliknij `Settings`.
4. Kliknij `Environment Variables`.
5. Na komputerze otwórz PowerShell i dwa razy uruchom:

   ```powershell
   $bytes = New-Object byte[] 48
   [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
   [Convert]::ToBase64String($bytes)
   ```

6. Pierwszy wynik zapisz w Vercel jako `JWT_SECRET`.
7. Drugi wynik zapisz jako `RATE_LIMIT_SALT`.
8. Dla obu zaznacz `Production`, `Preview` i `Development`.
9. Nie wysyłaj tych wartości nikomu i nie wklejaj ich do GitHuba.

## 2. Włącz Vercel Blob

1. W projekcie Vercel otwórz `Storage`.
2. Wybierz `Create Database` lub `Create Store`.
3. Wybierz `Blob`.
4. Nazwij magazyn np. `emanuelw-project-images`.
5. Wybierz dostęp publiczny i połącz magazyn z tym projektem.
6. Sprawdź w `Settings` → `Environment Variables`, czy pojawił się
   `BLOB_READ_WRITE_TOKEN`.

Vercel dodaje tę zmienną automatycznie po połączeniu magazynu z projektem:
[dokumentacja Vercel Blob](https://vercel.com/docs/vercel-blob/using-blob-sdk).

## 3. Unieważnij ujawniony token Turso

Stary token jest w historii Git, dlatego sama poprawka kodu go nie zabezpiecza.
Ta operacja powoduje krótką przerwę w dostępie do bazy.

1. Zaloguj się do Turso CLI:

   ```bash
   turso auth login
   ```

2. Unieważnij wszystkie stare tokeny:

   ```bash
   turso db tokens invalidate emanuelw -y
   ```

3. Od razu utwórz nowy token:

   ```bash
   turso db tokens create emanuelw
   ```

4. Skopiuj wynik tylko raz.
5. W Vercel wejdź w `Settings` → `Environment Variables`.
6. Edytuj `TURSO_AUTH_TOKEN` i wklej nowy token.
7. W lokalnym `.env.local` również zastąp wartość `TURSO_AUTH_TOKEN`.
8. Usuń z `.env.local` nieużywane `ADMIN_PASSWORD`.

Oficjalne polecenia:
[unieważnianie tokenów](https://docs.turso.tech/cli/db/tokens/invalidate) i
[tworzenie tokenu](https://docs.turso.tech/cli/db/tokens/create).

## 4. Dopiero teraz wyślij zmiany

Po wykonaniu punktów 1–3 napisz w zadaniu: `GOTOWE`. Wtedy można bezpiecznie:

1. utworzyć commit,
2. wysłać `main` do GitHuba,
3. poczekać na deploy Vercel,
4. przetestować stronę i panel na produkcji.

Vercel stosuje nowe zmienne dopiero do nowego wdrożenia:
[dokumentacja zmiennych](https://vercel.com/docs/environment-variables/managing-environment-variables).

## 5. Po udanym wdrożeniu

- Sprawdź, czy masz zgodę każdej osoby na publikację imienia, firmy i opinii.
  Brak zgody oznacza: usuń lub ukryj opinię w panelu.
- Ustal, czy chcesz usunąć historyczne rekordy z tabeli `page_visits`.
  Nowy kod już ich nie tworzy; dane zostały wcześniej zagregowane.
- Uzupełnij politykę prywatności o pełną nazwę działalności i adres, jeżeli
  prowadzisz działalność gospodarczą.
- Włącz GitHub Secret Scanning i Push Protection w `Settings` →
  `Advanced Security` → `Secret Protection`.
- W osobnym, kontrolowanym kroku wyczyść sekret z historii Git. Ta operacja
  przepisuje historię i wymaga force push, dlatego nie została wykonana
  automatycznie. GitHub zaleca najpierw rotację sekretu:
  [usuwanie danych wrażliwych z historii](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).
