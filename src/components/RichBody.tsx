/** Renders simple admin-written text: blank-line paragraphs, "## " headings, "> " quotes, and ![caption](url) images. */
export function RichBody({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  let fig = 0;
  return (
    <div className="space-y-5 text-[15px] leading-[1.8] text-foreground/90 text-justify hyphens-auto">
      {blocks.map((b, i) => {
        const img = b.match(/^!\[(.*?)\]\((.+?)\)$/);
        if (img) {
          fig += 1;
          return (
            <figure key={i} className="my-8">
              <img src={img[2]} alt={img[1]} loading="lazy" className="w-full rounded-lg border border-border/60" />
              {img[1] && (
                <figcaption className="mt-2 text-xs text-muted-foreground text-center">
                  Fig. {fig} — {img[1]}
                </figcaption>
              )}
            </figure>
          );
        }
        if (b.startsWith("## ")) return <h2 key={i} className="text-xl font-semibold text-foreground pt-4 text-left">{b.slice(3)}</h2>;
        if (b.startsWith("> ")) return <blockquote key={i} className="border-l-2 border-primary pl-4 italic text-foreground text-left">{b.slice(2)}</blockquote>;
        return <p key={i} className="whitespace-pre-line">{b}</p>;
      })}
    </div>
  );
}
