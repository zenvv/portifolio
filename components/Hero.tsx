import { motion, useReducedMotion } from "motion/react";
import { Fragment, useState } from "react";
import { useLanguage } from "@/lib/i18n/language.provider";
import TransitionLink from "@/components/TransitionLink";
import DownloadCV from "./sidebar/DownloadCV";
import Images from "./sidebar/Images";
import { ArrowRightIcon, UserListIcon } from "@phosphor-icons/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const DEFAULT_STRETCH = 80;
const DEFAULT_WEIGHT = 600;
/** Furthest letters shrink down to this while hovering — thinner/more condensed than the resting state. */
const MIN_STRETCH = 75;
const MIN_WEIGHT = 200;
/** The hovered letter itself reaches this — the widest/boldest the font supports. */
const PEAK_STRETCH = 100;
const PEAK_WEIGHT = 800;
/** Effect strength by distance (in characters) from the hovered letter: 100/75/50/25/0%. */
const FALLOFF = [1, 0.75, 0.5, 0.25];

function Letter({
  char,
  index,
  hoveredIndex,
  onHover,
  instant,
}: {
  char: string;
  index: number;
  hoveredIndex: number | null;
  onHover: (index: number) => void;
  instant: boolean;
}) {
  const isHovering = hoveredIndex !== null;
  const distance = isHovering ? Math.abs(index - hoveredIndex) : Infinity;
  const strength = FALLOFF[distance] ?? 0;

  const fontStretch = isHovering
    ? MIN_STRETCH + strength * (PEAK_STRETCH - MIN_STRETCH)
    : DEFAULT_STRETCH;
  const fontWeight = isHovering
    ? MIN_WEIGHT + strength * (PEAK_WEIGHT - MIN_WEIGHT)
    : DEFAULT_WEIGHT;

  return (
    <motion.span
      className="inline-block"
      onMouseEnter={() => onHover(index)}
      animate={{ fontStretch: `${fontStretch}%`, fontWeight }}
      transition={{ duration: instant ? 0 : 0.3, ease: EASE }}
    >
      {char}
    </motion.span>
  );
}

/**
 * Masked word-by-word reveal on mount; each glyph individually grows in
 * stretch/weight on hover, with the effect falling off across neighbors
 * while the rest of the text sinks toward a thinner, more condensed floor.
 */
function InteractiveGreeting({
  text,
  startDelay = 0,
}: {
  text: string;
  startDelay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const words = text.split(" ");

  let globalIndex = 0;

  return (
    <span onMouseLeave={() => setHoveredIndex(null)}>
      {words.map((word, wi) => {
        const isLast = wi === words.length - 1;
        const letters = word.split("").map((char) => {
          const idx = globalIndex++;
          return (
            <Letter
              key={idx}
              char={char}
              index={idx}
              hoveredIndex={hoveredIndex}
              onHover={setHoveredIndex}
              instant={!!reduceMotion}
            />
          );
        });
        if (!isLast) globalIndex++;

        return (
          <Fragment key={wi}>
            <span className="inline-block overflow-hidden pb-0.5 align-bottom">
              {reduceMotion ? (
                <span className="inline-block">{letters}</span>
              ) : (
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: startDelay + wi * 0.06,
                    ease: EASE,
                  }}
                >
                  {letters}
                </motion.span>
              )}
            </span>
            {!isLast ? " " : ""}
          </Fragment>
        );
      })}
    </span>
  );
}

function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const greetingWordCount = t.hero.greeting.split(" ").length;
  const roleDelay = reduceMotion ? 0 : 0.1 + greetingWordCount * 0.06 + 0.1;

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center gap-4">
        <Images size="size-16" />
        <div className="flex flex-col gap-0.5">
          <h1 className="text-3xl cursor-default text-black dark:text-amber-400 font-semibold">
            <InteractiveGreeting text={t.hero.greeting} startDelay={0.1} />
          </h1>
          <motion.span
            initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: roleDelay, ease: EASE }}
            className="text-muted-foreground cursor-default text-xs transition-all uppercase tracking-tight font-mono"
          >
            {t.hero.label}
          </motion.span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground tracking-tight max-w-xl">
        {t.hero.tagline}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <TransitionLink
          to="/projects"
          direction="forward"
          size="lg"
          variant={"outline"}
          className="group px-4 relative isolate overflow-hidden  border border-amber-400! bg-amber-400! text-black gap-1.5 transition-colors duration-300 hover:bg-background!  hover:text-amber-400!"
        >
          <span className="relative z-10 inline-flex items-center gap-1.5 group-hover:shimmer  transition-all">
            {t.hero.cta.viewProjects}
            <ArrowRightIcon className="size-3.5" />
          </span>
        </TransitionLink>

        <DownloadCV className="" />

        <TransitionLink
          to="/about"
          direction="forward"
          variant="ghost"
          size="lg"
          className=" gap-2"
        >
          <UserListIcon className="size-4" />
          {t.hero.cta.aboutMe}
        </TransitionLink>
      </div>
    </div>
  );
}

export default Hero;
