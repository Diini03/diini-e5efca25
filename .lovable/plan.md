# Splash Redesign + New Dashboards Page

## 1. New splash: animated hex loader

Replace the current DK-in-a-rounded-square mark with a single geometric loader:

- A hexagon outline that continuously draws/rotates (stroke-dash animation on the hex path) — this doubles as the loading indicator, so the separate progress bar goes away.
- A second, fainter hexagon rotating the opposite way for depth.
- Centered monogram **DK** in a distinctive display font (Space Grotesk, loaded alongside the existing JetBrains Mono) with wide letter-spacing, fading/scaling in once.
- Below it, the terminal line `~/Diini Kahiye` with blinking cursor stays.
- Reduced-motion: static hexagon, no rotation.
- Duration stays short (~0.9s total).

Files: `src/components/LogoMark.tsx` (rewritten as the hex mark), `src/components/layout/SplashScreen.tsx`, `src/index.css` (hex-draw / counter-rotate keyframes, font import).

## 2. New page: /dashboards

A gallery page — images only, not projects.

- Route `/dashboards` added in `src/App.tsx`, plus a "Dashboards" link in desktop + mobile nav.
- Header: short intro line stating all dashboards are built in Power BI with Power Query transformations. Small tool chips (Power BI, Power Query, DAX).
- Responsive grid of dashboard thumbnails (2 per row desktop, 1 mobile) in the existing terminal-card style, each with just a short title — no descriptions, no case studies, no links.
- Starting set (3 uploaded images):
  1. Somalia Displacement Forecast Dashboard
  2. Somalia IDPs Movement Dashboard
  3. Prime Video Content Dashboard
- Clicking a thumbnail opens a centered modal viewer: image capped at ~80% viewport (smaller than fullscreen), dark backdrop, left/right arrows to move between dashboards, arrow-key + Esc support, counter like `2 / 3`.
- SEO block for the page (title, description, canonical) using the existing `Seo` component; sitemap entry added.

Structured so more dashboards and chart images can be appended later by adding entries to one data array.

## Technical notes

- New files: `src/pages/Dashboards.tsx`, `src/data/dashboards.ts`, `src/components/dashboards/DashboardViewer.tsx`.
- Uploaded PNGs registered via the asset CLI into `src/assets/dashboards/` as asset pointers (keeps repo light), lazy-loaded with `decoding="async"`.
- Viewer is self-contained (no dependency on the blog Lightbox), so blog behavior is untouched.
