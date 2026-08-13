import { useState } from "react";
import { useLanguage } from "@/lib/i18n/language.provider";

import { getTechIcon } from "@/lib/tech-icons";
import {
  StackIcon,
  BookOpenIcon,
  PlantIcon,
  TreeIcon,
  TrophyIcon,
  CaretDownIcon,
  type Icon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import TechIcon from "@/components/TechIcon";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  StackList,
  TECH_TYPES,
  type techLevel,
  type techType,
} from "@/data/stack";

const LEVEL_ICONS: Record<techLevel, Icon> = {
  learning: BookOpenIcon,
  beginner: PlantIcon,
  intermediate: TreeIcon,
  advanced: TrophyIcon,
};

function StackChip({ tech }: { tech: (typeof StackList)[number] }) {
  const { t } = useLanguage();
  const icon = getTechIcon(tech.name);
  const LevelIcon = LEVEL_ICONS[tech.level];

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border bg-card dark:bg-muted text-muted-foreground leading-none transition-colors hover:text-foreground hover:border-primary/30",
        )}
        render={<a href={tech.link} target="_blank" rel="noreferrer"></a>}
      >
        {icon ? <TechIcon icon={icon} className="size-3.5" /> : null}
        {tech.name}
        {t.hero.stack.levels[tech.level] == "Learning" ||
        t.hero.stack.levels[tech.level] == "Aprendendo"
          ? "*"
          : ""}
      </TooltipTrigger>

      <TooltipContent side="top" align="center">
        <span className="flex flex-col items-center gap-0">
          <span className="text-muted-foreground flex items-center gap-1.5 text-[0.6rem]">
            <LevelIcon className="size-3" />
            {t.hero.stack.levels[tech.level]}
          </span>
          <span className="flex items-center gap-1.5">
            {icon ? <TechIcon icon={icon} className="size-3.5" /> : null}
            {tech.name}
          </span>
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

function StackColumn({ type }: { type: techType }) {
  const { t } = useLanguage();
  const techs = StackList.filter((tech) => tech.type === type);

  if (techs.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 min-w-0 break-inside-avoid mb-4">
      <p className="uppercase text-[0.65rem] tracking-wide text-muted-foreground/60 font-medium">
        {t.hero.stack.types[type]}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {techs.map((tech) => (
          <StackChip key={tech.index} tech={tech} />
        ))}
      </div>
    </div>
  );
}

const previewList = StackList.filter((tech) => tech.level === "advanced").slice(
  0,
  10,
);

export default function StackSection({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex flex-col gap-3 w-full mt-4", className)}>
      <span className="flex items-center gap-2 justify-start text-foreground/70 shimmer shimmer-primary">
        <StackIcon className="size-3" />
        <h2 className="text-center font-medium text-sm">
          {t.hero.stack.title}
        </h2>
      </span>

      {/* mobile: collapsible with a preview, expands to the full list */}
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="flex flex-col gap-3 sm:hidden"
      >
        {!open ? (
          <div className="flex flex-wrap gap-1.5">
            {previewList.map((tech) => (
              <StackChip key={tech.index} tech={tech} />
            ))}
          </div>
        ) : null}
        <CollapsibleContent>
          <div className="columns-2 gap-4">
            {TECH_TYPES.map((type) => (
              <StackColumn key={type} type={type} />
            ))}
          </div>
        </CollapsibleContent>
        <CollapsibleTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="self-start rounded-full text-xs text-muted-foreground"
            />
          }
        >
          {open ? t.hero.stack.showLess : t.hero.stack.showAll}
          <CaretDownIcon
            className={cn("transition-transform", open && "rotate-180")}
          />
        </CollapsibleTrigger>
      </Collapsible>

      {/* desktop: full list, always expanded */}
      <div className="hidden sm:block sm:columns-3 lg:columns-4 gap-4">
        {TECH_TYPES.map((type) => (
          <StackColumn key={type} type={type} />
        ))}
      </div>
    </div>
  );
}
