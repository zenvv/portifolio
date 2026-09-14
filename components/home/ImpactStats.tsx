import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useLanguage } from "@/lib/i18n/language.provider";
import { cn } from "@/lib/utils";
import { EASE, WIPE } from "@/lib/motion";
import SectionTitle from "@/components/SectionTitle";
import {
  ChartLineUpIcon,
  ClockCountdownIcon,
  FlowArrowIcon,
  GearIcon,
  StackIcon,
} from "@phosphor-icons/react";

const FRAME_SEGMENT_DURATION = 0.25;
const FRAME_STAGGER = 0.1;

type Edge = "top" | "right" | "bottom" | "left";
const EDGE_ORDER: Edge[] = ["top", "right", "bottom", "left"];
const EDGE_CLASS: Record<Edge, string> = {
  top: "inset-x-0 top-0 border-t",
  right: "inset-y-0 right-0 border-r",
  bottom: "inset-x-0 bottom-0 border-b",
  left: "inset-y-0 left-0 border-l",
};
// Traces the frame clockwise from the top-left corner: top draws left→right,
// right draws top→bottom, bottom draws right→left, left draws bottom→top
// (closing the loop). Vertical edges only have a top/bottom inset to work
// with (their width is ~0), horizontal edges only a left/right one.
const EDGE_WIPE: Record<Edge, { from: string; to: string }> = {
  top: WIPE.left,
  right: WIPE.bottom,
  bottom: WIPE.right,
  left: WIPE.top,
};

/** Wraps `children` in a frame whose four edges draw in clockwise from the
 * top-left, like a pen tracing a rectangle, instead of just appearing. Used
 * in place of a static `border` wherever this section wants to earn its
 * "measured drawing" frame rather than assert it. */
function DrawnFrame({
  active,
  reduceMotion,
  dashed = false,
  startDelay = 0,
  className,
  children,
}: {
  active: boolean;
  reduceMotion: boolean;
  dashed?: boolean;
  startDelay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {EDGE_ORDER.map((edge, i) => (
        <motion.span
          key={edge}
          aria-hidden
          className={cn(
            "pointer-events-none absolute border-border",
            dashed ? "border-dotted" : "border-solid",
            EDGE_CLASS[edge],
          )}
          initial={reduceMotion ? false : { clipPath: EDGE_WIPE[edge].from }}
          animate={active ? { clipPath: EDGE_WIPE[edge].to } : {}}
          transition={{
            duration: FRAME_SEGMENT_DURATION,
            delay: startDelay + i * FRAME_STAGGER,
            ease: EASE,
          }}
        />
      ))}
    </div>
  );
}

/** Counts a number up from 0 to `target` once `active`, easing out; skipped
 * (jumps straight to `target`) under reduced motion or before the section is
 * ever in view. `startDelayMs` holds it back further still, e.g. until this
 * stat's frame has finished drawing in. */
function useCountUp(
  target: number,
  active: boolean,
  duration = 1100,
  startDelayMs = 0,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;

    function run() {
      const start = performance.now();
      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    }

    const timeout = setTimeout(run, startDelayMs);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [active, target, duration, startDelayMs]);

  return value;
}

function CountStat({
  target,
  label,
  active,
  startDelayMs,
}: {
  target: number;
  label: string;
  icon: typeof GearIcon;
  active: boolean;
  startDelayMs: number;
}) {
  const value = useCountUp(target, active, 1100, startDelayMs);

  return (
    <div className="flex flex-col items-center gap-1.5 px-6 py-5 text-center justify-center first:pt-0 sm:py-0 sm:h-26 h-28 to-card from-card bg-linear-to-b hover:from-muted/50 hover:to-muted/0 transition-all duration-300 outline outline-transparent hover:outline-border outline-dotted outline-offset-0 hover:-outline-offset-8">
      <span className="font-mono text-3xl leading-none font-medium tabular-nums text-primary sm:text-4xl">
        +{value}
      </span>
      <span className="max-w-40 text-xs leading-none text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

// Numbers already written on the corresponding project pages (nfs-transporte's
// shortDescription and erp-bello-aramados's scope line), not new claims.
const REDUCTIONS = [
  { from: "6h", to: "20min" },
  { from: "1h30", to: "15min" },
] as const;

const BOX1_FRAME_DELAY = 0.15;
const BOX2_FRAME_DELAY = 0.5;
// The count-up waits for the stats grid's own frame to finish drawing, so
// the numbers only start moving once their box is fully outlined.
const COUNT_START_DELAY_MS = Math.round(
  (BOX2_FRAME_DELAY +
    (EDGE_ORDER.length - 1) * FRAME_STAGGER +
    FRAME_SEGMENT_DURATION) *
    1000,
);

export default function ImpactStats({ className }: { className?: string }) {
  const { t } = useLanguage();
  const reduceMotion = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const active = !!reduceMotion || inView;
  const countDelayMs = reduceMotion ? 0 : COUNT_START_DELAY_MS;

  const counts = [
    { target: 40, label: t.impact.processes, icon: GearIcon },
    { target: 18, label: t.impact.apps, icon: StackIcon },
    { target: 60, label: t.impact.flows, icon: FlowArrowIcon },
  ];

  return (
    <div
      ref={ref}
      className={cn("flex w-full flex-col items-center gap-3", className)}
    >
      <SectionTitle
        title={t.impact.heading}
        align="center"
        icon={<ChartLineUpIcon />}
      />

      <DrawnFrame
        active={active}
        reduceMotion={reduceMotion}
        dashed
        startDelay={BOX1_FRAME_DELAY}
        className="flex w-full max-w-3xl flex-col items-center gap-2 outline outline-border outline-offset-4 mt-8 bg-blueprint-grid scale-[99%]"
      >
        <div className="flex w-full flex-col items-center gap-2 px-6 py-5 text-center bg-linear-to-t from-card to-background/70">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
            <ClockCountdownIcon className="size-3.5" />
            {t.impact.reductionLabel}
          </span>
          <div className="flex flex-col gap-1 pt-1 justify-evenly w-full sm:flex-row sm:gap-0 sm:items-center sm:divide-y-0 divide-y-2 divide-dashed">
            {REDUCTIONS.map((r, i) => (
              <span
                key={r.from}
                className="flex flex-col items-center gap-0.5 py-3 sm:py-0"
              >
                <div className="inline-flex items-baseline gap-1 font-mono text-2xl text-foreground sm:text-3xl">
                  <span className="text-muted-foreground/60 line-through decoration-1">
                    {r.from}
                  </span>
                  <span className="text-primary">→</span>
                  <span className="font-semibold text-primary">{r.to}</span>
                </div>
                <span className="text-xs font-normal text-muted-foreground">
                  ({i === 0 ? t.impact.reduction1 : t.impact.reduction2})
                </span>
              </span>
            ))}
          </div>
        </div>
      </DrawnFrame>

      <DrawnFrame
        active={active}
        reduceMotion={reduceMotion}
        startDelay={BOX2_FRAME_DELAY}
        className="grid w-full max-w-3xl grid-cols-1 divide-y-2 divide-border sm:grid-cols-3 sm:divide-y-0 sm:divide-x-2 divide-dotted"
      >
        {counts.map((stat) => (
          <CountStat
            key={stat.label}
            {...stat}
            active={active}
            startDelayMs={countDelayMs}
          />
        ))}
      </DrawnFrame>
    </div>
  );
}
