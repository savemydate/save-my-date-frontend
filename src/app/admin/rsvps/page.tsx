import Link from "next/link";
import { Users, ArrowLeft, Download, Filter } from "lucide-react";

export default function AdminRsvpsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Dashboard</span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">
            Lista de Confirmaciones (RSVP)
          </h2>
          <p className="text-xs text-slate-500">
            Supervisa en tiempo real las respuestas de los invitados, acompañantes y restricciones dietéticas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filtrar</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
          <Users className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-sm mx-auto">
          <h3 className="text-base font-bold text-slate-900">
            Módulo RSVP en Integración
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Este módulo se conectará con el endpoint del backend Go (`POST /api/v1/rsvp` y `GET /api/v1/rsvps`) para mostrar la lista paginada y detallada de asistentes.
          </p>
        </div>
      </div>
    </div>
  );
}
