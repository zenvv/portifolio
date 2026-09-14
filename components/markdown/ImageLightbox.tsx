import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/lib/project-content";

/** Neutral mid-gray so a transparent PNG reads whether its artwork is dark or
 * light. Kept identical in both themes on purpose: it's about the image, not
 * the page. */
const IMAGE_BG = "bg-neutral-400";

/**
 * Full-screen image viewer in the spirit of Google Photos / X / Dribbble:
 * always a dark scrim (no blur, both themes), the image sized purely by its
 * height (~78vh), no frame, click-to-zoom, edge-anchored chrome, arrow-key
 * and edge-button navigation across the whole `images` list.
 *
 * Shared by every image surface on a project page (see
 * `lib/project-gallery.tsx`): a `carousel` slide, a sidebar thumbnail, a
 * plain markdown `<img>`. `caption`, when given, only applies to the image
 * the lightbox was opened at — navigating away from it shows no caption,
 * since a richer one (a carousel's title/description) is only known at that
 * entry point, not for the project's image list in general.
 */
export default function ImageLightbox({
  images,
  index,
  caption,
  onIndexChange,
  onClose,
}: {
  images: ProjectImage[];
  index: number | null;
  caption?: { title?: string; description?: string };
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  // Zoom is tracked per-index so navigating to another image always lands at
  // 100% without a reset effect.
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const open = index !== null;
  const image = index === null ? null : images[index];
  const zoomed = index !== null && zoomedIndex === index;
  const hasPrev = index !== null && index > 0;
  const hasNext = index !== null && index < images.length - 1;

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
    if (index !== null && index < images.length - 1) goTo(index + 1);
  }, [index, images.length, goTo]);

  // Arrow-key navigation (Escape is handled by the dialog primitive).
  // Capture phase: the dialog's own focus-trapped popup stops some keydowns
  // from reaching a bubble-phase window listener, which silently ate this.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [open, goPrev, goNext]);

  const title = caption?.title;
  const description = caption?.description;

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => !next && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/70 duration-150 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0" />
        <DialogPrimitive.Popup className="fixed inset-0 z-50 outline-none duration-150 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0">
          {image && (
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
                  src={image.src}
                  alt={title ?? description ?? image.alt}
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

              {/* Title + description, top-left of the screen. */}
              {(title || description) && (
                <div className="pointer-events-none absolute top-0 left-0 max-w-[min(90vw,34rem)] p-4 sm:p-6">
                  <DialogPrimitive.Title className="font-heading text-sm font-medium text-white drop-shadow-sm">
                    {title ?? `Imagem ${(index ?? 0) + 1} de ${images.length}`}
                  </DialogPrimitive.Title>
                  {description && (
                    <DialogPrimitive.Description className="mt-1 text-xs leading-snug text-white/70 drop-shadow-sm">
                      {description}
                    </DialogPrimitive.Description>
                  )}
                </div>
              )}
              {!title && !description && (
                <DialogPrimitive.Title className="sr-only">
                  Imagem {(index ?? 0) + 1} de {images.length}
                </DialogPrimitive.Title>
              )}

              {/* Close, top-right of the screen. */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="absolute top-3 right-3 z-10 grid size-10 place-items-center text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:top-4 sm:right-4"
              >
                <XIcon className="size-5" weight="bold" />
              </button>

              {/* Prev / next, anchored to the screen edges. */}
              {images.length > 1 && (
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
        "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center",
        "text-white/80 transition-colors hover:bg-white/10 hover:text-white",
        "disabled:pointer-events-none disabled:opacity-0",
        direction === "prev" ? "left-2 sm:left-4" : "right-2 sm:right-4",
      )}
    >
      <Icon className="size-6" weight="bold" />
    </button>
  );
}
