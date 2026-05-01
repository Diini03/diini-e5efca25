import { MousePointer } from "lucide-react";
import { useSiteStats } from "@/hooks/useSiteStats";

export function CompactClickCounter() {
  const { stats, isLoading, incrementClick } = useSiteStats();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4 rounded-lg border border-border/50 bg-card/50">
      <span className="text-lg font-bold text-foreground font-mono">
        {isLoading ? "..." : stats.totalClicks.toLocaleString()}
      </span>
      <span className="text-xs text-muted-foreground">clicks</span>
      <button
        onClick={incrementClick}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-95"
      >
        <MousePointer className="w-3.5 h-3.5" />
        Click Me
      </button>
      <span className="text-xs text-muted-foreground font-mono">
        you: {stats.visitorClicks}
      </span>
    </div>
  );
}
