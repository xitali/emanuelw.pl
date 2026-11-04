import { IconArrowUpRight } from "./icons";
import { promoFilm } from "@/lib/promo-film";

export default function DeliveryProcess() {
  return <section id="wspolpraca" className="delivery-process portfolio-container" aria-labelledby="delivery-heading">
    <header className="portfolio-section-heading"><div><p className="portfolio-kicker">OD PIERWSZEJ ROZMOWY DO PUBLIKACJI</p><h2 id="delivery-heading">Wiesz, co powstaje.<br /><span>I co będzie dalej.</span></h2></div><p>Ustalamy zakres i kolejne kroki.<br />Oceniasz projekt w trakcie prac.</p></header>
    <ol className="service-steps" data-stagger>
      <li><strong>01 / Rozmowa</strong><span>Poznaję Twoją ofertę, klientów i cel strony.</span></li>
      <li><strong>02 / Zakres i wycena</strong><span>Ustalamy elementy projektu, koszt i termin.</span></li>
      <li><strong>03 / Projekt i realizacja</strong><span>Oceniasz układ, treści i działające funkcje.</span></li>
      <li><strong>04 / Wdrożenie i przekazanie</strong><span>Sprawdzam stronę, publikuję i omawiam obsługę.</span></li>
    </ol>
    {promoFilm.src && <figure className="delivery-film"><video controls playsInline preload="none" poster={promoFilm.poster} aria-label="Jak powstaje strona dla Twojej firmy — film, 22 sekundy"><source src={promoFilm.src} type="video/mp4" />Twoja przeglądarka nie obsługuje filmu.</video><figcaption>Od celu do działającej strony. Film bez lektora; treść jest widoczna na ekranie.</figcaption><details><summary>Przeczytaj treść filmu</summary><p>Klient szuka usługi. Pokaż mu swoją firmę. Od pierwszego wrażenia do konkretnej rozmowy: cel, projekt, realizacja i wdrożenie. Pokaż ofertę. Ułatw kontakt. Przykłady: VIP Transfery i Solid Print — wersja testowa. Twoja firma. Moja realizacja. Emanuel Włoch: emanuelwloch.pl.</p></details></figure>}
    <div className="portfolio-actions"><a className="portfolio-button" href="#kontakt">Omów projekt <IconArrowUpRight size={18} /></a><p className="process-note">Opisz firmę i to, co chcesz poprawić.<br />Nie musisz znać technologii.</p></div>
  </section>;
}
