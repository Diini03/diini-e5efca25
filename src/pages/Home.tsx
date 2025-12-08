import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Typewriter } from "@/components/ui/Typewriter";
import { DataVisualization } from "@/components/home/DataVisualization";

export default function Home() {
  const [showTagline, setShowTagline] = useState(false);
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
      <DataVisualization />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-6">
          {/* Terminal-style intro */}
          <div className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> whoami
          </div>

          {/* Name with typing effect */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <Typewriter
              text="DIINI KAHIYE"
              delay={80}
              className="gradient-text"
              onComplete={() => setShowTagline(true)}
            />
          </h1>

          {/* Tagline */}
          <div className={`transition-all duration-700 ${showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Junior Data Scientist
            </p>
            <p className="text-lg text-muted-foreground/80 mt-2 font-mono">
              Turning raw data into{" "}
              <span className="text-primary">actionable insights</span>
            </p>
            {showTagline && (
              <div className="mt-1">
                <Typewriter
                  text=""
                  delay={50}
                  onComplete={() => setShowContent(true)}
                />
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap gap-4 pt-6 transition-all duration-700 delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all hover-lift"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-secondary transition-all hover-lift"
            >
              Get in Touch
            </Link>
          </div>

          {/* Social Links */}
          <div className={`flex items-center gap-4 pt-8 transition-all duration-700 delay-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a
              href="https://github.com/Diini03"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/diinikahiye/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:diiniyare74@gmail.com"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Quick Stats */}
          <div className={`grid grid-cols-3 gap-6 pt-12 max-w-md transition-all duration-700 delay-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary font-mono">3+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary font-mono">2+</div>
              <div className="text-sm text-muted-foreground">Years Exp</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary font-mono">5+</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
