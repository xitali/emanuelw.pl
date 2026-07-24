"use client";

import { useState } from "react";
import { Terminal as TerminalIcon, Sparkles, ArrowRight, Code2, Cpu, Database, CheckCircle2, Copy, Check, User, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  const [terminalInput, setTerminalInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Emanuel Włoch v2.5 CLI Terminal initialized.",
    "Połączono z bazą Turso (aws-eu-west-1): OK [latency ~10ms]",
    "Wpisz 'help' lub wybierz szybkie komendy poniżej:",
  ]);

  const handleCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    let response: string[] = [];

    switch (cleanCmd) {
      case "help":
        response = [
          "Dostępne komendy:",
          "  about    - Informacje o mnie",
          "  stack    - Główny stos technologiczny",
          "  projects - Ostatnio ukończone komercyjne projekty",
          "  contact  - Bezpośrednie dane kontaktowe",
          "  clear    - Wyszczyść ekran",
        ];
        break;
      case "about":
        response = [
          "Emanuel Włoch: Full-Stack Engineer & Architect.",
          "Specjalizacja: Next.js 15, React 19, TypeScript, Turso, Tailwind v4, Mobile (React Native/Flutter).",
          "Lokalizacja: Podkarpacie / Zdalnie.",
        ];
        break;
      case "stack":
        response = [
          "CORE: Next.js, React, TypeScript, Node.js",
          "DATABASE: Turso (LibSQL), Supabase (PostgreSQL), Redis",
          "STYLING: Tailwind CSS v4, Framer Motion, Glassmorphism",
          "MOBILE/DESKTOP: React Native, Flutter, Electron, Tauri",
        ];
        break;
      case "projects":
        response = [
          "1. VIP Transfery - Luksusowa platforma dla VIP transportu (Next.js 16)",
          "2. Mototrasa Tour - System wypożyczalni z rezerwacjami Honda Bieszczady",
          "3. Dmuchańce Rzeszów - Animowana platforma eventowa z panelem CMS",
        ];
        break;
      case "contact":
        response = [
          "Email: emanuel.wloch@gmail.com",
          "Telefon: +48 725 403 682",
          "GitHub: github.com/xitali",
          "Instagram: @mrmun1o",
        ];
        break;
      case "clear":
        setTerminalOutput([]);
        setTerminalInput("");
        return;
      default:
        response = [`Brak komendy '${cmdStr}'. Wpisz 'help' aby zobaczyć listę.`];
    }

    setTerminalOutput((prev) => [...prev, `> ${cmdStr}`, ...response]);
    setTerminalInput("");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("emanuel.wloch@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Large Profile Photo */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Header Profile Avatar & Status Pill */}
            <div className="flex flex-wrap items-center gap-5">
              {/* Prominent Profile Photo */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-600 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden glass-panel border-2 border-cyan-400/80 shadow-2xl shadow-cyan-500/30 shrink-0 bg-slate-950">
                  {!imgError ? (
                    <img
                      src="/emanuel_wloch.jpg"
                      alt="Emanuel Włoch - Full-Stack Developer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Dostępny do nowych projektów B2B</span>
                </div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Full-Stack Software Architect
                </div>
              </div>
            </div>

            {/* Main title */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Tworzę Ultra-Szybkie <br />
              <span className="text-gradient-cyan">Aplikacje Webowe</span> & Mobilne
            </h1>

            {/* Paragraph description */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              Cześć, jestem <strong className="text-white font-semibold">Emanuel Włoch</strong>. Zamieniam skomplikowane pomysły biznesowe w nowoczesne, niezawodne i błyskawiczne systemy internetowe.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projekty"
                className="neon-glow-button px-7 py-3.5 rounded-full text-base font-semibold text-white flex items-center gap-3 group"
              >
                Zobacz Realizacje
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={copyEmail}
                className="glass-panel-interactive px-6 py-3.5 rounded-full text-sm font-medium text-slate-200 flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                {copied ? "Skopiowano Email!" : "emanuel.wloch@gmail.com"}
              </button>
            </div>

            {/* Quick stats badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80">
              <div>
                <div className="text-2xl font-bold text-white">99<span className="text-cyan-400">%+</span></div>
                <div className="text-xs text-slate-400 font-mono">Lighthouse Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">&lt;10<span className="text-purple-400">ms</span></div>
                <div className="text-xs text-slate-400 font-mono">Turso Edge Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100<span className="text-emerald-400">%</span></div>
                <div className="text-xs text-slate-400 font-mono">Type-Safe TypeScript</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive CLI Terminal Widget */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-950/40">
              {/* Window Header */}
              <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                  emanuel@turso-edge:~
                </div>
                <div className="w-12" />
              </div>

              {/* Terminal Body */}
              <div className="p-4 font-mono text-xs sm:text-sm h-80 overflow-y-auto bg-[#030712]/95 text-slate-300 space-y-2">
                {terminalOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.startsWith(">")
                        ? "text-cyan-400 font-semibold"
                        : line.includes("OK") || line.includes("Turso")
                        ? "text-emerald-400"
                        : "text-slate-300"
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Command Shortcut Buttons */}
              <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500 self-center font-mono">Quick:</span>
                {["about", "stack", "projects", "contact"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-slate-700 transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Terminal Input Line */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (terminalInput) handleCommand(terminalInput);
                }}
                className="bg-slate-950 px-4 py-3 border-t border-slate-800/80 flex items-center gap-2"
              >
                <span className="text-cyan-400 font-mono font-bold">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Wpisz komendę (np. help)..."
                  className="w-full bg-transparent text-slate-100 font-mono text-xs sm:text-sm focus:outline-none placeholder-slate-600"
                />
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
