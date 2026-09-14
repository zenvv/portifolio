import LangSelector from "./LanguageSelector";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { SocialIconLinks } from "./Contact";
import ContactDrawer from "./ContactDrawer";

import Logo from "./Logo";

function Navbar() {
  return (
    <header className="sticky top-0 z-[500] bg-background border-b border-dashed">
      <div className="relative mx-auto flex w-full max-w-full items-center justify-between gap-4 p-4 lg:max-w-7xl">
        <Logo />
        <ContactDrawer className="sm:hidden" />
        <span className="flex items-center gap-1">
          <SocialIconLinks className="hidden gap-0.5 sm:flex" />
          <span
            className="mx-0.5 hidden h-4 w-px bg-border sm:block"
            aria-hidden
          />
          <LangSelector />
          <span className="mx-0.5 h-4 w-px bg-border" aria-hidden />
          <ThemeSwitcher />
        </span>
      </div>
    </header>
  );
}

export default Navbar;
