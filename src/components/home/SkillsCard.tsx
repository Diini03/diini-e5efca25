import { TerminalCard } from "./TerminalCard";

const skills = [
  { name: "Python", level: 90, color: "bg-primary" },
  { name: "SQL", level: 85, color: "bg-blue-500" },
  { name: "Power BI", level: 80, color: "bg-primary" },
  { name: "pandas", level: 85, color: "bg-blue-500" },
  { name: "React", level: 70, color: "bg-cyan-500" },
  { name: "Excel", level: 85, color: "bg-green-500" },
];

export function SkillsCard() {
  return (
    <TerminalCard title="skills.json">
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-16 text-right">
              {skill.name}
            </span>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full ${skill.color} rounded-full transition-all duration-1000`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Skill percentages legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${skill.color}`} />
            <span className="text-xs text-muted-foreground">{skill.level}%</span>
          </div>
        ))}
      </div>
    </TerminalCard>
  );
}
