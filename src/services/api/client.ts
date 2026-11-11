import { ENV } from "@/config/env";
import type { ApiResponse } from "@/types/api";

const DEFAULT_TIMEOUT_MS = 8000;

/**
 * Cliente HTTP resiliente con timeout, trazabilidad X-Request-ID y tipado estricto.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const baseUrl = ENV.API_URL;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  // Generar ID único de correlación para observabilidad
  const requestId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  try {
    const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;

    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": requestId,
        ...options.headers,
      },
    });

    const data: ApiResponse<T> = await res.json();
    return data;
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === "AbortError";

    return {
      success: false,
      error: {
        code: isTimeout ? "TIMEOUT_ERROR" : "NETWORK_ERROR",
        message: isTimeout
          ? "La conexión tardó demasiado tiempo. Por favor intenta de nuevo."
          : "No se pudo conectar con el servidor. Revisa tu conexión de red.",
      },
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
