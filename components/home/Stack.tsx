import { useLanguage } from "@/lib/i18n/language.provider";

import { getTechIcon, getSolidTechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";
import TechIcon from "@/components/TechIcon";
import { Button } from "../ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { StackList, TECH_TYPES, type techType } from "@/data/stack";
import { Scales } from "@/src/components/ui/scales";

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
  invert,
  className,
}: {
  name: string;
  invert?: boolean;
  className?: string;
}) {
  const solid = getSolidTechIcon(name);
  const colored = getTechIcon(name);

  if (!solid && !colored) return null;

  const base = invert ? colored : solid;
  const hover = invert ? solid : colored;

  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      {base ? (
        <TechIcon
          icon={base}
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-200",
            hover && "opacity-100 group-hover:opacity-0",
          )}
        />
      ) : null}
      {hover ? (
        <TechIcon
          icon={hover}
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-200",
            base ? "opacity-0 group-hover:opacity-100" : "opacity-100",
          )}
        />
      ) : null}
    </span>
  );
}

/** icon-only tile (solid by default), name + colored icon revealed via tooltip; used on sm+ */
function FeaturedTileDesktop({ tech }: { tech: (typeof StackList)[number] }) {
  const { t } = useLanguage();
  const icon = getTechIcon(tech.name);

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "group relative flex size-8 shrink-0 items-center justify-center hover:opacity-100 opacity-60 transition-all ",
        )}
        render={<a href={tech.link} target="_blank" rel="noreferrer"></a>}
      >
        {icon ? (
          <TechIconSwap
            name={tech.name}
            invert={false}
            className="size-6 shrink-0 transition-all"
          />
        ) : null}

        {tech.learning ? (
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
        ) : null}
      </TooltipTrigger>

      <TooltipContent side="bottom" align="center">
        <span className="flex items-center gap-1.5">
          {icon ? <TechIcon icon={icon} className="size-3.5" /> : null}
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

/** condensed row for the categorized modal list: solid icon by default, colored on hover */
function StackListItem({ tech }: { tech: (typeof StackList)[number] }) {
  return (
    <a
      href={tech.link}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-2 rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
    >
      <TechIconSwap invert name={tech.name} className="size-3.5" />
      <span className="flex flex-1 min-w-0 items-center flex-wrap gap-x-1.5 gap-y-0.5">
        <span className="truncate">{tech.name}</span>
        {tech.learning ? <LearningBadge /> : null}
      </span>
    </a>
  );
}

function StackColumn({ type }: { type: techType }) {
  const { t } = useLanguage();
  const techs = StackList.filter((tech) => tech.type === type);

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

  return (
    <div className={cn("flex gap-2 w-full ", className)}>
      {/* desktop */}
      <div className="flex flex-wrap gap-2 items-center">
        {featuredList.map((tech) => (
          <FeaturedTileDesktop key={tech.index} tech={tech} />
        ))}
      </div>

      <Dialog>
        <DialogTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="self-start rounded-full text-xs text-muted-foreground"
            />
          }
        >
          {t.hero.stack.showAll}
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl rounded-md p-1 bg-background/20 backdrop-blur-2xl">
          <div className="rounded-sm border p-0 min-w-full flex flex-col h-full flex-1 bg-popover">
            <span className="relative h-6 border-b">
              <Scales />
            </span>
            <DialogHeader className="text-center p-6 border-b mb-6 text-xl">
              <DialogTitle>{t.hero.stack.allTitle}</DialogTitle>
            </DialogHeader>
            <div className="columns-2 sm:columns-4 gap-4 max-h-[60vh] overflow-y-auto pr-1 p-6 pt-0">
              {TECH_TYPES.map((type) => (
                <StackColumn key={type} type={type} />
              ))}
            </div>
            <span className="relative h-8 border-t">
              <Scales />
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
