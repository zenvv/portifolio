import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AsteriskIcon,
  CaretDownIcon,
  HeadCircuitIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import SectionTitle from "@/components/SectionTitle";
import type { Company, CompanyRole } from "@/data/experience";
import type { Locale, Translations } from "@/lib/i18n/translations";
import { GlobeIcon } from "@phosphor-icons/react/dist/ssr";

function RoleRow({
  role,
  locale,
  t,
}: {
  role: CompanyRole;
  locale: Locale;
  t: Translations;
}) {
  const [open, setOpen] = useState(false);
  const activities = role.activities[locale].filter((a) => a.trim() !== "");
  const hasActivities = activities.length > 0;

  return (
    <div className="flex flex-col py-3">
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium">{role.title[locale]}</span>
        <span className="text-xs text-muted-foreground">
          {role.start[locale]}–{role.end[locale]}
        </span>
        {role.note ? (
          <span className="text-[0.7rem] italic text-muted-foreground/70 mt-0.5">
            {role.note[locale]}
          </span>
        ) : null}
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
            <span className="flex flex-col gap-1.5 pt-3 pl-0.5">
              {activities.map((activity) => (
                <span
                  key={activity}
                  className="text-xs text-muted-foreground flex items-start gap-2"
                >
                  <AsteriskIcon
                    weight="bold"
                    className="shrink-0 size-3! mt-0.5"
                  />
                  {activity}
                </span>
              ))}
            </span>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </div>
  );
}

function CompanyCard({
  company,
  locale,
  t,
}: {
  company: Company;
  locale: Locale;
  t: Translations;
}) {
  return (
    <div className="flex flex-col gap-1 border-t pt-4 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3 pb-1">
        <span className="flex items-center justify-center size-7 shrink-0 overflow-hidden">
          <img
            src={company.icon}
            alt={company.name}
            className="size-full object-contain"
          />
        </span>
        <span className="text-sm font-semibold truncate">{company.name}</span>
        <a
          href={company.url}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <GlobeIcon className="size-3" />
          <span className="hidden sm:inline">{t.about.companiesWebsite}</span>
        </a>
      </div>
      <div className="flex flex-col divide-y divide-border/60">
        {company.roles.map((role) => (
          <RoleRow key={role.index} role={role} locale={locale} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function CompanySection({
  companies,
  locale,
  t,
}: {
  companies: Company[];
  locale: Locale;
  t: Translations;
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionTitle
        align="start"
        title={t.about.companiesTitle}
        icon={<HeadCircuitIcon />}
        titleLevel="h3"
      />
      <div className="flex flex-col gap-3 pt-1">
        {companies.map((company) => (
          <CompanyCard
            key={company.index}
            company={company}
            locale={locale}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
