import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg)$/i;

function sortProjectImages(files: string[]): string[] {
  return [...files].sort((a, b) => {
    const aBanner = /^banner\./i.test(a);
    const bBanner = /^banner\./i.test(b);
    if (aBanner !== bBanner) return aBanner ? -1 : 1;
    return a.localeCompare(b, undefined, { numeric: true });
  });
}

/** Dev-only equivalent of scripts/generate-image-manifests.mjs: serves
 * `/projects/<slug>/images/manifest.json` computed live off disk on every
 * request, instead of a file written to dist/, so dropping a new image into
 * `public/projects/<slug>/images/` shows up on refresh with no rebuild step.
 * Keep the listing/sorting logic in sync with that script. */
function projectImageManifestDevPlugin(): Plugin {
  return {
    name: "project-image-manifest-dev",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(
          /^\/projects\/([^/]+)\/images\/manifest\.json(?:\?|$)/,
        );
        if (!match) return next();
        const imagesDir = join(
          process.cwd(),
          "public",
          "projects",
          match[1],
          "images",
        );
        const files = existsSync(imagesDir)
          ? sortProjectImages(
              readdirSync(imagesDir).filter(
                (f) => IMAGE_EXT.test(f) && !/^icon\./i.test(f),
              ),
            )
          : [];
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(files));
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), projectImageManifestDevPlugin()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: import.meta.dirname,
      },
    ],
    dedupe: ["react", "react-dom"],
  },
});
