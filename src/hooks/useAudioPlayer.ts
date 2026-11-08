"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  togglePlay: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook para controlar reproducción de música de fondo con soporte para políticas móviles de autoplay.
 */
export function useAudioPlayer(audioSrc?: string): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!audioSrc) return;

    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.preload = "none";
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => {
      setIsPlaying(true);
      setError(null);
    };
    const handleError = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setError("No se pudo cargar la pista de audio. Verifica que el archivo exista en public/audio/.");
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await audio.play();
      setIsPlaying(true);
    } catch (err: unknown) {
      setIsPlaying(false);
      if (err instanceof Error && err.name === "NotAllowedError") {
        setError("El navegador requiere interactuar primero para activar el audio.");
      } else {
        setError("No se pudo reproducir la música de fondo.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying]);

  return { isPlaying, togglePlay, isLoading, error };
}
