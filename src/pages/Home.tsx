import { Link } from "react-router-dom";
import { Github, Linkedin, ExternalLink, Star, Download, ArrowRight, BookOpen, FlaskConical, MousePointer } from "lucide-react";
import { QuickStatsCard } from "@/components/home/QuickStatsCard";
import { ProjectCard } from "@/components/home/ProjectCard";

import { ParticleBackground } from "@/components/home/ParticleBackground";
import { InteractiveGradient } from "@/components/home/InteractiveGradient";
import { CompactClickCounter } from "@/components/home/DashboardCard";
import { Badge } from "@/components/ui/badge";

const featuredProjects = [
  {
    slug: "fall-armyworm-detection",
    title: "Fall Armyworm Leaf Disease Detection",
    description:
      "Deep learning model using CNNs to detect Fall Armyworm damage on maize leaves with high accuracy.",
    tags: ["python", "deep-learning", "CNN", "tensorflow"],
  },
  {
    slug: "covid-19-analysis",
    title: "Covid-19 Analysis and Visualization",
    description:
      "Analyzed global COVID-19 data across 209 countries using interactive Plotly visualizations.",
    tags: ["python", "pandas", "plotly"],
  },
];

const recentBlogs = [
  {
    slug: "world-happiness-report",
    title: "World Happiness Report Analysis",
    date: "Jan 2025",
    category: "data-analysis",
  },
  {
    slug: "tech-trends-2025",
    title: "Top 5 Emerging Tech Trends of 2025",
    date: "Feb 2025",
    category: "tech",
  },
  {
    slug: "ai-vs-ml",
    title: "AI vs ML — Quick Examples",
    date: "Feb 2025",
    category: "tech",
  },
];

export default function Home() {
  return (
    <div className="animate-fade-in relative">
      <InteractiveGradient />
      <ParticleBackground />
      
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <section className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Hi, I'm <span className="text-primary inline-block hover:scale-105 transition-transform duration-300" style={{ textShadow: '0 4px 20px hsl(24 95% 53% / 0.3)' }}>Diini Kahiye</span>
          </h1>

          <div className="text-muted-foreground text-sm leading-relaxed mb-6 space-y-3">
            <p>
              I work at the intersection of <span className="text-foreground font-medium">Data Science</span>, <span className="text-foreground font-medium">Machine Learning</span>, and <span className="text-foreground font-medium">AI</span>.
            </p>
            <p>
              Using Python, SQL, and modern analytics tools, I build projects that turn complex data into practical solutions.
            </p>
          </div>

          <div className="flex items-center gap-2 mb-6 text-sm">
            <a href="https://github.com/Diini03" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline transition-colors">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-muted-foreground/50">|</span>
            <a href="https://www.linkedin.com/in/diinikahiye/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline transition-colors">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-muted-foreground/50">||</span>
            <Link to="/about" className="flex items-center gap-1.5 text-green-500 hover:underline">
              <span>More about me</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <a
            href="/cv.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
          >
            <Download className="w-4 h-4" />
            Download My CV
          </a>
        </section>

        {/* Featured Projects */}
        <section className="mb-10">
          <h2 className="text-base font-semibold flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-muted-foreground" />
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-sm font-medium text-primary hover:bg-primary/10 hover:border-primary/60 transition-all">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-10">
          <QuickStatsCard />
        </section>

        {/* Recent Blogs */}
        <section className="mb-10">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            Recent Blogs
          </h2>
          <div className="space-y-2">
            {recentBlogs.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all group"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {post.title}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {post.category}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-sm font-medium text-primary hover:bg-primary/10 hover:border-primary/60 transition-all">
              See More Blogs I Wrote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Lab Teaser */}
        <section className="mb-10">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-muted-foreground" />
            Lab
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Test your data knowledge with interactive quizzes, or try the code typing challenge.
          </p>
          <div className="text-center">
            <Link to="/lab" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-sm font-medium text-primary hover:bg-primary/10 hover:border-primary/60 transition-all">
              Explore Quizzes & Code Challenges
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Compact Click Counter */}
        <section>
          <CompactClickCounter />
        </section>
      </div>
    </div>
  );
}
