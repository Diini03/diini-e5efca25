
# Portfolio Refinement Plan (v1.1)

This is a **refinement**, not a redesign. All current identity stays: dark/light terminal aesthetic, orange `#EA580C`, grid background, `max-w-4xl`, terminal cards, splash screen, click counter. No new gradients, no glassmorphism, no heavy motion.

---

## 1. Hero (Home)

Keep current bio text exactly as you wrote it — no rewrite. Only adjust **rhythm**:

- Increase top padding: `py-12` → `pt-20 pb-16` so the name breathes.
- Bump name scale slightly on desktop: `text-2xl md:text-3xl` → `text-3xl md:text-4xl`.
- Tighten the `GitHub | LinkedIn || More about me` row spacing; replace `||` separator with a single `·` (dot) for a more editorial feel.
- Keep the orange CV button as-is.

No copy changes. No new CTAs.

---

## 2. Featured Projects (Home) — new hierarchy

Current: two equal small cards. New: **1 lead + 2 secondary** layout to make featured work feel curated.

```
┌──────────────────────────────────────────┐
│  LEAD CARD — Fall Armyworm Detection      │
│  category label · larger title · 1-line   │
│  description · subtle metric (99.07%)     │
└──────────────────────────────────────────┘
┌─────────────────────┬───────────────────┐
│ Covid-19 Analysis   │ World Happiness   │
│ small terminal card │ small terminal    │
└─────────────────────┴───────────────────┘
```

- Lead card: full width, slightly taller, terminal header with `projects / fall-armyworm-detection`, larger title (`text-lg`), uppercase category tag (`MACHINE LEARNING`), one short metric line.
- Secondary cards: reuse existing `ProjectCard` (no tags, as decided earlier).
- Add a third featured slot: replace one Covid card with **Kulmid** to demonstrate product-engineering range alongside ML and analytics.

Final featured list:
1. Fall Armyworm Detection — Machine Learning (lead)
2. World Happiness Report — Data Analysis
3. Kulmid — Product Engineering

"View All Projects" button stays.

---

## 3. Projects page — categorization

Decision: **section headings** (cleanest, most senior-feeling). No filter chips, no search.

```
Machine Learning
  └─ Fall Armyworm Detection

Data Analysis
  └─ World Happiness · Covid-19 · Netflix

Product Engineering
  └─ Kulmid
```

- Each section has a small uppercase label (`text-xs tracking-wider text-muted-foreground`) and a thin divider.
- Grid stays `sm:grid-cols-2 lg:grid-cols-3` within each section, `max-w-4xl` preserved.
- Cards keep their current minimal style (no tags, no dates).
- Add a small uppercase category label inside each card (e.g. `PYTHON · CNN`) — one line, muted, no chips. This restores categorical signal without re-introducing tag clutter.

---

## 4. Remove Lab entirely

- Delete `src/pages/Lab.tsx`, `src/pages/lab/CodeChallenge.tsx`, `src/pages/lab/DataQuiz.tsx`.
- Remove the three Lab routes from `src/App.tsx`.
- Remove the Lab link from `Navigation.tsx` (desktop + mobile overlay).
- Remove the entire "Lab Teaser" section from `Home.tsx`.
- Update relevant memory entries (Lab Playground / Lab Hero Engagement / Lab Data Quiz) — mark as removed.

The click counter stays exactly where it is (Home, bottom). It remains the playful artifact.

---

## 5. Recent Blogs — editorial cleanup

Current already shows 3 — good. Improvements only:

- Drop the `BookOpen` icon next to heading; keep heading minimal.
- Convert each row from bordered card to a quiet editorial row: thin bottom border only, no background fill, more vertical padding.
- Remove the colored category `Badge`; replace with muted uppercase label (`text-[10px] tracking-wider text-muted-foreground`).
- Keep "See More Blogs" button.

Result: less repetitive, more "magazine index" feel.

---

## 6. Spacing & rhythm pass (Home)

- Section gap: `mb-10` → `mb-20` between major sections so each section earns its place.
- Section headings: keep `text-base` but add `mb-6` and a thin `border-b border-border/40 pb-2` only on the section title row — gives editorial separation without boxes.
- Quick Stats card stays but moves **after** Recent Blogs so the flow becomes: Identity → Featured Work → Writing → Stats → Click Counter.

Final Home order:
1. Hero
2. Featured Projects (1 lead + 2 secondary)
3. Recent Blogs (editorial rows)
4. Quick Stats
5. Click Counter

No Lab section.

---

## 7. Motion

No new animations. Keep existing `animate-fade-in`, splash, page transitions. Remove the `hover:scale-105` on the name (slightly toy-like) — replace with a subtle color softening on hover only.

---

## Files affected

| File | Change |
|---|---|
| `src/pages/Home.tsx` | Hero rhythm, featured layout (lead+2), blog rows, section order, remove Lab teaser |
| `src/pages/Projects.tsx` | Group projects by category with headings, add inline category label |
| `src/components/home/ProjectCard.tsx` | Add optional `category` line |
| New: `src/components/home/FeaturedProjectCard.tsx` | Lead-card variant for hero project |
| `src/App.tsx` | Remove Lab routes |
| `src/components/layout/Navigation.tsx` | Remove Lab nav link |
| Delete: `src/pages/Lab.tsx`, `src/pages/lab/CodeChallenge.tsx`, `src/pages/lab/DataQuiz.tsx` |
| Memory: update index + retire Lab-related entries |

## What is NOT changing

- Color palette, grid background, particles, interactive gradient
- Splash screen, terminal cards, dots, path formatting
- `max-w-4xl` constraint, footer, click counter
- Bio copy, About page, Blog content, Contact page
- Theme system, fonts
