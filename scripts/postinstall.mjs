// Downloads Playwright's own Chromium for local/CI use. Skipped on Vercel:
// its build container lacks the shared libraries (libnss3, etc.) that build
// needs to launch, so prerender.mjs uses @sparticuz/chromium there instead
// (a build compiled to run in that kind of restricted Linux environment),
// and downloading Playwright's copy too would just waste build time.
import { execSync } from "node:child_process";

if (!process.env.VERCEL) {
  execSync("playwright install chromium", { stdio: "inherit" });
}
