"use client";

import { Gift, Check, Copy, ExternalLink, Building2 } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useClipboard } from "@/hooks/useClipboard";

export function GiftRegistrySection() {
  const { giftRegistry } = EVENT_CONFIG;
  const { copy, copied } = useClipboard();

  return (
    <section className="space-y-4">
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium">
          Mesa de Regalos
        </span>
        <h2 className="font-serif text-3xl text-charcoal">Sugerencia de Regalos</h2>
      </div>

      <Card variant="glass" className="space-y-5 text-center">
        <div className="w-12 h-12 rounded-2xl bg-champagne text-gold-dark flex items-center justify-center mx-auto border border-gold/30">
          <Gift className="w-6 h-6" />
        </div>

        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-sm mx-auto">
          {giftRegistry.message}
        </p>

        {/* Tiendas Departamentales */}
        {giftRegistry.stores && giftRegistry.stores.length > 0 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs uppercase tracking-wider text-charcoal-muted font-medium">
              Tiendas Departamentales
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              {giftRegistry.stores.map((store, index) => (
                <a
                  key={index}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="champagne" size="sm" className="w-full justify-between sm:justify-center">
                    <span>{store.name}</span>
                    {store.eventNumber && (
                      <span className="text-[11px] text-charcoal-muted bg-white/60 px-2 py-0.5 rounded-full">
                        Evento #{store.eventNumber}
                      </span>
                    )}
                    <ExternalLink className="w-3.5 h-3.5 text-gold shrink-0" />
                  </Button>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Transferencia Bancaria */}
        {giftRegistry.bankAccount && (
          <div className="pt-4 border-t border-gold/20 space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider text-charcoal-muted font-medium">
              <Building2 className="w-3.5 h-3.5 text-gold" />
              <span>Transferencia Bancaria</span>
            </div>

            <div className="bg-champagne/50 border border-gold/30 rounded-2xl p-4 text-center space-y-2">
              <div className="text-xs text-charcoal space-y-0.5">
                <p className="font-semibold text-charcoal text-sm">
                  {giftRegistry.bankAccount.bank}
                </p>
                <p className="text-charcoal-muted">
                  Beneficiario: <span className="text-charcoal font-medium">{giftRegistry.bankAccount.accountHolder}</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 bg-white/80 border border-gold/20 rounded-xl py-2 px-3">
                <span className="font-mono text-xs sm:text-sm text-charcoal tracking-wider select-all">
                  {giftRegistry.bankAccount.clabe}
                </span>
              </div>

              <Button
                variant={copied ? "champagne" : "gold"}
                size="sm"
                onClick={() => copy(giftRegistry.bankAccount!.clabe)}
                className={`w-full transition-all duration-300 ${
                  copied ? "bg-sage-light text-sage border-sage/40" : ""
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-sage" />
                    <span className="font-medium text-sage">¡CLABE Copiada al Portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar CLABE Interbancaria</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}
