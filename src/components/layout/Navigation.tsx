import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Lab", path: "/lab" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

interface NavigationProps {
  onLogoClick?: () => void;
}

export function Navigation({ onLogoClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
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
            {/* Logo */}
            <Link to="/" className="text-lg font-mono text-foreground flex items-center" onClick={onLogoClick}>
              <span className="text-muted-foreground">~/</span>
              <span className="text-primary animate-pulse">|</span>
            </Link>

            {/* Desktop Navigation */}
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
              <button
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
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

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-[55] md:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

        {/* Close Button */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          className="absolute top-4 right-6 z-20 p-2 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Menu Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8" onClick={(e) => e.stopPropagation()}>
          <div className="space-y-2 w-full max-w-sm">
            {navItems.map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between w-full px-4 py-4 rounded-xl text-lg font-mono text-muted-foreground hover:text-foreground hover:bg-card transition-all ${
                  isOpen ? "animate-fade-in" : ""
                }`}
                activeClassName="text-primary bg-primary/10"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </NavLink>
            ))}

            {/* Divider */}
            <div className="border-t border-border/50 my-4" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-between w-full px-4 py-4 rounded-xl text-lg font-mono text-muted-foreground hover:text-foreground hover:bg-card transition-all ${
                isOpen ? "animate-fade-in" : ""
              }`}
              style={{ animationDelay: `${navItems.length * 60}ms`, animationFillMode: "both" }}
            >
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Bottom branding */}
          <div
            className={`absolute bottom-10 text-xs text-muted-foreground/40 font-mono ${
              isOpen ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "400ms", animationFillMode: "both" }}
          >
            ~/diini-kahiye
          </div>
        </div>
      </div>
    </>
  );
}