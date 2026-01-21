import { ReactNode } from "react";

interface TerminalCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function TerminalCard({ title, children, className = "" }: TerminalCardProps) {
  return (
    <div className={`terminal-card ${className}`}>
      <div className="terminal-header">
        <div className="flex items-center gap-1.5">
          <div className="terminal-dot terminal-dot-orange" />
          <div className="terminal-dot terminal-dot-blue" />
          <div className="terminal-dot terminal-dot-purple" />
        </div>
        <span className="text-xs text-muted-foreground ml-2 font-mono">{title}</span>
      </div>
      {children}
    </div>
  );
}
