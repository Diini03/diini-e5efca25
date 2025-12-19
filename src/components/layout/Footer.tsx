import { Github, Linkedin, Facebook, Twitter, Mail, MapPin, Code } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 py-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {/* Brand & Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Code className="w-4 h-4 text-primary" />
              <span>Diini Kahiye</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>Mogadishu, Somalia</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="w-3 h-3" />
              <span>diiniyare74@gmail.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-foreground">Quick Links</span>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <a href="/about" className="hover:text-primary transition-colors">About</a>
              <a href="/projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
              <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-foreground">Connect</span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Diini03"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/diinikahiye/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/diiniCade8"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/DiiniCade0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="font-mono">
            <span className="text-muted-foreground/60">// </span>
            © {currentYear} Diini Kahiye. All rights reserved.
          </span>
          <span className="text-muted-foreground/60 font-mono">
            &lt;/&gt; with passion
          </span>
        </div>
      </div>
    </footer>
  );
}
