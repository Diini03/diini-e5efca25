import { useState, useRef } from "react";
import { MousePointer } from "lucide-react";
import { useSiteStats } from "@/hooks/useSiteStats";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Burst = { id: number; angle: number };

export function CompactClickCounter() {
  const { stats, isLoading, incrementClick } = useSiteStats();
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);

  const handleClick = () => {
    incrementClick();
    const id = ++idRef.current;
    const angle = Math.random() * 40 - 20; // -20..20deg
    setBursts((b) => [...b, { id, angle }]);
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== id));
    }, 700);
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-wrap items-center justify-center gap-4 p-4 rounded-lg border border-border/50 bg-card/50">
        <span className="text-lg font-bold text-foreground font-mono">
          {isLoading ? "..." : stats.totalClicks.toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground">clicks</span>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleClick}
              className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all active:scale-95 overflow-visible"
            >
              <MousePointer className="w-3.5 h-3.5" />
              Click Me
              {/* Ripple + spark bursts */}
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {bursts.map((b) => (
                  <span key={b.id} className="absolute">
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-primary animate-ripple" />
                    <span
                      className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-primary animate-spark"
                      style={{ ["--spark-angle" as any]: `${b.angle}deg` }}
                    />
                  </span>
                ))}
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Tap to leave your mark — watch the counter rise
          </TooltipContent>
        </Tooltip>

        <span className="text-xs text-muted-foreground font-mono">
          you: {stats.visitorClicks}
        </span>
      </div>
    </TooltipProvider>
  );
}
