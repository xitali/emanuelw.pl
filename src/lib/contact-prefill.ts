export const CONTACT_PREFILL_EVENT = "contact:prefill";

export interface ContactPrefill {
  subject: string;
  message: string;
  badge?: string;
}

export const PROJECT_QUOTE_PREFILL: ContactPrefill = {
  subject: "Zapytanie o wycenę projektu",
  message: `Dzień dobry,

chcę otrzymać wycenę projektu.

Rodzaj projektu: [np. strona internetowa / sklep / aplikacja]
Główny cel: [opisz, co projekt ma osiągnąć]
Najważniejsze funkcje: [wymień potrzebne funkcje]
Planowany termin: [podaj termin]
Budżet orientacyjny: [podaj zakres lub wpisz „do ustalenia”]

Dodatkowe informacje:
[wpisz wszystko, co może pomóc w przygotowaniu wyceny]`,
  badge: "Przygotowałem szablon zapytania — podmień tekst w nawiasach na swoje dane.",
};

export function openContactForm(prefill: ContactPrefill) {
  window.dispatchEvent(
    new CustomEvent<ContactPrefill>(CONTACT_PREFILL_EVENT, {
      detail: prefill,
    }),
  );

  const contactSection = document.getElementById("kontakt");
  contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });

  window.setTimeout(() => {
    document.getElementById("contact-subject")?.focus({ preventScroll: true });
  }, 500);
}
