import { useState } from "react";
import type { Translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import type { ProfilePhoto, PhotoSize } from "@/data/photos";
import { CaretDownIcon, ImagesIcon } from "@phosphor-icons/react";

const ASPECT_CLASS: Record<PhotoSize, string> = {
  "1:1": "aspect-square",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "": "",
};

function PhotoTile({ photo }: { photo: ProfilePhoto }) {
  const label = photo.label || undefined;
  const aspectClass = ASPECT_CLASS[photo.size];

  const image = (
    <img
      src={photo.img}
      alt={label ?? ""}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn(
        "w-full rounded-md! transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rounded-none",
        aspectClass ? "h-full object-cover" : "h-auto",
      )}
    />
  );

  const wrapperClass = cn(
    "group w-full rounded-md! overflow-hidden border break-inside-avoid hover:rounded-none! transition-all",
    aspectClass,
  );

  if (!label) {
    return <div className={wrapperClass}>{image}</div>;
  }

  return (
    <div className="relative group overflow-hidden rounded-md! hover:rounded-none!">
      <div className={cn(wrapperClass, "block cursor-default")}>{image}</div>
      <div className="absolute group-hover:bottom-0 bg-linear-to-b from-transparent to-black text-white via-black/60 p-4 flex items-center justify-center group-hover:opacity-100 opacity-0 text-xs font-mono group-hover:left-0 bottom-0 left-0 transition-all text-wrap right-0 w-auto text-center">
        "{label}"
      </div>
    </div>
  );
}

export default function PhotoMasonry({
  photos,
  t,
}: {
  photos: ProfilePhoto[];
  t: Translations;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionTitle
        align="center"
        title={t.about.photosTitle}
        icon={<ImagesIcon />}
      />

      <div className="relative">
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out",
            expanded ? "max-h-[10000px]" : "max-h-96 ",
          )}
        >
          <div className="columns-2 sm:columns-3 md:columns-4 gap-2 [&>*]:mb-2 p-4">
            {photos.map((photo) => (
              <PhotoTile key={photo.img} photo={photo} />
            ))}
          </div>
        </div>

        {!expanded ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-48 items-end justify-center bg-gradient-to-t from-background via-background/85 to-transparent pb-3">
            <Button
              size="sm"
              variant="default"
              className="pointer-events-auto shadow-sm"
              onClick={() => setExpanded(true)}
            >
              <CaretDownIcon />
              {t.about.showMorePhotos}
            </Button>
          </div>
        ) : null}
      </div>

      {expanded ? (
        <div className="flex justify-center pb-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setExpanded(false)}
          >
            <CaretDownIcon className="rotate-180" />
            {t.about.showLessPhotos}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
