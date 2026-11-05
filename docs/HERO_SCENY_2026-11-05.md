# Hero — cztery odrębne sceny

## Kompozycja

1. Cel: papier w kratkę, pytania o ofertę i klientów, odręczne linie, notatka i ołówek. Treści są w SVG, a nie w bitmapie.
2. Projekt: kobieta, Emanuel i mężczyzna przy wspólnej planszy. Postacie mają niezależny, subtelny ruch pozy. Obrysy strony i notatki na stole są rysowane w animacji SVG.
3. Realizacja: komputer, tablet i telefon z dopasowanymi układami tej samej przykładowej strony. Three.js jest ładowany dla tego etapu; bez WebGL pozostają trzy widoki HTML.
4. Wdrożenie: adres domeny, HTTPS, publikacja, sprawdzenie kontaktu i przekazanie dostępu. To ilustracja procesu współpracy, nie monitoring rzeczywistej witryny klienta.

Na komputerze sceny są powiązane z przewijaniem w dotychczasowych 220svh. Każdy etap można też wybrać przyciskiem. Na telefonie sceny wybiera się ręcznie, bez automatycznego przeskakiwania między nimi. Ograniczenie ruchu pozostawia dostęp do wszystkich scen.

## Grafika zespołu

- Narzędzie: wbudowany imagegen, bez użycia CLI ani klucza API.
- Referencja tożsamości: public/emanuel_wloch.jpg. Pozostałe postacie są fikcyjne, ilustracyjne.
- Zasób strony: public/hero/design-team.webp, 2172 × 724, 324348 bajtów, kanał alfa.
- Trzy postacie są umieszczone w jednym atlasie; CSS wyświetla każdą trzecią część jako niezależną warstwę. Oryginalny PNG został zachowany poza repozytorium w katalogu obrazów wygenerowanych oraz jako lokalny plik roboczy w .debug.
- Źródła scen: src/components/portfolio/StageVisuals.tsx, hero-scenes.css i katalog three.

## Prompt użyty w imagegen

Create one production-ready horizontal character sprite atlas for a premium Polish web design studio website. Use the attached photograph ONLY as the identity reference for the CENTER man Emanuel: preserve his recognisable short upward brown hair, facial structure, light eyes, light beard and navy shirt. Three separate waist-up 3D editorial illustration characters, on TRUE TRANSPARENT background, evenly spaced in three equal columns, each entirely contained in its own third with generous transparent gaps. LEFT: fictional professional woman with shoulder-length dark hair and muted blue blouse, thoughtful expression, one hand under chin, other hand holding a slim stylus pointing down as if working at a drawing table. CENTER: Emanuel based on reference, navy open-collar shirt over white tee, leaning slightly forward thinking, right hand holding a slim stylus down toward an unseen design sketch. RIGHT: fictional male client with shorter dark hair, subtle glasses, charcoal knit top, pondering the composition, one open hand making an idea-sharing gesture. All three in a coherent sophisticated softly sculpted 3D illustrated style, realistic human proportions, refined materials, restrained stylization, no caricature or bobbleheads, beautiful soft blue rim lighting matching #acd1e8 on dark graphite UI. Waist-up including hands, no cut-off heads, no overlapping bodies, no desk, NO scenery, NO whiteboard, NO background, NO text, NO logos. Facing slightly toward one another while still readable. This is a sprite atlas to animate the three figures independently using CSS; exact separated composition is essential. Landscape wide aspect ratio.

## Weryfikacja

- Lint, typy, 65 testów w 18 plikach i build przechodzą.
- Testy obejmują wybór czterech odrębnych scen na telefonie, brak samoczynnej mobilnej sekwencji, wybór scen po wyłączeniu ruchu i brak WebGL.
- Obejrzano wszystkie cztery sceny w przeglądarce desktop. Dopracowano odstępy, wielkość urządzeń i czytelność kompozycji. Poza etapem realizacji canvas jest odmontowany.
- Układ graficzny w szerokości 390 px jest dodatkowo sprawdzany na podglądzie HTML/CSS. Nie jest to test WebGL ani obsługi dotykowej na fizycznym iPhonie.
- Testowe dane i konto administratora znajdują się wyłącznie w lokalnej bazie .debug/design-preview.db. Materiały robocze i brag-output nie są częścią publikacji.
