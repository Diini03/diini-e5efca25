import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TerminalCard } from "./TerminalCard";

const data = [
  { name: "Python", value: 45, color: "#f97316" },
  { name: "SQL", value: 25, color: "#3b82f6" },
  { name: "JavaScript", value: 15, color: "#22d3ee" },
  { name: "DAX", value: 10, color: "#a855f7" },
  { name: "Other", value: 5, color: "#6b7280" },
];

export function LanguagesChart() {
  return (
    <TerminalCard title="languages.pie">
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend - 2 column grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-xs mx-auto">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </TerminalCard>
  );
}
