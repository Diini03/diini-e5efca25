import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, ExternalLink } from "lucide-react";

// Import project images
import kulmidImg from "@/assets/projects/kulmid.png";

const allTags = [
  "all", "react", "typescript", "supabase", "python", "pandas", "plotly", "matplotlib", "seaborn", "numpy", "eda", "data-visualization"
];

const categories = [
  { id: "all", label: "All", count: 3 },
  { id: "web-development", label: "Web Development", count: 1 },
  { id: "data-analysis", label: "Data Analysis", count: 2 },
  { id: "visualization", label: "Visualization", count: 2 },
];

const projects = [
  {
    slug: "kulmid",
    title: "Kulmid - Event Management Platform",
    description: "A full-featured event management web application where users can create, manage, and share events. Features include event registration, attendee management, invitation system, and ticket handling. Built with React, TypeScript, and Supabase.",
    tags: ["react", "typescript", "supabase", "tailwindcss"],
    category: "web-development",
    date: "2025",
    image: kulmidImg,
    liveUrl: "https://kulmid.lovable.app/",
  },
  {
    slug: "covid-19-analysis",
    title: "Covid-19 Analysis and Visualization using Plotly Express",
    description: "Analyzed global COVID-19 data across 209 countries using interactive Plotly visualizations including bar charts, scatter plots, and choropleth maps.",
    tags: ["python", "pandas", "plotly", "matplotlib", "data-visualization"],
    category: "data-analysis",
    date: "2024",
  },
  {
    slug: "netflix-data-analysis",
    title: "Netflix Data Analysis & Visualization",
    description: "Comprehensive analysis of 8807 Netflix titles exploring content distribution, trends over time, and country-based insights using Python visualization libraries.",
    tags: ["python", "pandas", "seaborn", "matplotlib", "numpy", "eda"],
    category: "data-analysis",
    date: "2024",
  },
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = activeTag === "all" || project.tags.includes(activeTag);
      const matchesCategory = activeCategory === "all" || project.category === activeCategory;
      return matchesSearch && matchesTag && matchesCategory;
    });
  }, [searchQuery, activeTag, activeCategory]);

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

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center gap-2 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                activeCategory === cat.id ? "bg-primary-foreground/20" : "bg-muted"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="space-y-4">
          {filteredProjects.map((project) => (
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

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}