import { Link } from "react-router-dom";
import { Github, Linkedin, ExternalLink, Star, Download } from "lucide-react";
import { DashboardCard } from "@/components/home/DashboardCard";
import { SkillsCard } from "@/components/home/SkillsCard";
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
      
      <div className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <section className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Hey! I'm <span className="text-primary inline-block hover:scale-105 transition-transform duration-300" style={{ textShadow: '0 4px 20px hsl(24 95% 53% / 0.3)' }}>Diini Kahiye</span>
          </h1>

          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed mb-6">
            <p>
              <span className="text-foreground font-medium">Data Analyst by day, aspiring Data Scientist by night.</span> Based in <span className="text-foreground font-medium">Mogadishu</span>, 
              I use <span className="text-foreground font-medium">Python, SQL, R, Power BI, Tableau, and JavaScript</span> to transform complex data into insights that drive real decisions. 
              My work spans real projects, <span className="text-foreground font-medium">humanitarian initiatives</span>, and business-focused analysis. I also built{" "}
              <a
                href="https://kulmid.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="link-orange"
              >
                Kulmid
              </a>
              , an event management platform designed to support organized and seamless event experiences.
            </p>
            <p>
              I recently graduated with a degree in <span className="text-foreground font-medium">Computer Science</span> from <span className="text-foreground font-medium">Somali National University</span> and have gained practical 
              field experience with <span className="text-foreground font-medium">NAPAD</span> and <span className="text-foreground font-medium">MEDAIR</span>. Along the way, I have strengthened my skills through programs 
              such as <span className="text-foreground font-medium">freeCodeCamp's Data Analysis with Python</span> and the <span className="text-foreground font-medium">Alex the Analyst Bootcamp</span>, and I am continually 
              pushing myself toward a <span className="text-primary font-semibold">full Data Science career</span>.
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
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 mb-8"
          >
            <Download className="w-4 h-4" />
            Download My CV
          </a>
        </section>

        {/* Dashboard Section */}
        <section className="mb-10">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <span className="text-muted-foreground">//</span> Dashboard
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <DashboardCard />
            <SkillsCard />
          </div>

          <QuickStatsCard />
        </section>

        {/* Featured Projects */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Star className="w-4 h-4 text-muted-foreground" />
              Featured Projects
            </h2>
            <Link
              to="/projects"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View all
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
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