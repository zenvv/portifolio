import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretDownIcon, GraduationCapIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import SectionTitle from "@/components/SectionTitle";
import type { Education } from "@/data/education";
import type { Locale, Translations } from "@/lib/i18n/translations";

function EducationRow({
  education,
  locale,
  t,
}: {
  education: Education;
  locale: Locale;
  t: Translations;
}) {
  const [open, setOpen] = useState(false);
  const activities = (education.activities?.[locale] ?? []).filter(
    (a) => a.trim() !== "",
  );
  const hasActivities = activities.length > 0;

  return (
    <div className="flex flex-col border rounded-lg p-3.5 hover:bg-card transition-colors">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center size-8 border bg-background shrink-0 overflow-hidden rounded-sm text-muted-foreground">
          {education.icon ? (
            <img
              src={education.icon}
              alt={education.institution}
              className="size-full object-contain"
            />
          ) : (
            <GraduationCapIcon className="size-4" />
          )}
        </span>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-medium truncate">
            {education.institution}
          </span>
          <span className="text-xs text-muted-foreground">
            {education.degree[locale]} · {education.start[locale]} —{" "}
            {education.end[locale]}
          </span>
        </div>
      </div>

      {hasActivities ? (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-3 w-fit">
            <CaretDownIcon
              className={cn(
                "size-3 transition-transform",
                open ? "rotate-180" : "",
              )}
            />
            {open ? t.about.hideActivities : t.about.showActivities}
          </CollapsibleTrigger>

          <CollapsibleContent>
            <ul className="flex flex-col gap-1.5 pt-3 pl-0.5">
              {activities.map((activity) => (
                <li
                  key={activity}
                  className="text-xs text-muted-foreground flex items-start gap-2"
                >
                  <span className="size-1 bg-muted-foreground shrink-0 mt-1.5" />
                  {activity}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </div>
  );
}

export default function EducationSection({
  education,
  locale,
  t,
}: {
  education: Education[];
  locale: Locale;
  t: Translations;
}) {
  return (
    <div className="flex flex-col gap-3 w-full ">
      <SectionTitle
        align="center"
        title={t.about.educationTitle}
        icon={<GraduationCapIcon />}
      />
      <div className="flex flex-col gap-2 p-4">
        {education.map((edu) => (
          <EducationRow key={edu.index} education={edu} locale={locale} t={t} />
        ))}
      </div>
    </div>
  );
}
