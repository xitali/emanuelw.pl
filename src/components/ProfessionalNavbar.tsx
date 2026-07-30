"use client";

import { useEffect, useState } from "react";
import {
  Code2,
  Menu,
  MessageSquare,
  Rocket,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  openContactForm,
  PROJECT_QUOTE_PREFILL,
} from "@/lib/contact-prefill";

const navLinks = [
  { name: "Projekty", href: "/#projekty", icon: Code2 },
  { name: "Usługi", href: "/#uslugi", icon: Rocket },
  { name: "Technologie", href: "/#technologie", icon: Sparkles },
  { name: "Kontakt", href: "/#kontakt", icon: MessageSquare },
] as const;

export default function ProfessionalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  function handleProjectQuote(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setMobileMenuOpen(false);
    openContactForm(PROJECT_QUOTE_PREFILL);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/60 bg-white/82 py-3 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.6)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#060913]/82"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-[11px] font-black tracking-[-0.04em] text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
            <span className="absolute inset-px rounded-[11px] bg-black/15" />
            <span className="relative z-10">EW</span>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-lg font-bold tracking-tight transition-colors ${
                scrolled
                  ? "text-slate-900 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400"
                  : "text-white group-hover:text-cyan-200"
              }`}
            >
              Emanuel<span className="text-cyan-400">.</span>Włoch
            </span>
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.18em] ${
                scrolled
                  ? "text-cyan-600 dark:text-cyan-400/80"
                  : "text-white/45"
              }`}
            >
              Design & development
            </span>
          </div>
        </Link>

        <nav
          aria-label="Główna nawigacja"
          className={`hidden items-center gap-1 rounded-full border p-1.5 backdrop-blur-xl md:flex ${
            scrolled
              ? "border-slate-200 bg-white/70 dark:border-white/10 dark:bg-[#0f172a]/70"
              : "border-white/10 bg-white/[0.045]"
          }`}
        >
          {navLinks.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                scrolled
                  ? "text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-400"
                  : "text-white/66 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              <Icon
                className={`size-4 ${
                  scrolled
                    ? "text-cyan-600 dark:text-cyan-400/80"
                    : "text-cyan-300/80"
                }`}
              />
              {name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Przełącz jasny lub ciemny motyw"
            title="Przełącz jasny lub ciemny motyw"
            className={`rounded-full border p-2.5 transition-colors ${
              scrolled
                ? "border-slate-300 bg-white text-slate-600 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-cyan-400"
                : "border-white/12 bg-white/[0.045] text-white/72 hover:border-cyan-300/60 hover:text-white"
            }`}
          >
            <Wand2 className="size-4" aria-hidden="true" />
          </button>

          <a
            href="#kontakt"
            onClick={handleProjectQuote}
            className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_10px_36px_-16px_rgba(34,211,238,0.8)] transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="size-4 text-cyan-600" />
            Wyceń projekt
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className={`rounded-xl border p-2 md:hidden ${
            scrolled
              ? "border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              : "border-white/12 bg-white/[0.05] text-white"
          }`}
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="mx-4 mt-3 space-y-2 rounded-2xl border border-slate-200 bg-white/96 p-3 shadow-2xl backdrop-blur-xl animate-fadeIn dark:border-white/10 dark:bg-[#0b101a]/96 md:hidden"
        >
          {navLinks.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-300"
            >
              <Icon className="size-5 text-cyan-600 dark:text-cyan-400" />
              {name}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-300"
          >
            <Wand2 className="size-5 text-cyan-600 dark:text-cyan-400" />
            Przełącz motyw
          </button>
          <a
            href="#kontakt"
            onClick={handleProjectQuote}
            className="block rounded-xl bg-slate-950 py-3 text-center font-semibold text-white dark:bg-white dark:text-black"
          >
            Wyceń projekt
          </a>
        </div>
      )}
    </header>
  );
}
