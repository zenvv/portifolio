import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

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

      <Lightbox
        slides={slides}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  );
}

/** Full-screen image viewer in the spirit of Google Photos / X / Dribbble:
 * always a dark scrim (no blur, both themes), the image sized purely by its
 * height (~78vh), no frame, click-to-zoom, edge-anchored chrome. */
function Lightbox({
  slides,
  index,
  onIndexChange,
  onClose,
}: {
  slides: Slide[];
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  // Zoom is tracked per-index so navigating to another image always lands at
  // 100% without a reset effect.
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const open = index !== null;
  const slide = index === null ? null : slides[index];
  const zoomed = index !== null && zoomedIndex === index;
  const hasPrev = index !== null && index > 0;
  const hasNext = index !== null && index < slides.length - 1;

  const goTo = useCallback(
    (next: number) => {
      setZoomedIndex(null);
      scrollRef.current?.scrollTo({ top: 0 });
      onIndexChange(next);
    },
    [onIndexChange],
  );
  const goPrev = useCallback(() => {
    if (index !== null && index > 0) goTo(index - 1);
  }, [index, goTo]);
  const goNext = useCallback(() => {
    if (index !== null && index < slides.length - 1) goTo(index + 1);
  }, [index, slides.length, goTo]);

  // Arrow-key navigation (Escape is handled by the dialog primitive).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goPrev, goNext]);

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => !next && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/70 duration-150 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0" />
        <DialogPrimitive.Popup className="fixed inset-0 z-50 outline-none duration-150 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0">
          {slide && (
            <>
              {/* Scroll + click-to-close surface. The image drives its own
               * size; empty space around it dismisses. */}
              <div
                ref={scrollRef}
                onClick={(e) => {
                  if (e.target === e.currentTarget) onClose();
                }}
                className="absolute inset-0 flex justify-center overflow-x-hidden overflow-y-auto overscroll-contain py-[11dvh]"
              >
                <img
                  src={slide.src}
                  alt={slide.title ?? slide.description ?? ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedIndex(zoomed ? null : index);
                  }}
                  draggable={false}
                  className={cn(
                    "w-auto max-w-none shrink-0 select-none transition-[height] duration-200 ease-out",
                    IMAGE_BG,
                    zoomed
                      ? "h-[156dvh] cursor-zoom-out"
                      : "h-[78dvh] cursor-zoom-in",
                  )}
                />
              </div>

              {/* Faint top scrim so the chrome stays legible over a light
               * image. */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/40 to-transparent" />

              {/* Title + description — top-left of the screen. */}
              {(slide.title || slide.description) && (
                <div className="pointer-events-none absolute top-0 left-0 max-w-[min(90vw,34rem)] p-4 sm:p-6">
                  <DialogPrimitive.Title className="font-heading text-sm font-medium text-white drop-shadow-sm">
                    {slide.title ?? `Imagem ${(index ?? 0) + 1} de ${slides.length}`}
                  </DialogPrimitive.Title>
                  {slide.description && (
                    <DialogPrimitive.Description className="mt-1 text-xs leading-snug text-white/70 drop-shadow-sm">
                      {slide.description}
                    </DialogPrimitive.Description>
                  )}
                </div>
              )}
              {!slide.title && !slide.description && (
                <DialogPrimitive.Title className="sr-only">
                  Imagem {(index ?? 0) + 1} de {slides.length}
                </DialogPrimitive.Title>
              )}

              {/* Close — top-right of the screen. */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:top-4 sm:right-4"
              >
                <XIcon className="size-5" weight="bold" />
              </button>

              {/* Prev / next — anchored to the screen edges. */}
              {slides.length > 1 && (
                <>
                  <EdgeButton
                    direction="prev"
                    disabled={!hasPrev}
                    onClick={goPrev}
                  />
                  <EdgeButton
                    direction="next"
                    disabled={!hasNext}
                    onClick={goNext}
                  />
                </>
              )}
            </>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function EdgeButton({
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
      aria-label={direction === "prev" ? "Imagem anterior" : "Próxima imagem"}
      className={cn(
        "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full",
        "text-white/80 transition-colors hover:bg-white/10 hover:text-white",
        "disabled:pointer-events-none disabled:opacity-0",
        direction === "prev" ? "left-2 sm:left-4" : "right-2 sm:right-4",
      )}
    >
      <Icon className="size-6" weight="bold" />
    </button>
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
