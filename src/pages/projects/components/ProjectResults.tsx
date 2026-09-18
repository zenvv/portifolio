import type { Locale, Translations } from "@/lib/i18n/translations";
import type { ResultBlock } from "@/lib/project-page-content";
import SectionTitle from "@/components/SectionTitle";
import { cn } from "@/lib/utils";
import { ChartLineUpIcon } from "@phosphor-icons/react";

function ResultTile({ block, locale }: { block: ResultBlock; locale: Locale }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-6 py-5 text-center justify-center flex-1 w-full">
      {block.kind === "reduction" ? (
        <div className="inline-flex items-baseline gap-1 font-mono text-2xl sm:text-3xl">
          <span className="text-muted-foreground/60 line-through decoration-1">
            {block.from}
          </span>
          <span className="text-primary">→</span>
          <span className="font-semibold text-primary">{block.to}</span>
        </div>
      ) : (
        <span className="font-mono text-3xl leading-none font-medium tabular-nums text-primary sm:text-4xl">
          {block.value}
        </span>
      )}
      <span className="max-w-44 text-xs leading-none text-muted-foreground">
        {block.label[locale]}
      </span>
    </div>
  );
}

/** Same visual language as the home's {@link ImpactStats}, applied to a
 * single project's own numbers instead of the career-wide ones. */
export default function ProjectResults({
  results,
  locale,
  t,
  className,
}: {
  results: ResultBlock[];
  locale: Locale;
  t: Translations;
  className?: string;
}) {
  if (results.length === 0) return null;

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-8 bg-background text-foreground dark *:dark py-8",
        className,
      )}
    >
      <SectionTitle
        title={t.projects.resultsTitle}
        align="center"
        icon={<ChartLineUpIcon />}
        titleLevel="h3"
      />
      <div
        className={cn(
          "w-full sm:max-w-5xl max-w-[70%] flex sm:flex-row flex-col divide-y sm:divide-y-0 items-center gap-2 sm:divide-x",
        )}
      >
        {results.map((block) => (
          <ResultTile key={block.label[locale]} block={block} locale={locale} />
        ))}
      </div>
    </div>
  );
}
