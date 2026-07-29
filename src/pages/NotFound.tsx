import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, FolderGit2, PenLine } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { Seo } from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background bg-grid flex items-center justify-center px-6">
      <Seo
        title="404 — Page not found | Diini Kahiye"
        description="This route does not exist on Diini Kahiye's portfolio. Head back to the homepage, projects, or writing."
      />

      <div className="w-full max-w-xl animate-fade-in">
        <div className="terminal-card border border-border/60">
          <div className="terminal-header">
            <span className="terminal-dot terminal-dot-orange" />
            <span className="terminal-dot terminal-dot-blue" />
            <span className="terminal-dot terminal-dot-purple" />
            <span className="ml-2 text-xs font-mono text-muted-foreground">
              zsh — error / 404
            </span>
          </div>

          <div className="p-6 font-mono text-sm">
            <div className="flex items-center gap-4 mb-6">
              <LogoMark className="w-12 h-12 shrink-0" />
              <div>
                <div className="text-2xl font-bold text-foreground">404</div>
                <div className="text-xs text-muted-foreground">route not found</div>
              </div>
            </div>

            <p className="text-muted-foreground">
              <span className="text-primary">$</span> cd{" "}
              <span className="text-foreground break-all">{location.pathname}</span>
            </p>
            <p className="text-destructive mt-1">
              cd: no such file or directory
            </p>
            <p className="text-muted-foreground mt-4">
              <span className="text-primary">$</span> ls ~/available-routes
            </p>

            <div className="mt-4 grid sm:grid-cols-3 gap-2">
              {[
                { to: "/", label: "home", Icon: Home },
                { to: "/projects", label: "projects", Icon: FolderGit2 },
                { to: "/blog", label: "writing", Icon: PenLine },
              ].map(({ to, label, Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/30 text-xs text-primary hover:bg-primary/10 hover:border-primary/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              ))}
            </div>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
