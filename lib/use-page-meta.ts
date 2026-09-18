import { useEffect } from "react";
import type { Locale } from "./i18n/translations";
import { NFS_REDUCTION } from "@/data/metrics";

const DEFAULT_TITLE: Record<Locale, string> = {
  pt: "Willian Zeni | Desenvolvedor Full-Stack | Automação e Integração de Sistemas",
  en: "Willian Zeni | Full-Stack Developer | Automation & Systems Integration",
};
// Leads with the nfs-transporte reduction from data/metrics.ts, the single
// source for this number, not a new claim written here.
const DEFAULT_DESCRIPTION: Record<Locale, string> = {
  pt: `Desenvolvedor full-stack focado em automação e integração de sistemas. Já reduziu um ciclo manual de notas fiscais de ${NFS_REDUCTION.from} para ~${NFS_REDUCTION.to}.`,
  en: `Full-stack developer focused on automation and systems integration. Cut a manual invoice cycle from ${NFS_REDUCTION.from} down to ~${NFS_REDUCTION.to}.`,
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
// and JS-executing crawlers (e.g. Googlebot); see the note in index.html
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

export { DEFAULT_TITLE, DEFAULT_DESCRIPTION, PROJECTS_TITLE, PROJECTS_DESCRIPTION };
