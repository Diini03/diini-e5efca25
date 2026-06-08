import { Link } from "react-router-dom";
import { Github, Linkedin, ExternalLink, Star, ArrowRight } from "lucide-react";
import { QuickStatsCard } from "@/components/home/QuickStatsCard";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrajectoryStrip } from "@/components/home/TrajectoryStrip";
import { WritingCarousel } from "@/components/home/WritingCarousel";

import { ParticleBackground } from "@/components/home/ParticleBackground";
import { InteractiveGradient } from "@/components/home/InteractiveGradient";
import { CompactClickCounter } from "@/components/home/DashboardCard";

export default function Home() {
  return (
    <div className="animate-fade-in relative">
      <InteractiveGradient />
      <ParticleBackground />

      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="mb-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Hi, I'm{" "}
            <span
              className="text-primary inline-block hover:text-primary/80 transition-colors duration-300"
              style={{ textShadow: "0 4px 20px hsl(24 95% 53% / 0.3)" }}
            >
              Diini Kahiye
            </span>
          </h1>

          <div className="text-muted-foreground text-sm leading-relaxed mb-6 space-y-3">
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

          <div className="flex items-center gap-3 mb-8 text-sm">
            <a
              href="https://github.com/Diini03"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary hover:underline transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-muted-foreground/40">·</span>
            <a
              href="https://www.linkedin.com/in/diinikahiye/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary hover:underline transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-muted-foreground/40">·</span>
            <Link to="/about" className="flex items-center gap-1.5 text-green-500 hover:underline">
              <span>More about me</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-20">
          <h2 className="text-base font-semibold flex items-center gap-2 mb-6 pb-2 border-b border-border/40">
            <Star className="w-4 h-4 text-muted-foreground" />
            Selected Work
          </h2>

          {/* Lead project */}
          <div className="mb-4">
            <FeaturedProjectCard
              slug="fall-armyworm-detection"
              category="Machine Learning"
              title="Fall Armyworm Leaf Disease Detection"
              description="Deep learning image classification system using CNNs to detect Fall Armyworm damage on maize leaves. Built for PyCon Somalia 2025 Hackathon."
              metric="99.07% accuracy across 5 CNN models"
            />
          </div>

          {/* Secondary projects */}
          <div className="grid md:grid-cols-2 gap-4">
            <ProjectCard
              slug="world-happiness-analysis"
              category="Data Analysis"
              title="World Happiness Report Analysis"
              description="Analyzed global happiness trends across 2,363 data points exploring GDP, social support, freedom and corruption."
            />
            <ProjectCard
              slug="kulmid"
              category="Product Engineering"
              title="Kulmid — Event Management Platform"
              description="A full-featured event management web app with registration, attendee management, and ticketing. Built with React, TypeScript, and Supabase."
            />
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-sm font-medium text-primary hover:bg-primary/10 hover:border-primary/60 transition-all"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Trajectory — Experience + Education with scroll line */}
        <TrajectoryStrip />

        {/* Writing — interactive carousel */}
        <WritingCarousel />

        {/* Quick Stats */}
        <section className="mb-20">
          <QuickStatsCard />
        </section>

        {/* Compact Click Counter */}
        <section>
          <CompactClickCounter />
        </section>
      </div>
    </div>
  );
}
