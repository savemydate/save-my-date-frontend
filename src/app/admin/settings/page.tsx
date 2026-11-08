import Link from "next/link";
import { ArrowLeft, Shield, Key } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors mb-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Dashboard</span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-900">
          Configuración de la Plataforma
        </h2>
        <p className="text-xs text-slate-500">
          Gestiona las preferencias generales, accesos de administradores y credenciales de Google SSO.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Autenticación Google SSO
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Configuración de Client ID y secretos OAuth 2.0 para restringir el acceso al panel únicamente a cuentas autorizadas.
          </p>
          <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
            Próxima fase
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Conexión con Backend Go
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Parámetros de conexión a la API REST (`http://localhost:8080/api/v1`), timeouts y trazabilidad `X-Request-ID`.
          </p>
          <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
            Configuración Activa
          </span>
        </div>
      </div>
    </div>
  );
}
