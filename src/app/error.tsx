"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Application Error Captured:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px]" />
      
      <div className="relative z-10 glass-panel p-10 sm:p-16 rounded-3xl border border-rose-500/20 text-center space-y-6 max-w-xl">
        <div className="mx-auto w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 shadow-xl shadow-rose-500/10 mb-6">
          <AlertTriangle className="w-10 h-10 text-rose-400" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Coś poszło nie tak</h1>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Wystąpił nieoczekiwany błąd. Spróbuj ponownie lub wróć na stronę główną.
        </p>
        
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 neon-glow-button px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Spróbuj Ponownie
          </button>
          
          <Link href="/" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 glass-panel-interactive px-8 py-3.5 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:scale-105 active:scale-95">
            Wróć na Główną
          </Link>
        </div>
      </div>
    </main>
  );
}
