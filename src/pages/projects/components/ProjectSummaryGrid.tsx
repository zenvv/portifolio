import type { Locale, Translations } from "@/lib/i18n/translations";
import { canonicalTechName } from "@/lib/tech-icons";

/** The fixed-template project page's "at a glance" row: role, duration,
 * stack and status side by side, so the reader gets the shape of the
 * project before scrolling into problem/solution. */
export default function ProjectSummaryGrid({
  role,
  duration,
  status,
  tecnologias,
  locale,
  t,
}: {
  role: string;
  duration: string;
  status: string;
  tecnologias: string[];
  locale: Locale;
  t: Translations;
}) {
  const items = [
    { label: t.projects.role, value: role },
    { label: t.projects.duration, value: duration },
    {
      label: t.hero.stack.title,
      value: tecnologias.slice(0, 3).map(canonicalTechName).join(" · "),
    },
    { label: t.projects.status, value: status },
  ];

  return (
    <div
      lang={locale}
      className="w-full flex sm:flex-row sm:divide-x sm:divide-y-0 flex-col divide-y"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col flex-1 w-full sm:gap-1 p-4 text-left"
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground/70">
            {item.label}
          </span>
          <span className="text-sm font-medium text-foreground">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
