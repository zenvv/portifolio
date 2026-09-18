import { useParams } from "react-router";
import TransitionLink from "@/components/TransitionLink";

import {
  useProjectMarkdown,
  useProjectImages,
  getProjectBannerCandidates,
} from "@/lib/project-content";
import {
  ProjectGalleryProvider,
  useProjectGallery,
} from "@/lib/project-gallery";
import { useLanguage } from "@/lib/i18n/language.provider";
import { getSolidTechIcon } from "@/lib/tech-icons";
import { formatProjectDate } from "@/lib/project-date";
import { Button } from "@/components/ui/button";
import TechIcon from "@/components/TechIcon";
import FallbackImage from "@/components/FallbackImage";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  GithubLogoIcon,
  GlobeIcon,
  InfoIcon,
} from "@phosphor-icons/react";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MarkdownPre from "@/components/markdown/MarkdownPre";
import NotFoundPage from "@/src/pages/not-found";
import { Projetos } from "@/data/projects";
import { usePageMeta, DEFAULT_TITLE } from "@/lib/use-page-meta";
import { renderRichText } from "@/lib/i18n/render-rich-text";
import { slugify } from "@/lib/slug";
import TableOfContents, {
  TableOfContentsMobile,
} from "@/components/markdown/TableOfContents";
import ArticleImageIndex from "@/components/markdown/ArticleImageIndex";
import SidebarRail from "@/components/markdown/SidebarRail";
import ProblemSolution from "@/src/pages/projects/components/ProblemSolution";
import { PROBLEM_SOLUTION } from "@/lib/project-problem-solution";
import { PROJECT_PAGE_CONTENT } from "@/lib/project-page-content";
import ProjectSummaryGrid from "@/src/pages/projects/components/ProjectSummaryGrid";
import ProjectDecisions from "@/src/pages/projects/components/ProjectDecisions";
import ProjectScreens from "@/src/pages/projects/components/ProjectScreens";
import ProjectResults from "@/src/pages/projects/components/ProjectResults";
import WhatIdDoDifferently from "@/src/pages/projects/components/WhatIdDoDifferently";
import TechnicalDetails from "@/components/markdown/TechnicalDetails";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type JSX, type ReactNode } from "react";

/** Below this length, a project's documentation is short enough to read
 * end-to-end without a jump-to-section index. */
const TOC_MIN_MARKDOWN_LENGTH = 6000;

/** Flattens a heading's children into its plain text, for slugifying. */
function headingText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) return children.map(headingText).join("");
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    children.props &&
    typeof children.props === "object" &&
    "children" in children.props
  ) {
    return headingText((children.props as { children: ReactNode }).children);
  }
  return "";
}

/** Markdown links: in-app routes (`/projects/...`) navigate client-side with the
 * view transition; anything else opens in a new tab. h2s get a slugified id
 * (and scroll-mt so the sticky header doesn't cover the target) for
 * TableOfContents to link to. */
const markdownComponents: Components = {
  pre: MarkdownPre,
  h2: ({ children, ...rest }) => (
    <h2 id={slugify(headingText(children))} className="scroll-mt-32" {...rest}>
      {children}
    </h2>
  ),
  a: ({ href, children, ...rest }) => {
    if (href && href.startsWith("/")) {
      return (
        <TransitionLink to={href} direction="forward" plain>
          {children}
        </TransitionLink>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  },
  img: MarkdownImage,
  table: ({ children, ...rest }) => (
    <div className="overflow-x-auto">
      <table {...rest}>{children}</table>
    </div>
  ),
};

/** Every markdown/HTML `<img>` in the article body (a `<figure>` block, a
 * plain `![]()`) opens the same shared lightbox as the sidebar and any
 * `carousel` slide (see `lib/project-gallery.tsx`), at that image's own alt
 * text and position among the project's full image list. */
function MarkdownImage({
  src,
  alt,
  ...rest
}: JSX.IntrinsicElements["img"] & { node?: unknown }) {
  const gallery = useProjectGallery();
  if (!src) return null;
  return (
    <button
      type="button"
      onClick={() => gallery?.openAt(src, alt ? { title: alt } : undefined)}
      className="block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
    >
      <img src={src} alt={alt ?? ""} {...rest} />
    </button>
  );
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLanguage();
  const markdownRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleOutOfView, setTitleOutOfView] = useState(false);
  const [hasBanner, setHasBanner] = useState(true);

  const projeto = Projetos.find((p) => p.slug === slug);
  const projetoIndex = Projetos.findIndex((p) => p.slug === slug);
  const prevProjeto =
    projetoIndex >= 0
      ? Projetos[(projetoIndex - 1 + Projetos.length) % Projetos.length]
      : undefined;
  const nextProjeto =
    projetoIndex >= 0
      ? Projetos[(projetoIndex + 1) % Projetos.length]
      : undefined;

  usePageMeta(
    projeto ? `zenvv / ${projeto.title[locale]}` : DEFAULT_TITLE[locale],
    projeto?.description[locale],
  );

  const { markdown } = useProjectMarkdown(projeto?.slug ?? "", locale);
  const images = useProjectImages(projeto?.slug ?? "");

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTitleOutOfView(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [projeto]);

  useEffect(() => {
    setHasBanner(true);
  }, [projeto?.slug]);

  if (!projeto) {
    return <NotFoundPage />;
  }

  const problemSolution = PROBLEM_SOLUTION[projeto.slug]?.[locale];
  const pageContent = PROJECT_PAGE_CONTENT[projeto.slug];

  return (
    <ProjectGalleryProvider images={images}>
      <div className="flex flex-col gap-0 w-full max-w-5xl mx-auto min-w-0">
        {/* Sticky sub-nav: back left, project name center (once the title
          below has scrolled out of view), actions right. */}
        <div className="sticky top-[69px] z-40 flex items-center justify-between gap-3 border-b bg-background sm:px-0 py-2 px-2">
          <TransitionLink
            to="/projects"
            direction="backward"
            className="z-10 flex shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground not-sm:bg-muted"
          >
            <ArrowLeftIcon className="size-4" />
            <span className="not-sm:hidden">{t.projects.backToProjects}</span>
          </TransitionLink>

          <span
            className={cn(
              "absolute left-1/2 hidden max-w-[40%] -translate-x-1/2 truncate font-heading text-sm italic text-foreground transition-opacity duration-200 sm:block",
              titleOutOfView ? "opacity-100" : "opacity-0",
            )}
          >
            {projeto.title[locale]}
          </span>

          <div className="z-10 flex min-w-0 flex-1 items-center justify-end gap-2">
            {projeto.repo ? (
              <Button size="sm" variant="secondary" className={"dark"}>
                <a
                  href={projeto.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <GithubLogoIcon weight="fill" />
                  <span className="hidden sm:inline">Github</span>
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
                  {t.projects.open}
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-4 px-6 sm:px-4 py-6 sm:text-start text-center ">
          <div className="flex flex-col items-center sm:items-start gap-1 leading-none">
            <h1
              ref={titleRef}
              className="m-0! font-heading text-3xl italic font-semibold leading-none text-balance "
            >
              {projeto.title[locale]}
            </h1>
            <span className="flex items-center gap-1 font-mono text-[0.7rem] uppercase tracking-tight leading-none text-muted-foreground">
              {projeto.empresa ? (
                <>
                  <span>{t.projects.clientTitle}:</span>
                  <span>{projeto.empresa}</span>
                </>
              ) : (
                <span>{t.projects.personalProject}</span>
              )}{" "}
              ∙ {formatProjectDate(projeto.createdAt, locale)}
            </span>
          </div>
          {pageContent ? (
            <p className="sm:max-w-xl text-sm text-muted-foreground">
              {pageContent.subtitle[locale]}
            </p>
          ) : projeto.description[locale] ? (
            <p className="sm:max-w-xl text-sm">
              {renderRichText(projeto.description[locale])}
            </p>
          ) : null}
        </div>

        {pageContent ? (
          <div className="flex justify-center p-0 py-6">
            <ProjectSummaryGrid
              role={pageContent.role[locale]}
              duration={pageContent.duration[locale]}
              status={pageContent.status[locale]}
              tecnologias={projeto.tecnologias}
              locale={locale}
              t={t}
            />
          </div>
        ) : projeto.tecnologias.length > 0 ? (
          <div className="flex sm:flex-wrap sm:flex-row flex-col sm:items-center items-start justify-center gap-x-1.5 gap-y-4 first:border-t-0 my-2 p-4 w-full mx-auto">
            <span className="font-medium text-xs text-muted-foreground uppercase tracking-tight">
              Stack:
            </span>
            <div className="flex sm:flex-wrap sm:flex-row flex-col items-start sm:items-center justify-center gap-x-1.5 gap-y-3 sm:divide-x">
              {projeto.tecnologias.map((tec) => {
                const icon = getSolidTechIcon(tec);
                return (
                  <span
                    key={tec}
                    className="flex items-center gap-1 font-mono text-sm leading-none select-none px-2 mr-1"
                  >
                    {icon ? <TechIcon icon={icon} className="size-3" /> : null}
                    {tec}
                  </span>
                );
              })}
            </div>
          </div>
        ) : null}

        {hasBanner && (
          <span className="w-full flex-1 shrink-0">
            <FallbackImage
              candidates={getProjectBannerCandidates(projeto.slug)}
              fluid
              hideOnFail
              onNotFound={() => setHasBanner(false)}
              wrapperClassName="w-full min-h-40 sm:min-h-90"
              className="h-auto"
            />
            {projeto?.imageCaption && (
              <span className="flex items-start justify-center gap-2 w-full mt-4">
                <InfoIcon className="size-3.5 text-muted-foreground/70 shrink-0" />
                <p className="text-[0.7rem] leading-tight text-muted-foreground">
                  {renderRichText(projeto?.imageCaption?.[locale] ?? "")}
                </p>
              </span>
            )}
          </span>
        )}

        {problemSolution ? (
          <ProblemSolution
            problem={problemSolution.problem}
            solution={problemSolution.solution}
            t={t}
          />
        ) : null}

        {pageContent ? (
          <div className="flex flex-col items-center gap-16 px-6 w-full sm:px-0 py-12">
            <ProjectDecisions
              decisions={pageContent.decisions}
              locale={locale}
              t={t}
            />
            <ProjectScreens
              screens={pageContent.screens}
              locale={locale}
              t={t}
            />
            <ProjectResults
              results={pageContent.results}
              locale={locale}
              t={t}
            />
            <WhatIdDoDifferently
              paragraphs={pageContent.whatIdDoDifferently}
              locale={locale}
              t={t}
            />
          </div>
        ) : null}

        {markdown ? (
          <TechnicalDetails
            title={pageContent ? t.projects.technicalDetailsTitle : ""}
            hideTrigger={!pageContent}
          >
            {pageContent && projeto.tecnologias.length > 0 ? (
              <div className="flex sm:flex-wrap sm:flex-row flex-col sm:items-center items-start justify-center gap-x-1.5 gap-y-4 first:border-t-0 my-2 p-4 w-full mx-auto">
                <span className="font-medium text-xs text-muted-foreground uppercase tracking-tight">
                  Stack:
                </span>
                <div className="flex sm:flex-wrap sm:flex-row flex-col items-start sm:items-center justify-center gap-x-1.5 gap-y-3 sm:divide-x">
                  {projeto.tecnologias.map((tec) => {
                    const icon = getSolidTechIcon(tec);
                    return (
                      <span
                        key={tec}
                        className="flex items-center gap-1 font-mono text-sm leading-none select-none px-2 mr-1"
                      >
                        {icon ? (
                          <TechIcon icon={icon} className="size-3" />
                        ) : null}
                        {tec}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <div className="flex w-full items-start gap-8 pt-12">
              {markdown.length > TOC_MIN_MARKDOWN_LENGTH ? (
                <SidebarRail>
                  <TableOfContents
                    containerRef={markdownRef}
                    title={t.projects.tableOfContents}
                  />
                  <ArticleImageIndex title={t.projects.imageIndex} />
                </SidebarRail>
              ) : null}
              <div
                ref={markdownRef}
                className="text-sm text-muted-foreground mt-0 min-w-0 max-w-full flex-1 px-6 pb-6 prose"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={markdownComponents}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
            {markdown.length > TOC_MIN_MARKDOWN_LENGTH ? (
              <TableOfContentsMobile
                containerRef={markdownRef}
                title={t.projects.tableOfContents}
              />
            ) : null}
          </TechnicalDetails>
        ) : null}

        <div className="flex items-center justify-between gap-3 border-t p-6">
          {prevProjeto ? (
            <TransitionLink
              to={`/projects/${prevProjeto.slug}`}
              direction="backward"
              variant="ghost"
              size="sm"
              className="gap-1.5"
            >
              <ArrowLeftIcon className="size-3.5" />
              <span className="hidden sm:inline">
                {t.projects.previousProject}
              </span>
            </TransitionLink>
          ) : (
            <span />
          )}
          {nextProjeto ? (
            <TransitionLink
              to={`/projects/${nextProjeto.slug}`}
              direction="forward"
              variant="ghost"
              size="sm"
              className="gap-1.5"
            >
              <span className="hidden sm:inline">{t.projects.nextProject}</span>
              <ArrowRightIcon className="size-3.5" />
            </TransitionLink>
          ) : (
            <span />
          )}
        </div>

        <div className="flex items-center justify-center border-t p-6">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "auto"
                  : "smooth",
              })
            }
          >
            <ArrowUpIcon className="size-3.5" />
            {t.projects.backToTop}
          </Button>
        </div>
      </div>
    </ProjectGalleryProvider>
  );
}
