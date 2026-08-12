import { Link, useParams } from "react-router";
import { Projetos } from "@/lib/projects";
import { loadProjectDetails } from "@/lib/project-content";
import { useLanguage } from "@/lib/i18n/language.provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  GithubLogoIcon,
  GlobeIcon,
} from "@phosphor-icons/react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import NotFoundPage from "../../not-found";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLanguage();

  const projeto = Projetos.find((p) => p.slug === slug);

  if (!projeto) {
    return <NotFoundPage />;
  }

  const markdown = loadProjectDetails()[projeto.slug]?.[locale];

  return (
    <div className="flex flex-col gap-4 max-w-full min-w-0 ">
      <Link
        to="/projects"
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit "
      >
        <ArrowLeftIcon className="size-3.5" />
        {t.projects.backToProjects}
      </Link>

      <div className="flex items-center gap-4 justify-start px-2">
        {projeto.type == "dev" ? (
          <img
            src={projeto.icon ?? "/projects/fallback.png"}
            className={cn("size-8")}
          />
        ) : null}{" "}
        <div className="flex flex-col flex-1 gap-1 leading-none">
          <span className="text-xl font-semibold m-0! leading-none truncate">
            {projeto.title[locale]}
          </span>
          {projeto.empresa ? (
            <span className="text-xs text-muted-foreground uppercase tracking-tight leading-none">
              {projeto.empresa}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {projeto.repo ? (
            <Button size="sm" variant="outline">
              <a
                href={projeto.repo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 md:aspect-auto aspect-square size-3.5 md:size-auto"
              >
                <GithubLogoIcon weight="fill" />
                <span className="md:block hidden">Github</span>
              </a>
            </Button>
          ) : null}
          {projeto.link ? (
            <Button size="sm" variant="default">
              <a
                href={projeto.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5"
              >
                <GlobeIcon />
                <span className="">{t.projects.open}</span>
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      <img
        src={projeto.image ?? "/projects/fallback.png"}
        className={cn(
          "shrink w-full flex overflow-hidden rounded-md border",
          projeto.type == "dev" ? "object-cover" : "object-scale-down",
        )}
        style={{
          backgroundColor:
            projeto.type == "dev" ? "#fff" : projeto.color || "#fff",
        }}
      />

      <p className="text-sm ">{projeto.description[locale]}</p>

      {projeto.tecnologias.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {projeto.tecnologias.map((tec) => (
            <span
              key={tec}
              className="text-xs px-3 py-0.5 rounded-full border bg-card dark:bg-muted text-muted-foreground flex items-center justify-center leading-none h-8 font-mono hover:text-foreground"
            >
              {tec}
            </span>
          ))}
        </div>
      ) : null}

      {markdown ? (
        <div className="text-sm text-muted-foreground border-t pt-12 mt-4 prose max-w-full flex-1 min-w-0 border">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      ) : null}
    </div>
  );
}
