import { useState, useRef } from "react";
import { MousePointer, Eye, Info } from "lucide-react";
import { useSiteStats } from "@/hooks/useSiteStats";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Burst = { id: number; angle: number };

function InfoDot({ text }: { text: string }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            tabIndex={0}
            aria-label="More info"
            className="inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:text-primary transition-colors cursor-help"
          >
            <Info className="w-3.5 h-3.5" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-56 text-xs leading-relaxed">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function CompactClickCounter() {
  const { stats, isLoading, incrementClick } = useSiteStats();
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);

  const handleClick = () => {
    incrementClick();
    const id = ++idRef.current;
    const angle = Math.random() * 40 - 20;
    setBursts((b) => [...b, { id, angle }]);
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== id));
    }, 700);
  };

  return (
    <div className="flex flex-wrap items-stretch justify-center gap-3 p-4 rounded-lg border border-border/50 bg-card/50">
      {/* Left: Visitors / Views */}
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="Total visitors"
              className="group flex items-center gap-2 px-4 py-1.5 rounded-md bg-muted/40 border border-border/40 transition-all duration-200 hover:bg-muted/70 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_4px_18px_-6px_hsl(var(--primary)/0.35)] active:scale-95 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-primary transition-transform group-hover:scale-110" />
              <span className="text-lg font-bold text-foreground font-mono leading-none">
                {isLoading ? "..." : stats.totalViews.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">visitors</span>
              <Info className="w-3 h-3 text-muted-foreground/60 group-hover:text-primary transition-colors" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-56 text-xs leading-relaxed">
            The total number of visitors who have viewed this site.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Divider */}
      <span className="hidden sm:block w-px bg-border/60" aria-hidden />

      {/* Right: Clicks */}
      <div className="flex items-center gap-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-foreground font-mono">
            {isLoading ? "..." : stats.totalClicks.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">clicks</span>
        </div>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleClick}
                className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.55)] active:scale-90 active:translate-y-0 overflow-visible touch-manipulation select-none"
              >
                <MousePointer className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
                Click Me
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
            <TooltipContent side="top" className="max-w-56 text-xs leading-relaxed">
              Tap to leave your mark — every click is counted across all visitors.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <span className="text-xs text-muted-foreground font-mono">
          you: {stats.visitorClicks}
        </span>
      </div>
    </div>
  );
}
