import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/language.provider";
import TransitionLink from "@/components/TransitionLink";
import SectionTitle from "@/components/SectionTitle";
import { Projetos, FEATURED_SLUGS } from "@/data/projects";
import { cn } from "@/lib/utils";
import { EASE, useScrollReveal } from "@/lib/motion";
import { ArrowRightIcon } from "@phosphor-icons/react";

const featuredSet = new Set<string>(FEATURED_SLUGS);
const otherProjects = Projetos.filter((p) => !featuredSet.has(p.slug));

const ROW_STAGGER = 0.04;
const ROW_STAGGER_CAP = 10;

/** Every project not in the home's featured grid, as a plain name + one-line
 * pitch + link row: no image, no card, so it doesn't compete for attention
 * with the 4 featured projects above it. */
export default function OtherProjectsList({
  className,
}: {
  className?: string;
}) {
  const { t, locale } = useLanguage();
  const { ref, active, reduceMotion } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1 w-full mx-auto max-w-5xl my-8 px-6 lg:px-0",
        className,
      )}
    >
      <SectionTitle
        title={t.hero.projects.otherTitle}
        align="start"
        className=" sm:flex hidden"
      />
      <div className=" flex-col divide-y divide-border scroll-fade-b scroll-fade-[100%] sm:flex hidden">
        {otherProjects
          .filter((i) => i.index < 8)
          .map((projeto, index) => (
            <motion.div
              key={projeto.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.35,
                delay: Math.min(index, ROW_STAGGER_CAP) * ROW_STAGGER,
                ease: EASE,
              }}
            >
              <TransitionLink
                to={`/projects/${projeto.slug}`}
                direction="forward"
                plain
                className="group flex items-center justify-between gap-4 py-2.5"
              >
                <span className="flex min-w-0 flex-1 items-baseline gap-2">
                  <span className="shrink-0 font-heading text-sm font-medium underline decoration-transparent transition-colors group-hover:decoration-primary">
                    {projeto.title[locale]}
                  </span>
                  <span className="min-w-0 truncate text-sm text-muted-foreground">
                    {projeto.shortDescription[locale]}
                  </span>
                </span>
                <ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </TransitionLink>
            </motion.div>
          ))}
      </div>
      <motion.div className="flex flex-col sm:flex-row w-full flex-wrap items-center justify-center gap-2">
        <TransitionLink
          to="/projects"
          direction="forward"
          variant="ghost"
          className="group gap-1.5 px-4"
        >
          <span className="relative z-10 inline-flex items-center gap-1.5 transition-all group-hover:gap-2.5">
            {t.hero.cta.viewProjects}
            <ArrowRightIcon className="size-3.5" />
          </span>
        </TransitionLink>
      </motion.div>
    </div>
  );
}
