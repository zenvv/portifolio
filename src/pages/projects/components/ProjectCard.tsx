import type { Locale, Translations } from "@/lib/i18n/translations";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  GithubLogoIcon,
  GlobeIcon,
} from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TransitionLink from "@/components/TransitionLink";
import TechIcon from "@/components/TechIcon";
import FallbackImage from "@/components/FallbackImage";
import { getSolidTechIcon, getTechIcon } from "@/lib/tech-icons";
import { getProjectBannerCandidates } from "@/lib/project-content";
import type { Project } from "@/data/projects";

const MAX_VISIBLE_TECHS = 3;

function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.0, rootMargin: "0px 0px 0% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function TechChip({ tec }: { tec: string }) {
  const solidIcon = getSolidTechIcon(tec);
  const coloredIcon = getTechIcon(tec);

  return (
    <Tooltip>
      <TooltipTrigger
        render={<span />}
        className="inline-flex items-center gap-1 hover:bg-muted/25 rounded-sm px-1.5 py-1 text-[0.6rem] leading-none text-muted-foreground max-w-24"
      >
        {solidIcon ? (
          <TechIcon icon={solidIcon} className="size-2.5 shrink-0" />
        ) : null}
        <span className="truncate">{tec}</span>
      </TooltipTrigger>
      <TooltipContent side="top" align="center">
        <span className="flex items-center gap-1.5">
          {coloredIcon ? (
            <TechIcon icon={coloredIcon} className="size-3.5" />
          ) : null}
          {tec}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

function TechOverflowChip({ techs }: { techs: string[] }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<span />}
        className="inline-flex items-center justify-center rounded-xs bg-muted/25 px-1.5 py-1 text-[0.6rem] leading-none text-muted-foreground"
      >
        …
      </TooltipTrigger>
      <TooltipContent side="top" align="center">
        <span className="flex flex-col gap-0.5">
          {techs.map((tec) => (
            <span key={tec}>{tec}</span>
          ))}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

function ProjectCard({
  projeto,
  index,
  locale,
  t,
  className,
  compact = false,
}: {
  projeto: Project;
  index: number;
  locale: Locale;
  t: Translations;
  className?: string;
  /** Image + title + short description only — no tech chips, links or date. */
  compact?: boolean;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLAnchorElement>();
  const visibleTechs = projeto.tecnologias.slice(0, MAX_VISIBLE_TECHS);
  const hiddenTechs = projeto.tecnologias.slice(MAX_VISIBLE_TECHS);

  return (
    <TransitionLink
      ref={ref}
      to={`/projects/${projeto.slug}`}
      direction="forward"
      plain
      className={cn(
        "group relative flex flex-col border overflow-hidden hover:border-foreground/20 transition-all duration-300 ease-out rounded-md",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className,
      )}
      style={{ transitionDelay: visible ? `${(index % 6) * 70}ms` : "0ms" }}
    >
      <span className="pointer-events-none absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-sm border bg-background px-2.5 py-1 text-[0.65rem] font-medium text-foreground opacity-0 -translate-y-1 scale-95 shadow-sm transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
        {t.projects.readMore}
        <ArrowUpRightIcon className="size-3" />
      </span>

      <FallbackImage
        candidates={getProjectBannerCandidates(projeto.slug)}
        loading="lazy"
        decoding="async"
        wrapperClassName="aspect-video w-full shrink-0 border-b"
        className="transition-transform duration-300 group-hover:scale-105"
      />

      <div className="flex flex-col gap-2 p-3.5 flex-1">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-medium text-sm leading-tight truncate">
            {projeto.title[locale]}
          </h2>
          <span className="text-xs text-muted-foreground line-clamp-2 ">
            {projeto.shortDescription[locale]}
          </span>
        </div>

        {!compact && visibleTechs.length > 0 ? (
          <div className="flex items-center flex-wrap gap-1">
            {visibleTechs.map((tec) => (
              <TechChip key={tec} tec={tec} />
            ))}
            {hiddenTechs.length > 0 ? (
              <TechOverflowChip techs={hiddenTechs} />
            ) : null}
          </div>
        ) : null}

        {!compact ? (
          <div className="flex items-center justify-between gap-2 mt-auto pt-2">
            <span className="text-[0.65rem] text-muted-foreground/70 font-mono uppercase tracking-tight shrink-0">
              {projeto.createdAt}
            </span>

            <span className="flex items-center gap-1.5">
              {projeto.link != null ? (
                <Tooltip>
                  <TooltipTrigger
                    render={<Button size="icon-xs" variant="outline" />}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(
                        projeto.link!,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                  >
                    <GlobeIcon className="size-3.5" />
                  </TooltipTrigger>
                  <TooltipContent>{t.projects.open}</TooltipContent>
                </Tooltip>
              ) : null}
              {projeto.repo != null ? (
                <Tooltip>
                  <TooltipTrigger
                    render={<Button size="icon-xs" variant="outline" />}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(
                        projeto.repo!,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                  >
                    <GithubLogoIcon className="size-3.5" weight="fill" />
                  </TooltipTrigger>
                  <TooltipContent>Github</TooltipContent>
                </Tooltip>
              ) : null}
            </span>
          </div>
        ) : null}
      </div>
    </TransitionLink>
  );
}

export default ProjectCard;
