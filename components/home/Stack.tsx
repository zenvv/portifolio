import { useState } from "react";
import { useLanguage } from "@/lib/i18n/language.provider";

import { getTechIcon, getSolidTechIcon } from "@/lib/tech-icons";
import { StackIcon, CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import TechIcon from "@/components/TechIcon";
import { Button } from "../ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { StackList, TECH_TYPES, type techType } from "@/data/stack";

function LearningBadge() {
  const { t } = useLanguage();

  return (
    <span className="text-[0.55rem] leading-none px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium uppercase tracking-wide">
      {t.hero.stack.learningBadge}
    </span>
  );
}

/**
 * Solid icon by default, colored icon revealed on hover (CSS-only cross-fade).
 * Requires a `group` ancestor to drive the hover state.
 */
function TechIconSwap({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const solid = getSolidTechIcon(name);
  const colored = getTechIcon(name);

  if (!solid && !colored) return null;

  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      {solid ? (
        <TechIcon
          icon={solid}
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-200",
            colored && "opacity-100 group-hover:opacity-0",
          )}
        />
      ) : null}
      {colored ? (
        <TechIcon
          icon={colored}
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-200",
            solid ? "opacity-0 group-hover:opacity-100" : "opacity-100",
          )}
        />
      ) : null}
    </span>
  );
}

/** icon-only tile, name revealed on hover via tooltip; used on sm+ */
function FeaturedTileDesktop({ tech }: { tech: (typeof StackList)[number] }) {
  const { t } = useLanguage();
  const icon = getTechIcon(tech.name);
  const solidIcon = getSolidTechIcon(tech.name);

  return (
    <Tooltip>
      <TooltipTrigger
        className="group relative flex size-12 shrink-0 items-center justify-center rounded-lg transition-all hover:from-card border bg-linear-to-b dark:bg-linear-to-t dark:from-border from-muted to-card not-dark:hover:shadow-md"
        render={<a href={tech.link} target="_blank" rel="noreferrer"></a>}
      >
        {icon ? (
          <TechIcon
            icon={icon}
            className="size-7 shrink-0 transition-transform group-hover:scale-110"
          />
        ) : null}
        {tech.learning ? (
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
        ) : null}
      </TooltipTrigger>

      <TooltipContent side="bottom" align="center">
        <span className="flex items-center gap-1.5">
          {solidIcon ? (
            <TechIcon icon={solidIcon} className="size-3.5" />
          ) : null}
          {tech.name}
          {tech.learning ? (
            <span className="text-muted-foreground text-[0.6rem] uppercase tracking-wide">
              · {t.hero.stack.learningBadge}
            </span>
          ) : null}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

/** icon + label row; used on mobile, where hover/tooltip has no touch equivalent */
function FeaturedRowMobile({ tech }: { tech: (typeof StackList)[number] }) {
  const icon = getTechIcon(tech.name);

  return (
    <a
      href={tech.link}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 hover:gap-4 transition-all rounded-lg px-3 py-2 hover:bg-muted/50"
    >
      {icon ? <TechIcon icon={icon} className="size-5 shrink-0" /> : null}
      <span className="flex items-center gap-1.5 text-xs text-foreground/80 group-hover:text-foreground">
        {tech.name}
        {tech.learning ? <LearningBadge /> : null}
      </span>
    </a>
  );
}

/** condensed row for the secondary (non-featured) list: solid icon by default, colored on hover */
function StackListItem({ tech }: { tech: (typeof StackList)[number] }) {
  return (
    <a
      href={tech.link}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-2 rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
    >
      <TechIconSwap name={tech.name} className="size-3.5" />
      <span className="flex flex-1 min-w-0 items-center flex-wrap gap-x-1.5 gap-y-0.5">
        <span className="truncate">{tech.name}</span>
        {tech.learning ? <LearningBadge /> : null}
      </span>
    </a>
  );
}

function StackColumn({ type }: { type: techType }) {
  const { t } = useLanguage();
  const techs = StackList.filter(
    (tech) => tech.type === type && !tech.featured,
  );

  if (techs.length === 0) return null;

  return (
    <div className="flex flex-col gap-1 min-w-0 break-inside-avoid mb-4">
      <p className="uppercase text-[0.65rem] tracking-wide text-muted-foreground/60 font-medium px-1.5">
        {t.hero.stack.types[type]}
      </p>
      <div className="flex flex-col">
        {techs.map((tech) => (
          <StackListItem key={tech.index} tech={tech} />
        ))}
      </div>
    </div>
  );
}

const featuredList = StackList.filter((tech) => tech.featured);

export default function StackSection({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex flex-col gap-3 w-full mt-8", className)}>
      <div className="flex items-center gap-2">
        <StackIcon className="size-6 sm:block hidden" weight="duotone" />
        <span className="flex flex-col items-center sm:items-start text-left w-full leading-none">
          <h2 className="font-medium text-sm leading-none">
            {t.hero.stack.title}
          </h2>
          <p className="text-xs text-muted-foreground/70">
            {t.hero.stack.subtitle}
          </p>
        </span>
      </div>

      {/* desktop */}
      <div className="hidden sm:flex flex-wrap gap-2 ml-8">
        {featuredList.map((tech) => (
          <FeaturedTileDesktop key={tech.index} tech={tech} />
        ))}
      </div>

      {/* mobile */}
      <div className="flex flex-col gap-0.5 sm:hidden">
        {featuredList.map((tech) => (
          <FeaturedRowMobile key={tech.index} tech={tech} />
        ))}
      </div>

      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="flex flex-col gap-3 sm:ml-7"
      >
        <CollapsibleContent>
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
            {TECH_TYPES.map((type) => (
              <StackColumn key={type} type={type} />
            ))}
          </div>
        </CollapsibleContent>

        <CollapsibleTrigger
          render={
            <Button
              variant="ghost"
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
    </div>
  );
}
