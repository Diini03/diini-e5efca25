import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, FileText } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { RESUME_URL } from "@/lib/resume";

const navItems = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

interface NavigationProps {
  onLogoClick?: () => void;
}

export function Navigation({ onLogoClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="text-lg font-mono text-foreground flex items-center" onClick={onLogoClick}>
              <span className="text-muted-foreground">~/</span>
              <span className="text-primary animate-pulse">|</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
                  activeClassName="text-foreground"
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-primary/40 text-xs font-mono text-primary hover:bg-primary/10 hover:border-primary/60 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors relative z-[60]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[54] md:hidden bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Right-side drawer */}
      <aside
        className={`fixed top-0 right-0 z-[55] md:hidden h-full w-[78%] max-w-xs bg-popover border-l border-border shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between h-14 px-5 border-b border-border/60">
          <span className="text-sm font-mono text-primary">Navigation</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-3.5rem)] px-5 py-6">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between w-full px-3 py-3 rounded-lg text-base font-mono text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all ${
                  isOpen ? "animate-fade-in" : ""
                }`}
                activeClassName="text-primary bg-primary/10"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
                onClick={() => setIsOpen(false)}
              >
                <span>
                  <span className="text-primary/60 mr-2 text-xs">0{i + 1}.</span>
                  {item.label}
                </span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-border/60">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-mono text-primary border border-primary/40 hover:bg-primary/10 transition-all"
            >
              <FileText className="w-4 h-4" />
              Resume
            </a>
          </div>

          <div className="mt-auto pt-6 text-xs text-muted-foreground/50 font-mono">
            ~/diini-kahiye
          </div>
        </div>
      </aside>
    </>
  );
}
