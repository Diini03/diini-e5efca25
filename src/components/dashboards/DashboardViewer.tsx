import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { DashboardItem } from "@/data/dashboards";

interface DashboardViewerProps {
  items: DashboardItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function DashboardViewer({ items, index, onClose, onNavigate }: DashboardViewerProps) {
  const item = items[index];

  const prev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate]
  );
  const next = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute top-4 right-4 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous dashboard"
        className="absolute left-2 sm:left-6 z-10 p-2 rounded-full border border-border/60 bg-card/80 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next dashboard"
        className="absolute right-2 sm:right-6 z-10 p-2 rounded-full border border-border/60 bg-card/80 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <figure
        className="flex flex-col items-center gap-3 px-12 sm:px-20 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.title}
          className="max-h-[75vh] max-w-[80vw] w-auto rounded-lg border border-border/60 shadow-2xl object-contain"
        />
        <figcaption className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="text-foreground">{item.title}</span>
          <span className="text-primary/70">
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
