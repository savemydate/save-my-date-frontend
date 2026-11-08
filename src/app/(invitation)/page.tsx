import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { DressCodeSection } from "@/components/sections/DressCodeSection";
import { GiftRegistrySection } from "@/components/sections/GiftRegistrySection";
import { AudioPlayer } from "@/components/sections/AudioPlayer";
import { Card } from "@/components/ui/Card";
import { Heart, Sparkles, Send } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2 opacity-60">
      <span className="h-px w-16 bg-gold/40" />
      <Sparkles className="w-3.5 h-3.5 text-gold" />
      <span className="h-px w-16 bg-gold/40" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 relative overflow-x-hidden">
      <div className="max-w-md mx-auto space-y-8">
        {/* Cabecera / Hero */}
        <HeroSection />

        <SectionDivider />

        {/* Cuenta Regresiva */}
        <CountdownSection />

        <SectionDivider />

        {/* Itinerario y Ubicaciones */}
        <LocationsSection />

        <SectionDivider />

        {/* Protocolo y Vestimenta */}
        <DressCodeSection />

        <SectionDivider />

        {/* Mesa de Regalos */}
        <GiftRegistrySection />

        <SectionDivider />

        {/* Preview / Placeholder de Fase 3: RSVP */}
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium">
              Asistencia
            </span>
            <h2 className="font-serif text-3xl text-charcoal">Confirma tu Lugar</h2>
          </div>

          <Card variant="glass" className="text-center space-y-4 p-6 sm:p-7">
            <div className="w-12 h-12 rounded-2xl bg-champagne text-gold-dark flex items-center justify-center mx-auto border border-gold/30">
              <Send className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-charcoal font-medium">
                Formulario de RSVP
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-sm mx-auto">
                Próximamente podrás confirmar tu asistencia, registrar acompañantes y especificar requerimientos alimenticios directamente desde aquí.
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne text-gold-dark text-xs font-medium border border-gold/25">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Próximo módulo: Fase 3</span>
              </span>
            </div>
          </Card>
        </section>

        {/* Pie de Página Nupcial */}
        <footer className="pt-6 pb-12 text-center space-y-2 text-xs text-charcoal-muted">
          <div className="flex items-center justify-center gap-1.5 text-gold">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <p className="font-serif text-base text-charcoal font-medium">
            {EVENT_CONFIG.couple.bride} & {EVENT_CONFIG.couple.groom}
          </p>
          <p className="text-[11px] uppercase tracking-widest text-charcoal-muted">
            {EVENT_CONFIG.date.display}
          </p>
        </footer>
      </div>

      {/* Reproductor Musical Flotante */}
      <AudioPlayer />
    </main>
  );
}
