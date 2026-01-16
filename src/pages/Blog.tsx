import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";

// Import blog images
import worldHappinessImg from "@/assets/blog/world-happiness-report.png";
import techTrends2025Img from "@/assets/blog/tech-trends-2025.png";
import aiVsMlImg from "@/assets/blog/ai-vs-ml.png";
import dataCareerTipsImg from "@/assets/blog/data-career-tips.png";
import sqlJoinsImg from "@/assets/blog/sql-joins.png";
import pythonConceptsImg from "@/assets/blog/python-concepts.png";
import numpyPandasImg from "@/assets/blog/numpy-pandas.png";

const categories = ["all", "data-analysis", "tech", "career", "tutorials"];

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  linkedinUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "world-happiness-report",
    title: "World Happiness Report Analysis (2008-2021)",
    excerpt: "People's well-being changed over time, as shown by the World Happiness Data. The world's happiness level increased by almost 8% in the past ten years despite global issues like COVID-19, demonstrating how resilient people are.",
    category: "data-analysis",
    date: "2025-01-03",
    readTime: "5 min read",
    tags: ["data-analysis", "visualization", "plotly"],
    image: worldHappinessImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_world-happiness-report-2024-activity-7387382352618049537-nLEe?utm_source=share&utm_medium=member_desktop",
  },
  {
    slug: "tech-trends-2025",
    title: "Top 5 Emerging Tech Trends of 2025",
    excerpt: "The future is developing more quickly than before. These ground-breaking technologies, from synthetic media to agentic AI, are fundamentally altering entire industries and daily life.",
    category: "tech",
    date: "2024-12-15",
    readTime: "4 min read",
    tags: ["ai", "technology", "trends"],
    image: techTrends2025Img,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_top-5-emerging-tech-trends-of-2025-activity-7335583585871040514-HiK_?utm_source=share&utm_medium=member_desktop",
  },
  {
    slug: "ai-vs-ml",
    title: "AI vs ML – Quick Examples to Understand the Difference",
    excerpt: "Still confused between Artificial Intelligence and Machine Learning? Swipe through this quick carousel to see the difference with simple examples that make it click.",
    category: "tech",
    date: "2024-12-10",
    readTime: "3 min read",
    tags: ["ai", "machine-learning", "beginners"],
    image: aiVsMlImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_whats-the-difference-between-ai-and-ml-activity-7332661785382072320-o10x?utm_source=share&utm_medium=member_desktop",
  },
  {
    slug: "data-career-tips",
    title: "7 Underappreciated Data Career Tips",
    excerpt: "These aren't just inspirational quotes—they're practical lessons drawn from years of real-world experience, expert advice, and insights from 'Build a Career in Data Science'.",
    category: "career",
    date: "2024-11-28",
    readTime: "5 min read",
    tags: ["career", "data-science", "tips"],
    image: dataCareerTipsImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_7-data-career-tips-nobody-talks-about-activity-7325470658199543810-kRcC?utm_source=share&utm_medium=member_desktop",
  },
  {
    slug: "sql-joins",
    title: "7 Things I Wish I Knew About SQL JOINs",
    excerpt: "If you're starting with SQL, JOINs can be confusing—and that's perfectly normal. Here's what I wish I knew when I was just getting started with relational thinking.",
    category: "tutorials",
    date: "2024-11-15",
    readTime: "4 min read",
    tags: ["sql", "database", "beginners"],
    image: sqlJoinsImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_7-things-i-wish-i-knew-about-sql-joins-activity-7319615813366263809-VN07?utm_source=share&utm_medium=member_desktop",
  },
  {
    slug: "python-concepts",
    title: "Top Python Concepts Every Data Analyst Must Know",
    excerpt: "A quick-read guide breaking down core Python essentials every Data Analyst should know — variables, data types, data structures, must-know libraries, and essential tools.",
    category: "tutorials",
    date: "2025-04-07",
    readTime: "4 min read",
    tags: ["python", "data-analysis", "pandas", "beginners"],
    image: pythonConceptsImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_python-activity-7315032501385646080-rdoT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEj1U5kBQ4zXy_c1Xtz-dbbcnzmEHnnDPzE",
  },
  {
    slug: "numpy-pandas",
    title: "Understand NumPy & Pandas in Just 10 Slides",
    excerpt: "Master NumPy and Pandas — two powerful Python libraries. Learn to create arrays, DataFrames, clean, filter, and manipulate data with beginner-friendly explanations.",
    category: "tutorials",
    date: "2025-04-20",
    readTime: "5 min read",
    tags: ["python", "numpy", "pandas", "data-analysis"],
    image: numpyPandasImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_numby-pandas-activity-7316773479767306240-sn89?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEj1U5kBQ4zXy_c1Xtz-dbbcnzmEHnnDPzE",
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

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
          <h1 className="text-3xl font-bold text-primary mb-3">Blog</h1>
          <p className="text-muted-foreground">
            Insights, tutorials, and carousel posts from my LinkedIn on data science, AI, and career growth.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm rounded-lg transition-all capitalize font-medium ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {category.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link to={`/blog/${featuredPost.slug}`} className="block mb-12 group">
            <div className="terminal-card overflow-hidden hover:ring-2 hover:ring-primary/30 transition-all duration-300 cursor-pointer">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Featured
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                    <span className="px-2 py-0.5 bg-secondary rounded capitalize">
                      {featuredPost.category.replace("-", " ")}
                    </span>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-secondary/70 text-muted-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg group-hover:bg-primary/90 transition-colors">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(featuredPost.linkedinUrl, '_blank');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white text-sm font-medium rounded-lg hover:bg-[#0A66C2]/90 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      View on LinkedIn
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
        {otherPosts.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {otherPosts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block group"
              >
                <div
                  className="terminal-card overflow-hidden hover:ring-2 hover:ring-primary/30 transition-all duration-300 animate-fade-in cursor-pointer h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
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
                    
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-secondary/50 text-muted-foreground rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-secondary text-foreground text-sm font-medium rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Read Article
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(post.linkedinUrl, '_blank');
                        }}
                        className="inline-flex items-center justify-center w-10 h-10 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 transition-colors cursor-pointer"
                        title="View on LinkedIn"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
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
