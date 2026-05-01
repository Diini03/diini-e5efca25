import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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
      className="clean-card group block p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[11px] font-mono text-muted-foreground border border-border rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
