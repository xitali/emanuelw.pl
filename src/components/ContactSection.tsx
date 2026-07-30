"use client";

import { useState, useEffect } from "react";
import { sendContactMessageAction } from "@/app/actions/contact";
import confetti from "canvas-confetti";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { PublicSiteSettings } from "@/types";
import Link from "next/link";
import { CONTACT_PREFILL_EVENT } from "@/lib/contact-prefill";
import type { ContactPrefill } from "@/lib/contact-prefill";

interface ContactSectionProps {
  settings: PublicSiteSettings;
}

export default function ContactSection({ settings }: ContactSectionProps) {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // Controlled inputs for auto-filling selected service & pre-filled message
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [autoFilledBadge, setAutoFilledBadge] = useState<string | null>(null);

  const email = settings["personal_email"] || "kontakt@emanuelwloch.pl";
  const phone = settings["personal_phone"] || "+48 725 403 682";
  const instagram = settings["social_instagram"] || "https://www.instagram.com/mrmun1o";
  const facebook = settings["social_facebook"] || "https://facebook.com/emanuel.wloch";
  const github = settings["social_github"] || "https://github.com/xitali";

  useEffect(() => {
    const handleContactPrefill = (e: Event) => {
      const customEvt = e as CustomEvent<ContactPrefill>;
      if (customEvt.detail) {
        if (customEvt.detail.subject) setSubject(customEvt.detail.subject);
        if (customEvt.detail.message) setMessage(customEvt.detail.message);
        setAutoFilledBadge(
          customEvt.detail.badge
            || "Wybrane dane zostały automatycznie wpisane w formularzu!",
        );
        setTimeout(() => setAutoFilledBadge(null), 5000);
      }
    };

    window.addEventListener(CONTACT_PREFILL_EVENT, handleContactPrefill);
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, handleContactPrefill);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await sendContactMessageAction(formData);

    setLoading(false);
    if (res.success) {
      setStatusMsg({ type: "success", text: res.message || "Dziękuję za wiadomość! Odpowiem najszybciej jak to możliwe." });
      form.reset();
      setSubject("");
      setMessage("");
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Animacja jest dodatkiem; wysłanie wiadomości pozostaje udane.
      }
    } else {
      setStatusMsg({ type: "error", text: res.error || "Wystąpił błąd przy wysyłce." });
    }
  }

  return (
    <section id="kontakt" className="relative z-10 overflow-hidden border-t border-slate-200 bg-slate-50/90 py-24 dark:border-slate-800/60 dark:bg-[#040710]/90 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute -right-48 top-20 size-[34rem] rounded-full bg-violet-500/[0.07] blur-[160px]"
      />
      <div className="relative mx-auto max-w-[1500px] space-y-16 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-700 dark:text-cyan-300">
            <Mail className="w-3.5 h-3.5" />
            <span>Nawiążmy Kontakt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Porozmawiajmy o <span className="text-gradient-cyan">Twoim Projekcie</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Napisz do mnie lub zadzwoń. Wybór usługi albo wyceny automatycznie przygotuje poniższy formularz.
          </p>
        </div>

        {/* Grid: Contact Info + Form */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel space-y-6 rounded-[2rem] border border-slate-200 bg-white/55 p-7 dark:border-slate-800 dark:bg-transparent sm:p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Dane Kontaktowe</h3>
              
              <div className="space-y-4">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Adres Email</div>
                    <div className="text-sm font-semibold">{email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Telefon Direct</div>
                    <div className="text-sm font-semibold">{phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Lokalizacja</div>
                    <div className="text-sm font-semibold">Jarosław / Podkarpackie / zdalnie</div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Profile Społecznościowe:</div>
                  <div className="flex gap-3">
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        aria-label="GitHub"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {instagram && (
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-400 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {facebook && (
                      <a
                        href={facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label="Facebook"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-panel space-y-6 rounded-[2rem] border border-cyan-500/20 bg-white/85 p-7 shadow-[0_32px_90px_-54px_rgba(8,145,178,0.5)] dark:bg-transparent sm:p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Napisz Wiadomość</h3>

              {autoFilledBadge && (
                <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/50 text-cyan-700 dark:text-cyan-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>{autoFilledBadge}</span>
                </div>
              )}

              {statusMsg && (
                <div
                  role={statusMsg.type === "error" ? "alert" : "status"}
                  aria-live="polite"
                  className={`p-4 rounded-2xl text-xs sm:text-sm font-medium flex items-center gap-3 ${
                    statusMsg.type === "success"
                      ? "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                      : "bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300"
                  }`}
                >
                  {statusMsg.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
                  )}
                  <span>{statusMsg.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono text-slate-600 dark:text-slate-300">Twoje Imię *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="np. Jan Kowalski"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-900 dark:text-slate-100 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-slate-600 dark:text-slate-300">Adres Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="jan@firma.pl"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-900 dark:text-slate-100 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-mono text-slate-600 dark:text-slate-300">Temat Wiadomości</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="np. Wycena strony internetowej / Zapytanie o współpracę"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-900 dark:text-slate-100 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-slate-600 dark:text-slate-300">Wiadomość *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Opisz krótko swój projekt lub zadaj pytanie..."
                  className="w-full min-h-40 resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div className="absolute -left-[10000px]" aria-hidden="true">
                <label htmlFor="contact-website">Strona internetowa</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Wysyłając formularz, potwierdzasz zapoznanie się z{" "}
                <Link
                  href="/polityka-prywatnosci"
                  className="text-cyan-700 underline underline-offset-2 dark:text-cyan-300"
                >
                  polityką prywatności
                </Link>
                .
              </p>

              <button
                type="submit"
                disabled={loading}
                className="neon-glow-button w-full py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Wysyłanie do bazy Turso...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Wyślij Wiadomość</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
