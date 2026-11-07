# Przegląd treści, pamięci i metadanych — 7 listopada 2026

## Ustalenia
Podczas kontroli publiczny serwer głównej strony zwracał już nowy opis VIP Transfery i etykietę „Strona ofertowa”. Usługi w bazie zawierały poprawione opisy, bez wskazanych zapewnień. Nie odtworzono więc starych treści na głównej w tym pomiarze. Potwierdzono natomiast dziedziczenie metadanych strony głównej w katalogu realizacji i niepełne metadane oferty.

Poprzedni obraz OG miał 54 204 bajty i SHA256 zaczynający się od f070eef53ef7b632; nowy ma 78 070 bajtów i 9dac8276b3a988b6. Nowa grafika była opublikowana, ale automatyczna konwencja `app/opengraph-image.jpg` nadpisywała jawne ustawienia obrazu. Obecnie źródłem jest `/og/strony-i-aplikacje-9dac8276.jpg`, a dawny adres przekierowuje do niego. Aktualny adres z wersją trafia do OG i Twittera.

## Poprawki
- Każda publiczna podstrona otrzymuje własny tytuł, opis, adres i komplet obrazów OG/Twitter. Statyczne strony korzystają z `createPageMetadata`, a strony realizacji i poradników zachowują metadane dynamiczne.
- Główna strona i wspólne dane katalogu/usług odświeżają się co 60 s. Edycja ceny w panelu natychmiast unieważnia również dane usług; edycje projektów zachowują istniejące unieważnianie tagu oraz wszystkich widoków. Nowa wersja klucza wymusza pierwszy odczyt poprawionych treści podczas wdrożenia.
- Przestrzenie między wierszami nagłówków są rzeczywistymi węzłami tekstowymi, także w nagłówku „Wybierz, czego potrzebujesz”.
- Osiem realizacji ma zredagowane opisy lub pola z wynikami. Fundacja i Dmuchańce są stronami internetowymi. Własny projekt nazywa się „Strona ofertowa i lekki CMS — Emanuel Włoch”; adres pozostaje dotychczasowy.
- Usunięto nieudokumentowane deklaracje Lighthouse, wzrostu kontaktów i pełnego działania systemów. Opinie klientów pozostały dosłowne. Dmuchańce i BCC zachowują status testowy; panel i obsługa wydarzeń nie są prezentowane jako potwierdzone funkcje.
- Opis oraz pole strony repozytorium wskazują bieżącą ofertę i domenę emanuelwloch.pl.

## Dane i powtarzalność
`scripts/review-project-copy.mjs` domyślnie pokazuje zakres i przygotowuje lokalną kopię rekordów. `--apply` zapisuje wyłącznie wskazane pola z `scripts/data/project-copy-review-2026-11-07.json` w transakcji, ze sprawdzeniem niezmienionych wartości przed zapisem. Ceny, slugi, flagi publikacji, statusy i opinie nie są zmieniane. Wpisywane są daty aktualizacji opisów. Oryginały są lokalnie w ignorowanym `.debug`.

## Weryfikacja
`node scripts/verify-public-release.mjs http://localhost:3000` oraz `node scripts/verify-public-release.mjs https://emanuelwloch.pl` kontrolują wyrenderowany HTML, kompletność i zgodność OG/Twittera, adresy podstron, etykiety realizacji, nagłówek usług, plik OG i przekierowanie dawnego obrazu. Raporty zapisują się w `.debug/public-release-*.json`.

To sprawdzenie nie potwierdza działania zaplecza BCC, Dmuchańców ani Mototrasy. Nie wykonuje rzeczywistych rezerwacji, płatności lub wysyłki formularzy. Źródła innych projektów, w tym Solid Print, pozostają bez zmian.
