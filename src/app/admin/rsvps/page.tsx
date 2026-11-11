"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  ArrowLeft,
  Download,
  Search,
  CheckCircle2,
  XCircle,
  Utensils,
  Phone,
  MessageSquare,
  Sparkles,
  Calendar,
} from "lucide-react";
import type { RsvpSubmission } from "@/types/rsvp";
import {
  subscribeRsvp,
  getRsvpSnapshot,
  getRsvpServerSnapshot,
} from "@/services/api/rsvp";

// Datos iniciales de demostración para visualización completa del panel
const INITIAL_RSVP_LIST: RsvpSubmission[] = [
  {
    id: "rsvp-demo-1",
    fullName: "Mariana Ramos & Familia",
    attending: true,
    guestsCount: 4,
    phone: "55 1234 5678",
    dietaryRestrictions: "Vegetariano, Sin gluten",
    message: "¡Muchísimas felicidades! Nos vemos ahí con toda la emoción del mundo.",
    createdAt: "2026-11-01T10:30:00Z",
  },
  {
    id: "rsvp-demo-2",
    fullName: "Carlos Mendoza Torres",
    attending: true,
    guestsCount: 2,
    phone: "55 9876 5432",
    dietaryRestrictions: "Sin mariscos",
    message: "Un abrazo enorme para ambos. ¡Que viva el amor!",
    createdAt: "2026-11-03T14:15:00Z",
  },
  {
    id: "rsvp-demo-3",
    fullName: "Dr. Roberto Villaseñor",
    attending: false,
    guestsCount: 0,
    phone: "33 4567 8901",
    message: "Estaré fuera del país en un congreso médico, pero les deseo toda la felicidad hoy y siempre.",
    createdAt: "2026-11-04T09:20:00Z",
  },
  {
    id: "rsvp-demo-4",
    fullName: "Valeria Ortiz & Acompañante",
    attending: true,
    guestsCount: 2,
    phone: "81 2345 6789",
    dietaryRestrictions: "Vegano",
    message: "¡Listos para celebrar en la pista de baile!",
    createdAt: "2026-11-05T18:40:00Z",
  },
  {
    id: "rsvp-demo-5",
    fullName: "Gonzalo Ruiz Herrera",
    attending: true,
    guestsCount: 1,
    phone: "55 8765 4321",
    message: "Un honor ser parte de este momento tan especial.",
    createdAt: "2026-11-06T12:00:00Z",
  },
];

export default function AdminRsvpsPage() {
  const localSubmission = React.useSyncExternalStore(
    subscribeRsvp,
    getRsvpSnapshot,
    getRsvpServerSnapshot
  );

  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "attending" | "declined">("all");
  const [selectedMessage, setSelectedMessage] = React.useState<{ name: string; message: string } | null>(null);

  // Combinación reactiva de la confirmación local con los datos iniciales
  const rsvps = React.useMemo(() => {
    if (localSubmission && localSubmission.fullName) {
      const exists = INITIAL_RSVP_LIST.some(
        (r) => r.fullName.toLowerCase() === localSubmission.fullName.toLowerCase()
      );
      if (!exists) {
        return [localSubmission, ...INITIAL_RSVP_LIST];
      }
    }
    return INITIAL_RSVP_LIST;
  }, [localSubmission]);

  // Cálculo de Métricas KPI
  const totalSubmissions = rsvps.length;
  const attendingList = rsvps.filter((r) => r.attending);
  const totalGuests = attendingList.reduce((sum, r) => sum + (r.guestsCount || 0), 0);
  const declinedCount = rsvps.filter((r) => !r.attending).length;
  const dietaryCount = rsvps.filter((r) => r.attending && r.dietaryRestrictions && r.dietaryRestrictions.trim().length > 0).length;

  // Filtrado reactivo de confirmaciones
  const filteredRsvps = rsvps.filter((rsvp) => {
    const matchesSearch =
      rsvp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rsvp.phone && rsvp.phone.includes(searchTerm)) ||
      (rsvp.dietaryRestrictions && rsvp.dietaryRestrictions.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === "attending") return rsvp.attending;
    if (statusFilter === "declined") return !rsvp.attending;
    return true;
  });

  // Generación y Descarga de CSV con BOM para Excel
  const handleExportCsv = () => {
    const headers = [
      "ID",
      "Nombre Completo",
      "Estado",
      "Pases / Asistentes",
      "Teléfono",
      "Restricciones Dietéticas",
      "Mensaje de Felicitación",
      "Fecha de Registro",
    ];

    const rows = filteredRsvps.map((r) => [
      r.id || "N/A",
      `"${(r.fullName || "").replace(/"/g, '""')}"`,
      r.attending ? "Asistirá" : "No asistirá",
      r.attending ? r.guestsCount : 0,
      `"${(r.phone || "").replace(/"/g, '""')}"`,
      `"${(r.dietaryRestrictions || "").replace(/"/g, '""')}"`,
      `"${(r.message || "").replace(/"/g, '""')}"`,
      r.createdAt ? new Date(r.createdAt).toLocaleString("es-MX") : "N/A",
    ]);

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];

    link.setAttribute("href", url);
    link.setAttribute("download", `confirmaciones-boda-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado y Navegación */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors mb-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Dashboard</span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Control de Asistencias (RSVP)
          </h2>
          <p className="text-xs text-slate-500">
            Monitorea en tiempo real los pases confirmados, dietas y mensajes de tus invitados.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.98] w-full sm:w-auto cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV ({filteredRsvps.length})</span>
          </button>
        </div>
      </div>

      {/* Tarjetas KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Pases Confirmados
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{totalGuests}</p>
          <span className="text-[11px] text-slate-400">En {attendingList.length} familias/invitaciones</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Asistirán
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{attendingList.length}</p>
          <span className="text-[11px] text-slate-400">Respuestas positivas</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              No Podrán Asistir
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{declinedCount}</p>
          <span className="text-[11px] text-slate-400">Respuestas declinadas</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Restricciones Dietéticas
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{dietaryCount}</p>
          <span className="text-[11px] text-slate-400">Para el equipo de catering</span>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, teléfono o dieta..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === "all"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Todos ({totalSubmissions})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("attending")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === "attending"
                ? "bg-white text-emerald-700 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Asistirán ({attendingList.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("declined")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === "declined"
                ? "bg-white text-rose-700 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Declinados ({declinedCount})
          </button>
        </div>
      </div>

      {/* Tabla de Registros */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Invitado</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-center">Pases</th>
                <th className="py-3 px-4">Dieta / Alergias</th>
                <th className="py-3 px-4">Dedicatoria</th>
                <th className="py-3 px-4 text-right">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRsvps.length > 0 ? (
                filteredRsvps.map((rsvp, idx) => (
                  <tr
                    key={rsvp.id || `rsvp-${idx}`}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {rsvp.fullName}
                      </div>
                      {rsvp.phone && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{rsvp.phone}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {rsvp.attending ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Asistirá</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          <XCircle className="w-3 h-3" />
                          <span>No asistirá</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {rsvp.attending ? (
                        <span className="inline-flex items-center justify-center font-bold px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs">
                          {rsvp.guestsCount} {rsvp.guestsCount === 1 ? "pase" : "pases"}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {rsvp.dietaryRestrictions ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 text-[11px]">
                          <Utensils className="w-2.5 h-2.5 text-amber-600" />
                          <span>{rsvp.dietaryRestrictions}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Ninguna</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      {rsvp.message ? (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedMessage({
                              name: rsvp.fullName,
                              message: rsvp.message || "",
                            })
                          }
                          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer text-left truncate"
                        >
                          <MessageSquare className="w-3 h-3 text-slate-400 group-hover:text-slate-700 shrink-0" />
                          <span className="truncate italic">
                            &ldquo;{rsvp.message}&rdquo;
                          </span>
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right text-[11px] text-slate-400 whitespace-nowrap">
                      {rsvp.createdAt ? (
                        <span className="inline-flex items-center gap-1 justify-end">
                          <Calendar className="w-3 h-3 text-slate-300" />
                          {new Date(rsvp.createdAt).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 space-y-2">
                    <Users className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-medium">No se encontraron confirmaciones con ese criterio.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para lectura de mensaje completo */}
      {selectedMessage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="font-semibold text-slate-900 text-sm">
                  Mensaje de {selectedMessage.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-sm font-semibold transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
              &ldquo;{selectedMessage.message}&rdquo;
            </p>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
