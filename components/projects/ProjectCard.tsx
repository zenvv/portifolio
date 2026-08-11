import type { Project } from "@/lib/projects";

import type { Locale, Translations } from "@/lib/i18n/translations";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { GithubLogoIcon, GlobeIcon } from "@phosphor-icons/react";

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
        "flex p-0 flex-col rounded-md  border overflow-hidden group hover:border-primary/15 transition-all size-auto relative ",
        className,
        projeto.type == "dev"
          ? "hover:from-background hover:to-background bg-linear-to-br from-card to-muted"
          : "",
      )}
      style={{
        backgroundColor:
          projeto.type == "dev" ? "#fff" : projeto.color || "#fff",
      }}
    >
      <span className="w-full p-0 flex-1">
        <div
          className={cn(
            "p-0 h-26 flex aspect-video overflow-hidden rounded-none w-full",
            projeto.type == "dev" ? "border-b" : "",
          )}
        >
          <img
            src={projeto.image ?? "/projects/fallback.png"}
            className={cn(
              "h-full w-full  group-hover:scale-[102%] transition-all",
              projeto.type == "dev"
                ? "object-cover"
                : "object-scale-down scale-110",
            )}
          />
        </div>
      </span>
      <div
        className={cn(
          "p-4 py-2",
          projeto.type == "dev"
            ? ""
            : "bg-linear-to-t from-black/80 to-transparent",
        )}
      >
        <span
          className={cn(
            "flex items-center gap-1",
            projeto.type == "dev" ? "" : "text-white",
          )}
        >
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
        <span
          className={cn(
            "line-clamp-1 text-[0.6rem] ",
            projeto.type == "dev" ? "text-muted-foreground" : "text-white/80",
          )}
        >
          {projeto.description[locale]}
        </span>
        <span className="mt-2 mb-1 flex items-center gap-1 z-10 justify-end">
          {projeto.repo != null ? (
            <Button size="xs" variant={"outline"}>
              <a
                href={projeto.repo}
                target="_blank"
                className="flex items-center gap-1"
              >
                <GithubLogoIcon weight="fill" />
              </a>
            </Button>
          ) : undefined}
          <Button size="xs" variant={"outline"}>
            {t.projects.readMore}
          </Button>
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
    </div>
  );
}

export default ProjectCard;
