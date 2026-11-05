# Uzupełnienie realizacji i portret w hero — 05.11.2026

## Materiały

Dodano trzy projekty: sklep demonstracyjny, COCO oraz WARDOGS Companion. Rozbudowano istniejący Solid Print, zachowując jego identyfikator, odnośnik i status wersji testowej. Każdy z czterech wpisów ma po dwa rzeczywiste zrzuty, osobne opisy alternatywne, wyzwanie, zakres, technologie i rezultat.

- Sklep: uruchomiono źródła z D:/SklepInternetowy na osobnej lokalnej bazie. Katalog oraz panel produktów po logowaniu na konto demonstracyjne. Zdjęcia katalogu są zastępcze, produkty i ceny przykładowe. Wykryto niespójność koszyka gościa: po potwierdzeniu dodania widok pozostał pusty. Płatności w kodzie są symulowane; nie potwierdzono rzeczywistej integracji KSeF ani dostaw. Wpis wyraźnie opisuje ograniczenia MVP.
- COCO: lokalnie uruchomiony tryb demo z sześcioma fikcyjnymi kanałami. Rzeczywisty układ 1920 × 1080 w pomniejszonym podglądzie; kadry pomijają osobisty nagłówek. Lista kanałów i mapa pilota. Nie przeprowadzono nowego testu na fizycznym TV ani weryfikacji dostępu do komercyjnych kanałów.
- WARDOGS: rzeczywiste widoki WPF zbudowane przez osobny podgląd w .debug. Osobna baza i fikcyjny profil, brak odczytu prywatnej historii i uruchamiania synchronizacji. Wyłączono zapisywanie ustawień przy zamknięciu podglądu. Zrzuty pokazują panel i analizę dni; nazwy gry i materiały gry pozostają własnością ich właścicieli.
- Solid Print: zrzuty aktualnej działającej wersji testowej strony głównej i formularza wyceny. Nie wysyłano zapytania, nie testowano poczty ani płatnych zamówień. Nie zmieniano źródeł Solid Print.

Nie dodawano wymyślonych dat ukończenia, opinii, wyników sprzedaży ani pomiarów wydajności. Nie publikowano aplikacji z prywatnymi konfiguracjami i zdjęć rodzinnych.

## Strona

Rzeczywisty portret public/emanuel_wloch.jpg jest dekoracyjnym tłem lewej części hero: 13% przezroczystości na komputerze, 9% na telefonie, monochromatyczny obraz i gradient. Bez dodatkowej animacji. Sprawdzono widok desktop oraz statyczny układ 390 px (nie fizyczny iPhone).

Dodano kategorię aplikacji TV i Windows w katalogu i panelu. Te realizacje nie trafiają do filtra stron internetowych. Galeria pozwala powiększyć drugie zdjęcie i wrócić strzałką do pierwszego. Poprawiono pozycjonowanie obrazów w przyciskach galerii.

Cache listy projektów uwzględnia identyfikator bazy, aby lokalny podgląd i produkcja nie używały tych samych rekordów.

## Publikacja

Źródło opisów: content/portfolio-projects.json. Kontrolowana publikacja: scripts/publish-portfolio-projects.mjs. Domyślnie tylko podgląd, --apply wykonuje transakcję. Przed publikacją wymaga dostępności wszystkich obrazów na domenie i zapisuje lokalną kopię poprzednich czterech rekordów w .debug. Istniejące identyfikatory są zachowywane. Tryb --local-preview działa wyłącznie na osobnej bazie podglądu.

Lokalnie: lint, typy, 72 testy w 19 plikach i build zakończone powodzeniem. Galeria oraz filtr sprawdzone w przeglądarce. Weryfikacja produkcji jest osobnym krokiem po wdrożeniu.

Obrazy wdrożono przed zmianą katalogu. Następnie opublikowano trzy nowe wpisy i zaktualizowano istniejący Solid Print w jednej transakcji. Katalog zawiera 12 realizacji. Zmieniono wersję cache po publikacji, aby od razu zbudować strony nowych projektów oraz aktualny sitemap.
