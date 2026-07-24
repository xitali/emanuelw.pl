"use client";

import Link from "next/link";
import { Terminal, Heart, Shield, Activity } from "lucide-react";

interface FooterProps {
  visitCount?: number;
}

export default function Footer({ visitCount = 0 }: FooterProps) {
  return (
    <footer className="border-t border-slate-800/80 bg-[#02040a] relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white">
              Emanuel<span className="text-cyan-400">.</span>Włoch
            </span>
          </div>

          {/* Turso DB Visit Counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Odsłony Turso Edge: <strong className="text-white">{visitCount}</strong></span>
          </div>

          {/* Admin link & copyright */}
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link href="/admin" className="hover:text-cyan-400 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              Panel CMS
            </Link>
            <span>•</span>
            <span>© {new Date().getFullYear()} Emanuel Włoch. Wszystkie prawa zastrzeżone.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
