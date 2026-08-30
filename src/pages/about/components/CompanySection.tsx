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
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col p-3.5 transition-colors hover:bg-muted/30">
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium">{role.title[locale]}</span>
        <span className="text-xs text-muted-foreground">
          {role.start[locale]} — {role.end[locale]}
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
    <div className="flex flex-col border rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 p-3.5 border-b">
        <span className="flex items-center justify-center size-8 border bg-background shrink-0 overflow-hidden rounded-sm">
          <img
            src={company.icon}
            alt={company.name}
            className="size-full object-contain"
          />
        </span>
        <span className="text-sm font-medium truncate">{company.name}</span>
        <span className="flex-1 flex items-start justify-end">
          <Button
            variant={"outline"}
            size="sm"
            render={<a href={company.url} target="_blank"></a>}
          >
            <GlobeIcon />
            {t.about.companiesWebsite}
          </Button>
        </span>
      </div>
      <div className="flex flex-col divide-y">
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
        align="center"
        title={t.about.companiesTitle}
        icon={<HeadCircuitIcon />}
      />
      <div className="flex flex-col gap-3 p-4">
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
