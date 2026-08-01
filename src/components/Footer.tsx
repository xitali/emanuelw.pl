"use client";

import Link from "next/link";
import { Activity, ArrowUpRight, Terminal } from "lucide-react";

interface FooterProps {
  visitCount?: number;
}

const serviceLinks = [
  { href: "/tworzenie-stron-internetowych", label: "Strony internetowe" },
  { href: "/tworzenie-aplikacji-webowych", label: "Aplikacje webowe" },
  { href: "/sklepy-internetowe", label: "Sklepy internetowe" },
  { href: "/nextjs-developer", label: "Next.js developer" },
] as const;

const localLinks = [
  { href: "/tworzenie-stron-internetowych-jaroslaw", label: "Strony internetowe Jarosław" },
  { href: "/tworzenie-stron-internetowych-rzeszow", label: "Strony internetowe Rzeszów" },
] as const;

export default function Footer({ visitCount = 0 }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-[#02040a] dark:text-white">
      <div className="mx-auto max-w-[1500px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.7fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-white shadow-lg shadow-cyan-500/15"><Terminal className="size-4" /></span>
              <span className="text-lg font-bold">Emanuel<span className="text-cyan-500">.</span>Włoch</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 dark:text-white/48">Strony internetowe, sklepy i aplikacje webowe projektowane od interfejsu po bezpieczne wdrożenie.</p>
            <p className="mt-4 text-xs text-slate-500 dark:text-white/36">Jarosław, Podkarpackie · współpraca zdalna w całej Polsce</p>
          </div>

          <nav aria-label="Usługi w stopce">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-white/38">Usługi</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {serviceLinks.map((item) => <li key={item.href}><Link href={item.href} className="text-slate-600 hover:text-cyan-700 dark:text-white/52 dark:hover:text-cyan-300">{item.label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="Oferta lokalna w stopce">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-white/38">Lokalnie</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {localLinks.map((item) => <li key={item.href}><Link href={item.href} className="text-slate-600 hover:text-cyan-700 dark:text-white/52 dark:hover:text-cyan-300">{item.label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="Informacje w stopce">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-white/38">Informacje</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/uslugi" className="text-slate-600 hover:text-cyan-700 dark:text-white/52 dark:hover:text-cyan-300">Pełna oferta</Link></li>
              <li><Link href="/o-mnie" className="text-slate-600 hover:text-cyan-700 dark:text-white/52 dark:hover:text-cyan-300">O mnie</Link></li>
              <li><Link href="/poradniki" className="text-slate-600 hover:text-cyan-700 dark:text-white/52 dark:hover:text-cyan-300">Poradniki</Link></li>
              <li><Link href="/#projekty" className="text-slate-600 hover:text-cyan-700 dark:text-white/52 dark:hover:text-cyan-300">Case studies</Link></li>
              <li><Link href="/polityka-prywatnosci" className="text-slate-600 hover:text-cyan-700 dark:text-white/52 dark:hover:text-cyan-300">Polityka prywatności</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-7 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-[10px] text-cyan-700 dark:border-white/10 dark:bg-white/[0.025] dark:text-cyan-300">
            <Activity className="size-3.5 text-emerald-500" /> Odsłony Turso Edge: <strong className="text-slate-950 dark:text-white">{visitCount}</strong>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-white/34">
            <span>© {new Date().getFullYear()} Emanuel Włoch</span>
            <a href="https://github.com/xitali" target="_blank" rel="me noopener noreferrer" className="inline-flex items-center gap-1 hover:text-cyan-700 dark:hover:text-cyan-300">GitHub <ArrowUpRight className="size-3" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
