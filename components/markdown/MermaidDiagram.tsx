import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

let diagramCount = 0;

export default function MermaidDiagram({ code }: { code: string }) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );
  const idRef = useRef(`mermaid-diagram-${++diagramCount}`);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() =>
      setIsDark(root.classList.contains("dark")),
    );
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    setSvg(null);
    setError(null);

    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "neutral",
        securityLevel: "strict",
        fontFamily: "var(--font-mono)",
        themeVariables: { fontSize: "12px" },
      });
      try {
        const { svg: rendered } = await mermaid.render(idRef.current, code);
        if (!cancelled) setSvg(rendered);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to render diagram",
          );
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, isDark]);

  if (error) {
    return (
      <pre className="md-code-block not-prose p-4 text-xs text-destructive whitespace-pre-wrap">
        {error}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="md-code-block not-prose flex items-center justify-center p-8 text-xs text-muted-foreground">
        rendering diagram...
      </div>
    );
  }

  return (
    <div
      className={cn("md-mermaid", "not-prose")}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
