import { motion } from "motion/react";
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

/** A single row in the projects page's running list: thumbnail on the left,
 * everything else packed into one line-driven column on the right, built to
 * scan many projects fast, not to showcase each one individually (that's
 * what the project-detail page is for). */
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
        className="group flex items-center gap-4 py-3 sm:gap-5 hover:bg-muted/20 px-4"
      >
        <span className="hidden font-heading italic tabular-nums text-xs text-muted-foreground/50 sm:block">
          {String(index + 1).padStart(2, "0")}
        </span>

        <FallbackImage
          candidates={getProjectBannerCandidates(projeto.slug)}
          alt={projeto.title[locale]}
          loading="lazy"
          decoding="async"
          wrapperClassName="aspect-16/9 w-24 shrink-0 border sm:w-32"
          className="transition-transform duration-300 group-hover:scale-105"
          projectType={projeto.type}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="font-heading text-sm font-medium leading-tight sm:text-base underline decoration-transparent transition-colors group-hover:decoration-primary">
            {projeto.title[locale]}
          </h2>
          <p className="text-xs text-muted-foreground leading-snug line-clamp-2 sm:text-sm">
            {projeto.shortDescription[locale]}
          </p>
          {techLine ? (
            <span className="font-mono text-[0.7rem] text-muted-foreground/60 pt-0.5 truncate">
              {techLine}
            </span>
          ) : null}
        </div>

        <ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </TransitionLink>
    </motion.div>
  );
}
