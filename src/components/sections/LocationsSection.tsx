"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, CalendarPlus, ExternalLink, Church, PartyPopper } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";
import { LocationInfo } from "@/types/event";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getGoogleCalendarUrl, getIcsDataUri } from "@/lib/calendar";

interface LocationCardProps {
  type: "ceremony" | "reception";
  title: string;
  location: LocationInfo;
}

function LocationCard({ type, title, location }: LocationCardProps) {
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  const isCeremony = type === "ceremony";
  const Icon = isCeremony ? Church : PartyPopper;

  const calendarParams = {
    title: `Boda de ${EVENT_CONFIG.couple.bride} y ${EVENT_CONFIG.couple.groom} - ${title}`,
    description: `Celebración de nuestra boda. ${title} en ${location.name}.`,
    location,
    startDateIso: EVENT_CONFIG.date.iso,
    durationHours: isCeremony ? 2 : 6,
  };

  const handleOpenGoogleCalendar = () => {
    const url = getGoogleCalendarUrl(calendarParams);
    window.open(url, "_blank", "noopener,noreferrer");
    setShowCalendarMenu(false);
  };

  const handleDownloadIcs = () => {
    const icsUri = getIcsDataUri(calendarParams);
    const link = document.createElement("a");
    link.href = icsUri;
    link.download = `boda-${type}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCalendarMenu(false);
  };

  return (
    <Card variant="glass" className="space-y-4 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-champagne text-gold-dark flex items-center justify-center shrink-0 border border-gold/30">
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium">
            {title}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            {location.name}
          </h3>
        </div>
      </div>

      <div className="space-y-2 text-xs sm:text-sm text-charcoal-muted pt-1">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Clock className="w-4 h-4 text-gold shrink-0" />
          <span>{location.time}</span>
        </div>
        <div className="flex items-start justify-center sm:justify-start gap-2">
          <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <span>{location.address}</span>
        </div>
      </div>

      <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
        <a
          href={location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <Button variant="champagne" size="sm">
            <span>Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </a>

        {location.wazeUrl && (
          <a
            href={location.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button variant="outline" size="sm">
              <span>Waze</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </a>
        )}

        <div className="relative inline-flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCalendarMenu((prev) => !prev)}
            aria-expanded={showCalendarMenu}
            className="border border-gold/25"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-gold" />
            <span>Agendar</span>
          </Button>

          {showCalendarMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute left-0 bottom-full mb-2 w-48 bg-white border border-gold/30 rounded-2xl shadow-lg p-2 z-20 space-y-1"
            >
              <button
                type="button"
                onClick={handleOpenGoogleCalendar}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-charcoal hover:bg-champagne/60 rounded-xl transition-colors cursor-pointer text-left"
              >
                <span>Google Calendar</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-charcoal hover:bg-champagne/60 rounded-xl transition-colors cursor-pointer text-left"
              >
                <span>Apple / iCal (.ics)</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
}

export function LocationsSection() {
  const { locations } = EVENT_CONFIG;

  return (
    <section className="space-y-4">
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium">
          Itinerario
        </span>
        <h2 className="font-serif text-3xl text-charcoal">¿Cuándo y Dónde?</h2>
      </div>

      <div className="space-y-4">
        <LocationCard
          type="ceremony"
          title="Ceremonia Religiosa"
          location={locations.ceremony}
        />
        <LocationCard
          type="reception"
          title="Recepción & Fiesta"
          location={locations.reception}
        />
      </div>
    </section>
  );
}
