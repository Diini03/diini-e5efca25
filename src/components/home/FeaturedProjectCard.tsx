import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface FeaturedProjectCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  metric?: string;
  href?: string;
  external?: boolean;
}

export function FeaturedProjectCard({
  slug,
  title,
  description,
  category,
  metric,
  href,
  external,
}: FeaturedProjectCardProps) {
  const to = href ?? `/projects/${slug}`;
  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      to={to}
      {...linkProps}
      className="terminal-card depth-layer block hover:ring-1 hover:ring-primary/30 transition-all group"
    >
      <div className="terminal-header">
        <div className="flex items-center gap-1.5">
          <div className="terminal-dot terminal-dot-orange" />
          <div className="terminal-dot terminal-dot-blue" />
          <div className="terminal-dot terminal-dot-purple" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          <span className="text-primary">projects</span> / {slug}
        </span>
      </div>
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-3">
          <p className="text-[10px] tracking-[0.18em] uppercase text-primary/80">
            {category}
          </p>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>
        {metric && (
          <p className="text-xs font-mono text-muted-foreground/80 border-t border-border/40 pt-3">
            <span className="text-primary">→</span> {metric}
          </p>
        )}
      </div>
    </Link>
  );
}
