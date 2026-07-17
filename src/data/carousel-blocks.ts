import type { EditorialBlock } from "@/components/blog/EditorialArticle";

import imgAiVsMl from "@/assets/blog/ai-vs-ml.webp";
import imgDataCareer from "@/assets/blog/data-career-tips.webp";
import imgMlLearn from "@/assets/blog/ml-learn-from-mistakes.webp";
import imgMlPredict from "@/assets/blog/ml-make-predictions.webp";
import imgSqlJoins from "@/assets/blog/sql-joins.webp";
import imgTechTrends from "@/assets/blog/tech-trends-2025.webp";
import imgDataset from "@/assets/blog/what-makes-dataset-useful.webp";

/**
 * Per-post editorial layouts for LinkedIn carousel articles.
 * Each entry declares a hand-curated sequence of blocks so no two articles
 * feel identical (different image sides, quotes, stats, callouts, etc.).
 */
export const carouselBlocks: Record<string, EditorialBlock[]> = {
  "what-makes-dataset-useful": [
    {
      type: "lede",
      text: "At first, every dataset looks promising. Thousands of rows. Dozens of columns. The file opens cleanly. You think the hard part is over.",
    },
    {
      type: "figure",
      src: imgDataset,
      alt: "What makes a dataset useful",
      side: "left",
      caption: "From the LinkedIn carousel.",
      text: "Then you try to actually use it. Some values are missing in places they shouldn't be. Some columns are named in ways nobody outside the original team would understand. Some fields have nothing to do with the question you're trying to answer.",
    },
    {
      type: "pullquote",
      text: "Just because a dataset exists doesn't mean it's useful.",
    },
    {
      type: "paragraph",
      text: "A useful dataset is clear — its structure, units, and labels make sense without a Slack message to the person who built it. A useful dataset is relevant — it actually contains the signal your question needs, not just data that's adjacent to it. And a useful dataset is trustworthy — you know where it came from, when it was last updated, and how it was collected.",
    },
    {
      type: "callout",
      title: "Why this matters",
      body: "Tools come later. SQL, Pandas, Power BI — none of them save you if the input is wrong. Good analysis doesn't start with the tool. It starts with good information, and the discipline to walk away from data that can't answer the question you're really asking.",
    },
    {
      type: "takeaways",
      items: [
        "Existence is not usefulness — a dataset must earn its keep",
        "Useful data is clear: structure, units, and labels stand on their own",
        "Useful data is relevant: it answers the actual question, not an adjacent one",
        "Useful data is trustworthy: source, timing, and collection method are known",
        "Tools amplify good data — they cannot rescue bad data",
      ],
    },
  ],

  "ml-learn-from-mistakes": [
    {
      type: "lede",
      text: "Machine learning models learn the way people do — by being wrong first.",
    },
    {
      type: "paragraph",
      text: "Early in training, predictions are weak. The model has seen the world for a few thousand examples and its understanding of the patterns is closer to a guess than a judgment. So it predicts, it misses, and then the interesting part begins.",
    },
    {
      type: "figure",
      src: imgMlLearn,
      alt: "How models learn from mistakes",
      side: "right",
      caption: "The feedback loop, visualised.",
      text: "Feedback arrives in the form of a loss — a number that says how wrong the prediction was. The model uses that number to nudge its internal weights, slightly, in a direction that would have produced a better answer.",
    },
    {
      type: "stats",
      items: [
        { value: "1", label: "Weak first guess" },
        { value: "10⁶", label: "Iterations" },
        { value: "→ Signal", label: "Noise becomes" },
      ],
    },
    {
      type: "paragraph",
      text: "One example wouldn't change much. But this loop runs millions of times, across millions of examples, and the small nudges compound. Over time, errors decline. Patterns that were noise become signals. The model starts to generalize — handling examples it has never seen with judgments that hold up.",
    },
    {
      type: "pullquote",
      text: "Better feedback loops produce better models, not fancier algorithms.",
    },
    {
      type: "takeaways",
      items: [
        "Models start weak — early predictions are closer to guesses",
        "Loss measures how wrong a prediction was, in a single number",
        "Small weight updates compound across millions of iterations",
        "Generalization is the goal: handling examples never seen before",
        "Better feedback loops produce better models, not fancier algorithms",
      ],
    },
  ],

  "ml-make-predictions": [
    {
      type: "lede",
      text: "Why should anyone trust a number a machine learning model produces?",
    },
    {
      type: "figure",
      src: imgMlPredict,
      alt: "How models make predictions",
      side: "left",
      caption: "Inside the prediction pipeline.",
      text: "It's a fair question — especially now, when those numbers are quietly driving real decisions inside companies. Who gets the loan. Which email is spam. Which customer is about to churn. If the only thing you can see is the output, the whole thing can feel like a black box.",
    },
    {
      type: "heading",
      text: "The process underneath",
    },
    {
      type: "paragraph",
      text: "When you pass an input to a trained model, the model first translates that input into features — numerical representations it can actually reason about. It then compares those features to patterns it learned during training, weighing some signals more heavily than others based on what it has seen work.",
    },
    {
      type: "callout",
      title: "Confidence matters",
      body: "A prediction at 0.95 confidence and a prediction at 0.52 confidence look identical on the surface, but they should be treated very differently downstream.",
    },
    {
      type: "pullquote",
      text: "The number is the easy part. The reasoning that led to it is where the trust actually lives.",
    },
    {
      type: "takeaways",
      items: [
        "Inputs are converted into features the model can reason about",
        "The model weighs evidence against patterns learned during training",
        "Output is the most likely answer given the evidence, not a guess",
        "Confidence scores reveal how sure the model is — treat them seriously",
        "Trust comes from understanding the process, not just the prediction",
      ],
    },
  ],

  "tech-trends-2025": [
    {
      type: "lede",
      text: "The future is developing more quickly than before. These ground-breaking technologies — from synthetic media to agentic AI — aren't just catchphrases. They're fundamentally altering entire industries and daily life.",
    },
    {
      type: "figure",
      src: imgTechTrends,
      alt: "Top tech trends of 2025",
      side: "full",
      caption: "Five shifts shaping 2025.",
    },
    {
      type: "heading",
      text: "01 · Agentic AI",
    },
    {
      type: "paragraph",
      text: "Agentic AI represents a shift from reactive to proactive AI systems. Unlike traditional AI that responds to prompts, agentic AI can autonomously plan, execute, and adapt to achieve goals — think AI assistants that can actually complete complex tasks without constant human guidance.",
    },
    {
      type: "heading",
      text: "02 · Synthetic Media",
    },
    {
      type: "paragraph",
      text: "Synthetic media is revolutionizing content creation. AI-generated images, videos, and audio are becoming indistinguishable from human-created content. While this brings incredible creative possibilities, it also requires new approaches to authenticity and trust.",
    },
    {
      type: "pullquote",
      text: "Milliseconds matter — edge computing brings processing to where data is born.",
    },
    {
      type: "heading",
      text: "03 · Edge Computing",
    },
    {
      type: "paragraph",
      text: "Edge computing moves processing closer to where data is generated, reducing latency and bandwidth needs. This is essential for IoT devices, autonomous vehicles, and real-time applications where milliseconds matter.",
    },
    {
      type: "takeaways",
      title: "The 5 trends",
      items: [
        "Agentic AI — autonomous systems that plan and execute tasks",
        "Synthetic Media — AI-generated content indistinguishable from real",
        "Edge Computing — processing data closer to the source",
        "Quantum Computing advances — breaking new computational barriers",
        "Extended Reality (XR) — merging physical and digital worlds",
      ],
    },
  ],

  "ai-vs-ml": [
    {
      type: "lede",
      text: "Still confused between Artificial Intelligence and Machine Learning? You're not alone.",
    },
    {
      type: "paragraph",
      text: "AI is the big idea. ML is how it learns from data. Let's break it down.",
    },
    {
      type: "figure",
      src: imgAiVsMl,
      alt: "AI vs ML — the difference",
      side: "right",
      caption: "AI is the umbrella. ML lives inside it.",
      text: "Artificial Intelligence (AI) is the broader concept of machines being able to carry out tasks in a way that we would consider \"smart.\" It encompasses everything from rule-based systems to advanced neural networks.",
    },
    {
      type: "paragraph",
      text: "Machine Learning (ML) is a specific subset of AI that focuses on the ability of machines to receive data and learn for themselves without being explicitly programmed for every scenario.",
    },
    {
      type: "callout",
      title: "Practical example",
      body: "A chess program using pre-programmed rules is AI but not ML. A chess program that improves by playing millions of games and learning from them is ML.",
    },
    {
      type: "callout",
      title: "Another one",
      body: "Spam filters that block emails with certain words are AI. Spam filters that learn from your behavior and improve over time are ML.",
    },
    {
      type: "pullquote",
      text: "Every ML system is AI. Not every AI system uses ML.",
    },
    {
      type: "takeaways",
      items: [
        "AI is the broader concept of machines performing 'smart' tasks",
        "ML is a subset of AI where machines learn from data",
        "Deep Learning is a subset of ML using neural networks",
        "Rule-based systems are AI but not ML",
        "ML requires training data to improve",
      ],
    },
  ],

  "data-career-tips": [
    {
      type: "lede",
      text: "These aren't motivational quotes — they're practical lessons drawn from real-world experience, mentor advice, and one impactful read: Build a Career in Data Science by Emily Robinson & Jacqueline Nolis.",
    },
    {
      type: "figure",
      src: imgDataCareer,
      alt: "Data career tips",
      side: "left",
      caption: "Seven tips, drawn from the field.",
      text: "Technical skills get you in the door, but communication keeps you in the room. The best data scientists explain complex findings to non-technical stakeholders in ways that drive action.",
    },
    {
      type: "paragraph",
      text: "Domain knowledge is your secret weapon. Understanding the business context often matters more than using the fanciest algorithm. A simple model that solves a real problem beats a complex one that doesn't ship.",
    },
    {
      type: "pullquote",
      text: "Your first job doesn't define your career — it defines the questions you'll be able to ask next.",
    },
    {
      type: "paragraph",
      text: "Use it to learn, build skills, and discover what you actually enjoy. The data field is vast — analytics, engineering, ML, research, product — you might find your home in any of them.",
    },
    {
      type: "callout",
      title: "On imposter syndrome",
      body: "Imposter syndrome is normal. Even senior data scientists feel it. Focus on learning rather than knowing everything, and remember that everyone started somewhere.",
    },
    {
      type: "takeaways",
      title: "7 tips",
      items: [
        "Technical skills get you in the door — soft skills get you promoted",
        "Communicate insights to non-technical stakeholders",
        "Build a portfolio that shows impact, not just code",
        "Networking is underrated — join communities, attend events",
        "Business understanding matters as much as statistical knowledge",
        "Don't just clean data — tell its story",
        "Continuous learning is non-negotiable in this field",
      ],
    },
  ],

  "sql-joins": [
    {
      type: "lede",
      text: "\"I thought I understood SQL… until I met JOINs.\" This used to be me.",
    },
    {
      type: "paragraph",
      text: "If you're starting with SQL, JOINs can be confusing — and that's perfectly normal.",
    },
    {
      type: "figure",
      src: imgSqlJoins,
      alt: "SQL JOINs visualized",
      side: "full",
      caption: "The four JOINs, visualised.",
    },
    {
      type: "callout",
      title: "Rule 1 · Ban SELECT *",
      body: "Always specify the columns you need. It improves performance and makes your queries clearer.",
    },
    {
      type: "paragraph",
      text: "Understand the JOIN types visually: INNER JOIN returns matching rows from both tables. LEFT JOIN returns all rows from the left table plus matches. RIGHT JOIN is the opposite. FULL JOIN returns everything.",
    },
    {
      type: "pullquote",
      text: "Think in relationships before you think in syntax.",
    },
    {
      type: "paragraph",
      text: "Use meaningful table aliases — instead of cryptic single letters, use descriptive short names that make your query readable. Before writing a JOIN, ask yourself: how are these tables related? Understanding the relationship makes the JOIN obvious.",
    },
    {
      type: "callout",
      title: "Watch NULLs",
      body: "JOINs on columns with NULLs can produce unexpected results. NULL never equals NULL in a JOIN condition.",
    },
    {
      type: "takeaways",
      title: "7 things I wish I knew",
      items: [
        "Avoid SELECT * — always specify the columns you need",
        "Understand INNER, LEFT, RIGHT, and FULL JOINs visually",
        "Always consider NULL values when joining tables",
        "Use aliases to make queries more readable",
        "Think about performance — JOINs can be expensive on large tables",
        "Practice with real datasets to build muscle memory",
        "Master ON vs WHERE clause placement for correct results",
      ],
    },
  ],
};
