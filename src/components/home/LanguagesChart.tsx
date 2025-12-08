import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TerminalCard } from "./TerminalCard";

const data = [
  { name: "Python", value: 45, color: "hsl(24 95% 53%)" },
  { name: "SQL", value: 25, color: "hsl(210 80% 55%)" },
  { name: "JavaScript", value: 15, color: "hsl(180 70% 50%)" },
  { name: "DAX", value: 10, color: "hsl(45 90% 55%)" },
  { name: "Other", value: 5, color: "hsl(220 10% 70%)" },
];

export function LanguagesChart() {
  return (
    <TerminalCard title="languages.pie" className="col-span-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center md:flex-col md:gap-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-foreground">{item.name}</span>
              <span className="text-sm text-muted-foreground">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </TerminalCard>
  );
}
