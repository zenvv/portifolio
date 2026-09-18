import type { Locale, Translations } from "@/lib/i18n/translations";
import type { ProjectScreen } from "@/lib/project-page-content";
import { useProjectGallery } from "@/lib/project-gallery";
import SectionTitle from "@/components/SectionTitle";
import FallbackImage from "@/components/FallbackImage";
import { ImagesIcon } from "@phosphor-icons/react";

export default function ProjectScreens({
  screens,
  locale,
  t,
}: {
  screens: ProjectScreen[];
  locale: Locale;
  t: Translations;
}) {
  const gallery = useProjectGallery();
  if (screens.length === 0) return null;

  return (
    <div className="flex w-full sm:max-w-5xl flex-col gap-4">
      <SectionTitle
        align="start"
        title={t.projects.screensTitle}
        icon={<ImagesIcon />}
        titleLevel="h3"
      />
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        {screens.map((screen) => (
          <figure key={screen.src} className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() =>
                gallery?.openAt(screen.src, {
                  title: screen.caption[locale],
                })
              }
              className="block w-full cursor-zoom-in border p-0 text-left"
            >
              <FallbackImage
                candidates={[screen.src]}
                alt={screen.caption[locale]}
                loading="lazy"
                decoding="async"
                fluid
                wrapperClassName="w-full"
                className="h-auto w-full"
              />
            </button>
            <figcaption className="text-xs leading-snug text-muted-foreground">
              {screen.caption[locale]}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
