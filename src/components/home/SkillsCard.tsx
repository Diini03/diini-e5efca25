import { TerminalCard } from "./TerminalCard";
import { TiltCard } from "../ui/TiltCard";

export function SkillsCard() {
  return (
    <TiltCard tiltAmount={8}>
      <TerminalCard title="skills.json">
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">Python</span>
          <div className="flex-1 h-3 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "90%", backgroundColor: "#f97316" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">SQL</span>
          <div className="flex-1 h-3 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "85%", backgroundColor: "#3b82f6" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">Power BI</span>
          <div className="flex-1 h-3 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "80%", backgroundColor: "#f97316" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">pandas</span>
          <div className="flex-1 h-3 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "85%", backgroundColor: "#3b82f6" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">React</span>
          <div className="flex-1 h-3 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "70%", backgroundColor: "#60a5fa" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">Excel</span>
          <div className="flex-1 h-3 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "85%", backgroundColor: "#22c55e" }} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 px-4 pb-4 justify-center">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#f97316" }} />
          <span className="text-xs text-muted-foreground">90%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#3b82f6" }} />
          <span className="text-xs text-muted-foreground">85%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#f97316" }} />
          <span className="text-xs text-muted-foreground">80%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#3b82f6" }} />
          <span className="text-xs text-muted-foreground">85%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#60a5fa" }} />
          <span className="text-xs text-muted-foreground">70%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#22c55e" }} />
          <span className="text-xs text-muted-foreground">85%</span>
        </div>
      </div>
      </TerminalCard>
    </TiltCard>
  );
}
