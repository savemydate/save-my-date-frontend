"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { fireConfetti } from "@/lib/confetti";
import {
  submitRsvp,
  clearLocalRsvp,
  subscribeRsvp,
  getRsvpSnapshot,
  getRsvpServerSnapshot,
} from "@/services/api/rsvp";
import type { RsvpFormData, RsvpSubmission } from "@/types/rsvp";
import {
  Check,
  X,
  Users,
  Utensils,
  Send,
  Loader2,
  HeartHandshake,
  Edit3,
  Sparkles,
} from "lucide-react";

const DIETARY_SUGGESTIONS = [
  "Vegetariano",
  "Vegano",
  "Sin gluten",
  "Sin mariscos",
  "Sin lactosa",
];

export function RsvpSection() {
  const savedSubmission = React.useSyncExternalStore(
    subscribeRsvp,
    getRsvpSnapshot,
    getRsvpServerSnapshot
  );

  const [isEditing, setIsEditing] = React.useState(false);

  const [formData, setFormData] = React.useState<RsvpFormData>({
    fullName: "",
    attending: true,
    guestsCount: 1,
    dietaryRestrictions: "",
    message: "",
    phone: "",
  });

  const [honeypot, setHoneypot] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [activeSubmission, setActiveSubmission] =
    React.useState<RsvpSubmission | null>(null);
  const [generalError, setGeneralError] = React.useState<string | null>(null);

  // Determinar si debemos mostrar la tarjeta de confirmación
  const displaySubmission =
    !isEditing && (activeSubmission || savedSubmission);

  const handleAttendingChange = (willAttend: boolean) => {
    setFormData((prev) => ({
      ...prev,
      attending: willAttend,
      guestsCount: willAttend ? (prev.guestsCount > 0 ? prev.guestsCount : 1) : 0,
    }));
  };

  const handleGuestCountChange = (delta: number) => {
    setFormData((prev) => {
      const current = prev.guestsCount;
      const next = Math.min(5, Math.max(1, current + delta));
      return { ...prev, guestsCount: next };
    });
  };

  const handleDietaryToggle = (item: string) => {
    setFormData((prev) => {
      const current = prev.dietaryRestrictions || "";
      if (current.includes(item)) {
        const cleaned = current
          .replace(new RegExp(`(^|,\\s*)${item}`, "g"), "")
          .replace(/^,\s*/, "")
          .trim();
        return { ...prev, dietaryRestrictions: cleaned };
      } else {
        const next = current.length > 0 ? `${current}, ${item}` : item;
        return { ...prev, dietaryRestrictions: next };
      }
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Por favor ingresa tu nombre completo";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "El nombre debe tener al menos 3 caracteres";
    }

    if (formData.phone && formData.phone.trim().length > 0) {
      const cleanedPhone = formData.phone.replace(/[\s-]/g, "");
      if (!/^\+?[0-9]{7,15}$/.test(cleanedPhone)) {
        newErrors.phone = "Ingresa un número telefónico válido (ej. 5512345678)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Detección silenciosa de bots vía honeypot
    if (honeypot.trim().length > 0) {
      setStatus("success");
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await submitRsvp(formData);
      //const response = {data: null, success: false, error: { message: '', details: [{field: '', issue: ''}] }}

      if (response.success) {
        setActiveSubmission(response.data);
        setStatus("success");
        setIsEditing(false);
        fireConfetti();
      } else {
        setStatus("error");
        setGeneralError(
          response.error.message ||
            "Ocurrió un problema al enviar tu confirmación. Intenta de nuevo."
        );
        if (response.error.details) {
          const fieldErrors: Record<string, string> = {};
          response.error.details.forEach((d) => {
            fieldErrors[d.field] = d.issue;
          });
          setErrors(fieldErrors);
        }
      }
    } catch {
      setStatus("error");
      setGeneralError("Error de conexión inesperado. Intenta de nuevo.");
    }
  };

  const handleStartEdit = () => {
    const current = activeSubmission || savedSubmission;
    if (current) {
      setFormData({
        fullName: current.fullName,
        attending: current.attending,
        guestsCount: current.guestsCount,
        dietaryRestrictions: current.dietaryRestrictions || "",
        message: current.message || "",
        phone: current.phone || "",
      });
    }
    clearLocalRsvp();
    setActiveSubmission(null);
    setIsEditing(true);
    setStatus("idle");
  };

  return (
    <section className="space-y-4" aria-labelledby="rsvp-heading">
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium">
          Asistencia
        </span>
        <h2 id="rsvp-heading" className="font-serif text-3xl text-charcoal">
          Confirma tu Lugar
        </h2>
        <p className="text-xs text-charcoal-muted max-w-xs mx-auto">
          Nos llenará de alegría contar con tu presencia en este día tan especial.
        </p>
      </div>

      {displaySubmission ? (
        <Card
          variant="glass"
          className="text-center space-y-5 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300"
        >
          <div className="w-14 h-14 rounded-full bg-champagne text-gold-dark flex items-center justify-center mx-auto border border-gold/30 shadow-xs">
            {displaySubmission.attending ? (
              <Sparkles className="w-7 h-7 text-gold animate-bounce" />
            ) : (
              <HeartHandshake className="w-7 h-7 text-gold-dark" />
            )}
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-light/60 text-sage-dark text-xs font-medium border border-sage/30">
              <Check className="w-3.5 h-3.5 text-sage" />
              <span>Respuesta registrada con éxito</span>
            </span>

            <h3 className="font-serif text-2xl text-charcoal pt-1">
              ¡Muchas gracias, {displaySubmission.fullName}!
            </h3>

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-sm mx-auto">
              {displaySubmission.attending ? (
                <>
                  Hemos reservado{" "}
                  <strong>
                    {displaySubmission.guestsCount}{" "}
                    {displaySubmission.guestsCount === 1 ? "lugar" : "lugares"}
                  </strong>{" "}
                  para ti. ¡Estamos muy emocionados por celebrar juntos!
                </>
              ) : (
                <>
                  Lamentamos que no puedas acompañarnos de forma presencial,
                  pero valoramos con todo el corazón tus buenos deseos.
                </>
              )}
            </p>
          </div>

          {(displaySubmission.dietaryRestrictions ||
            displaySubmission.message) && (
            <div className="bg-champagne/40 rounded-2xl p-4 text-left text-xs space-y-2 border border-gold/20">
              {displaySubmission.dietaryRestrictions && (
                <div>
                  <span className="font-medium text-charcoal">
                    Restricciones:
                  </span>{" "}
                  <span className="text-charcoal-muted">
                    {displaySubmission.dietaryRestrictions}
                  </span>
                </div>
              )}
              {displaySubmission.message && (
                <div>
                  <span className="font-medium text-charcoal">Mensaje:</span>{" "}
                  <p className="text-charcoal-muted italic mt-0.5">
                    &ldquo;{displaySubmission.message}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleStartEdit}
              className="w-full text-xs"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1" />
              Modificar mi respuesta
            </Button>
          </div>
        </Card>
      ) : (
        <Card variant="glass" className="p-6 sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Campo Honeypot Oculto para Trampa Anti-Spam */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website-check">No llenar este campo</label>
              <input
                id="website-check"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Selector de Asistencia (Pills) */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-charcoal">
                ¿Podrás acompañarnos? <span className="text-gold-dark">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleAttendingChange(true)}
                  className={`min-h-[46px] px-3 py-2 rounded-2xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 border select-none cursor-pointer ${
                    formData.attending
                      ? "bg-gold text-white border-gold shadow-sm shadow-gold/20"
                      : "bg-white/70 text-charcoal border-gold/25 hover:bg-champagne/40"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Sí, con gusto</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAttendingChange(false)}
                  className={`min-h-[46px] px-3 py-2 rounded-2xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 border select-none cursor-pointer ${
                    !formData.attending
                      ? "bg-charcoal text-white border-charcoal shadow-sm"
                      : "bg-white/70 text-charcoal border-gold/25 hover:bg-champagne/40"
                  }`}
                >
                  <X className="w-4 h-4" />
                  <span>No podré asistir</span>
                </button>
              </div>
            </div>

            {/* Nombre Completo */}
            <Input
              label="Nombre y Apellidos"
              required
              placeholder="Ej. María Elena Pérez"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              error={errors.fullName}
            />

            {/* Teléfono / WhatsApp */}
            <Input
              label="Teléfono o WhatsApp (opcional)"
              placeholder="Ej. 55 1234 5678"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              error={errors.phone}
              helperText="Para compartirte detalles o recordatorios importantes del evento."
            />

            {/* Contador de Acompañantes (Visible solo si asiste) */}
            {formData.attending && (
              <div className="space-y-2 pt-1 transition-all">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-charcoal flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gold-dark" />
                    <span>Número de Pases / Asistentes</span>
                  </label>
                  <span className="text-[11px] text-charcoal-muted">
                    Máx. 5 pases
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white/90 border border-gold/30 rounded-2xl px-4 py-2">
                  <span className="text-xs text-charcoal">
                    {formData.guestsCount === 1
                      ? "1 persona (Tú)"
                      : `${formData.guestsCount} personas (Tú y acompañantes)`}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleGuestCountChange(-1)}
                      disabled={formData.guestsCount <= 1}
                      aria-label="Disminuir pases"
                      className="w-8 h-8 rounded-full bg-champagne text-charcoal flex items-center justify-center font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-serif text-base font-semibold text-charcoal">
                      {formData.guestsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleGuestCountChange(1)}
                      disabled={formData.guestsCount >= 5}
                      aria-label="Aumentar pases"
                      className="w-8 h-8 rounded-full bg-champagne text-charcoal flex items-center justify-center font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Restricciones Alimenticias (Solo si asiste) */}
            {formData.attending && (
              <div className="space-y-2 pt-1">
                <label className="text-xs font-medium text-charcoal flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-gold-dark" />
                  <span>Alergias o Restricciones Alimenticias</span>
                </label>

                {/* Chips de sugerencias */}
                <div className="flex flex-wrap gap-1.5">
                  {DIETARY_SUGGESTIONS.map((item) => {
                    const isSelected = (
                      formData.dietaryRestrictions || ""
                    ).includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleDietaryToggle(item)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-gold/20 text-gold-dark border-gold font-medium"
                            : "bg-white/70 text-charcoal-muted border-gold/20 hover:bg-champagne/40"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                <Input
                  placeholder="Otra restricción o especificación..."
                  value={formData.dietaryRestrictions}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dietaryRestrictions: e.target.value,
                    }))
                  }
                />
              </div>
            )}

            {/* Mensaje / Felicitación a los novios */}
            <Textarea
              label="Mensaje o Deseos para los Novios"
              placeholder="Escribe unas palabras de amor o felicitación..."
              rows={3}
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              helperText="Tus palabras se mostrarán con cariño a la pareja."
            />

            {/* Mensaje de Error General */}
            {generalError && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600">
                {generalError}
              </div>
            )}

            {/* Botón de Envío con Estado de Carga */}
            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={status === "submitting"}
              className="w-full shadow-md"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Enviando confirmación...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  <span>Confirmar Asistencia</span>
                </>
              )}
            </Button>
          </form>
        </Card>
      )}
    </section>
  );
}
