// Renders the share-preview PNG(s) from scripts/og-template.mjs. Run
// manually with `npm run og`; this is NOT part of `npm run build`. The
// PNGs are committed like any other static asset and only regenerated when
// the copy or design changes.
//
// With no flags, renders both site-wide default cards (PT and EN: the
// card has real rasterized text, so each language needs its own image):
//   public/images/og-card.png, public/images/og-card-en.png
//
// Pass --title/--subtitle/--tagline/--out to render a single custom card
// instead, e.g. for a project later:
//   node scripts/generate-og.mjs --title "Nailly" --subtitle "PWA de agenda e financeiro" --tagline "20-40 clientes fixas\npagamento em lote" --out public/projects/nailly/images/og-card.png
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { buildOgSvg } from "./og-template.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const FONT_FILES = [
  resolve(__dirname, "assets/fonts/BricolageGrotesque-800.ttf"),
  resolve(__dirname, "assets/fonts/BricolageGrotesque-500.ttf"),
  resolve(__dirname, "assets/fonts/AzeretMono-500.ttf"),
];

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      out[arg.slice(2)] = argv[i + 1];
      i++;
    }
  }
  return out;
}

function renderCard({ title, subtitle, taglineLines, outPath }) {
  const svg = buildOgSvg({ title, subtitle, taglineLines });
  const resvg = new Resvg(svg, {
    font: {
      fontFiles: FONT_FILES,
      loadSystemFonts: false,
      defaultFontFamily: "Bricolage Grotesque",
    },
  });
  const png = resvg.render().asPng();

  const absoluteOut = resolve(root, outPath);
  mkdirSync(dirname(absoluteOut), { recursive: true });
  writeFileSync(absoluteOut, png);
  console.log(`Wrote ${outPath} (${(png.length / 1024).toFixed(0)} KB)`);
}

const args = parseArgs(process.argv.slice(2));

if (args.title) {
  renderCard({
    title: args.title,
    subtitle: args.subtitle ?? "",
    taglineLines: args.tagline ? args.tagline.split("\\n") : [],
    outPath: args.out ?? "public/images/og-card.png",
  });
} else {
  // Same numbers as lib/use-page-meta.ts's DEFAULT_DESCRIPTION, hand-wrapped
  // for the card's fixed width; this script has no app build step in its
  // path, so it can't import that at runtime the way generate-seo.mjs does.
  renderCard({
    title: "Willian Zeni",
    subtitle: "Desenvolvedor Full-Stack · UI/UX Designer",
    taglineLines: [
      "Automação e integração de sistemas,",
      "reduziu um ciclo manual de 6h para 15–30min",
    ],
    outPath: "public/images/og-card.png",
  });
  renderCard({
    title: "Willian Zeni",
    subtitle: "Full-Stack Developer · UI/UX Designer",
    taglineLines: [
      "Automation and systems integration,",
      "cut a manual cycle from 6h down to 15-30min",
    ],
    outPath: "public/images/og-card-en.png",
  });
}
