import { useLanguage } from "@/lib/i18n/language.provider";
import { ArrowLeftIcon, MagicWandIcon } from "@phosphor-icons/react";
import { useMemo, useState } from "react";

import ProjectListRow from "./components/ProjectListRow";
import ProjectsEmptyState from "./components/ProjectsEmptyState";
import ProjectsFilterPanel from "./components/ProjectsFilterPanel";
import ProjectsTypeDrawer from "./components/ProjectsTypeDrawer";
import TransitionLink from "@/components/TransitionLink";
import SectionTitle from "@/components/SectionTitle";
import { Projetos } from "@/data/projects";
import { Companies } from "@/data/experience";
import type { ProjectTypeFilterValue } from "@/lib/project-type-meta";
import {
  usePageMeta,
  PROJECTS_TITLE,
  PROJECTS_DESCRIPTION,
} from "@/lib/use-page-meta";

const COMPANY_GROUPS = ["Bello Aramados", "Centro Tecnológico Randon"] as const;
const PERSONAL_GROUP = "__personal__";

const companyIconByName = new Map(Companies.map((c) => [c.name, c.icon]));

function companyGroupOf(empresa: string | undefined) {
  if (empresa === "Bello Aramados") return "Bello Aramados";
  if (empresa === "Centro Tecnológico Randon")
    return "Centro Tecnológico Randon";
  return PERSONAL_GROUP;
}

export default function ProjectsPage() {
  const { locale, t } = useLanguage();
  usePageMeta(PROJECTS_TITLE[locale], PROJECTS_DESCRIPTION[locale]);

  const [selectedType, setSelectedType] =
    useState<ProjectTypeFilterValue>("all");

  const filteredProjects = useMemo(() => {
    return Projetos.filter(
      (p) =>
        selectedType === "all" ||
        p.type === selectedType ||
        p.additionalTypes?.includes(selectedType),
    );
  }, [selectedType]);

  const groups = useMemo(() => {
    // Personal work leads the page; client work follows.
    const order = [PERSONAL_GROUP, ...COMPANY_GROUPS];
    return order
      .map((group) => ({
        group,
        label: group === PERSONAL_GROUP ? t.projects.groups.personal : group,
        items: filteredProjects
          .filter((p) => companyGroupOf(p.empresa) === group)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      }))
      .filter((g) => g.items.length > 0);
  }, [filteredProjects, t]);

  return (
    <div className="flex-1 flex flex-col w-full ">
      <div className="p-2 border-b w-full flex justify-between items-center gap-4 sticky top-[69px] z-40 bg-background">
        <TransitionLink
          to="/"
          direction="backward"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit "
        >
          <ArrowLeftIcon className="size-3.5" />
          {t.projects.backToHome}
        </TransitionLink>
        <h1 className="absolute left-1/2 max-w-[45%] -translate-x-1/2 truncate font-heading text-sm italic text-foreground sm:max-w-[40%]">
          {t.projects.title}
        </h1>
        <ProjectsFilterPanel
          t={t}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          className="hidden lg:flex"
        />
        <ProjectsTypeDrawer
          t={t}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          className="lg:hidden"
        />
      </div>

      <div className="p-0 pt-6 min-w-0 max-w-full flex-1 flex flex-col gap-6 w-full">
        {groups.length > 0 ? (
          <div className="flex flex-col gap-8 pb-8 w-full max-w-full">
            {groups.map(({ group, label, items }) => (
              <div key={group} className="flex flex-col gap-3 px-4 w-full">
                <SectionTitle
                  align="start"
                  title={label}
                  icon={
                    group === PERSONAL_GROUP ? (
                      <MagicWandIcon className="size-3.5" />
                    ) : companyIconByName.has(group) ? (
                      <img
                        src={companyIconByName.get(group)}
                        alt=""
                        className="size-4 shrink-0 object-contain"
                      />
                    ) : null
                  }
                />
                <div className="flex flex-col w-full">
                  {items.map((projeto, index) => (
                    <ProjectListRow
                      key={projeto.slug}
                      projeto={projeto}
                      index={index}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProjectsEmptyState />
        )}
      </div>
    </div>
  );
}
