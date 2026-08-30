import type { DashboardItem } from "@/data/dashboards";
import { Maximize2 } from "lucide-react";

interface GalleryGridProps {
  items: DashboardItem[];
  onOpen: (index: number) => void;
  variant?: "work" | "personal";
}

export function GalleryGrid({ items, onOpen, variant = "work" }: GalleryGridProps) {
  const personal = variant === "personal";

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
      {items.map((item, i) => (
        <button
          key={item.id}
          onClick={() => onOpen(i)}
          aria-label={`Open ${item.title}`}
          className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg border border-border/50 bg-card text-left transition-colors hover:border-primary/40"
        >
          {!personal && (
            <div className="flex items-center gap-1.5 border-b border-border/40 px-3 py-2">
              <span className="terminal-dot terminal-dot-orange" />
              <span className="terminal-dot terminal-dot-blue" />
              <span className="terminal-dot terminal-dot-purple" />
              <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">
                {item.id}
              </span>
            </div>
          )}
          <div className="relative overflow-hidden bg-background/40">
            <img
              src={item.image}
              alt={personal ? `Diini Kahiye — ${item.title}` : `${item.title} — Power BI dashboard`}
              loading="lazy"
              decoding="async"
              className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-5 w-5 text-primary" />
            </span>
            {!personal && (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-background/95 to-transparent px-3 py-2 font-mono text-[11px] text-foreground transition-transform duration-300 group-hover:translate-y-0">
                {item.title}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
