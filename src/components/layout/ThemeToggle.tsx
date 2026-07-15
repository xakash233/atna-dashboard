"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === "dark";

  return (
    <AnimatedButton
      type="button"
      className="rounded-xl p-2 text-fg-muted transition hover:bg-overlay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M16.5 11.2A6.5 6.5 0 0 1 8.8 3.5 6.6 6.6 0 1 0 16.5 11.2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </AnimatedButton>
  );
}
