import { Link } from "react-router-dom";
import { Github, Linkedin, ArrowUpRight, Download, ArrowRight, Star, BookOpen, FlaskConical } from "lucide-react";
import { QuickStatsCard } from "@/components/home/QuickStatsCard";
import { ProjectCard } from "@/components/home/ProjectCard";
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
  { slug: "world-happiness-report", title: "World Happiness Report Analysis", date: "Jan 2025", category: "data-analysis" },
  { slug: "tech-trends-2025", title: "Top 5 Emerging Tech Trends of 2025", date: "Feb 2025", category: "tech" },
  { slug: "ai-vs-ml", title: "AI vs ML — Quick Examples", date: "Feb 2025", category: "tech" },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        {/* Hero */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground mb-4 tracking-wide">
            ~/ data scientist · mogadishu, somalia
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1] tracking-tight">
            Hi, I'm <span className="text-primary">Diini Kahiye</span>.
          </h1>

          <div className="text-base text-muted-foreground leading-relaxed mb-8 space-y-3 max-w-2xl">
            <p>
              I work at the intersection of{" "}
              <span className="text-foreground font-medium">Data Science</span>,{" "}
              <span className="text-foreground font-medium">Machine Learning</span>, and{" "}
              <span className="text-foreground font-medium">AI</span>.
            </p>
            <p>
              Using Python, SQL, and modern analytics tools, I build projects that turn complex data into practical solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/cv.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/85 transition-all"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium rounded-lg hover:border-foreground/40 transition-all"
            >
              More about me
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/Diini03"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/diinikahiye/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Star className="w-4 h-4 text-muted-foreground" />
              Featured Work
            </h2>
            <Link to="/projects" className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
              All projects <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-16">
          <QuickStatsCard />
        </section>

        {/* Recent Blogs */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              Recent Writing
            </h2>
            <Link to="/blog" className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
              All posts <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentBlogs.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="flex items-center justify-between gap-3 p-4 rounded-lg border border-border hover:border-foreground/30 hover:bg-card transition-all group"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {post.title}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground font-mono">{post.date}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-mono font-normal">
                    {post.category}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Lab teaser */}
        <section className="mb-16">
          <div className="rounded-lg border border-border p-6 bg-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center shrink-0">
                <FlaskConical className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-semibold mb-1">The Lab</h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Interactive data quizzes and a code typing challenge — small experiments that mix curiosity with practice.
                </p>
                <Link
                  to="/lab"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                >
                  Enter the lab
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Click counter */}
        <section>
          <CompactClickCounter />
        </section>
      </div>
    </div>
  );
}
