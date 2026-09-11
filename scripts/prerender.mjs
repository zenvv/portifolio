// Post-build step: renders every route in a real headless browser (after
// hydration + async content, like a project's markdown fetch, has settled)
// and overwrites dist/<route>/index.html with the resulting HTML. Runs
// after generate-seo.mjs, which already wrote per-route <head> tags — those
// are read back client-side by usePageMeta() and stay intact, so the final
// file has both the right <head> and the real page content in the body,
// instead of the empty `<div id="root"></div>` a plain SPA build ships.
//
// Routes come from the same list as generate-seo.mjs's sitemap
// (scripts/routes.mjs), so a new project in data/projects.ts is prerendered
// automatically without touching this script.
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { preview } from "vite";
import { chromium } from "playwright";
import { root, loadProjects, getRoutePaths } from "./routes.mjs";

const distDir = resolve(root, "dist");
const PORT = 4321;

const Projetos = await loadProjects();
const routes = getRoutePaths(Projetos);

const server = await preview({
  root,
  preview: { port: PORT, strictPort: true },
});
const base = `http://localhost:${PORT}`;

const browser = await chromium.launch();
const context = await browser.newContext();
// This site's language toggle is client-state only (no per-locale route
// yet), so the canonical prerendered content is Portuguese — matching the
// PT title/description generate-seo.mjs already wrote into each route's
// <head>.
await context.addInitScript(() => {
  window.localStorage.setItem("zeni-locale", "pt");
});

/** Waits for hydration and any async content (markdown fetch, etc.) to
 * settle by polling #root's rendered text until it stops changing. */
async function waitForSettledContent(page) {
  let previous = null;
  for (let i = 0; i < 40; i++) {
    const current = await page.evaluate(
      () => document.getElementById("root")?.innerText.length ?? 0,
    );
    if (current > 0 && current === previous) return;
    previous = current;
    await page.waitForTimeout(150);
  }
}

let count = 0;
for (const routePath of routes) {
  const page = await context.newPage();
  await page.goto(new URL(routePath, base).toString(), {
    waitUntil: "networkidle",
  });
  await waitForSettledContent(page);
  const html = await page.content();
  await page.close();

  const outDir = join(distDir, routePath);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), `<!doctype html>\n${html}`);
  count++;
}

await browser.close();
await new Promise((res) => server.httpServer.close(res));

console.log(`Prerendered full content for ${count} routes`);
