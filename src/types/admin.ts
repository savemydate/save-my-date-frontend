/**
 * Tipos y modelos para el Panel de Administración de Save My Date
 */

export type EventStatus = "draft" | "published" | "archived";

export interface AdminEventSummary {
  id: string;
  slug: string;
  title: string;
  coupleNames: string;
  date: string;
  locationName: string;
  status: EventStatus;
  guestCount: number;
  confirmedCount: number;
  declinedCount: number;
  pendingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalEvents: number;
  activeEvents: number;
  totalGuests: number;
  confirmedGuests: number;
  pendingGuests: number;
  declinedGuests: number;
  confirmationRatePercentage: number;
}
