import { useEffect, useState, type ComponentProps } from "react";
import { Img } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { PROJECT_TYPE_META } from "@/lib/project-type-meta";
import type { projectType } from "@/data/projects";

/**
 * Renders the first candidate URL that loads successfully, trying the next
 * one on error (e.g. `banner.jpg` vs `banner.png`). Once every candidate has
 * failed (or none were given), fills the same box with a static gradient
 * placeholder — showing the project type's icon at low opacity, when one is
 * given — instead of leaving a gap, unless `hideOnFail` asks for nothing to
 * render at all (`onNotFound` fires either way, so a caller can also hide
 * whatever surrounds it, like a caption).
 */
export default function FallbackImage({
  candidates,
  wrapperClassName,
  fluid,
  hideOnFail,
  onNotFound,
  projectType,
  ...imgProps
}: {
  candidates: string[];
  wrapperClassName?: string;
  fluid?: boolean;
  hideOnFail?: boolean;
  onNotFound?: () => void;
  /** Shows this type's icon (low opacity) in the placeholder box when no
   * candidate image loads. */
  projectType?: projectType;
} & Omit<ComponentProps<"img">, "src">) {
  const [index, setIndex] = useState(0);
  const key = candidates.join("|");
  const notFound = index >= candidates.length;

  useEffect(() => {
    setIndex(0);
  }, [key]);

  useEffect(() => {
    if (notFound) onNotFound?.();
  }, [notFound, onNotFound]);

  const Icon = projectType ? PROJECT_TYPE_META[projectType]?.icon : undefined;

  if (notFound) {
    if (hideOnFail) return null;
    return (
      <span
        role="img"
        aria-label={imgProps.alt}
        className={cn(
          "flex items-center justify-center bg-linear-to-br from-muted to-muted/0",
          wrapperClassName,
        )}
      >
        {Icon ? (
          <Icon className="size-1/3 max-h-12 max-w-12 text-muted-foreground" />
        ) : null}
      </span>
    );
  }

  // Non-fluid images have a fixed-size wrapper, so the type icon can sit
  // behind them as a permanent backdrop that's still visible through the
  // fade-in while the real banner decodes, not just after every candidate
  // has failed.
  if (Icon && !fluid) {
    return (
      <span
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-linear-to-br from-muted to-muted/0",
          wrapperClassName,
        )}
      >
        <Icon className="absolute size-1/3 max-h-12 max-w-12 text-muted-foreground" />
        <Img
          key={candidates[index]}
          {...imgProps}
          src={candidates[index]}
          wrapperClassName="absolute inset-0 h-full w-full"
          onError={() => setIndex((i) => i + 1)}
        />
      </span>
    );
  }

  return (
    <Img
      key={candidates[index]}
      {...imgProps}
      src={candidates[index]}
      wrapperClassName={wrapperClassName}
      fluid={fluid}
      onError={() => setIndex((i) => i + 1)}
    />
  );
}
