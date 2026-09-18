/* eslint-disable react-hooks/purity */
import { useMemo } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/language.provider";
import { Img } from "@/components/ui/image";
import { CoffeeIcon } from "@phosphor-icons/react";
import { PROFILE_PHOTOS } from "@/data/photos";
import SongsList from "@/components/home/Songs";
import SectionTitle from "@/components/SectionTitle";
import { cn } from "@/lib/utils";
import { EASE, useScrollReveal } from "@/lib/motion";

const SCATTER_COUNT = 7;
const PHOTO_STAGGER = 0.08;
const PHOTO_DURATION = 0.45;

const SCATTER_LAYOUT = [
  { top: "2%", left: "0%", rotate: -6 },
  { top: "16%", left: "13%", rotate: 5 },
  { top: "0%", left: "27%", rotate: -3 },
  { top: "14%", left: "41%", rotate: 4 },
  { top: "3%", left: "55%", rotate: -5 },
  { top: "17%", left: "68%", rotate: 3 },
  { top: "1%", left: "81%", rotate: -4 },
] as const;

/** Picks a random, order-shuffled slice of the photo pool each time the
 * component mounts: a fresh scatter on every visit rather than the same
 * fixed five. */
function useRandomPhotos(count: number) {
  return useMemo(() => {
    const shuffled = [...PROFILE_PHOTOS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }, [count]);
}

/** Drops each photo in from above into its scattered, tilted resting spot,
 * one at a time, as the gallery scrolls into view. */
function FloatingGallery({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const photos = useRandomPhotos(SCATTER_COUNT);

  return (
    <div className="relative h-28 w-full max-w-sm sm:h-32">
      {photos.map((photo, index) => {
        const layout = SCATTER_LAYOUT[index];
        return (
          <div
            key={photo.img}
            className="absolute size-16 sm:size-20"
            style={{ top: layout.top, left: layout.left }}
          >
            <motion.div
              className="size-full overflow-hidden border-2 border-background shadow-md shadow-black/10"
              initial={reduceMotion ? false : { opacity: 0, y: -14, rotate: 0 }}
              animate={
                active ? { opacity: 1, y: 0, rotate: layout.rotate } : {}
              }
              transition={{
                duration: PHOTO_DURATION,
                delay: index * PHOTO_STAGGER,
                ease: EASE,
              }}
            >
              <Img
                src={photo.img}
                alt={photo.label || ""}
                loading="lazy"
                decoding="async"
                draggable={false}
                wrapperClassName="size-full"
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export default function AboutPersonal({ className }: { className?: string }) {
  const { t } = useLanguage();
  const { ref, active, reduceMotion } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("flex flex-col gap-3 w-full", className)}>
      <SectionTitle
        align="start"
        title={t.about.personalEyebrow}
        icon={<CoffeeIcon />}
        titleLevel="h3"
        className="hidden sm:flex"
      />
      <SectionTitle
        align="center"
        title={t.about.personalEyebrow}
        icon={<CoffeeIcon />}
        titleLevel="h3"
        className="sm:hidden flex"
      />

      <div className="flex flex-col sm:items-start items-center text-center sm:text-start gap-4 pt-1">
        <FloatingGallery active={active} reduceMotion={reduceMotion} />
        <p className="max-w-sm text-sm text-muted-foreground text-pretty mb-8">
          {t.about.personalTeaser}
        </p>
        <SongsList />
      </div>
    </div>
  );
}
