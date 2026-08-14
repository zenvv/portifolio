import { useEffect } from "react";

const DEFAULT_TITLE = "zenvv / portfólio";
const DEFAULT_DESCRIPTION =
  "Portfólio de Willian Zeni (zenvv), desenvolvedor full-stack com foco em automação de processos, integração de sistemas corporativos e desenvolvimento web.";

// Updates <title>/<meta description>/<link canonical> on route change.
// This SPA has no SSR/prerendering, so this only affects the browser tab
// and JS-executing crawlers (e.g. Googlebot) — see the note in index.html
// about why social preview bots won't see this.
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute("content");
    if (descriptionTag && description) {
      descriptionTag.setAttribute("content", description);
    }

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonicalTag?.getAttribute("href");
    if (canonicalTag) {
      canonicalTag.setAttribute(
        "href",
        `https://zenvv.dev${window.location.pathname}`,
      );
    }

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription) {
        descriptionTag.setAttribute("content", previousDescription);
      }
      if (canonicalTag && previousCanonical) {
        canonicalTag.setAttribute("href", previousCanonical);
      }
    };
  }, [title, description]);
}

export { DEFAULT_TITLE, DEFAULT_DESCRIPTION };
