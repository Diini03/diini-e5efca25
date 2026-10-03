import { useEffect, useState } from "react";
import { adminClient } from "@/lib/adminClient";
import { PROJECT_CATEGORIES, POST_CATEGORIES, slugify, type DbPost, type DbProject } from "@/lib/content";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Star } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = adminClient as any;
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await adminClient.storage.from("content").upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data, error: e2 } = await adminClient.storage.from("content").createSignedUrl(path, TEN_YEARS);
  if (e2 || !data) throw e2 ?? new Error("no url");
  return data.signedUrl;
}

const input = "w-full bg-muted/40 border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary";
const label = "block text-[10px] uppercase tracking-widest text-muted-foreground mb-1";

function Field({ name, children }: { name: string; children: React.ReactNode }) {
  return <label className="block"><span className={label}>{name}</span>{children}</label>;
}

function Toggle({ on, set, text }: { on: boolean; set: (v: boolean) => void; text: string }) {
  return (
    <button type="button" onClick={() => set(!on)}
      className={`text-xs rounded-md border px-3 py-1.5 ${on ? "border-primary/60 text-primary bg-primary/10" : "border-border text-muted-foreground"}`}>
      {on ? "●" : "○"} {text}
    </button>
  );
}

function ImagePick({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex items-center gap-3">
      {value && <img src={value} alt="" className="h-14 w-24 object-cover rounded border border-border" />}
      <label className="inline-flex items-center gap-1.5 text-xs border border-border rounded-md px-3 py-1.5 cursor-pointer hover:border-primary">
        <Upload className="w-3.5 h-3.5" /> {busy ? "uploading…" : value ? "replace" : "upload"}
        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
          const f = e.target.files?.[0]; if (!f) return;
          setBusy(true);
          try { onChange(await uploadImage(f)); } catch { alert("Upload failed"); }
          setBusy(false); e.target.value = "";
        }} />
      </label>
      {value && <button type="button" onClick={() => onChange(null)} className="text-xs text-muted-foreground hover:text-destructive">remove</button>}
    </div>
  );
}

function InsertImage({ onInsert }: { onInsert: (md: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <label className="inline-flex items-center gap-1.5 text-[11px] text-primary cursor-pointer">
      <Upload className="w-3 h-3" /> {busy ? "uploading…" : "insert image"}
      <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
        const f = e.target.files?.[0]; if (!f) return;
        const cap = prompt("Image caption (optional)") ?? "";
        setBusy(true);
        try { onInsert(`\n\n![${cap}](${await uploadImage(f)})\n\n`); } catch { alert("Upload failed"); }
        setBusy(false); e.target.value = "";
      }} />
    </label>
  );
}

const bodyHelp = "Blank line = new paragraph · start a line with ## for a heading · > for a quote";

/* ---------------- generic list ---------------- */

function useRows<T>(table: string, order: string) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    const { data } = await db.from(table).select("*").order(order, { ascending: false });
    setRows(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return { rows, loading, load };
}

type Row = { id: string; title: string; slug: string; published: boolean; featured: boolean };

function List<T extends Row>({ table, rows, loading, load, onEdit, onNew, sub }: {
  table: string; rows: T[]; loading: boolean; load: () => void; onEdit: (r: T) => void; onNew: () => void; sub: (r: T) => string;
}) {
  const toggle = async (r: T) => { await db.from(table).update({ published: !r.published }).eq("id", r.id); load(); };
  const del = async (r: T) => { if (!confirm(`Delete "${r.title}"?`)) return; await db.from(table).delete().eq("id", r.id); load(); };
  return (
    <section className="terminal-card">
      <div className="flex items-center justify-between p-4 border-b border-border/60">
        <span className="text-xs text-muted-foreground">{rows.length} items</span>
        <button onClick={onNew} className="inline-flex items-center gap-1.5 text-xs text-primary border border-primary/40 rounded-md px-2.5 py-1 hover:bg-primary/10">
          <Plus className="w-3.5 h-3.5" /> new
        </button>
      </div>
      {loading ? <p className="p-6 text-sm text-muted-foreground">loading…</p> : (
        <ul>
          {rows.map((r) => (
            <li key={r.id} className="flex items-center gap-3 p-3 border-t border-border/40 first:border-t-0">
              <div className="min-w-0 flex-1">
                <div className="text-sm truncate flex items-center gap-2">
                  {r.featured && <Star className="w-3 h-3 text-primary shrink-0" />}{r.title}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">/{r.slug} · {sub(r)}</div>
              </div>
              <span className={`text-[11px] ${r.published ? "text-primary" : "text-muted-foreground"}`}>{r.published ? "● live" : "○ draft"}</span>
              <button title={r.published ? "Hide" : "Publish"} onClick={() => toggle(r)} className="p-1.5 text-muted-foreground hover:text-foreground">
                {r.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button title="Edit" onClick={() => onEdit(r)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
              <button title="Delete" onClick={() => del(r)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </li>
          ))}
          {!rows.length && <li className="p-6 text-center text-sm text-muted-foreground">nothing yet — click “new”</li>}
        </ul>
      )}
    </section>
  );
}

function FormShell({ title, onClose, onSave, saving, err, children }: {
  title: string; onClose: () => void; onSave: () => void; saving: boolean; err: string; children: React.ReactNode;
}) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="terminal-card">
      <div className="flex items-center justify-between p-4 border-b border-border/60">
        <span className="text-sm text-primary">{title}</span>
        <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
      </div>
      <div className="p-5 space-y-4">{children}</div>
      <div className="flex items-center justify-end gap-3 p-4 border-t border-border/60">
        {err && <span className="text-xs text-destructive mr-auto">✗ {err}</span>}
        <button type="button" onClick={onClose} className="text-xs text-muted-foreground">cancel</button>
        <button disabled={saving} className="text-xs rounded-md border border-primary/50 text-primary px-4 py-1.5 hover:bg-primary/10 disabled:opacity-50">
          {saving ? "saving…" : "$ save"}
        </button>
      </div>
    </form>
  );
}

/* ---------------- projects ---------------- */

const emptyProject: Partial<DbProject> = {
  title: "", slug: "", description: "", category: PROJECT_CATEGORIES[0], stack: [], cover_url: null,
  live_url: "", github_url: "", body: "", featured: false, published: true, sort_order: 0,
};

export function ProjectsManager() {
  const list = useRows<DbProject>("projects", "created_at");
  const [edit, setEdit] = useState<Partial<DbProject> | null>(null);
  const [stackText, setStackText] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const open = (p: Partial<DbProject>) => { setEdit(p); setStackText((p.stack ?? []).join(", ")); setErr(""); };
  const set = (k: keyof DbProject, v: unknown) => setEdit((e) => ({ ...e!, [k]: v }));

  const save = async () => {
    if (!edit) return;
    const title = edit.title?.trim() ?? "";
    if (!title) return setErr("title is required");
    const row = {
      title, slug: slugify(edit.slug || title), description: edit.description?.trim() ?? "",
      category: edit.category, stack: stackText.split(",").map((s) => s.trim()).filter(Boolean),
      cover_url: edit.cover_url || null, live_url: edit.live_url?.trim() || null, github_url: edit.github_url?.trim() || null,
      body: edit.body ?? "", featured: !!edit.featured, published: !!edit.published, sort_order: Number(edit.sort_order) || 0,
    };
    setSaving(true); setErr("");
    const { error } = edit.id ? await db.from("projects").update(row).eq("id", edit.id) : await db.from("projects").insert(row);
    setSaving(false);
    if (error) return setErr(error.message.includes("duplicate") ? "that slug is already used" : error.message);
    setEdit(null); list.load();
  };

  if (edit) return (
    <FormShell title={edit.id ? "edit project" : "new project"} onClose={() => setEdit(null)} onSave={save} saving={saving} err={err}>
      <div className="grid md:grid-cols-2 gap-4">
        <Field name="Title *"><input className={input} value={edit.title ?? ""} onChange={(e) => set("title", e.target.value)} /></Field>
        <Field name="Link name (auto if empty)"><input className={input} value={edit.slug ?? ""} placeholder={slugify(edit.title ?? "")} onChange={(e) => set("slug", e.target.value)} /></Field>
      </div>
      <Field name="Short description"><textarea rows={2} className={input} value={edit.description ?? ""} onChange={(e) => set("description", e.target.value)} /></Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field name="Category">
          <select className={input} value={edit.category} onChange={(e) => set("category", e.target.value)}>
            {PROJECT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field name="Tech stack (comma separated)"><input className={input} value={stackText} placeholder="Python, Pandas, Power BI" onChange={(e) => setStackText(e.target.value)} /></Field>
        <Field name="Live link"><input className={input} value={edit.live_url ?? ""} placeholder="https://" onChange={(e) => set("live_url", e.target.value)} /></Field>
        <Field name="GitHub link"><input className={input} value={edit.github_url ?? ""} placeholder="https://github.com/…" onChange={(e) => set("github_url", e.target.value)} /></Field>
      </div>
      <Field name="Cover image"><ImagePick value={edit.cover_url ?? null} onChange={(v) => set("cover_url", v)} /></Field>
      <div>
        <div className="flex justify-between items-end mb-1"><span className={label}>Full write-up</span><InsertImage onInsert={(md) => set("body", (edit.body ?? "") + md)} /></div>
        <textarea rows={12} className={input} value={edit.body ?? ""} onChange={(e) => set("body", e.target.value)} />
        <p className="text-[10px] text-muted-foreground mt-1">{bodyHelp}</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <Toggle on={!!edit.published} set={(v) => set("published", v)} text="published" />
        <Toggle on={!!edit.featured} set={(v) => set("featured", v)} text="featured on home" />
      </div>
    </FormShell>
  );

  return <List<DbProject> table="projects" {...list} onEdit={open} onNew={() => open(emptyProject)} sub={(r) => r.category} />;
}

/* ---------------- blog ---------------- */

const today = () => new Date().toISOString().slice(0, 10);
const emptyPost = (): Partial<DbPost> => ({
  title: "", slug: "", excerpt: "", category: POST_CATEGORIES[0], cover_url: null, body: "",
  medium_url: "", linkedin_url: "", substack_url: "", featured: false, published: true, published_at: today(),
});

export function PostsManager() {
  const list = useRows<DbPost>("blog_posts", "published_at");
  const [edit, setEdit] = useState<Partial<DbPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const set = (k: keyof DbPost, v: unknown) => setEdit((e) => ({ ...e!, [k]: v }));

  const save = async () => {
    if (!edit) return;
    const title = edit.title?.trim() ?? "";
    if (!title) return setErr("title is required");
    if (!edit.body?.trim()) return setErr("write something in the body");
    const row = {
      title, slug: slugify(edit.slug || title), excerpt: edit.excerpt?.trim() || edit.body!.trim().slice(0, 220),
      category: edit.category, cover_url: edit.cover_url || null, body: edit.body,
      medium_url: edit.medium_url?.trim() || null, linkedin_url: edit.linkedin_url?.trim() || null, substack_url: edit.substack_url?.trim() || null,
      featured: !!edit.featured, published: !!edit.published, published_at: edit.published_at || today(),
    };
    setSaving(true); setErr("");
    const { error } = edit.id ? await db.from("blog_posts").update(row).eq("id", edit.id) : await db.from("blog_posts").insert(row);
    setSaving(false);
    if (error) return setErr(error.message.includes("duplicate") ? "that slug is already used" : error.message);
    setEdit(null); list.load();
  };

  if (edit) return (
    <FormShell title={edit.id ? "edit post" : "new post"} onClose={() => setEdit(null)} onSave={save} saving={saving} err={err}>
      <div className="grid md:grid-cols-2 gap-4">
        <Field name="Title *"><input className={input} value={edit.title ?? ""} onChange={(e) => set("title", e.target.value)} /></Field>
        <Field name="Link name (auto if empty)"><input className={input} value={edit.slug ?? ""} placeholder={slugify(edit.title ?? "")} onChange={(e) => set("slug", e.target.value)} /></Field>
        <Field name="Category">
          <select className={input} value={edit.category} onChange={(e) => set("category", e.target.value)}>
            {POST_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field name="Publish date"><input type="date" className={input} value={edit.published_at ?? today()} onChange={(e) => set("published_at", e.target.value)} /></Field>
      </div>
      <Field name="Short excerpt (auto if empty)"><textarea rows={2} className={input} value={edit.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} /></Field>
      <Field name="Cover image"><ImagePick value={edit.cover_url ?? null} onChange={(v) => set("cover_url", v)} /></Field>
      <div>
        <div className="flex justify-between items-end mb-1"><span className={label}>Body *</span><InsertImage onInsert={(md) => set("body", (edit.body ?? "") + md)} /></div>
        <textarea rows={16} className={input} value={edit.body ?? ""} onChange={(e) => set("body", e.target.value)} />
        <p className="text-[10px] text-muted-foreground mt-1">{bodyHelp}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Field name="Medium link"><input className={input} value={edit.medium_url ?? ""} onChange={(e) => set("medium_url", e.target.value)} /></Field>
        <Field name="LinkedIn link"><input className={input} value={edit.linkedin_url ?? ""} onChange={(e) => set("linkedin_url", e.target.value)} /></Field>
        <Field name="Substack link"><input className={input} value={edit.substack_url ?? ""} onChange={(e) => set("substack_url", e.target.value)} /></Field>
      </div>
      <div className="flex flex-wrap gap-2">
        <Toggle on={!!edit.published} set={(v) => set("published", v)} text="published" />
        <Toggle on={!!edit.featured} set={(v) => set("featured", v)} text="featured on home" />
      </div>
    </FormShell>
  );

  return <List<DbPost> table="blog_posts" {...list} onEdit={(r) => { setEdit(r); setErr(""); }} onNew={() => { setEdit(emptyPost()); setErr(""); }} sub={(r) => `${r.category} · ${r.published_at}`} />;
}
