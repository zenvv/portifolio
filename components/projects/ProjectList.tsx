import { Projetos, type projectType } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

import { useLanguage } from "@/lib/i18n/language.provider";
import type { ProjectDetails } from "@/lib/project-content";
import { cn } from "@/lib/utils";
import { CodeIcon, PenNibIcon } from "@phosphor-icons/react";

function ProjectList({
  type,
  projectDetails,
}: {
  type: projectType;
  projectDetails: ProjectDetails;
}) {
  const { locale, t } = useLanguage();

  return (
    <div className="flex flex-col flex-1 w-full mt-8">
      <span className="flex items-start gap-2">
        {type === "dev" ? (
          <CodeIcon className="mt-0.5 size-5" />
        ) : (
          <PenNibIcon className="mt-0.5 size-5" />
        )}
        <span
          className={cn(
            "text-sm mb-3 font-semibold underline underline-offset-4 decoration-wavy",
            type === "dev" ? "decoration-amber-500" : "decoration-indigo-500",
          )}
        >
          {type === "dev"
            ? t.projects.devProjectsHeader
            : t.projects.designProjectsHeader}
        </span>
      </span>
      <div className="flex-1 flex flex-col md:grid md:grid-cols-2  gap-2">
        {Projetos.filter((projeto) => projeto.type == type).map(
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

export default ProjectList;
