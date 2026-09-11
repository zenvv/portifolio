// Post-build step: generates sitemap.xml and prerenders per-route <head>
// meta tags (title/description/OG/Twitter/canonical/hreflang) into static
// HTML files under dist/. This is a client-only SPA (Vite + react-router,
// no SSR) — a single dist/index.html is served for every path, so social
// preview bots (LinkedIn/WhatsApp/Twitter/Facebook), which don't execute
// JS, always saw the same generic tags regardless of which project (or
// which language — PT is unprefixed, EN lives under /en) was shared. Since
// Vercel serves a matching static file before falling back to the
// vercel.json SPA rewrite, writing dist/<route>/index.html with that
// route's own title/description/image/hreflang lets bots (and anyone
// sharing the link) see the right preview without needing real SSR.
//
// Routes and content come from scripts/routes.mjs, which loads
// data/projects.ts and lib/use-page-meta.ts via Vite's SSR module loader —
// the same TS modules the client renders from, so this script can't drift
// out of sync with them.
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import {
  root,
  loadContent,
  getPtRoutePaths,
  toEnPath,
  getRoutePaths,
} from "./routes.mjs";

const distDir = resolve(root, "dist");
const SITE_URL = "https://zenvv.dev";
const DEFAULT_IMAGE = `${SITE_URL}/images/me.png`;

const { Projetos, DEFAULT_TITLE, DEFAULT_DESCRIPTION } = await loadContent();

const BANNER_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "svg"];

// Mirrors lib/project-content.ts's getProjectBannerCandidates(), but reads
// the filesystem directly since this script runs outside the SPA bundle.
function findProjectBanner(slug) {
  for (const ext of BANNER_EXTENSIONS) {
    const relative = `/projects/${slug}/images/banner.${ext}`;
    if (existsSync(resolve(root, "public", `.${relative}`))) return relative;
  }
  return null;
}

// --- sitemap.xml (both languages, cross-linked via hreflang) ---

const ptRoutes = getPtRoutePaths(Projetos);

function sitemapUrlEntry(ptPath) {
  const enPath = toEnPath(ptPath);
  return `  <url>
    <loc>${SITE_URL}${ptPath}</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${SITE_URL}${ptPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${enPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${ptPath}" />
  </url>
  <url>
    <loc>${SITE_URL}${enPath}</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${SITE_URL}${ptPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${enPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${ptPath}" />
  </url>`;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${ptRoutes.map(sitemapUrlEntry).join("\n")}
</urlset>
`;

writeFileSync(resolve(distDir, "sitemap.xml"), sitemap);
console.log(`sitemap.xml generated with ${ptRoutes.length * 2} routes`);

// --- per-route <head> prerender ---

function absoluteUrl(path) {
  if (!path) return null;
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHead({ path, alternatePath, locale, title, description, image }) {
  const url = `${SITE_URL}${path}`;
  const ptUrl = locale === "pt" ? url : `${SITE_URL}${alternatePath}`;
  const enUrl = locale === "en" ? url : `${SITE_URL}${alternatePath}`;
  const img = absoluteUrl(image) ?? DEFAULT_IMAGE;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const ogLocale = locale === "en" ? "en_US" : "pt_BR";
  const ogLocaleAlternate = locale === "en" ? "pt_BR" : "en_US";
  return `<!-- seo:head:start -->
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="pt-BR" href="${ptUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="x-default" href="${ptUrl}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="zenvv / portfólio" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:locale" content="${ogLocale}" />
    <meta property="og:locale:alternate" content="${ogLocaleAlternate}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${img}" />

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Willian Zeni",
        "alternateName": "zenvv",
        "jobTitle": "Software Developer",
        "url": "${SITE_URL}/",
        "image": "${DEFAULT_IMAGE}",
        "sameAs": [
          "https://www.github.com/zenvv",
          "https://www.linkedin.com/in/willian-z-327bba186/"
        ]
      }
    </script>
    <!-- seo:head:end -->`;
}

// One descriptor per PT path; each expands to a PT + EN pageMeta entry below.
const pageDescriptors = [
  {
    ptPath: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    image: null,
  },
  {
    ptPath: "/projects",
    title: { pt: "zenvv / projetos", en: "zenvv / projects" },
    description: {
      pt: "Projetos de desenvolvimento, automação e design de Willian Zeni (zenvv).",
      en: "Development, automation and design projects by Willian Zeni (zenvv).",
    },
    image: null,
  },
  ...Projetos.map((p) => ({
    ptPath: `/projects/${p.slug}`,
    title: { pt: `zenvv / ${p.title.pt}`, en: `zenvv / ${p.title.en}` },
    description: p.description,
    image: findProjectBanner(p.slug),
  })),
];

const pageMeta = pageDescriptors.flatMap((d) => {
  const enPath = toEnPath(d.ptPath);
  return [
    {
      path: d.ptPath,
      alternatePath: enPath,
      locale: "pt",
      title: d.title.pt,
      description: d.description.pt,
      image: d.image,
    },
    {
      path: enPath,
      alternatePath: d.ptPath,
      locale: "en",
      title: d.title.en,
      description: d.description.en,
      image: d.image,
    },
  ];
});

const indexHtml = readFileSync(resolve(distDir, "index.html"), "utf-8");
const HEAD_BLOCK = /<!-- seo:head:start -->[\s\S]*<!-- seo:head:end -->/;
const HTML_LANG = /<html lang="[^"]*"/;

if (!HEAD_BLOCK.test(indexHtml)) {
  throw new Error(
    "dist/index.html is missing the seo:head:start/end markers — did index.html change shape?",
  );
}

for (const page of pageMeta) {
  const htmlLang = page.locale === "en" ? "en" : "pt-BR";
  const html = indexHtml
    .replace(HEAD_BLOCK, renderHead(page))
    .replace(HTML_LANG, `<html lang="${htmlLang}"`);
  const outDir = join(distDir, page.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
}

console.log(`Prerendered head tags for ${pageMeta.length} routes`);

// Sanity check: routes.mjs's own combined list (used by prerender.mjs) must
// match the paths we just wrote head tags for, so the two scripts can never
// silently drift apart.
const allRoutes = getRoutePaths(Projetos);
const writtenPaths = new Set(pageMeta.map((p) => p.path));
const missing = allRoutes.filter((r) => !writtenPaths.has(r));
if (missing.length > 0) {
  throw new Error(`getRoutePaths() has routes with no <head> written: ${missing.join(", ")}`);
}
