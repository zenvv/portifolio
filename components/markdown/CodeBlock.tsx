import { useEffect, useState } from "react";
import { highlightCode } from "@/lib/markdown/shiki";
import { cn } from "@/lib/utils";

export default function CodeBlock({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setHtml(null);
    highlightCode(code, lang).then(
      (result) => {
        if (!cancelled) setHtml(result);
      },
      (error) => {
        if (!cancelled) console.error("Failed to highlight code block:", error);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  if (!html) {
    return (
      <div className={cn("md-code-block", "not-prose")}>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className={cn("md-code-block", "not-prose")}
      // Shiki returns a full <pre class="shiki">...</pre> string with each
      // token's colors baked in as CSS variables (see .md-code-block rules
      // in index.css for the light/dark switch).
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
