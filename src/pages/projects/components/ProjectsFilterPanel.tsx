import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CaretDownIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react";
import type { Translations } from "@/lib/i18n/translations";
import {
  PROJECT_TYPE_FILTER_VALUES,
  PROJECT_TYPE_META,
  type ProjectTypeFilterValue,
} from "@/lib/project-type-meta";

type FilterOption = { value: string; label: string };
type FilterGroup = { label: string; options: FilterOption[] };

function MultiSelectFilter({
  label,
  options,
  groups,
  selected,
  onChange,
  searchable = false,
}: {
  label: string;
  options?: FilterOption[];
  groups?: FilterGroup[];
  selected: string[];
  onChange: (next: string[]) => void;
  searchable?: boolean;
}) {
  const [query, setQuery] = useState("");

  const effectiveGroups: FilterGroup[] = groups ?? [
    { label: "", options: options ?? [] },
  ];

  const q = query.trim().toLowerCase();
  const filteredGroups = effectiveGroups
    .map((group) => ({
      ...group,
      options: searchable
        ? group.options.filter((o) => o.label.toLowerCase().includes(q))
        : group.options,
    }))
    .filter((group) => group.options.length > 0);

  function toggle(value: string) {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="sm" className="justify-between" />
        }
      >
        <span className="flex items-center gap-1.5">
          {label}
          {selected.length > 0 ? (
            <span className="flex items-center justify-center min-w-4 h-4 px-1 text-[0.65rem] bg-foreground text-background">
              {selected.length}
            </span>
          ) : null}
        </span>
        <CaretDownIcon className="size-3 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-56">
        {searchable ? (
          <div className="p-1.5 border-b">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={label}
              className="h-7 text-xs"
            />
          </div>
        ) : null}
        <div className="max-h-64 overflow-y-auto p-1">
          {filteredGroups.map((group) => (
            <div key={group.label || "_"}>
              {group.label ? (
                <p className="px-2 pt-2 pb-1 text-[0.6rem] font-medium uppercase tracking-wide text-muted-foreground/60">
                  {group.label}
                </p>
              ) : null}
              {group.options.map((opt) => {
                const isSelected = selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggle(opt.value)}
                    className={cn(
                      "rounded-sm flex w-full items-center gap-2 px-2 py-1.5 text-xs text-left hover:bg-muted transition-colors",
                      isSelected ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center size-3.5 rounded-xs border shrink-0",
                        isSelected
                          ? "bg-foreground text-background border-foreground"
                          : "border-input",
                      )}
                    >
                      {isSelected ? <CheckIcon className="size-2.5" /> : null}
                    </span>
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
          {filteredGroups.length === 0 ? (
            <p className="p-2 text-xs text-muted-foreground text-center">—</p>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/**
 * Segmented-control style filter: a single indicator element stays mounted
 * and glides behind whichever pill is active. It's positioned from measured
 * DOM rects (not each pill's own box), so it can slide freely across the gaps
 * between pills instead of being clipped inside one pill at a time; Framer's
 * `layout` prop turns the left/width changes into a smooth FLIP transform.
 */
function ProjectTypeToggle({
  t,
  selectedType,
  onTypeChange,
}: {
  t: Translations;
  selectedType: ProjectTypeFilterValue;
  onTypeChange: (value: ProjectTypeFilterValue) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function measure() {
      const active = container!.querySelector<HTMLElement>(
        `[data-project-type="${selectedType}"]`,
      );
      if (!active) return;
      const containerRect = container!.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      setIndicator({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [selectedType, t]);

  const activeMeta = PROJECT_TYPE_META[selectedType];

  return (
    <div
      ref={containerRef}
      className="relative min-w-0 max-w-full overflow-x-auto shrink-0"
    >
      <ToggleGroup
        className="gap-1 border p-1 rounded-lg"
        value={[selectedType]}
      >
        {indicator ? (
          <motion.span
            layout
            initial={false}
            transition={{ type: "spring", stiffness: 480, damping: 40 }}
            className={cn(
              "absolute top-1.25 bottom-1.25 rounded-[6px] ",
              activeMeta.activeBg,
            )}
            style={{ left: indicator.left, width: indicator.width }}
          />
        ) : null}
        {PROJECT_TYPE_FILTER_VALUES.map((type) => {
          const meta = PROJECT_TYPE_META[type];
          const isActive = selectedType === type;
          const Icon = meta.icon;
          return (
            <ToggleGroupItem
              key={type}
              data-project-type={type}
              value={type}
              onClick={() => onTypeChange(type)}
              className={cn(
                "relative z-10 text-xs! h-7 gap-1.5 transition-colors",
                "aria-pressed:bg-transparent data-pressed:bg-transparent",
                isActive && meta.activeText,
              )}
            >
              {Icon ? (
                <Icon
                  className={cn(
                    "size-3.5",
                    isActive ? meta.activeText : "text-muted-foreground",
                  )}
                />
              ) : null}
              {t.projects.types[type]}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}

export default function ProjectsFilterPanel({
  t,
  search,
  onSearchChange,
  selectedType,
  onTypeChange,
  techGroups,
  selectedTechs,
  onTechsChange,
  companyOptions,
  selectedCompanies,
  onCompaniesChange,
}: {
  t: Translations;
  search: string;
  onSearchChange: (value: string) => void;
  selectedType: ProjectTypeFilterValue;
  onTypeChange: (value: ProjectTypeFilterValue) => void;
  techGroups: FilterGroup[];
  selectedTechs: string[];
  onTechsChange: (value: string[]) => void;
  companyOptions: { value: string; label: string }[];
  selectedCompanies: string[];
  onCompaniesChange: (value: string[]) => void;
}) {
  const hasActiveFilters =
    search.trim() !== "" ||
    selectedType !== "all" ||
    selectedTechs.length > 0 ||
    selectedCompanies.length > 0;

  function clearAll() {
    onSearchChange("");
    onTypeChange("all");
    onTechsChange([]);
    onCompaniesChange([]);
  }

  return (
    <div className="flex flex-col gap-3 px-4">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.projects.filters.searchPlaceholder}
          className="pl-8 h-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ProjectTypeToggle
          t={t}
          selectedType={selectedType}
          onTypeChange={onTypeChange}
        />

        <MultiSelectFilter
          label={t.projects.filters.technologies}
          groups={techGroups}
          selected={selectedTechs}
          onChange={onTechsChange}
          searchable
        />

        <MultiSelectFilter
          label={t.projects.filters.company}
          options={companyOptions}
          selected={selectedCompanies}
          onChange={onCompaniesChange}
        />

        {hasActiveFilters ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground ml-auto"
            onClick={clearAll}
          >
            <XIcon className="size-3.5" />
            {t.projects.filters.clearAll}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
