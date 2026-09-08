import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";

import { useLanguage } from "@/lib/i18n/language.provider";
import { FeaturedProjetos } from "@/data/projects";
import { getProjectBannerCandidates } from "@/lib/project-content";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import TransitionLink from "@/components/TransitionLink";
import FallbackImage from "@/components/FallbackImage";

const AUTOPLAY_MS = 5500;

/**
 * Full-width featured strip at the top of the projects page: one project at a
 * time with ~7% of each neighbour peeking, edge-to-edge imagery under a
 * theme-coloured gradient, and read / open actions on the right. Autoplays
 * (loop, pauses on hover/drag) unless the visitor prefers reduced motion.
 */
export default function FeaturedBanner({ className }: { className?: string }) {
  const { t, locale } = useLanguage();
  const projects = FeaturedProjetos;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const paused = useRef(false);
  const hovering = useRef(false);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay — a plain interval so we don't pull in the embla-autoplay plugin.
  useEffect(() => {
    if (!emblaApi) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const onPointerDown = () => {
      paused.current = true;
    };
    const onSettle = () => {
      paused.current = hovering.current;
    };
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("settle", onSettle);

    const id = window.setInterval(() => {
      if (!paused.current && emblaApi) emblaApi.scrollNext();
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(id);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("settle", onSettle);
    };
  }, [emblaApi]);

  if (projects.length === 0) return null;

  return (
    <section
      aria-label={
        locale === "pt" ? "Projetos em destaque" : "Featured projects"
      }
      className={cn("relative w-full select-none", className)}
      onMouseEnter={() => {
        hovering.current = true;
        paused.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
        paused.current = false;
      }}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {projects.map((project, i) => {
            const isActive = i === selected;
            const href = `/projects/${project.slug}`;

            return (
              <div
                key={project.slug}
                className="relative min-w-0 shrink-0 grow-0 basis-[86%] px-1 sm:px-1.5 border-b"
              >
                <div
                  className={cn(
                    "relative h-[260px] overflow-hidden bg-muted transition-[opacity,transform] duration-500 ease-out sm:h-[340px] lg:h-[400px]",
                    isActive ? "opacity-100" : "opacity-45 hover:opacity-70",
                  )}
                >
                  <FallbackImage
                    candidates={getProjectBannerCandidates(project.slug)}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    wrapperClassName="absolute inset-0 h-full w-full "
                    className={cn(
                      "h-full w-full object-cover transition-all",
                      isActive ? "scale-110" : "scale-100",
                    )}
                    alt={project.title[locale]}
                  />

                  {/* Theme-coloured wash: opaque near the text, clear up top. */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent to-80%" />

                  {/* Click target for the neighbours — snap them to centre. */}
                  {!isActive && (
                    <button
                      type="button"
                      onClick={() => emblaApi?.scrollTo(i)}
                      aria-label={project.title[locale]}
                      className="absolute inset-0 z-10 cursor-pointer outline-none"
                    />
                  )}

                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 z-20 flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:p-6 dark",
                      !isActive && "pointer-events-none",
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <h2 className="font-heading text-lg font-semibold text-foreground drop-shadow-sm sm:text-xl">
                        {project.title[locale]}
                      </h2>
                      <p className="mt-1 line-clamp-2 max-w-prose text-xs leading-snug text-muted-foreground sm:text-sm">
                        {project.shortDescription[locale]}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <TransitionLink
                        to={href}
                        direction="forward"
                        variant="default"
                        size="sm"
                        tabIndex={isActive ? undefined : -1}
                      >
                        {t.projects.readMore}
                        <ArrowRightIcon className="size-3.5" />
                      </TransitionLink>

                      {project.link != null && (
                        <Button
                          render={
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          }
                          variant="outline"
                          size="sm"
                          className="text-white"
                          tabIndex={isActive ? undefined : -1}
                        >
                          {t.projects.goToProject}
                          <ArrowUpRightIcon className="size-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {projects.length > 1 && (
        <>
          <EdgeArrow
            direction="prev"
            label={locale === "pt" ? "Anterior" : "Previous"}
            onClick={() => emblaApi?.scrollPrev()}
          />
          <EdgeArrow
            direction="next"
            label={locale === "pt" ? "Próximo" : "Next"}
            onClick={() => emblaApi?.scrollNext()}
          />

          <div className="mt-4 flex justify-center gap-1.5">
            {projects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`${locale === "pt" ? "Ir para" : "Go to"} ${project.title[locale]}`}
                aria-current={i === selected}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === selected
                    ? "w-5 bg-foreground"
                    : "w-1.5 bg-foreground/25 hover:bg-foreground/40",
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function EdgeArrow({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? CaretLeftIcon : CaretRightIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon-sm" }),
        "absolute top-[130px] z-30 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm sm:top-[170px] lg:top-[200px]",
        direction === "prev" ? "left-3" : "right-3",
      )}
    >
      <Icon className="size-4" weight="bold" />
    </button>
  );
}
