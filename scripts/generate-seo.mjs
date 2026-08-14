// Post-build step: generates sitemap.xml and prerenders per-route <head>
// meta tags (title/description/OG/Twitter/canonical) into static HTML
// files under dist/. This is a client-only SPA (Vite + react-router, no
// SSR) — a single dist/index.html is served for every path, so social
// preview bots (LinkedIn/WhatsApp/Twitter/Facebook), which don't execute
// JS, always saw the same generic tags regardless of which project was
// shared. Since Vercel serves a matching static file before falling back
// to the vercel.json SPA rewrite, writing dist/projects/<slug>/index.html
// with that project's own title/description/image lets bots (and anyone
// sharing the link) see the right preview without needing real SSR.
//
// Uses Vite's SSR module loader so it can import data/projects.ts (TS,
// path-aliased) from a plain Node script without extra build tooling.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distDir = resolve(root, "dist");
const SITE_URL = "https://zenvv.dev";
const DEFAULT_IMAGE = `${SITE_URL}/images/me.png`;
const DEFAULT_DESCRIPTION =
  "Portfólio de Willian Zeni (zenvv), desenvolvedor full-stack com foco em automação de processos, integração de sistemas corporativos e desenvolvimento web.";

const server = await createServer({ root, server: { middlewareMode: true } });
const { Projetos } = await server.ssrLoadModule("/data/projects.ts");
await server.close();

// --- sitemap.xml ---

const staticRoutes = ["/", "/projects"];
const projectRoutes = Projetos.map((p) => `/projects/${p.slug}`);
const allRoutes = [...staticRoutes, ...projectRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync(resolve(distDir, "sitemap.xml"), sitemap);
console.log(`sitemap.xml generated with ${allRoutes.length} routes`);

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

function renderHead({ path, title, description, image }) {
  const url = `${SITE_URL}${path}`;
  const img = absoluteUrl(image) ?? DEFAULT_IMAGE;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  return `<!-- seo:head:start -->
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <link rel="canonical" href="${url}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="zenvv / portfólio" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:locale" content="pt_BR" />

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

const pageMeta = [
  {
    path: "/projects",
    title: "zenvv / projetos",
    description:
      "Projetos de desenvolvimento, automação e design de Willian Zeni (zenvv).",
    image: null,
  },
  ...Projetos.map((p) => ({
    path: `/projects/${p.slug}`,
    title: `zenvv / ${p.title.pt}`,
    description: p.description.pt,
    image: p.image,
  })),
];

const indexHtml = readFileSync(resolve(distDir, "index.html"), "utf-8");
const HEAD_BLOCK = /<!-- seo:head:start -->[\s\S]*<!-- seo:head:end -->/;

if (!HEAD_BLOCK.test(indexHtml)) {
  throw new Error(
    "dist/index.html is missing the seo:head:start/end markers — did index.html change shape?",
  );
}

for (const page of pageMeta) {
  const html = indexHtml.replace(HEAD_BLOCK, renderHead(page));
  const outDir = join(distDir, page.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
}

console.log(`Prerendered head tags for ${pageMeta.length} routes`);
