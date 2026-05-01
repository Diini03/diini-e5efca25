

# Updates Plan

## 1. Fix Blog Dates -- All to 2025

Update all blog post dates from 2024 to 2025 across three files:

- **`src/pages/Blog.tsx`**: Change dates for tech-trends-2025 (`2024-12-15` to `2025-02-15`), ai-vs-ml (`2024-12-10` to `2025-02-10`), data-career-tips (`2024-11-28` to `2025-03-28`), sql-joins (`2024-11-15` to `2025-03-15`). Keep world-happiness-report, python-concepts, and numpy-pandas as they already have 2025 dates.

- **`src/pages/BlogPost.tsx`**: Same date changes for the matching blog post detail entries.

- **`src/pages/Home.tsx`**: Update `recentBlogs` array dates from "Dec 2024" to "Feb 2025" for tech-trends and ai-vs-ml.

## 2. Update Featured Projects on Home Page

In `src/pages/Home.tsx`, replace the `featuredProjects` array:
- **First**: Fall Armyworm Leaf Disease Detection (slug: `fall-armyworm-detection`, with deep learning/CNN tags)
- **Second**: Covid-19 Analysis (slug: `covid-19-analysis`, keep current data)
- Remove Netflix from featured.

## 3. Remove Tic-Tac-Toe, Replace with Something Better

**Remove:**
- Delete `src/pages/lab/TicTacToe.tsx`
- Remove TicTacToe route from `src/App.tsx`
- Remove Tic-Tac-Toe mini-game from `src/pages/Lab.tsx`

**Replace with: "Code Challenge" -- a typing speed test for code snippets.** Users see a data science code snippet and type it as fast as they can. It measures WPM (words per minute) and accuracy. This is more relevant to a data science portfolio than Tic-Tac-Toe -- it reinforces the coding theme and is actually useful/fun for the target audience.

### Lab Page Changes
- Replace the Tic-Tac-Toe card with a "Code Challenge" card that links to `/lab/code-challenge`
- Create `src/pages/lab/CodeChallenge.tsx` with:
  - A set of data science code snippets (Python/SQL/Pandas)
  - Real-time character-by-character comparison as user types
  - Timer, WPM calculation, accuracy percentage
  - Difficulty levels (short snippets vs longer ones)
  - Clean terminal-style UI matching the portfolio aesthetic

### Updated Home Page Lab Teaser
- Update description text to mention "code challenges" instead of "Tic-Tac-Toe"

## Files Summary

| File | Action |
|------|--------|
| `src/pages/Blog.tsx` | Update 4 blog dates to 2025 |
| `src/pages/BlogPost.tsx` | Update 4 blog dates to 2025 |
| `src/pages/Home.tsx` | Update featured projects, blog dates, lab description |
| `src/pages/Lab.tsx` | Remove Tic-Tac-Toe, add Code Challenge card |
| `src/pages/lab/TicTacToe.tsx` | Delete |
| `src/pages/lab/CodeChallenge.tsx` | Create new |
| `src/App.tsx` | Replace TicTacToe route with CodeChallenge route |

