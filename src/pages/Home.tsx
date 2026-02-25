import { Link } from "react-router-dom";
import { Github, Linkedin, ExternalLink, Star, Download, ArrowRight } from "lucide-react";
import { PageViewsCard, ClickCounterCard, TimeOnSiteCard } from "@/components/home/DashboardCard";
import { ServicesCard } from "@/components/home/ServicesCard";
import { QuickStatsCard } from "@/components/home/QuickStatsCard";
import { ProjectCard } from "@/components/home/ProjectCard";

import { TestimonialsCard } from "@/components/home/TestimonialsCard";
import { ParticleBackground } from "@/components/home/ParticleBackground";
import { InteractiveGradient } from "@/components/home/InteractiveGradient";

const featuredProjects = [
  {
    slug: "covid-19-analysis",
    title: "Covid-19 Analysis and Visualization",
    description:
      "Analyzed global COVID-19 data across 209 countries using interactive Plotly visualizations.",
    tags: ["python", "pandas", "plotly"],
  },
  {
    slug: "netflix-data-analysis",
    title: "Netflix Data Analysis & Visualization",
    description:
      "Comprehensive analysis of 8807 Netflix titles exploring content distribution and trends.",
    tags: ["python", "pandas", "seaborn", "matplotlib"],
  },
];

export default function Home() {
  return (
    <div className="animate-fade-in relative">
      {/* Interactive Gradient Background */}
      <InteractiveGradient />
      
      {/* Particle Background - Full Page */}
      <ParticleBackground />
      
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <section className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Hey! I'm <span className="text-primary inline-block hover:scale-105 transition-transform duration-300" style={{ textShadow: '0 4px 20px hsl(24 95% 53% / 0.3)' }}>Diini Kahiye</span>
          </h1>

          <div className="text-muted-foreground text-sm leading-relaxed mb-6">
            <p>
              I'm a <span className="text-foreground font-medium">Junior Data Scientist</span> specializing in machine learning and big data solutions. 
              I build predictive models, analyze large datasets, and deliver data-driven insights using <span className="text-foreground font-medium">Python, SQL, R</span>, and <span className="text-foreground font-medium">Power BI</span>. 
              From COVID-19 trends across 209 countries to Netflix content patterns — I work with real-world data.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <a
              href="https://github.com/Diini03"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary hover:underline transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-muted-foreground/50">|</span>
            <a
              href="https://www.linkedin.com/in/diinikahiye/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary hover:underline transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-muted-foreground/50">||</span>
            <Link
              to="/about"
              className="flex items-center gap-1.5 text-green-500 hover:underline"
            >
              <span>More about me</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* CV Download Button */}
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
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary/50 transition-all"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-10">
          <QuickStatsCard />
        </section>

        {/* Dashboard Section - Bento Grid */}
        <section className="mb-10">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <span className="text-muted-foreground">//</span> Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PageViewsCard />
            <ClickCounterCard />
            <TimeOnSiteCard />
            <ServicesCard />
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <span className="text-muted-foreground">//</span> Testimonials
          </h2>
          <TestimonialsCard />
        </section>
      </div>
    </div>
  );
}