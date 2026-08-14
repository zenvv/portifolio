import type { Locale, Translations } from "@/lib/i18n/translations";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BookOpenTextIcon,
  GithubLogoIcon,
  GlobeIcon,
  GraphIcon,
  PenNibIcon,
} from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TransitionLink from "@/components/TransitionLink";
import type { Project } from "@/data/projects";
import { ICON_PLACEHOLDER } from "@/lib/placeholders";

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
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function ProjectCard({
  projeto,
  index,
  locale,
  t,
  className,
}: {
  projeto: Project;
  index: number;
  locale: Locale;
  t: Translations;
  className?: string;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col sm:flex-row p-0 rounded-md justify-between sm:items-center border overflow-hidden group hover:border-primary/15 transition-all duration-300 ease-out size-auto relative dark:hover:to-card hover:to-muted bg-linear-to-tl dark:from-card from-muted to-background",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        projeto.type == "automation" ? "sm:h-32 h-auto" : "sm:h-40",
        className,
      )}
      style={{ transitionDelay: visible ? `${(index % 4) * 90}ms` : "0ms" }}
    >
      <div
        className={cn(
          "order-2 sm:order-1 shrink-0 flex flex-col items-start justify-start p-5 sm:p-6 sm:h-full gap-1",
          projeto.type == "automation" ? "w-full" : "sm:max-w-3/5",
        )}
      >
        <div className="flex flex-col flex-1 h-full w-full shrink-0">
          <span className="flex items-center gap-2">
            {projeto.type == "dev" ? (
              <img
                src={projeto.icon ?? ICON_PLACEHOLDER}
                className={cn("md:size-5.5 size-3")}
              />
            ) : projeto.type == "design" ? (
              <PenNibIcon className="text-amber-500 size-4 shrink-0" />
            ) : (
              <GraphIcon
                className="dark:text-blue-500 text-blue-300 opacity-20 group-hover:opacity-100 group-hover:blur-2xl size-20 top-0 left-0 -translate-y-3/8 -translate-x-1/5 shrink-0 absolute inset-0 z-0 transition-all group-hover:size-40 "
                style={{
                  transitionDuration: "200ms",
                }}
              />
            )}
            <h2 className="font-medium text-base md:truncate leading-tight z-10">
              {projeto.title[locale]}
            </h2>
          </span>
          <span
            className={cn(
              "text-xs text-muted-foreground",
              projeto.type == "automation" ? "w-full truncate" : "line-clamp-2",
            )}
          >
            {projeto.description[locale]}
          </span>
        </div>
        <span
          className={cn(
            "flex items-center flex-wrap gap-2 z-10 flex-1 w-full mt-2 sm:mt-0",
            projeto.type == "automation"
              ? "justify-start sm:justify-end"
              : "justify-start",
          )}
        >
          {projeto.link != null ? (
            <Button
              size="sm"
              variant={"default"}
              className="flex-1 sm:flex-none"
            >
              <a
                href={projeto.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1"
              >
                <GlobeIcon /> {t.projects.open}
              </a>
            </Button>
          ) : undefined}

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  size="sm"
                  variant={"outline"}
                  className="flex-1 sm:flex-none"
                />
              }
            >
              <TransitionLink
                className="flex items-center justify-center gap-2"
                to={`/projects/${projeto.slug}`}
                direction="forward"
              >
                <BookOpenTextIcon /> {t.projects.readMore}
              </TransitionLink>
            </TooltipTrigger>
            <TooltipContent>{t.projects.readMore}</TooltipContent>
          </Tooltip>
          {projeto.repo != null ? (
            <Tooltip>
              <TooltipTrigger render={<Button size="sm" variant={"outline"} />}>
                <a
                  href={projeto.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <GithubLogoIcon weight="fill" />
                  <span className="md:hidden">Github</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>{t.projects.goToProject}</TooltipContent>
            </Tooltip>
          ) : undefined}
        </span>
      </div>

      {projeto.type == "automation" ? null : (
        <div className="order-1 sm:order-2 shrink-0 relative h-40 sm:h-full w-full sm:w-1/2 overflow-hidden">
          <span
            className={cn(
              "p-0 h-full flex min-w-full overflow-hidden transition-all",
              projeto.type == "dev"
                ? "sm:absolute sm:bottom-0 sm:right-0 sm:translate-y-1/4 sm:translate-x-1/4 sm:group-hover:translate-y-1/6 sm:rounded-md sm:group-hover:translate-x-1/6 sm:border sm:group-hover:shadow-[0px_0px_25px_rgba(0,0,0,0.2)]"
                : projeto.type == "design"
                  ? "md:mask-no-clip"
                  : "",
            )}
            style={{
              clipPath:
                projeto.type == "design"
                  ? "polygon(9% 0, 100% 0, 100% 100%, 0% 100%)"
                  : "",
            }}
          >
            <img
              src={
                projeto.image ?? "https://placehold.co/600x400?text=placeholder"
              }
              loading="lazy"
              decoding="async"
              className={cn(
                " transition-all  w-full",
                projeto.type == "dev"
                  ? "object-cover"
                  : "object-scale-down hover:scale-105",
              )}
              style={{
                backgroundColor:
                  projeto.type == "dev" ? "#fff" : projeto.color || "#fff",
              }}
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
