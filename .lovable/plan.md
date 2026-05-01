
# Portfolio v2.0 — Design Refresh

> **Status check:** No prior "v2.0" exists. The current site is still v1 (terminal-styled, orange-accent, copied-feeling layout). This will be the **first** v2.0 release.

## Goals

1. Move away from the copied "dev/terminal/JSON" look toward an **editorial, project-focused** portfolio.
2. **Refined black & white** as the design foundation, with a single calmer accent color (default).
3. **Cleaner Home page** — remove Testimonials, tighten the hero, lead with work.
4. Keep light + dark themes only (no 4-palette switcher), but redesign both to feel premium and minimal.

---

## 1. New Design System

### Color tokens (`src/index.css`)

**Light mode (refined B&W):**
- Background: near-white `0 0% 99%`
- Foreground: near-black `0 0% 10%`
- Card: `0 0% 97%` (subtle off-white, no blue tint)
- Border: `0 0% 90%`
- Muted-foreground: `0 0% 45%`

**Dark mode (refined B&W):**
- Background: true near-black `0 0% 7%`
- Foreground: `0 0% 92%`
- Card: `0 0% 11%`
- Border: `0 0% 18%`
- Muted-foreground: `0 0% 60%`

**New default accent — calmer than orange:**
- Primary: **deep teal / slate-blue** `200 70% 45%` (HSL) — feels editorial and data-science-appropriate, works on B&W.
- Used sparingly: links, primary CTA, active nav, key highlights only.

**Removes** the `--terminal-bg` / `--terminal-header` chart-color sprawl. Charts can use foreground/muted/primary tints.

### Typography

- **Headings & body:** switch primary font to **Inter** (already loaded). Reserve **JetBrains Mono** for: `~/` logo, code snippets, project slugs/paths, Lab.
- Larger heading scale on Home hero (`text-4xl md:text-5xl`) for editorial feel.

### Component cleanup

- Remove/retire heavy "terminal card" treatments on Home, About, Projects, Blog (drop the colored dot headers + fake terminal chrome).
- Replace with **clean cards**: subtle border, generous padding, no gradient shadows, no 3D tilt on hover (keep only a tiny lift).
- Keep `~/` logo and mono accents in Navigation/Footer for personality.
- **Lab page keeps the playful terminal vibe** (it's the right place for it).

### Files affected
- `src/index.css` — rewrite token palette, drop terminal/3D/glass utility classes that won't be used.
- `tailwind.config.ts` — drop unused `chart` colors if not referenced.
- `src/components/home/TerminalCard.tsx`, `DashboardCard.tsx` (CompactClickCounter), `ParticleBackground.tsx`, `InteractiveGradient.tsx` — remove from Home (kept in repo only if used elsewhere; otherwise deleted).

---

## 2. Home Page Redesign

New section order (removes Testimonials; keeps everything else as you chose):

```text
1. Hero            — name, one-line role, 2-line bio, CV button, social links
2. Featured Work   — Fall Armyworm + Covid-19 (clean cards, no terminal chrome)
3. Quick Stats     — kept, restyled minimal (numbers + labels, no card chrome)
4. Recent Blogs    — kept, list style refined
5. Lab teaser      — kept
6. Click Counter   — kept, smaller/inline
7. (Testimonials removed)
```

Hero changes:
- Larger, editorial headline.
- Drop the orange glow text-shadow on the name; use the new accent for `Diini Kahiye` only.
- Remove particle background + interactive gradient from Home (too noisy for the new minimal direction). Background stays clean.
- CV button: outline style matching new accent, not heavy filled+shadow.

Featured Projects:
- Replace `ProjectCard`'s terminal-chrome look with a clean card: title, one-line description, tag chips, arrow link. No "projects / slug" path header.

### Files affected
- `src/pages/Home.tsx` — restructure, remove Testimonials section + ParticleBackground + InteractiveGradient imports.
- `src/components/home/ProjectCard.tsx` — redesign to clean card.
- `src/components/home/QuickStatsCard.tsx` — strip terminal chrome.
- `src/components/home/DashboardCard.tsx` (CompactClickCounter) — strip terminal chrome, keep compact.
- `src/components/home/TestimonialsCard.tsx` — delete (no longer referenced anywhere).

---

## 3. Other Pages — light alignment pass

To keep v2.0 cohesive (without rewriting everything in one shot):
- **About** (`src/pages/About.tsx`) — replace terminal-card wrapper with a clean two-column-ish layout (bio + sidebar with location/education). Keep content unchanged.
- **Projects** (`src/pages/Projects.tsx`) — list of clean project cards (same component as Home).
- **Blog** (`src/pages/Blog.tsx`) — already cleaner; just swap card chrome to match new style.
- **Lab** (`src/pages/Lab.tsx`) — **keep terminal aesthetic** intentionally; it fits the playful nature.
- **Contact, Experience, BlogPost, ProjectDetail** — inherit new tokens; minor polish only (no structural rewrites this round).
- **Navigation/Footer** — keep structure, restyle to match new B&W tokens. Sun/Moon toggle stays (only 2 themes).

---

## 4. What we are NOT doing in v2.0

- No 4-palette (Latte/Frappe/Mocha) switcher — you chose 2-theme.
- Not adding profile photo (you said you'll handle that).
- Not touching Testimonials behavior beyond removal — section is gone.
- Not rewriting Lab interactions; only ensuring they still look right under new tokens.

---

## Files Summary

| File | Action |
|---|---|
| `src/index.css` | Rewrite color tokens, remove terminal/3D utility classes |
| `tailwind.config.ts` | Remove unused chart colors |
| `src/pages/Home.tsx` | Restructure, remove Testimonials + heavy backgrounds |
| `src/pages/About.tsx` | Replace terminal card with clean layout |
| `src/pages/Projects.tsx` | Use new clean project cards |
| `src/pages/Blog.tsx` | Card chrome refresh |
| `src/components/home/ProjectCard.tsx` | Redesign — clean, no terminal chrome |
| `src/components/home/QuickStatsCard.tsx` | Strip terminal chrome |
| `src/components/home/DashboardCard.tsx` | Strip terminal chrome |
| `src/components/home/TestimonialsCard.tsx` | Delete |
| `src/components/home/ParticleBackground.tsx` | Delete (unused after Home refactor) |
| `src/components/home/InteractiveGradient.tsx` | Delete (unused after Home refactor) |
| `src/components/layout/Navigation.tsx` | Restyle to new tokens |
| `src/components/layout/Footer.tsx` | Restyle to new tokens |

After approval, I'll implement everything in one pass and you can review in the preview.
