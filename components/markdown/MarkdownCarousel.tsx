import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Slide = { src: string; title?: string; description?: string };

/** Neutral mid-gray so a transparent PNG reads whether its artwork is dark or
 * light. Kept identical in both themes on purpose — it's about the image, not
 * the page. */
const IMAGE_BG = "bg-neutral-400";

/** Parses the body of a ```carousel fenced block. One image per line:
 *
 *   /projects/foo/images/01.png | Caption / description
 *   /projects/foo/images/02.png | Short title | Longer description
 *   /projects/foo/images/03.png
 *
 * `#` and blank lines are ignored. Fields are split on `|`: the first is the
 * image URL. With one text field it's the description; with two or more the
 * first is a short title and the rest (re-joined) the description. */
function parseCarousel(source: string): Slide[] {
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [src, ...rest] = line.split("|").map((p) => p.trim());
      if (rest.length === 0) return { src };
      if (rest.length === 1) return { src, description: rest[0] };
      return { src, title: rest[0], description: rest.slice(1).join(" | ") };
    })
    .filter((slide) => slide.src);
}

export default function MarkdownCarousel({ source }: { source: string }) {
  const slides = parseCarousel(source);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
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

  if (slides.length === 0) return null;

  const active = slides[selected];
  const activeText = active?.title ?? active?.description;
  const openSlide = openIndex === null ? null : slides[openIndex];

  return (
    <div className="not-prose my-6">
      <div className="relative">
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex gap-3">
            {slides.map((slide, i) => (
              <button
                type="button"
                key={`${slide.src}-${i}`}
                onClick={() => setOpenIndex(i)}
                className="group relative block shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-border outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={
                  slide.title ?? slide.description ?? `Abrir imagem ${i + 1}`
                }
              >
                <img
                  src={slide.src}
                  alt={slide.title ?? slide.description ?? ""}
                  loading="lazy"
                  className={cn(
                    "h-56 w-auto object-contain transition-opacity group-hover:opacity-90 sm:h-72",
                    IMAGE_BG,
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <ArrowButton
          direction="prev"
          disabled={!canPrev}
          onClick={() => emblaApi?.scrollPrev()}
        />
        <ArrowButton
          direction="next"
          disabled={!canNext}
          onClick={() => emblaApi?.scrollNext()}
        />
      </div>

      <div className="mt-2 flex items-start justify-between gap-4">
        <p className="min-h-8 flex-1 text-xs leading-tight text-muted-foreground">
          {activeText}
        </p>
        <span className="shrink-0 pt-0.5 font-mono text-[0.7rem] text-muted-foreground/70">
          {selected + 1} / {slides.length}
        </span>
      </div>

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <DialogContent className="max-w-[calc(100%-2rem)] gap-0 sm:max-w-3xl lg:max-w-4xl p-0 overflow-hidden rounded-lg">
          {openSlide && (
            <>
              <div className="p-6 border-b">
                <DialogHeader className="gap-0">
                  <DialogTitle>
                    {openSlide.title ??
                      `Imagem ${(openIndex ?? 0) + 1} de ${slides.length}`}
                  </DialogTitle>
                  {openSlide.description && (
                    <DialogDescription>
                      {openSlide.description}
                    </DialogDescription>
                  )}
                </DialogHeader>
              </div>
              <span
                className={cn("max-h-[70vh] w-full rounded-none p-4", IMAGE_BG)}
              >
                <img
                  src={openSlide.src}
                  alt={openSlide.title ?? openSlide.description ?? ""}
                  className={cn("object-contain")}
                />
              </span>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? CaretLeftIcon : CaretRightIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Anterior" : "Próxima"}
      className={cn(
        "absolute top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full",
        "border border-border bg-background/85 text-foreground shadow-md backdrop-blur-sm",
        "transition-[opacity,transform,background-color] duration-200 ease-out",
        "hover:bg-background hover:shadow-lg active:scale-95",
        "disabled:pointer-events-none disabled:scale-90 disabled:opacity-0",
        direction === "prev" ? "left-2" : "right-2",
      )}
    >
      <Icon className="size-4" weight="bold" />
    </button>
  );
}
