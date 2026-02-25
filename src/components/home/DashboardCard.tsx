import { useState, useEffect } from "react";
import { MousePointer, Clock, Eye } from "lucide-react";
import { TerminalCard } from "./TerminalCard";
import { useSiteStats } from "@/hooks/useSiteStats";

export function PageViewsCard() {
  const { stats, isLoading } = useSiteStats();

  return (
    <TerminalCard title="views.log">
      <div className="flex flex-col items-center justify-center p-8">
        <Eye className="w-8 h-8 text-primary mb-3 opacity-80" />
        <span className="text-3xl font-bold text-foreground font-mono tracking-tight">
          {isLoading ? "..." : stats.totalViews.toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground mt-1">page views</span>
      </div>
    </TerminalCard>
  );
}

export function ClickCounterCard() {
  const { stats, isLoading, incrementClick } = useSiteStats();

  return (
    <TerminalCard title="clicks.sh">
      <div className="flex flex-col items-center justify-center p-6">
        <span className="text-3xl font-bold text-foreground font-mono tracking-tight mb-3">
          {isLoading ? "..." : stats.totalClicks.toLocaleString()}
        </span>
        <button
          onClick={incrementClick}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-95"
        >
          <MousePointer className="w-4 h-4" />
          Click Me
        </button>
        <span className="text-[11px] text-muted-foreground mt-3">
          You: {stats.visitorClicks} · this session: {stats.sessionClicks}
        </span>
      </div>
    </TerminalCard>
  );
}

export function TimeOnSiteCard() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatElapsedTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <TerminalCard title="session.timer">
      <div className="flex flex-col items-center justify-center p-8">
        <Clock className="w-8 h-8 text-primary mb-3 opacity-80" />
        <span className="text-3xl font-bold text-foreground font-mono tracking-tight">
          {formatElapsedTime(elapsedSeconds)}
        </span>
        <span className="text-xs text-muted-foreground mt-1">this session</span>
      </div>
    </TerminalCard>
  );
}
