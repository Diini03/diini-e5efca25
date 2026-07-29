import { useState, useEffect } from "react";
import { LogoMark } from "@/components/LogoMark";

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
    if (document.readyState === "complete") {
      return start();
    }
    let cleanup: (() => void) | undefined;
    const onReady = () => {
      cleanup = start();
    };
    window.addEventListener("load", onReady, { once: true });
    const failsafe = setTimeout(onReady, 1500);
    return () => {
      window.removeEventListener("load", onReady);
      clearTimeout(failsafe);
      cleanup?.();
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background bg-grid transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div className="relative mx-auto w-24 h-24">
          <span className="absolute inset-0 rounded-[26px] bg-primary/20 blur-xl animate-pulse" aria-hidden />
          <LogoMark className="relative w-24 h-24 animate-logo-float" animated />
        </div>

        <p className="mt-5 text-sm md:text-base font-mono text-muted-foreground tracking-wide">
          ~/Diini Kahiye<span className="text-primary animate-pulse">.</span>
        </p>

        <div className="mt-4 mx-auto h-0.5 w-32 overflow-hidden rounded-full bg-muted/40">
          <div className="h-full w-1/3 bg-primary animate-[splash-bar_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
