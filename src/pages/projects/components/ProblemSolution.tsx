import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { WarningIcon, LightbulbIcon } from "@phosphor-icons/react";
import type { Translations } from "@/lib/i18n/translations";

/** Two-column problem/solution highlight shown near the top of a project
 * page, before the deeper documentation — see lib/project-problem-solution.ts
 * for where the text comes from. */
export default function ProblemSolution({
  problem,
  solution,
  t,
}: {
  problem: string;
  solution: string;
  t: Translations;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-b">
      <div className="flex flex-col gap-2 p-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <WarningIcon className="size-3.5" />
          {t.projects.problem}
        </span>
        <div className="text-sm text-muted-foreground prose prose-sm max-w-none [&>ul]:my-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{problem}</ReactMarkdown>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-500">
          <LightbulbIcon className="size-3.5" />
          {t.projects.solution}
        </span>
        <div className="text-sm text-muted-foreground prose prose-sm max-w-none [&>ul]:my-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{solution}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
