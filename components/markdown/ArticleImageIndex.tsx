import { cn } from "@/lib/utils";
import { useProjectGallery } from "@/lib/project-gallery";

const MAX_VISIBLE = 6;

/** A quick-scan thumbnail grid of every image in the project's `images/`
 * folder (banner included, icon excluded — see `useProjectImages`), not
 * just the ones referenced in the article body: a screenshot that isn't
 * linked from the markdown still shows up here. Caps at 6 tiles: the 6th
 * becomes a dimmed "+N" overlay on that same image rather than a 7th tile,
 * so the rail never grows past a fixed, predictable size. Clicking any
 * thumbnail opens the shared lightbox (`lib/project-gallery.tsx`) at that
 * image, from which every other project image is reachable via the arrows. */
export default function ArticleImageIndex({ title }: { title: string }) {
  const gallery = useProjectGallery();
  const images = gallery?.images ?? [];

  if (images.length === 0) return null;

  const overflow = images.length - MAX_VISIBLE;
  const visible = images.slice(0, overflow > 0 ? MAX_VISIBLE : images.length);

  return (
    <div className="flex w-full flex-col gap-2 border-t pt-4">
      <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground/60">
        {title}
      </span>
      <div className="grid grid-cols-3 gap-1.5">
        {visible.map((img, i) => {
          const isLastOverlay = overflow > 0 && i === MAX_VISIBLE - 1;
          return (
            <button
              key={img.src}
              type="button"
              onClick={() => gallery?.openIndex(i)}
              aria-label={
                isLastOverlay ? `+${overflow}` : img.alt || `Imagem ${i + 1}`
              }
              className="relative aspect-square cursor-zoom-in overflow-hidden border border-border transition-opacity hover:opacity-75"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="size-full object-cover"
              />
              {isLastOverlay ? (
                <span
                  className={cn(
                    "absolute inset-0 flex items-center justify-center bg-black/60",
                    "font-mono text-xs font-medium text-white",
                  )}
                >
                  +{overflow}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
