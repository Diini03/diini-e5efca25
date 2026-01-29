import { BarChart3, Brain, LayoutDashboard, Lightbulb } from "lucide-react";
import { TerminalCard } from "./TerminalCard";

const services = [
  {
    icon: BarChart3,
    title: "Data Analysis & Visualization",
    description: "Transform raw data into compelling visual stories",
  },
  {
    icon: Brain,
    title: "Machine Learning Models",
    description: "Build predictive models that drive decisions",
  },
  {
    icon: LayoutDashboard,
    title: "Interactive Dashboards",
    description: "Power BI & Plotly dashboards for real-time insights",
  },
  {
    icon: Lightbulb,
    title: "Data-Driven Insights",
    description: "Turn complex datasets into actionable strategy",
  },
];

export function ServicesCard() {
  return (
    <TerminalCard title="services.json">
      <div className="p-4 space-y-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex items-start gap-3 group"
          >
            <div className="p-1.5 rounded-md bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
              <service.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-medium text-foreground leading-tight">
                {service.title}
              </h3>
              <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </TerminalCard>
  );
}
