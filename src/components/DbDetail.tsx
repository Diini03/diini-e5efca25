import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { RichBody } from "@/components/RichBody";
import { Seo } from "@/components/Seo";
import { useDbPost, useDbProject, readTime } from "@/lib/content";

function NotFound({ back, label }: { back: string; label: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-4">{label} not found</h1>
        <Link to={back} className="text-primary hover:underline">Go back</Link>
      </div>
    </div>
  );
}

const Loading = () => <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground font-mono">loading…</div>;

export function DbProjectDetail({ slug }: { slug: string }) {
  const { data: p, isLoading } = useDbProject(slug);
  if (isLoading) return <Loading />;
  if (!p) return <NotFound back="/projects" label="Project" />;
  return (
    <div className="min-h-screen animate-fade-in">
      <Seo title={`${p.title} | Diini Kahiye`} description={p.description} path={`/projects/${p.slug}`} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>
        <div className="terminal-card">
          <div className="terminal-header">
            <div className="flex items-center gap-1.5">
              <div className="terminal-dot terminal-dot-orange" /><div className="terminal-dot terminal-dot-blue" /><div className="terminal-dot terminal-dot-purple" />
            </div>
            <span className="text-xs text-muted-foreground ml-2 font-mono">projects / {p.slug}</span>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{p.category}</div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{p.title}</h1>
              <p className="text-muted-foreground mt-3">{p.description}</p>
            </div>
            {p.stack?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => <span key={s} className="text-[11px] font-mono px-2 py-0.5 rounded border border-border/60 text-muted-foreground">{s}</span>)}
              </div>
            )}
            {(p.live_url || p.github_url) && (
              <div className="flex flex-wrap gap-2">
                {p.live_url && <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs border border-primary/40 text-primary rounded-md px-3 py-1.5 hover:bg-primary/10"><ExternalLink className="w-3.5 h-3.5" /> Live</a>}
                {p.github_url && <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs border border-border rounded-md px-3 py-1.5 hover:border-primary"><Github className="w-3.5 h-3.5" /> Code</a>}
              </div>
            )}
            {p.cover_url && <img src={p.cover_url} alt={p.title} className="w-full rounded-lg border border-border/60" />}
            {p.body && <RichBody text={p.body} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DbPostDetail({ slug }: { slug: string }) {
  const { data: p, isLoading } = useDbPost(slug);
  if (isLoading) return <Loading />;
  if (!p) return <NotFound back="/blog" label="Post" />;
  const links = [["Medium", p.medium_url], ["LinkedIn", p.linkedin_url], ["Substack", p.substack_url]].filter(([, u]) => u) as [string, string][];
  return (
    <div className="min-h-screen animate-fade-in">
      <Seo title={`${p.title} | Diini Kahiye`} description={p.excerpt} path={`/blog/${p.slug}`} />
      <article className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to writing
        </Link>
        <div className="text-xs font-mono text-muted-foreground mb-3">
          {new Date(p.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {readTime(p.body)} · {p.category}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{p.title}</h1>
        {p.excerpt && <p className="text-lg text-muted-foreground mt-4">{p.excerpt}</p>}
        {p.cover_url && <img src={p.cover_url} alt={p.title} className="w-full max-h-96 object-cover rounded-lg border border-border/60 mt-8" />}
        <div className="mt-8"><RichBody text={p.body} /></div>
        {links.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border/40 flex flex-wrap gap-2">
            {links.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs border border-border rounded-md px-3 py-1.5 hover:border-primary">Also on {n} <ExternalLink className="w-3 h-3" /></a>)}
          </div>
        )}
      </article>
    </div>
  );
}
