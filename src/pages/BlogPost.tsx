import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag, ExternalLink, Lightbulb, BookOpen } from "lucide-react";

// Import blog images
import techTrends2025Img from "@/assets/blog/tech-trends-2025.png";
import aiVsMlImg from "@/assets/blog/ai-vs-ml.png";
import dataCareerTipsImg from "@/assets/blog/data-career-tips.png";
import sqlJoinsImg from "@/assets/blog/sql-joins.png";
import datasetUsefulImg from "@/assets/blog/what-makes-dataset-useful.png";
import mlMistakesImg from "@/assets/blog/ml-learn-from-mistakes.png";
import mlPredictionsImg from "@/assets/blog/ml-make-predictions.png";

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
  "what-makes-dataset-useful": {
    title: "What Makes a Dataset Actually Useful?",
    date: "2026-05-12",
    readTime: "4 min read",
    category: "data-analysis",
    tags: ["data-analysis", "data-quality", "fundamentals"],
    image: datasetUsefulImg,
    linkedinUrl: "https://www.linkedin.com/in/diinikahiye/",
    content: `At first, every dataset looks promising. Thousands of rows. Dozens of columns. The file opens cleanly. You think the hard part is over.

Then you try to actually use it.

Some values are missing in places they shouldn't be. Some columns are named in ways nobody outside the original team would understand. Some fields have nothing to do with the question you're trying to answer. You spend more time wrestling with the data than learning from it — and somewhere in that wrestle, a quiet lesson lands.

Just because a dataset exists doesn't mean it's useful.

A useful dataset is clear — its structure, its units, its labels make sense without a Slack message to the person who built it. A useful dataset is relevant — it actually contains the signal your question needs, not just data that's adjacent to it. And a useful dataset is trustworthy — you know where it came from, when it was last updated, and how it was collected.

Tools come later. SQL, Pandas, Power BI — none of them save you if the input is wrong. Good analysis doesn't start with the tool. It starts with good information, and the discipline to walk away from data that can't answer the question you're really asking.`,
    highlights: [
      "Existence is not usefulness — a dataset must earn its keep",
      "Useful data is clear: structure, units, and labels stand on their own",
      "Useful data is relevant: it answers the actual question, not an adjacent one",
      "Useful data is trustworthy: source, timing, and collection method are known",
      "Tools amplify good data — they cannot rescue bad data",
    ],
  },
  "ml-learn-from-mistakes": {
    title: "How Machine Learning Models Learn From Mistakes",
    date: "2026-04-28",
    readTime: "5 min read",
    category: "machine-learning",
    tags: ["machine-learning", "model-training", "fundamentals"],
    image: mlMistakesImg,
    linkedinUrl: "https://www.linkedin.com/in/diinikahiye/",
    content: `Machine learning models learn the way people do — by being wrong first.

Early in training, predictions are weak. The model has seen the world for a few thousand examples and its understanding of the patterns is closer to a guess than a judgment. So it predicts, it misses, and then the interesting part begins.

Feedback arrives in the form of a loss — a number that says how wrong the prediction was. The model uses that number to nudge its internal weights, slightly, in a direction that would have produced a better answer. One example wouldn't change much. But this loop runs millions of times, across millions of examples, and the small nudges compound.

Over time, errors decline. Patterns that were noise become signals. The model starts to generalize — handling examples it has never seen with judgments that hold up. What started as a guessing machine becomes a system you can place in front of real decisions.

This is the quiet engine behind every model you trust: predict, fail, measure the failure, correct, repeat. Understanding it changes how you think about machine learning. It stops being magic. It becomes a craft — one where the quality of the feedback loop matters as much as the cleverness of the algorithm.`,
    highlights: [
      "Models start weak — early predictions are closer to guesses",
      "Loss measures how wrong a prediction was, in a single number",
      "Small weight updates compound across millions of iterations",
      "Generalization is the goal: handling examples never seen before",
      "Better feedback loops produce better models, not fancier algorithms",
    ],
  },
  "ml-make-predictions": {
    title: "How Machine Learning Models Make Predictions",
    date: "2026-04-10",
    readTime: "5 min read",
    category: "machine-learning",
    tags: ["machine-learning", "predictions", "explainability"],
    image: mlPredictionsImg,
    linkedinUrl: "https://www.linkedin.com/in/diinikahiye/",
    content: `Why should anyone trust a number a machine learning model produces?

It's a fair question — especially now, when those numbers are quietly driving real decisions inside companies. Who gets the loan. Which email is spam. Which customer is about to churn. If the only thing you can see is the output, the whole thing can feel like a black box.

But predictions aren't guesses. There's a process underneath, and it's more methodical than most people assume.

When you pass an input to a trained model, the model first translates that input into features — numerical representations it can actually reason about. It then compares those features to patterns it learned during training, weighing some signals more heavily than others based on what it has seen work. The output isn't a single answer pulled out of thin air; it's the most likely answer given the evidence, often paired with a confidence score that tells you how sure the model is.

That confidence matters. A prediction at 0.95 confidence and a prediction at 0.52 confidence look identical on the surface, but they should be treated very differently downstream.

Understanding how the prediction was produced is what separates teams that use ML well from teams that just deploy it. The number is the easy part. The reasoning that led to it is where the trust actually lives.`,
    highlights: [
      "Inputs are converted into features the model can reason about",
      "The model weighs evidence against patterns learned during training",
      "Output is the most likely answer given the evidence, not a guess",
      "Confidence scores reveal how sure the model is — treat them seriously",
      "Trust comes from understanding the process, not just the prediction",
    ],
  },
  "tech-trends-2025": {
    title: "Top 5 Emerging Tech Trends of 2025",
    date: "2025-02-15",
    readTime: "4 min read",
    category: "tech",
    tags: ["ai", "technology", "trends", "2025"],
    image: techTrends2025Img,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_top-5-emerging-tech-trends-of-2025-activity-7335583585871040514-HiK_?utm_source=share&utm_medium=member_desktop",
    content: `The future is developing more quickly than before. These ground-breaking technologies — from synthetic media to agentic AI — aren't just catchphrases. They're fundamentally altering entire industries and daily life.

Agentic AI represents a shift from reactive to proactive AI systems. Unlike traditional AI that responds to prompts, agentic AI can autonomously plan, execute, and adapt to achieve goals — think AI assistants that can actually complete complex tasks without constant human guidance.

Synthetic Media is revolutionizing content creation. AI-generated images, videos, and audio are becoming indistinguishable from human-created content. While this brings incredible creative possibilities, it also requires new approaches to authenticity and trust.

Edge Computing moves processing closer to where data is generated, reducing latency and bandwidth needs. This is essential for IoT devices, autonomous vehicles, and real-time applications where milliseconds matter.`,
    highlights: [
      "Agentic AI — autonomous systems that plan and execute tasks",
      "Synthetic Media — AI-generated content indistinguishable from real",
      "Edge Computing — processing data closer to the source",
      "Quantum Computing advances — breaking new computational barriers",
      "Extended Reality (XR) — merging physical and digital worlds",
    ],
  },
  "ai-vs-ml": {
    title: "AI vs ML — Quick Examples to Understand the Difference",
    date: "2025-02-10",
    readTime: "3 min read",
    category: "tech",
    tags: ["ai", "machine-learning", "beginners"],
    image: aiVsMlImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_whats-the-difference-between-ai-and-ml-activity-7332661785382072320-o10x?utm_source=share&utm_medium=member_desktop",
    content: `Still confused between Artificial Intelligence and Machine Learning? You're not alone.

AI is the big idea. ML is how it learns from data. Let's break it down.

Artificial Intelligence (AI) is the broader concept of machines being able to carry out tasks in a way that we would consider "smart." It encompasses everything from rule-based systems to advanced neural networks.

Machine Learning (ML) is a specific subset of AI that focuses on the ability of machines to receive data and learn for themselves without being explicitly programmed for every scenario.

A practical example: a chess program using pre-programmed rules is AI but not ML. A chess program that improves by playing millions of games and learning from them is ML.

Another one: spam filters that block emails with certain words are AI. Spam filters that learn from your behavior and improve over time are ML.

Understanding this distinction matters because it shapes how you approach problems and choose solutions.`,
    highlights: [
      "AI is the broader concept of machines performing 'smart' tasks",
      "ML is a subset of AI where machines learn from data",
      "Deep Learning is a subset of ML using neural networks",
      "Every ML system is AI, but not every AI system uses ML",
      "Rule-based systems are AI but not ML",
      "ML requires training data to improve",
    ],
  },
  "data-career-tips": {
    title: "7 Underappreciated Data Career Tips",
    date: "2025-03-28",
    readTime: "5 min read",
    category: "career",
    tags: ["career", "data-science", "tips"],
    image: dataCareerTipsImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_7-data-career-tips-nobody-talks-about-activity-7325470658199543810-kRcC?utm_source=share&utm_medium=member_desktop",
    content: `These aren't motivational quotes — they're practical lessons drawn from real-world experience, mentor advice, and one impactful read: Build a Career in Data Science by Emily Robinson & Jacqueline Nolis.

Technical skills get you in the door, but communication keeps you in the room. The best data scientists explain complex findings to non-technical stakeholders in ways that drive action.

Domain knowledge is your secret weapon. Understanding the business context often matters more than using the fanciest algorithm. A simple model that solves a real problem beats a complex one that doesn't ship.

Your first job doesn't define your career. Use it to learn, build skills, and discover what you actually enjoy. The data field is vast — analytics, engineering, ML, research, product — you might find your home in any of them.

Imposter syndrome is normal. Even senior data scientists feel it. Focus on learning rather than knowing everything, and remember that everyone started somewhere.`,
    highlights: [
      "Technical skills get you in the door — soft skills get you promoted",
      "Communicate insights to non-technical stakeholders",
      "Build a portfolio that shows impact, not just code",
      "Networking is underrated — join communities, attend events",
      "Business understanding matters as much as statistical knowledge",
      "Don't just clean data — tell its story",
      "Continuous learning is non-negotiable in this field",
    ],
    references: [
      {
        title: "Build a Career in Data Science by Emily Robinson & Jacqueline Nolis",
        url: "https://www.manning.com/books/build-a-career-in-data-science",
      },
    ],
  },
  "sql-joins": {
    title: "7 Things I Wish I Knew About SQL JOINs",
    date: "2025-03-15",
    readTime: "4 min read",
    category: "tutorials",
    tags: ["sql", "database", "beginners"],
    image: sqlJoinsImg,
    linkedinUrl: "https://www.linkedin.com/posts/diinikahiye_7-things-i-wish-i-knew-about-sql-joins-activity-7319615813366263809-VN07?utm_source=share&utm_medium=member_desktop",
    content: `"I thought I understood SQL… until I met JOINs." This used to be me.

If you're starting with SQL, JOINs can be confusing — and that's perfectly normal.

Stop using SELECT * — always specify the columns you need. It improves performance and makes your queries clearer.

Understand the JOIN types visually: INNER JOIN returns matching rows from both tables. LEFT JOIN returns all rows from the left table plus matches. RIGHT JOIN is the opposite. FULL JOIN returns everything.

Use meaningful table aliases — instead of cryptic single letters, use descriptive short names that make your query readable.

Think in relationships — before writing a JOIN, ask yourself: "How are these tables related?" Understanding the relationship makes the JOIN obvious.

Watch out for NULL values — JOINs on columns with NULLs can produce unexpected results. NULL never equals NULL in a JOIN condition.

Start simple, then optimize — get your query working first, then worry about performance.`,
    highlights: [
      "Avoid SELECT * — always specify the columns you need",
      "Understand INNER, LEFT, RIGHT, and FULL JOINs visually",
      "Always consider NULL values when joining tables",
      "Use aliases to make queries more readable",
      "Think about performance — JOINs can be expensive on large tables",
      "Practice with real datasets to build muscle memory",
      "Master ON vs WHERE clause placement for correct results",
    ],
  },
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
    <div className="min-h-screen animate-fade-in overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        {/* Meta header (text-first) */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
            <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full capitalize font-medium">
              {post.category.replace("-", " ")}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono bg-secondary/60 text-muted-foreground rounded"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Small contained image — text remains the focus */}
        <div className="mb-8 rounded-lg overflow-hidden border border-border/60 bg-secondary/30 max-w-sm">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-10">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="text-[15px] text-foreground/85 leading-[1.8] mb-5 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Highlights */}
        {post.highlights && post.highlights.length > 0 && (
          <div className="rounded-xl border border-border/60 bg-secondary/30 p-6 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-base font-semibold text-foreground">Key Takeaways</h2>
            </div>
            <ul className="space-y-3">
              {post.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* LinkedIn CTA */}
        <a
          href={post.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-5 py-3 mb-10 bg-[#0A66C2] text-white font-medium rounded-lg hover:bg-[#0A66C2]/90 transition-all hover:shadow-lg hover:shadow-[#0A66C2]/25"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          View Full Carousel on LinkedIn
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* References */}
        {post.references && post.references.length > 0 && (
          <div className="rounded-xl border border-border/60 bg-secondary/30 p-6 mb-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-foreground" />
              </div>
              <h2 className="text-base font-semibold text-foreground">References & Resources</h2>
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
