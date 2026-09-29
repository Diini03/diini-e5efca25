import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function SubscribeForm({ source = "site", className = "" }: { source?: string; className?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "already" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    const { data, error } = await supabase.functions.invoke("subscribe", { body: { email, source } });
    if (error || data?.error) {
      setState("error");
      setMsg(data?.error ?? "Something went wrong. Please try again.");
      return;
    }
    setState(data.status === "already" ? "already" : "done");
    setEmail("");
  };

  return (
    <div className={`rounded-lg border border-border/60 bg-card/50 p-5 ${className}`}>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-1">$ subscribe</p>
      <h3 className="text-base font-semibold text-foreground mb-1">Subscribe for updates</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Get more updates about me — new articles, projects and what I'm building, straight to your inbox. No spam, unsubscribe anytime.
      </p>
      {state === "done" || state === "already" ? (
        <p className="flex items-center gap-2 text-sm text-primary">
          <Check className="w-4 h-4" />
          {state === "done" ? "You're subscribed — check your inbox." : "You're already subscribed. Thanks!"}
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              required
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="w-full pl-9 pr-3 py-2.5 bg-secondary/40 border border-border/60 rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <button
            type="submit"
            disabled={state === "loading"}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-primary/40 text-sm font-medium text-primary hover:bg-primary/10 transition-all disabled:opacity-60"
          >
            {state === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
            Subscribe
          </button>
        </form>
      )}
      {state === "error" && <p className="text-xs text-destructive mt-2">{msg}</p>}
    </div>
  );
}
