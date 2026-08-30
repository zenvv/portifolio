import type { JSX } from "react";
import type { ExtraProps } from "react-markdown";
import CodeBlock from "@/components/markdown/CodeBlock";
import MermaidDiagram from "@/components/markdown/MermaidDiagram";

type PreProps = JSX.IntrinsicElements["pre"] & ExtraProps;
type HastNode = NonNullable<PreProps["node"]>;
type HastChild = HastNode["children"][number];
type HastElement = Extract<HastChild, { type: "element" }>;

function getPlainText(node: HastNode | HastChild): string {
  if (node.type === "text") return node.value;
  if ("children" in node) {
    return node.children.map(getPlainText).join("");
  }
  return "";
}

/** Fenced code blocks (```lang) are rendered with real syntax highlighting or,
 * for `mermaid`, an actual diagram — everything else falls back to a plain
 * <pre>. See CodeBlock/MermaidDiagram and the .md-code-block rules in
 * index.css for the visual side of this. */
export default function MarkdownPre({ node, children, ...rest }: PreProps) {
  const codeNode = node?.children.find(
    (child: HastChild): child is HastElement =>
      child.type === "element" && child.tagName === "code",
  );
  const classNames = codeNode?.properties?.className;
  const langClass = Array.isArray(classNames)
    ? classNames.find(
        (c): c is string =>
          typeof c === "string" && c.startsWith("language-"),
      )
    : undefined;

  if (!codeNode || !langClass) {
    return <pre {...rest}>{children}</pre>;
  }

  const lang = langClass.replace("language-", "");
  const code = getPlainText(codeNode).replace(/\n$/, "");

  if (lang === "mermaid") {
    return <MermaidDiagram code={code} />;
  }

  return <CodeBlock code={code} lang={lang} />;
}
