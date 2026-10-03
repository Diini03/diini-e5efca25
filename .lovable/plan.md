# Admin: add projects & blog posts + stricter sign-in

## What you get
1. **Sign in every time** — opening /admin always shows the login screen. Your sign-in is not remembered: leaving the admin page (going home, closing the tab, reloading) signs you out automatically. Also auto sign-out after 15 minutes of no activity.
2. **Projects manager** in the admin panel — add, edit, hide/show and delete projects.
3. **Blog manager** in the admin panel — add, edit, publish/unpublish and delete posts.
4. New items appear on the public Projects page, Blog page, Home (if marked "featured") and get their own detail page — your existing projects and posts stay exactly as they are, new ones are added alongside.

## Admin panel layout
Tabs at the top: `report` (current subscriber stats) · `projects` · `blog`.
Each tab: a list with status (live / draft), plus "+ new" opening a simple form.

**Project form:** title, short description, category (Business Intelligence, Machine Learning, Data Analysis, Product Engineering, SQL), tech stack (comma list), cover image upload, live link, GitHub link, full write-up (plain text with paragraphs), featured on home toggle, published toggle.

**Blog form:** title, short excerpt, tag/category, cover image upload, body (paragraphs, `## ` for headings, images inline by upload), external links (Medium / LinkedIn / Substack, optional), featured on home toggle, published toggle, publish date.

## Security
- Only your admin account can create, edit or delete; visitors can only read published items.
- Image uploads go to a storage folder that only the admin can write to.
- Sign-in kept in memory only for the admin page, never saved in the browser.

## Technical details
- Tables `projects` and `blog_posts` (slug unique, published bool, featured bool, sort_order, timestamps). RLS: public SELECT where published; admin (has_role) full CRUD. GRANTs per table.
- Public storage bucket `content` with admin-only insert/update/delete policies.
- Admin page uses a separate Supabase client with `persistSession: false` (memory storage) and signs out on unmount + idle timer, so returning to /admin always requires credentials.
- Public pages fetch published rows via react-query and merge them with the static arrays; ProjectDetail/BlogPost fall back to DB lookup by slug and render a simple spec-sheet / article layout.
