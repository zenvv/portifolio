import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE, WIPE, useScrollReveal } from "@/lib/motion";

export type SectionTitleAlign = "start" | "center" | "end";

const ROW_JUSTIFY: Record<SectionTitleAlign, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

const TEXT_ALIGN: Record<SectionTitleAlign, string> = {
  start: "text-left",
  center: "text-center",
  end: "text-right",
};

const RULE_DURATION = 0.45;
const LABEL_DELAY = 0.15;
const LABEL_DURATION = 0.3;
const SUBTITLE_DELAY = 0.32;

/** A hairline that wipes in left-to-right instead of just appearing, the
 * same reveal every drafting-mark element on the site uses. */
function Rule({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  return (
    <motion.span
      className="h-px min-w-6 flex-1 bg-border"
      aria-hidden
      initial={reduceMotion ? false : { clipPath: WIPE.left.from }}
      animate={active ? { clipPath: WIPE.left.to } : {}}
      transition={{ duration: RULE_DURATION, ease: EASE }}
    />
  );
}

/**
 * Shared section-label pattern (e.g. "Educação", "Experiência", "Contato"):
 * a mono label flanked by hairline rules, sized to `align`. `divider` should
 * be disabled when the caller already provides its own separator. Plays
 * once as the label scrolls into view: the rule(s) wipe in, then the label
 * and subtitle fade up.
 */
export default function SectionTitle({
  title,
  subtitle,
  icon,
  align = "start",
  divider = true,
  className,
  titleClassName,
  titleLevel: TitleTag = "h2",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  align?: SectionTitleAlign;
  divider?: boolean;
  className?: string;
  titleClassName?: string;
  /** Heading level for `title`; defaults to h2; pass "h3" when this section
   * nests under another SectionTitle's h2 (e.g. inside a larger region). */
  titleLevel?: "h2" | "h3";
}) {
  const { ref, active, reduceMotion } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("flex w-full flex-col gap-1.5", className)}>
      <div className={cn("flex w-full items-center gap-3", ROW_JUSTIFY[align])}>
        {divider && align !== "start" ? (
          <Rule active={active} reduceMotion={reduceMotion} />
        ) : null}
        <motion.span
          className="inline-flex shrink-0 items-center gap-1.5"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: LABEL_DURATION, delay: LABEL_DELAY, ease: EASE }}
        >
          {icon}
          <TitleTag
            className={cn(
              "font-mono text-xs font-medium uppercase tracking-widest text-foreground",
              titleClassName,
            )}
          >
            {title}
          </TitleTag>
        </motion.span>
        {divider && align !== "end" ? (
          <Rule active={active} reduceMotion={reduceMotion} />
        ) : null}
      </div>
      {subtitle ? (
        <motion.p
          className={cn(
            "text-xs leading-snug text-muted-foreground",
            TEXT_ALIGN[align],
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: LABEL_DURATION, delay: SUBTITLE_DELAY, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
