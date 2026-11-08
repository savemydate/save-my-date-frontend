"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";
import { useCountdown } from "@/hooks/useCountdown";
import { Card } from "@/components/ui/Card";

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  const formattedValue = value < 10 ? `0${value}` : `${value}`;

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-champagne-light border border-gold/25 shadow-2xs">
      <span className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal tabular-nums">
        {formattedValue}
      </span>
      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-charcoal-muted mt-0.5">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const { days, hours, minutes, seconds, isEventPassed, isReady } = useCountdown(EVENT_CONFIG.date.iso);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-center gap-2 text-gold-dark text-xs font-medium uppercase tracking-[0.2em]">
        <Clock className="w-3.5 h-3.5 text-gold" />
        <span>Faltan solo</span>
      </div>

      <Card variant="glass" className="p-5 sm:p-6 text-center">
        {!isReady ? (
          <div className="grid grid-cols-4 gap-2.5 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-2xl bg-champagne/60" />
            ))}
          </div>
        ) : isEventPassed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-4 space-y-1"
          >
            <p className="font-serif text-2xl text-gold-dark font-medium">¡Llegó el gran día!</p>
            <p className="text-xs text-charcoal-muted">Gracias por ser parte de nuestra historia de amor.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-4 gap-2.5"
          >
            <TimeUnit value={days} label="Días" />
            <TimeUnit value={hours} label="Horas" />
            <TimeUnit value={minutes} label="Min" />
            <TimeUnit value={seconds} label="Seg" />
          </motion.div>
        )}
      </Card>
    </section>
  );
}
