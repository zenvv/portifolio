import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/translations";

const BANNER_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
const ICON_EXTENSIONS = ["png", "svg", "jpg", "jpeg"];

/** Candidate URLs (in try-order) for a project's banner image, e.g. `banner.jpg` or `banner.png`. */
export function getProjectBannerCandidates(slug: string): string[] {
  return BANNER_EXTENSIONS.map(
    (ext) => `/projects/${slug}/images/banner.${ext}`,
  );
}

/** Candidate URLs (in try-order) for a project's icon image, e.g. `icon.png`. */
export function getProjectIconCandidates(slug: string): string[] {
  return ICON_EXTENSIONS.map((ext) => `/projects/${slug}/images/icon.${ext}`);
}

export type ProjectImage = { src: string; alt: string };

/** Turns a filename into a readable fallback label, e.g. `01-inicio.png` ->
 * "inicio", `app checklist.png` -> "app checklist". Only used until a richer
 * caption (a carousel title, a markdown image's own alt text) is known for
 * that same image; see `lib/project-gallery.tsx`. */
function altFromFilename(file: string): string {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_]?/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

/** Fetches every image in a project's `images/` folder (`projects/<slug>/images/manifest.json`,
 * written by scripts/generate-image-manifests.mjs at build time and served
 * live by vite.config.ts's dev plugin), banner included, `icon.*` excluded,
 * banner-first then natural filename order. This is the base list behind
 * the whole-project image gallery (see `lib/project-gallery.tsx`): sidebar
 * thumbnails, carousels and inline markdown images all navigate it. */
export function useProjectImages(slug: string): ProjectImage[] {
  const [images, setImages] = useState<ProjectImage[]>([]);

  useEffect(() => {
    let cancelled = false;
    setImages([]);

    fetch(`/projects/${slug}/images/manifest.json`)
      .then((res) => {
        const isHtmlFallback = res.headers
          .get("content-type")
          ?.includes("text/html");
        return res.ok && !isHtmlFallback ? res.json() : [];
      })
      .then((files: string[]) => {
        if (cancelled) return;
        setImages(
          files.map((file) => ({
            src: `/projects/${slug}/images/${file}`,
            alt: altFromFilename(file),
          })),
        );
      })
      .catch(() => {
        if (!cancelled) setImages([]);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return images;
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
