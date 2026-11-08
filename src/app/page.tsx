import { EVENT_CONFIG } from "@/config/event";
import { Heart, Calendar, MapPin, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      <div className="w-full bg-white/80 backdrop-blur-sm border border-gold/30 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-champagne text-gold-dark mx-auto">
          <Heart className="w-6 h-6 fill-current" />
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-charcoal-muted">
            Save the Date
          </p>
          <h1 className="font-serif text-4xl text-charcoal tracking-wide">
            {EVENT_CONFIG.couple.title}
          </h1>
        </div>

        <div className="h-px w-24 bg-gold/40 mx-auto" />

        <div className="space-y-3 text-sm text-charcoal-muted">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-gold" />
            <span>{EVENT_CONFIG.date.display}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-gold" />
            <span>{EVENT_CONFIG.locations.ceremony.name}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gold/20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-light text-sage text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fase 1: Estructura base lista</span>
          </div>
          <p className="text-xs text-charcoal-muted mt-3">
            El proyecto está preparado para el desarrollo de componentes modulares en la Fase 2.
          </p>
        </div>
      </div>
    </main>
  );
}
