"use client";

import { useState, useEffect } from "react";
import { Terminal, Code2, Sparkles, MessageSquare, Menu, X, Rocket, Wand2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projekty", href: "#projekty", icon: Code2 },
    { name: "Usługi", href: "#uslugi", icon: Rocket },
    { name: "Technologie", href: "#technologie", icon: Sparkles },
    { name: "Kontakt", href: "#kontakt", icon: MessageSquare },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#060913]/80 backdrop-blur-md border-b border-slate-200/50 dark:border-cyan-500/10 py-3 shadow-2xl shadow-slate-200/50 dark:shadow-cyan-950/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Emanuel
              <span 
                className="text-cyan-400 cursor-default" 
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/admin');
                }}
                title="Secret Admin Panel"
              >
                .
              </span>
              Włoch
            </span>
            <span className="text-[10px] font-mono tracking-widest text-cyan-500 dark:text-cyan-400/80 uppercase">
              Full-Stack Architect
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-md p-1.5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 rounded-full transition-all duration-200"
              >
                <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400/80" />
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Przełącz motyw (Jasny/Ciemny)"
              className="p-2.5 rounded-full border border-slate-700 dark:bg-slate-900 bg-white text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Wand2 className="w-4 h-4" />
            </button>
          )}
          
          <a
            href="#kontakt"
            className="neon-glow-button px-5 py-2.5 rounded-full text-sm font-semibold text-white tracking-wide flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Wyceń Projekt
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-200 dark:border-cyan-500/20 px-4 py-6 mt-3 space-y-3 animate-fadeIn bg-white/95 dark:bg-[#0d121e]/95">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 rounded-xl font-medium transition-all"
              >
                <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                {link.name}
              </a>
            );
          })}
          <a
            href="#kontakt"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center neon-glow-button py-3 rounded-xl text-white font-semibold mt-4"
          >
            Wyceń Projekt
          </a>
        </div>
      )}
    </header>
  );
}
