import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/translations";

const BANNER_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
const ICON_EXTENSIONS = ["png", "svg", "jpg", "jpeg"];

/** Candidate URLs (in try-order) for a project's banner image, e.g. `banner.jpg` or `banner.png`. */
export function getProjectBannerCandidates(slug: string): string[] {
  return BANNER_EXTENSIONS.map((ext) => `/projects/${slug}/images/banner.${ext}`);
}

/** Candidate URLs (in try-order) for a project's icon image, e.g. `icon.png`. */
export function getProjectIconCandidates(slug: string): string[] {
  return ICON_EXTENSIONS.map((ext) => `/projects/${slug}/images/icon.${ext}`);
}

/** Fetches a project's long-form markdown detail content (`projects/<slug>/content/<locale>.md`). */
export function useProjectMarkdown(slug: string, locale: Locale) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setMarkdown(null);

    fetch(`/projects/${slug}/content/${locale}.md`)
      .then((res) => {
        // Both the Vite dev server and the Vercel SPA rewrite respond with
        // a 200 `index.html` for any unmatched path instead of a real 404,
        // so a missing markdown file must be detected via content-type.
        const isHtmlFallback = res.headers
          .get("content-type")
          ?.includes("text/html");
        return res.ok && !isHtmlFallback ? res.text() : null;
      })
      .then((text) => {
        if (!cancelled) setMarkdown(text && text.trim() ? text : null);
      })
      .catch(() => {
        if (!cancelled) setMarkdown(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, locale]);

  return { markdown, loading };
}
