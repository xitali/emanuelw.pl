# Przegląd paczki Claude’a i projektów do portfolio — 05.11.2026

## Co sprawdzono

Źródło: `C:/Users/emanu/Downloads/emanuelwloch.pl`, w szczególności PLAN_PREMIUM_REDESIGN.md, portfolio.css, premium.css, ikony i zasoby PWA. Porównanie z bieżącym kodem w D:/emanuelwloch.pl. To przegląd plików i dotychczasowych testów; nie zastępuje testów każdego projektu na urządzeniu.

## Kolorystyka

W sekcji 0 planu Claude zapisał: „nie zmieniam palety — dopracowuję ją”. W obu wersjach podstawowe tokeny są identyczne: grafit #0b0d0f, powierzchnie #13171a, tekst #efefea, akcent #acd1e8, pochodny błękit #7fb4d6, Geist i Geist Mono. Inaczej wyglądające kolory w nieużywanych starszych komponentach nie stanowią palety bieżącej strony.

Sprawdzono zgodność 10 plików ikon/PWA i zestawu icons.tsx — zawartość jest identyczna z paczką. premium.css różni się dodatkową regułą globalnego zatrzymania animacji. Nie pominięto nowej palety; paczka nie zawiera osobnej nowej palety dla aktywnej strony. Sprawdzono również trzy archiwa ZIP o nazwach emanuel* w Pobranych — mają te same podstawowe tokeny. Grafika Plan przebudowy Premium Motion.png jest ilustracją z mocniejszym światłem i inną kompozycją; sama również podaje te same kolory. Jej podgląd laptopa nie jest dokładnym zrzutem zakodowanego hero.

## Zalecenia i stan

| Element paczki | Stan |
|---|---|
| GSAP, ScrollTrigger, SplitText, wspólne krzywe | Wdrożone. Zachowane maskowane wejścia, obsługa tras i sprzątanie po zmianie strony. |
| Własne ikony, favicon, ikony iOS/Android, manifest | Wdrożone; 10 zasobów i icons.tsx porównano bajt po bajcie. |
| Spotlight, tilt, przyciski, nawigacja, oprawa sekcji | Wdrożone przez premium.css i MotionLayer. Wspólna oprawa jest ładowana także w PublicPageShell podstron. |
| Reduced motion i przełącznik ruchu | Wdrożone i rozszerzone o współdzielony stan. Test przełącznika oraz test awarii WebGL przechodzą. |
| Pas technologii na głównej | Kod zachowany, ale pas usunięto z głównego ciągu zgodnie z później zaakceptowanym planem: oferta przed technologiami, warsztat w rozwijanych szczegółach. |
| Hero i kolejność sekcji | Świadomie zmienione według późniejszego planu użytkownika: etapy pracy, 220svh na komputerze, bez długiego sticky na telefonie. |
| Nowe grafiki udostępniania | Wdrożone; nowy przekaz ofertowy, portret i znak marki w dwóch grafikach OG. |
| Wideo-podglądy projektów | Istnieją w kartach realizacji. Osobna reklama brag jest osadzona przy procesie współpracy, odtwarzana na żądanie. |
| Testy i build, których Claude nie uruchomił | Wykonane: lint, typy, 62 testy i build. Produkcja oraz CI pierwszego wydania potwierdzone. |
| Lighthouse mobile | Brak aktualnego pomiaru Lighthouse w tym przeglądzie; nie podajemy wyniku 100/100 ani nie zastępujemy pomiaru wynikiem buildu. |
| Lenis, View Transitions i jasny motyw | Niewdrożone. W dokumencie są opisane jako dalsze kroki poza paczką, a nie gotowe zmiany. |
| Usunięcie starych komponentów | Nie wykonano zbiorczego usuwania. Wymaga osobnego sprawdzenia importów; obecny frontend nie korzysta z wymienionych starych sekcji. |

## Reklama

Finalny przekaz wprost obejmuje strony dla firm i aplikacje webowe. Całe ekrany, duże hasła, rzeczywiste realizacje, portret i imię oraz nazwisko. Solid Print zachowuje etykietę wersji testowej. Bez niepotwierdzonych procentów wzrostu, gwarantowanych wyników sprzedaży, rankingów SEO i deklaracji 100/100 Performance.

W katalogu brag-output istnieją późniejsze szkice z takimi liczbami. Nie stanowią dowodu wyników i nie zostały przeniesione do publikowanej reklamy. Szkice pozostają zachowane. Publikowane źródła i licencje: marketing/launch-2026-11. Pełny projekt z mediami: D:/Agent-Tools/productions/emanuelwloch-20261104.

## Projekty z D: — rekomendowana kolejność

| Priorytet | Projekt | Co pokazuje potencjalnemu klientowi | Jak przedstawić |
|---|---|---|---|
| 1 | SklepInternetowy | Katalog, koszyk, zamówienia, panel klienta i administratora, import produktów. Najlepiej uzupełnia ofertę e-commerce. | Jako funkcjonalne demo/MVP. W kodzie /api/payments nadal jest symulacja płatności; nie przedstawiać jako sklep obsługujący rzeczywiste transakcje. |
| 2 | Solid Print — już obecny | Połączenie strony oferty z katalogiem, wycenami i obsługą pracowni. Dobry dowód budowania aplikacji dla firmy. | Rozbudować istniejący opis o proces użytkownika i publiczne funkcje; nie tworzyć duplikatu. Zachować status testowy i udokumentowane braki. |
| 3 | COCO | Interfejs TV, obsługa pilota, EPG, integracje, cache i odtwarzanie. Dowód umiejętności wykraczających poza strony. | Osobny projekt techniczny; pokazać tryb demo na legalnych strumieniach testowych, bez prywatnych playlist i danych kont. Nie przedstawiać wszystkich integracji jako zweryfikowanych w tym przeglądzie. |
| 4 | Wardogs Companion | Praca z danymi, porównania, filtrowanie, wykresy i aplikacja Windows. | Niżej w katalogu lub w kategorii „Narzędzia i aplikacje”. Opisać autorski interfejs i logikę; grafiki gry nie są autorskimi materiałami wykonawcy. |
| Opcjonalnie | Familia | Galeria, synchronizacja, dopracowany interfejs mobilny i prezentacja HyperFrames. | Dopiero jako demonstracja z zastępczymi zdjęciami. Nie publikować prywatnego albumu rodziny jako dowodu realizacji. |
| Później | Camera Android | Kotlin, wideo, integracja urządzenia, interfejs Android. | Wersja demonstracyjna z ręczną konfiguracją. README wskazuje, że spersonalizowany APK zawiera dane startowe i nie powinien być publikowany. |
| Pominąć teraz | NAVI | Na razie raport wykonalności. | README potwierdza brak aplikacji i APK; nie dodawać jako wykonanej realizacji. |
| Pominąć jako produkt | instalacje ComfyUI, Hook, brag i konfiguracja serwera | To narzędzia lub konfiguracje środowiska. | Nie przedstawiać cudzych narzędzi jako własnych aplikacji. Autorskie wdrożenie lub integrację można później opisać jako osobny zakres prac. |

Rekomendacja dla strony głównej: utrzymać czytelne realizacje firmowe i jeden dobry przykład aplikacji. Więcej projektów pokazać w katalogu. Samo zwiększenie liczby kafelków nie zastąpi opisu problemu, zakresu prac i działającego efektu.

Nie dodawano automatycznie nowych projektów do publicznego portfolio — użytkownik poprosił o rekomendację. Opisy powyżej wynikają z aktualnych README oraz wskazanych fragmentów kodu; nie uruchamiano wszystkich aplikacji w ramach tego przeglądu.
