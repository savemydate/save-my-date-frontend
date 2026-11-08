"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Settings,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Eventos", href: "/admin/events", icon: CalendarDays },
  { name: "Confirmaciones (RSVP)", href: "/admin/rsvps", icon: Users },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Botón flotante móvil para abrir sidebar */}
      <div className="md:hidden fixed top-3 left-3 z-40">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Overlay oscuro para pantallas móviles */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          onClick={closeSidebar}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") closeSidebar();
          }}
          aria-label="Cerrar menú móvil"
          className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar contenedor */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Brand / Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
          <Link
            href="/admin"
            onClick={closeSidebar}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs group-hover:scale-105 transition-transform">
              S
            </div>
            <div>
              <span className="font-semibold text-slate-900 text-sm tracking-tight block">
                Save My Date
              </span>
              <span className="text-[10px] text-slate-600 uppercase font-mono tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Admin Suite
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Cerrar navegación"
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links de navegación */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Gestión
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      isActive ? "text-white" : "text-slate-500"
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-semibold",
                      isActive
                        ? "bg-slate-700 text-slate-100"
                        : "bg-slate-200 text-slate-700"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer del sidebar: enlace rápido a vista pública */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
            <div className="flex items-center gap-2 text-amber-900 font-medium text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Modo Plataforma</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Las invitaciones públicas se renderizan en sus propias rutas aisladas.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Ver Invitación Pública</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
          </Link>
        </div>
      </aside>
    </>
  );
}
