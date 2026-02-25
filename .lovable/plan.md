

# Home Page Dashboard Redesign

## Problem Analysis

1. **"View all" link** is tiny muted text -- easy to miss entirely
2. **Dashboard section** crams 5 widgets into a single terminal card with a basic 2x2 grid -- looks like a first prototype, not a polished portfolio
3. **Location widget** is unnecessary (user confirmed)
4. **Dark mode toggle** is buried inside the dashboard -- it's a global action that belongs in the navigation
5. The current layout lacks visual hierarchy -- everything is the same size and weight

## Design Approach

Inspired by the Jason Cameron reference (bento-grid with distinct cards, bold typography for metrics, playful interactions), but adapted to the existing terminal/monospace aesthetic.

---

## Changes

### 1. Featured Projects -- Add a visible "View All" button

Remove the tiny top-right "View all" link. Add a proper styled button below the project cards grid:

```text
[ Featured Projects ]
+------------------+  +------------------+
|  Covid-19        |  |  Netflix         |
+------------------+  +------------------+

      [ View All Projects -> ]     <-- centered button
```

### 2. Move Dark Mode Toggle to Navigation Bar

Add a small sun/moon icon button to the right side of the navbar (next to the nav links on desktop, in the mobile menu on mobile). This frees it from the dashboard and makes it globally accessible.

**Files changed:** `Navigation.tsx` -- add toggle button using `useTheme` hook.

### 3. Redesign Dashboard as a Bento Grid

Replace the single `DashboardCard` terminal card with a **bento-style grid** of individual cards. Each widget gets its own card with distinct visual weight.

**Layout (3-column on desktop, stacked on mobile):**

```text
+---------------------+  +-------------------------+
|   PAGE VIEWS        |  |      CLICK COUNTER      |
|   862               |  |   784,320               |
|   total visitors    |  |   [ CLICK ME ]           |
|                     |  |   you've clicked 116x   |
+---------------------+  +-------------------------+
+---------------------+  +-------------------------+
|   TIME ON SITE      |  |     services.json       |
|   00:01:13          |  |   (existing services    |
|   this session      |  |    card, unchanged)     |
+---------------------+  +-------------------------+
```

**Key design decisions:**
- **Page Views card**: Large bold number with a subtle animated counter effect, eye icon
- **Click Counter card**: Hero-sized number + a prominent "CLICK ME" button styled with primary color, personal click count below -- the fun/interactive centerpiece
- **Time on Site card**: Clean monospace timer, minimal
- **Services card**: Stays as-is, it's already well-designed
- Remove location entirely
- Remove dark mode from here (moved to navbar)

Each card uses the existing `terminal-card` styling with the orange/blue/purple dots header for consistency.

### 4. Technical Details

**Files to modify:**
- `src/components/layout/Navigation.tsx` -- Add theme toggle button (sun/moon icon)
- `src/components/home/DashboardCard.tsx` -- Complete rewrite into bento grid with 3 separate sub-cards (PageViewsCard, ClickCounterCard, TimeCard) or inline them
- `src/pages/Home.tsx` -- Update Featured Projects section (remove top "View all", add bottom button), restructure dashboard grid layout to accommodate bento cards

**Files unchanged:**
- `ServicesCard.tsx` -- Stays as-is
- `useSiteStats.ts` -- No changes needed, same data
- `useTheme.tsx` -- Already exists, will be used in Navigation

**No new dependencies needed.** All icons come from lucide-react already installed.

