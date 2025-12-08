import { useState, useEffect } from "react";
import { Sun, Moon, MousePointer, MapPin, Clock, Eye } from "lucide-react";
import { TerminalCard } from "./TerminalCard";

export function DashboardCard() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const [clicks, setClicks] = useState(0);
  const [time, setTime] = useState(new Date());
  const [pageViews] = useState(418);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <TerminalCard title="dashboard.tsx">
      <div className="grid grid-cols-2 gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border"
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-primary mb-2" />
          ) : (
            <Sun className="w-5 h-5 text-primary mb-2" />
          )}
          <span className="text-xs text-muted-foreground">
            {isDark ? "Dark Mode" : "Light Mode"}
          </span>
        </button>

        {/* Click Counter */}
        <button
          onClick={() => setClicks((c) => c + 1)}
          className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border"
        >
          <MousePointer className="w-5 h-5 text-primary mb-2" />
          <span className="text-xs text-muted-foreground">{clicks} clicks</span>
        </button>

        {/* Location */}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/30 border border-border">
          <div className="relative">
            <MapPin className="w-5 h-5 text-primary mb-2" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
          </div>
          <span className="text-xs text-muted-foreground">Mogadishu, SO</span>
        </div>

        {/* Time */}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/30 border border-border">
          <Clock className="w-5 h-5 text-primary mb-2" />
          <span className="text-xs text-muted-foreground font-mono">
            {formatTime(time)}
          </span>
        </div>
      </div>

      {/* Page Views */}
      <div className="mt-3 flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <Eye className="w-4 h-4" />
        <span>{pageViews} page views</span>
      </div>
    </TerminalCard>
  );
}
