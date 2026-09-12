import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTitleAlign = "start" | "center" | "end";

const ALIGN_CLASSES: Record<SectionTitleAlign, string> = {
  start: "items-start text-left mr-auto",
  center: "items-center text-center mx-auto",
  end: "items-end text-right ml-auto",
};

/**
 * Shared section-title pattern (title + optional subtitle/icon, e.g. "Educação",
 * "Experiência", "Stack", "Músicas que curto"): a bordered chip anchored by an
 * optional full-width bottom rule. `divider` should be disabled when the caller
 * already provides its own separator (e.g. a bordered banner strip).
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
  /** Heading level for `title` — defaults to h2; pass "h3" when this section
   * nests under another SectionTitle's h2 (e.g. inside a larger region). */
  titleLevel?: "h2" | "h3";
}) {
  return (
    <div className={cn("flex w-full flex-col gap-2.5 relative h-10")}>
      {divider && (
        <span className="border-b w-full h-px absolute inset-0 top-1/2 translate-y-1/2"></span>
      )}

      <span
        className={cn(
          "inline-flex w-fit max-w-full flex-col gap-0.5 z-10 px-3.5 py-2 h-10 items-center bg-background justify-center",
          ALIGN_CLASSES[align],
          className,
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          {icon}
          <TitleTag
            className={cn(
              "text-base font-semibold leading-none text-foreground",
              titleClassName,
            )}
          >
            {title}
          </TitleTag>
        </span>
        {subtitle ? (
          <p className="text-xs leading-snug text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </span>
    </div>
  );
}
