import { useLanguage } from "@/lib/i18n/language.provider";

import { ArrowUpRightIcon, MusicNotesIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Img } from "@/components/ui/image";
import SectionTitle from "@/components/SectionTitle";
import { Songs, type songsTypes } from "@/data/songs";

function SongCard({ song }: { song: songsTypes }) {
  return (
    <a
      className={cn(
        "flex hover:bg-muted items-center justify-center p-1 rounded-md group relative",
      )}
      href={song.spotifyLink}
      target="_blank"
    >
      <Img
        src={song.artwork ?? ""}
        alt={`${song.name}'s artwork`}
        wrapperClassName="size-10 shrink-0 rounded-sm"
        className="rounded-sm"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
      <div className="w-full flex flex-col items-center justify-center text-left truncate px-2 h-full pr-8">
        <p className="leading-tight truncate w-full text-sm">{song.name}</p>

        <p className="text-xs text-muted-foreground truncate w-full">
          {song.artist}
        </p>
      </div>
      <span className="absolute group-hover:text-primary right-4 top-4 group-hover:top-2 group-hover:right-2 transition-all opacity-0 group-hover:opacity-100">
        <ArrowUpRightIcon weight="regular" className="size-4" />
      </span>
    </a>
  );
}

function SongsCarousel() {
  return (
    <div className="relative flex items-center justify-center w-full p-4">
      <div className="grid grid-cols-2 gap-1.5 w-full">
        {Songs.map((song) => (
          <SongCard key={song.index} song={song} />
        ))}
      </div>
    </div>
  );
}

export default function SongsBanner({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <SectionTitle
        align="center"
        title={`${t.hero.songs.title}!`}
        icon={<MusicNotesIcon className="size-3.5" />}
        className=""
      />
      <SongsCarousel />
    </div>
  );
}
