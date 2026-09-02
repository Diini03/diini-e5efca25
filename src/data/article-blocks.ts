import type { EditorialBlock } from "@/components/blog/EditorialArticle";

import imgSomArchive from "@/assets/blog/articles/som-archive.webp";
import imgSomLoop from "@/assets/blog/articles/som-loop.webp";
import imgSomQuote from "@/assets/blog/articles/som-quote.webp";
import imgCcSun from "@/assets/blog/articles/cc-sun.webp";
import imgCcGrowth from "@/assets/blog/articles/cc-growth.webp";
import imgCcFramework from "@/assets/blog/articles/cc-framework.webp";
import imgModelQuestion from "@/assets/blog/articles/model-question.webp";
import imgModelCutoff from "@/assets/blog/articles/model-cutoff.webp";
import imgModelTable from "@/assets/blog/articles/model-table.webp";
import imgModelPoem from "@/assets/blog/articles/model-poem.webp";

/**
 * Full long-form articles (originally published on Medium), laid out with the
 * same editorial block system as the LinkedIn carousels — journal style, with
 * figures that sit beside or inside the text rather than always full-bleed.
 */
export const articleBlocks: Record<string, EditorialBlock[]> = {
  "why-data-somalia-never-used": [
    {
      type: "lede",
      text: "Every year, organizations arrive in Somalia with projects. Before the work starts, data gets collected. Surveys, field assessments, household interviews. After the project ends, more data gets collected. Did it work. How many people were reached.",
    },
    {
      type: "wrap",
      src: imgSomArchive,
      alt: "Stacks of paper archives beside an empty desk lit by a glowing question mark",
      caption: "Fig. 1 — Collected, filed, and never opened again.",
      float: "right",
      text: "That data gets cleaned, visualized and put into a report. The report goes to the funder. The funder releases the next budget. The cycle repeats.\n\nIf you go to the Humanitarian Data Exchange right now, you will find 488 datasets for Somalia from 75 organizations. Food prices, displacement, population movement, health indicators. All collected, processed and published.\n\nBut who is actually using it to make decisions?",
    },
    { type: "heading", text: "The humanitarian loop" },
    {
      type: "figure",
      src: imgSomLoop,
      alt: "Circular diagram: collect data, clean and analyze, build report, send to funder",
      caption: "Fig. 2 — The loop most Somali data never escapes.",
      side: "left",
      text: "The organizations doing this work are not doing it badly. They have monitoring teams, information management officers and data analysts. The work is real. But the purpose of most of that data is to report upward. To convince funders. To justify the next budget. The analysis serves the funding cycle more than the people on the ground.",
    },
    {
      type: "paragraph",
      text: "And because these organizations hire experienced analysts, the local talent pipeline stays thin. For a Somali student graduating with a data background, this is the first wall you hit. The roles that exist want three to five years of experience. You understand the work but cannot get hired for it yet.",
    },
    { type: "heading", text: "The telecom problem" },
    {
      type: "paragraph",
      text: "Mobile money launched in Somalia in 2009. That is over 15 years of transaction data. Call records, mobile money flows, user behavior across the entire country. In Mogadishu, 95 percent of financial transactions happen through mobile money. That is the entire financial pulse of the city flowing through systems that log everything.",
    },
    {
      type: "wrap",
      src: imgSomQuote,
      alt: "Black card reading: The data exists. Nobody is using it.",
      caption: "Fig. 3 — The whole problem, in six words.",
      float: "left",
      text: "For years most of it sat unused. Recently telecoms have started building internal analytics capacity, making decisions based on numbers rather than instinct. That shift is real but it is slow and mostly internal. It does not yet create an open job market for fresh analysts.",
    },
    { type: "heading", text: "Businesses generating data without knowing it" },
    {
      type: "paragraph",
      text: "More businesses are moving onto digital systems. POS terminals, inventory software, delivery tracking. Each one generates data daily as a side effect of normal operations. But most owners do not know what to do with it. No one is asking questions of it yet. This is actually where early opportunity lives. Not waiting for a job posting but walking into a business and showing them what their own numbers are saying.",
    },
    { type: "heading", text: "The real gap" },
    {
      type: "stats",
      items: [
        { value: "488", label: "Open Somalia datasets" },
        { value: "75", label: "Publishing organizations" },
        { value: "95%", label: "Mogadishu transactions via mobile money" },
      ],
    },
    {
      type: "paragraph",
      text: "The problem is not that data does not exist. 75 organizations publish Somalia datasets publicly. Telecoms have years of history. Businesses are generating operational data every day. The gap is the layer between raw numbers and actual decisions. Right now that layer is almost empty outside of humanitarian organizations. And inside those organizations, the entry point is hard.",
    },
    { type: "heading", text: "What being early actually means" },
    {
      type: "paragraph",
      text: "The data infrastructure in Somalia is growing. The government passed a Data Protection Act in 2023. Digital systems are expanding. Telecoms are investing in their own analytics. The people building real skills now, working on real projects now, putting their work out publicly now, will be exactly who those organizations start hiring in the next few years.",
    },
    { type: "pullquote", text: "The gap is real. So is the timing." },
    {
      type: "callout",
      title: "About this series",
      body: "Part of the Raw Data to Insights series. Projects on GitHub and LinkedIn — linkedin.com/in/diinikahiye · diinikahiye.online",
    },
  ],

  "correlation-vs-causation": [
    {
      type: "lede",
      text: "Correlation means two things move together. Causation means one is making the other happen. One line of Python finds correlation in seconds. Understanding whether it actually means anything takes much longer — and that is the part most tutorials skip.",
    },
    { type: "heading", text: "The AI example" },
    {
      type: "wrap",
      src: imgCcGrowth,
      alt: "Line chart showing AI growth and tech jobs rising together above market conditions",
      caption: "Fig. 1 — Two lines rising together is not an explanation.",
      float: "right",
      text: "Over the last few years two things happened at the same time. AI tools grew fast and the number of developer and tech jobs also grew. Put those two lines on a chart and they move together cleanly.\n\nThe easy conclusion is that AI created more jobs. But look at what else was happening during the same period. Companies were scaling aggressively. Cloud infrastructure was expanding. Software demand across every industry was already rising before AI became mainstream. Venture capital was flowing into tech at levels not seen before.",
    },
    {
      type: "paragraph",
      text: "AI and job growth both rose because the conditions underneath them were already moving. They are correlated. But calling one the cause of the other without looking at what else was in the room is a mistake.",
    },
    {
      type: "figure",
      src: imgCcSun,
      alt: "Diagram showing the sun driving both ice cream sales and beach swimming",
      caption: "Fig. 2 — The hidden third variable, doing all the work.",
      side: "left",
      text: "This matters because decisions get made on conclusions like this. Governments write policy. Companies shift hiring strategies. Investors move money. If the reading is wrong the decisions that follow are wrong too.",
    },
    { type: "heading", text: "What I found in my own project" },
    {
      type: "paragraph",
      text: "In my customer churn project, support calls had one of the strongest correlations with churn. More calls, more churn. Clear pattern in the heatmap. My first read was straightforward. Customers who call support end up leaving. Maybe the experience is frustrating them into cancelling.",
    },
    {
      type: "paragraph",
      text: "Then I asked the question the other way. What if unhappy customers were already planning to leave and calling support was just something they did on the way out. A symptom, not a cause.",
    },
    {
      type: "pullquote",
      text: "Same data. Two completely different directions. Only one leads somewhere useful.",
    },
    {
      type: "paragraph",
      text: "That small shift changes everything. One reading says fix the support team. The other says find out why customers become unhappy before they ever pick up the phone.",
    },
    { type: "heading", text: "Before you write any finding" },
    {
      type: "figure",
      src: imgCcFramework,
      alt: "Causal analysis framework: three checklist cards with questions",
      caption: "Fig. 3 — Three questions to ask before calling anything a cause.",
      side: "full",
    },
    {
      type: "takeaways",
      title: "The three questions",
      items: [
        "Could a third variable be driving both?",
        "Could the direction be reversed — what looks like the cause might be the effect?",
        "Does this make logical sense beyond just the numbers?",
      ],
    },
    {
      type: "paragraph",
      text: "If you cannot answer those three clearly you have a starting point for more questions. Not a conclusion.",
    },
    { type: "heading", text: "The actual work" },
    {
      type: "paragraph",
      text: "Finding correlation is one line of code. Understanding what it means takes sitting with the data, asking uncomfortable questions and being willing to say the pattern does not tell the full story yet. That is the work most people skip. And it is the difference between analysis that misleads and analysis that actually helps someone make a better decision.",
    },
  ],

  "what-is-a-model": [
    {
      type: "lede",
      text: "You open ChatGPT. You ask it something. You get an answer. Then you open Claude and ask the exact same thing. The answer is different.",
    },
    {
      type: "wrap",
      src: imgModelPoem,
      alt: "Same prompt sent to ChatGPT and Claude producing two different poems",
      caption: "Fig. 1 — One question, two brains, two answers.",
      float: "right",
      text: "Not slightly different — sometimes completely different. One is confident. The other is cautious. One gives you five steps. The other gives you a paragraph.\n\nYou sit there wondering: which one is right? Is one broken? Are they guessing?\n\nNeither is broken. And this is not random. The reason they answer differently comes down to one word you have probably heard but never fully understood: model.",
    },
    { type: "heading", text: "So what is a model, exactly?" },
    {
      type: "paragraph",
      text: "Forget AI for a second. Imagine you want to teach a child to recognize a cat. You don't write rules. You don't say \"four legs, whiskers, tail.\" You just show them thousands of pictures. Cat. Not a cat. Cat. Not a cat. Over time, the child builds something in their head — a kind of internal understanding of what a cat looks like.",
    },
    {
      type: "paragraph",
      text: "A model is that internal understanding. Except instead of a child, it's a machine. And instead of pictures of cats, it's trained on billions of pieces of text, code, data — whatever it was built to understand.",
    },
    {
      type: "pullquote",
      text: "The model is not the app you open. It is what lives inside it — the brain, not the face.",
    },
    {
      type: "paragraph",
      text: "When you type a question into ChatGPT, you are not really talking to ChatGPT. You are talking to a model called GPT-4o that OpenAI built and put inside that product. When you use Claude, you are talking to a model Anthropic built. Different brain. Same type of question. Different answer.",
    },
    { type: "heading", text: "What makes one model different from another?" },
    {
      type: "wrap",
      src: imgModelTable,
      alt: "Table comparing Model A and Model B on optimization, behavior and tone",
      caption: "Fig. 2 — Different priorities, baked in during training.",
      float: "left",
      text: "1 · What they were trained on. Every model learns from data, but not the same data. One might have been trained heavily on academic papers and technical documentation. Another on conversational text and creative writing. Another on code. What they learned from shapes how they think, what they know, and how they express themselves. It is the same reason a doctor and a poet can read the same sentence and focus on completely different things.\n\n2 · What they were optimized for. Training is only the first step. After that, builders decide what kind of behavior they want. More cautious? More creative? More direct? Should it refuse certain topics? This optimization — fine-tuning and reinforcement learning — shapes the personality of the model. Claude was built to be honest and careful. GPT-4o was built to be helpful and versatile. Gemini was built inside Google's ecosystem with different priorities entirely. Same base idea, different values baked in.",
    },
    {
      type: "figure",
      src: imgModelCutoff,
      alt: "Timeline showing knowledge cutoff at 2023 separating known from unknown",
      caption: "Fig. 3 — Everything after the cutoff simply was not there.",
      side: "right",
      text: "3 · When they were trained. Models have a knowledge cutoff — a point in time where their learning stopped. If a model was trained on data up to 2023, it genuinely does not know what happened in 2024. It is not hiding it. It simply was not there. This is why two models can give different answers about recent events. One knows. One doesn't. And the one that doesn't might still try to answer — which is where things go wrong.",
    },
    {
      type: "paragraph",
      text: "4 · How big they are. Size in AI does not mean the physical size of the server. It means the number of parameters — the internal values the model learned during training. More parameters generally means more capacity to understand nuance, handle complex questions, and give detailed answers. A smaller model might give you a fast, simple answer. A larger model might give you something more layered. Neither is always better. It depends on what you need.",
    },
    { type: "heading", text: "A real example" },
    {
      type: "paragraph",
      text: "Say you ask two models: \"Should I use Python or Excel for data analysis?\" One model trained heavily on developer communities and technical forums might immediately say Python, because that is what it saw praised most. Another model trained on a broader range of business and beginner content might say Excel for simple tasks and Python for complex ones — because it saw both perspectives equally. Neither is lying. Both are reflecting what they learned.",
    },
    {
      type: "callout",
      title: "Where it gets sensitive",
      body: "Now imagine the same question but about a political topic, a health decision, or a legal question. The differences between models become even more visible — because now the values that were built into each model start to show.",
    },
    { type: "heading", text: "Why does this matter to you?" },
    {
      type: "paragraph",
      text: "If you are using AI tools in your work — for analysis, for writing, for coding — you need to understand that you are not using one thing called \"AI.\" You are choosing between different models, each with different strengths, different blind spots, and different behaviors. The tool you pick should match what you are trying to do.",
    },
    {
      type: "paragraph",
      text: "Using Claude for a task that needs careful, structured reasoning? Good choice. Using a smaller, faster model for a quick summarization? Also fine. Using any model blindly without understanding its limitations? That is where things break.",
    },
    {
      type: "figure",
      src: imgModelQuestion,
      alt: "Crossed out question 'Why did AI say this?' replaced with 'Which model said this — and why?'",
      caption: "Fig. 4 — The better question.",
      side: "full",
    },
    {
      type: "paragraph",
      text: "The model is not magic. It is a learned thing — shaped by data, shaped by decisions, shaped by the people who built it. When you understand that, you stop asking \"why did AI say this?\" and start asking the better question: \"which model said this, and why does that matter?\" That shift alone makes you a more careful, more effective person working with AI.",
    },
  ],
};
