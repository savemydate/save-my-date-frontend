"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";

export function HeroSection() {
  return (
    <section className="relative pt-8 pb-4 text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-champagne text-gold-dark border border-gold/40 shadow-xs mx-auto"
      >
        <Heart className="w-8 h-8 fill-current text-gold" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/60 text-gold-dark text-xs uppercase tracking-[0.25em] font-medium border border-gold/20">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Save the Date</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal tracking-wide leading-tight px-2">
          {EVENT_CONFIG.couple.title}
        </h1>

        <p className="text-sm text-charcoal-muted max-w-xs mx-auto leading-relaxed italic">
          &ldquo;El amor no mira con los ojos, sino con el alma.&rdquo; Con la bendición de Dios y de nuestras familias, nos unimos en matrimonio.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center justify-center gap-3 pt-2"
      >
        <span className="h-px w-12 bg-gold/40" />
        <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium">
          {EVENT_CONFIG.date.display}
        </span>
        <span className="h-px w-12 bg-gold/40" />
      </motion.div>
    </section>
  );
}
