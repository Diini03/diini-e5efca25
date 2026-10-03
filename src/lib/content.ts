import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/pages/Blog";
import { SUBSTACK_URL } from "@/lib/links";

// Tables are managed from the admin panel. Untyped access keeps this independent of generated types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export const PROJECT_CATEGORIES = [
  "Business Intelligence",
  "Machine Learning",
  "Data Analysis",
  "Product Engineering",
  "SQL & Business Analysis",
] as const;

export const POST_CATEGORIES = ["data-analysis", "machine-learning", "tech", "career", "tutorials"] as const;

export type DbProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  stack: string[];
  cover_url: string | null;
  live_url: string | null;
  github_url: string | null;
  body: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export type DbPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_url: string | null;
  body: string;
  medium_url: string | null;
  linkedin_url: string | null;
  substack_url: string | null;
  featured: boolean;
  published: boolean;
  published_at: string;
  created_at: string;
};

export function useDbProjects() {
  return useQuery({
    queryKey: ["db-projects"],
    queryFn: async (): Promise<DbProject[]> => {
      const { data } = await db.from("projects").select("*").eq("published", true).order("sort_order").order("created_at", { ascending: false });
      return data ?? [];
    },
    staleTime: 60_000,
  });
}

export function useDbPosts() {
  return useQuery({
    queryKey: ["db-posts"],
    queryFn: async (): Promise<DbPost[]> => {
      const { data } = await db.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false });
      return data ?? [];
    },
    staleTime: 60_000,
  });
}

export function useDbProject(slug?: string) {
  return useQuery({
    queryKey: ["db-project", slug],
    enabled: !!slug,
    queryFn: async (): Promise<DbProject | null> => {
      const { data } = await db.from("projects").select("*").eq("slug", slug).eq("published", true).maybeSingle();
      return data ?? null;
    },
  });
}

export function useDbPost(slug?: string) {
  return useQuery({
    queryKey: ["db-post", slug],
    enabled: !!slug,
    queryFn: async (): Promise<DbPost | null> => {
      const { data } = await db.from("blog_posts").select("*").eq("slug", slug).eq("published", true).maybeSingle();
      return data ?? null;
    },
  });
}

export function readTime(text: string) {
  return `${Math.max(1, Math.round(text.split(/\s+/).length / 200))} min read`;
}

export function dbPostToBlogPost(p: DbPost): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.published_at,
    readTime: readTime(p.body),
    tags: [p.category],
    linkedinUrl: p.medium_url || p.linkedin_url || p.substack_url || SUBSTACK_URL,
    source: p.linkedin_url && !p.medium_url ? "linkedin" : "medium",
    externalUrl: p.medium_url || p.linkedin_url || p.substack_url || undefined,
    featuredOnHome: p.featured,
  };
}

export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
