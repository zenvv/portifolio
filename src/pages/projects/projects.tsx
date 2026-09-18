import { useLanguage } from "@/lib/i18n/language.provider";
import { ArrowLeftIcon, MagicWandIcon } from "@phosphor-icons/react";
import { useMemo, useState } from "react";

import ProjectCard from "./components/ProjectCard";
import ProjectListRow from "./components/ProjectListRow";
import ProjectsEmptyState from "./components/ProjectsEmptyState";
import ProjectsFilterPanel from "./components/ProjectsFilterPanel";
import ProjectsTypeDrawer from "./components/ProjectsTypeDrawer";
import TransitionLink from "@/components/TransitionLink";
import SectionTitle from "@/components/SectionTitle";
import { Projetos, FeaturedProjetos } from "@/data/projects";
import { Companies } from "@/data/experience";
import type { ProjectTypeFilterValue } from "@/lib/project-type-meta";
import {
  usePageMeta,
  PROJECTS_TITLE,
  PROJECTS_DESCRIPTION,
} from "@/lib/use-page-meta";
import { PaintBrushIcon, StarIcon } from "@phosphor-icons/react";

const COMPANY_GROUPS = ["Bello Aramados", "Centro Tecnológico Randon"] as const;
const PERSONAL_GROUP = "__personal__";
const DESIGN_GROUP = "__design__";

const companyIconByName = new Map(Companies.map((c) => [c.name, c.icon]));

// Logomark work sinks into its own group at the very end, regardless of
// which company it was made for, instead of competing for attention inside
// that company's own group of software projects.
function companyGroupOf(projeto: { empresa?: string; type?: string }) {
  if (projeto.type === "design") return DESIGN_GROUP;
  if (projeto.empresa === "Bello Aramados") return "Bello Aramados";
  if (projeto.empresa === "Centro Tecnológico Randon")
    return "Centro Tecnológico Randon";
  return PERSONAL_GROUP;
}

export default function ProjectsPage() {
  const { locale, t } = useLanguage();
  usePageMeta(PROJECTS_TITLE[locale], PROJECTS_DESCRIPTION[locale]);

  const [selectedType, setSelectedType] =
    useState<ProjectTypeFilterValue>("all");

  // The 4 curated projects already lead the page in their own band; the
  // grouped lists below cover everything else, so they don't repeat here.
  const featuredSlugSet = useMemo(
    () => new Set(FeaturedProjetos.map((p) => p.slug)),
    [],
  );

  const filteredProjects = useMemo(() => {
    return Projetos.filter(
      (p) =>
        !featuredSlugSet.has(p.slug) &&
        (selectedType === "all" ||
          p.type === selectedType ||
          p.additionalTypes?.includes(selectedType)),
    );
  }, [selectedType, featuredSlugSet]);

  const groups = useMemo(() => {
    // Client work leads the page; personal work follows; design/logomark
    // work sinks to the very end regardless of who it was made for.
    const order = [...COMPANY_GROUPS, PERSONAL_GROUP, DESIGN_GROUP];
    return order
      .map((group) => ({
        group,
        label:
          group === PERSONAL_GROUP
            ? t.projects.groups.personal
            : group === DESIGN_GROUP
              ? t.projects.types.design
              : group,
        items: filteredProjects
          .filter((p) => companyGroupOf(p) === group)
          .sort((a, b) => {
            // Tiered entries (ecosystem/secondary) sink below normal-weight
            // ones, so a collection post or a minor logomark doesn't compete
            // for attention with the flagship work in the same group; date
            // order still applies within each bucket.
            const weight = (p: (typeof filteredProjects)[number]) =>
              p.tier ? 1 : 0;
            const byWeight = weight(a) - weight(b);
            if (byWeight !== 0) return byWeight;
            return b.createdAt.localeCompare(a.createdAt);
          }),
      }))
      .filter((g) => g.items.length > 0);
  }, [filteredProjects, t]);

  return (
    <div className="flex-1 flex flex-col w-full mx-auto max-w-5xl">
      <div className="py-2 w-full flex justify-between items-center gap-4 sticky top-[69px] z-40 bg-background sm:px-0 px-2">
        <TransitionLink
          to="/"
          direction="backward"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit not-sm:bg-muted"
        >
          <ArrowLeftIcon className="size-4" />
          <span className="hidden sm:flex">{t.projects.backToHome}</span>
        </TransitionLink>
        <h1 className="absolute left-1/2 max-w-[45%] -translate-x-1/2 truncate font-heading text-base italic text-foreground sm:max-w-[40%]">
          {t.projects.title}
        </h1>
        {/* <ProjectsFilterPanel
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
        /> */}
      </div>

      <div className="p-0 pt-6 min-w-0 max-w-full flex-1 flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-3 px-4 w-full">
          <SectionTitle
            align="start"
            title={t.hero.projects.title}
            icon={<StarIcon className="size-3.5" />}
          />
          <div className="grid w-full sm:grid-cols-4 gap-4 mb-12">
            {FeaturedProjetos.map((projeto, index) => (
              <ProjectCard
                mini={true}
                key={projeto.slug}
                projeto={projeto}
                index={index}
                locale={locale}
                t={t}
              />
            ))}
          </div>
        </div>

        {groups.length > 0 ? (
          <div className="flex flex-col gap-12 pb-8 w-full max-w-full">
            {groups.map(({ group, label, items }) => (
              <div key={group} className="flex flex-col gap-3 px-4 w-full">
                <SectionTitle
                  align="start"
                  title={label}
                  icon={
                    group === PERSONAL_GROUP ? (
                      <MagicWandIcon className="size-3.5" />
                    ) : group === DESIGN_GROUP ? (
                      <PaintBrushIcon className="size-3.5" />
                    ) : companyIconByName.has(group) ? (
                      <img
                        src={companyIconByName.get(group)}
                        alt=""
                        className="size-4 shrink-0 object-contain"
                      />
                    ) : null
                  }
                />
                <div className="flex flex-col">
                  {items.map((projeto, index) => (
                    <ProjectListRow
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
