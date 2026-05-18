# v1.3 Refinement Plan

Goal: refine four areas without breaking the existing identity (terminal aesthetic, orange `#EA580C`, max-w-4xl, monospace, light mode only).

---

## 1. Background color — calmer, not white

Currently `--background: 210 25% 98%` reads almost pure white and hurts readability on long sessions.

Switch to a soft, slightly tinted off-white that feels modern (think Linear / Vercel docs / Notion light):

- `--background: 35 25% 96%` — very subtle warm cream, easier on the eyes
- `--card: 35 20% 93%` and `--terminal-bg: 35 20% 93%` to match
- `--terminal-header: 35 18% 90%`
- `--muted: 35 15% 90%`, `--border: 35 14% 86%`
- Keep `--foreground`, primary orange, and grid opacity unchanged.

Will spot-check Home, Projects, About, Blog, ProjectDetail to confirm contrast stays AA. Adjust 1–2 ticks if any surface looks muddy.

Alternative if the warm cream feels off: a cool neutral `210 20% 96%` with `--card 210 16% 93%`. I will pick warm cream as the default.

---

## 2. Home "Writing" section → interactive vertical-tab carousel

Replace the current list of editorial rows with a layout inspired by the screenshots (brittanychiang.com "Where I've Worked"):

```text
┌──────────────────────────────────────────────┐
│ Writing                                      │
├────────────┬─────────────────────────────────┤
│ • Post A   │  Title of selected post         │
│ • Post B   │  Category · date · read time    │
│ • Post C   │                                 │
│            │  Excerpt paragraph...           │
│            │                                 │
│            │  [Read on blog →]               │
└────────────┴─────────────────────────────────┘
              [ View All Writing → ]
```

Behavior:
- Left rail: vertical list of `featuredOnHome` post titles. Active item has an orange left border + orange text; inactive items muted.
- Click (or hover with small delay on desktop) swaps the right pane.
- Right pane: title, meta line, excerpt (first ~160 chars), and a "Read post" link to `/blog/{slug}`.
- Smooth fade/slide transition (CSS `opacity` + `translateY(4px)`, 200ms) when switching.
- Mobile (`< md`): collapses to a horizontal scrolling chip row on top + content below.
- Centered "View all writing" button below, replacing current "See More Blogs I Wrote".

New component: `src/components/home/WritingCarousel.tsx`. Drops into `Home.tsx` in place of the current Writing block. Pulls from `blogPosts.filter(p => p.featuredOnHome)`.

---

## 3. "Background" section — scroll-progress connector line

Keep the same two-column Experience + Education content, but redesign visually so it doesn't look like a generic timeline/section. Inspired by the cursor/scroll line idea:

- Render a thin vertical line down the left edge of the section.
- The line has two layers: a faint base track (`border` color, opacity 30%) and a filled overlay (`primary` color) whose height is driven by the user's scroll position relative to the section.
- As the user scrolls down through the section the orange fill grows from top to bottom; scrolling back up shrinks it. Implemented with an `IntersectionObserver` + `requestAnimationFrame` on `scroll` reading the section's `getBoundingClientRect()`. No external libs.
- Each row (Experience item, Education item) gets a small dot anchored on the line. Dot turns from muted → orange once the fill passes it.
- Section heading changes from "Background" to a more intentional label: **"Trajectory"** (short, not buzzword-y, signals movement).
- Layout stays two-column on `md+`, single column on mobile (line still works).

New component: `src/components/home/TrajectoryStrip.tsx` replacing `BackgroundStrip.tsx` (old file deleted). Same data shape.

---

## 4. Click-Me button — tooltip + modern feedback animation

Current button: bare "Click Me" with a counter that just ticks.

Additions in `DashboardCard.tsx` (CompactClickCounter):

- **Hover tooltip**: small pill above the button: *"Tap to leave your mark — see the counter rise."* Use existing `@/components/ui/tooltip` (shadcn), with 150ms delay, subtle fade.
- **Modern click feedback** (replacing the common "+1"): on each click, spawn a short-lived **ripple ring** that expands and fades out from the button center, plus a tiny **spark dot** that floats up-and-out at a random angle (-20° to +20°) and fades. No text/numbers floating — feels more tactile and original than "+1".
  - Ripple: absolutely positioned `span`, scales `0 → 2.2`, opacity `0.4 → 0`, 600ms ease-out, orange.
  - Spark: 4px dot, translates `0 → -28px` with x jitter, fades over 500ms.
  - Implemented with a small `useState` array of click events and CSS keyframes (no framer-motion needed). Auto-cleans after animation ends.
- Button itself gets a tiny `active:scale-95` (already present) + a subtle orange glow shadow on hover.
- The numeric counter still updates as before — animation is additive.

---

## Files touched

- `src/index.css` — palette tokens (background/card/terminal/border/muted).
- `src/components/home/WritingCarousel.tsx` — **new**.
- `src/components/home/TrajectoryStrip.tsx` — **new** (replaces BackgroundStrip).
- `src/components/home/BackgroundStrip.tsx` — **delete**.
- `src/components/home/DashboardCard.tsx` — tooltip + ripple/spark animation.
- `src/pages/Home.tsx` — swap Writing block → `<WritingCarousel />`, swap `<BackgroundStrip />` → `<TrajectoryStrip />`.
- `mem://index.md` + small memory file updates (palette tint, Writing carousel pattern, Trajectory section, Click-Me micro-interaction).

## Not changing

Hero copy, splash, nav (Resume pill), particles, interactive gradient, primary orange, grid opacity, fonts, max-w-4xl, project cards, About/Projects/Blog pages, footer.

After implementation I'll spot-check the preview for: contrast on the new bg, carousel swap behavior, scroll-line fill timing, and the click ripple feel.
