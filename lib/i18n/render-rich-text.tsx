import * as React from "react";
import { cn } from "@/lib/utils";

const FORMAT_PATTERN = /\*\*(.+?)\*\*|~(.+?)~|_(.+?)_|`(.+?)`|(<\/br>)/g;

type RichTextClassNames = {
  bold?: string;
  underline?: string;
  italic?: string;
  code?: string;
  br?: string;
};

function renderRichText(text: string, classNames?: RichTextClassNames) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  FORMAT_PATTERN.lastIndex = 0;
  while ((match = FORMAT_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [, bold, underline, italic, code, br] = match;
    if (br !== undefined) {
      nodes.push(<br className={classNames?.br} key={match.index}></br>);
    } else if (bold !== undefined) {
      nodes.push(
        <b key={match.index} className={classNames?.bold}>
          {bold}
        </b>,
      );
    } else if (underline !== undefined) {
      nodes.push(
        <u key={match.index} className={classNames?.underline}>
          {underline}
        </u>,
      );
    } else if (italic !== undefined) {
      nodes.push(
        <i key={match.index} className={classNames?.italic}>
          {italic}
        </i>,
      );
    } else if (code !== undefined) {
      nodes.push(
        <code
          key={match.index}
          className={cn(
            "rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]",
            classNames?.code,
          )}
        >
          {code}
        </code>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export { renderRichText };
