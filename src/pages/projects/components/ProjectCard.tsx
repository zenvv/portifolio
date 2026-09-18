import { motion } from "motion/react";
import type { Locale, Translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@phosphor-icons/react";
import TransitionLink from "@/components/TransitionLink";
import FallbackImage from "@/components/FallbackImage";
import { canonicalTechName } from "@/lib/tech-icons";
import { getProjectBannerCandidates } from "@/lib/project-content";
import type { Project } from "@/data/projects";
import { EASE, WIPE } from "@/lib/motion";

const MAX_VISIBLE_TECHS = 3;
const CARD_STAGGER = 0.12;
const BADGE_DURATION = 0.3;
const BANNER_DELAY_OFFSET = 0.08;
const BANNER_DURATION = 0.45;
const RISE_DELAY_OFFSET = 0.3;
const RISE_DURATION = 0.35;

function ProjectCard({
  projeto,
  index,
  locale,
  t,
  className,
  active = true,
  mini = false,
  reduceMotion = false,
}: {
  projeto: Project;
  index: number;
  locale: Locale;
  t: Translations;
  className?: string;
  /** Plays this card's entrance once true; defaults to already-active for
   * callers outside a scroll-triggered grid. */
  active?: boolean;
  mini?: boolean;
  reduceMotion?: boolean;
}) {
  const techLine = projeto.tecnologias
    .slice(0, MAX_VISIBLE_TECHS)
    .map(canonicalTechName)
    .join(" · ");

  const base = index * CARD_STAGGER;

  return (
    <TransitionLink
      to={`/projects/${projeto.slug}`}
      direction="forward"
      plain
      className={cn("group flex flex-col gap-3", className)}
    >
      <motion.div
        className="aspect-video w-full overflow-hidden border"
        initial={reduceMotion ? false : { clipPath: WIPE.left.from }}
        animate={active ? { clipPath: WIPE.left.to } : {}}
        transition={{
          duration: BANNER_DURATION,
          delay: base + BANNER_DELAY_OFFSET,
          ease: EASE,
        }}
      >
        <FallbackImage
          candidates={getProjectBannerCandidates(projeto.slug)}
          alt={projeto.title[locale]}
          loading="lazy"
          decoding="async"
          wrapperClassName="aspect-video w-full"
          className="transition-transform duration-300 group-hover:scale-105"
          projectType={projeto.type}
        />
      </motion.div>

      <motion.div
        className="flex flex-col gap-1 shrink-0"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: RISE_DURATION,
          delay: base + RISE_DELAY_OFFSET,
          ease: EASE,
        }}
      >
        <h2
          className={cn(
            "font-heading text-base font-medium leading-tight w-fit border-b border-transparent transition-colors group-hover:border-primary",
            mini ? "line-clamp-1" : "",
          )}
        >
          {projeto.title[locale]}
        </h2>
        {!mini ? (
          <>
            <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
              {projeto.shortDescription[locale]}
            </p>
            {techLine ? (
              <span className="font-mono text-xs text-muted-foreground/60 pt-1">
                {techLine}
              </span>
            ) : null}{" "}
          </>
        ) : null}
        <span className="inline-flex w-fit items-center gap-1 pt-1.5 text-xs font-semibold transition-[gap] group-hover:gap-1.5">
          {t.projects.readMore}
          <ArrowRightIcon className="size-3" />
        </span>
      </motion.div>
    </TransitionLink>
  );
}

export default ProjectCard;
