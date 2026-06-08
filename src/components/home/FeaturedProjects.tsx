import { useState } from "react";
import { FeaturedProjectCard } from "./FeaturedProjectCard";

type Proj = {
  slug: string;
  title: string;
  description: string;
  category: string;
  metric?: string;
  href?: string;
  external?: boolean;
};

const P: Record<string, Proj> = {
  somaliaForecast: {
    slug: "somalia-displacement-forecast",
    category: "Business Intelligence",
    title: "Somalia Displacement Forecast Dashboard",
    description:
      "Power BI dashboard on 8.03M displaced people across 20+ districts — conflict, drought and flood, with forecast vs. actual.",
    metric: "8.03M people · 20+ districts · Power BI",
  },
  somaliaIdps: {
    slug: "somalia-idps-unhcr",
    category: "Business Intelligence",
    title: "Somalia IDPs Movement (UNHCR-PRMN)",
    description:
      "Interactive Power BI dashboard exploring internal displacement flows in Somalia using the UNHCR-PRMN 2023 dataset.",
    metric: "UNHCR-PRMN · DAX · Power Query",
  },
  fallArmyworm: {
    slug: "fall-armyworm-detection",
    category: "Machine Learning",
    title: "Fall Armyworm Leaf Disease Detection",
    description:
      "Deep learning image classification using CNNs to detect Fall Armyworm damage on maize leaves. PyCon Somalia 2025.",
    metric: "99.07% accuracy across 5 CNN models",
  },
  happiness: {
    slug: "world-happiness-analysis",
    category: "Data Analysis",
    title: "World Happiness Report (2008–2021)",
    description:
      "Trends across 2,363 data points exploring GDP, social support, freedom, and corruption.",
    metric: "Python · Pandas · Seaborn",
  },
  covid: {
    slug: "covid-19-analysis",
    category: "Data Analysis",
    title: "Covid-19 Analysis & Visualization",
    description:
      "Global COVID-19 data across 209 countries with interactive Plotly visualizations.",
    metric: "209 countries · Python · Plotly",
  },
  kulmid: {
    slug: "kulmid",
    category: "Product Engineering",
    title: "Kulmid — Event Management Platform",
    description:
      "Full-featured event management app with registration, attendee management, and ticketing.",
    metric: "React · TypeScript · Supabase",
    href: "https://www.kulmid.com/",
    external: true,
  },
};

const TABS: { id: string; label: string; projects: Proj[] }[] = [
  { id: "featured", label: "Featured", projects: [P.somaliaForecast, P.covid] },
  { id: "bi", label: "BI", projects: [P.somaliaForecast, P.somaliaIdps] },
  { id: "ml", label: "ML", projects: [P.fallArmyworm] },
  { id: "analysis", label: "Analysis", projects: [P.covid, P.happiness] },
  { id: "product", label: "Product", projects: [P.kulmid] },
];

export function FeaturedProjects() {
  const [active, setActive] = useState("featured");
  const current = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Project categories"
        className="flex flex-wrap items-center gap-1.5 mb-5"
      >
        {TABS.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.id)}
              className={[
                "px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide transition-all border",
                isActive
                  ? "bg-primary/10 border-primary/50 text-primary"
                  : "bg-muted/30 border-border/40 text-muted-foreground hover:text-foreground hover:border-border",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {current.projects.map((p) => (
          <FeaturedProjectCard key={p.slug} {...p} />
        ))}
      </div>
    </div>
  );
}
