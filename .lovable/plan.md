

# Home Page Redesign -- Phase-by-Phase Plan

## Overview

Restructure the homepage to remove the ICT-style dashboard, add Blog and Lab sections, and relocate page views to the footer.

---

## Phase 1: Remove from Home Page

**What goes away:**
- `ServicesCard` -- not relevant (you're not ICT)
- `TimeOnSiteCard` -- timer removed
- `PageViewsCard` -- moved to footer (Phase 2)
- Entire "Dashboard" section heading and grid

**File:** `src/pages/Home.tsx`

---

## Phase 2: Page Views in Footer

Add a small, bold page view counter to the footer's bottom bar, next to the copyright line. Clean monospace number with an eye icon.

```text
// (c) 2026 Diini Kahiye          862 views  [eye icon]          </> with passion
```

**File:** `src/components/layout/Footer.tsx` -- import `useSiteStats` hook, display `totalViews` as bold mono number.

---

## Phase 3: Shrink Click Counter

Keep `ClickCounterCard` but make it a compact, single-row interactive element -- not a full bento card. A small inline section with the number + button side by side, no terminal header.

```text
784,320 clicks  [ Click Me ]   you: 116
```

**File:** `src/components/home/DashboardCard.tsx` -- simplify to a compact inline component.
**File:** `src/pages/Home.tsx` -- place it as a small element, not a grid section.

---

## Phase 4: Add Blog Section

A compact section showing 3 recent blog post titles (pulled from the same data in Blog.tsx, duplicated as a small array). Each shows title + date + category tag. Below: a styled button.

```text
// Recent Blogs
- World Happiness Report Analysis        Jan 2025  [data-analysis]
- Top 5 Emerging Tech Trends of 2025     Dec 2024  [tech]
- AI vs ML -- Quick Examples              Dec 2024  [tech]

          [ See More Blogs I Wrote -> ]
```

**File:** `src/pages/Home.tsx` -- add section with hardcoded recent posts array and Link button to `/blog`.

---

## Phase 5: Add Lab Section

A small teaser section with a brief description and button. Mention the quiz and games.

```text
// Lab
Test your data knowledge with interactive quizzes, or challenge the AI in Tic-Tac-Toe.

          [ See More Data Quizzes & Fun Games -> ]
```

**File:** `src/pages/Home.tsx` -- add section with description text and Link button to `/lab`.

---

## Final Section Order on Home Page

1. Hero / Bio
2. Featured Projects + "View All Projects" button
3. Quick Stats
4. Recent Blogs + "See More Blogs" button
5. Lab teaser + "Explore Lab" button
6. Click counter (compact inline)
7. Testimonials

---

## Files Modified

| File | Change |
|------|--------|
| `src/pages/Home.tsx` | Remove dashboard grid, add Blog section, Lab section, compact click counter, reorder sections |
| `src/components/home/DashboardCard.tsx` | Remove `PageViewsCard` and `TimeOnSiteCard` exports, simplify `ClickCounterCard` to compact inline |
| `src/components/layout/Footer.tsx` | Add page views counter with `useSiteStats` hook |

No new files or dependencies needed.

