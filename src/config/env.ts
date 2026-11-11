/**
 * Configuración y validación de variables de entorno públicas y de servidor.
 */

export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
} as const;
