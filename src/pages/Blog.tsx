import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Calendar, Clock, ArrowRight } from "lucide-react";

const categories = ["all", "data-science", "tutorials", "career"];

const blogPosts = [
  {
    slug: "getting-started-with-python-data-analysis",
    title: "Getting Started with Python for Data Analysis",
    excerpt: "A comprehensive guide to setting up your Python environment and learning the fundamentals of data analysis with pandas and numpy.",
    category: "tutorials",
    date: "2024-12-01",
    readTime: "8 min read",
    tags: ["python", "pandas", "beginners"],
  },
  {
    slug: "power-bi-vs-tableau",
    title: "Power BI vs Tableau: Which Should You Learn?",
    excerpt: "An in-depth comparison of the two most popular business intelligence tools, helping you decide which one suits your career goals.",
    category: "career",
    date: "2024-11-15",
    readTime: "6 min read",
    tags: ["power-bi", "tableau", "career"],
  },
  {
    slug: "exploratory-data-analysis-best-practices",
    title: "EDA Best Practices: A Data Scientist's Checklist",
    excerpt: "Learn the essential steps and techniques for conducting thorough exploratory data analysis on any dataset.",
    category: "data-science",
    date: "2024-11-01",
    readTime: "10 min read",
    tags: ["eda", "data-science", "best-practices"],
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        {/* Title */}
        <h1 className="text-2xl font-bold text-primary mb-2">Blog</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Thoughts, tutorials, and insights on data science and development.
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors capitalize ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {category.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="terminal-card block hover:ring-1 hover:ring-primary/30 transition-all group"
            >
              <div className="p-5">
                <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span className="px-2 py-0.5 bg-secondary rounded capitalize">
                    {post.category.replace("-", " ")}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-secondary/50 text-muted-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No posts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}