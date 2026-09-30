import { useState } from "react";
import { Check, CornerDownLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PERKS = [
  "New articles, the day they're published",
  "Project launches & live demos first",
  "What I'm building and learning, unfiltered",
];

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
    <div
      className={`terminal-card relative overflow-hidden rounded-lg border border-border/60 bg-card/60 backdrop-blur-sm ${className}`}
    >
      {/* faint glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-10 w-56 h-56 rounded-full bg-primary/10 blur-3xl"
      />

      {/* terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
        <div className="terminal-dot terminal-dot-orange" />
        <div className="terminal-dot terminal-dot-blue" />
        <div className="terminal-dot terminal-dot-purple" />
        <span className="ml-2 text-[10px] font-mono text-muted-foreground tracking-wide">~/subscribe</span>
        <span className="ml-auto text-[10px] font-mono uppercase tracking-[0.2em] text-primary/80">
          broadcast
        </span>
      </div>

      <div className="grid md:grid-cols-[1.15fr_1fr] divide-y md:divide-y-0 md:divide-x divide-border/40">
        {/* left — command line */}
        <div className="p-5">
          <p className="text-[11px] font-mono text-muted-foreground mb-3 truncate">
            <span className="text-primary/80">diini@kahiye</span>
            <span className="text-muted-foreground">:~$</span>{" "}
            <span className="text-foreground/80">subscribe --email</span>
          </p>

          {state === "done" || state === "already" ? (
            <div className="font-mono text-sm">
              <p className="flex items-start gap-2 text-primary">
                <Check className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  {state === "done"
                    ? "Subscription confirmed — check your inbox."
                    : "You're already on the list. Thanks for being here."}
                </span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                <span className="text-primary/80">diini@kahiye</span>:~${" "}
                <span className="inline-block w-2 h-3.5 bg-primary/70 animate-cursor-blink" />
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="flex items-center gap-2 rounded-md border border-border/60 bg-secondary/40 px-3 py-2.5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                <span className="font-mono text-sm text-primary/80 select-none">❯</span>
                <input
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />
                {email === "" && (
                  <span
                    aria-hidden
                    className="inline-block w-2 h-3.5 bg-primary/70 animate-cursor-blink shrink-0"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={state === "loading"}
                className="group mt-3 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-primary/40 text-sm font-medium text-primary hover:bg-primary/10 hover:border-primary/60 transition-all disabled:opacity-60"
              >
                {state === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CornerDownLeft className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                )}
                Subscribe
              </button>
            </form>
          )}

          {state === "error" && <p className="text-xs text-destructive mt-2">{msg}</p>}
        </div>

        {/* right — why subscribe */}
        <div className="p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3">Why subscribe?</p>
          <ul className="space-y-2">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-xs text-foreground/90 leading-relaxed">
                <span className="font-mono text-primary/80 select-none">›</span>
                {perk}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
            One email when something's worth your time — no spam, unsubscribe anytime.
          </p>
          <p className="mt-3 font-mono text-[10px] text-muted-foreground/70 truncate">
            $ spam --filter=<span className="text-primary/80">always-on</span>
          </p>
        </div>
      </div>
    </div>
  );
}
