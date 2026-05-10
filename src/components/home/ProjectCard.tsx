import { Link } from "react-router-dom";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
}

export function ProjectCard({ slug, title, description, category }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${slug}`}
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
      <div className="p-4">
        {category && (
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/70 mb-2">
            {category}
          </p>
        )}
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
