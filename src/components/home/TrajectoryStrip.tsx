import { useEffect, useRef, useState } from "react";

type Item = {
  kind: "experience" | "education";
  role: string;
  org: string;
  date: string;
  note: string;
};

const items: Item[] = [
  {
    kind: "experience",
    role: "Data Analyst",
    org: "Fly Graphics",
    date: "2023 — 2024",
    note: "Power BI dashboards & reports turning business data into decisions.",
  },
  {
    kind: "experience",
    role: "Data Management Assistant",
    org: "MEDAIR",
    date: "2020",
    note: "Cleaned and monitored humanitarian datasets in Excel for accurate reporting.",
  },
  {
    kind: "education",
    role: "BSc Computer Science",
    org: "Somali National University",
    date: "2021 — 2026",
    note: "Focus on Data Science, Machine Learning and AI.",
  },
];

export function TrajectoryStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // start filling when section top hits 80% of viewport, finish when bottom hits 30%
      const start = vh * 0.8;
      const end = vh * 0.3;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      const p = Math.max(0, Math.min(1, traveled / total));
      setProgress(p);
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

      <div className="relative pl-6">
        {/* Base track */}
        <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border/60" />
        {/* Progress fill */}
        <div
          className="absolute left-1.5 top-1 w-px bg-primary origin-top transition-[height] duration-150 ease-out"
          style={{ height: `calc(${progress * 100}% - 2px)` }}
        />

        <ul className="space-y-7">
          {items.map((item, i) => {
            const itemAnchor = (i + 0.5) / items.length;
            const reached = progress >= itemAnchor;
            return (
              <li key={item.role + item.org} className="relative">
                {/* Dot */}
                <span
                  className={`absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full border-2 transition-colors ${
                    reached
                      ? "bg-primary border-primary"
                      : "bg-background border-border"
                  }`}
                />
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium text-foreground">
                    {item.role}{" "}
                    <span className="text-muted-foreground font-normal">
                      · {item.org}
                    </span>
                  </p>
                  <span className="text-[11px] text-muted-foreground tabular-nums whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60 mt-1">
                  {item.kind === "experience" ? "Experience" : "Education"}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  {item.note}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
