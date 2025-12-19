import { BarChart3, Briefcase, GraduationCap, CheckCircle } from "lucide-react";
import { TerminalCard } from "./TerminalCard";

const stats = [
  {
    icon: BarChart3,
    value: "3+",
    label: "Years in Data",
    color: "text-primary",
  },
  {
    icon: Briefcase,
    value: "10+",
    label: "Projects",
    color: "text-blue-500",
  },
  {
    icon: GraduationCap,
    value: "CS",
    label: "Student @ SNU",
    color: "text-purple-500",
  },
  {
    icon: CheckCircle,
    value: "Open",
    label: "For Freelance",
    color: "text-green-500",
  },
];

export function QuickStatsCard() {
  return (
    <TerminalCard title="stats.json">
      <div className="grid grid-cols-2 gap-px bg-border/30">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center p-5 bg-card"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
            <span className="text-xs text-muted-foreground text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </TerminalCard>
  );
}
