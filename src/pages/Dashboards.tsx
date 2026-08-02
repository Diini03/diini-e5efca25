import { useState } from "react";
import { Seo } from "@/components/Seo";
import { dashboards } from "@/data/dashboards";
import { DashboardViewer } from "@/components/dashboards/DashboardViewer";
import { Maximize2 } from "lucide-react";

const tools = ["Power BI", "Power Query", "DAX"];

export default function Dashboards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Seo
        title="Dashboards | Diini Kahiye"
        description="A gallery of Power BI dashboards by Diini Kahiye, built with Power Query transformations and DAX measures."
        path="/dashboards"
      />

      <header className="mb-10">
        <p className="font-mono text-xs text-primary mb-2">~/dashboards</p>
        <h1 className="text-3xl font-bold text-foreground mb-3">Dashboards</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Every dashboard here is built in Power BI, with the data shaped and cleaned in
          Power Query before modelling. Click any dashboard to view it larger.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tools.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md border border-primary/30 bg-primary/5 font-mono text-[11px] text-primary"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {dashboards.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setOpenIndex(i)}
            className="terminal-card group text-left border border-border/50"
            aria-label={`Open ${d.title}`}
          >
            <div className="terminal-header">
              <span className="terminal-dot terminal-dot-orange" />
              <span className="terminal-dot terminal-dot-blue" />
              <span className="terminal-dot terminal-dot-purple" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground truncate">
                dashboards / {d.id}
              </span>
            </div>
            <div className="relative overflow-hidden bg-background/40">
              <img
                src={d.image}
                alt={`${d.title} — Power BI dashboard`}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[16/9] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-5 h-5 text-primary" />
              </span>
            </div>
            <div className="px-4 py-3">
              <h2 className="text-sm font-medium text-foreground">{d.title}</h2>
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <DashboardViewer
          items={dashboards}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
