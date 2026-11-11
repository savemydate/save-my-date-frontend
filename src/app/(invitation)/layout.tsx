import type { Metadata, Viewport } from "next";
import { EVENT_CONFIG } from "@/config/event";
import { ENV } from "@/config/env";

const brideAndGroom = `${EVENT_CONFIG.couple.bride} & ${EVENT_CONFIG.couple.groom}`;
const pageTitle = `${brideAndGroom} — ¡Nos Casamos!`;
const pageDescription = `Estás invitado a nuestra boda el ${EVENT_CONFIG.date.display}. Conoce los detalles de la ceremonia, recepción, mesa de regalos y confirma tu asistencia.`;

export const metadata: Metadata = {
  metadataBase: new URL(ENV.APP_URL),
  title: {
    default: pageTitle,
    template: `%s | ${brideAndGroom}`,
  },
  description: pageDescription,
  applicationName: "Save My Date",
  authors: [{ name: brideAndGroom }],
  creator: brideAndGroom,
  keywords: [
    "boda",
    "invitacion digital",
    "save the date",
    "rsvp",
    EVENT_CONFIG.couple.bride,
    EVENT_CONFIG.couple.groom,
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    title: pageTitle,
    description: pageDescription,
    siteName: "Save My Date",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `Invitación de boda de ${brideAndGroom}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function InvitationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col items-center">
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col relative">
        {children}
      </div>
    </div>
  );
}
