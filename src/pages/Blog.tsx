import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Calendar, Clock, ArrowRight } from "lucide-react";

// Import blog images
import techTrends2025Img from "@/assets/blog/tech-trends-2025.png";
import aiVsMlImg from "@/assets/blog/ai-vs-ml.png";
import dataCareerTipsImg from "@/assets/blog/data-career-tips.png";
import sqlJoinsImg from "@/assets/blog/sql-joins.png";
import datasetUsefulImg from "@/assets/blog/what-makes-dataset-useful.png";
import mlMistakesImg from "@/assets/blog/ml-learn-from-mistakes.png";
import mlPredictionsImg from "@/assets/blog/ml-make-predictions.png";

const categories = ["all", "data-analysis", "machine-learning", "tech", "career", "tutorials"];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  linkedinUrl: string;
  featuredOnHome?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-makes-dataset-useful",
    title: "What Makes a Dataset Actually Useful?",
    excerpt:
      "A dataset can look complete and still be useless. Rows fill the screen, columns line up neatly, and then you start asking real questions — and the cracks show. Missing values, cryptic labels, fields that have nothing to do with what you're trying to answer. The lesson: existence isn't usefulness. A dataset earns its keep only when it's clear, relevant, and trustworthy enough to answer a real question. Good analysis doesn't start with tools — it starts with good information.",
    category: "data-analysis",
    date: "2026-05-12",
    readTime: "4 min read",
    tags: ["data-analysis", "data-quality", "fundamentals"],
    image: datasetUsefulImg,
    linkedinUrl: "https://www.linkedin.com/in/diinikahiye/",
    featuredOnHome: true,
  },
  {
    slug: "ml-learn-from-mistakes",
    title: "How Machine Learning Models Learn From Mistakes",
    excerpt:
      "Machine learning models learn the way humans do — by being wrong first. Early predictions are weak. Then feedback arrives, errors get measured, and the model adjusts. Over many iterations, patterns sharpen, errors shrink, and the system becomes something you can actually trust in a decision. This is the quiet loop behind every accurate model: predict, fail, correct, repeat. Understanding it is the difference between treating ML as magic and treating it as a craft.",
    category: "machine-learning",
    date: "2026-04-28",
    readTime: "5 min read",
    tags: ["machine-learning", "model-training", "fundamentals"],
    image: mlMistakesImg,
    linkedinUrl: "https://www.linkedin.com/in/diinikahiye/",
    featuredOnHome: true,
  },
  {
    slug: "ml-make-predictions",
    title: "How Machine Learning Models Make Predictions",
    excerpt:
      "Why should anyone trust a number a model spits out? Because it isn't a guess. Behind every prediction is a methodical process — the model reads the input, compares it to patterns it learned during training, weighs the evidence, attaches a confidence score, and only then commits to an answer. Businesses now make real decisions on top of those numbers, which is exactly why understanding how the prediction was produced matters as much as the prediction itself.",
    category: "machine-learning",
    date: "2026-04-10",
    readTime: "5 min read",
    tags: ["machine-learning", "predictions", "explainability"],
    image: mlPredictionsImg,
    linkedinUrl: "https://www.linkedin.com/in/diinikahiye/",
    featuredOnHome: true,
  },
  {
    slug: "tech-trends-2025",
    title: "Top 5 Emerging Tech Trends of 2025",
    excerpt:
      "The future is arriving faster than the headlines. From agentic AI that plans and executes on its own, to synthetic media that's indistinguishable from real footage, these five shifts aren't buzzwords — they're quietly reshaping how entire industries operate and how the rest of us spend our days.",
    category: "tech",
    date: "2025-02-15",
    readTime: "4 min read",
    tags: ["ai", "technology", "trends"],
    image: techTrends2025Img,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_top-5-emerging-tech-trends-of-2025-activity-7335583585871040514-HiK_?utm_source=share&utm_medium=member_desktop",
    featuredOnHome: true,
  },
  {
    slug: "ai-vs-ml",
    title: "AI vs ML — Quick Examples to Understand the Difference",
    excerpt:
      "Still mixing up AI and ML? You're not alone. AI is the big idea — machines doing things that look smart. ML is one specific way to get there: letting the machine learn the pattern instead of hand-coding the rules. A few simple examples make the difference click for good.",
    category: "tech",
    date: "2025-02-10",
    readTime: "3 min read",
    tags: ["ai", "machine-learning", "beginners"],
    image: aiVsMlImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_whats-the-difference-between-ai-and-ml-activity-7332661785382072320-o10x?utm_source=share&utm_medium=member_desktop",
    featuredOnHome: true,
  },
  {
    slug: "data-career-tips",
    title: "7 Underappreciated Data Career Tips",
    excerpt:
      "These aren't motivational quotes. They're the lessons that don't make it into bootcamp curricula — drawn from real work, mentor conversations, and the parts of 'Build a Career in Data Science' that actually stuck. Technical skill opens the door. Storytelling, business sense, and domain knowledge keep you in the room.",
    category: "career",
    date: "2025-03-28",
    readTime: "5 min read",
    tags: ["career", "data-science", "tips"],
    image: dataCareerTipsImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_7-data-career-tips-nobody-talks-about-activity-7325470658199543810-kRcC?utm_source=share&utm_medium=member_desktop",
  },
  {
    slug: "sql-joins",
    title: "7 Things I Wish I Knew About SQL JOINs",
    excerpt:
      "If JOINs confuse you, that's normal — they confused me too. Looking back, a handful of simple ideas would have shortened the learning curve dramatically: stop using SELECT *, picture the JOIN types visually, think in relationships before syntax, and respect what NULLs do to your results.",
    category: "tutorials",
    date: "2025-03-15",
    readTime: "4 min read",
    tags: ["sql", "database", "beginners"],
    image: sqlJoinsImg,
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
            Notes, carousels, and short essays on data, machine learning, and the
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

        {/* 3-column compact grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <article className="h-full flex flex-col rounded-xl border border-border/60 bg-secondary/20 overflow-hidden hover:border-primary/40 hover:bg-secondary/30 transition-all duration-300 hover:-translate-y-0.5">
                    {/* Small header image */}
                    <div className="relative aspect-[16/8] overflow-hidden bg-secondary/40">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase rounded-full bg-background/80 backdrop-blur text-foreground/90 border border-border/60">
                        {post.category.replace("-", " ")}
                      </span>
                    </div>

                    {/* Text-focused body */}
                    <div className="flex-1 flex flex-col p-4">
                      <div className="flex items-center gap-3 mb-2 text-[11px] text-muted-foreground tabular-nums">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {dateLabel}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-[15px] font-semibold leading-snug text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-[13px] leading-relaxed text-muted-foreground mb-4 line-clamp-5 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono text-muted-foreground/80"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                          Read
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
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
