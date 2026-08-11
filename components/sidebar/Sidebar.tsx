import Images from "@/components/sidebar/Images";
import Links from "@/components/sidebar/Links";
import { LanguageProvider } from "@/lib/i18n/language.provider";
import LangSelector from "./LanguageSelector";
import { ThemeSwitcher } from "./ThemeSwitcher";

function Sidebar() {
  return (
    <aside className="md:w-48 flex flex-col items-start justify-between md:fixed md:top-8 md:bottom-8 flex-1 shrink-0 h-auto">
      <div className="flex flex-row md:flex-col md:items-start items-center w-full md:gap-0 gap-3 ">
        <Images className="md:flex hidden" />
        <span className="md:hidden block w-30">
          <Images mini />
        </span>
        <div className="flex flex-col leading-none w-full ">
          <span className="text text-sm font-semibold">Willian Zeni</span>
          <span className="text-xs text-muted-foreground">@zenvv</span>
        </div>
        <span className="w-full">
          <Links />
        </span>
      </div>
      <footer className="flex items-center justify-between w-full md:mt-0 mt-4">
        <LangSelector />
        <ThemeSwitcher />
      </footer>
    </aside>
  );
}

export default Sidebar;
