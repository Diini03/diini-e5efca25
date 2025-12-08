import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { ThemeToggle } from "./ThemeToggle";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="data-grid-bg fixed inset-0 pointer-events-none opacity-50" />
      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Navigation />
            <ThemeToggle />
          </div>
        </header>
        <main className="pt-16">
          <Outlet />
        </main>
        <footer className="border-t border-border py-8 mt-20">
          <div className="max-w-6xl mx-auto px-6 text-center text-muted-foreground text-sm font-mono">
            <p>© {new Date().getFullYear()} Diini Kahiye. Built with passion for data.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
