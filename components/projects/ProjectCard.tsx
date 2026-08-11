import type { Project } from "@/lib/projects";

import type { Locale, Translations } from "@/lib/i18n/translations";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  BookOpenTextIcon,
  GithubLogoIcon,
  GlobeIcon,
} from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
  return (
    <div
      className={cn(
        "flex p-0 flex-col rounded-md  border overflow-hidden group hover:border-primary/15 transition-all size-auto relative hover:from-background hover:to-background bg-linear-to-br from-card to-muted",
        className,
      )}
    >
      <div className="w-full flex items-center justify-between h-13 p-4 px-2 gap-2">
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
        <span className="flex items-center gap-1 z-10 justify-end">
          {projeto.repo != null ? (
            <Tooltip>
              <TooltipTrigger>
                <Button size="icon-xs" variant={"outline"}>
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
          <Tooltip>
            <TooltipTrigger>
              <Button size="icon-xs" variant={"outline"}>
                <BookOpenTextIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.projects.readMore}</TooltipContent>
          </Tooltip>
          {projeto.link != null ? (
            <Button size="xs" variant={"default"}>
              <a
                href={projeto.link}
                target="_blank"
                className="flex items-center gap-1"
              >
                <GlobeIcon /> {t.projects.open}
              </a>
            </Button>
          ) : undefined}
        </span>
      </div>
      <div className={cn("p-1", projeto.type == "dev" ? "" : "")}>
        <img
          src={projeto.image ?? "/projects/fallback.png"}
          className={cn(
            "p-0 w-full flex aspect-video overflow-hidden rounded-md border transition-all",
            projeto.type == "dev" ? "object-cover" : "object-scale-down",
          )}
          style={{
            backgroundColor:
              projeto.type == "dev" ? "#fff" : projeto.color || "#fff",
          }}
        />
      </div>
    </div>
  );
}

export default ProjectCard;

/*

 
*/
