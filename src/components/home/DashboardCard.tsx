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
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-muted/40 border border-border/40">
        <Eye className="w-3.5 h-3.5 text-primary" />
        <span className="text-lg font-bold text-foreground font-mono leading-none">
          {isLoading ? "..." : stats.totalViews.toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground">visitors</span>
        <InfoDot text="The total number of visitors who have viewed this site." />
      </div>

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

        <button
          onClick={handleClick}
          className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all active:scale-95 overflow-visible"
        >
          <MousePointer className="w-3.5 h-3.5" />
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

        <InfoDot text="Tap to leave your mark — every click is counted across all visitors." />

        <span className="text-xs text-muted-foreground font-mono">
          you: {stats.visitorClicks}
        </span>
      </div>
    </div>
  );
}
