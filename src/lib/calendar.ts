import { LocationInfo } from "@/types/event";

interface CalendarEventParams {
  title: string;
  description: string;
  location: LocationInfo;
  startDateIso: string; // "2026-11-20T17:00:00"
  durationHours?: number;
}

/**
 * Convierte una fecha ISO local a formato básico UTC YYYYMMDDTHHmmssZ para calendarios
 */
function formatUtcForCalendar(isoString: string, durationHours: number = 5): { start: string; end: string } {
  const startDate = new Date(isoString);
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const toUtcString = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

  return {
    start: toUtcString(startDate),
    end: toUtcString(endDate),
  };
}

/**
 * Genera la URL para agregar el evento a Google Calendar
 */
export function getGoogleCalendarUrl(params: CalendarEventParams): string {
  const { start, end } = formatUtcForCalendar(params.startDateIso, params.durationHours || 6);
  const locationString = `${params.location.name}, ${params.location.address}`;

  const queryParams = new URLSearchParams({
    action: "TEMPLATE",
    text: params.title,
    dates: `${start}/${end}`,
    details: params.description,
    location: locationString,
  });

  return `https://calendar.google.com/calendar/render?${queryParams.toString()}`;
}

/**
 * Genera el archivo .ics en Data URI para Apple Calendar, Outlook y dispositivos móviles
 */
export function getIcsDataUri(params: CalendarEventParams): string {
  const { start, end } = formatUtcForCalendar(params.startDateIso, params.durationHours || 6);
  const locationString = `${params.location.name}, ${params.location.address}`.replace(/,/g, "\\,");
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Save My Date//Boda Event//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:save-my-date-${Date.now()}@savemydate.app`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${params.title}`,
    `DESCRIPTION:${params.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${locationString}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
}
