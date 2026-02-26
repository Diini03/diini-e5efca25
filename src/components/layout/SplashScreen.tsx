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
        <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-2 font-mono">
          Hi, I'm Diini Kahiye
        </p>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground font-mono">
          Welcome to my portfolio<span className="text-primary animate-pulse">..</span>
        </h1>
      </div>
    </div>
  );
}
