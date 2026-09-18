import { useState } from "react";
import { useLanguage } from "@/lib/i18n/language.provider";
import {
  ArrowUpRightIcon,
  CaretDownIcon,
  MusicNotesIcon,
} from "@phosphor-icons/react";
import { Songs, type songsTypes } from "@/data/songs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VISIBLE_COUNT = 3;

function SongRow({ song }: { song: songsTypes }) {
  return (
    <a
      href={song.spotifyLink}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-3 border-t py-2 text-sm first:border-t-0"
    >
      <span className="min-w-0 truncate flex items-center justify-start gap-1">
        <span className="text-foreground transition-colors group-hover:text-primary truncate">
          {song.name}
        </span>
        <span>·</span>
        <span className="text-muted-foreground"> {song.artist}</span>
      </span>
      <ArrowUpRightIcon className="size-3.5 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
    </a>
  );
}

/** A plain list (name, artist, and a link arrow) meant to sit inline below
 * the "off the clock" section rather than behind a disclosure. */
export default function SongsList({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
        <MusicNotesIcon className="size-3.5" />
        {t.hero.songs.title}
      </span>

      <div className="flex flex-col">
        {Songs.map((song) => (
          <SongRow key={song.index} song={song} />
        ))}
      </div>
    </div>
  );
}
