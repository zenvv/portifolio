// import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/language.provider";

import { getTechIcon, getSolidTechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import TechIcon from "@/components/TechIcon";

import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

// import { CaretDownIcon } from "@phosphor-icons/react";
import { StackList, TECH_TYPES, type techType } from "@/data/stack";
import SectionTitle from "../SectionTitle";

// const TILE_STAGGER = 0.045;
// const TILE_STAGGER_CAP = 14;
const TILE_DURATION = 0.3;

function LearningBadge() {
  const { t } = useLanguage();

  return (
    <span className="text-[0.55rem] leading-none px-1.5 py-0.5 text-muted-foreground border font-medium uppercase tracking-wide">
      {t.hero.stack.learningBadge}
    </span>
  );
}

/**
 * Solid icon by default, colored icon revealed on hover (CSS-only cross-fade).
 * Requires a `group` ancestor to drive the hover state.
 */
function TechIconSwap({
  name,
  invert,
  className,
}: {
  name: string;
  invert?: boolean;
  className?: string;
}) {
  const solid = getSolidTechIcon(name);
  const colored = getTechIcon(name);

  if (!solid && !colored) return null;

  const base = invert ? colored : solid;
  const hover = invert ? solid : colored;

  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      {base ? (
        <TechIcon
          icon={base}
          className={cn(
            "absolute inset-0 size-full transition-all duration-200",
            hover &&
              "opacity-100 scale-100 group-hover:scale-90 group-hover:opacity-0",
          )}
        />
      ) : null}
      {hover ? (
        <TechIcon
          icon={hover}
          className={cn(
            "absolute inset-0 size-full transition-all duration-200",
            base
              ? "opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100"
              : "opacity-100",
          )}
        />
      ) : null}
    </span>
  );
}

/** Icon-only tile, larger than the old text pill; the name only shows in a
 * tooltip on hover/focus so the row reads as a clean mark grid. Fades and
 * scales in once, staggered by `delay`, as the row scrolls into view. */
function FeaturedIconTile({
  tech,
  active,
  reduceMotion,
  delay,
}: {
  tech: (typeof StackList)[number];
  active: boolean;
  reduceMotion: boolean;
  delay: number;
}) {
  const { t } = useLanguage();
  const icon = getTechIcon(tech.name);

  return (
    <motion.span
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
      animate={active ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: TILE_DURATION, delay, ease: EASE }}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <a
              href={tech.link}
              target="_blank"
              rel="noreferrer"
              aria-label={tech.name}
              className="group relative flex size-10 shrink-0 items-center justify-center border border-transparent text-muted-foreground opacity-70 transition-all bg-linear-to-t from-transparent to-transparent hover:from-muted hover:border-border hover:text-foreground hover:opacity-100 sm:size-11 outline outline-dotted outline-transparent hover:outline-border outline-offset-8 hover:outline-offset-4 "
            />
          }
        >
          {icon ? (
            <TechIconSwap
              name={tech.name}
              invert={false}
              className="size-6 shrink-0 transition-all sm:size-7"
            />
          ) : null}
          {tech.learning ? (
            <span
              aria-hidden
              className="absolute top-1.5 right-1.5 size-1.5 bg-primary"
            />
          ) : null}
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {tech.name}
          {tech.learning ? ` · ${t.hero.stack.learningBadge}` : ""}
        </TooltipContent>
      </Tooltip>
    </motion.span>
  );
}

/** condensed row for the categorized modal list: solid icon by default, colored on hover */
function StackListItem({ tech }: { tech: (typeof StackList)[number] }) {
  const solid = getSolidTechIcon(tech.name);

  return (
    <a
      href={tech.link}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-2 rounded-md px-1.5 py-1 text-xs text-foreground/80 hover:text-foreground"
    >
      {solid ? <TechIcon icon={solid} className={cn("size-3")} /> : null}
      <span className="flex flex-1 min-w-0 items-center flex-wrap gap-x-1.5 gap-y-0.5">
        <span className="truncate">{tech.name}</span>
        {tech.learning ? <LearningBadge /> : null}
      </span>
    </a>
  );
}

function StackColumn({ type }: { type: techType }) {
  const { t } = useLanguage();
  const techs = StackList.filter((tech) => tech.type === type);

  if (techs.length === 0) return null;

  return (
    <div className="flex flex-col gap-1 min-w-0 break-inside-avoid mb-4">
      <p className="uppercase text-[0.65rem] tracking-wide text-muted-foreground/60 font-medium px-1.5">
        {t.hero.stack.types[type]}
      </p>
      <div className="flex flex-col">
        {techs.map((tech) => (
          <StackListItem key={tech.index} tech={tech} />
        ))}
      </div>
    </div>
  );
}

// const featuredList = StackList.filter((tech) => tech.featured);

export default function StackSection({ className }: { className?: string }) {
  const { t } = useLanguage();
  // const [open, setOpen] = useState(false);
  // const { ref, active, reduceMotion } = useScrollReveal<HTMLDivElement>();

  return (
    <div className="flex flex-col gap-8 bg-muted py-10">
      <SectionTitle title={t.hero.stack.title} align="center" divider={false} />
      <div className="columns-2 sm:columns-4 gap-4 pt-4 max-w-5xl mx-auto">
        {TECH_TYPES.map((type) => (
          <StackColumn key={type} type={type} />
        ))}
      </div>
      {/* <div
          ref={ref}
          className="mx-auto flex max-w-66 flex-wrap items-center justify-center gap-4 sm:max-w-71 lg:max-w-none"
        >
          {featuredList.map((tech, index) => (
            <FeaturedIconTile
              key={tech.index}
              tech={tech}
              active={active}
              reduceMotion={reduceMotion}
              delay={Math.min(index, TILE_STAGGER_CAP) * TILE_STAGGER}
            />
          ))}
        </div>
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className={cn("w-full max-w-5xl mx-auto", className)}
      >
        

        <div className="flex justify-center pt-3 ">
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-muted-foreground"
              />
            }
          >
            {open ? t.hero.stack.showLess : t.hero.stack.showAll}
            <CaretDownIcon
              className={cn(
                "size-3 transition-transform",
                open && "rotate-180",
              )}
            />
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          
        </CollapsibleContent>
      </Collapsible> */}
    </div>
  );
}
