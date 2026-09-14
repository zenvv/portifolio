import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment, useState } from "react";
import { useLanguage } from "@/lib/i18n/language.provider";
import TransitionLink from "@/components/TransitionLink";
import DownloadCV from "./sidebar/DownloadCV";
import { ArrowRightIcon } from "@phosphor-icons/react";
import CornerMarks from "@/components/CornerMarks";
import { EASE } from "@/lib/motion";

/** Entrance stagger: one group's worth of children settle in together,
 * each with the same fade+rise and the site's one confident-arrival ease,
 * so the sequence reads as a single deliberate motion instead of several
 * independently-timed effects fighting each other. */
const CONTAINER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const ITEM: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const DEFAULT_STRETCH = 60;
const DEFAULT_WEIGHT = 500;
/** Furthest letters shrink down to this while hovering: thinner/more condensed than the resting state. */
const MIN_STRETCH = 75;
const MIN_WEIGHT = 100;
/** The hovered letter itself reaches this: the widest/boldest the font supports. */
const PEAK_STRETCH = 100;
const PEAK_WEIGHT = 900;
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

/** Each glyph individually grows in stretch/weight on hover, with the effect
 * falling off across neighbors while the rest of the text sinks toward a
 * thinner, more condensed floor. No mount animation: the greeting is there
 * from the first frame. */
function InteractiveGreeting({ text }: { text: string }) {
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
            <span className="inline-block align-bottom">{letters}</span>
            {!isLast ? " " : ""}
          </Fragment>
        );
      })}
    </span>
  );
}

function Hero() {
  const { t } = useLanguage();
  const reduceMotion = !!useReducedMotion();

  return (
    <div className="relative sm:-mx-6 -mt-6 flex w-full flex-col items-center gap-7 bg-blueprint-grid mask-x-from-90% text-center sm:py-16">
      <CornerMarks />
      <motion.div
        className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 bg-radial from-background to-transparent h-full p-6 pt-12 sm:pt-16"
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        variants={CONTAINER}
      >
        <motion.div
          className="flex flex-col items-center gap-1.5"
          variants={ITEM}
        >
          <h1 className="cursor-default font-heading text-5xl italic text-foreground sm:text-6xl text-pretty md:max-w-full max-w-xs">
            <InteractiveGreeting text={t.hero.greeting} />
          </h1>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground/70">
            {t.hero.label}
          </span>
        </motion.div>

        <motion.p
          className="max-w-sm text-pretty text-sm tracking-tight text-muted-foreground"
          variants={ITEM}
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row w-full flex-wrap items-center justify-center gap-2"
          variants={ITEM}
        >
          <TransitionLink
            to="/projects"
            direction="forward"
            size="lg"
            variant="default"
            className="group gap-1.5 px-4 sm:w-auto w-64"
          >
            <span className="relative z-10 inline-flex items-center gap-1.5 transition-all group-hover:gap-2.5">
              {t.hero.cta.viewProjects}
              <ArrowRightIcon className="size-3.5" />
            </span>
          </TransitionLink>

          <DownloadCV />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
