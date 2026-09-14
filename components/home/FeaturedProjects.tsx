import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/language.provider";
import ProjectCard from "@/src/pages/projects/components/ProjectCard";
import { FeaturedProjetos } from "@/data/projects";
import { cn } from "@/lib/utils";
import { EASE, useScrollReveal } from "@/lib/motion";

const featuredProjects = FeaturedProjetos;

export default function FeaturedProjects({
  className,
}: {
  className?: string;
}) {
  const { t, locale } = useLanguage();
  const { ref, active, reduceMotion } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("flex flex-col gap-1 w-full", className)}>
      <motion.h2
        className="font-heading text-xl font-medium italic text-foreground mb-4"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {t.hero.projects.title}
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {featuredProjects.map((proj, index) => (
          <ProjectCard
            key={proj.slug}
            projeto={proj}
            index={index}
            locale={locale}
            t={t}
            active={active}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </div>
  );
}
