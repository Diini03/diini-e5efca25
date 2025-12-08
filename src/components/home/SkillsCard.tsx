import { TerminalCard } from "./TerminalCard";

export function SkillsCard() {
  return (
    <TerminalCard title="skills.json">
      <div className="p-4 space-y-2.5">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">Python</span>
          <div className="flex-1 h-2.5 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "90%", backgroundColor: "#f97316" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">React</span>
          <div className="flex-1 h-2.5 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "80%", backgroundColor: "#60a5fa" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">SQL</span>
          <div className="flex-1 h-2.5 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "85%", backgroundColor: "#3b82f6" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">Power BI</span>
          <div className="flex-1 h-2.5 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "80%", backgroundColor: "#f97316" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">Cursor</span>
          <div className="flex-1 h-2.5 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "75%", backgroundColor: "#a855f7" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">Lovable</span>
          <div className="flex-1 h-2.5 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "85%", backgroundColor: "#ec4899" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14 text-right shrink-0">Warp</span>
          <div className="flex-1 h-2.5 bg-secondary rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: "70%", backgroundColor: "#22c55e" }} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 px-4 pb-3 justify-center text-[10px]">
        <span className="text-muted-foreground">Data Science</span>
        <span className="text-primary">•</span>
        <span className="text-muted-foreground">React Dev</span>
        <span className="text-primary">•</span>
        <span className="text-muted-foreground">AI Tools</span>
      </div>
    </TerminalCard>
  );
}
