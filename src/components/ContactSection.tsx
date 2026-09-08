"use client";

import { useState, useEffect } from "react";
import { sendContactMessageAction } from "@/app/actions/contact";
import { ArrowUpRight, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import type { PublicSiteSettings } from "@/types";
import Link from "next/link";
import { CONTACT_PREFILL_EVENT, type ContactPrefill } from "@/lib/contact-prefill";
import { contactSources } from "@/lib/contact-sources";

export default function ContactSection({ settings }: { settings: PublicSiteSettings }) {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [autoFilledBadge, setAutoFilledBadge] = useState<string | null>(null);
  const email = settings.personal_email || "kontakt@emanuelwloch.pl";
  const phone = settings.personal_phone || "+48 725 403 682";
  const socials = [
    ["GitHub", settings.social_github || "https://github.com/xitali"],
    ["Instagram", settings.social_instagram || "https://www.instagram.com/mrmun1o"],
    ["Facebook", settings.social_facebook || "https://facebook.com/emanuel.wloch"],
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const prefill = (event: Event) => {
      const detail = (event as CustomEvent<ContactPrefill>).detail;
      if (!detail) return;
      if (detail.subject) setSubject(detail.subject);
      if (detail.message) setMessage(detail.message);
      setAutoFilledBadge(detail.badge || "Wybrany zakres został wpisany w formularzu.");
      clearTimeout(timer);
      timer = setTimeout(() => setAutoFilledBadge(null), 5000);
    };
    window.addEventListener(CONTACT_PREFILL_EVENT, prefill);
    return () => { clearTimeout(timer); window.removeEventListener(CONTACT_PREFILL_EVENT, prefill); };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatusMsg(null);
    const form = event.currentTarget;
    try {
      const result = await sendContactMessageAction(new FormData(form));
      if (result.success) {
        setStatusMsg({ type: "success", text: result.message || "Dziękuję za wiadomość. Odezwę się na podany adres." });
        form.reset(); setSubject(""); setMessage(""); setAutoFilledBadge(null);
      } else {
        setStatusMsg({ type: "error", text: result.error || "Nie udało się wysłać wiadomości. Spróbuj ponownie." });
      }
    } catch {
      setStatusMsg({ type: "error", text: "Nie udało się połączyć. Spróbuj ponownie lub napisz bezpośrednio na mój adres e-mail." });
    } finally { setLoading(false); }
  }

  return <section id="kontakt" className="portfolio-contact" aria-labelledby="contact-heading">
    <div className="portfolio-container">
      <header className="portfolio-section-heading">
        <div><p className="portfolio-kicker">04 / KONTAKT</p><h2 id="contact-heading">Masz pomysł?<br /><span>Zbudujmy go razem.</span></h2></div>
        <p>Wystarczy krótki opis pomysłu.<br />Nie musisz znać technologii ani mieć gotowej specyfikacji.</p>
      </header>
      <div className="contact-layout">
        <div className="contact-info">
          <p className="portfolio-kicker">BEZPOŚREDNIO</p>
          <a className="contact-email" href={`mailto:${email}`}>{email}<ArrowUpRight size={22} /></a>
          <a className="contact-phone" href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}<ArrowUpRight size={16} /></a>
          <div className="contact-location"><p className="portfolio-kicker">LOKALIZACJA</p><p>Jarosław, Podkarpackie<br /><span>Współpraca zdalna w całej Polsce</span></p></div>
          <nav className="contact-socials" aria-label="Profile społecznościowe">{socials.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={14} /></a>)}</nav>
        </div>
        <form onSubmit={handleSubmit} className="contact-form" aria-label="Napisz wiadomość" aria-busy={loading}>
          <p className="portfolio-kicker">O TWOIM PROJEKCIE</p>
          {autoFilledBadge && <p className="contact-notice" role="status">{autoFilledBadge}</p>}
          {statusMsg && <div className={`contact-notice is-${statusMsg.type}`} role={statusMsg.type === "error" ? "alert" : "status"}>{statusMsg.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}<span>{statusMsg.text}</span></div>}
          <div className="contact-field-row">
            <div className="contact-field"><label htmlFor="contact-name">Imię i nazwisko <span>*</span></label><input id="contact-name" name="name" autoComplete="name" required placeholder="Jan Kowalski" /></div>
            <div className="contact-field"><label htmlFor="contact-email">Adres e-mail <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="jan@firma.pl" /></div>
          </div>
          <div className="contact-field"><label htmlFor="contact-subject">Temat <span>opcjonalnie</span></label><input id="contact-subject" name="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="O czym porozmawiamy?" /></div>
          <div className="contact-field"><label htmlFor="contact-message">Wiadomość <span>*</span></label><textarea id="contact-message" name="message" rows={5} required value={message} onChange={e => setMessage(e.target.value)} placeholder="Opisz swój pomysł, zakres i planowany termin." /></div>
          <div className="contact-field"><label htmlFor="contact-source">Skąd o mnie wiesz? <span>opcjonalnie</span></label><select id="contact-source" name="source" defaultValue="">{contactSources.map(source => <option key={source} value={source}>{source || "Wybierz, jeśli chcesz"}</option>)}</select></div>
          <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Strona internetowa</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <div className="contact-form-footer"><p>Wysyłając wiadomość, potwierdzasz zapoznanie się z <Link href="/polityka-prywatnosci">polityką prywatności</Link>.</p><button type="submit" className="portfolio-button" disabled={loading}>{loading ? "Wysyłanie…" : "Wyślij wiadomość"}<ArrowRight size={17} /></button></div>
        </form>
      </div>
    </div>
  </section>;
}
