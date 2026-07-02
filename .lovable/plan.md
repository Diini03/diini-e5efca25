## 1. Add SQL Business Data Analysis project

**`src/pages/Projects.tsx`** — Add a new group "Data Analysis / SQL" (or nest under Business Intelligence). New card:

- slug: `sql-business-analysis`
- title: "SQL Business Data Analysis"
- category: "SQL · SSMS · Business Analysis"
- description (short, portfolio card): *"Analyzed ~10,000 retail sales transactions in SQL Server to answer real business questions — profitability by region, category performance, discount impact, and loss-making sub-categories."*
- No image (SQL project, text-only card is fine — matches other no-image cards).

**`src/pages/ProjectDetail.tsx`** — Add full entry in `projectsData` for `sql-business-analysis`:

- role: `SQL analysis · Business reporting`
- description (longer, on detail page): *"An end-to-end SQL project built in Microsoft SQL Server Management Studio. A retail dataset of ~10,000 transactions was imported, explored, and interrogated with SQL to answer business questions about revenue, profit, regional performance, product categories, and discount behavior — turning raw transactional data into decisions."*
- keyInsight: *"Discounts weren't uniformly profitable — several sub-categories lost money once discount depth crossed a threshold, and a handful of regions carried most of the profit."*
- stack:
  - `SQL Server` — dataset storage & querying engine
  - `SSMS` — writing, running and debugging queries
  - `T-SQL` — aggregations, filtering, business questions
  - `Aggregate functions` — SUM, AVG, COUNT, MIN, MAX for KPIs
  - `GROUP BY / HAVING` — category, region, and segment breakdowns
- highlights (Key Highlights section):
  - Imported and explored ~10,000 retail transactions in SQL Server
  - Analyzed sales & profit across categories, regions, and customer segments
  - Identified loss-making sub-categories and discount thresholds
  - Answered 6 core business questions with reusable SQL queries
- Business Questions block (rendered inline in description or as bullet list under highlights): Which categories generated the highest sales? Which regions were most profitable? How did discounts affect profitability? Which sub-categories lost money? Which states/cities performed best? Which customer segments drove revenue?
- No charts (text project). No `githubUrl` unless supplied later.

## 2. More defined descriptions for every existing project

Rewrite the `description` field for each entry in `projectsData` (in `ProjectDetail.tsx`) so a reader immediately understands **what the project is, what data it uses, and what was done** — matching the density of the new SQL description. Keep the short one-liner in `Projects.tsx` as-is (card summary).

Projects to expand:

- Somalia Displacement Forecast Dashboard
- Somalia IDPs Movement Dashboard (UNHCR-PRMN)
- Fall Armyworm Leaf Disease Detection
- World Happiness Report Analysis
- Covid-19 Analysis & Visualization
- Netflix Data Analysis & Visualization
- Kulmid (skip — it's product engineering, current copy is fine)

Each rewritten description will be 2–3 sentences: dataset size + what was analyzed + what techniques/tools did the work + what it produced.

## 3. Trim writing excerpts (Home carousel length issue)

**`src/pages/Blog.tsx`** — The right pane of the Home Writing carousel is too tall for two posts. Shorten the `excerpt` for:

- `correlation-vs-causation` — cut to ~2 sentences (~160 chars).
- `what-is-a-model` — cut to ~2 sentences (~160 chars).

Leave `why-data-somalia-never-used` and LinkedIn posts unchanged. This equalizes card heights in the carousel without touching layout code.

## 4. Redesign Blog list page — no images, card-style like Projects

**`src/pages/Blog.tsx`** grid:

- Remove the `<img>` block and category pill overlay from every card.
- New card structure mirrors Projects cards:
  ```
  ┌──────────────────────────────────────┐
  │ CATEGORY · DATE · READ TIME          │
  │                                       │
  │ Post Title (bold, 2 lines max)        │
  │                                       │
  │ Short excerpt (3–4 lines)             │
  │                                       │
  │ #tag  #tag                    Read →  │
  └──────────────────────────────────────┘
  ```
- Border/hover styling copied from the Projects page cards (`border-border/60 bg-card/50 hover:border-primary/40`), 3-column grid preserved.
- Remove all image imports from `Blog.tsx` (still referenced in `BlogPost.tsx`, so keep them there).

## 5. Redesign BlogPost page — ebook / long-form reading

**`src/pages/BlogPost.tsx`**:

- Drop the big hero image block. Replace with a slim editorial header: back link, category eyebrow, large title, meta row (date · read time · source).
- Body renders as centered narrow column (`max-w-2xl mx-auto`) with book-style typography: larger serif-ish body (`text-[17px] leading-[1.8]`), proper paragraph spacing (`space-y-6`), first-letter drop-cap on the opening paragraph for Medium posts (optional accent).
- Keep the Medium mid-body CTA (unchanged behavior — after ~paragraph 2).
- Reduce the "Key Takeaways / Highlights" block: max 2 items, rename to **"The takeaway"** (matches earlier memory of removing generic wording), light styled block with a single accent bar.
- Footer of post keeps the "Read the full story on Medium →" / LinkedIn CTA.
- Related-posts strip (if present) becomes text-only cards, same style as new Blog list cards.

## Files touched

- `src/pages/Projects.tsx` — add SQL card
- `src/pages/ProjectDetail.tsx` — add SQL entry, rewrite descriptions for 6 existing projects
- `src/pages/Blog.tsx` — trim 2 excerpts, remove images from card grid, restyle cards like Projects
- `src/pages/BlogPost.tsx` — remove hero image, ebook-style body, shorter takeaway block

## Technical notes

- No new dependencies. Typography uses existing Tailwind + design tokens.
- All copy edits stay on the frontend/presentation layer. No schema, backend, or data-model changes.
- Image imports stay in `BlogPost.tsx` only if still used; otherwise removed. `Blog.tsx` image imports removed entirely.
