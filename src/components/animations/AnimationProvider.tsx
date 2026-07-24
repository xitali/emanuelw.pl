"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AnimationContextType {
  isAnimated: boolean;
  toggleAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  // Domyślnie animacje włączone, aby SSR (Framer Motion) działało płynnie
  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ui-animations");
    if (stored !== null) {
      setIsAnimated(stored === "true");
    }
  }, []);

  const toggleAnimation = () => {
    const newValue = !isAnimated;
    setIsAnimated(newValue);
    localStorage.setItem("ui-animations", String(newValue));
  };

  return (
    <AnimationContext.Provider value={{ isAnimated, toggleAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationContext() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimationContext must be used within an AnimationProvider");
  }
  return context;
}
