const stats = [
  { value: "3+", label: "Years in Data" },
  { value: "5+", label: "Projects Shipped" },
  { value: "BSc", label: "CS Graduate" },
  { value: "Open", label: "For Freelance" },
];

export function QuickStatsCard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-start justify-center p-5 bg-card"
        >
          <span className="text-2xl font-semibold text-foreground tracking-tight">
            {stat.value}
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
