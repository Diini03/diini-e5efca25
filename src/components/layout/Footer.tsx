import { Github, Linkedin, Facebook, Twitter, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteStats } from "@/hooks/useSiteStats";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { stats, isLoading } = useSiteStats();

  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Brand + nav */}
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm font-mono text-foreground">
              <span className="text-muted-foreground">~/</span>diini-kahiye
            </Link>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link>
              <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <Link to="/lab" className="hover:text-foreground transition-colors">Lab</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-1">
            <a href="https://github.com/Diini03" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/diinikahiye/" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/diiniCade8" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://x.com/DiiniCade0" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
          <span>© {currentYear} Diini Kahiye</span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {isLoading ? "..." : stats.totalViews.toLocaleString()} views
          </span>
        </div>
      </div>
    </footer>
  );
}
