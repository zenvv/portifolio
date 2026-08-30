import { getSingletonHighlighter, type BundledLanguage } from "shiki";
import { powerfxGrammar } from "./powerfx-grammar";

const THEMES = { light: "github-light", dark: "vesper" } as const;

const LANG_ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  sh: "bash",
  shell: "bash",
  py: "python",
  yml: "yaml",
  ps1: "powershell",
  powerapps: "powerfx",
  "power-fx": "powerfx",
  pfx: "powerfx",
};

const loadedLangs = new Set<string>(["powerfx"]);

function normalizeLang(lang: string) {
  const key = lang.toLowerCase();
  return LANG_ALIASES[key] ?? key;
}

async function getHighlighter() {
  return getSingletonHighlighter({
    themes: Object.values(THEMES),
    langs: [powerfxGrammar],
  });
}

/** Highlights `code` as `rawLang`, falling back to plain text for unknown languages. */
export async function highlightCode(code: string, rawLang: string) {
  const highlighter = await getHighlighter();
  const lang = normalizeLang(rawLang);

  if (!loadedLangs.has(lang)) {
    try {
      await highlighter.loadLanguage(lang as BundledLanguage);
      loadedLangs.add(lang);
    } catch {
      return highlighter.codeToHtml(code, { lang: "text", themes: THEMES });
    }
  }

  return highlighter.codeToHtml(code, { lang, themes: THEMES });
}
