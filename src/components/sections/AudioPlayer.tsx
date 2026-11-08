"use client";

import { motion } from "framer-motion";
import { Music, Pause, Play, Volume2, AlertCircle } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export function AudioPlayer() {
  const audioConfig = EVENT_CONFIG.audio;
  const { isPlaying, togglePlay, isLoading, error } = useAudioPlayer(audioConfig?.src);

  if (!audioConfig) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gold/40 shadow-lg rounded-full px-3 py-2 pr-3.5"
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center shadow-xs hover:bg-gold-dark transition-all duration-200 active:scale-95 cursor-pointer"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        <div className="text-left pr-1 max-w-[130px] hidden sm:block">
          <div className="flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-gold" />
            <p className="text-[11px] font-medium text-charcoal truncate">
              {audioConfig.title || "Música de fondo"}
            </p>
          </div>
          <p className="text-[9px] text-charcoal-muted uppercase tracking-wider">
            {isPlaying ? "Reproduciendo" : "Toca para escuchar"}
          </p>
        </div>

        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3.5 px-1">
            <span className="w-0.5 bg-gold rounded-full animate-bounce h-2" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 bg-gold rounded-full animate-bounce h-3.5" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 bg-gold rounded-full animate-bounce h-1.5" style={{ animationDelay: "300ms" }} />
          </div>
        )}

        {!isPlaying && !error && (
          <div className="text-gold pr-1 hidden sm:block">
            <Music className="w-3.5 h-3.5" />
          </div>
        )}

        {error && (
          <div
            title={error}
            className="flex items-center text-amber-600 pl-1 cursor-help"
            aria-label="Aviso sobre pista de audio"
          >
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
