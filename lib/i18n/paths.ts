import type { Locale } from "./translations";

/** Matches a leading "/en" path segment ("/en" or "/en/...", not "/energy"). */
const EN_PREFIX = /^\/en(?=\/|$)/;

/** Strips the "/en" prefix from a pathname, if present. */
export function unlocalizePath(pathname: string): string {
  const stripped = pathname.replace(EN_PREFIX, "");
  return stripped === "" ? "/" : stripped;
}

/** Rewrites a pathname to the given locale's URL: PT is unprefixed, EN is
 * prefixed with "/en". The site's locale is a pure function of the URL, so
 * this is the single place that mapping lives. */
export function localizePath(pathname: string, locale: Locale): string {
  const base = unlocalizePath(pathname);
  if (locale !== "en") return base;
  return base === "/" ? "/en" : `/en${base}`;
}

/** The locale implied by a pathname. */
export function localeFromPath(pathname: string): Locale {
  return EN_PREFIX.test(pathname) ? "en" : "pt";
}
