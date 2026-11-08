import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Nuestra Boda | Invitación",
  description: "Acompáñanos a celebrar este día tan especial con nosotros.",
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
