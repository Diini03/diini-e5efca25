import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

// Import project images
import kulmidImg from "@/assets/projects/kulmid.png";

const projects = [
  {
    slug: "covid-19-analysis",
    title: "Covid-19 Analysis and Visualization using Plotly Express",
    description: "Analyzed global COVID-19 data across 209 countries using interactive Plotly visualizations including bar charts, scatter plots, and choropleth maps.",
    tags: ["python", "pandas", "plotly", "matplotlib", "data-visualization"],
    date: "2024",
  },
  {
    slug: "netflix-data-analysis",
    title: "Netflix Data Analysis & Visualization",
    description: "Comprehensive analysis of 8807 Netflix titles exploring content distribution, trends over time, and country-based insights using Python visualization libraries.",
    tags: ["python", "pandas", "seaborn", "matplotlib", "numpy", "eda"],
    date: "2024",
  },
  {
    slug: "kulmid",
    title: "Kulmid - Event Management Platform",
    description: "A full-featured event management web application where users can create, manage, and share events. Features include event registration, attendee management, invitation system, and ticket handling. Built with React, TypeScript, and Supabase.",
    tags: ["react", "typescript", "supabase", "tailwindcss"],
    date: "2025",
    image: kulmidImg,
    liveUrl: "https://kulmid.lovable.app/",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        <h1 className="text-2xl font-bold text-primary mb-2">Projects</h1>
        <p className="text-muted-foreground text-sm mb-8">
          A collection of my data science and development projects.
        </p>

        {/* Project Cards */}
        <div className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={project.liveUrl ? project.liveUrl : `/projects/${project.slug}`}
              target={project.liveUrl ? "_blank" : undefined}
              rel={project.liveUrl ? "noopener noreferrer" : undefined}
              className="terminal-card block hover:ring-1 hover:ring-primary/30 transition-all group"
            >
              <div className="terminal-header flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    <span className="text-primary">diini</span> / {project.slug}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{project.date}</span>
              </div>
              
              {/* Project Image (if available) */}
              {project.image && (
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {project.liveUrl && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      Live Demo
                    </span>
                  )}
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
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
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}