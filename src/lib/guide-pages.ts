import type { FaqItem } from "@/lib/service-pages";

export interface GuidePageData {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  directAnswer: string;
  sections: Array<{ title: string; paragraphs: string[]; points?: string[] }>;
  faq: FaqItem[];
  related: Array<{ href: string; label: string }>;
}

export const guidePages: GuidePageData[] = [
  {
    slug: "ile-kosztuje-strona-internetowa-2026",
    path: "/poradniki/ile-kosztuje-strona-internetowa-2026",
    metaTitle: "Ile kosztuje strona internetowa w 2026 roku?",
    metaDescription: "Sprawdź, od czego zależy cena strony internetowej w 2026 roku, jakie elementy obejmuje wycena i jak przygotować zakres bez ukrytych kosztów.",
    eyebrow: "Koszt projektu bez zgadywania",
    title: "Ile kosztuje strona internetowa w 2026 roku?",
    lead: "Cena strony nie wynika wyłącznie z liczby podstron. Największy wpływ mają treść, funkcje, sposób edycji, integracje oraz odpowiedzialność za projekt i wdrożenie.",
    directAnswer: "Prosta strona firmowa w moim kalkulatorze zaczyna się od 600 zł. Jest to punkt startowy dla niewielkiego zakresu, a nie uniwersalna cena końcowa. Projekt z CMS, dodatkowymi formularzami, rozbudowaną treścią, animacjami, integracjami albo indywidualnym panelem kosztuje więcej, ponieważ wymaga dodatkowego projektu, kodu i testów.",
    sections: [
      {
        title: "Co realnie wpływa na cenę strony?",
        paragraphs: ["Najpierw ustalam, co użytkownik ma zrobić na stronie i jakie informacje są potrzebne do podjęcia decyzji. Dopiero z tej ścieżki wynika liczba widoków, sekcji i funkcji.", "Dwie strony z taką samą liczbą podstron mogą mieć zupełnie inny koszt. Jedna korzysta z gotowych treści i prostego formularza, druga wymaga strategii informacji, panelu edycji, integracji z CRM oraz kilku wersji językowych."],
        points: ["zakres projektu UX/UI i liczba unikalnych widoków", "przygotowanie lub uporządkowanie treści", "CMS, logowanie, płatności i integracje API", "liczba formularzy, automatyzacji oraz wiadomości", "migracja danych i przekierowania ze starej strony", "testy dostępności, wydajności i bezpieczeństwa"],
      },
      {
        title: "Co powinno znaleźć się w dobrej wycenie?",
        paragraphs: ["Wycena powinna opisywać rezultat, zakres oraz granice odpowiedzialności. Sama pozycja „strona internetowa” nie wyjaśnia, czy cena obejmuje projekt, wersję mobilną, treści, analitykę, domenę i wsparcie po publikacji."],
        points: ["lista widoków i funkcji", "zakres wersji mobilnej oraz dostępności", "sposób edycji treści", "integracje i usługi zewnętrzne", "testy, publikacja i okres poprawek", "koszty cykliczne hostingu, domeny lub operatorów"],
      },
      {
        title: "Jak ograniczyć koszt bez obniżania jakości?",
        paragraphs: ["Najlepszym sposobem jest podział na wersję pierwszą i dalszy rozwój. Pierwsze wdrożenie powinno zawierać wszystko, co potrzebne do realizacji najważniejszego celu, ale nie każdą funkcję, która może kiedyś się przydać.", "Pomaga również dostarczenie uporządkowanych treści, zdjęć i decyzji po jednej stronie klienta. Mniej niejasności oznacza mniej powrotów do już zatwierdzonych etapów."],
      },
      {
        title: "Cena wykonania a koszt utrzymania",
        paragraphs: ["Poza jednorazowym wykonaniem należy uwzględnić domenę, hosting, pocztę, płatne usługi zewnętrzne oraz aktualizacje. Dla statycznej strony koszty utrzymania mogą być bardzo niskie. Aplikacja z bazą, wiadomościami i płatnościami wymaga większej infrastruktury oraz monitorowania."],
      },
    ],
    faq: [
      { question: "Czy 600 zł to końcowa cena każdej strony?", answer: "Nie. To punkt startowy najprostszego zakresu w kalkulatorze. Dokładna cena powstaje po ustaleniu treści, liczby widoków, funkcji, integracji i sposobu wdrożenia." },
      { question: "Czy domena i hosting są w cenie?", answer: "Konfiguracja może być częścią realizacji, ale opłaty operatora domeny i hostingu są kosztami właściciela strony. Przed rozpoczęciem wskazuję, które koszty będą jednorazowe, a które cykliczne." },
      { question: "Czy przygotowanie treści zwiększa cenę?", answer: "Tak, jeżeli zakres obejmuje analizę, napisanie lub rozbudowane redagowanie treści. Dostarczenie gotowych, uporządkowanych materiałów skraca pracę." },
      { question: "Czy CMS jest zawsze potrzebny?", answer: "Nie. CMS ma sens, gdy treść będzie regularnie zmieniana przez właściciela. Prosta i rzadko aktualizowana strona może działać bez panelu, co ogranicza koszt oraz powierzchnię utrzymania." },
      { question: "Czy SEO jest osobno płatne?", answer: "Techniczne podstawy SEO są częścią poprawnego wdrożenia. Rozbudowana strategia treści, regularne artykuły, analiza konkurencji i pozyskiwanie wzmianek to osobny, ciągły zakres." },
      { question: "Czy mogę rozwijać stronę etapami?", answer: "Tak. Dobrze zaplanowana wersja pierwsza może zostać rozbudowana o kolejne podstrony, funkcje, języki lub integracje, gdy pojawi się realna potrzeba." },
    ],
    related: [
      { href: "/tworzenie-stron-internetowych", label: "Tworzenie stron internetowych" },
      { href: "/poradniki/ile-trwa-tworzenie-strony-internetowej", label: "Ile trwa realizacja?" },
      { href: "/#kontakt", label: "Poproś o wycenę" },
    ],
  },
  {
    slug: "nextjs-czy-wordpress",
    path: "/poradniki/nextjs-czy-wordpress",
    metaTitle: "Next.js czy WordPress — co wybrać dla firmy?",
    metaDescription: "Praktyczne porównanie Next.js i WordPressa: koszt, edycja treści, wydajność, bezpieczeństwo, integracje i dopasowanie do rodzaju projektu.",
    eyebrow: "Narzędzie dobierane do celu",
    title: "Next.js czy WordPress — co wybrać dla strony firmowej?",
    lead: "Nie ma technologii najlepszej dla każdego projektu. WordPress i Next.js rozwiązują część podobnych problemów, ale różnią się sposobem budowy, edycji i utrzymania.",
    directAnswer: "WordPress jest rozsądnym wyborem, gdy najważniejsza jest częsta samodzielna edycja standardowych treści i można oprzeć projekt na dojrzałym ekosystemie CMS. Next.js lepiej pasuje do indywidualnego interfejsu, aplikacji, nietypowych integracji oraz sytuacji, w których kod produktu ma rosnąć razem z wymaganiami. Decyzję należy oprzeć na funkcjach i utrzymaniu, nie na samej popularności technologii.",
    sections: [
      { title: "Kiedy wybrać WordPress?", paragraphs: ["WordPress dobrze sprawdza się w serwisach treściowych, blogach i typowych stronach firmowych, gdy redaktor potrzebuje znanego panelu oraz gotowych rozszerzeń.", "Trzeba jednak kontrolować jakość motywu i wtyczek, aktualizacje oraz uprawnienia. Duża liczba przypadkowych dodatków może utrudnić wydajność i bezpieczeństwo."], points: ["regularna samodzielna publikacja treści", "standardowa strona lub blog", "zespół zna już panel WordPress", "funkcje są dostępne w dobrze utrzymanych rozszerzeniach"] },
      { title: "Kiedy wybrać Next.js?", paragraphs: ["Next.js jest dobrym wyborem dla indywidualnych produktów, paneli i serwisów wymagających ścisłej kontroli interfejsu, danych oraz renderowania. Pozwala połączyć część serwerową i frontend w jednym projekcie TypeScript.", "Treści nadal mogą być edytowane przez CMS — Next.js nie oznacza rezygnacji z panelu. CMS może działać jako osobna, kontrolowana warstwa danych."], points: ["niestandardowe funkcje i przepływy użytkownika", "integracje z API, bazą i logowaniem", "wysoka kontrola wydajności oraz kodu", "planowany rozwój w kierunku aplikacji webowej"] },
      { title: "Wydajność i SEO", paragraphs: ["Obie technologie mogą osiągać dobre wyniki SEO i Core Web Vitals. O rezultacie decydują implementacja, treść, obrazy, hosting oraz liczba skryptów, a nie sama etykieta frameworka.", "Next.js udostępnia renderowanie serwerowe, statyczne strony, metadane i optymalizację zasobów. WordPress ma dojrzałe narzędzia redakcyjne oraz wtyczki SEO, ale wymaga kontroli motywu i dodatków." ] },
      { title: "Bezpieczeństwo i utrzymanie", paragraphs: ["Każdy system wymaga aktualizacji i dobrych praktyk. W WordPressie szczególne znaczenie ma aktualność rdzenia, motywu i wtyczek. W Next.js trzeba aktualizować zależności, chronić serwerowe operacje i poprawnie zarządzać sekretami oraz autoryzacją.", "Najbezpieczniejszy jest nie ten system, który ma lepszą opinię, lecz ten, którego zakres jest ograniczony, zależności kontrolowane, a proces aktualizacji faktycznie wykonywany."] },
    ],
    faq: [
      { question: "Czy Next.js jest lepszy od WordPressa?", answer: "Nie w każdym projekcie. Next.js daje większą swobodę kodu i integracji, a WordPress szybszy dostęp do dojrzałego CMS oraz typowych funkcji treściowych." },
      { question: "Czy Next.js może mieć panel do edycji treści?", answer: "Tak. Można połączyć go z własnym panelem lub zewnętrznym headless CMS, dzięki czemu redaktor edytuje treść bez zmiany kodu." },
      { question: "Które rozwiązanie jest tańsze?", answer: "Dla prostej strony opartej na dobrym gotowym zakresie WordPress może być tańszy na start. Przy nietypowych funkcjach koszt wielu rozszerzeń i ich utrzymania może zmienić to porównanie." },
      { question: "Które rozwiązanie jest szybsze?", answer: "Oba mogą być szybkie. Next.js ułatwia precyzyjną kontrolę renderowania, ale źle zbudowana aplikacja także będzie wolna. W WordPressie kluczowe są motyw, wtyczki, cache i hosting." },
      { question: "Które rozwiązanie jest bezpieczniejsze?", answer: "Bezpieczeństwo zależy od implementacji i utrzymania. WordPress wymaga kontroli wtyczek i aktualizacji, a Next.js poprawnej walidacji, autoryzacji, aktualnych zależności i ochrony sekretów." },
      { question: "Czy można przenieść WordPressa do Next.js?", answer: "Tak. Można zachować WordPress jako headless CMS albo przenieść treść do innego systemu. Migracja wymaga mapy adresów, zachowania SEO, obrazów i przekierowań." },
    ],
    related: [
      { href: "/nextjs-developer", label: "Usługi Next.js" },
      { href: "/tworzenie-stron-internetowych", label: "Tworzenie stron" },
      { href: "/poradniki/ile-kosztuje-strona-internetowa-2026", label: "Koszt strony w 2026" },
    ],
  },
  {
    slug: "ile-trwa-tworzenie-strony-internetowej",
    path: "/poradniki/ile-trwa-tworzenie-strony-internetowej",
    metaTitle: "Ile trwa tworzenie strony internetowej?",
    metaDescription: "Dowiedz się, ile trwa wykonanie strony firmowej, co wpływa na termin i jak przygotować materiały, aby projekt przebiegał sprawnie.",
    eyebrow: "Realny harmonogram projektu",
    title: "Ile trwa stworzenie strony internetowej?",
    lead: "Termin zależy bardziej od zakresu, treści i szybkości decyzji niż od samego pisania kodu. Mała strona może powstać szybko, a rozbudowany serwis wymaga analizy, iteracji i testów.",
    directAnswer: "Prosta strona firmowa zwykle wymaga około 1–3 tygodni pracy od potwierdzenia zakresu i otrzymania materiałów. Rozbudowany serwis, sklep albo aplikacja może zająć od kilku tygodni do kilku miesięcy. Dokładny termin ustalam dopiero po podziale projektu na widoki, funkcje, treści, integracje i etapy akceptacji.",
    sections: [
      { title: "Jak wygląda typowy harmonogram?", paragraphs: ["Projekt zaczyna się od krótkiej analizy celu, odbiorców i materiałów. Następnie powstaje struktura informacji, kierunek wizualny, wdrożenie, testy i publikacja.", "Etapy mogą częściowo nakładać się na siebie, ale nie warto zaczynać finalnego interfejsu bez podstawowych treści. Projektowanie na tekście zastępczym często kończy się przebudową sekcji."], points: ["analiza i zakres: 1–3 dni robocze", "struktura i kierunek wizualny: kilka dni", "wdrożenie: zależnie od liczby widoków i funkcji", "testy, poprawki i publikacja: zwykle kilka dni"] },
      { title: "Co najczęściej opóźnia projekt?", paragraphs: ["Największe opóźnienia zwykle nie wynikają z technologii. Powstają wtedy, gdy brakuje treści, nie ma jednej osoby decyzyjnej albo w trakcie realizacji zmienia się cel i zakres."], points: ["brak tekstów, zdjęć lub danych firmowych", "wiele sprzecznych osób akceptujących", "nowe funkcje dodawane bez aktualizacji terminu", "oczekiwanie na dostęp do domeny i usług", "zewnętrzne integracje bez dokumentacji lub kont testowych"] },
      { title: "Jak przyspieszyć realizację?", paragraphs: ["Przed startem warto przygotować ofertę, dane kontaktowe, identyfikację, przykłady estetyki i osobę odpowiedzialną za decyzje. Nie muszą to być idealne materiały — ważne, aby były kompletne i możliwe do oceny.", "Pomaga także akceptowanie projektu etapami. Zatwierdzona struktura, następnie styl i dopiero kolejne widoki ograniczają powrót do podstawowych decyzji pod koniec pracy." ] },
      { title: "Czy szybciej zawsze znaczy lepiej?", paragraphs: ["Nie. Bardzo krótki termin może wymusić ograniczenie zakresu, użycie gotowych rozwiązań lub równoległe podejmowanie decyzji. Jeżeli data publikacji jest sztywna, uczciwym rozwiązaniem jest mniejsza wersja pierwsza i rozwój po uruchomieniu." ] },
    ],
    faq: [
      { question: "Czy strona może powstać w tydzień?", answer: "Tak, jeśli zakres jest niewielki, treści są gotowe, decyzje szybkie, a potrzebne funkcje standardowe. Termin musi obejmować także testy i publikację." },
      { question: "Od kiedy liczy się termin realizacji?", answer: "Od potwierdzenia zakresu, dostarczenia niezbędnych materiałów i spełnienia ustalonych warunków rozpoczęcia. Samo pierwsze zapytanie nie uruchamia harmonogramu." },
      { question: "Czy przygotowanie tekstów jest częścią terminu?", answer: "Tak, jeśli teksty powstają w ramach zlecenia. Gdy dostarcza je klient, harmonogram zakłada konkretną datę ich przekazania." },
      { question: "Ile trwa stworzenie sklepu internetowego?", answer: "Zwykle dłużej niż strony firmowej, ponieważ trzeba przygotować produkty, warianty, płatności, dostawę, wiadomości, dokumenty i testy zamówień. Dokładny czas zależy od modelu sprzedaży." },
      { question: "Czy poprawki wydłużają termin?", answer: "Uzgodniona liczba rund poprawek jest częścią harmonogramu. Zmiana zaakceptowanego kierunku albo dodanie nowego zakresu wymaga aktualizacji terminu." },
      { question: "Co muszę przygotować przed startem?", answer: "Opis firmy, ofertę, cel strony, dane kontaktowe, logo i zdjęcia, jeśli są dostępne. Przydatne są też przykłady stron oraz wskazanie jednej osoby podejmującej decyzje." },
    ],
    related: [
      { href: "/tworzenie-stron-internetowych", label: "Tworzenie stron internetowych" },
      { href: "/poradniki/ile-kosztuje-strona-internetowa-2026", label: "Ile kosztuje strona?" },
      { href: "/#kontakt", label: "Zapytaj o termin" },
    ],
  },
];

export function getGuidePage(slug: string) {
  return guidePages.find((page) => page.slug === slug);
}
