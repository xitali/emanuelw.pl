# Emanuel Admin na Androida

To prywatna, instalowalna aplikacja PWA. Nie wymaga Google Play, Firebase,
Android Studio ani płatnego abonamentu.

## Instalacja na telefonie

1. Otwórz Chrome na Androidzie.
2. Wejdź na `https://emanuelwloch.pl/admin`.
3. Zaloguj się swoim hasłem administratora.
4. Naciśnij `Zainstaluj aplikację`.
5. Jeżeli Chrome nie pokaże okna instalacji:
   - naciśnij trzy kropki `⋮`,
   - wybierz `Zainstaluj aplikację` albo `Dodaj do ekranu głównego`,
   - potwierdź.
6. Otwórz ikonę `Emanuel Admin` z ekranu telefonu.
7. Naciśnij `Włącz powiadomienia`.
8. Gdy Android zapyta o zgodę, naciśnij `Zezwól`.
9. Naciśnij `Wyślij test`.

Po dotknięciu powiadomienia aplikacja otwiera kartę `Wiadomości`. Jeżeli sesja
administratora wygasła, najpierw pojawi się ekran logowania.

## Konfiguracja serwera

W Vercel muszą istnieć trzy zmienne:

- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`,
- `VAPID_PRIVATE_KEY`,
- `VAPID_SUBJECT`.

Klucze lokalne tworzy polecenie:

```powershell
npm run push:setup
```

Prywatnego klucza nie wolno umieszczać w GitHubie, wiadomości e-mail ani
zrzutach ekranu.
