// Builds the SVG markup for the site's share-preview card (og:image /
// twitter:image), reusing the actual brand assets and palette instead of
// inventing a new look: the Z logomark (public/logo.svg), the glass-badge
// watermark used behind the hero (public/logo-badge-dark.png), the hero's
// amber-400 accent, and the same font pairing as the rest of the site
// (Bricolage Grotesque for headings/body, Azeret Mono for the uppercase
// label); see scripts/generate-og.mjs, which rasterizes this to PNG.
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND = "#0a0a0a";
const ACCENT = "#fbbf24"; // amber-400, same as the hero CTA/headline
const MUTED = "#a3a3a3";
const BODY = "#d4d4d4";

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toBase64(relativePath) {
  return readFileSync(resolve(root, relativePath)).toString("base64");
}

/**
 * @param {object} opts
 * @param {string} opts.title - Big headline, e.g. "Willian Zeni".
 * @param {string} opts.subtitle - Uppercase mono label under the title.
 * @param {string[]} opts.taglineLines - 1-2 lines of body copy (caller
 *   controls the wrap; this stays a template, not a layout engine).
 */
export function buildOgSvg({ title, subtitle, taglineLines }) {
  const badgeB64 = toBase64("public/logo-badge-dark.png");

  const taglineTspans = taglineLines
    .map(
      (line, i) =>
        `<tspan x="82" dy="${i === 0 ? 0 : 44}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BACKGROUND}" />

  <g opacity="0.14" transform="rotate(-35 900 380)">
    <image href="data:image/png;base64,${badgeB64}" x="480" y="-160" width="900" height="900" />
  </g>

  <!-- Z logomark, same public/logo.svg used in the header (viewBox unchanged, just scaled) -->
  <g transform="translate(80 64)">
    <svg width="44" height="44" viewBox="0 0 82 82" fill="none">
      <rect width="82" height="82" rx="4" fill="#FFAE00"/>
      <path d="M66 15V23.3443L32.6992 56.9906H57.7985V49.834H66V61.9108L62.6898 67H16V58.4321L50.8818 24.7858H25.7826V35.0734H16V19.8656L20.8913 15H66Z" fill="black"/>
    </svg>
    <text x="58" y="30" font-family="Azeret Mono" font-size="20" font-weight="500" fill="${MUTED}">zenvv.dev</text>
  </g>

  <text x="82" y="300" font-family="Bricolage Grotesque" font-size="92" font-weight="800" fill="${ACCENT}">${escapeXml(title)}</text>
  <text x="82" y="346" font-family="Azeret Mono" font-size="23" font-weight="500" letter-spacing="2" fill="${MUTED}">${escapeXml(subtitle.toUpperCase())}</text>

  <text y="424" font-family="Bricolage Grotesque" font-size="32" font-weight="500" fill="${BODY}">${taglineTspans}</text>
</svg>`;
}
