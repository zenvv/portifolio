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

/** Loads `Projetos` from data/projects.ts via Vite's SSR module loader, so
 * this plain Node script can import path-aliased TS without extra tooling. */
export async function loadProjects() {
  const server = await createServer({ root, server: { middlewareMode: true } });
  const { Projetos } = await server.ssrLoadModule("/data/projects.ts");
  await server.close();
  return Projetos;
}

/** All routes that should exist as a static, crawlable page: the static
 * pages plus one per project. */
export function getRoutePaths(projetos) {
  const staticRoutes = ["/", "/projects"];
  const projectRoutes = projetos.map((p) => `/projects/${p.slug}`);
  return [...staticRoutes, ...projectRoutes];
}
