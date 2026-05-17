## Refinement Plan v1.2

Goal: make the portfolio feel more intentional and professional. Remove dark mode (no one uses it), promote the resume to the nav, calm the background, and rebalance Home + About content. Preserve identity: terminal aesthetic, orange `#EA580C`, `max-w-4xl`, terminal cards, splash, click counter.

---

### 1. Remove dark mode — lock to one polished light theme

**Decision:** keep **light mode only** (current default). It matches the editorial / data-science direction better than the dark variant and reads more professional in screenshots and shares.

- `src/hooks/useTheme.tsx` — delete (or stub) the toggle; force `light`, never add `.dark` class, never read/write `localStorage`.
- `src/index.css` — remove the entire `.dark { ... }` block and the `.dark .bg-grid` override. Keep only the `:root` light tokens.
- `src/components/layout/Navigation.tsx` — remove `useTheme` import, the desktop `Sun/Moon` toggle button, and the mobile "Light/Dark Mode" row + divider.
- Polish the single light theme slightly for a more "pro" feel:
  - `--background: 210 25% 98%` (a touch cleaner)
  - `--foreground: 220 25% 15%` (stronger text contrast)
  - `--muted-foreground: 220 12% 40%` (more legible secondary text)
  - `--border: 220 14% 88%` (softer dividers)

### 2. Replace "Download My CV" hero button with a "Resume" nav button

- `src/pages/Home.tsx` — delete the `Download My CV` button block from the hero section. Keep the bio + GitHub/LinkedIn/More-about-me row.
- `src/components/layout/Navigation.tsx` — add a `Resume` pill (last item, visually distinct: `border border-primary/40 text-primary hover:bg-primary/10`, small `FileText` icon) on desktop, opening `/cv.html` in a new tab. In the mobile overlay, add the same as the final menu item below the nav links (no theme toggle there anymore).
- `src/pages/About.tsx` — keep the existing "Download My CV" button there (it's contextually correct on About). Unchanged.

### 3. Soften the grid background

- `src/index.css` `.bg-grid` — reduce opacity from `0.04` → `0.018`, and increase tile from `48px` → `64px`. Result: barely-there structure instead of a visible grid. The dark override is gone with step 1.

### 4. Home — restructure Writing + add a quiet Experience/Education strip

**4a. Writing section — curate which posts appear:**
- Add an `featuredOnHome: boolean` flag to each entry in `src/pages/Blog.tsx`'s `blogPosts` array (single source of truth — no duplicated list in `Home.tsx`).
- Default `true` for the current 3 (`world-happiness-report`, `tech-trends-2025`, `ai-vs-ml`).
- `src/pages/Home.tsx` imports `blogPosts`, filters `featuredOnHome`, takes the first 3, renders the same editorial rows. To "change which ones show," you flip the flag in `Blog.tsx`. (Lightweight, no UI/admin, no DB — matches the "no over-engineering" constraint.)
- Visual refinement: tighten row spacing (`py-3`), date in tabular-nums, hover moves a small `→` arrow in from the right.

**4b. New "Background" strip (Experience + Education) — between Selected Work and Writing:**
- Compact, two-column on `md`, single column on mobile. No icons-in-circles, no timeline rail. Pure editorial:
  - Left column header: `EXPERIENCE` (10px tracking-[0.2em] uppercase muted)
  - Two rows: role · org · date (one line each), one-line description below in muted.
  - Right column header: `EDUCATION` — one row (BSc Computer Science · SNU · 2021–2026).
- Data lives in a new file `src/components/home/BackgroundStrip.tsx` (self-contained, easy to edit). Pulls from a short inline array — does not import the heavier `About.tsx` data.

**New Home section order:**
Hero → Selected Work → **Background (Experience + Education)** → Writing → Quick Stats → Click Counter.

### 5. About — slim "Currently Learning" and "Skills & Technologies"

- **Currently Learning:** remove entirely from About (it duplicates intent of Skills and feels like filler). Delete the `<CurrentlyLearning />` import + render. (Component file kept on disk in case of future reuse.)
- **Skills & Technologies:** collapse 6 category cards → **one** clean block:
  - Section title kept.
  - Replace the grid of `terminal-card` boxes with a single editorial layout: each category is a row — left side small uppercase label (`LANGUAGES`, `DATA`, `DATABASES`, `WEB`, `AI TOOLS`, `TOOLS`), right side inline chips on one line (`text-xs`, no card backgrounds, just `border border-border/60 rounded px-2 py-0.5`). Result: same info, ~1/3 the vertical space, much more "senior" feel.
- Keep Experience & Education and Certifications sections as-is.

### 6. Memory updates

- Remove dark-mode references in `mem://index.md` ("Theme: Default light mode" → "Theme: Light mode only, dark mode removed").
- Add constraint: "Dark mode removed. Do not re-add toggle or `.dark` styles."
- Update Home order memory: Hero → Selected Work → Background → Writing → Quick Stats → Click Counter.
- Update About description (no Currently Learning, slim Skills).
- Retire/update: `Navigation Theme Toggle`, `Smooth Theme Transition` (keep transition but note no theme switching), `Currently Learning` memory.

---

### Files touched

- edit `src/index.css` (remove `.dark`, soften tokens, soften grid)
- edit `src/hooks/useTheme.tsx` (stub to always-light, or delete usages)
- edit `src/components/layout/Navigation.tsx` (remove toggle, add Resume button desktop + mobile)
- edit `src/pages/Home.tsx` (drop CV button, reorder, source blogs from Blog.tsx, render BackgroundStrip)
- new `src/components/home/BackgroundStrip.tsx`
- edit `src/pages/Blog.tsx` (add `featuredOnHome` to data + export)
- edit `src/pages/About.tsx` (remove CurrentlyLearning, restructure Skills)
- edit `mem://index.md` + small memory edits

### Not changing

Hero copy, splash, click counter, particles, interactive gradient, terminal cards, footer, project cards, Contact, BlogPost, ProjectDetail, color `#EA580C`, `max-w-4xl` width, fonts, splash, page transitions.
