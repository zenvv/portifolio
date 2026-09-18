import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/language.provider";
import type { Locale } from "@/lib/i18n/translations";
import { ArrowRightIcon } from "@phosphor-icons/react";
import TransitionLink from "@/components/TransitionLink";
import FallbackImage from "@/components/FallbackImage";
import { canonicalTechName } from "@/lib/tech-icons";
import { getProjectBannerCandidates } from "@/lib/project-content";
import { EASE, useScrollReveal } from "@/lib/motion";
import type { Project } from "@/data/projects";

const MAX_VISIBLE_TECHS = 4;
/** Stagger delay caps at this many rows so a long list doesn't push the
 * bottom rows' entrance out by several seconds. */
const MAX_STAGGER_INDEX = 8;
const STAGGER_STEP = 0.06;

/** A compact, full-width row for a `tier`-ed project (a collection post or a
 * minor logomark) sitting below the card grid on the projects page: thumbnail
 * on the left, everything else packed into one line-driven column on the
 * right. Lower visual hierarchy than {@link ProjectCard} through height and
 * layout alone, not opacity. */
export default function ProjectListRow({
  projeto,
  index,
  locale,
}: {
  projeto: Project;
  index: number;
  locale: Locale;
}) {
  const techLine = projeto.tecnologias
    .slice(0, MAX_VISIBLE_TECHS)
    .map(canonicalTechName)
    .join(" · ");

  const { ref, active, reduceMotion } = useScrollReveal<HTMLDivElement>();
  const { t } = useLanguage();
  const tierLabel = projeto.tier ? t.projects.tiers[projeto.tier] : null;

  return (
    <motion.div
      ref={ref}
      className="border-t first:border-t-0"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: Math.min(index, MAX_STAGGER_INDEX) * STAGGER_STEP,
        ease: EASE,
      }}
    >
      <TransitionLink
        to={`/projects/${projeto.slug}`}
        direction="forward"
        plain
        className="group flex items-center gap-4 py-2.5 sm:gap-5 hover:bg-muted/20"
      >
        {/* <FallbackImage
          candidates={getProjectBannerCandidates(projeto.slug)}
          alt={projeto.title[locale]}
          loading="lazy"
          decoding="async"
          wrapperClassName="aspect-16/9 w-16 shrink-0 border sm:w-20"
          className="transition-transform duration-300 group-hover:scale-105"
          projectType={projeto.type}
        /> */}

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="flex items-center gap-2 font-heading text-sm font-medium leading-tight sm:text-base">
            <span className="underline decoration-transparent transition-colors group-hover:decoration-primary">
              {projeto.title[locale]}
            </span>
            {tierLabel ? (
              <span className="shrink-0 border px-1.5 py-0.5 font-mono text-[0.6rem] font-normal uppercase tracking-wide text-muted-foreground">
                {tierLabel}
              </span>
            ) : null}
          </h2>
          <p className="text-xs text-muted-foreground leading-snug line-clamp-2 sm:text-sm">
            {projeto.shortDescription[locale]}
          </p>
          {/* {techLine ? (
            <span className="font-mono text-[0.7rem] text-muted-foreground/60 pt-0.5 truncate opacity-0 group-hover:opacity-100 transition-all">
              {techLine}
            </span>
          ) : null} */}
        </div>

        <ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </TransitionLink>
    </motion.div>
  );
}
