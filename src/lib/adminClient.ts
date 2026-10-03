import { createClient } from "@supabase/supabase-js";

// Separate client for /admin: the session lives in memory only, so it is never
// remembered — every visit to /admin (or reload) requires signing in again.
const memory = new Map<string, string>();
export const adminClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storageKey: "admin-mem-session",
      persistSession: false,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storage: {
        getItem: (k) => memory.get(k) ?? null,
        setItem: (k, v) => void memory.set(k, v),
        removeItem: (k) => void memory.delete(k),
      },
    },
  },
);
