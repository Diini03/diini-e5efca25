import { useState, useEffect } from "react";
import { Sun, Moon, MousePointer, MapPin, Clock, Eye } from "lucide-react";
import { TerminalCard } from "./TerminalCard";
import { useSiteStats } from "@/hooks/useSiteStats";

export function DashboardCard() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { stats, isLoading, incrementClick } = useSiteStats();

  // Timer that counts time spent on site (resets on each visit)
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initialize dark mode
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const formatElapsedTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <TerminalCard title="dashboard.tsx">
      <div className="grid grid-cols-2 gap-px bg-border/30">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center p-6 bg-card hover:bg-secondary/50 transition-colors"
        >
          {isDark ? (
            <Moon className="w-6 h-6 text-primary mb-2" />
          ) : (
            <Sun className="w-6 h-6 text-primary mb-2" />
          )}
          <span className="text-xs text-muted-foreground">
            {isDark ? "Dark Mode" : "Light Mode"}
          </span>
        </button>

        {/* Click Counter */}
        <button
          onClick={incrementClick}
          className="flex flex-col items-center justify-center p-6 bg-card hover:bg-secondary/50 transition-colors"
        >
          <MousePointer className="w-6 h-6 text-primary mb-2" />
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">
              {isLoading ? "..." : stats.totalClicks.toLocaleString()} total
            </span>
            <span className="text-[10px] text-muted-foreground/70">
              You: {stats.visitorClicks} ({stats.sessionClicks} this session)
            </span>
          </div>
        </button>

        {/* Location */}
        <div className="flex flex-col items-center justify-center p-6 bg-card">
          <div className="relative">
            <MapPin className="w-6 h-6 text-primary mb-2" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
          </div>
          <span className="text-xs text-muted-foreground">Mogadishu, SO</span>
        </div>

        {/* Time Spent */}
        <div className="flex flex-col items-center justify-center p-6 bg-card">
          <Clock className="w-6 h-6 text-primary mb-2" />
          <span className="text-xs text-muted-foreground font-mono">
            {formatElapsedTime(elapsedSeconds)}
          </span>
        </div>
      </div>

      {/* Page Views */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs py-4 bg-card">
        <Eye className="w-4 h-4" />
        <span>{isLoading ? "..." : stats.totalViews.toLocaleString()} page views</span>
      </div>
    </TerminalCard>
  );
}
