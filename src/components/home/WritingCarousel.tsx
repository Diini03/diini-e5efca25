import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { blogPosts } from "@/pages/Blog";

const displayTitle = (t: string) => {
  const cut = t.split("—")[0].trim();
  return cut.replace(/[?:,-]+$/, "").trim();
};

const featured = blogPosts
  .filter((p) => p.featuredOnHome)
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 5);

export function WritingCarousel() {
  const [activeSlug, setActiveSlug] = useState(featured[0]?.slug ?? "");
  const active = featured.find((p) => p.slug === activeSlug) ?? featured[0];

  if (!active) return null;

  const dateLabel = new Date(active.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const platformLabel = active.source === "medium" ? "Medium" : "LinkedIn";
  const platformUrl = active.source === "medium" ? active.externalUrl ?? active.linkedinUrl : active.linkedinUrl;

  return (
    <section className="mb-20">
      <h2 className="text-base font-semibold mb-6 pb-2 border-b border-border/40">
        Writing
      </h2>

      {/* Mobile: horizontal chips */}
      <div className="md:hidden -mx-6 px-6 mb-5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 w-max">
          {featured.map((p) => {
            const isActive = p.slug === activeSlug;
            return (
              <button
                key={p.slug}
                onClick={() => setActiveSlug(p.slug)}
                className={`shrink-0 max-w-[220px] text-xs px-3 py-1.5 rounded-full border transition-colors truncate ${
                  isActive
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {displayTitle(p.title)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-8">
        {/* Desktop left rail */}
        <ul className="hidden md:flex flex-col border-l border-border/50">
          {featured.map((p) => {
            const isActive = p.slug === activeSlug;
            const d = new Date(p.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
            return (
              <li key={p.slug}>
                <button
                  onMouseEnter={() => setActiveSlug(p.slug)}
                  onClick={() => setActiveSlug(p.slug)}
                  className={`w-full text-left text-xs px-4 py-3 -ml-px border-l-2 transition-all ${
                    isActive
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <span className="block text-[13px] font-medium leading-snug line-clamp-2 mb-1">
                    {p.title}
                  </span>
                  <span className="block text-[10px] opacity-70 tabular-nums">
                    {d}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right pane */}
        <div key={active.slug} className="animate-fade-in min-h-[200px]">
          <div className="flex items-baseline justify-end gap-3 mb-2">
            <span className="text-xs text-muted-foreground tabular-nums">
              {dateLabel} · {active.readTime}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 leading-snug">
            {active.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {active.excerpt.length > 220
              ? active.excerpt.slice(0, 220).trimEnd() + "…"
              : active.excerpt}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Link
              to={`/blog/${active.slug}`}
              className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
            >
              Read the post
            </Link>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <a
              href={platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors font-medium"
            >
              {platformLabel}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-sm font-medium text-primary hover:bg-primary/10 hover:border-primary/60 transition-all"
        >
          View All Writing
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
