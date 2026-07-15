"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

export function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate audio object on client mount
    audioRef.current = new Audio("https://assets.mixkit.co/music/preview/mixkit-ambient-cyberpunk-drone-1100.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; // Keep it low and atmospheric!

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback failed or blocked by autoplay policy:", err));
    }
  };

  return (
    <div className="fixed right-4 top-4 z-50 md:right-8">
      <button
        type="button"
        onClick={togglePlayback}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-medium text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:bg-black/80 hover:border-accent/40 cursor-pointer"
        title={isPlaying ? "Mute Background Music" : "Play Cyber Beats BGM"}
      >
        {/* Equalizer animation bars */}
        <div className="flex items-end gap-[2px] h-3 w-4">
          <span
            className={cn(
              "w-[3px] bg-[var(--accent)] rounded-full",
              isPlaying ? "animate-[eqBar_0.8s_ease-in-out_infinite]" : "h-1"
            )}
            style={{ animationDelay: "0.1s" }}
          />
          <span
            className={cn(
              "w-[3px] bg-[var(--accent)] rounded-full",
              isPlaying ? "animate-[eqBar_0.8s_ease-in-out_infinite]" : "h-1.5"
            )}
            style={{ animationDelay: "0.3s" }}
          />
          <span
            className={cn(
              "w-[3px] bg-[var(--accent)] rounded-full",
              isPlaying ? "animate-[eqBar_0.8s_ease-in-out_infinite]" : "h-0.5"
            )}
            style={{ animationDelay: "0.5s" }}
          />
        </div>
        <span className="text-[10px] tracking-wider uppercase font-semibold text-pastel-muted">
          {isPlaying ? "BGM On" : "Tech BGM"}
        </span>
      </button>
    </div>
  );
}
