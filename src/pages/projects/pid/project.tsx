import { useParams } from "react-router";
import TransitionLink from "@/components/TransitionLink";

import {
  useProjectMarkdown,
  getProjectBannerCandidates,
  getProjectIconCandidates,
} from "@/lib/project-content";
import { useLanguage } from "@/lib/i18n/language.provider";
import { getTechIcon } from "@/lib/tech-icons";
import { Button } from "@/components/ui/button";
import TechIcon from "@/components/TechIcon";
import FallbackImage from "@/components/FallbackImage";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  GithubLogoIcon,
  GlobeIcon,
  InfoIcon,
} from "@phosphor-icons/react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MarkdownPre from "@/components/markdown/MarkdownPre";
import NotFoundPage from "@/src/pages/not-found";
import { Projetos } from "@/data/projects";
import { ICON_PLACEHOLDER } from "@/lib/placeholders";
import { usePageMeta } from "@/lib/use-page-meta";
import { renderRichText } from "@/lib/i18n/render-rich-text";
import { Scales } from "@/src/components/ui/scales";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLanguage();

  const projeto = Projetos.find((p) => p.slug === slug);

  usePageMeta(
    projeto ? `zenvv / ${projeto.title[locale]}` : "zenvv / portfólio",
    projeto?.description[locale],
  );

  const { markdown, loading: markdownLoading } = useProjectMarkdown(
    projeto?.slug ?? "",
    locale,
  );

  if (!projeto) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col gap-0 max-w-full min-w-0">
      <span className="p-2 border-b">
        <TransitionLink
          to="/projects"
          direction="backward"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit "
        >
          <ArrowLeftIcon className="size-4" />
          {t.projects.backToProjects}
        </TransitionLink>
      </span>
      <span className="h-8 relative border-b">
        <Scales />
      </span>
      <div className="flex flex-col p-6 gap-6 border-b">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left pb-0">
          {projeto.type == "web" || projeto.type == "powerapps" ? (
            <FallbackImage
              candidates={[
                ...getProjectIconCandidates(projeto.slug),
                ICON_PLACEHOLDER,
              ]}
              className={cn("size-10 sm:size-8")}
            />
          ) : null}
          <div className="flex w-full min-w-0 flex-col items-center gap-1 leading-none sm:flex-1 sm:items-start">
            <h1 className="text-xl font-semibold m-0! leading-none md:truncate text-balance">
              {projeto.title[locale]}
            </h1>
            <span className="text-[0.7rem] text-muted-foreground uppercase tracking-tight leading-none flex items-center gap-1">
              {projeto.empresa ? (
                <>
                  <span>{t.projects.clientTitle}:</span>
                  <span>{projeto.empresa}</span>
                </>
              ) : (
                <span>{t.projects.personalProject}</span>
              )}{" "}
              ∙ {projeto.createdAt}
            </span>
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            {projeto.repo ? (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 sm:flex-none"
              >
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
              <Button
                size="sm"
                variant="default"
                className="flex-1 sm:flex-none"
              >
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
        {projeto.description[locale] ? (
          <p className="text-sm">
            {renderRichText(projeto.description[locale])}
          </p>
        ) : null}
        {projeto.tecnologias.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {projeto.tecnologias.map((tec) => {
              const icon = getTechIcon(tec);
              return (
                <span
                  key={tec}
                  className="text-xs px-3 py-0.5 rounded-full border  text-muted-foreground flex items-center justify-center gap-1.5 leading-none h-8 hover:text-background hover:bg-foreground! select-none cursor-default hover:scale-[102%] transition-all"
                >
                  {icon ? <TechIcon icon={icon} className="size-3.5" /> : null}
                  {tec}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>

      <span className="w-full">
        <FallbackImage
          candidates={getProjectBannerCandidates(projeto.slug)}
          className={cn(
            "shrink w-full h-auto flex overflow-hidden object-cover",
          )}
        />
        {projeto?.imageCaption && (
          <span className="flex items-start justify-center  gap-2 p-5">
            <InfoIcon className="size-3.5 text-muted-foreground/70 shrink-0" />
            <p className="text-[0.7rem] leading-tight text-muted-foreground ">
              {renderRichText(projeto?.imageCaption?.[locale] ?? "")}
            </p>
          </span>
        )}
      </span>

      {markdownLoading ? null : markdown ? (
        <div className="text-sm text-muted-foreground border-t pt-12 mt-0 p-6 prose max-w-full flex-1 min-w-0">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{ pre: MarkdownPre }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      ) : (
        <span className="p-4 w-full flex text-muted-foreground text-mono text-xs font-light">
          <span className="flex-1 text-center shimmer shimmer-color-foreground/80 italic">
            details coming soon...
          </span>
        </span>
      )}
      <span className="h-12 relative border-y">
        <Scales />
      </span>
    </div>
  );
}
