## 1. Add 3 Medium blog posts

Extend `src/pages/Blog.tsx` `blogPosts` array with 3 new entries (`source: "medium"`, `externalUrl: <Medium URL>`, `featuredOnHome: true`) and full-body content stored on the post so the dedicated post page renders it. The Medium URLs will be attached to each post:

- **Why Most Data in Somalia Never Gets Used?**
  `https://medium.com/@diiniyare74/why-most-data-in-somalia-never-gets-used-c88889eb3f22`
- **Correlation vs Causation — The mistake every beginner makes reading data**
  `https://medium.com/@diiniyare74/correlation-vs-causation-the-mistake-every-beginner-makes-reading-data-efe8cc6e1fd4`
- **What is a model — and why two AIs can give you completely different answers?**
  `https://medium.com/@diiniyare74/what-is-a-model-and-why-two-ais-can-give-you-completely-different-answers-2edc1ba3c669`

Each post stores the opening paragraphs the user provided (broken into ~2 sections) plus a headline. Excerpts for cards use the first ~220 chars.

## 2. BlogPost page: in-body Medium CTA

Update `src/pages/BlogPost.tsx` so that when `post.source === "medium"`:

- Render the first section of paragraphs (opening hook — roughly the first 2–3 paragraphs the user pasted).
- Insert a centered CTA block mid-body:
  ```
  ┌──────────────────────────────────────────────┐
  │  Continue reading on Medium         →        │
  │  Full story with the rest of the breakdown.  │
  └──────────────────────────────────────────────┘
  ```
  Styled with `border border-primary/40`, `bg-primary/5`, opens the Medium URL in a new tab, `ExternalLink` icon.
- Render the remaining pasted paragraphs after it, followed by a second smaller "Read the full story on Medium →" link at the end.

LinkedIn posts keep their existing rendering — no change.

## 3. Home Writing section redesign

Rewrite `src/components/home/WritingCarousel.tsx`:

- Pull `blogPosts.filter(p => p.featuredOnHome)` and sort by date desc — mixed order, no category grouping, no category chips or category labels in the left rail or on the active pane.
- Left rail (desktop) shows just the title (with subtle date under it), no `CATEGORY` tag line.
- Mobile chip row: replace category chips with post-title chips (truncated).
- Right pane keeps title + excerpt + read-time strip.
- CTA row becomes a single element: `Read the post  →  LinkedIn` or `Read the post  →  Medium`, where the platform word is a link to `linkedinUrl` / Medium URL. The internal `Read post` link points to `/blog/{slug}` and wraps the "Read the post" text; the arrow sits between.
- Keep hover/animation styling that the user liked.

## 4. ProjectDetail redesign — Terminal Spec Sheet

Rewrite the top section of `src/pages/ProjectDetail.tsx` and remove duplication. Going with the "Terminal spec sheet" direction:

```text
┌── project / somalia-displacement-forecast ────────────────┐
│ Somalia Displacement Forecast Dashboard         2025      │
│ One-line summary…                                          │
├────────────────────────────────────────────────────────────┤
│ role     Data analysis · BI dashboarding                   │
│ stack    Power BI    — modeling, DAX measures, report      │
│          Power Query — cleaning & shaping the raw feed     │
│          DAX         — KPIs, forecast vs actual measures   │
│ links    [ GitHub ]  [ Competition ]                       │
└────────────────────────────────────────────────────────────┘
```

Concretely:

- **Remove** the tag-chips row (`project.tags`) and the separate "Tools & Technologies" section — they duplicate each other and the header.
- **Extend the `ProjectData` type** with an optional `stack: { name: string; role: string }[]` field. `role` is a short phrase describing what that tool did on this specific project (e.g. Power BI → "modeling & report design"; Power Query → "cleaning & shaping"; DAX → "measures for forecast vs actual"; Python → "analysis pipeline & plotting"; Pandas → "data wrangling"; Plotly → "interactive charts").
- For every project in `projectsData`, populate `stack` with 3–5 entries. Keep the old `tools: string[]` as a fallback so nothing breaks if `stack` is missing.
- Render a single **terminal-card "spec sheet"** at the top containing: Role, Stack (list with `name` in mono + `—` + `role` in muted text), Links (GitHub / Competition inline buttons).
- Keep: title, description, Key Insight card (when present), Visualizations gallery, Key Highlights (when present), Code snippet.

## Technical notes

- BlogPost body: instead of parsing arbitrary markdown, store each Medium post's body as a `paragraphs: string[]` array and a `mediumCtaAfter: number` index (e.g. after paragraph 2) that determines where the mid-body CTA slot appears.
- Add a `source: "linkedin" | "medium"` field on `BlogPost`; default to `"linkedin"` for existing posts.
- `WritingCarousel` needs no new files — refactor in place.
- All colors stay on existing semantic tokens (`primary`, `border`, `muted-foreground`, terminal classes). No new palette.

## Files touched

- `src/pages/Blog.tsx` — add 3 posts, extend `BlogPost` interface (`source`, `externalUrl`, `paragraphs`, `mediumCtaAfter`).
- `src/pages/BlogPost.tsx` — render Medium-style body with mid-body CTA.
- `src/components/home/WritingCarousel.tsx` — remove categories, mix all featured posts, new CTA row.
- `src/pages/ProjectDetail.tsx` — extend `ProjectData` with `stack`, remove tag chips + Tools section, add terminal spec-sheet block.
