# Reklama premium v2 — 7 listopada 2026

Dwa osobno skomponowane filmy: poziomy 1920×1080 i pionowy 1080×1920, 25 s / 30 fps. Spokojny styl zgodny z załączonym BRAG_BRIEF.md; bez lektora. Zawierają prawdziwe realizacje, portret i podpis autora oraz dosłowny fragment publicznej opinii.

Edytowalne HTML/GSAP zapisano obok. Pełne źródła z lokalnymi fontami, mediami i audio: `D:/emanuelwloch.pl/brag-output-2026-11-07-0148/zrodla-reklamy.zip`. W tym folderze znajdują się również oba gotowe MP4, plakaty JPG, plan, brief i tekst publikacji. Ciężkie pliki i pamięć robocza nie trafiają do Git. `published-media.json` zawiera publiczne adresy filmu i plakatów.

Podgląd pełnego projektu: `npx hyperframes preview <folder-kompozycji>`. Możesz też edytować go w aplikacji HyperFrames desktop. Kontrola: `npx hyperframes check <folder-kompozycji> --json`; render: `npx hyperframes render <folder-kompozycji> --quality delivery`. Po renderze klatkę zero zastąpiono plakatem z 1,5 s, zachowując pozostałe 749 klatek, 25 s i oryginalną ścieżkę audio.

Kontrola obrazu: wszystkie sceny w podglądzie oraz kluczowe klatki z rzeczywistych MP4. Kontrola dźwięku: obecność AAC, czas, brak przesterowania, średnia i szczyt. Odsłuch na fizycznym urządzeniu pozostaje po stronie właściciela. Licencje i tekst publikacji znajdują się obok.

## Zmiany strony z paczki
Przeniesiono fonty Bricolage Grotesque i Instrument Serif, stalowy błękit, poprawkę wordmarku, zapas na polskie znaki w maskach nagłówków, spokojne podglądy bez podwójnego przechylania i redakcyjny układ wyróżnionej realizacji. Zachowano aktualny panel, sesje, zarządzanie przewijaniem, cztery sceny hero i większy tekst podstawowy 16 px.

`scripts/update-public-copy-v2.mjs` to przejrzana migracja opisów 8 usług i etykiet 2 realizacji: domyślnie podgląd, `--apply` zapisuje atomowo po lokalnej kopii i sprawdzeniu niezmienionych rekordów. Nie zmienia cen, opinii ani statusu publikacji. Źródłowego projektu Solid Print nie modyfikowano.

Po migracji podniesiono wersję klucza pamięci opisów usług i projektów, aby nowe treści pokazały się od razu po wdrożeniu. Ceny i dane właściciela pozostały niezmienione.
