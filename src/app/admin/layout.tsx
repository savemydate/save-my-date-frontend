import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Panel de Administración | Save My Date",
  description: "Administración centralizada de eventos, invitados y confirmaciones de Save My Date.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row antialiased">
      {/* Barra Lateral de Navegación */}
      <AdminSidebar />

      {/* Contenedor Principal */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Barra Superior con perfil preparado para Google SSO */}
        <AdminHeader />

        {/* Área de Contenido del Dashboard */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
