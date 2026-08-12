import { Projetos, type projectType } from "@/lib/projects";

import { useLanguage } from "@/lib/i18n/language.provider";
import { loadProjectDetails, type ProjectDetails } from "@/lib/project-content";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  CodeIcon,
  DatabaseIcon,
  GraphIcon,
  PenNibIcon,
  type Icon,
} from "@phosphor-icons/react";
import ProjectCard from "./components/ProjectCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useRef, useState } from "react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface ptTypes {
  value: projectType;
  label: {
    en: string;
    pt: string;
  };
  icon: Icon;
  enabled: boolean;
  color: string;
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
    color:
      "data-pressed:bg-violet-500 data-pressed:text-white dark:data-pressed:bg-violet-800/50 dark:data-pressed:text-violet-100",
    accent: "text-violet-600 dark:text-violet-400",
  },
  {
    value: "design",
    label: {
      en: "Design",
      pt: "Design",
    },
    icon: PenNibIcon,
    enabled: true,
    color:
      "data-pressed:bg-amber-600 data-pressed:text-white dark:data-pressed:bg-amber-800/50 dark:data-pressed:text-amber-100",
    accent: "text-amber-600 dark:text-amber-400",
  },
  {
    value: "automation",
    label: {
      en: "Automation",
      pt: "Automação",
    },
    icon: GraphIcon,
    enabled: true,
    color:
      "data-pressed:bg-blue-500 data-pressed:text-white dark:data-pressed:bg-blue-800/50 dark:data-pressed:text-blue-100",
    accent: "text-blue-600 dark:text-blue-400",
  },
];

export default function ProjectsPage() {
  const { locale, t } = useLanguage();
  const [selectedType, setSelectedType] = useState<projectType>("dev");

  const projectDetails = loadProjectDetails();

  return (
    <div className="flex flex-col flex-1 w-full animate-fade-left">
      <span className="flex w-full items-start flex-col justify-between mb-8 gap-3">
        <Link
          to="/"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit "
        >
          <ArrowLeftIcon className="size-3.5" />
          {t.projects.backToHome}
        </Link>
        <div className="flex items-center justify-center gap-3 w-full">
          <span className="text-base font-medium  text-center ">
            {t.projects.startTitle}
          </span>
          <ToggleGroup
            className="gap-1 border p-0.5 rounded-full h-auto"
            value={[selectedType]}
          >
            {projectTypes.map((types) => (
              <ToggleGroupItem
                key={types.value}
                value={types.value}
                onClick={() => {
                  setSelectedType(types.value);
                }}
                className={cn(
                  "text-foreground text-xs! rounded-full h-7 hover:bg-background",
                  types.color,
                )}
              >
                <types.icon /> {types.label[locale]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <span className="text-base font-medium  text-center ">
            {t.projects.endTitle}
          </span>
        </div>
      </span>

      <div className="flex-1 gap-2 flex flex-col">
        {Projetos.filter((e) => e.type === selectedType).map(
          (projeto, index) => (
            <ProjectCard
              className=""
              key={projeto.slug}
              projeto={projeto}
              index={index}
              locale={locale}
              t={t}
              markdown={projectDetails[projeto.slug]?.[locale]}
            />
          ),
        )}
      </div>
    </div>
  );
}
