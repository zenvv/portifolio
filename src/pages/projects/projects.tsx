import { useLanguage } from "@/lib/i18n/language.provider";
import { ArrowLeftIcon, MagicWandIcon } from "@phosphor-icons/react";
import { useMemo, useState } from "react";

import ProjectCard from "./components/ProjectCard";
import ProjectsEmptyState from "./components/ProjectsEmptyState";
import ProjectsFilterPanel from "./components/ProjectsFilterPanel";

import TransitionLink from "@/components/TransitionLink";
import SectionTitle from "@/components/SectionTitle";
import { Projetos } from "@/data/projects";
import { Companies } from "@/data/experience";
import { TECH_TYPES } from "@/data/stack";
import { canonicalTechName, getTechType } from "@/lib/tech-icons";
import type { ProjectTypeFilterValue } from "@/lib/project-type-meta";
import { usePageMeta } from "@/lib/use-page-meta";
import { Scales } from "@/src/components/ui/scales";

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
  usePageMeta(
    "zenvv / projetos",
    locale === "pt"
      ? "Projetos de desenvolvimento, automação e design de Willian Zeni (zenvv)."
      : "Development, automation and design projects by Willian Zeni (zenvv).",
  );

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] =
    useState<ProjectTypeFilterValue>("all");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const techGroups = useMemo(() => {
    const byType = new Map<(typeof TECH_TYPES)[number], Set<string>>();
    for (const p of Projetos) {
      for (const tec of p.tecnologias) {
        const canonical = canonicalTechName(tec);
        const type = getTechType(tec);
        if (!byType.has(type)) byType.set(type, new Set());
        byType.get(type)!.add(canonical);
      }
    }
    return TECH_TYPES.filter((type) => byType.has(type)).map((type) => ({
      label: t.hero.stack.types[type],
      options: Array.from(byType.get(type)!)
        .sort((a, b) => a.localeCompare(b))
        .map((name) => ({ value: name, label: name })),
    }));
  }, [t]);

  const companyOptions = useMemo(
    () => [
      ...COMPANY_GROUPS.map((name) => ({ value: name, label: name })),
      { value: PERSONAL_GROUP, label: t.projects.groups.personal },
    ],
    [t],
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return Projetos.filter((p) => {
      const matchesSearch =
        query === "" ||
        p.title[locale].toLowerCase().includes(query) ||
        p.shortDescription[locale].toLowerCase().includes(query);
      const matchesType = selectedType === "all" || p.type === selectedType;
      const matchesTechs =
        selectedTechs.length === 0 ||
        selectedTechs.some((tec) =>
          p.tecnologias.some((raw) => canonicalTechName(raw) === tec),
        );
      const matchesCompany =
        selectedCompanies.length === 0 ||
        selectedCompanies.includes(companyGroupOf(p.empresa));

      return matchesSearch && matchesType && matchesTechs && matchesCompany;
    });
  }, [search, selectedType, selectedTechs, selectedCompanies, locale]);

  const groups = useMemo(() => {
    const order = [...COMPANY_GROUPS, PERSONAL_GROUP];
    return order
      .map((group) => ({
        group,
        label: group === PERSONAL_GROUP ? t.projects.groups.personal : group,
        items: filteredProjects.filter(
          (p) => companyGroupOf(p.empresa) === group,
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [filteredProjects, t]);

  return (
    <div className="flex-1 flex flex-col ">
      <span className="flex w-full items-start flex-col justify-between mb-6 gap-4">
        <div className="p-2 border-b w-full flex justify-start items-center gap-4">
          <TransitionLink
            to="/"
            direction="backward"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit "
          >
            <ArrowLeftIcon className="size-3.5" />
            {t.projects.backToHome}
          </TransitionLink>
        </div>
      </span>

      <div className="p-0 pt-0 max-w-full flex-1 flex flex-col gap-6">
        <ProjectsFilterPanel
          t={t}
          search={search}
          onSearchChange={setSearch}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          techGroups={techGroups}
          selectedTechs={selectedTechs}
          onTechsChange={setSelectedTechs}
          companyOptions={companyOptions}
          selectedCompanies={selectedCompanies}
          onCompaniesChange={setSelectedCompanies}
        />

        {groups.length > 0 ? (
          <div className="flex flex-col gap-4 ">
            {groups.map(({ group, label, items }) => (
              <div key={group} className="flex flex-col gap-3">
                <SectionTitle
                  align="center"
                  title={label}
                  icon={
                    group === PERSONAL_GROUP ? (
                      <MagicWandIcon className="size-3.5" />
                    ) : companyIconByName.has(group) ? (
                      <img
                        src={companyIconByName.get(group)}
                        alt=""
                        className="size-4 shrink-0 rounded-xs object-contain"
                      />
                    ) : null
                  }
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                  {items.map((projeto, index) => (
                    <ProjectCard
                      key={projeto.slug}
                      projeto={projeto}
                      index={index}
                      locale={locale}
                      t={t}
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
      <span className="h-12 relative border-y">
        <Scales />
      </span>
    </div>
  );
}
