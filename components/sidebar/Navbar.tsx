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
import { CellSignalHighIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="md:hidden sticky top-0 z-40 backdrop-blur-2xl">
      <div className="relative mx-auto flex w-full max-w-full items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:max-w-5xl">
        <LangSelector />
        <Avatar />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label={t.nav.menu}
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-md active:scale-90 transition-all group"
              />
            }
          >
            <ListIcon weight="regular" className="" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-linear-to-b from-popover to-background max-w-full!"
          >
            <SheetHeader className="flex flex-col leading-none">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Willian Zeni</span>
                <span className="text-xs text-muted-foreground">@zenvv</span>
              </div>
            </SheetHeader>
            <div className="flex-1 gap-8 h-full p-4 flex flex-col justify-between">
              <Links />
              <DownloadCV />
            </div>
            <SheetFooter className="flex items-center justify-between flex-row min-w-full border-t">
              <span className="text-xs text-muted-foreground">
                {t.nav.theme}
              </span>
              <ThemeSwitcher />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-6 "
      />
    </header>
  );
}

export default Navbar;
