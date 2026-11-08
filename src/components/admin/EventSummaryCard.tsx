"use client";

import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Copy,
  Check,
  MoreVertical,
  Heart,
} from "lucide-react";
import type { AdminEventSummary } from "@/types/admin";
import { useClipboard } from "@/hooks/useClipboard";
import { cn } from "@/lib/utils";

interface EventSummaryCardProps {
  event: AdminEventSummary;
  publicUrl?: string;
}

export function EventSummaryCard({
  event,
  publicUrl = "/",
}: EventSummaryCardProps) {
  const { copied, copy } = useClipboard();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    const fullUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${publicUrl}`
        : publicUrl;
    copy(fullUrl);
  };

  const statusBadgeMap = {
    published: {
      label: "Publicado",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    },
    draft: {
      label: "Borrador",
      className: "bg-amber-50 text-amber-700 border-amber-200/70",
    },
    archived: {
      label: "Archivado",
      className: "bg-slate-100 text-slate-600 border-slate-200",
    },
  };

  const statusInfo = statusBadgeMap[event.status];
  const progressPercent =
    event.guestCount > 0
      ? Math.round((event.confirmedCount / event.guestCount) * 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow p-5 sm:p-6 space-y-4">
      {/* Cabecera de la tarjeta */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border",
                statusInfo.className
              )}
            >
              {statusInfo.label}
            </span>
            <span className="text-[11px] text-slate-600 font-mono">
              ID: {event.id}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 truncate">
            {event.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current shrink-0" />
            <span className="font-medium text-slate-700">{event.coupleNames}</span>
          </div>
        </div>

        {/* Botón de acciones secundarias */}
        <button
          type="button"
          aria-label="Más opciones"
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Metadatos: Fecha y Ubicación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-600 shrink-0" />
          <span className="truncate">{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-600 shrink-0" />
          <span className="truncate">{event.locationName}</span>
        </div>
      </div>

      {/* Métricas de Confirmación */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-600" />
            Asistencia Confirmada
          </span>
          <span className="font-semibold text-slate-900">
            {event.confirmedCount} / {event.guestCount} ({progressPercent}%)
          </span>
        </div>

        {/* Barra de progreso visual */}
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Desglose breve */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
          <span className="text-emerald-700 font-medium">
            ✓ {event.confirmedCount} confirmados
          </span>
          <span className="text-slate-600">
            ⏳ {event.pendingCount} pendientes
          </span>
          <span className="text-rose-600">
            ✕ {event.declinedCount} declinados
          </span>
        </div>
      </div>

      {/* Botones de acción principales */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Enlace Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copiar Link</span>
              </>
            )}
          </button>

          <Link
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            <span>Ver Invitación</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
          </Link>
        </div>

        <Link
          href={`/admin/events/${event.id}`}
          className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          Administrar
        </Link>
      </div>
    </div>
  );
}
