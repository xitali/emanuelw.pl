import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Informacje o przetwarzaniu danych przesyłanych przez formularz kontaktowy.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-800 dark:bg-[#060913] dark:text-slate-200">
      <article className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-10">
        <header className="space-y-3">
          <p className="font-mono text-sm text-cyan-700 dark:text-cyan-300">
            Ostatnia aktualizacja: 26 lipca 2026 r.
          </p>
          <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl">
            Polityka prywatności
          </h1>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Administrator danych</h2>
          <p>
            Administratorem danych jest Emanuel Włoch. W sprawach dotyczących
            prywatności napisz na{" "}
            <a className="text-cyan-700 underline dark:text-cyan-300" href="mailto:emanuel.wloch@gmail.com">
              emanuel.wloch@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Formularz kontaktowy</h2>
          <p>
            Formularz zapisuje imię, adres e-mail, temat, treść wiadomości i
            datę wysłania. Dane są używane wyłącznie do odpowiedzi, prowadzenia
            korespondencji i ewentualnego przygotowania współpracy.
          </p>
          <p>
            Podstawą przetwarzania jest uzasadniony interes polegający na
            obsłudze zapytań (art. 6 ust. 1 lit. f RODO), a gdy zapytanie
            dotyczy umowy — działania przed jej zawarciem (art. 6 ust. 1 lit. b
            RODO). Podanie danych jest dobrowolne, ale niezbędne do otrzymania
            odpowiedzi.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Statystyki i dane techniczne</h2>
          <p>
            Strona zapisuje wyłącznie dzienną, zbiorczą liczbę odsłon
            poszczególnych podstron. Nowe wpisy statystyczne nie zawierają
            adresu IP, identyfikatora użytkownika ani informacji o
            przeglądarce. Motyw jasny lub ciemny może być zapamiętany lokalnie
            w przeglądarce.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Odbiorcy i okres przechowywania</h2>
          <p>
            Dostawcami infrastruktury są Vercel (hosting i pliki) oraz Turso
            (baza danych). Dane formularza są przechowywane do 12 miesięcy od
            zakończenia korespondencji, chyba że prawo lub ustalenie, obrona
            albo dochodzenie roszczeń wymaga dłuższego okresu. Dostawcy mogą
            przetwarzać dane poza EOG na podstawie mechanizmów przewidzianych w
            RODO.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Twoje prawa</h2>
          <p>
            Możesz żądać dostępu, sprostowania, usunięcia lub ograniczenia
            przetwarzania danych oraz wnieść sprzeciw. Gdy podstawą jest umowa,
            możesz także żądać przeniesienia danych. Masz prawo złożyć skargę
            do Prezesa Urzędu Ochrony Danych Osobowych. Dane nie są używane do
            zautomatyzowanego podejmowania decyzji ani profilowania.
          </p>
        </section>

        <Link
          href="/"
          className="inline-flex rounded-full bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-500"
        >
          Wróć na stronę główną
        </Link>
      </article>
    </main>
  );
}
