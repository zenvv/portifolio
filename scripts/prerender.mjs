// Post-build step: renders every route in a real headless browser (after
// hydration + async content, like a project's markdown fetch, has settled)
// and overwrites dist/<route>/index.html with the resulting HTML. Runs
// after generate-seo.mjs, which already wrote per-route <head> tags; those
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
import sparticuzChromium from "@sparticuz/chromium";
import { root, loadContent, getRoutePaths } from "./routes.mjs";

const distDir = resolve(root, "dist");
const PORT = 4321;
const SITE_URL = "https://zenvv.dev";

const { Projetos } = await loadContent();
// Locale is derived purely from the URL ("/en/..." vs unprefixed; see
// lib/i18n/paths.ts), so visiting each route already renders the right
// language; no locale needs to be forced here.
const routes = getRoutePaths(Projetos);

const server = await preview({
  root,
  preview: { port: PORT, strictPort: true },
});
const base = `http://localhost:${PORT}`;

// Vercel's build container lacks the shared libraries (libnss3, etc.)
// Playwright's own downloaded Chromium needs to launch, so on Vercel we
// launch @sparticuz/chromium's build instead, which is compiled to run in
// that kind of restricted Linux environment. Locally/elsewhere, Playwright's
// own Chromium (fetched by scripts/postinstall.mjs) is used as-is.
const browser = process.env.VERCEL
  ? await chromium.launch({
      args: sparticuzChromium.args,
      executablePath: await sparticuzChromium.executablePath(),
      headless: true,
    })
  : await chromium.launch();
const context = await browser.newContext();

/** Walks the page from top to bottom and back in small steps so every
 * scroll-triggered reveal (`useInView`/`useScrollReveal`, e.g. the impact
 * stats count-up) fires its `once: true` IntersectionObserver, the same way
 * a real visitor scrolling down would. Without this, anything below the
 * fold never becomes "active" in a headless capture that never scrolls, and
 * bakes into the static HTML at its pre-animation resting state (e.g. a
 * counter frozen at "+0") instead of its real end value. */
async function scrollThroughPage(page) {
  await page.evaluate(async () => {
    const height = document.documentElement.scrollHeight;
    const step = Math.max(400, Math.floor(window.innerHeight / 2));
    for (let y = 0; y <= height; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, height);
    await new Promise((r) => setTimeout(r, 40));
    window.scrollTo(0, 0);
  });
}

// A count-up (see ImpactStats/ProjectResults) sits idle for ~1s after
// becoming active before it starts changing the DOM, then animates for
// ~1.1s more. A single pair of matching polls can land entirely inside that
// idle gap and falsely look "settled" before the animation has even
// started, so this requires several consecutive stable reads (i.e. a
// continuous stable window longer than that idle gap) before concluding.
const STABLE_POLL_INTERVAL_MS = 150;
const STABLE_STREAK_REQUIRED = 10;
const MAX_POLLS = 60;

/** Waits for hydration and any async content (markdown fetch, etc.) to
 * settle by polling #root's rendered text until it stops changing. Also
 * covers scroll-triggered animations (e.g. a count-up) finishing after
 * {@link scrollThroughPage} has fired them: their text keeps changing frame
 * to frame, so the loop keeps polling until they reach their resting value. */
async function waitForSettledContent(page) {
  let previous = null;
  let streak = 0;
  for (let i = 0; i < MAX_POLLS; i++) {
    const current = await page.evaluate(
      () => document.getElementById("root")?.innerText.length ?? 0,
    );
    streak = current > 0 && current === previous ? streak + 1 : 0;
    if (streak >= STABLE_STREAK_REQUIRED) return;
    previous = current;
    await page.waitForTimeout(STABLE_POLL_INTERVAL_MS);
  }
}

let count = 0;
for (const routePath of routes) {
  const page = await context.newPage();
  // Trailing slash matters here: vite's preview server (sirv) only resolves
  // a directory's index.html for "/en/", not "/en"; without it, this falls
  // through to the SPA index.html fallback and silently prerenders the
  // wrong route's <head> (title/body still look right because those are
  // fixed up client-side, but og:*/canonical meta baked at build time
  // would be wrong).
  const url = routePath.endsWith("/") ? routePath : `${routePath}/`;
  await page.goto(new URL(url, base).toString(), {
    waitUntil: "networkidle",
  });
  await scrollThroughPage(page);
  await waitForSettledContent(page);
  // usePageMeta() re-derives <link rel="canonical"> from
  // window.location.pathname client-side, which just picked up the trailing
  // slash added above for the preview server's sake, put it back to the
  // slash-less form the rest of the site (sitemap, og:url, hreflang) uses.
  await page.evaluate((href) => {
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", href);
  }, `${SITE_URL}${routePath}`);
  const html = await page.content();
  await page.close();

  // The captured page must actually be this route: og:url is only ever set
  // from a build-time template (never touched by client JS, unlike
  // title/canonical/lang), so a mismatch here means the server served the
  // wrong static file for this path.
  const ogUrlMatch = html.match(/property="og:url" content="([^"]*)"/);
  const capturedPath = ogUrlMatch
    ? ogUrlMatch[1].replace(SITE_URL, "") || "/"
    : null;
  if (capturedPath !== routePath) {
    throw new Error(
      `Prerendering ${routePath} captured og:url for "${capturedPath}" instead: the preview server likely served the wrong static file.`,
    );
  }

  const outDir = join(distDir, routePath);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), `<!doctype html>\n${html}`);
  count++;
}

await browser.close();
await new Promise((res) => server.httpServer.close(res));

console.log(`Prerendered full content for ${count} routes`);
