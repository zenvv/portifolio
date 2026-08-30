import Images from "@/components/sidebar/Images";
import Links from "@/components/sidebar/Contact";
import LangSelector from "./LanguageSelector";
import { ThemeSwitcher } from "./ThemeSwitcher";
import DownloadCV from "./DownloadCV";

function Sidebar() {
  return (
    <aside className="flex w-full max-w-64 flex-col items-start justify-between fixed top-0 bottom-0 flex-1 shrink-0 h-auto border-x bg-background">
      <div className="flex flex-col items-start w-full flex-1 ">
        <div className="flex items-center w-full flex-col justify-center p-4">
          <Images />
          <div className="flex flex-col leading-none w-full text-center">
            <span className="text text-sm font-semibold leading-none">
              Willian Zeni
            </span>
            <span className="text-xs text-muted-foreground leading-none">
              @zenvv
            </span>
          </div>
        </div>

        <span className="w-full mt-2 border-y p-4">
          <Links />
        </span>
      </div>
      <footer className="flex flex-col gap-4 w-full border-t p-4">
        <DownloadCV />
        <span className="flex w-full justify-between border-t border-dashed pt-2">
          <LangSelector />
          <ThemeSwitcher />
        </span>
      </footer>
    </aside>
  );
}

export default Sidebar;
