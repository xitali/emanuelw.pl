"use client";

import { Testimonial } from "@/types";
import { Star, MessageSquareQuote } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 relative z-10 border-t border-slate-200 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-700 dark:text-cyan-300">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Zaufanie Klientów</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Co Mówią <span className="text-gradient-cyan">Moi Klienci</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Poznaj opinie firm i przedsiębiorców, z którymi miałem przyjemność współpracować przy tworzeniu nowoczesnych rozwiązań IT.
          </p>
        </div>

        {/* Grid of Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testim) => (
            <div key={testim.id} className="glass-panel-interactive p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent space-y-6 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex gap-1" aria-label={`Ocena: ${testim.rating} na 5`}>
                  {[...Array(testim.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  {[...Array(5 - testim.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-slate-200 dark:fill-slate-800 text-slate-300 dark:text-slate-700" />
                  ))}
                </div>
                <blockquote className="text-slate-600 dark:text-slate-300 italic text-sm md:text-base leading-relaxed">
                  {testim.content}
                </blockquote>
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-cyan-500/20">
                  {testim.client_name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-semibold text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{testim.client_name}</h4>
                  {testim.company && (
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-mono">{testim.company}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
