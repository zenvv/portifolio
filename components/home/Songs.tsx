import { useLanguage } from "@/lib/i18n/language.provider";

import { MusicNotesIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Songs, type songsTypes } from "@/data/songs";

function SongSlide({ song }: { song: songsTypes }) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "w-full aspect-square overflow-hidden rounded-md border transition-all hover:rounded-none max-size-full hover:scale-115 hover:shadow-lg",
        )}
        render={<a href={song.spotifyLink} target="_blank"></a>}
      >
        <img
          src={song.artwork ?? ""}
          alt={`${song.name}'s artwork`}
          className="size-full object-cover"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </TooltipTrigger>

      <TooltipContent side="bottom" align="center" className={cn("max-w-48")}>
        <div className="max-w-full flex flex-col text-center">
          <span className="flex items-center justify-start gap-1">
            <MusicNotesIcon />
            <p className="font-semibold leading-tight truncate w-full ">
              {song.name}
            </p>
          </span>
          <p className="text-xs text-muted-foreground truncate w-full">
            {song.artist}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function SongsCarousel() {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10 sm:gap-1 w-full">
        {Songs.map((song) => (
          <SongSlide key={song.index} song={song} />
        ))}
      </div>
    </div>
  );
}

export default function SongsBanner({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <div className={cn("flex flex-col gap-3 w-full mt-4", className)}>
      <span className="flex items-center gap-2 justify-start  text-foreground/70  shimmer shimmer-primary">
        <MusicNotesIcon className="size-3" />
        <h2 className="text-center font-medium text-sm">
          {t.hero.songs.title}!
        </h2>
      </span>
      <SongsCarousel />
    </div>
  );
}
