import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/language.provider";
import { Songs, type songsTypes } from "@/lib/songs";
import {
  MusicNotesIcon,
  SpotifyLogoIcon,
  YoutubeLogoIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

function SongSlide({ song }: { song: songsTypes }) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "w-full aspect-square overflow-hidden rounded-xs border transition-all hover:rounded-md size-18 hover:scale-115 hover:shadow-lg",
          )}
          render={<a href={song.spotifyLink} target="_blank"></a>}
        >
          <img
            src={song.artwork ?? ""}
            alt={`${song.name}'s artwork`}
            className="size-full object-cover"
            draggable={false}
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
    </>
  );
}

function SongsCarousel() {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="flex items-center flex-wrap w-full gap-2 ">
        {Songs.map((song, index) => (
          <SongSlide key={song.index} song={song} />
        ))}
      </div>
    </div>
  );
}

export default function SongsBanner() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-3 w-full mt-4 ">
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
