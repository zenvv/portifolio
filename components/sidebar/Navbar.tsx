import { useState } from "react";
import Avatar from "@/components/sidebar/Avatar";
import Links from "@/components/sidebar/Links";
import LangSelector from "./LanguageSelector";
import { ThemeSwitcher } from "./ThemeSwitcher";
import DownloadCV from "./DownloadCV";
import { useLanguage } from "@/lib/i18n/language.provider";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListIcon, XIcon } from "@phosphor-icons/react";

function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="md:hidden sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex w-full max-w-full items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:max-w-5xl">
        <LangSelector />
        <Avatar />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            aria-label={t.nav.menu}
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-full"
              />
            }
          >
            {open ? <XIcon /> : <ListIcon />}
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={12}
            className="w-72 max-h-(--available-height) overflow-y-auto flex flex-col gap-5"
          >
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold">Willian Zeni</span>
              <span className="text-xs text-muted-foreground">@zenvv</span>
            </div>
            <Links />
            <DownloadCV />
            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-xs text-muted-foreground">
                {t.nav.theme}
              </span>
              <ThemeSwitcher />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-6 bg-gradient-to-b from-background/60 to-transparent"
      />
    </header>
  );
}

export default Navbar;
