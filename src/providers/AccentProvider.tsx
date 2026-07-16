"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AccentColor = "teal" | "indigo" | "purple" | "rose" | "amber";

type AccentContextType = {
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
};

const AccentContext = createContext<AccentContextType | undefined>(undefined);

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentColor>("indigo");

  // Load from localStorage on mount
  useEffect(() => {
    const savedAccent = localStorage.getItem("atna-accent-color") as AccentColor;
    if (savedAccent && ["teal", "indigo", "purple", "rose", "amber"].includes(savedAccent)) {
      setAccentState(savedAccent);
    }
  }, []);

  // Update HTML class on accent color changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Add accent class (indigo is default Boltshift blue)
    root.classList.remove("accent-teal", "accent-indigo", "accent-purple", "accent-rose", "accent-amber");
    root.classList.add(`accent-${accent}`);
    
    // Save to localStorage
    localStorage.setItem("atna-accent-color", accent);
  }, [accent]);

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
  };

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  const context = useContext(AccentContext);
  if (!context) {
    throw new Error("useAccent must be used within an AccentProvider");
  }
  return context;
}
