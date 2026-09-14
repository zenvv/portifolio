// Post-`vite build` step: writes /projects/<slug>/images/manifest.json into
// dist/, listing every image in that project's images/ folder (banner
// included, icon.* excluded), sorted banner-first then naturally.
//
// The client (lib/project-content.ts's useProjectImages) fetches this to
// build a whole-project image gallery — sidebar thumbnails, carousels and
// inline markdown images all navigate the same list — without a server able
// to list a directory at request time (this is a static SPA). Dev gets the
// same manifest, computed live off disk instead of written to a file, from
// the projectImageManifestDevPlugin in vite.config.ts; keep the two in sync.
import { readdirSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { root } from "./routes.mjs";

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg)$/i;

function sortImages(files) {
  return [...files].sort((a, b) => {
    const aBanner = /^banner\./i.test(a);
    const bBanner = /^banner\./i.test(b);
    if (aBanner !== bBanner) return aBanner ? -1 : 1;
    return a.localeCompare(b, undefined, { numeric: true });
  });
}

const distProjectsDir = resolve(root, "dist", "projects");
if (!existsSync(distProjectsDir)) {
  throw new Error("dist/projects not found; run `vite build` first");
}

let count = 0;
for (const slug of readdirSync(distProjectsDir)) {
  const imagesDir = join(distProjectsDir, slug, "images");
  if (!existsSync(imagesDir)) continue;
  const files = sortImages(
    readdirSync(imagesDir).filter(
      (f) => IMAGE_EXT.test(f) && !/^icon\./i.test(f),
    ),
  );
  mkdirSync(imagesDir, { recursive: true });
  writeFileSync(join(imagesDir, "manifest.json"), JSON.stringify(files));
  count++;
}

console.log(`Image manifests written for ${count} project(s)`);
