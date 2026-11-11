import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { DressCodeSection } from "@/components/sections/DressCodeSection";
import { GiftRegistrySection } from "@/components/sections/GiftRegistrySection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { AudioPlayer } from "@/components/sections/AudioPlayer";
import { Heart, Sparkles } from "lucide-react";
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

        {/* Formulario RSVP Activo (Fase 3) */}
        <RsvpSection />

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
