import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const MARK_DURATION = 0.3;
const MARK_STAGGER = 0.08;

const CORNERS = [
  "top-2 left-2",
  "top-2 right-2",
  "bottom-2 left-2",
  "bottom-2 right-2",
] as const;

/** One crosshair, drawn as two 1px bars rather than a "+" glyph so it can
 * snap into place on entrance instead of just fading. */
function Mark({
  position,
  delay,
  reduceMotion,
}: {
  position: string;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.span
      className={cn("absolute size-5", position)}
      initial={reduceMotion ? false : { opacity: 0, scale: 0, rotate: 45 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: MARK_DURATION, delay, ease: EASE }}
    >
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-muted-foreground/40" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-muted-foreground/40" />
    </motion.span>
  );
}

/** Four small "+" registration marks pinned to the corners of a `relative`
 * ancestor, a quiet drafting-table detail used on the home hero to mark it
 * as the composition's fixed reference frame. Each mark snaps into place
 * once, staggered corner to corner, on mount. */
export default function CornerMarks({ className }: { className?: string }) {
  const reduceMotion = !!useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-3 sm:inset-4",
        className,
      )}
    >
      {CORNERS.map((position, i) => (
        <Mark
          key={position}
          position={position}
          delay={i * MARK_STAGGER}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
