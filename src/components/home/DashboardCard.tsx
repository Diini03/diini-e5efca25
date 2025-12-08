import { useState, useEffect } from "react";
import { Sun, Moon, MousePointer, MapPin, Clock, Eye } from "lucide-react";
import { TerminalCard } from "./TerminalCard";

export function DashboardCard() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });
  const [clicks, setClicks] = useState(0);
  const [time, setTime] = useState(new Date());
  const [pageViews] = useState(450);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
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
          onClick={() => setClicks((c) => c + 1)}
          className="flex flex-col items-center justify-center p-6 bg-card hover:bg-secondary/50 transition-colors"
        >
          <MousePointer className="w-6 h-6 text-primary mb-2" />
          <span className="text-xs text-muted-foreground">{clicks} clicks</span>
        </button>

        {/* Location */}
        <div className="flex flex-col items-center justify-center p-6 bg-card">
          <div className="relative">
            <MapPin className="w-6 h-6 text-primary mb-2" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
          </div>
          <span className="text-xs text-muted-foreground">Mogadishu, SO</span>
        </div>

        {/* Time */}
        <div className="flex flex-col items-center justify-center p-6 bg-card">
          <Clock className="w-6 h-6 text-primary mb-2" />
          <span className="text-xs text-muted-foreground font-mono">
            {formatTime(time)}
          </span>
        </div>
      </div>

      {/* Page Views */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs py-4 bg-card">
        <Eye className="w-4 h-4" />
        <span>{pageViews} page views</span>
      </div>
    </TerminalCard>
  );
}
