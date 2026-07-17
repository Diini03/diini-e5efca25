import { useState } from "react";
import { Quote, TrendingUp, Lightbulb, ZoomIn } from "lucide-react";
import { Lightbox } from "./Lightbox";

/**
 * Editorial block system for LinkedIn carousel posts.
 * Each post declares an ordered list of blocks that render into a
 * newspaper/magazine-style layout: alternating image sides, pull quotes,
 * stat cards, callouts, and key takeaways.
 */
export type EditorialBlock =
  | { type: "lede"; text: string } // opening paragraph with drop cap
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | {
      type: "figure";
      src: string;
      alt: string;
      caption?: string;
      side: "left" | "right" | "full";
      text?: string; // paragraph that wraps beside the figure
    }
  | { type: "pullquote"; text: string; attribution?: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "callout"; title: string; body: string }
  | { type: "takeaways"; title?: string; items: string[] };

interface Props {
  blocks: EditorialBlock[];
}

export function EditorialArticle({ blocks }: Props) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  );

  return (
    <>
      <article className="editorial-article space-y-6">
        {blocks.map((b, i) => (
          <BlockRenderer key={i} block={b} onZoom={setLightbox} />
        ))}
      </article>
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

function BlockRenderer({
  block,
  onZoom,
}: {
  block: EditorialBlock;
  onZoom: (v: { src: string; alt: string }) => void;
}) {
  switch (block.type) {
    case "lede":
      return (
        <p className="font-serif text-[18px] sm:text-[19px] text-foreground/95 leading-[1.75] first-letter:font-serif first-letter:text-[4rem] first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1">
          {block.text}
        </p>
      );

    case "paragraph":
      return (
        <p className="font-serif text-[17px] text-foreground/90 leading-[1.8]">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="font-serif text-2xl font-bold text-foreground mt-4 mb-1 tracking-tight border-b border-border/50 pb-2">
          {block.text}
        </h2>
      );

    case "figure": {
      const { src, alt, caption, side, text } = block;
      // Full-width bleed
      if (side === "full" || !text) {
        return (
          <figure className="my-4">
            <button
              type="button"
              onClick={() => onZoom({ src, alt })}
              className="group relative block w-full overflow-hidden rounded-xl border border-border/60 shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Open image"
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[540px] object-cover group-hover:scale-[1.01] transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 p-1.5 rounded-full bg-background/70 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-foreground" />
              </span>
            </button>
            {caption && (
              <figcaption className="mt-2 text-[12px] italic text-muted-foreground font-serif text-center">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      }
      // Side-by-side: image + wrapping text
      const imageFirst = side === "left";
      return (
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start my-2">
          <figure className={imageFirst ? "" : "md:order-2"}>
            <button
              type="button"
              onClick={() => onZoom({ src, alt })}
              className="group relative block w-full overflow-hidden rounded-xl border border-border/60 shadow-md hover:shadow-lg transition-shadow"
              aria-label="Open image"
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[420px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 p-1.5 rounded-full bg-background/70 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-foreground" />
              </span>
            </button>
            {caption && (
              <figcaption className="mt-2 text-[11.5px] italic text-muted-foreground font-serif">
                {caption}
              </figcaption>
            )}
          </figure>
          <p
            className={`font-serif text-[17px] text-foreground/90 leading-[1.8] ${
              imageFirst ? "" : "md:order-1"
            }`}
          >
            {text}
          </p>
        </div>
      );
    }

    case "pullquote":
      return (
        <blockquote className="my-4 relative border-l-4 border-primary pl-6 py-2">
          <Quote className="absolute -top-1 -left-3 w-6 h-6 text-primary/40 bg-background rounded-full p-1" />
          <p className="font-serif text-xl sm:text-2xl italic text-foreground leading-snug">
            "{block.text}"
          </p>
          {block.attribution && (
            <cite className="block not-italic mt-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "stats":
      return (
        <div className="my-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {block.items.map((s, i) => (
            <div
              key={i}
              className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                {s.value}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      );

    case "callout":
      return (
        <aside className="my-4 rounded-xl border border-border/60 bg-secondary/40 p-5 sm:p-6">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary mb-2">
            {block.title}
          </div>
          <p className="font-serif text-[16px] text-foreground/90 leading-[1.75]">
            {block.body}
          </p>
        </aside>
      );

    case "takeaways":
      return (
        <div className="my-4 rounded-xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-primary" />
            <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
              {block.title ?? "Key Takeaways"}
            </h3>
          </div>
          <ul className="space-y-2.5">
            {block.items.map((t, i) => (
              <li
                key={i}
                className="flex gap-3 font-serif text-[15.5px] text-foreground/90 leading-relaxed"
              >
                <span className="text-primary font-mono text-xs mt-1.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
}
