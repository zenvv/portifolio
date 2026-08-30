import { useLanguage } from "@/lib/i18n/language.provider";
import ProjectCard from "@/src/pages/projects/components/ProjectCard";
import { Projetos } from "@/data/projects";
import { cn } from "@/lib/utils";

const featuredProjects = Projetos.filter((proj) => proj.featured).slice(0, 3);

export default function FeaturedProjects({
  className,
}: {
  className?: string;
}) {
  const { t, locale } = useLanguage();

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <h2 className="text-sm font-semibold text-foreground">
        {t.hero.projects.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {featuredProjects.map((proj, index) => (
          <ProjectCard
            key={proj.slug}
            projeto={proj}
            index={index}
            locale={locale}
            t={t}
            compact
          />
        ))}
      </div>
    </div>
  );
}
