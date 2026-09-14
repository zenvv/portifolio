import {
  CaretDownIcon,
  CheckCircleIcon,
  FunnelIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Translations } from "@/lib/i18n/translations";
import {
  PROJECT_TYPE_FILTER_VALUES,
  PROJECT_TYPE_META,
  type ProjectTypeFilterValue,
} from "@/lib/project-type-meta";

/** Mobile stand-in for `ProjectsFilterPanel`'s row of chips: six of them
 * wrap into a ragged multi-line mess at phone widths, so below `sm` a single
 * trigger (showing the active type) opens a bottom drawer with the same
 * choices as full-width rows instead. */
export default function ProjectsTypeDrawer({
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
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn("gap-1.5 text-xs", className)}
          />
        }
      >
        <FunnelIcon className="size-3.5" />
        {t.projects.types[selectedType]}
        <CaretDownIcon className="size-3 text-muted-foreground" />
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t.projects.filterByType}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col border-t px-2 pb-4">
          {PROJECT_TYPE_FILTER_VALUES.map((type) => {
            const meta = PROJECT_TYPE_META[type];
            const Icon = meta.icon;
            const isActive = selectedType === type;

            return (
              <SheetClose
                key={type}
                render={
                  <button
                    type="button"
                    disabled={meta.disabled}
                    onClick={() => onTypeChange(type)}
                    className="group flex items-center gap-3 border-b p-3 text-left last:border-b-0 relative disabled:pointer-events-none disabled:opacity-40"
                  />
                }
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center border text-muted-foreground transition-colors",
                    isActive && [
                      meta.activeBg,
                      meta.activeText,
                      "border-transparent",
                    ],
                  )}
                >
                  {Icon ? <Icon className="size-5" /> : null}
                </span>
                <span
                  className={cn(
                    "flex-1 text-sm text-foreground",
                    isActive && "font-medium",
                  )}
                >
                  {t.projects.types[type]}
                </span>
                {isActive ? (
                  <CheckCircleIcon
                    weight="fill"
                    className={cn("size-5 shrink-0")}
                  />
                ) : null}
                {isActive ? (
                  <span
                    className={cn(
                      "opacity-20 size-full absolute inset-0",
                      meta.activeBg,
                    )}
                  ></span>
                ) : null}
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
