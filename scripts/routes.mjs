// Shared source of truth for every route that needs a sitemap entry and a
// prerendered dist/<route>/index.html. Both generate-seo.mjs and
// prerender.mjs import this instead of deriving the list themselves, so a
// new project added to data/projects.ts automatically gets a route in both
// places.
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const root = resolve(__dirname, "..");

/** Loads `Projetos` (data/projects.ts) and the site-wide default title/
 * description (lib/use-page-meta.ts) via Vite's SSR module loader, so this
 * plain Node script can import path-aliased TS — and stay in sync with what
 * the client renders — without extra build tooling. */
export async function loadContent() {
  const server = await createServer({ root, server: { middlewareMode: true } });
  const { Projetos } = await server.ssrLoadModule("/data/projects.ts");
  const { StackList } = await server.ssrLoadModule("/data/stack.ts");
  const pageMeta = await server.ssrLoadModule("/lib/use-page-meta.ts");
  await server.close();
  const { DEFAULT_TITLE, DEFAULT_DESCRIPTION, PROJECTS_TITLE, PROJECTS_DESCRIPTION } =
    pageMeta;
  return {
    Projetos,
    StackList,
    DEFAULT_TITLE,
    DEFAULT_DESCRIPTION,
    PROJECTS_TITLE,
    PROJECTS_DESCRIPTION,
  };
}

/** Every PT (unprefixed) route: the static pages plus one per project.
 * "/about" is intentionally excluded: it's a client-side redirect into the
 * home page's "Sobre mim" section, not a distinct page worth its own
 * sitemap/prerendered entry (see src/pages/about/about.tsx). */
export function getPtRoutePaths(projetos) {
  const staticRoutes = ["/", "/projects"];
  const projectRoutes = projetos.map((p) => `/projects/${p.slug}`);
  return [...staticRoutes, ...projectRoutes];
}

/** Prefixes a PT path with "/en" — see lib/i18n/paths.ts, the client-side
 * equivalent of this mapping. */
export function toEnPath(ptPath) {
  return ptPath === "/" ? "/en" : `/en${ptPath}`;
}

/** All routes that should exist as a static, crawlable page: every PT route
 * plus its "/en" counterpart. */
export function getRoutePaths(projetos) {
  const ptRoutes = getPtRoutePaths(projetos);
  return [...ptRoutes, ...ptRoutes.map(toEnPath)];
}
