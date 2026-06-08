import { useState, useRef, useEffect } from "react";
import { MousePointer, Eye, Info } from "lucide-react";
import { useSiteStats } from "@/hooks/useSiteStats";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Burst = { id: number; angle: number };

/** Tooltip that opens on hover AND click (toggle), closes on outside click / Esc. */
function HoverClickTip({
  children,
  text,
}: {
  children: (props: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: (e: React.MouseEvent) => void;
    onFocus: () => void;
    onBlur: () => void;
  }) => React.ReactNode;
  text: string;
}) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!pinned) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setPinned(false);
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPinned(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [pinned]);

  return (
    <span ref={wrapRef} className="inline-flex">
      <TooltipProvider delayDuration={100}>
        <Tooltip open={open} onOpenChange={(v) => !pinned && setOpen(v)}>
          <TooltipTrigger asChild>
            <span>
              {children({
                onMouseEnter: () => !pinned && setOpen(true),
                onMouseLeave: () => !pinned && setOpen(false),
                onFocus: () => !pinned && setOpen(true),
                onBlur: () => !pinned && setOpen(false),
                onClick: (e) => {
                  e.stopPropagation();
                  setPinned((p) => {
                    const next = !p;
                    setOpen(next);
                    return next;
                  });
                },
              })}
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-56 text-xs leading-relaxed">
            {text}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
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
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-muted/40 border border-border/40 transition-all duration-200 hover:bg-muted/70 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_4px_18px_-6px_hsl(var(--primary)/0.35)]">
        <Eye className="w-3.5 h-3.5 text-primary" />
        <span className="text-lg font-bold text-foreground font-mono leading-none">
          {isLoading ? "..." : stats.totalViews.toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground">visitors</span>
        <HoverClickTip text="The total number of visitors who have viewed this site. Hover or tap to view, tap again to dismiss.">
          {(handlers) => (
            <button
              type="button"
              aria-label="About visitors"
              className="inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground/70 hover:text-primary transition-colors cursor-help"
              {...handlers}
            >
              <Info className="w-3 h-3" />
            </button>
          )}
        </HoverClickTip>
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

        <div className="relative inline-flex items-center">
          <button
            onClick={handleClick}
            className="group/btn relative flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.55)] active:scale-90 active:translate-y-0 overflow-visible touch-manipulation select-none"
          >
            <MousePointer className="w-3.5 h-3.5 transition-transform group-hover/btn:rotate-12" />
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
          <span className="absolute -top-1.5 -right-1.5">
            <HoverClickTip text="Tap to leave your mark — every click is counted across all visitors worldwide.">
              {(handlers) => (
                <button
                  type="button"
                  aria-label="About Click Me"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-background border border-border/60 text-muted-foreground/80 hover:text-primary hover:border-primary/50 transition-colors cursor-help shadow-sm"
                  {...handlers}
                >
                  <Info className="w-2.5 h-2.5" />
                </button>
              )}
            </HoverClickTip>
          </span>
        </div>

        <span className="text-xs text-muted-foreground font-mono">
          you: {stats.visitorClicks}
        </span>
      </div>
    </div>
  );
}
