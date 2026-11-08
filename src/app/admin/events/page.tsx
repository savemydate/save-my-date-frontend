import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { EventSummaryCard } from "@/components/admin/EventSummaryCard";
import { EVENT_CONFIG } from "@/config/event";
import type { AdminEventSummary } from "@/types/admin";

const DEMO_EVENT: AdminEventSummary = {
  id: "evt_demo_001",
  slug: "sofia-y-alejandro",
  title: "Nuestra Boda",
  coupleNames: `${EVENT_CONFIG.couple.bride} & ${EVENT_CONFIG.couple.groom}`,
  date: EVENT_CONFIG.date.display,
  locationName: EVENT_CONFIG.locations.ceremony.name,
  status: "published",
  guestCount: 150,
  confirmedCount: 94,
  declinedCount: 12,
  pendingCount: 44,
  createdAt: "2026-01-15T10:00:00Z",
  updatedAt: "2026-11-08T12:00:00Z",
};

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Dashboard</span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">
            Administración de Eventos
          </h2>
          <p className="text-xs text-slate-500">
            Crea, edita y configura los parámetros de cada evento de la plataforma.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Evento</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <EventSummaryCard event={DEMO_EVENT} publicUrl="/" />
      </div>
    </div>
  );
}
