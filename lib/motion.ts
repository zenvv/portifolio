import { useRef, type RefObject } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** The site's one confident-arrival easing curve (already used by Hero's
 * letter-hover and ProblemSolution's reveal), shared by every entrance
 * animation so motion reads as one system rather than per-component taste. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * clip-path pairs for a directional wipe reveal. Used instead of `scaleX`/
 * `scaleY` on dashed/dotted borders and rules, which would stretch the dash
 * pattern into ovals; clip-path masks the element's rendered edge instead of
 * distorting it.
 */
export const WIPE = {
  left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
  right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
  top: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
  bottom: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
} as const;

/**
 * Scroll-triggered "play once" entrance: `active` flips true the first time
 * the returned `ref`'s element enters the viewport, or immediately under
 * `prefers-reduced-motion` (paired with `reduceMotion` so callers can also
 * skip the `initial` state and avoid a flash of the pre-animation frame).
 */
export function useScrollReveal<T extends HTMLElement>(
  margin: `${number}${"%" | "px"} ${number}${"%" | "px"}` = "-10% 0px",
): { ref: RefObject<T | null>; active: boolean; reduceMotion: boolean } {
  const ref = useRef<T>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin });
  return { ref, active: !!reduceMotion || inView, reduceMotion: !!reduceMotion };
}
