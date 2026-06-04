import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"visible" | "fading">("visible");

  useEffect(() => {
    const start = () => {
      const fadeTimer = setTimeout(() => setPhase("fading"), 700);
      const doneTimer = setTimeout(() => onComplete(), 1100);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(doneTimer);
      };
    };
    // Wait until the browser reports the page is interactive, then fade fast.
    if (document.readyState === "complete") {
      return start();
    }
    let cleanup: (() => void) | undefined;
    const onReady = () => {
      cleanup = start();
    };
    window.addEventListener("load", onReady, { once: true });
    // Safety net so the splash never sticks beyond 1.5s.
    const failsafe = setTimeout(onReady, 1500);
    return () => {
      window.removeEventListener("load", onReady);
      clearTimeout(failsafe);
      cleanup?.();
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
          ~/Diini Kahiye<span className="text-primary animate-pulse">.</span>
        </h1>
        <div className="mt-4 mx-auto h-0.5 w-32 overflow-hidden rounded-full bg-muted/40">
          <div className="h-full w-1/3 bg-primary animate-[splash-bar_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
