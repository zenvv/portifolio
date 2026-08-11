import type { Locale } from "@/lib/i18n/translations";

const FILENAME_PATTERN = /^\/content\/projects\/(.+)\.(en|pt)\.md$/;

const files = import.meta.glob<string>("/content/projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export type ProjectDetails = Record<string, Partial<Record<Locale, string>>>;

export function loadProjectDetails(): ProjectDetails {
  const result: ProjectDetails = {};

  for (const [filePath, content] of Object.entries(files)) {
    const match = filePath.match(FILENAME_PATTERN);
    if (!match) continue;

    const [, slug, locale] = match;
    result[slug] ??= {};
    result[slug][locale as Locale] = content;
  }

  return result;
}
