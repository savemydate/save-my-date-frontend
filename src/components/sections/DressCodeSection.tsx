"use client";

import { Shirt, Sparkles, AlertCircle } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";
import { Card } from "@/components/ui/Card";

export function DressCodeSection() {
  const { dressCode } = EVENT_CONFIG;

  return (
    <section className="space-y-4">
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium">
          Protocolo
        </span>
        <h2 className="font-serif text-3xl text-charcoal">Código de Vestimenta</h2>
      </div>

      <Card variant="glass" className="text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-champagne text-gold-dark flex items-center justify-center mx-auto border border-gold/30">
          <Shirt className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-2xl text-charcoal font-medium">
            {dressCode.title}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-sm mx-auto">
            {dressCode.description}
          </p>
        </div>

        {dressCode.paletteNotes && dressCode.paletteNotes.length > 0 && (
          <div className="pt-3 border-t border-gold/20 flex flex-wrap gap-2 justify-center">
            {dressCode.paletteNotes.map((note, index) => {
              const isWhiteWarning = note.toLowerCase().includes("blanco");

              return (
                <div
                  key={index}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                    isWhiteWarning
                      ? "bg-amber-50 text-amber-900 border-amber-200"
                      : "bg-champagne/70 text-charcoal-muted border-gold/30"
                  }`}
                >
                  {isWhiteWarning ? (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                  )}
                  <span>{note}</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </section>
  );
}
