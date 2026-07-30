import { useState, useEffect } from "react";
import { LogoMark } from "@/components/LogoMark";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"visible" | "fading">("visible");

  useEffect(() => {
    const start = () => {
      const fadeTimer = setTimeout(() => setPhase("fading"), 600);
      const doneTimer = setTimeout(() => onComplete(), 900);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(doneTimer);
      };
    };
    if (document.readyState === "complete") {
      return start();
    }
    let cleanup: (() => void) | undefined;
    const onReady = () => {
      cleanup = start();
    };
    window.addEventListener("load", onReady, { once: true });
    const failsafe = setTimeout(onReady, 1200);
    return () => {
      window.removeEventListener("load", onReady);
      clearTimeout(failsafe);
      cleanup?.();
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ease-out ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <LogoMark className="w-20 h-20" animated />

        <div className="flex items-center gap-1 font-mono text-sm md:text-base text-muted-foreground tracking-wide">
          <span>~/Diini Kahiye</span>
          <span className="inline-block w-1.5 h-4 bg-primary animate-cursor-blink" />
        </div>

        <div className="h-0.5 w-28 overflow-hidden rounded-full bg-muted/40">
          <div className="h-full w-full origin-left animate-splash-bar bg-primary" />
        </div>
      </div>
    </div>
  );
}
