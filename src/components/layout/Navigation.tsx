import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Lab", path: "/lab" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo - ~/| with blinking cursor */}
          <Link to="/" className="text-lg font-mono text-foreground flex items-center">
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
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
                activeClassName="text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
