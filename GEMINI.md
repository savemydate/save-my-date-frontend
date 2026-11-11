# Save My Date - Frontend Guidelines & Architecture

Este documento define la arquitectura, lineamientos de diseño, estándares de código, seguridad y mejores prácticas para el desarrollo de **Save My Date Frontend** en **Next.js (App Router)** y **TypeScript**. Debe ser seguido como guía por desarrolladores y agentes de IA al implementar nuevas funcionalidades o refactorizar el código.

---

## 1. Visión General del Proyecto

- **Nombre:** `save-my-date-frontend`
- **Framework & Runtime:** Next.js 16+ (App Router) con React 19 y Node.js (v20+)
- **Estilos & UI:** Tailwind CSS v4 con `@theme` personalizado, Lucide Icons, Framer Motion 14
- **Objetivo Principal:**
  - Experiencia web móvil premium (*mobile-first*) para invitación de bodas y eventos especiales, optimizada para compartirse mediante WhatsApp, Instagram y mensajería instantánea.
  - Interacción fluida: cuenta regresiva, reproductor de audio con control móvil, itinerarios con enlaces a Google Maps/Waze, botón para añadir a calendarios, mesa de regalos con copia de CLABE bancaria y formulario RSVP con feedback de confeti.
  - Integración segura, resiliente y tipada con el backend Go ([save-my-date-backend](file:///home/jomirore/Documentos/GitHub/save-my-date-backend)).

---

## 2. Arquitectura de Software y Estructura del Proyecto

Se adopta una arquitectura modular orientada a dominios y componentes (*Feature & Layered Architecture*), respetando los estándares de Next.js App Router:

```text
save-my-date-frontend/
├── public/                      # Recursos estáticos públicos (audios, imágenes, favicon, og-image)
│   ├── audio/                   # Pistas de música de fondo (ej. wedding-song.mp3)
│   └── images/                  # Fotografías de los novios, galerías y recursos gráficos
├── src/
│   ├── app/                     # Rutas y páginas del Next.js App Router
│   │   ├── favicon.ico
│   │   ├── globals.css          # Estilos globales y tokens semánticos de Tailwind v4 (@theme)
│   │   ├── layout.tsx           # Layout raíz con configuración de fuentes y viewport móvil
│   │   ├── page.tsx             # Página principal interactiva (ensamblador de secciones)
│   │   └── api/                 # Route Handlers / BFF (BFF proxies hacia backend Go si aplica)
│   ├── components/              # Componentes de la interfaz de usuario
│   │   ├── sections/            # Secciones principales de la invitación (Hero, Countdown, Audio, etc.)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CountdownSection.tsx
│   │   │   ├── AudioPlayer.tsx
│   │   │   ├── EventDetailsSection.tsx
│   │   │   ├── LocationsSection.tsx
│   │   │   ├── DressCodeSection.tsx
│   │   │   ├── GiftRegistrySection.tsx
│   │   │   └── RsvpSection.tsx
│   │   └── ui/                  # Componentes base atómicos reutilizables (Botones, Inputs, Modales)
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── Toast.tsx
│   ├── config/                  # Configuración declarativa de datos del evento y entorno
│   │   ├── env.ts               # Validación de variables de entorno públicas y privadas
│   │   └── event.ts             # Datos estáticos configurables de la boda (pareja, horarios, etc.)
│   ├── hooks/                   # Custom Hooks reutilizables para lógica reactiva
│   │   ├── useCountdown.ts      # Cálculo en tiempo real de días, horas, minutos y segundos
│   │   ├── useAudioPlayer.ts    # Control de audio respetando políticas de autoplay móvil
│   │   └── useClipboard.ts      # Copia al portapapeles con feedback temporal (CLABE bancaria)
│   ├── lib/                     # Utilidades agnósticas de framework
│   │   ├── confetti.ts          # Disparador diferido de animación de confeti
│   │   └── utils.ts             # Función cn (clsx + tailwind-merge)
│   ├── services/                # Capa de comunicación externa e integración
│   │   └── api/                 # Cliente HTTP tipado hacia el backend Go
│   │       ├── client.ts        # Fetcher con timeout, abort controller y X-Request-ID
│   │       └── rsvp.ts          # Métodos del dominio de confirmaciones (POST /api/v1/rsvp)
│   └── types/                   # Tipos TypeScript estrictos
│       ├── api.ts               # Contrato unificado de respuestas ApiResponse<T>
│       ├── event.ts             # Entidades del evento y personalización
│       └── rsvp.ts              # Modelo DTO de confirmación de asistencia
├── .env.example                 # Plantilla de variables de entorno
├── .gitignore                   # Exclusión de node_modules, .next, .env.local
├── eslint.config.mjs            # Reglas de linting
├── GEMINI.md                    # Este archivo de lineamientos
├── next.config.ts               # Configuración de Next.js, imágenes y cabeceras de seguridad
├── package.json                 # Dependencias y scripts del proyecto
└── tsconfig.json                # Configuración de compilador TypeScript con path aliases (@/*)
```

---

## 3. Principios y Buenas Prácticas Frontend (Senior Frontend Engineer)

1. **Server Components (RSC) vs Client Components (`"use client"`):**
   - **Regla de oro:** Todo componente es un *Server Component* por defecto a menos que requiera estado (`useState`), efectos (`useEffect`), listeners del DOM (`onClick`) o APIs del navegador (`window`, `Audio`).
   - Aislar el modificador `"use client"` a las hojas más bajas del árbol de componentes (*islas de interactividad*) para mantener el paquete JavaScript inicial al mínimo.
   - Las secciones informativas estáticas (itinerario, código de vestimenta) deben renderizarse en el servidor.

2. **Diseño Mobile-First Estricto y UX Táctil:**
   - Toda la interfaz debe diseñarse para resoluciones móviles estándar (ancho de 360px a 430px) centrada con contenedor `max-w-md mx-auto` para visualización elegante en escritorio.
   - Objetivos táctiles mínimos de **44x44px** en botones y elementos interactivos para evitar toques erróneos.
   - Respetar áreas seguras de visualización en dispositivos con notch (`safe-area-inset-top`, `safe-area-inset-bottom`).

3. **Prevención de Saltos de Diseño (Zero Layout Shift - CLS = 0):**
   - Asignar dimensiones explícitas o aspect-ratio a contenedores de imágenes y contadores.
   - Emplear fuentes con `next/font/google` (`display: "swap"` con fallback idéntico) para evitar FOUT (*Flash of Unstyled Text*).

4. **Separación de Responsabilidades:**
   - La lógica reactiva compleja (temporizadores, manejo de audio, interacción con clipboard) debe encapsularse en **Custom Hooks** dedicados en `src/hooks/`, dejando los componentes puramente orientados a la presentación visual.
   - Las llamadas a endpoints deben delegarse a `src/services/api/`, nunca embeber `fetch` directos con URLs fijas dentro de los componentes.

5. **Accesibilidad (a11y) y Semántica Web:**
   - Emplear etiquetas semánticas (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Proporcionar atributos `aria-label` claros en botones con solo iconos (ej. botón de reproducir/pausar música, botón de copiar CLABE).
   - Mantener contrastes de color que cumplan como mínimo el estándar WCAG AA.

---

## 4. Estándares de Seguridad Frontend

1. **Gestión Estricta de Variables de Entorno:**
   - **Variables Públicas:** Usar el prefijo `NEXT_PUBLIC_` únicamente para valores no sensibles requeridos en el cliente móvil (ej. `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_APP_URL`).
   - **Secretos del Servidor:** Jamás anteponer `NEXT_PUBLIC_` a tokens, claves de base de datos o credenciales de servicios.
   - Validar las variables de entorno en tiempo de inicialización (`src/config/env.ts`) para fallar de inmediato si falta alguna configuración crítica.

2. **Prevención de Inyecciones XSS (Cross-Site Scripting):**
   - React escapa valores por defecto; **queda estrictamente prohibido** el uso de `dangerouslySetInnerHTML` salvo para scripts analíticos de confianza con hashing de integridad.
   - Sanitizar cualquier entrada de usuario en el formulario RSVP (como nombres y mensajes a los novios) antes de enviarla o renderizarla.

3. **Cabeceras de Seguridad HTTP en `next.config.ts`:**
   Configurar cabeceras de seguridad estrictas en el servidor de Next.js:
   ```typescript
   // next.config.ts
   const securityHeaders = [
     { key: "X-DNS-Prefetch-Control", value: "on" },
     { key: "X-Frame-Options", value: "DENY" },
     { key: "X-Content-Type-Options", value: "nosniff" },
     { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
     { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
   ];
   ```

4. **Mitigación Anti-Spam / Anti-Abuso en Formularios:**
   - Incluir un campo trampa invisible (*honeypot field*) oculto mediante CSS en el formulario RSVP. Si dicho campo contiene información al enviar, la petición se descarta silenciosamente.
   - Implementar control de doble envío (*double-submit prevention*) deshabilitando el botón de confirmación durante el estado de carga (`isSubmitting`).

---

## 5. Estrategia de Conexión con `save-my-date-backend`

### 5.1. Contrato Unificado de Respuestas
El cliente frontend debe alinearse al modelo de respuesta del backend Go (`pkg/response/response.go`):

```typescript
// src/types/api.ts
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorDetail {
  field: string;
  issue: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
```

### 5.2. Cliente HTTP Resiliente (`src/services/api/client.ts`)
1. **Timeouts y Control de Aborto:**
   - Toda llamada HTTP debe implementar un timeout estricto mediante `AbortController` (por defecto 8000 ms) para proteger la experiencia ante conexiones móviles intermitentes o 3G/4G degradadas.
2. **Trazabilidad (`X-Request-ID`):**
   - Inyectar en cada petición un encabezado `X-Request-ID` generado con `crypto.randomUUID()` para correlacionar logs de frontend con las trazas registradas en el backend Go (`internal/handlers/middleware/logger.go`).
3. **Manejo de Respuestas Tipadas:**
   - Verificar si `res.ok` es verdadero y deserializar con seguridad el JSON estructurado.

```typescript
// Ejemplo de implementación de referencia para src/services/api/client.ts
const DEFAULT_TIMEOUT_MS = 8000;

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "",
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
    clearTimeout(id);
  }
}
```

### 5.3. Servicio de Dominio RSVP (`src/services/api/rsvp.ts`)
- Consumir el endpoint `POST /api/v1/rsvp` enviando el payload DTO `RsvpSubmission`.
- Mapear de forma transparente los errores de validación de campo hacia la UI para indicar exactamente qué campo requiere atención.

---

## 6. Diseño de Componentes, Estado y Validaciones

1. **Tokens y Paleta de Colores en Tailwind v4:**
   - La aplicación hace uso del motor moderno de Tailwind v4 y `@theme` en `src/app/globals.css`:
     - **Ivory (`#faf8f5`):** Fondo principal cálido y elegante.
     - **Champagne (`#f4ede4`):** Fondos de tarjetas, divisores suaves y acentos sutiles.
     - **Gold (`#c5a880`) / Gold Dark (`#9e7f57`):** Íconos destacados, marcos de lujo y tipografía secundaria.
     - **Sage (`#8a9a86`) / Sage Light (`#e4ebe2`):** Estados de éxito, badges e indicadores botánicos.
     - **Charcoal (`#2b2927`) / Charcoal Muted (`#6b6661`):** Tipografía de alta legibilidad y jerarquía.

2. **Tipografía:**
   - Serif romántica: `--font-serif` (`Cormorant Garamond`) para titulares, nombres de la pareja e iniciales.
   - Sans geométrica limpia: `--font-sans` (`Plus Jakarta Sans`) para cuerpo de texto, botones, datos del evento y campos de entrada.

3. **Manejo de Formularios y Estados:**
   - Manejo de estados atómicos: `idle`, `submitting`, `success`, `error`.
   - Mostrar mensajes de retroalimentación claros e inline debajo de los campos afectados en caso de error de validación.

---

## 7. Multimedia, Animaciones y Rendimiento Móvil

1. **Reproductor Musical Móvil y Autoplay Policy:**
   - Los navegadores móviles (iOS Safari y Chrome Android) bloquean por directiva de seguridad la reproducción automática de audio con sonido sin interacción previa del usuario.
   - **Estrategia:** El reproductor debe iniciar en estado pausado con botón flotante discreto (`AudioPlayer.tsx`), o activar la reproducción opcional tras el primer toque/tap del invitado en la pantalla (apertura del sobre o interacción inicial).

2. **Animaciones con Framer Motion:**
   - Utilizar transformaciones de GPU (`transform`, `opacity`) para garantizar 60 FPS estables en teléfonos inteligentes sin sobrecargar la CPU.
   - Respetar la preferencia de accesibilidad del usuario (`prefers-reduced-motion`).

3. **Carga Diferida de Módulos Pesados:**
   - Importar `canvas-confetti` de forma diferida (`import("canvas-confetti")` dentro de `src/lib/confetti.ts`) para no incluir su código en el primer bundle de carga.

4. **Optimización OpenGraph (WhatsApp / iMessage):**
   - Configurar en `src/app/layout.tsx` las etiquetas `openGraph` y `twitter` con imágenes con relación de aspecto 1.91:1 (ej. 1200x630px) alojadas con URL absoluta para garantizar una miniatura atractiva al compartir el enlace.

---

## 8. Comandos Útiles de Desarrollo y Calidad

| Acción | Comando | Descripción |
| :--- | :--- | :--- |
| **Desarrollo local** | `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:3000` |
| **Compilación de producción** | `npm run build` | Valida rutas, compila páginas e integra optimizaciones |
| **Servidor de producción** | `npm run start` | Arranca el build compilado localmente |
| **Linter de código** | `npm run lint` | Ejecuta ESLint para validar sintaxis y reglas de Next.js |
| **Comprobación de tipos** | `npx tsc --noEmit` | Valida el tipado estricto de TypeScript sin emitir archivos |

---

## 9. Reglas para Agentes de IA y Contribución

1. **Respetar la Arquitectura Establecida:** No crear componentes gigantescos y monolíticos; descomponer las vistas complejas en secciones (`src/components/sections/`) y componentes base atómicos (`src/components/ui/`).
2. **Consistencia Visual con Tokens:** Utilizar siempre las clases de color semánticas definidas en `@theme` (`bg-ivory`, `text-charcoal`, `text-gold`, `bg-champagne`, etc.) en lugar de colores arbitrarios.
3. **No romper la compatibilidad con el Backend:** Cualquier llamada a la API debe respetar el contrato tipado `ApiResponse<T>` y pasar por la capa `src/services/api/`.
4. **Validación tras cada cambio:** Antes de dar por finalizada una tarea en el frontend, ejecutar siempre `npx tsc --noEmit` y `npm run lint` para garantizar cero errores de tipos o linting.

---

## 10. Estado Actual y Memoria del Proyecto (Context Snapshot)

> [!NOTE]
> Esta sección almacena el estado consolidado de la aplicación frontend para que cualquier agente mantenga contexto inmediato sin requerir relectura completa de código.

### 10.1. Especificaciones Técnicas Activas
- **Next.js:** `16.4.5` (App Router con Turbopack)
- **React:** `19.3.0`
- **Tailwind CSS:** `^4.0.0` con `@theme` en `src/app/globals.css`
- **Librerías Clave:** `lucide-react` (1.70.0), `framer-motion` (14.10.1), `canvas-confetti` (1.9.4), `clsx`, `tailwind-merge`
- **Fuentes Activas:** Google Fonts `Cormorant Garamond` (serif) y `Plus Jakarta Sans` (sans)
- **Puerto de desarrollo:** `3000` (`http://localhost:3000`)
- **Backend objetivo:** `save-my-date-backend` en `http://localhost:8080` (API v1)

### 10.2. Componentes y Módulos Implementados (Fases 1, 2, Desacoplamiento Admin, Fase 3 RSVP y Fase 4 Previews/Admin)
1. **Configuración del Evento y Entorno (`src/config/`):**
   - `src/config/event.ts`: Objeto `EVENT_CONFIG` con información de la pareja, fechas, ceremonia, recepción, código de vestimenta y datos bancarios.
   - `src/config/env.ts`: Validación tipada de variables de entorno públicas y de servidor (`API_URL`, `APP_URL`).
2. **Definiciones de Tipos (`src/types/`):**
   - `src/types/api.ts`: Contrato de respuestas tipadas `ApiResponse<T>`, `ApiSuccessResponse<T>`, `ApiErrorResponse`, `ApiErrorDetail`.
   - `src/types/event.ts`: Interfaces para `EventConfig`, ubicaciones, tiendas y cuentas bancarias.
   - `src/types/rsvp.ts`: Interfaces para `RsvpSubmission` y `RsvpFormData`.
   - `src/types/admin.ts`: Modelos de administración (`AdminEventSummary`, `DashboardStats`, estados de evento).
   - `src/types/auth.ts`: Modelos de sesión preparados para Google SSO (`AdminUser`, `AuthStatus`, `AuthSession`).
3. **Capa de Servicios de Red (`src/services/api/`):**
   - `src/services/api/client.ts`: Cliente HTTP defensivo con timeout de 8s, `AbortController`, inyección de encabezado `X-Request-ID` y tipado seguro.
   - `src/services/api/rsvp.ts`: Servicio de dominio RSVP (`submitRsvp`, `getLocalRsvp`, `saveLocalRsvp`, `clearLocalRsvp`, `subscribeRsvp`) con suscripción `useSyncExternalStore` y modo de resiliencia offline/desarrollo.
4. **Utilidades Base (`src/lib/`):**
   - `src/lib/utils.ts`: Helper `cn(...)` para combinar clases de Tailwind.
   - `src/lib/confetti.ts`: Helper modular para disparo dinámico de confeti con fuegos artificiales (`fireConfetti`).
   - `src/lib/calendar.ts`: Generador de enlaces para Google Calendar y archivos `.ics` (iCal / Apple Calendar).
5. **Custom Hooks Reactivos (`src/hooks/`):**
   - `src/hooks/useCountdown.ts`: Temporizador reactivo SSR-safe con protección contra desincronización de hidratación (`isReady`).
   - `src/hooks/useAudioPlayer.ts`: Controlador de audio con manejo de excepciones y políticas móviles de autoplay.
   - `src/hooks/useClipboard.ts`: Copia al portapapeles con temporizador de estado visual (`copied`, `copy`) y fallback.
6. **Componentes Atómicos UI (`src/components/ui/`):**
   - `src/components/ui/Button.tsx`: Botón accesible con área táctil mínima (44x44px) y variantes semánticas.
   - `src/components/ui/Card.tsx`: Contenedor con efecto glassmorphism (`backdrop-blur-md`), bordes dorados y esquinas redondeadas.
   - `src/components/ui/Input.tsx`: Campos `Input` y `Textarea` con áreas táctiles de 44px, soporte de etiquetas, mensajes de error y `useId` seguro.
7. **Secciones de la Invitación (`src/components/sections/`):**
   - `HeroSection.tsx`: Portada nupcial con tipografía Cormorant Garamond y diseño responsivo.
   - `CountdownSection.tsx`: Contador regresivo en días, horas, minutos y segundos.
   - `AudioPlayer.tsx`: Reproductor flotante con control de reproducción y políticas móviles.
   - `LocationsSection.tsx`: Itinerario con enlaces a Google Maps, Waze y sincronización con calendarios (.ics / Google Calendar).
   - `DressCodeSection.tsx`: Protocolo formal con chips cromáticos.
   - `GiftRegistrySection.tsx`: Tiendas departamentales y tarjeta de transferencias con copia táctil de CLABE.
   - `RsvpSection.tsx`: Formulario de confirmación completo con selector táctil Sí/No, contador de pases, chips de restricciones dietéticas, dedicatoria personal, trampa anti-spam (*honeypot*), prevención de doble envío, disparo festivo de confeti y vista de agradecimiento editable con `useSyncExternalStore`.
8. **Arquitectura de Enrutamiento y Route Groups (`src/app/`):**
   - `src/app/layout.tsx`: RootLayout neutro con fuentes y globals.css sin forzar fondo de boda al resto del sistema.
   - `src/app/(invitation)/layout.tsx`: Layout especializado de invitaciones públicas (`bg-ivory text-charcoal`, contenedor centrado `max-w-md`), con metadatos OpenGraph y Twitter Cards apuntando a `/api/og`.
   - `src/app/(invitation)/page.tsx`: Vista pública de la invitación respondiendo exactamente en `/`.
   - `src/app/api/og/route.tsx`: Route Handler dinámico con `next/og` (`ImageResponse`) generando tarjetas nupciales en 1200x630px para WhatsApp y mensajería.
   - `src/app/admin/layout.tsx`: Layout de administración tipo dashboard full-width con navegación lateral y superior.
   - `src/app/admin/page.tsx`: Dashboard administrativo con KPIs de eventos y confirmaciones.
   - `src/app/admin/events/`, `settings/`: Vistas de soporte del panel de administración.
   - `src/app/admin/rsvps/page.tsx`: Panel completo de supervisión de asistencias con KPIs en tiempo real (pases confirmados, declinados, dietas), buscador reactivo, filtros por estado, lectura de mensajes y exportación a CSV (UTF-8 con BOM para Excel).
9. **Componentes de Administración (`src/components/admin/`):**
   - `AdminSidebar.tsx`: Navegación con drawer móvil, links a subsecciones y switch rápido a la invitación pública.
   - `AdminHeader.tsx`: Barra superior con indicador de backend y perfil listo para Google SSO.
   - `EventSummaryCard.tsx`: Tarjeta de gestión de evento con barra de confirmaciones y copiado de link.

### 10.3. Lecciones Aprendidas y Estabilidad del Build
- **Next.js 16 Route Groups & ImageResponse:** El endpoint `/api/og` corre sobre Node.js runtime estándar (`runtime = 'edge'` está deprecado en Next.js 16). Satori se maquetó exclusivamente con Flexbox y estilos inline en hexadecimal.
- **React 19 Hooks Compliance:** Implementación de `useSyncExternalStore` con caché en memoria (`cachedRaw` y `cachedSubmission`) para sincronizar `localStorage` sin disparar renders en cascada ni violar la regla `react-hooks/set-state-in-effect`. Invocación incondicional de `React.useId()` en componentes atómicos.
- **Validación Automatizada Superada:** `npx tsc --noEmit` (0 errores), `npm run lint` (0 errores, 0 advertencias), `npm run build` (9 rutas compiladas exitosamente, 8 estáticas y 1 dinámica para `/api/og`).

### 10.4. Estado del Roadmap
- **Fase 1 (Fundaciones & Experiencia Nupcial):** Completada ✅
- **Fase 2 (Multimedia, Protocolo & Mesa de Regalos):** Completada ✅
- **Desacoplamiento Arquitectónico (Admin / Invitación):** Completada ✅
- **Fase 3 (Formulario RSVP, Persistencia & Red Resiliente):** Completada ✅
- **Fase 4 (Optimización Móvil, Previews OpenGraph & Panel RSVP con Exportación CSV):** Completada ✅
