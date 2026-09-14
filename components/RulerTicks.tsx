import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE, WIPE } from "@/lib/motion";

const LINE_DURATION = 0.5;
const TICK_START = 0.35;
const TICK_STAGGER = 0.05;
const TICK_DURATION = 0.3;

/** A row of coordinate ticks between two dashed hairlines, the same "this is
 * a measured drawing" detail as {@link CornerMarks}, used where a full-width
 * strip reads better than corner marks (under the hero, above a banner).
 * Plays once on mount: the hairlines wipe in left-to-right, then the
 * numerals appear left-to-right behind them. `delay` staggers this after a
 * caller's own entrance (e.g. Hero's `<CornerMarks>` locking in first). */
export default function RulerTicks({
  count = 5,
  delay = 0,
  className,
}: {
  count?: number;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "relative flex w-full items-center justify-between px-6 py-1.5 font-mono text-[0.6rem] text-muted-foreground/50 sm:px-10",
        className,
      )}
    >
      <motion.span
        className="absolute inset-x-0 top-0 border-t border-dashed border-border/70"
        initial={reduceMotion ? false : { clipPath: WIPE.left.from }}
        animate={{ clipPath: WIPE.left.to }}
        transition={{ duration: LINE_DURATION, delay, ease: EASE }}
      />
      <motion.span
        className="absolute inset-x-0 bottom-0 border-b border-dashed border-border/70"
        initial={reduceMotion ? false : { clipPath: WIPE.left.from }}
        animate={{ clipPath: WIPE.left.to }}
        transition={{ duration: LINE_DURATION, delay, ease: EASE }}
      />
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: TICK_DURATION,
            delay: delay + TICK_START + i * TICK_STAGGER,
            ease: EASE,
          }}
        >
          {String(i).padStart(2, "0")}
        </motion.span>
      ))}
    </div>
  );
}
