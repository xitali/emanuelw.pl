export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServicePageData {
  slug: string;
  path: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  directAnswer: string;
  serviceType: string;
  areas: string[];
  idealFor: string[];
  benefits: Array<{ title: string; description: string }>;
  deliverables: string[];
  process: Array<{ title: string; description: string }>;
  faq: FaqItem[];
  related: Array<{ href: string; label: string }>;
}

export const servicePages: ServicePageData[] = [
  {
    slug: "tworzenie-stron-internetowych",
    path: "/tworzenie-stron-internetowych",
    shortName: "Strony internetowe",
    metaTitle: "Tworzenie stron internetowych dla firm",
    metaDescription:
      "Projektuję szybkie i skuteczne strony internetowe dla firm. Responsywność, SEO techniczne, formularze, CMS i wdrożenie w jednym procesie.",
    eyebrow: "Strony firmowe i landing pages",
    title: "Tworzenie stron internetowych, które wspierają sprzedaż",
    lead:
      "Projektuję i wdrażam strony firmowe, landing pages oraz serwisy, które jasno prezentują ofertę, szybko działają i prowadzą użytkownika do kontaktu.",
    directAnswer:
      "Dobra strona firmowa powinna w kilka sekund wyjaśnić, czym zajmuje się firma, komu pomaga i co użytkownik ma zrobić dalej. W ramach realizacji przygotowuję strukturę informacji, responsywny interfejs, SEO techniczne, formularze oraz publikację na docelowej domenie.",
    serviceType: "Projektowanie i tworzenie stron internetowych",
    areas: ["Jarosław", "Rzeszów", "Podkarpackie", "Polska"],
    idealFor: [
      "firm usługowych potrzebujących profesjonalnej obecności w sieci",
      "marek, których obecna strona jest wolna lub nieczytelna",
      "nowych usług i kampanii wymagających dedykowanego landing page’a",
    ],
    benefits: [
      {
        title: "Czytelna oferta",
        description:
          "Porządkuję treść i hierarchię strony tak, aby klient szybko zrozumiał wartość usługi.",
      },
      {
        title: "SEO od podstaw",
        description:
          "Przygotowuję metadane, semantyczne nagłówki, canonicale, sitemapę i dane strukturalne.",
      },
      {
        title: "Szybkość na telefonie",
        description:
          "Optymalizuję obrazy, kod oraz sposób ładowania treści z myślą o Core Web Vitals.",
      },
      {
        title: "Gotowe wdrożenie",
        description:
          "Pomagam z domeną, HTTPS, hostingiem, analityką i uruchomieniem wersji produkcyjnej.",
      },
    ],
    deliverables: [
      "architektura informacji i plan sekcji",
      "indywidualny, responsywny interfejs",
      "formularz kontaktowy z walidacją",
      "SEO techniczne i dane strukturalne",
      "optymalizacja obrazów oraz wydajności",
      "publikacja i instrukcja dalszej obsługi",
    ],
    process: [
      {
        title: "Rozpoznanie celu",
        description:
          "Ustalam odbiorców, ofertę, najważniejsze działania użytkownika i materiały wejściowe.",
      },
      {
        title: "Struktura i projekt",
        description:
          "Buduję kolejność informacji oraz kierunek wizualny, który pasuje do marki.",
      },
      {
        title: "Kod i testy",
        description:
          "Wdrażam stronę, sprawdzam telefony, dostępność, formularze i najważniejsze ścieżki.",
      },
      {
        title: "Publikacja",
        description:
          "Konfiguruję produkcję, domenę i narzędzia potrzebne do dalszego rozwoju strony.",
      },
    ],
    faq: [
      {
        question: "Ile kosztuje stworzenie strony internetowej?",
        answer:
          "Najprostszy zakres strony firmowej w kalkulatorze zaczyna się od 600 zł. Dokładna cena zależy od liczby widoków, treści, CMS, formularzy i integracji, dlatego przed rozpoczęciem przygotowuję konkretny zakres.",
      },
      {
        question: "Ile trwa wykonanie strony firmowej?",
        answer:
          "Prosta strona zwykle wymaga kilku tygodni pracy. Termin zależy przede wszystkim od zakresu, gotowości treści oraz liczby rund akceptacji i jest ustalany przed startem.",
      },
      {
        question: "Czy strona będzie widoczna w Google?",
        answer:
          "Przygotowuję stronę do indeksowania i wdrażam SEO techniczne. Nie obiecuję konkretnej pozycji, ponieważ zależy ona również od konkurencji, jakości treści, historii domeny i linków zewnętrznych.",
      },
      {
        question: "Czy będę mógł sam edytować treści?",
        answer:
          "Tak, jeżeli projekt tego wymaga, mogę dodać panel CMS do edycji tekstów, zdjęć, usług lub aktualności bez ingerencji w kod.",
      },
      {
        question: "Czy pomagasz z domeną i hostingiem?",
        answer:
          "Tak. Mogę skonfigurować domenę, DNS, certyfikat HTTPS, hosting oraz automatyczne wdrożenia.",
      },
      {
        question: "WordPress czy Next.js — co wybrać?",
        answer:
          "Wybór zależy od sposobu edycji treści, wymaganych integracji i planów rozwoju. Nie dobieram technologii dla samej technologii — rekomenduję rozwiązanie po poznaniu celu projektu.",
      },
      {
        question: "Czy pracujesz zdalnie z firmami z całej Polski?",
        answer:
          "Tak. Działam z Jarosławia, a cały proces — konsultacje, akceptacje i wdrożenie — może odbyć się zdalnie.",
      },
    ],
    related: [
      { href: "/tworzenie-stron-internetowych-jaroslaw", label: "Strony internetowe Jarosław" },
      { href: "/tworzenie-stron-internetowych-rzeszow", label: "Strony internetowe Rzeszów" },
      { href: "/nextjs-developer", label: "Next.js developer" },
    ],
  },
  {
    slug: "tworzenie-aplikacji-webowych",
    path: "/tworzenie-aplikacji-webowych",
    shortName: "Aplikacje webowe",
    metaTitle: "Tworzenie aplikacji webowych i paneli",
    metaDescription:
      "Tworzę dedykowane aplikacje webowe, panele administracyjne i MVP: frontend, backend, baza danych, autoryzacja, testy i wdrożenie.",
    eyebrow: "Dedykowane systemy i MVP",
    title: "Aplikacje webowe dopasowane do procesu Twojej firmy",
    lead:
      "Buduję aplikacje, panele i narzędzia, które zastępują ręczną pracę, porządkują dane albo uruchamiają nowy produkt cyfrowy.",
    directAnswer:
      "Aplikacja webowa działa w przeglądarce, ale może obsługiwać logowanie, role użytkowników, bazę danych, płatności, raporty i automatyzacje. Projekt prowadzę od ustalenia modelu danych i kluczowych scenariuszy po bezpieczne wdrożenie produkcyjne.",
    serviceType: "Projektowanie i tworzenie aplikacji webowych",
    areas: ["Jarosław", "Rzeszów", "Podkarpackie", "Polska"],
    idealFor: [
      "firm zastępujących arkusze dedykowanym panelem",
      "produktów potrzebujących działającego MVP",
      "zespołów rozwijających istniejącą aplikację lub API",
    ],
    benefits: [
      {
        title: "Proces przed ekranami",
        description:
          "Najpierw opisuję role, dane i scenariusze, dzięki czemu interfejs wynika z realnej pracy użytkownika.",
      },
      {
        title: "Frontend i backend",
        description:
          "Jedna spójna implementacja obejmuje interfejs, logikę, bazę danych i integracje.",
      },
      {
        title: "Bezpieczne granice",
        description:
          "Walidacja, autoryzacja, limity żądań i kontrola dostępu są częścią architektury.",
      },
      {
        title: "Rozwój bez przepisywania",
        description:
          "Buduję moduły i schemat danych z myślą o kolejnych funkcjach, a nie jednorazowym demo.",
      },
    ],
    deliverables: [
      "mapa ról i scenariuszy użytkownika",
      "model danych i architektura aplikacji",
      "responsywny interfejs użytkownika",
      "backend, API i integracje",
      "logowanie oraz kontrola dostępu",
      "testy, wdrożenie i dokumentacja zakresu",
    ],
    process: [
      {
        title: "Analiza procesu",
        description:
          "Rozbijam pomysł na użytkowników, dane, reguły biznesowe i najważniejsze rezultaty.",
      },
      {
        title: "Zakres MVP",
        description:
          "Oddzielam funkcje konieczne na start od elementów, które można bezpiecznie dodać później.",
      },
      {
        title: "Iteracyjne wdrożenie",
        description:
          "Pokazuję działające etapy, testuję założenia i regularnie zbieram decyzje.",
      },
      {
        title: "Produkcja i rozwój",
        description:
          "Uruchamiam aplikację, monitoruję krytyczne ścieżki i planuję kolejne wersje.",
      },
    ],
    faq: [
      {
        question: "Czym aplikacja webowa różni się od zwykłej strony?",
        answer:
          "Strona przede wszystkim prezentuje informacje. Aplikacja obsługuje procesy i dane: logowanie, role, formularze, rezerwacje, raporty, płatności lub panel administracyjny.",
      },
      {
        question: "Ile kosztuje aplikacja webowa?",
        answer:
          "Kalkulator pokazuje punkt startowy od 1200 zł dla podstawowego zakresu. Rzeczywisty budżet zależy od liczby ról, ekranów, integracji, modelu danych i wymagań bezpieczeństwa.",
      },
      {
        question: "Czy możesz stworzyć najpierw MVP?",
        answer:
          "Tak. MVP powinno rozwiązywać jeden konkretny problem i pozwalać zebrać informacje od użytkowników bez budowania wszystkich przyszłych funkcji.",
      },
      {
        question: "Czy aplikacja otrzyma panel administratora?",
        answer:
          "Tak, jeżeli zarządzanie użytkownikami, treścią lub danymi jest częścią procesu, projektuję również chroniony panel administracyjny.",
      },
      {
        question: "Jak zabezpieczasz dane i logowanie?",
        answer:
          "Stosuję walidację danych, bezpieczne sesje, haszowanie haseł, kontrolę uprawnień, limity żądań i minimalny dostęp do sekretów.",
      },
      {
        question: "Czy integrujesz zewnętrzne API?",
        answer:
          "Tak. Mogę połączyć aplikację między innymi z płatnościami, pocztą, kalendarzem, mapami, magazynem plików lub systemem klienta, jeśli API na to pozwala.",
      },
      {
        question: "Czy rozwijasz istniejące aplikacje?",
        answer:
          "Tak. Przed zmianami wykonuję audyt kodu, zależności, bezpieczeństwa i modelu danych, a następnie proponuję bezpieczną kolejność prac.",
      },
    ],
    related: [
      { href: "/nextjs-developer", label: "Rozwój aplikacji Next.js" },
      { href: "/sklepy-internetowe", label: "Sklepy internetowe" },
      { href: "/tworzenie-stron-internetowych", label: "Strony firmowe" },
    ],
  },
  {
    slug: "sklepy-internetowe",
    path: "/sklepy-internetowe",
    shortName: "Sklepy internetowe",
    metaTitle: "Tworzenie sklepów internetowych",
    metaDescription:
      "Projektuję szybkie sklepy internetowe i dedykowane ścieżki zakupowe. Produkty, płatności, panel, SEO techniczne i wdrożenie.",
    eyebrow: "E-commerce i sprzedaż online",
    title: "Sklepy internetowe z prostą ścieżką do zakupu",
    lead:
      "Tworzę e-commerce, który czytelnie prezentuje produkty, ogranicza tarcie przy zakupie i jest przygotowany do mierzenia najważniejszych działań klientów.",
    directAnswer:
      "Sklep internetowy to nie tylko katalog produktów. Potrzebuje logicznych kategorii, wygodnego koszyka, bezpiecznych płatności, obsługi zamówień, SEO technicznego i dobrego działania na telefonie. Zakres dobieram do sposobu sprzedaży oraz liczby produktów.",
    serviceType: "Projektowanie i tworzenie sklepów internetowych",
    areas: ["Jarosław", "Rzeszów", "Podkarpackie", "Polska"],
    idealFor: [
      "marek rozpoczynających sprzedaż bezpośrednią",
      "firm modernizujących wolny lub nieczytelny sklep",
      "nietypowych procesów zakupowych wymagających dedykowanej logiki",
    ],
    benefits: [
      {
        title: "Zakup bez przeszkód",
        description:
          "Projektuję katalog, kartę produktu i koszyk tak, aby klient zawsze wiedział, co zrobić dalej.",
      },
      {
        title: "Bezpieczne płatności",
        description:
          "Integruję sprawdzonych operatorów płatności bez przechowywania danych kart w aplikacji.",
      },
      {
        title: "SEO produktów",
        description:
          "Dbam o indeksowalne kategorie, unikalne adresy, metadane oraz poprawną strukturę informacji.",
      },
      {
        title: "Panel i automatyzacje",
        description:
          "Ułatwiam zarządzanie ofertą i mogę połączyć sklep z powiadomieniami lub innymi systemami.",
      },
    ],
    deliverables: [
      "architektura kategorii i produktów",
      "responsywny katalog oraz karty produktów",
      "koszyk i proces składania zamówienia",
      "integracja płatności i powiadomień",
      "panel zarządzania ofertą",
      "SEO techniczne, analityka i wdrożenie",
    ],
    process: [
      {
        title: "Model sprzedaży",
        description:
          "Ustalam produkty, warianty, dostawę, płatności, dokumenty i sposób realizacji zamówień.",
      },
      {
        title: "Ścieżka klienta",
        description:
          "Projektuję odnajdywanie produktu, decyzję zakupową i finalizację zamówienia.",
      },
      {
        title: "Integracje i testy",
        description:
          "Wdrażam logikę sklepu oraz sprawdzam płatności, błędy, wiadomości i zachowanie na telefonach.",
      },
      {
        title: "Uruchomienie sprzedaży",
        description:
          "Publikuję sklep i przekazuję sposób obsługi produktów oraz zamówień.",
      },
    ],
    faq: [
      {
        question: "Ile kosztuje stworzenie sklepu internetowego?",
        answer:
          "Kalkulator pokazuje punkt startowy od 1800 zł. Dokładny koszt zależy od liczby produktów, wariantów, płatności, dostawy, panelu i integracji zewnętrznych.",
      },
      {
        question: "Czy sklep będzie działał na telefonie?",
        answer:
          "Tak. Katalog, koszyk i płatność projektuję mobile-first, ponieważ telefon jest często podstawowym urządzeniem zakupowym klienta.",
      },
      {
        question: "Jakie płatności można zintegrować?",
        answer:
          "Możliwe są między innymi Stripe, PayU lub Przelewy24. Ostateczny wybór zależy od kraju sprzedaży, modelu rozliczeń i dostępności operatora.",
      },
      {
        question: "Czy będę sam dodawać produkty?",
        answer:
          "Tak. Sklep może otrzymać panel do zarządzania produktami, cenami, zdjęciami, stanem dostępności i zamówieniami.",
      },
      {
        question: "Czy sklep może mieć warianty i promocje?",
        answer:
          "Tak. Rozmiary, kolory, warianty, kody rabatowe i reguły promocji uwzględniam w modelu produktu oraz wycenie.",
      },
      {
        question: "Czy zajmujesz się SEO sklepu?",
        answer:
          "Wdrażam techniczne podstawy SEO, strukturę kategorii i indeksowalne karty produktów. Treści produktowe oraz pozyskiwanie linków są osobnymi elementami strategii widoczności.",
      },
      {
        question: "Czy można połączyć sklep z innym systemem?",
        answer:
          "Tak, jeżeli system posiada odpowiednie API. Zakres może obejmować magazyn, fakturowanie, CRM, kurierów lub automatyczne powiadomienia.",
      },
    ],
    related: [
      { href: "/tworzenie-aplikacji-webowych", label: "Aplikacje webowe" },
      { href: "/nextjs-developer", label: "Next.js developer" },
      { href: "/tworzenie-stron-internetowych", label: "Strony internetowe" },
    ],
  },
  {
    slug: "nextjs-developer",
    path: "/nextjs-developer",
    shortName: "Next.js developer",
    metaTitle: "Next.js developer — aplikacje i audyty",
    metaDescription:
      "Next.js developer: nowe aplikacje, migracje, audyty, wydajność, bezpieczeństwo i rozwój istniejącego produktu w React i TypeScript.",
    eyebrow: "Next.js, React i TypeScript",
    title: "Next.js developer od interfejsu po produkcyjne wdrożenie",
    lead:
      "Buduję oraz modernizuję aplikacje w Next.js. Łączę Server Components, warstwę danych, bezpieczeństwo i wydajny interfejs w jedną architekturę.",
    directAnswer:
      "Pomagam zarówno przy nowej aplikacji Next.js, jak i przy istniejącym kodzie wymagającym audytu, migracji lub poprawy wydajności. Pracuję z aktualnym App Routerem, TypeScript, walidacją danych, relacyjnymi bazami i wdrożeniami Vercel.",
    serviceType: "Tworzenie i rozwój aplikacji Next.js",
    areas: ["Polska", "współpraca zdalna"],
    idealFor: [
      "produktów budowanych od początku w Next.js",
      "aplikacji wymagających migracji do App Routera",
      "zespołów potrzebujących audytu architektury lub wydajności",
    ],
    benefits: [
      {
        title: "Aktualne API",
        description:
          "Implementację opieram na dokumentacji wersji używanej w projekcie, a nie na starych wzorcach frameworka.",
      },
      {
        title: "Rozsądny rendering",
        description:
          "Rozdzielam kod serwerowy i kliencki tak, aby ograniczyć JavaScript bez utraty interaktywności.",
      },
      {
        title: "Granice bezpieczeństwa",
        description:
          "Waliduję wejście, chronię sesje i sprawdzam autoryzację po stronie serwera.",
      },
      {
        title: "Produkcja pod kontrolą",
        description:
          "Weryfikuję lint, typy, testy, build, cache i zachowanie aplikacji po wdrożeniu.",
      },
    ],
    deliverables: [
      "audyt architektury i zależności",
      "aplikacja Next.js z TypeScript",
      "Server Components i Route Handlers",
      "integracja bazy danych oraz walidacji",
      "optymalizacja Core Web Vitals",
      "testy, CI i wdrożenie produkcyjne",
    ],
    process: [
      {
        title: "Diagnoza",
        description:
          "Sprawdzam wersję Next.js, strukturę routingu, granice serwer/klient, dane i ryzyka wdrożeniowe.",
      },
      {
        title: "Plan techniczny",
        description:
          "Układam zmiany w małe etapy, które można zweryfikować bez destabilizowania produktu.",
      },
      {
        title: "Implementacja",
        description:
          "Wdrażam rozwiązanie zgodnie z dokumentacją konkretnej wersji frameworka.",
      },
      {
        title: "Kontrola produkcji",
        description:
          "Uruchamiam testy i build, a po publikacji sprawdzam prawdziwe ścieżki użytkownika.",
      },
    ],
    faq: [
      {
        question: "Czy tworzysz nowe aplikacje w Next.js?",
        answer:
          "Tak. Mogę przygotować frontend, backend w Route Handlers lub Server Actions, bazę danych, logowanie, panel i wdrożenie.",
      },
      {
        question: "Czy wykonujesz audyt istniejącego projektu Next.js?",
        answer:
          "Tak. Audyt obejmuje architekturę, bezpieczeństwo, wydajność, zależności, SEO techniczne i proces publikacji. Najpierw raportuję przyczyny, a dopiero później uzgadniam poprawki.",
      },
      {
        question: "Czy migrujesz Pages Router do App Routera?",
        answer:
          "Tak, ale migrację planuję etapami. Najpierw identyfikuję zależności od starego routingu i ryzyka związane z cache, sesjami oraz pobieraniem danych.",
      },
      {
        question: "Czy Next.js nadaje się do SEO?",
        answer:
          "Tak. Next.js wspiera renderowanie serwerowe, statyczne strony, metadane, sitemapę i dane strukturalne. O wyniku SEO nadal decydują także treść, intencja, linki i konkurencja.",
      },
      {
        question: "Czy optymalizujesz Core Web Vitals?",
        answer:
          "Tak. Analizuję obrazy, fonty, JavaScript, stabilność layoutu, sposób renderowania oraz rzeczywiste wąskie gardła zamiast optymalizować wynik bez kontekstu.",
      },
      {
        question: "Czy wdrażasz aplikacje na Vercel?",
        answer:
          "Tak. Konfiguruję projekt, domenę, zmienne środowiskowe, cache i automatyczne wdrożenia z repozytorium.",
      },
      {
        question: "Czy przejmujesz projekt po innym wykonawcy?",
        answer:
          "Tak, jeżeli mam dostęp do kodu i środowiska. Zaczynam od audytu, aby oddzielić błędy, dług techniczny i ryzyka od nowych funkcji.",
      },
    ],
    related: [
      { href: "/tworzenie-aplikacji-webowych", label: "Aplikacje webowe" },
      { href: "/tworzenie-stron-internetowych", label: "Strony internetowe" },
      { href: "/sklepy-internetowe", label: "Sklepy internetowe" },
    ],
  },
  {
    slug: "tworzenie-stron-internetowych-jaroslaw",
    path: "/tworzenie-stron-internetowych-jaroslaw",
    shortName: "Strony internetowe Jarosław",
    metaTitle: "Tworzenie stron internetowych Jarosław",
    metaDescription:
      "Tworzenie stron internetowych w Jarosławiu. Szybkie strony firmowe, SEO techniczne, responsywność, formularze i wdrożenie.",
    eyebrow: "Jarosław i Podkarpacie",
    title: "Tworzenie stron internetowych w Jarosławiu",
    lead:
      "Działam z Jarosławia i tworzę nowoczesne strony dla lokalnych firm, organizacji oraz usługodawców z Podkarpacia.",
    directAnswer:
      "Firma z Jarosławia może otrzymać kompletną stronę — od uporządkowania oferty i projektu interfejsu po domenę, publikację oraz przygotowanie do indeksowania w Google. Współpraca może przebiegać zdalnie, bez ograniczania obsługi do jednego miasta.",
    serviceType: "Tworzenie stron internetowych w Jarosławiu",
    areas: ["Jarosław", "powiat jarosławski", "Podkarpackie", "Polska"],
    idealFor: [
      "lokalnych usług i specjalistów",
      "restauracji, organizacji oraz małych firm",
      "marek chcących docierać do klientów z Jarosławia i regionu",
    ],
    benefits: [
      {
        title: "Lokalny kontekst",
        description:
          "Treść i strukturę dopasowuję do sposobu, w jaki klienci szukają usług w Jarosławiu i regionie.",
      },
      {
        title: "Wiarygodna prezentacja",
        description:
          "Pokazuję ofertę, realizacje, obszar działania i dane kontaktowe bez sztucznego przeładowania frazami.",
      },
      {
        title: "Techniczne Local SEO",
        description:
          "Wdrażam spójne metadane, dane strukturalne, sitemapę i treści odpowiadające lokalnej intencji.",
      },
      {
        title: "Obsługa po publikacji",
        description:
          "Mogę pomóc w aktualizacjach, rozwoju treści i diagnozie problemów technicznych.",
      },
    ],
    deliverables: [
      "struktura oferty lokalnej firmy",
      "responsywny projekt dopasowany do marki",
      "czytelne dane kontaktowe i obszar działania",
      "SEO techniczne i konfiguracja indeksowania",
      "formularz oraz mierzenie kontaktów",
      "domena, HTTPS i publikacja",
    ],
    process: [
      {
        title: "Oferta i rynek",
        description:
          "Ustalam, z jaką usługą i na jakim obszarze firma chce docierać do klientów.",
      },
      {
        title: "Treść oraz zaufanie",
        description:
          "Porządkuję korzyści, realizacje, odpowiedzi na pytania i elementy potwierdzające wiarygodność.",
      },
      {
        title: "Projekt i wykonanie",
        description:
          "Tworzę szybki interfejs działający na telefonie i przygotowany do wyszukiwania lokalnego.",
      },
      {
        title: "Publikacja i zgłoszenie",
        description:
          "Uruchamiam domenę, sitemapę i pomagam przejść przez podstawowe działania w Search Console.",
      },
    ],
    faq: [
      {
        question: "Czy tworzysz strony dla firm z Jarosławia?",
        answer:
          "Tak. Działam z Jarosławia i realizuję strony dla lokalnych firm, organizacji oraz klientów z całej Polski.",
      },
      {
        question: "Czy lokalna firma potrzebuje osobnej strony pod Jarosław?",
        answer:
          "Nie zawsze. Osobny landing ma sens wtedy, gdy firma rzeczywiście obsługuje ten rynek i może opisać lokalną ofertę, realizacje lub sposób kontaktu bez kopiowania treści z innych miast.",
      },
      {
        question: "Jak przygotowujesz stronę pod lokalne SEO?",
        answer:
          "Dbam o spójne dane, lokalny kontekst treści, czytelny obszar działania, metadane, dane strukturalne, szybkość i indeksowalne podstrony usług.",
      },
      {
        question: "Czy muszę mieć Google Business Profile?",
        answer:
          "Profil może pomóc firmom obsługującym klientów lokalnie, ale musi spełniać zasady Google i odpowiadać rzeczywistemu modelowi działalności. Sama strona może być indeksowana bez profilu.",
      },
      {
        question: "Ile kosztuje strona dla lokalnej firmy?",
        answer:
          "Punkt startowy prostego zakresu w kalkulatorze wynosi 600 zł. Ostateczna wycena zależy od treści, liczby usług, formularzy, galerii, CMS i integracji.",
      },
      {
        question: "Czy możemy współpracować całkowicie zdalnie?",
        answer:
          "Tak. Materiały, konsultacje, akceptacje i publikację można przeprowadzić zdalnie.",
      },
      {
        question: "Czy pomożesz poprawić istniejącą stronę?",
        answer:
          "Tak. Najpierw sprawdzam kod, treść, indeksowanie, wydajność i bezpieczeństwo, a następnie proponuję kolejność poprawek.",
      },
    ],
    related: [
      { href: "/tworzenie-stron-internetowych", label: "Tworzenie stron internetowych" },
      { href: "/tworzenie-stron-internetowych-rzeszow", label: "Strony internetowe Rzeszów" },
      { href: "/o-mnie", label: "Poznaj wykonawcę" },
    ],
  },
  {
    slug: "tworzenie-stron-internetowych-rzeszow",
    path: "/tworzenie-stron-internetowych-rzeszow",
    shortName: "Strony internetowe Rzeszów",
    metaTitle: "Tworzenie stron internetowych Rzeszów",
    metaDescription:
      "Tworzenie stron internetowych dla firm z Rzeszowa. Responsywność, SEO techniczne, Core Web Vitals, formularze i wdrożenie.",
    eyebrow: "Rzeszów i Podkarpacie",
    title: "Tworzenie stron internetowych dla firm z Rzeszowa",
    lead:
      "Projektuję strony dla rzeszowskich firm i usługodawców, którzy potrzebują czytelnej oferty, szybkiego działania oraz solidnych podstaw SEO.",
    directAnswer:
      "Współpraca z firmą z Rzeszowa obejmuje analizę oferty, projekt strony, responsywne wdrożenie, formularze, SEO techniczne i publikację. Działam z Jarosławia, a cały proces może odbyć się zdalnie dla klienta z Rzeszowa lub dowolnego miejsca w Polsce.",
    serviceType: "Tworzenie stron internetowych dla firm z Rzeszowa",
    areas: ["Rzeszów", "Jarosław", "Podkarpackie", "Polska"],
    idealFor: [
      "firm usługowych konkurujących na rynku rzeszowskim",
      "lokali i specjalistów potrzebujących lepszej prezentacji oferty",
      "marek rozwijających kampanie i widoczność organiczną",
    ],
    benefits: [
      {
        title: "Treść zgodna z intencją",
        description:
          "Strona odpowiada na pytania klientów z Rzeszowa zamiast jedynie powtarzać nazwę miasta.",
      },
      {
        title: "Konwersja lokalnego ruchu",
        description:
          "Eksponuję ofertę, realizacje, kontakt i obszar obsługi w logicznej kolejności.",
      },
      {
        title: "Core Web Vitals",
        description:
          "Optymalizuję obrazy, fonty i kod, aby ograniczać opóźnienia oraz niestabilność layoutu.",
      },
      {
        title: "Mierzalne działania",
        description:
          "Mogę skonfigurować pomiar kliknięć telefonu, formularza lub przejść do mapy.",
      },
    ],
    deliverables: [
      "analiza lokalnej oferty i konkurencyjnych intencji",
      "struktura strony oraz projekt responsywny",
      "sekcje usług, realizacji i FAQ",
      "formularz oraz czytelne dane kontaktowe",
      "SEO techniczne i dane strukturalne",
      "publikacja, domena i podstawowa analityka",
    ],
    process: [
      {
        title: "Cel biznesowy",
        description:
          "Ustalam, które usługi i działania klientów są najważniejsze dla firmy na rynku Rzeszowa.",
      },
      {
        title: "Struktura odpowiedzi",
        description:
          "Buduję treść wokół realnych pytań, obiekcji i powodów wyboru wykonawcy.",
      },
      {
        title: "Projekt i testy",
        description:
          "Wdrażam interfejs i testuję telefon, formularze, dostępność oraz szybkość.",
      },
      {
        title: "Indeksowanie i rozwój",
        description:
          "Publikuję stronę, udostępniam sitemapę i wskazuję dalsze działania contentowe.",
      },
    ],
    faq: [
      {
        question: "Czy pracujesz tylko z klientami z Rzeszowa?",
        answer:
          "Nie. Działam z Jarosławia na Podkarpaciu, obsługuję firmy z Rzeszowa, a cały proces mogę przeprowadzić zdalnie dla klienta z dowolnego miejsca w Polsce.",
      },
      {
        question: "Ile kosztuje strona internetowa w Rzeszowie?",
        answer:
          "Najprostszy zakres w kalkulatorze zaczyna się od 600 zł. Cena zależy od liczby usług i podstron, treści, formularzy, CMS, galerii oraz integracji.",
      },
      {
        question: "Czy strona będzie działać na telefonie?",
        answer:
          "Tak. Responsywność i czytelna obsługa na małych ekranach są częścią każdej realizacji, a nie dodatkowo płatnym modułem.",
      },
      {
        question: "Czy przygotujesz stronę pod SEO w Rzeszowie?",
        answer:
          "Wdrażam SEO techniczne i tworzę strukturę treści zgodną z lokalną intencją. Nie gwarantuję pozycji, ponieważ wpływają na nią również konkurencja, autorytet domeny i zewnętrzne wzmianki.",
      },
      {
        question: "Czy pomagasz z Google Search Console?",
        answer:
          "Tak. Mogę przygotować sitemapę, canonicale i stronę do weryfikacji, a właściciel domeny wykonuje działania wymagające zalogowania do swojego konta Google.",
      },
      {
        question: "Czy mogę później sam zmieniać treści?",
        answer:
          "Tak. W zależności od zakresu mogę wdrożyć panel CMS lub przygotować prostą procedurę aktualizacji strony.",
      },
      {
        question: "Co jest potrzebne do rozpoczęcia projektu?",
        answer:
          "Na start wystarczy opis firmy, oferta, grupa klientów, cel strony i przykłady estetyki. Brakujące treści oraz materiały ustalamy podczas analizy.",
      },
    ],
    related: [
      { href: "/tworzenie-stron-internetowych", label: "Tworzenie stron internetowych" },
      { href: "/tworzenie-stron-internetowych-jaroslaw", label: "Strony internetowe Jarosław" },
      { href: "/o-mnie", label: "O Emanuelu Włochu" },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export const coreServicePages = servicePages.filter(
  (page) => page.slug !== "tworzenie-stron-internetowych-rzeszow",
);
