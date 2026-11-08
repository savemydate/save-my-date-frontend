import {
  CalendarDays,
  Users,
  CheckCircle2,
  TrendingUp,
  Plus,
  Sparkles,
  ShieldCheck,
  Search,
} from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";
import type { AdminEventSummary, DashboardStats } from "@/types/admin";
import { EventSummaryCard } from "@/components/admin/EventSummaryCard";

// Mock del evento inicial basado en la configuración actual
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

const STATS: DashboardStats = {
  totalEvents: 1,
  activeEvents: 1,
  totalGuests: 150,
  confirmedGuests: 94,
  pendingGuests: 44,
  declinedGuests: 12,
  confirmationRatePercentage: 63,
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Banner de Bienvenida y Próximo Google SSO */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-800 text-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fase de Arquitectura Multi-Evento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Panel de Administración de Eventos
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Administra tus eventos, supervisa confirmaciones en tiempo real y gestiona las invitaciones online de forma independiente a la vista de los invitados.
          </p>
        </div>

        {/* Decoración geométrica sutil */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-slate-700/30 blur-2xl pointer-events-none" />
      </div>

      {/* Tarjetas de Métricas Globales (KPIs) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Eventos Activos */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Eventos Activos
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-slate-900">
              {STATS.activeEvents}
            </div>
            <p className="text-[11px] text-slate-600">
              {STATS.totalEvents} evento registrado en total
            </p>
          </div>
        </div>

        {/* KPI 2: Total Invitados */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Invitados Registrados
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-slate-900">
              {STATS.totalGuests}
            </div>
            <p className="text-[11px] text-slate-600">
              Capacidad esperada total
            </p>
          </div>
        </div>

        {/* KPI 3: Confirmaciones Recibidas */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Confirmados (RSVP)
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-slate-900">
              {STATS.confirmedGuests}
            </div>
            <p className="text-[11px] text-emerald-600 font-medium">
              +{STATS.confirmedGuests} asistencias aseguradas
            </p>
          </div>
        </div>

        {/* KPI 4: Tasa de Respuesta */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tasa de Respuesta
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-slate-900">
              {STATS.confirmationRatePercentage}%
            </div>
            <p className="text-[11px] text-slate-600">
              {STATS.pendingGuests} invitados pendientes
            </p>
          </div>
        </div>
      </section>

      {/* Sección Principal: Lista de Eventos y Acciones */}
      <section className="space-y-4">
        {/* Cabecera de la lista con buscador y botón de nuevo evento */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Tus Eventos
            </h3>
            <p className="text-xs text-slate-600">
              Selecciona un evento para ver o editar sus detalles, itinerario y lista de asistentes.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Buscador de eventos (placeholder) */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar evento..."
                readOnly
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Botón para Crear Evento */}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Evento</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de eventos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <EventSummaryCard event={DEMO_EVENT} publicUrl="/" />
        </div>
      </section>

      {/* Nota de Arquitectura y Próximos Módulos */}
      <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 text-slate-600 text-xs flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-800">
            Próximas iteraciones del Panel
          </p>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Se añadirán la capa de autenticación con Google SSO, el formulario de creación/edición de eventos (CRUD completo) y la conexión directa al backend en Go para persistencia en base de datos.
          </p>
        </div>
      </div>
    </div>
  );
}
