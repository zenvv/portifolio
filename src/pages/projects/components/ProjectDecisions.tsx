import type { Locale, Translations } from "@/lib/i18n/translations";
import type { ProjectDecision } from "@/lib/project-page-content";
import SectionTitle from "@/components/SectionTitle";
import { ListChecksIcon } from "@phosphor-icons/react";

export default function ProjectDecisions({
  decisions,
  locale,
  t,
}: {
  decisions: ProjectDecision[];
  locale: Locale;
  t: Translations;
}) {
  if (decisions.length === 0) return null;

  return (
    <div className="flex w-full sm:max-w-5xl flex-col gap-4">
      <SectionTitle
        align="start"
        title={t.projects.decisionsTitle}
        icon={<ListChecksIcon />}
        titleLevel="h3"
      />
      <div className="flex flex-col divide-y divide-border ">
        {decisions.map((decision, i) => (
          <div
            key={decision.title[locale]}
            className="flex items-center gap-2 py-4"
          >
            <span className="absolute font-heading italic font-bold text-muted-foreground/20 text-5xl">
              {i + 1}
            </span>
            <div className="flex flex-col gap-0 pl-6">
              <span className="text-sm font-semibold text-foreground">
                {i + 1}. {decision.title[locale]}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {decision.body[locale]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
