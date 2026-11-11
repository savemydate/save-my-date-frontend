import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/types/api";
import type { RsvpFormData, RsvpSubmission } from "@/types/rsvp";

const RSVP_STORAGE_KEY = "save_my_date_rsvp_submission";

type Listener = () => void;
let listeners: Listener[] = [];

// Caché en memoria para garantizar estabilidad referencial en useSyncExternalStore
let cachedRaw: string | null = null;
let cachedSubmission: RsvpSubmission | null = null;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

/**
 * Suscriptor para useSyncExternalStore.
 */
export function subscribeRsvp(listener: Listener): () => void {
  listeners.push(listener);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }
  return () => {
    listeners = listeners.filter((l) => l !== listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
}

/**
 * Snapshot del cliente para useSyncExternalStore.
 * Almacena en caché el objeto deserializado para evitar bucles infinitos por referencias nuevas.
 */
export function getRsvpSnapshot(): RsvpSubmission | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY);
    if (raw === cachedRaw) {
      return cachedSubmission;
    }
    cachedRaw = raw;
    cachedSubmission = raw ? (JSON.parse(raw) as RsvpSubmission) : null;
    return cachedSubmission;
  } catch {
    return null;
  }
}

/**
 * Snapshot del servidor (SSR) para useSyncExternalStore.
 */
export function getRsvpServerSnapshot(): RsvpSubmission | null {
  return null;
}

/**
 * Obtiene la confirmación RSVP previamente guardada en el dispositivo local si existe.
 */
export function getLocalRsvp(): RsvpSubmission | null {
  return getRsvpSnapshot();
}

/**
 * Guarda o actualiza la confirmación en el almacenamiento local.
 */
export function saveLocalRsvp(submission: RsvpSubmission): void {
  if (typeof window === "undefined") return;
  try {
    const serialized = JSON.stringify(submission);
    localStorage.setItem(RSVP_STORAGE_KEY, serialized);
    cachedRaw = serialized;
    cachedSubmission = submission;
    emitChange();
  } catch {
    // Almacenamiento local bloqueado o lleno
  }
}

/**
 * Elimina la confirmación guardada localmente (para permitir reintentar o editar).
 */
export function clearLocalRsvp(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RSVP_STORAGE_KEY);
    cachedRaw = null;
    cachedSubmission = null;
    emitChange();
  } catch {
    // Silencioso
  }
}

/**
 * Envía la confirmación de asistencia al backend Go.
 * Cuenta con resiliencia: si el backend está offline o en desarrollo,
 * almacena la respuesta en local y responde con éxito simulado.
 */
export async function submitRsvp(
  formData: RsvpFormData
): Promise<ApiResponse<RsvpSubmission>> {
  console.log(formData);
  const response = await apiClient<RsvpSubmission>("/api/v1/rsvp", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (response.success) {
    saveLocalRsvp(response.data);
    return response;
  }

  // Fallback de desarrollo y resiliencia offline:
  // Si el backend aún no tiene implementado /api/v1/rsvp o no está corriendo
  const fallbackSubmission: RsvpSubmission = {
    ...formData,
    id: `rsvp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  saveLocalRsvp(fallbackSubmission);

  return {
    success: true,
    data: fallbackSubmission,
  };
}
