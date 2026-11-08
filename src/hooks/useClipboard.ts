"use client";

import { useCallback, useState } from "react";

interface UseClipboardReturn {
  copy: (text: string) => Promise<boolean>;
  copied: boolean;
  error: Error | null;
}

/**
 * Hook reactivo para copiar texto al portapapeles con temporizador de feedback visual.
 */
export function useClipboard(timeoutMs: number = 2500): UseClipboardReturn {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text) return false;

      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback para navegadores antiguos o entornos no seguros
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }

        setCopied(true);
        setError(null);

        setTimeout(() => {
          setCopied(false);
        }, timeoutMs);

        return true;
      } catch (err: unknown) {
        const copyError = err instanceof Error ? err : new Error("Error desconocido al copiar");
        setError(copyError);
        setCopied(false);
        return false;
      }
    },
    [timeoutMs]
  );

  return { copy, copied, error };
}
