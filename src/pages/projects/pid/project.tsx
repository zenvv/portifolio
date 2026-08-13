import { useParams } from "react-router";
import TransitionLink from "@/components/TransitionLink";

import { loadProjectDetails } from "@/lib/project-content";
import { useLanguage } from "@/lib/i18n/language.provider";
import { getTechIcon } from "@/lib/tech-icons";
import { Button } from "@/components/ui/button";
import TechIcon from "@/components/TechIcon";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  GithubLogoIcon,
  GlobeIcon,
} from "@phosphor-icons/react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import NotFoundPage from "@/src/pages/not-found";
import { Projetos } from "@/data/projects";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLanguage();

  const projeto = Projetos.find((p) => p.slug === slug);

  if (!projeto) {
    return <NotFoundPage />;
  }

  const markdown = loadProjectDetails()[projeto.slug]?.[locale];

  return (
    <div className="flex flex-col gap-4 max-w-full min-w-0">
      <TransitionLink
        to="/projects"
        direction="backward"
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit "
      >
        <ArrowLeftIcon className="size-3.5" />
        {t.projects.backToProjects}
      </TransitionLink>

      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
        {projeto.type == "dev" ? (
          <img
            src={projeto.icon ?? "/projects/fallback.png"}
            className={cn("size-10 sm:size-8")}
          />
        ) : null}
        <div className="flex w-full min-w-0 flex-col items-center gap-1 leading-none sm:flex-1 sm:items-start">
          <span className="text-xl font-semibold m-0! leading-none truncate">
            {projeto.title[locale]}
          </span>
          {projeto.empresa ? (
            <span className="text-xs text-muted-foreground uppercase tracking-tight leading-none">
              {projeto.empresa}
            </span>
          ) : null}
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          {projeto.repo ? (
            <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
              <a
                href={projeto.repo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5"
              >
                <GithubLogoIcon weight="fill" />
                <span className="md:hidden">Github</span>
              </a>
            </Button>
          ) : null}
          {projeto.link ? (
            <Button size="sm" variant="default" className="flex-1 sm:flex-none">
              <a
                href={projeto.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5"
              >
                <GlobeIcon />
                <span className="">{t.projects.open}</span>
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      {projeto.type == "automation" ? null : (
        <img
          src={projeto.image ?? "https://placehold.co/600x400?text=placeholder"}
          className={cn(
            "shrink w-full flex overflow-hidden rounded-md border",
            projeto.type == "dev"
              ? "object-cover"
              : "object-scale-down max-h-80",
          )}
          style={{
            backgroundColor:
              projeto.type == "dev" ? "#fff" : projeto.color || "#fff",
          }}
        />
      )}

      <p className="text-sm ">{projeto.description[locale]}</p>

      {projeto.tecnologias.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {projeto.tecnologias.map((tec) => {
            const icon = getTechIcon(tec);
            return (
              <span
                key={tec}
                className="text-xs px-3 py-0.5 rounded-full border bg-card dark:bg-muted text-muted-foreground flex items-center justify-center gap-1.5 leading-none h-8 font-mono hover:text-background hover:bg-foreground! select-none cursor-default"
              >
                {icon ? <TechIcon icon={icon} className="size-3.5" /> : null}
                {tec}
              </span>
            );
          })}
        </div>
      ) : null}

      {markdown ? (
        <div className="text-sm text-muted-foreground border-t pt-12 mt-4 prose max-w-full flex-1 min-w-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {markdown}
          </ReactMarkdown>
        </div>
      ) : (
        <span className="p-4 rounded-lg flex flex-col bg-muted dark:bg-muted/50 border-dotted items-center justify-start gap-3 text-muted-foreground text-mono text-sm font-bold overflow-hidden border-2">
          <img
            src="/working.gif"
            alt="working..."
            className="size-32 rounded-md"
          />
          <span className="flex-1 text-center shimmer shimmer-color-foreground/80">
            still writting...
          </span>
        </span>
      )}
    </div>
  );
}
