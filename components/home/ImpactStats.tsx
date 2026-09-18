import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useLanguage } from "@/lib/i18n/language.provider";
import { cn } from "@/lib/utils";

// import SectionTitle from "@/components/SectionTitle";
import { CAREER_COUNTS } from "@/data/metrics";
import {
  ChartLineUpIcon,
  FlowArrowIcon,
  GearIcon,
  StackIcon,
} from "@phosphor-icons/react";
import RulerTicks from "../RulerTicks";
import CornerMarks from "../CornerMarks";

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
    <div className="flex flex-row md:flex-col items-center md:gap-1.5 px-6 py-5 text-center md:justify-center justify-start gap-8 sm:py-0 flex-1 md:h-full min-h-20 w-full bg-card hover:bg-foreground group relative outline outline-transparent hover:outline-muted/20 -outline-offset-27 hover:-outline-offset-19 outline-dashed">
      <CornerMarks className="group-hover:inset-0 inset-2 sm:inset-2 group-hover:sm:inset-0 opacity-0 group-hover:opacity-100  transition-all" />

      <span className="font-mono text-3xl leading-none font-medium tabular-nums text-primary sm:text-4xl group-hover:text-background">
        +{value}
      </span>
      <span className="md:max-w-40 w-auto text-xs leading-none text-muted-foreground group-hover:text-background ">
        {label}
      </span>
    </div>
  );
}

export default function ImpactStats({ className }: { className?: string }) {
  const { t } = useLanguage();
  const reduceMotion = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const active = !!reduceMotion || inView;
  // const countDelayMs = reduceMotion ? 0 : COUNT_START_DELAY_MS;

  const counts = [
    {
      target: CAREER_COUNTS.hoursReduced,
      label: t.impact.hours,
      icon: GearIcon,
    },
    {
      target: CAREER_COUNTS.automatedProcesses,
      label: t.impact.processes,
      icon: GearIcon,
    },
    {
      target: CAREER_COUNTS.powerPlatformApps,
      label: t.impact.apps,
      icon: StackIcon,
    },
    {
      target: CAREER_COUNTS.automationFlows,
      label: t.impact.flows,
      icon: FlowArrowIcon,
    },
  ];

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col items-center gap-3 dark bg-background h-full md:h-80 text-foreground p-6",
        className,
      )}
    >
      <div className="flex flex-col items-start mx-auto justify-center h-full w-full max-w-5xl gap-4 ">
        <h1 className="font-heading text-2xl italic flex items-center justify-center gap-2">
          <ChartLineUpIcon />
          {t.impact.heading}
        </h1>

        <div className="flex md:flex-row flex-col items-center w-full gap-3 justify-center h-full md:h-40">
          {counts.map((stat) => (
            <CountStat
              key={stat.label}
              {...stat}
              active={active}
              startDelayMs={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/*
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
      </DrawnFrame> */
