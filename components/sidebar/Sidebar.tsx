import Images from "@/components/sidebar/Images";
import Links from "@/components/sidebar/Links";
import LangSelector from "./LanguageSelector";
import { ThemeSwitcher } from "./ThemeSwitcher";
import DownloadCV from "./DownloadCV";

function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-48 flex-col items-start justify-between md:fixed md:top-8 md:bottom-8 md:flex-1 shrink-0 h-auto">
      <div className="flex flex-col items-start w-full">
        <Images />
        <div className="flex flex-col leading-none w-full">
          <span className="text text-sm font-semibold leading-none">
            Willian Zeni
          </span>
          <span className="text-xs text-muted-foreground leading-none">
            @zenvv
          </span>
        </div>
        <span className="w-full mt-8">
          <Links />
        </span>
      </div>
      <footer className="flex flex-col gap-4 w-full">
        <DownloadCV />
        <span className="flex w-full justify-between">
          <LangSelector />
          <ThemeSwitcher />
        </span>
      </footer>
    </aside>
  );
}

export default Sidebar;
