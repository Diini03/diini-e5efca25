import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  /** Path only, e.g. "/projects" */
  path?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE = "https://www.diinikahiye.online";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Lightweight head manager: title, description, canonical, OG/Twitter and JSON-LD.
 */
export function Seo({ title, description, path, type = "website", jsonLd }: SeoProps) {
  useEffect(() => {
    const url = `${SITE}${path ?? window.location.pathname}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:card", "summary_large_image");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "page";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      script?.remove();
    };
  }, [title, description, path, type, jsonLd]);

  return null;
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Diini Kahiye",
  jobTitle: "Data Analyst / Junior Data Scientist",
  url: SITE,
  email: "mailto:diiniyare74@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Mogadishu", addressCountry: "SO" },
  sameAs: [
    "https://github.com/Diini03",
    "https://www.linkedin.com/in/diinikahiye/",
    "https://medium.com/@diiniyare74",
    "https://x.com/DiiniCade0",
  ],
};
