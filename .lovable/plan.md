# Gallery page: dashboards + a hidden "meet me" set

## Naming recommendation

Keep the route `/dashboards` (already indexed in the sitemap) but rename the nav label and page title to **Gallery**. "Gallery" reads modern and covers both dashboards and photos; "Pics" reads too casual for a data portfolio. A redirect isn't needed since the path stays the same.

## Layout: dashboards first

- Replace the current 2-column even grid with a **3-per-row masonry-style layout** (CSS columns: 3 on desktop, 2 on tablet, 1 on mobile).
- Tiles keep their natural aspect ratios, so sizes vary organically while the overall block stays flush — no forced crops.
- Terminal-card framing stays (dots + `dashboards / slug`), just tighter padding so images dominate.
- Click still opens the existing centered viewer with prev/next arrows and keyboard support.

## The "see me" reveal

- A small, unobtrusive pill button below the dashboards section: `$ whoami --photos` with a short label like "Curious who's behind these? Click here."
- Clicking expands a **personal section on the same page** (no route change, smooth height/fade-in, auto-scroll to it). Button toggles to "Hide photos".
- Photos render in the same masonry grid, **grayscale by default, full colour on hover** (`grayscale hover:grayscale-0`, ~0.4s transition; on touch devices colour shows on tap since hover isn't available).
- Photos open in the same viewer, but navigation is scoped to the photo set only — so a reader never drifts from dashboards into selfies by accident.
- Collapsed by default on every visit, so the page's first impression stays professional work only.

## Photos to include

The 5 uploaded images: the studio suit portrait (used as the lead tile), the white-thobe street shot, the coffee-shop shot, the evening chair shot, and the ceiling selfie. All converted to WebP and registered as CDN assets so the page stays light.

## Extra suggestions (say if you want any)

1. **Charts section** — a third group on the same page for standalone chart captures, since you mentioned adding those later.
2. **Counts in the header** — small mono line like `3 dashboards · 5 photos`.
3. **Caption on hover** for dashboard tiles (title slides up over the image) instead of a text row beneath, keeping the grid cleaner.
4. **SEO**: photos excluded from the page description and JSON-LD; the page stays positioned as a Power BI dashboard gallery.

## Technical notes

- `src/data/dashboards.ts` gains a `photos` array (same shape) and stays the single place to append items.
- `src/pages/Dashboards.tsx` handles the toggle state and renders two grids from one reusable `GalleryGrid` component.
- `DashboardViewer` takes whichever array is active — no changes to its logic beyond the item source.
- New `src/assets/gallery/*.webp` for the photos; nav label updated in `src/components/layout/Navigation.tsx`.
