"use client";

import { Bell, CheckCircle2, LogIn } from "lucide-react";
import type { AdminUser } from "@/types/auth";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  currentUser?: AdminUser | null;
}

export function AdminHeader({
  title = "Panel de Control",
  subtitle = "Gestión centralizada de eventos e invitaciones",
  currentUser = {
    id: "usr_mock_admin",
    name: "Administrador",
    email: "admin@savemydate.app",
    role: "superadmin",
    provider: "google",
  },
}: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
      {/* Título de sección (con espaciado en móviles para no chocar con el botón menú) */}
      <div className="pl-12 md:pl-0 min-w-0">
        <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[11px] text-slate-600 truncate hidden sm:block">
            {subtitle}
          </p>
        )}
      </div>

      {/* Acciones y Perfil */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Indicador de estado del Backend */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Backend v1 Online</span>
        </div>

        {/* Campana de notificaciones (placeholder) */}
        <button
          type="button"
          aria-label="Ver notificaciones"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* Perfil preparado para Google SSO */}
        {currentUser ? (
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 text-white flex items-center justify-center text-xs font-bold ring-2 ring-slate-100">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-900 leading-none">
                  {currentUser.name}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                  {currentUser.role}
                </span>
              </div>
              <span className="text-[11px] text-slate-600 block leading-tight mt-0.5">
                {currentUser.email}
              </span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
          >
            <LogIn className="w-3.5 h-3.5 text-blue-600" />
            <span>Google SSO</span>
          </button>
        )}
      </div>
    </header>
  );
}
