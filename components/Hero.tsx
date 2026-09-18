import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment, useState } from "react";
import { useLanguage } from "@/lib/i18n/language.provider";
import TransitionLink from "@/components/TransitionLink";
import DownloadCV from "./sidebar/DownloadCV";
import OpenToWorkBadge from "@/components/OpenToWorkBadge";
import {
  ArrowRightIcon,
  CodeIcon,
  DatabaseIcon,
  GithubLogoIcon,
  LightningIcon,
  LinkedinLogoIcon,
  PaintBrushIcon,
} from "@phosphor-icons/react";
import CornerMarks from "@/components/CornerMarks";
import { EASE } from "@/lib/motion";
import { Contact } from "@/data/contact";
import type { SocialsType } from "./sidebar/Contact";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const CAPABILITY_ICON = {
  development: CodeIcon,
  automation: LightningIcon,
  data: DatabaseIcon,
  design: PaintBrushIcon,
} as const;

const CAPABILITY_ORDER = [
  "development",
  "automation",
  "data",
  "design",
] as const;

const socials: SocialsType[] = [
  {
    id: 0,
    label: "Github",
    icon: GithubLogoIcon,
    link: Contact.github,
    captionKey: "github",
  },
  {
    id: 1,
    label: "LinkedIn",
    icon: LinkedinLogoIcon,
    link: Contact.linkedin,
    captionKey: "linkedin",
  },
];

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
    <div className="relative flex w-full flex-col items-center gap-7 text-start sm:py-16">
      <div className="absolute bg-blueprint-grid h-1/2 inset-0 z-0 mask-b-from-0"></div>
      <CornerMarks />
      <motion.div
        className="mx-auto flex w-full max-w-5xl flex-col items-center sm:items-start gap-4 h-full p-6 z-10 sm:text-start text-center"
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        variants={CONTAINER}
      >
        <motion.div variants={ITEM}>
          <OpenToWorkBadge />
        </motion.div>

        <motion.div
          className="flex w-full flex-col items-center sm:items-start gap-1.5"
          variants={ITEM}
        >
          <h1 className="cursor-default font-heading text-5xl italic text-foreground sm:text-6xl text-pretty md:max-w-full max-w-xs">
            <InteractiveGreeting text={t.hero.name} />
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
          className="flex flex-col sm:flex-row w-full flex-wrap items-center justify-start gap-2"
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

          <span className="hidden md:flex items-center gap-1 ml-2">
            {socials.map((social) => (
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={"ghost"}
                    className={"group"}
                    render={
                      <a
                        key={social.id}
                        href={social.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <social.icon className="group-hover:hidden block" />
                        <social.icon
                          weight="fill"
                          className="group-hover:block hidden"
                        />
                      </a>
                    }
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom">{social.label}</TooltipContent>
              </Tooltip>
            ))}
          </span>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center sm:items-start justify-center sm:justify-start sm:gap-8 gap-4 w-full pt-8"
          variants={ITEM}
        >
          {CAPABILITY_ORDER.map((key) => {
            const Icon = CAPABILITY_ICON[key];
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-muted-foreground hover:text-foreground/80 select-none"
              >
                <Icon className="size-3.5" />
                <span className="sm:block hidden">
                  {t.hero.capabilities[key]}
                </span>
              </span>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
