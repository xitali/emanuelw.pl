# Spójny panel, hero i język oferty — 05.11.2026

## Zmiany

- Panel WWW, logowanie, formularze, zakładki, wykres i okna edycji używają wspólnej palety strony: grafit, ciepła biel, błękit i Geist. Motyw panelu nie zależy już od dawnego przełącznika jasny/ciemny.
- Jeden pełny ekran przeglądarki przechodzi od planu oferty do projektu, funkcji i gotowej strony z telefonem. Nie ma sześciu pustych prostokątów, ukośnych siatek ani orbit. Moduły pojawiają się dopiero na etapie realizacji.
- Treści oferty, procesu, kontaktu, informacji o wykonawcy i sześciu podstron usług zwracają się do klienta. Wyjaśniają potrzebę, zakres, decyzje i to, co otrzyma. Pozostawiono autorskie opinie i historyczne dane realizacji; nie dopisywano wyników biznesowych.
- Panel: czytelne nazwy czynności, rozwijane dodatkowe pola realizacji, etykiety formularzy, nazwy przycisków ikonowych i powrót fokusu po zamknięciu okna. Tab i Shift+Tab pozostają w oknie edycji.
- Nie zmieniono cen, produkcyjnego hasła ani projektu Solid Print.

## Weryfikacja lokalna

- Lint, typy, 63 testy w 17 plikach i build: zakończone powodzeniem.
- Przeglądarka desktop: obejrzano wszystkie cztery etapy animacji, brak poziomego przewijania, przełącznik ograniczenia ruchu zastępuje canvas ilustracją i zachowuje cztery opisy.
- Test awarii WebGL przechodzi. Po zmianie podstrony widok usługi działa; powrót i ponowne włączenie ruchu były sprawdzane w lokalnym podglądzie.
- Rzeczywiste logowanie, dodanie i edycja realizacji: wyłącznie oddzielna lokalna baza `.debug/design-preview.db`, bez zmieniania produkcyjnego konta. Zapis potwierdzony w widoku panelu, fokus wraca do przycisku otwierającego.
- Kontrola szerokości 390 px: podgląd wygenerowanego HTML w ramce z rzeczywistymi stylami, brak poziomego przewijania i długiego przyklejonego hero. Ten podgląd nie potwierdza animacji na fizycznym iPhonie. Pełna animacja mobilna i obsługa dotykowa na rzeczywistym urządzeniu pozostają niezweryfikowane w tej sesji.
- Brak zmiany plików środowiskowych, sekretów, oryginalnych reklam lub innych projektów. Katalog `brag-output` pozostaje poza commitem.

Wynik publikacji należy potwierdzić osobno w GitHub CI, Vercel i na domenie; sam build lokalny nie potwierdza wdrożenia.
