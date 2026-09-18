import type { ReactNode } from "react";
import { AsteriskIcon, HeadCircuitIcon } from "@phosphor-icons/react";
import TransitionLink from "@/components/TransitionLink";
import SectionTitle from "@/components/SectionTitle";
import {
  OPEN_TO_WORK,
  type Activity,
  type Company,
  type CompanyRole,
} from "@/data/experience";
import type { Locale, Translations } from "@/lib/i18n/translations";
import { GlobeIcon } from "@phosphor-icons/react/dist/ssr";

/** Matches a `[[label|project-slug]]` span inside an activity's text. */
const PROJECT_LINK_PATTERN = /\[\[(.+?)\|(.+?)\]\]/g;

/** Renders an activity's text, turning any `[[label|project-slug]]` span
 * into a link to that project's page. */
function renderActivityText(text: string) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  PROJECT_LINK_PATTERN.lastIndex = 0;
  while ((match = PROJECT_LINK_PATTERN.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, label, slug] = match;
    nodes.push(
      <TransitionLink
        key={match.index}
        to={`/projects/${slug}`}
        direction="forward"
        plain
        className="text-foreground underline underline-offset-2 decoration-muted-foreground/40 hover:decoration-foreground transition-colors"
      >
        {label}
      </TransitionLink>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes;
}

function OpenToWorkCard({ t }: { t: Translations }) {
  return (
    <div className="flex items-center gap-4 bg-linear-to-r from-primary/5 via-transparent to-transparent border p-3 pl-4">
      <span className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
      <div className="flex flex-col min-w-0">
        <span className="text-base font-semibold text-foreground font-heading italic ">
          {t.about.openToWorkTitle}
        </span>
        <span className="text-xs text-muted-foreground">
          {t.about.openToWorkDescription}
        </span>
      </div>
    </div>
  );
}

function RoleRow({
  role,
  locale,
}: {
  role: CompanyRole;
  locale: Locale;
}) {
  const activities = role.activities.filter(
    (a: Activity) => a.text[locale].trim() !== "",
  );

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

      {activities.length > 0 ? (
        <span className="flex flex-col gap-1.5 pt-3 pl-0.5">
          {activities.map((activity) => (
            <span
              key={activity.text[locale]}
              className="text-xs text-muted-foreground flex items-start gap-2"
            >
              <AsteriskIcon weight="bold" className="shrink-0 size-3! mt-0.5" />
              <span>{renderActivityText(activity.text[locale])}</span>
            </span>
          ))}
        </span>
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
          <RoleRow key={role.index} role={role} locale={locale} />
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
        {OPEN_TO_WORK ? <OpenToWorkCard t={t} /> : null}
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
