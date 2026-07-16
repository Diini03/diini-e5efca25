# UI refinements: Writing carousel, Blog list, BlogPost layouts

Frontend/presentation only. No data model changes, no new dependencies.

## 1. Home Writing carousel — shorten left-rail titles

File: `src/components/home/WritingCarousel.tsx`

Two of the featured Medium posts have long compound titles that stretch the left rail taller than the right pane, creating the height mismatch.

- Add a small helper `displayTitle(title)` that returns the substring before the first `—` (em dash), trimmed. If no dash, returns the title as-is.
- Use it only in the **left rail buttons** (desktop) and the **mobile chips**. The right pane keeps the full `active.title`.

Result: 
- "Correlation vs Causation — The mistake every beginner makes reading data" → "Correlation vs Causation"
- "What is a model — and why two AIs can give you completely different answers?" → "What is a model"

No data edits — purely a render-time trim, so Blog page and BlogPost titles stay untouched.

## 2. Blog list — two card styles by source

File: `src/pages/Blog.tsx`

Currently every card renders identically (text-only). Split the render by `post.source`:

- **Medium / write-only posts** (`source === "medium"` or undefined): keep the current text-only card exactly as it is.
- **LinkedIn carousel posts** (`source === "linkedin"`): render a card with an **image header** on top (16:9, `object-cover`, rounded top corners) followed by the same text block.

Image resolution:
- Import all files in `src/assets/blog/` via a `blogImages` map keyed by slug (e.g. `sql-joins` → `sql-joins.png`).
- Slugs without a matching image (e.g. `what-makes-dataset-useful` exists, `ml-learn-from-mistakes` exists — all current LinkedIn posts have images) fall back to a subtle placeholder gradient block so the grid never breaks.

Grid stays `sm:grid-cols-2 lg:grid-cols-3`. Mixed heights are handled by `h-full flex flex-col` (already present).

## 3. BlogPost detail — newspaper layout for LinkedIn carousels

File: `src/pages/BlogPost.tsx`

Split the render path by `post.source`:

### Medium posts (unchanged, minor polish)
- Keep the current ebook layout: `max-w-2xl`, drop-cap on first letter, mid-body "Continue on Medium" CTA. Untouched.

### LinkedIn carousel posts (new newspaper layout)
- Container widens to `max-w-4xl` for a broader editorial feel.
- Masthead: small uppercase category label, large serif-weight title, thin rule under the meta row.
- Body region uses **CSS float** for a true newspaper wrap:
  - Add a `<figure>` with the carousel cover image `float-left mr-6 mb-3 w-full sm:w-1/2 md:w-[55%]`, rounded, with a small italic caption underneath (`"LinkedIn carousel — {date}"`).
  - Following `<p>` tags flow around the image; once the image ends, remaining paragraphs occupy the full column width automatically (that's exactly the newspaper effect the reference image shows).
  - First paragraph gets a smaller, distinct drop-cap style (serif, boxed) so it's visibly different from the Medium drop-cap (which is a large orange floated letter).
- On mobile (`< sm`), the figure becomes full-width block on top (no float) so it stays readable.
- Keep the existing "What to remember" block and LinkedIn CTA below the article.

### Technical notes / risks
- **Float + drop-cap interaction**: `first-letter` combined with `float-left` `<figure>` inside the same paragraph can cause the drop-cap to render on the wrong line. Mitigation: put the `<figure>` **before** the first `<p>` (sibling, not child), and only apply `first-letter` styling to that first paragraph. Standard newspaper pattern, no conflicts.
- **Long images**: cap `figure` height with `max-h-[420px] object-cover` so a tall carousel cover doesn't push all text below it and defeat the wrap.
- **Clearfix**: add `<div className="clear-both" />` after the paragraph loop so tags/highlights sit below the floated figure cleanly.
- **Image sizing on wide viewports**: at `max-w-4xl`, a 55% floated figure leaves ~360px of text column — enough for 5–7 words per line, which is the sweet spot for the wrap to actually look like a newspaper (not one-word ribbons).
- No changes to routing, data, or any component outside these three files.

## Files touched
- `src/components/home/WritingCarousel.tsx`
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx`
