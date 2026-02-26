import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"visible" | "fading">("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), 1800);
    const doneTimer = setTimeout(() => onComplete(), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center animate-fade-in">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground font-mono">
          ~/Diini Kahiye<span className="text-primary">.</span>
        </h1>
        <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mt-3 font-mono">
          Explore
        </p>
      </div>
    </div>
  );
}
