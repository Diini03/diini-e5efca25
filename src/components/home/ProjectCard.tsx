import { Link } from "react-router-dom";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export function ProjectCard({ slug, title, description, tags }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${slug}`}
      className="terminal-card block hover:ring-1 hover:ring-primary/30 transition-all group"
    >
      <div className="terminal-header">
        <div className="flex items-center gap-1.5">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          <span className="text-primary">diini</span> / {slug}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-secondary text-muted-foreground rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
