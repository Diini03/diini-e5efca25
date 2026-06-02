import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, BookOpen, Brain } from "lucide-react";

type Item = {
  kind: "experience" | "education" | "learning";
  role: string;
  org: string;
  date: string;
  note: string;
};

const items: Item[] = [
  {
    kind: "learning",
    role: "Machine Learning",
    org: "Self-directed",
    date: "2026 — Present",
    note: "Started building ML models — CNNs, classification, and applied deep learning projects.",
  },
  {
    kind: "learning",
    role: "Data Analytics",
    org: "Self-directed",
    date: "Oct 2024 — Present",
    note: "Learning data analysis with Python, SQL, Power BI and statistics through hands-on projects.",
  },
  {
    kind: "education",
    role: "BSc Computer Science",
    org: "Somali National University",
    date: "2021 — 2026",
    note: "Focus on Data Science, Machine Learning and AI.",
  },
];

const iconFor = (kind: Item["kind"]) => {
  if (kind === "education") return GraduationCap;
  if (kind === "learning") return Brain;
  return Briefcase;
};

export function TrajectoryStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [reachedSet, setReachedSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      const p = Math.max(0, Math.min(1, traveled / total));
      setProgress(p);

      // Per-item activation by dot position
      const sectionTop = rect.top;
      const fillBottomY = sectionTop + rect.height * p;
      const next = new Set<number>();
      itemRefs.current.forEach((node, i) => {
        if (!node) return;
        const r = node.getBoundingClientRect();
        const dotY = r.top + 18; // dot vertical offset within item
        if (dotY <= fillBottomY + 8) next.add(i);
      });
      setReachedSet(next);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="mb-20">
      <h2 className="text-base font-semibold mb-6 pb-2 border-b border-border/40">
        Trajectory
      </h2>

      <div className="relative">
        {/* Base track — aligned with center of dots (icon size 32px → center 16px from left) */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border/50" />
        {/* Progress fill */}
        <div
          className="absolute left-[15px] top-2 w-px bg-gradient-to-b from-primary to-primary/60 transition-[height] duration-200 ease-out"
          style={{ height: `calc(${progress * 100}% - 16px)` }}
        />

        <ul className="space-y-5">
          {items.map((item, i) => {
            const Icon = iconFor(item.kind);
            const reached = reachedSet.has(i);
            return (
              <li
                key={item.role + item.org}
                ref={(el) => (itemRefs.current[i] = el)}
                className="relative pl-12"
              >
                {/* Icon node — perfectly centered on the line */}
                <span
                  className={`absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                    reached
                      ? "bg-primary/15 border-primary text-primary shadow-[0_0_0_4px_hsl(var(--background))]"
                      : "bg-background border-border/70 text-muted-foreground shadow-[0_0_0_4px_hsl(var(--background))]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>

                <div className="rounded-lg border border-border/40 bg-card/40 px-4 py-3 hover:border-border/70 hover:bg-card/60 transition-colors">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">
                      {item.role}
                      <span className="text-muted-foreground font-normal">
                        {" "}· {item.org}
                      </span>
                    </p>
                    <span className="text-[11px] text-muted-foreground tabular-nums whitespace-nowrap font-mono">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-primary/70 mt-1 font-medium">
                    {item.kind}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {item.note}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
