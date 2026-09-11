import { useEffect } from "react";
import type { Locale } from "./i18n/translations";

// The EN copy here is a literal translation of the PT original, not new
// claims — kept provisional until Phase 3.3 rewrites both with a concrete
// number from the project pages.
const DEFAULT_TITLE: Record<Locale, string> = {
  pt: "zenvv / portfólio",
  en: "zenvv / portfolio",
};
const DEFAULT_DESCRIPTION: Record<Locale, string> = {
  pt: "Portfólio de Willian Zeni (zenvv), desenvolvedor full-stack com foco em automação de processos, integração de sistemas corporativos e desenvolvimento web.",
  en: "Portfolio of Willian Zeni (zenvv), a full-stack developer focused on process automation, enterprise systems integration and web development.",
};
const PROJECTS_TITLE: Record<Locale, string> = {
  pt: "zenvv / projetos",
  en: "zenvv / projects",
};
const PROJECTS_DESCRIPTION: Record<Locale, string> = {
  pt: "Projetos de desenvolvimento, automação e design de Willian Zeni (zenvv).",
  en: "Development, automation and design projects by Willian Zeni (zenvv).",
};

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

export {
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  PROJECTS_TITLE,
  PROJECTS_DESCRIPTION,
};
