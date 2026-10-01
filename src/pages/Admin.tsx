import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Lock, Download } from "lucide-react";

type Sub = { id: string; email: string; source: string | null; subscribed: boolean; created_at: string };

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    document.title = "root";
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => { data.subscription.unsubscribe(); meta.remove(); };
  }, []);

  if (!ready) return null;
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      {session ? <Dashboard /> : <Login />}
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setErr("access denied");
    setBusy(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={submit} className="terminal-card w-full max-w-sm">
        <div className="terminal-header">
          <div className="flex items-center gap-1.5">
            <div className="terminal-dot terminal-dot-orange" />
            <div className="terminal-dot terminal-dot-blue" />
            <div className="terminal-dot terminal-dot-purple" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">sudo / login</span>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-primary text-sm"><Lock className="w-4 h-4" /> root access</div>
          <input type="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-muted/40 border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
          <input type="password" required placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-muted/40 border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
          {err && <p className="text-xs text-destructive">✗ {err}</p>}
          <button disabled={busy} className="w-full rounded-md border border-primary/50 text-primary py-2 text-sm hover:bg-primary/10 transition-colors disabled:opacity-50">
            {busy ? "authenticating…" : "$ login"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Dashboard() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [stats, setStats] = useState<{ total_views: number; total_clicks: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const [s, st] = await Promise.all([
        supabase.from("subscribers").select("id,email,source,subscribed,created_at").order("created_at", { ascending: false }),
        supabase.from("site_stats").select("total_views,total_clicks").eq("id", 1).maybeSingle(),
      ]);
      setSubs((s.data as Sub[]) ?? []);
      setStats(st.data ?? null);
      setLoading(false);
    })();
  }, []);

  const r = useMemo(() => {
    const active = subs.filter((s) => s.subscribed).length;
    const week = Date.now() - 7 * 864e5;
    const thisWeek = subs.filter((s) => new Date(s.created_at).getTime() > week).length;
    const sources: Record<string, number> = {};
    subs.forEach((s) => { const k = s.source || "unknown"; sources[k] = (sources[k] || 0) + 1; });
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - (13 - i));
      const n = subs.filter((s) => new Date(s.created_at).toDateString() === d.toDateString()).length;
      return { d, n };
    });
    return { active, unsub: subs.length - active, thisWeek, sources, days, max: Math.max(1, ...days.map((x) => x.n)) };
  }, [subs]);

  const filtered = subs.filter((s) => s.email.includes(q.toLowerCase()));

  const exportCsv = () => {
    const rows = [["email", "source", "status", "subscribed_at"], ...subs.map((s) => [s.email, s.source ?? "", s.subscribed ? "active" : "unsubscribed", s.created_at])];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "subscribers.csv"; a.click();
  };

  const Stat = ({ label, value }: { label: string; value: string | number }) => (
    <div className="terminal-card p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="text-2xl text-foreground mt-1">{value}</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">root@diinikahiye:~#</div>
          <h1 className="text-xl text-primary">./report</h1>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <LogOut className="w-3.5 h-3.5" /> logout
        </button>
      </header>

      {loading ? <p className="text-sm text-muted-foreground">loading…</p> : (
        <>
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Subscribers" value={r.active} />
            <Stat label="New · 7 days" value={`+${r.thisWeek}`} />
            <Stat label="Unsubscribed" value={r.unsub} />
            <Stat label="Page views" value={stats?.total_views.toLocaleString() ?? "—"} />
          </section>

          <section className="grid md:grid-cols-3 gap-3">
            <div className="terminal-card p-4 md:col-span-2">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Signups · last 14 days</div>
              <div className="flex items-end gap-1.5 h-24">
                {r.days.map(({ d, n }) => (
                  <div key={d.toISOString()} className="flex-1 h-full flex flex-col justify-end" title={`${d.toDateString()}: ${n}`}>
                    <div className="w-full rounded-sm bg-primary/70" style={{ height: `${(n / r.max) * 100}%`, minHeight: 2 }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="terminal-card p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Sources</div>
              <ul className="space-y-1.5 text-sm">
                {Object.entries(r.sources).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                  <li key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span>{v}</span></li>
                ))}
                {!subs.length && <li className="text-muted-foreground">—</li>}
              </ul>
            </div>
          </section>

          <section className="terminal-card">
            <div className="flex items-center justify-between gap-3 p-4 border-b border-border/60">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="grep email…"
                className="bg-transparent text-sm outline-none flex-1 min-w-0" />
              <button onClick={exportCsv} className="inline-flex items-center gap-1.5 text-xs text-primary border border-primary/40 rounded-md px-2.5 py-1 hover:bg-primary/10">
                <Download className="w-3.5 h-3.5" /> csv
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  <tr><th className="text-left p-3">Email</th><th className="text-left p-3">Source</th><th className="text-left p-3">Status</th><th className="text-right p-3">Date</th></tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="border-t border-border/40">
                      <td className="p-3 break-all">{s.email}</td>
                      <td className="p-3 text-muted-foreground">{s.source ?? "—"}</td>
                      <td className="p-3">{s.subscribed ? <span className="text-primary">● active</span> : <span className="text-muted-foreground">○ left</span>}</td>
                      <td className="p-3 text-right text-muted-foreground whitespace-nowrap">{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {!filtered.length && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">no results</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
