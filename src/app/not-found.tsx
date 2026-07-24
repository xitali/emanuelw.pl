"use client";

import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#060913] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
      
      <div className="relative z-10 glass-panel p-10 sm:p-16 rounded-3xl border border-cyan-500/20 text-center space-y-6 max-w-xl">
        <div className="mx-auto w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 shadow-xl shadow-cyan-500/10 mb-6">
          <SearchX className="w-10 h-10 text-cyan-400" />
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-300">Strona nie została znaleziona</h2>
        
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Przepraszam, ale adres którego szukasz nie istnieje w mojej przestrzeni serwerowej, lub został przeniesiony.
        </p>
        
        <div className="pt-6">
          <Link href="/" className="inline-flex items-center gap-2 neon-glow-button px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95">
            <ArrowLeft className="w-4 h-4" />
            Wróć na Stronę Główną
          </Link>
        </div>
      </div>
    </main>
  );
}
