import { Github, Linkedin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          {/* Copyright */}
          <span className="font-mono">
            <span className="text-muted-foreground/60">// </span>
            © 2024 Diini Kahiye
          </span>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Diini03"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/diinikahiye/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Built with */}
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-primary fill-primary" /> using Lovable
          </span>
        </div>
      </div>
    </footer>
  );
}
