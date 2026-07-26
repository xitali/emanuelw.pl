"use client";

import { useState } from "react";
import { loginAdminAction } from "@/app/actions/admin";
import { ShieldCheck, Lock, ArrowLeft, KeyRound, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const res = await loginAdminAction(formData);

    setLoading(false);
    if (res && !res.success) {
      setErrorMsg(res.error || "Błąd logowania.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]" />

      <div className="glass-panel relative z-10 w-full max-w-md p-8 rounded-3xl border border-slate-200 dark:border-cyan-500/30 shadow-xl dark:shadow-2xl space-y-6 bg-white/90 dark:bg-[#090d16]/90">
        
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300">
            <ArrowLeft className="w-4 h-4" /> Strona Główna
          </Link>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">Turso Protected</span>
        </div>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-50 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-none dark:shadow-lg dark:shadow-cyan-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Logowanie do Panelu Admina</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Wprowadź hasło administratora, aby uzyskać dostęp do zarządzania bazy Turso DB.
          </p>
        </div>

        {errorMsg && (
          <div role="alert" aria-live="polite" className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-password" className="text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <KeyRound className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Hasło Administratora
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type="password"
                name="password"
                required
                placeholder="Wpisz swoje hasło..."
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-900 dark:text-slate-100 text-sm"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-4 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="neon-glow-button w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Weryfikowanie hasła..." : "Zaloguj się do CMS"}
          </button>
        </form>
      </div>
    </main>
  );
}
