import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag, ExternalLink, Lightbulb, BookOpen } from "lucide-react";

// Import blog images
import worldHappinessImg from "@/assets/blog/world-happiness-report.png";
import techTrends2025Img from "@/assets/blog/tech-trends-2025.png";
import aiVsMlImg from "@/assets/blog/ai-vs-ml.png";
import dataCareerTipsImg from "@/assets/blog/data-career-tips.png";
import sqlJoinsImg from "@/assets/blog/sql-joins.png";

interface BlogPostData {
  title: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  linkedinUrl: string;
  content: string;
  highlights?: string[];
  references?: { title: string; url: string }[];
}

const blogPostsData: Record<string, BlogPostData> = {
  "world-happiness-report": {
    title: "World Happiness Report Analysis (2008-2021)",
    date: "2025-01-03",
    readTime: "5 min read",
    category: "data-analysis",
    tags: ["data-analysis", "visualization", "plotly", "kaggle"],
    image: worldHappinessImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_world-happiness-report-2024-activity-7387382352618049537-nLEe?utm_source=share&utm_medium=member_desktop",
    content: `People's well-being changed over time, as shown by the World Happiness Data (2008–2021).

The world's happiness level increased by almost 8% in the past ten years despite global issues like COVID-19, demonstrating how resilient people are.

This analysis explores the fascinating patterns in global happiness data, revealing how different factors contribute to well-being across nations.`,
    highlights: [
      "In connected societies, social support can increase happiness by up to 60%",
      "After a certain income level, joy plateaus, but wealth helps",
      "Freedom and corruption continue to determine who smiles the most and who struggles the most"
    ],
    references: [
      { title: "View full project on GitHub", url: "https://bit.ly/43j6pwG" },
      { title: "Data source: World Happiness Report (Kaggle)", url: "https://www.kaggle.com/datasets/unsdsn/world-happiness" }
    ]
  },
  "tech-trends-2025": {
    title: "Top 5 Emerging Tech Trends of 2025",
    date: "2024-12-15",
    readTime: "4 min read",
    category: "tech",
    tags: ["ai", "technology", "trends", "2025"],
    image: techTrends2025Img,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_top-5-emerging-tech-trends-of-2025-activity-7335583585871040514-HiK_?utm_source=share&utm_medium=member_desktop",
    content: `The future is developing more quickly than before. These ground-breaking technologies, which range from synthetic media to agentic artificial intelligence, are more than just catchphrases; they are fundamentally altering entire industries and daily life.

In this carousel, I've broken down what each technology means and why you should care about it in 2025 and beyond.`,
    highlights: [
      "Agentic AI - Autonomous systems that can plan and execute tasks",
      "Synthetic Media - AI-generated content becoming indistinguishable from real",
      "Edge Computing - Processing data closer to the source",
      "Quantum Computing advances - Breaking new computational barriers",
      "Extended Reality (XR) - Merging physical and digital worlds"
    ],
    references: [
      { title: "Forbes Tech Trends Report", url: "https://www.forbes.com" },
      { title: "Wikipedia: Emerging Technologies", url: "https://en.wikipedia.org" },
      { title: "Bismart Technology Blog", url: "https://www.bismart.com" }
    ]
  },
  "ai-vs-ml": {
    title: "AI vs ML – Quick Examples to Understand the Difference",
    date: "2024-12-10",
    readTime: "3 min read",
    category: "tech",
    tags: ["ai", "machine-learning", "beginners"],
    image: aiVsMlImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_whats-the-difference-between-ai-and-ml-activity-7332661785382072320-o10x?utm_source=share&utm_medium=member_desktop",
    content: `Still confused between Artificial Intelligence and Machine Learning? You're not alone.

Swipe through this quick carousel to see the difference with simple examples that make it click.

AI is the big idea. ML is how it learns from data. Let's break it down.`,
    highlights: [
      "AI is the broader concept of machines being able to carry out 'smart' tasks",
      "ML is a subset of AI where machines learn from data without explicit programming",
      "Deep Learning is a subset of ML using neural networks with many layers",
      "Every ML system is AI, but not every AI system uses ML"
    ]
  },
  "data-career-tips": {
    title: "7 Underappreciated Data Career Tips (No One Talks About)",
    date: "2024-11-28",
    readTime: "5 min read",
    category: "career",
    tags: ["career", "data-science", "tips"],
    image: dataCareerTipsImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_7-data-career-tips-nobody-talks-about-activity-7325470658199543810-kRcC?utm_source=share&utm_medium=member_desktop",
    content: `Swipe through this carousel to uncover hidden truths that can shape your data journey.

These aren't just inspirational quotes, they're practical lessons drawn from years of real-world experience, expert advice, and one impactful read:

📘 Build a Career in Data Science by Emily Robinson & Jacqueline Nolis.

I found these while exploring how real data professionals grow not just technically, but strategically. Python and SQL matter, but so do storytelling, soft skills, and business thinking.`,
    highlights: [
      "Technical skills get you in the door, soft skills get you promoted",
      "Learn to communicate insights to non-technical stakeholders",
      "Build a portfolio that shows impact, not just code",
      "Networking is underrated — join communities and attend events",
      "Business understanding is as important as statistical knowledge",
      "Don't just clean data — tell its story",
      "Continuous learning is non-negotiable in this field"
    ],
    references: [
      { title: "Build a Career in Data Science by Emily Robinson & Jacqueline Nolis", url: "https://www.manning.com/books/build-a-career-in-data-science" }
    ]
  },
  "sql-joins": {
    title: "7 Things I Wish I Knew About SQL JOINs",
    date: "2024-11-15",
    readTime: "4 min read",
    category: "tutorials",
    tags: ["sql", "database", "beginners"],
    image: sqlJoinsImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_7-things-i-wish-i-knew-about-sql-joins-activity-7319615813366263809-VN07?utm_source=share&utm_medium=member_desktop",
    content: `"I thought I understood SQL… until I met JOINs."

This used to be me.

If you're starting with SQL, JOINs can be confusing — and that's perfectly normal.

In this carousel, I broke down what I wish I knew about JOINs when I was just getting started. From avoiding SELECT * to real-world tips that actually helped me understand relational thinking — it's all there.`,
    highlights: [
      "Avoid SELECT * — always specify the columns you need",
      "Understand the difference between INNER, LEFT, RIGHT, and FULL JOINs",
      "Always consider NULL values when joining tables",
      "Use aliases to make your queries more readable",
      "Think about performance — JOINs can be expensive on large tables",
      "Practice with real datasets to build muscle memory",
      "Master ON vs WHERE clause placement for correct results"
    ]
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? blogPostsData[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-fade-in">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back Link - Floating */}
        <Link
          to="/blog"
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm text-sm text-foreground rounded-lg hover:bg-background transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-20 relative z-10">
        {/* Meta Card */}
        <div className="terminal-card p-6 md:p-8 mb-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full capitalize font-medium">
              {post.category.replace("-", " ")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-secondary text-foreground rounded-lg"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* LinkedIn CTA */}
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 bg-[#0A66C2] text-white font-medium rounded-lg hover:bg-[#0A66C2]/90 transition-all hover:shadow-lg hover:shadow-[#0A66C2]/25"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            View Full Carousel on LinkedIn
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Content */}
        <div className="terminal-card p-6 md:p-8 mb-8">
          <div className="prose prose-invert max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Highlights */}
        {post.highlights && post.highlights.length > 0 && (
          <div className="terminal-card p-6 md:p-8 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Key Takeaways</h2>
            </div>
            <ul className="space-y-3">
              {post.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* References */}
        {post.references && post.references.length > 0 && (
          <div className="terminal-card p-6 md:p-8 mb-12">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">References & Resources</h2>
            </div>
            <ul className="space-y-2">
              {post.references.map((ref, index) => (
                <li key={index}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back to Blog */}
        <div className="text-center pb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
}
