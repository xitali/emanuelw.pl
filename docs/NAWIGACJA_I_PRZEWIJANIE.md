# Pozycja strony przy nawigacji

Wspólny komponent NavigationScroll w głównym layoucie obsługuje linki, przejścia Next.js i historię przeglądarki.

- Inna podstrona: początek dokumentu, bez odziedziczenia pozycji poprzedniej strony.
- Link do sekcji: sekcja poniżej stałego menu, z dodatkowym odstępem 16 px. Obsługiwane są linki z podstron, linki bezpośrednie oraz odnośnik pomijający nawigację.
- Wstecz/Dalej: pozycja konkretnego wpisu historii, również gdy ten sam adres odwiedzono kilka razy.
- Filtry w tym samym katalogu: zachowanie kontekstu przewinięcia.
- Odświeżenie: ostatnia pozycja bieżącego wpisu. Nowa karta zaczyna od początku albo wskazanej sekcji.
- Przyciski uzupełniające kontakt: wspólny offset menu, zachowane wstępne uzupełnianie i ustawianie fokusu.

Historia Next.js zachowuje wszystkie własne pola. Dodawany jest wyłącznie identyfikator ewScrollEntry. Maksymalnie 80 pozycji x/y jest przechowywanych lokalnie w sessionStorage tej karty; nie zapisuje się formularzy ani danych osobowych i nic nie jest wysyłane na serwer. Gdy magazyn jest zablokowany, działa pamięć bieżącego dokumentu.

Przywracanie uwzględnia zmiany wysokości dokumentu i ładowanie fontów przez maksymalnie 1,8 s. Ręczny scroll, dotyk, kliknięcie lub klawisz nawigacyjny przerywa korektę. Linki zewnętrzne, pliki do pobrania i otwieranie nowej karty nie są przechwytywane. Ustawienie ograniczonego ruchu pozostaje respektowane.

Testy regresji obejmują historię osobnych wpisów, sekcje/fokus, filtr, korektę przewijania Next.js, odświeżenie, przerwanie ręczne i ponowne montowanie w trybie Strict Mode. W przeglądarce sprawdzono przejścia do usług i realizacji, powtarzane Wstecz/Dalej, filtr katalogu oraz bezpośredni i międzystronicowy link do kontaktu.
