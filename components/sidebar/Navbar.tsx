import { useState } from "react";
// import Avatar from "@/components/sidebar/Avatar";
import ContactLinks, {
  CompactContactLinks,
} from "@/components/sidebar/Contact";
import LangSelector from "./LanguageSelector";
import { ThemeSwitcher } from "./ThemeSwitcher";
import DownloadCV from "./DownloadCV";
import { useLanguage } from "@/lib/i18n/language.provider";
import { Button } from "@/components/ui/button";
import { ListIcon } from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import Logo from "./Logo";
// import Links from "@/components/sidebar/Links";

function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[500] backdrop-blur-2xl bg-background/60 border-b">
      <div className="relative mx-auto flex w-full max-w-full items-center justify-between gap-4 p-4 lg:max-w-5xl">
        <Logo />
        {/* <Links /> */}
        <CompactContactLinks />
        <span className="flex items-center gap-2">
          <LangSelector />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label={t.nav.menu}
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-md active:scale-90 transition-all group md:hidden"
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
                <ContactLinks />
                <DownloadCV className="w-full justify-center" />
              </div>
              <SheetFooter className="flex items-center justify-between flex-row min-w-full border-t">
                <span className="text-xs text-muted-foreground">
                  {t.nav.theme}
                </span>
                <ThemeSwitcher />
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <ThemeSwitcher />
        </span>
      </div>
    </header>
  );
}

export default Navbar;
