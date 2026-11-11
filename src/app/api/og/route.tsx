import { ImageResponse } from "next/og";
import { EVENT_CONFIG } from "@/config/event";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parámetros dinámicos con respaldo a la configuración del evento
    const bride = searchParams.get("bride") || EVENT_CONFIG.couple.bride;
    const groom = searchParams.get("groom") || EVENT_CONFIG.couple.groom;
    const date = searchParams.get("date") || EVENT_CONFIG.date.display;
    const location =
      searchParams.get("location") || EVENT_CONFIG.locations.reception.name;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#faf8f5",
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #ffffff 0%, #f4ede4 100%)",
            padding: "40px",
            fontFamily: "serif",
          }}
        >
          {/* Marco exterior dorado */}
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              border: "2px solid #c5a880",
              borderRadius: "24px",
              padding: "48px 36px",
              boxShadow: "0 10px 30px rgba(197, 168, 128, 0.15)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {/* Cabecera / Badge */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#9e7f57",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                ✦ Save the Date · Nuestra Boda ✦
              </span>
            </div>

            {/* Nombres de los Novios */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  fontSize: 76,
                  color: "#2b2927",
                  margin: "0 0 12px 0",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {bride} &amp; {groom}
              </h1>

              {/* Divisor Ornamental */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  margin: "8px 0 16px 0",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 1,
                    backgroundColor: "#c5a880",
                    opacity: 0.6,
                  }}
                />
                <span style={{ color: "#c5a880", fontSize: 20 }}>❦</span>
                <div
                  style={{
                    width: 60,
                    height: 1,
                    backgroundColor: "#c5a880",
                    opacity: 0.6,
                  }}
                />
              </div>

              {/* Fecha y Lugar */}
              <p
                style={{
                  fontSize: 26,
                  color: "#6b6661",
                  margin: "0 0 6px 0",
                  fontWeight: 400,
                }}
              >
                {date}
              </p>
              <p
                style={{
                  fontSize: 22,
                  color: "#9e7f57",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {location}
              </p>
            </div>

            {/* Badge de Llamada a la Acción */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f4ede4",
                border: "1px solid rgba(197, 168, 128, 0.4)",
                borderRadius: "9999px",
                padding: "10px 28px",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#2b2927",
                  fontWeight: 600,
                }}
              >
                Confirma tu Asistencia &amp; Detalles del Evento
              </span>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "Error generating image";
    return new Response(`Failed to generate OG image: ${errorMsg}`, {
      status: 500,
    });
  }
}
