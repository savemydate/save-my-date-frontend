import { EventConfig } from "@/types/event";

/**
 * Configuración centralizada de los datos del evento.
 * Modifica estos valores para personalizar la boda sin tocar los componentes.
 */
export const EVENT_CONFIG: EventConfig = {
  couple: {
    bride: "Sofía",
    groom: "Alejandro",
    title: "Sofía & Alejandro",
  },
  date: {
    iso: "2026-11-20T17:00:00",
    display: "Viernes, 20 de Noviembre de 2026",
    time: "17:00 hrs",
  },
  locations: {
    ceremony: {
      name: "Parroquia de San Francisco de Asís",
      address: "Calle Principal #123, Centro Histórico",
      time: "17:00 hrs",
      googleMapsUrl: "https://maps.google.com",
      wazeUrl: "https://waze.com",
    },
    reception: {
      name: "Hacienda Los Laureles",
      address: "Camino Real a la Huerta Km 4.5",
      time: "19:00 hrs",
      googleMapsUrl: "https://maps.google.com",
      wazeUrl: "https://waze.com",
    },
  },
  dressCode: {
    title: "Rigurosa Etiqueta / Black Tie",
    description: "Mujeres: Vestido largo de noche. Hombres: Esmoquin o traje oscuro.",
    paletteNotes: ["Evitar color blanco", "Tonos cálidos recomendados"],
  },
  giftRegistry: {
    message: "El mejor regalo es tu presencia, pero si deseas hacernos un detalle:",
    stores: [
      {
        name: "Liverpool",
        url: "https://www.liverpool.com.mx",
        eventNumber: "12345678",
      },
      {
        name: "Amazon México",
        url: "https://www.amazon.com.mx",
      },
    ],
    bankAccount: {
      bank: "BBVA",
      accountHolder: "Alejandro & Sofía",
      clabe: "012180000000000000",
    },
  },
  audio: {
    src: "/audio/wedding-song.mp3",
    title: "Nuestra Canción",
  },
};
