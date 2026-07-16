import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Calendar, Clock, ArrowRight, Linkedin } from "lucide-react";

import imgAiVsMl from "@/assets/blog/ai-vs-ml.png";
import imgDataCareer from "@/assets/blog/data-career-tips.png";
import imgMlLearn from "@/assets/blog/ml-learn-from-mistakes.png";
import imgMlPredict from "@/assets/blog/ml-make-predictions.png";
import imgSqlJoins from "@/assets/blog/sql-joins.png";
import imgTechTrends from "@/assets/blog/tech-trends-2025.png";
import imgDataset from "@/assets/blog/what-makes-dataset-useful.png";

const blogImages: Record<string, string> = {
  "ai-vs-ml": imgAiVsMl,
  "data-career-tips": imgDataCareer,
  "ml-learn-from-mistakes": imgMlLearn,
  "ml-make-predictions": imgMlPredict,
  "sql-joins": imgSqlJoins,
  "tech-trends-2025": imgTechTrends,
  "what-makes-dataset-useful": imgDataset,
};

const categories = ["all", "data-analysis", "machine-learning", "tech", "career", "tutorials"];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  linkedinUrl: string;
  featuredOnHome?: boolean;
  source?: "linkedin" | "medium";
  externalUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-data-somalia-never-used",
    title: "Why Most Data in Somalia Never Gets Used",
    excerpt:
      "Every year, organizations arrive in Somalia with projects. Surveys, field assessments, household interviews. The report goes to the funder. The funder releases the next budget. The cycle repeats. If you go to the Humanitarian Data Exchange right now, you'll find 488 datasets for Somalia from 75 organizations — but who's actually using them to make decisions?",
    category: "data-analysis",
    date: "2026-06-20",
    readTime: "6 min read",
    tags: ["data", "somalia", "humanitarian"],
    linkedinUrl: "https://medium.com/@diiniyare74/why-most-data-in-somalia-never-gets-used-c88889eb3f22",
    source: "medium",
    externalUrl: "https://medium.com/@diiniyare74/why-most-data-in-somalia-never-gets-used-c88889eb3f22?sharedUserId=diiniyare74",
    featuredOnHome: true,
  },
  {
    slug: "correlation-vs-causation",
    title: "Correlation vs Causation — The mistake every beginner makes reading data",
    excerpt:
      "Correlation means two things move together. Causation means one is making the other happen. One line of Python finds correlation in seconds — understanding whether it actually means anything takes much longer.",
    category: "data-analysis",
    date: "2026-06-10",
    readTime: "5 min read",
    tags: ["data-analysis", "statistics", "fundamentals"],
    linkedinUrl: "https://medium.com/@diiniyare74/correlation-vs-causation-the-mistake-every-beginner-makes-reading-data-efe8cc6e1fd4",
    source: "medium",
    externalUrl: "https://medium.com/@diiniyare74/correlation-vs-causation-the-mistake-every-beginner-makes-reading-data-efe8cc6e1fd4?sharedUserId=diiniyare74",
    featuredOnHome: true,
  },
  {
    slug: "what-is-a-model",
    title: "What is a model — and why two AIs can give you completely different answers?",
    excerpt:
      "Ask ChatGPT and Claude the same question and the answers can be completely different. Neither is broken — the reason comes down to one word most people have heard but never fully understood: Model.",
    category: "machine-learning",
    date: "2026-05-30",
    readTime: "6 min read",
    tags: ["ai", "machine-learning", "fundamentals"],
    linkedinUrl: "https://medium.com/@diiniyare74/what-is-a-model-and-why-two-ais-can-give-you-completely-different-answers-2edc1ba3c669",
    source: "medium",
    externalUrl: "https://medium.com/@diiniyare74/what-is-a-model-and-why-two-ais-can-give-you-completely-different-answers-2edc1ba3c669?sharedUserId=diiniyare74",
    featuredOnHome: true,
  },
  {
    slug: "what-makes-dataset-useful",
    title: "What Makes a Dataset Actually Useful?",
    excerpt:
      "A dataset can look complete and still be useless. Rows fill the screen, columns line up neatly, and then you start asking real questions — and the cracks show. Missing values, cryptic labels, fields that have nothing to do with what you're trying to answer.",
    category: "data-analysis",
    date: "2026-05-12",
    readTime: "4 min read",
    tags: ["data-analysis", "data-quality", "fundamentals"],
    linkedinUrl: "https://www.linkedin.com/in/diinikahiye/",
    source: "linkedin",
  },
  {
    slug: "ml-learn-from-mistakes",
    title: "How Machine Learning Models Learn From Mistakes",
    excerpt:
      "Machine learning models learn the way humans do — by being wrong first. Early predictions are weak. Then feedback arrives, errors get measured, and the model adjusts. Over many iterations, patterns sharpen and errors shrink.",
    category: "machine-learning",
    date: "2026-04-28",
    readTime: "5 min read",
    tags: ["machine-learning", "model-training", "fundamentals"],
    linkedinUrl: "https://www.linkedin.com/in/diinikahiye/",
    source: "linkedin",
  },
  {
    slug: "ml-make-predictions",
    title: "How Machine Learning Models Make Predictions",
    excerpt:
      "Why should anyone trust a number a model spits out? Because it isn't a guess. Behind every prediction is a methodical process — the model reads the input, compares it to patterns it learned, weighs the evidence, and attaches a confidence score.",
    category: "machine-learning",
    date: "2026-04-10",
    readTime: "5 min read",
    tags: ["machine-learning", "predictions", "explainability"],
    linkedinUrl: "https://www.linkedin.com/in/diinikahiye/",
    source: "linkedin",
  },
  {
    slug: "tech-trends-2025",
    title: "Top 5 Emerging Tech Trends of 2025",
    excerpt:
      "The future is arriving faster than the headlines. From agentic AI that plans and executes on its own, to synthetic media that's indistinguishable from real footage, these five shifts aren't buzzwords — they're quietly reshaping how entire industries operate.",
    category: "tech",
    date: "2025-02-15",
    readTime: "4 min read",
    tags: ["ai", "technology", "trends"],
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_top-5-emerging-tech-trends-of-2025-activity-7335583585871040514-HiK_?utm_source=share&utm_medium=member_desktop",
    source: "linkedin",
    featuredOnHome: true,
  },
  {
    slug: "ai-vs-ml",
    title: "AI vs ML — Quick Examples to Understand the Difference",
    excerpt:
      "Still mixing up AI and ML? You're not alone. AI is the big idea — machines doing things that look smart. ML is one specific way to get there: letting the machine learn the pattern instead of hand-coding the rules.",
    category: "tech",
    date: "2025-02-10",
    readTime: "3 min read",
    tags: ["ai", "machine-learning", "beginners"],
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_whats-the-difference-between-ai-and-ml-activity-7332661785382072320-o10x?utm_source=share&utm_medium=member_desktop",
    source: "linkedin",
    featuredOnHome: true,
  },
  {
    slug: "data-career-tips",
    title: "7 Underappreciated Data Career Tips",
    excerpt:
      "These aren't motivational quotes. They're the lessons that don't make it into bootcamp curricula — drawn from real work, mentor conversations, and the parts of 'Build a Career in Data Science' that actually stuck.",
    category: "career",
    date: "2025-03-28",
    readTime: "5 min read",
    tags: ["career", "data-science", "tips"],
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_7-data-career-tips-nobody-talks-about-activity-7325470658199543810-kRcC?utm_source=share&utm_medium=member_desktop",
  },
  {
    slug: "sql-joins",
    title: "7 Things I Wish I Knew About SQL JOINs",
    excerpt:
      "If JOINs confuse you, that's normal — they confused me too. A handful of simple ideas would have shortened the learning curve: stop using SELECT *, picture the JOIN types visually, think in relationships before syntax.",
    category: "tutorials",
    date: "2025-03-15",
    readTime: "4 min read",
    tags: ["sql", "database", "beginners"],
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_7-things-i-wish-i-knew-about-sql-joins-activity-7319615813366263809-VN07?utm_source=share&utm_medium=member_desktop",
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen animate-fade-in overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 py-12 overflow-hidden">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-baseline gap-3 mb-3">
            <h1 className="text-3xl font-bold text-primary">Writing</h1>
            <span className="text-xs font-mono text-muted-foreground/70">
              {blogPosts.length} posts
            </span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Notes, essays, and short reads on data, machine learning, and the
            craft of turning information into decisions.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts, topics, tags…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary/40 border border-border/60 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => {
            const count =
              category === "all"
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === category).length;
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition-all capitalize font-medium ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/60 bg-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {category.replace("-", " ")}
                <span
                  className={`text-[10px] font-mono ${
                    isActive ? "text-primary/70" : "text-muted-foreground/60"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Text-only card grid (matches Projects style) */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map((post, index) => {
              const dateLabel = new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              return (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group block animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <article className="h-full flex flex-col rounded-lg border border-border/60 bg-card/50 hover:bg-card hover:border-primary/40 transition-all p-4">
                    <div className="flex items-center gap-2 mb-3 text-[10px] tracking-[0.15em] uppercase text-muted-foreground/70">
                      <span>{post.category.replace("-", " ")}</span>
                      <span className="opacity-50">·</span>
                      <span className="inline-flex items-center gap-1 normal-case tracking-normal">
                        <Calendar className="w-3 h-3" />
                        {dateLabel}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-semibold leading-snug text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-[13px] leading-relaxed text-muted-foreground mb-4 line-clamp-4 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                        Read
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No posts found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 text-primary hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
