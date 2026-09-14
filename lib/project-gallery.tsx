import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProjectImage } from "@/lib/project-content";
import ImageLightbox from "@/components/markdown/ImageLightbox";

type Caption = { title?: string; description?: string } | undefined;

type GalleryContextValue = {
  images: ProjectImage[];
  /** Opens the shared lightbox at the image whose `src` matches (a
   * `carousel` slide, an inline markdown `<img>`); no-ops if `src` isn't in
   * the project's image list. `caption` is shown only for this opening —
   * arrow navigation away from it reverts to the plain filename-derived
   * alt, since only the clicked-through entry point has a richer one. */
  openAt: (src: string, caption?: Caption) => void;
  /** Opens the shared lightbox at a known position (sidebar thumbnails). */
  openIndex: (index: number) => void;
};

const GalleryContext = createContext<GalleryContextValue | null>(null);

/**
 * Wraps a project page so every image click — a sidebar thumbnail, a
 * `carousel` slide, a plain markdown/HTML `<img>` — opens the *same*
 * lightbox over the *same* full image list (every file in that project's
 * `images/` folder, per {@link useProjectImages}), instead of each surface
 * keeping its own scoped gallery. Renders the lightbox itself, so a project
 * page only needs to mount this once around its content.
 */
export function ProjectGalleryProvider({
  images,
  children,
}: {
  images: ProjectImage[];
  children: ReactNode;
}) {
  const [openState, setOpenState] = useState<{
    index: number;
    caption: Caption;
  } | null>(null);

  const openAt = useCallback(
    (src: string, caption?: Caption) => {
      const index = images.findIndex((img) => img.src === src);
      if (index >= 0) setOpenState({ index, caption });
    },
    [images],
  );
  const openIndex = useCallback((index: number) => {
    setOpenState({ index, caption: undefined });
  }, []);
  const changeIndex = useCallback((index: number) => {
    setOpenState({ index, caption: undefined });
  }, []);
  const close = useCallback(() => setOpenState(null), []);

  const value = useMemo<GalleryContextValue>(
    () => ({ images, openAt, openIndex }),
    [images, openAt, openIndex],
  );

  return (
    <GalleryContext.Provider value={value}>
      {children}
      <ImageLightbox
        images={images}
        index={openState?.index ?? null}
        caption={openState?.caption}
        onIndexChange={changeIndex}
        onClose={close}
      />
    </GalleryContext.Provider>
  );
}

/** `null` outside a {@link ProjectGalleryProvider} (e.g. `MarkdownCarousel`
 * used somewhere that isn't a project page) — callers should no-op rather
 * than throw. */
export function useProjectGallery() {
  return useContext(GalleryContext);
}
