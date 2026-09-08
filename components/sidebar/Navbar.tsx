import { CompactContactLinks } from "@/components/sidebar/Contact";
import LangSelector from "./LanguageSelector";
import { ThemeSwitcher } from "./ThemeSwitcher";

import Logo from "./Logo";

function Navbar() {
  return (
    <header className="sticky top-0 z-[500] backdrop-blur-2xl bg-background/60 border-b">
      <div className="relative mx-auto flex w-full max-w-full items-center justify-between gap-4 p-4 lg:max-w-5xl">
        <Logo />
        <CompactContactLinks />
        <span className="flex items-center gap-2">
          <LangSelector />

          <ThemeSwitcher />
        </span>
      </div>
    </header>
  );
}

export default Navbar;
