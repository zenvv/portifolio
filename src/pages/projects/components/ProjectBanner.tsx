import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/language.provider";
import { Projetos } from "@/lib/projects";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  CodeIcon,
  DatabaseIcon,
  GraphIcon,
  PenNibIcon,
  type Icon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const CYCLE_INTERVAL_MS = 3000;
const TRANSITION_MS = 350;
const STACK_STEP = 24; // px spacing between stacked cards
const EXIT_DISTANCE = 64; // extra px the leaving card travels off-canvas

const featuredProjects = Projetos.filter((proj) => proj.featured);

interface bannerIconsType {
  label: string;
  icon: Icon;
  class: string;
}

const bannerIcons: bannerIconsType[] = [
  {
    label: "dev",
    icon: CodeIcon,
    class: "group-hover:text-violet-500 group-hover:rotate-[25deg]",
  },
  {
    label: "design",
    icon: PenNibIcon,
    class: "group-hover:text-amber-500 group-hover:rotate-[-90deg]",
  },
  {
    label: "automation",
    icon: GraphIcon,
    class: "group-hover:text-blue-500 group-hover:rotate-[-25deg]",
  },
];

export default function ProjectsBanner() {
  const { t, locale } = useLanguage();
  const [order, setOrder] = useState(() =>
    featuredProjects.map((proj) => proj.slug),
  );
  const [exitingSlug, setExitingSlug] = useState<string | null>(null);
  const [snappingSlug, setSnappingSlug] = useState<string | null>(null);
  const pendingHandles = useRef<number[]>([]);
  const orderRef = useRef(order);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  const count = featuredProjects.length;

  useEffect(() => {
    if (count < 2) return;

    const interval = window.setInterval(() => {
      const leaving = orderRef.current[0];
      setExitingSlug(leaving);
      setOrder((prev) => [...prev.slice(1), prev[0]]);

      const snapHandle = window.setTimeout(() => {
        setSnappingSlug(leaving);
        setExitingSlug(null);

        const raf = requestAnimationFrame(() => {
          const raf2 = requestAnimationFrame(() => {
            setSnappingSlug(null);
          });
          pendingHandles.current.push(raf2);
        });
        pendingHandles.current.push(raf);
      }, TRANSITION_MS);
      pendingHandles.current.push(snapHandle);
    }, CYCLE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      pendingHandles.current.forEach((handle) => {
        clearTimeout(handle);
        cancelAnimationFrame(handle);
      });
      pendingHandles.current = [];
    };
  }, [count]);

  return (
    <Link
      to="/projects"
      className="relative flex h-40 items-stretch overflow-hidden rounded-lg border text-left group mt-8 bg-linear-to-tl from-card to-background hover:to-card"
    >
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1 p-4">
        <span className="mb-1 flex items-center gap-2 text-muted-foreground">
          {bannerIcons.map((bni) => (
            <>
              <bni.icon
                className={cn(
                  "size-4 transition-all group-hover:size-5",
                  bni.class,
                )}
                style={{
                  transitionDuration: "200ms",
                  transitionTimingFunction: "ease-in-out",
                }}
              />
            </>
          ))}
        </span>
        <h1 className="text-lg font-semibold">{t.hero.projects.title}</h1>
        <p className="text-xs text-muted-foreground">
          {t.hero.projects.description}
        </p>
        <span className="flex-1 flex items-end">
          <Button
            variant="link"
            className="flex items-center gap-1 p-0 text-xs group-hover:gap-1.5 group-hover:underline"
          >
            {t.hero.projects.button} <ArrowRightIcon />
          </Button>
        </span>
      </div>

      <div className="pointer-events-none relative w-58 shrink-0 sm:w-58 mask-t-from-50% group-hover:saturate-0 transition-all">
        {order.map((slug, position) => {
          const proj = featuredProjects.find((p) => p.slug === slug);
          if (!proj) return null;

          const isExiting = exitingSlug === slug;
          const isSnapping = snappingSlug === slug;
          const depthFromBack = count - 1 - position;
          const offset = depthFromBack * STACK_STEP;

          const style: React.CSSProperties = isExiting
            ? {
                transform: `translate3d(${offset + EXIT_DISTANCE}px, ${offset + EXIT_DISTANCE}px, 0)`,
                opacity: 0,
                zIndex: -(count + 10),
                transition: `transform ${TRANSITION_MS}ms cubic-bezier(.43,.43,0,1.01), opacity ${TRANSITION_MS}ms ease`,
              }
            : {
                transform: `translate3d(${offset + 8}px, ${-offset + -8}px, 0)`,
                opacity: isSnapping ? 0 : 1,
                zIndex: 50 - (count - position),
                transition: isSnapping
                  ? "none"
                  : `transform ${TRANSITION_MS}ms ease, opacity ${TRANSITION_MS}ms`,
              };

          return (
            <div
              key={slug}
              className="absolute bottom-0 right-0 aspect-video w-28 overflow-hidden rounded-sm border bg-background shadow-xl sm:w-56"
              style={style}
            >
              <img
                src={proj.image ?? "/projects/fallback.png"}
                alt={proj.title[locale]}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </Link>
  );
}
