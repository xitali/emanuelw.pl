# Prompt do zbierania danych projektów portfolio

## 📋 Cel dokumentu

Ten dokument zawiera szczegółowy prompt do systematycznego zbierania informacji o projektach z istniejących stron internetowych w celu dodania ich do bazy danych portfolio.

---

## 🔍 Prompt do analizy projektów

**Instrukcja:** Przeanalizuj stronę internetową projektu i wyciągnij kluczowe informacje potrzebne do bazy danych portfolio zgodnie z poniższym szablonem.

### 📊 Informacje do zebrania:

#### 1. Podstawowe dane projektu
- **Nazwa projektu** - oficjalna nazwa lub tytuł strony
- **Krótki opis** (1-2 zdania) - główny cel i funkcjonalność
- **Szczegółowy opis** (3-5 zdań) - pełna charakterystyka projektu, jego unikalne cechy
- **URL projektu** - link do działającej strony
- **Data realizacji** - kiedy projekt został ukończony/uruchomiony
- **Status projektu** - aktywny/archiwum/w rozwoju

#### 2. Aspekty techniczne
- **Frontend technologie** - React, Vue, vanilla JS, HTML/CSS, framework CSS (Tailwind, Bootstrap)
- **Backend technologie** - Node.js, PHP, Python, bazy danych (MySQL, PostgreSQL, MongoDB)
- **Narzędzia i biblioteki** - dodatkowe frameworki, API, zewnętrzne serwisy
- **Hosting/Deploy** - gdzie projekt jest hostowany (Vercel, Netlify, AWS, VPS)
- **Repozytorium** - link do GitHub/GitLab (jeśli publiczne)

#### 3. Funkcjonalności i cechy
- **Kluczowe funkcje** - lista głównych możliwości aplikacji
- **Responsywność** - czy strona jest responsywna (tak/nie + detale)
- **Interaktywność** - animacje, efekty, dynamiczne elementy
- **Integracje** - płatności, mapy, social media, API zewnętrzne
- **SEO i Performance** - optymalizacja, szybkość ładowania

#### 4. Wizualne i UX
- **Styl designu** - minimalistyczny, nowoczesny, kolorowy, ciemny motyw
- **Paleta kolorów** - dominujące kolory (hex codes jeśli możliwe)
- **Typ projektu** - strona firmowa, e-commerce, aplikacja webowa, landing page, blog, portfolio
- **Target grupa** - dla kogo przeznaczony projekt
- **Accessibility** - czy strona jest dostępna dla osób niepełnosprawnych

#### 5. Osiągnięcia i metryki
- **Wyzwania techniczne** - jakie problemy zostały rozwiązane
- **Innowacyjne rozwiązania** - unikalne podejścia zastosowane w projekcie
- **Rezultaty** - wzrost konwersji, poprawa UX, optymalizacja wydajności
- **Feedback** - opinie użytkowników, metryki sukcesu

---

## 📝 Szablon odpowiedzi

```markdown
**PROJEKT: [Nazwa projektu]**

🎯 **Podstawowe informacje:**
- Nazwa: [Pełna nazwa projektu]
- URL: [https://example.com]
- Data realizacji: [MM/YYYY]
- Status: [aktywny/archiwum/w rozwoju]

📖 **Opis:**
- Krótki: [1-2 zdania o głównym celu]
- Szczegółowy: [3-5 zdań o funkcjonalności, unikalnych cechach i wartości dla użytkowników]

🛠️ **Stack technologiczny:**
- Frontend: [React, TypeScript, Tailwind CSS, Vite]
- Backend: [Node.js, Express, PostgreSQL]
- Narzędzia: [Stripe API, Google Maps, SendGrid]
- Hosting: [Vercel + Supabase]
- Repo: [link do repozytorium jeśli publiczne]

⚡ **Kluczowe funkcje:**
- [Funkcja 1 - np. System płatności online]
- [Funkcja 2 - np. Responsywny design]
- [Funkcja 3 - np. Panel administratora]
- [Funkcja 4 - np. Integracja z API]

🎨 **Design i UX:**
- Styl: [minimalistyczny, nowoczesny, kolorowy]
- Paleta: [#główny-kolor, #akcentowy-kolor]
- Typ: [e-commerce/landing page/aplikacja webowa]
- Target: [małe firmy/freelancerzy/korporacje]
- Responsywność: [tak - mobile-first approach]
- Accessibility: [tak/nie + detale]

🏆 **Highlights i osiągnięcia:**
- Wyzwanie: [główne wyzwanie techniczne które zostało rozwiązane]
- Innowacja: [unikalne rozwiązanie zastosowane w projekcie]
- Rezultat: [konkretny rezultat - np. 40% wzrost konwersji]
- Performance: [szybkość ładowania, optymalizacje]

📊 **Metryki i feedback:**
- [Konkretne dane o sukcesie projektu]
- [Opinie użytkowników]
- [Metryki techniczne]
```

---

## 🔍 Wskazówki do analizy

### Narzędzia do sprawdzania:
1. **DevTools (F12)**
   - Sources → sprawdź strukturę plików i technologie
   - Network → zobacz jakie API są używane
   - Performance → oceń szybkość ładowania
   - Lighthouse → sprawdź SEO i accessibility

2. **Analiza kodu źródłowego**
   - Sprawdź meta tagi w `<head>`
   - Poszukaj komentarzy z informacjami o technologiach
   - Sprawdź linki do CSS/JS bibliotek

3. **Testowanie funkcjonalności**
   - Wypełnij formularze
   - Przetestuj responsywność (różne rozmiary ekranu)
   - Sprawdź animacje i interakcje
   - Przetestuj nawigację

4. **Zewnętrzne narzędzia**
   - Wappalyzer - wykrywa technologie
   - PageSpeed Insights - performance
   - WAVE - accessibility

### Co szczególnie sprawdzić:
- **Unikalne rozwiązania** - co wyróżnia ten projekt
- **Problemy rozwiązane** - jakie wyzwania zostały pokonane
- **Jakość kodu** - czy kod jest czysty i zoptymalizowany
- **User Experience** - jak intuicyjna jest nawigacja
- **Mobile experience** - jak działa na urządzeniach mobilnych

---

## 🎯 Dopasowanie do stylu portfolio

### Ton komunikacji:
- **Profesjonalny** ale przystępny
- **Konkretny** - używaj specific technologii zamiast ogólników
- **Measurable** - podawaj konkretne rezultaty gdzie to możliwe
- **Story-driven** - opisuj jak projekt rozwiązuje problemy

### Struktura opisu:
1. **Problem** - jaki problem rozwiązywał projekt
2. **Solution** - jak został rozwiązany
3. **Technology** - jakie technologie zostały użyte
4. **Result** - jaki był efekt końcowy

### Przykłady dobrych opisów:
❌ **Źle:** "Strona internetowa zrobiona w React"
✅ **Dobrze:** "Responsywna aplikacja e-commerce w React z TypeScript, zintegrowana z Stripe API, która zwiększyła konwersję o 35%"

❌ **Źle:** "Projekt używa bazy danych"
✅ **Dobrze:** "PostgreSQL z optymalizowanymi zapytaniami SQL, co zmniejszyło czas ładowania danych o 60%"

---

## 📋 Checklist przed dodaniem do bazy

- [ ] Wszystkie wymagane pola są wypełnione
- [ ] Opis jest konkretny i wartościowy
- [ ] Technologie są dokładnie określone
- [ ] URL projektu jest aktywny
- [ ] Zdjęcia/screenshoty są wysokiej jakości
- [ ] Tekst jest sprawdzony pod kątem błędów
- [ ] Projekt pasuje do ogólnego stylu portfolio

---

*Ten dokument pomoże w systematycznym zbieraniu informacji o projektach w sposób, który będzie idealnie pasował do struktury bazy danych i estetyki portfolio.* 🚀