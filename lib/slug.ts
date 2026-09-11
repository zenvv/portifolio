// U+0300-U+036F: Combining Diacritical Marks — what NFD normalization
// splits an accented letter into (e.g. "ç" -> "c" + COMBINING CEDILLA).
// Built from char codes rather than a literal range in the source.
const COMBINING_MARKS_START = 0x0300;
const COMBINING_MARKS_END = 0x036f;
const COMBINING_MARKS = new RegExp(
  `[${String.fromCharCode(COMBINING_MARKS_START)}-${String.fromCharCode(COMBINING_MARKS_END)}]`,
  "g",
);

/** Turns heading text into a stable, URL-safe anchor id (accents stripped,
 * lowercased, non-alphanumerics collapsed to "-"). Used for both the
 * project markdown's h2 ids and the table of contents links pointing at
 * them, so they always agree. */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
