const experience = [
  {
    role: "Data Analyst",
    org: "Fly Graphics",
    date: "2023 — 2024",
    note: "Power BI dashboards & reports turning business data into decisions.",
  },
  {
    role: "Data Management Assistant",
    org: "MEDAIR",
    date: "2020",
    note: "Cleaned and monitored humanitarian datasets in Excel for accurate reporting.",
  },
];

const education = [
  {
    role: "BSc Computer Science",
    org: "Somali National University",
    date: "2021 — 2026",
    note: "Focus on Data Science, Machine Learning and AI.",
  },
];

function Column({ heading, items }: { heading: string; items: typeof experience }) {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-4">
        {heading}
      </h3>
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.role + item.org}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-medium text-foreground">
                {item.role}{" "}
                <span className="text-muted-foreground font-normal">· {item.org}</span>
              </p>
              <span className="text-[11px] text-muted-foreground tabular-nums whitespace-nowrap">
                {item.date}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {item.note}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BackgroundStrip() {
  return (
    <section className="mb-20">
      <h2 className="text-base font-semibold mb-6 pb-2 border-b border-border/40">
        Background
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        <Column heading="Experience" items={experience} />
        <Column heading="Education" items={education} />
      </div>
    </section>
  );
}
