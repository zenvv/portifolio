import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Translations } from "@/lib/i18n/translations";
import {
  PROJECT_TYPE_FILTER_VALUES,
  PROJECT_TYPE_META,
  type ProjectTypeFilterValue,
} from "@/lib/project-type-meta";

/** Type-only filter, one row of plain chips: no search, no tech/company
 * drill-down. Finding a specific project by name isn't this page's job at
 * this size; browsing by kind is. The active chip's colored fill is one
 * `motion.span` shared across chips via `layoutId`, so picking a new type
 * slides the fill over to it instead of the color just popping in place. */
export default function ProjectsFilterPanel({
  t,
  selectedType,
  onTypeChange,
  className,
}: {
  t: Translations;
  selectedType: ProjectTypeFilterValue;
  onTypeChange: (value: ProjectTypeFilterValue) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center px-4", className)}>
      {PROJECT_TYPE_FILTER_VALUES.map((type) => {
        const meta = PROJECT_TYPE_META[type];
        const isActive = selectedType === type;
        const Icon = meta.icon;
        return (
          <button
            key={type}
            type="button"
            disabled={meta.disabled}
            onClick={() => onTypeChange(type)}
            className={cn(
              "relative inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none",
              isActive
                ? "border-transparent"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="project-type-filter-pill"
                className={cn("absolute inset-0", meta.activeBg)}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span
              className={cn(
                "relative inline-flex items-center gap-1.5",
                isActive && meta.activeText,
              )}
            >
              {Icon ? <Icon className="size-3.5" /> : null}
              {t.projects.types[type]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
