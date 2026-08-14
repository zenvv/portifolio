import { useLanguage } from "@/lib/i18n/language.provider";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  CodeIcon,
  GraphIcon,
  PenNibIcon,
  type Icon,
} from "@phosphor-icons/react";
import ProjectCard from "./components/ProjectCard";
import ProjectsEmptyState from "./components/ProjectsEmptyState";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLayoutEffect, useRef, useState } from "react";

import TransitionLink from "@/components/TransitionLink";
import { Projetos, type projectType } from "@/data/projects";
import { usePageMeta } from "@/lib/use-page-meta";

interface ptTypes {
  value: projectType;
  label: {
    en: string;
    pt: string;
  };
  icon: Icon;
  enabled: boolean;
  indicatorClass: string;
  textActiveClass: string;
  accent: string;
}

const projectTypes: ptTypes[] = [
  {
    value: "dev",
    label: {
      en: "Development",
      pt: "Desenvolvimento",
    },
    icon: CodeIcon,
    enabled: true,
    indicatorClass: "bg-violet-500 dark:bg-violet-800/50",
    textActiveClass:
      "data-pressed:text-white dark:data-pressed:text-violet-100",
    accent: "text-violet-600 dark:text-violet-400",
  },

  {
    value: "automation",
    label: {
      en: "Automation",
      pt: "Automação",
    },
    icon: GraphIcon,
    enabled: true,
    indicatorClass: "bg-blue-500 dark:bg-blue-800/50",
    textActiveClass: "data-pressed:text-white dark:data-pressed:text-blue-100",
    accent: "text-blue-600 dark:text-blue-400",
  },
  {
    value: "design",
    label: {
      en: "Design",
      pt: "Design",
    },
    icon: PenNibIcon,
    enabled: true,
    indicatorClass: "bg-amber-600 dark:bg-amber-800/50",
    textActiveClass: "data-pressed:text-white dark:data-pressed:text-amber-100",
    accent: "text-amber-600 dark:text-amber-400",
  },
];

export default function ProjectsPage() {
  const { locale, t } = useLanguage();
  usePageMeta(
    "zenvv / projetos",
    locale === "pt"
      ? "Projetos de desenvolvimento, automação e design de Willian Zeni (zenvv)."
      : "Development, automation and design projects by Willian Zeni (zenvv).",
  );
  const [selectedType, setSelectedType] = useState<projectType>("dev");
  const toggleGroupRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const filteredProjects = Projetos.filter((e) => e.type === selectedType);

  useLayoutEffect(() => {
    const measure = () => {
      const activeEl = toggleGroupRef.current?.querySelector<HTMLElement>(
        `[data-type="${selectedType}"]`,
      );
      if (activeEl) {
        setIndicator({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [selectedType, locale]);

  return (
    <div className="flex flex-col flex-1 w-full">
      <h1 className="sr-only">{t.hero.projects.title}</h1>
      <span className="flex w-full items-start flex-col justify-between mb-8 gap-4">
        <TransitionLink
          to="/"
          direction="backward"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit "
        >
          <ArrowLeftIcon className="size-3.5" />
          {t.projects.backToHome}
        </TransitionLink>
        <div className="flex flex-wrap md:flex-row flex-col items-center justify-center gap-x-2 gap-y-1 w-full">
          <span className="text-base font-medium md:w-auto w-full text-center ">
            {t.projects.startTitle}
          </span>
          <div className="min-w-full md:min-w-auto max-w-full  shrink-0 overflow-x-auto scroll-fade-x">
            <ToggleGroup
              ref={toggleGroupRef}
              className="relative gap-1 md:flex grid grid-cols-3 border p-0.5 h-10 rounded-full md:h-auto w-full!"
              value={[selectedType]}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-0.5 bottom-0.5 rounded-full transition-[transform,width,background-color] duration-300 ease-out",
                  projectTypes.find((types) => types.value === selectedType)
                    ?.indicatorClass,
                )}
                style={{
                  width: indicator.width,
                  transform: `translateX(${indicator.left}px)`,
                }}
              />
              {projectTypes.map((types) => (
                <ToggleGroupItem
                  key={types.value}
                  value={types.value}
                  data-type={types.value}
                  onClick={() => {
                    setSelectedType(types.value);
                  }}
                  className={cn(
                    "relative z-10 text-foreground text-xs! rounded-full h-7 hover:bg-transparent data-pressed:bg-transparent md:aspect-auto",
                    types.textActiveClass,
                  )}
                >
                  <types.icon />
                  <span className="">{types.label[locale]}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <span className="text-base font-medium md:w-auto w-full text-center ">
            {t.projects.endTitle}
          </span>
        </div>
      </span>

      {filteredProjects.length > 0 ? (
        <div className="flex-1 gap-2 flex flex-col">
          {filteredProjects.map((projeto, index) => (
            <ProjectCard
              className=""
              key={projeto.slug}
              projeto={projeto}
              index={index}
              locale={locale}
              t={t}
            />
          ))}
        </div>
      ) : (
        <ProjectsEmptyState type={selectedType} />
      )}
    </div>
  );
}
