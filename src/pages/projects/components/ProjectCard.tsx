import type { Project } from "@/lib/projects";

import type { Locale, Translations } from "@/lib/i18n/translations";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../../../components/ui/button";
import {
  BookOpenTextIcon,
  GithubLogoIcon,
  GlobeIcon,
  PenNibIcon,
} from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../components/ui/tooltip";
import { Link } from "react-router";

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
  markdown,
  className,
}: {
  projeto: Project;
  index: number;
  locale: Locale;
  t: Translations;
  markdown?: string;
  className?: string;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "flex p-0 rounded-md justify-between items-center border overflow-hidden group hover:border-primary/15 transition-all size-auto relative  hover:to-card bg-linear-to-br from-card to-muted h-40",
        className,
      )}
      style={{ transitionDelay: visible ? `${(index % 4) * 90}ms` : "0ms" }}
    >
      {/* detalhes */}
      <div className="shrink-0 flex-1 flex flex-col items-start justify-start p-6 max-w-3/5 h-full">
        <span className="flex items-center gap-2">
          {projeto.type == "dev" ? (
            <img
              src={projeto.icon ?? "/projects/fallback.png"}
              className={cn("size-5.5")}
            />
          ) : (
            <PenNibIcon className="text-muted-foreground size-4" />
          )}
          <h2 className="font-medium text-base truncate">
            {projeto.title[locale]}
          </h2>
        </span>
        <span className="text-xs text-muted-foreground line-clamp-2 mt-1 ">
          {projeto.description[locale]}
        </span>
        <span className="flex items-end gap-1 z-10 justify-end flex-1">
          {projeto.link != null ? (
            <Button size="sm" variant={"default"}>
              <a
                href={projeto.link}
                target="_blank"
                className="flex items-center gap-1"
              >
                <GlobeIcon /> {t.projects.open}
              </a>
            </Button>
          ) : undefined}

          <Tooltip>
            <TooltipTrigger>
              <Button size="sm" variant={"outline"}>
                <Link
                  className="flex items-ceter gap-2"
                  to={`/projects/${projeto.slug}`}
                >
                  <BookOpenTextIcon /> {t.projects.readMore}
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.projects.readMore}</TooltipContent>
          </Tooltip>
          {projeto.repo != null ? (
            <Tooltip>
              <TooltipTrigger>
                <Button size="icon-sm" variant={"outline"}>
                  <a
                    href={projeto.repo}
                    target="_blank"
                    className="flex items-center gap-1"
                  >
                    <GithubLogoIcon weight="fill" />
                  </a>
                </Button>
                <TooltipContent>{t.projects.goToProject}</TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          ) : undefined}
        </span>
      </div>

      {/* imagem */}
      <div className="shrink-0 relative w-1/2 h-full">
        <span
          className={cn(
            "p-0 h-full flex min-w-full overflow-hidden transition-all",
            projeto.type == "dev"
              ? "absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 group-hover:translate-y-1/5 rounded-md border"
              : "",
          )}
        >
          <img
            src={projeto.image ?? "/projects/fallback.png"}
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
    </div>
  );
}

export default ProjectCard;

/*      <div className="w-full flex items-center justify-between h-13 p-4 px-2 gap-2">
        <div className={cn("flex flex-col ")}>
          <span className={cn("flex items-center gap-1")}>
            {projeto.type == "dev" ? (
              <img
                src={projeto.icon ?? "/projects/fallback.png"}
                className={cn("size-4")}
              />
            ) : null}
            <span className="text-sm line-clamp-1 font-medium">
              {projeto.title[locale]}
            </span>
          </span>
          <span className="text-xs line-clamp-1 text-muted-foreground">
            {projeto.description[locale]}
          </span>
        </div>
        
      </div>
      <div className={cn("p-1", projeto.type == "dev" ? "" : "")}>
        
      </div>
    </div>*/
