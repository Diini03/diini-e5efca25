import { MousePointer } from "lucide-react";
import { useSiteStats } from "@/hooks/useSiteStats";

export function CompactClickCounter() {
  const { stats, isLoading, incrementClick } = useSiteStats();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-3 rounded-lg border border-border bg-card">
      <span className="text-base font-semibold text-foreground font-mono">
        {isLoading ? "..." : stats.totalClicks.toLocaleString()}
      </span>
      <span className="text-xs text-muted-foreground">total clicks</span>
      <button
        onClick={incrementClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-primary/40 text-primary text-xs font-medium hover:bg-primary/10 transition-all active:scale-95"
      >
        <MousePointer className="w-3 h-3" />
        Click
      </button>
      <span className="text-xs text-muted-foreground font-mono">
        you: {stats.visitorClicks}
      </span>
    </div>
  );
}
