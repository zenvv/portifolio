import { useTheme } from "@/components/theme-provider";
import { MoonIcon, SunDimIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={"ghost"}
      size="icon-sm"
      className={" active:scale-95"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <SunDimIcon className="dark:hidden block transition-all scale-100 dark:scale-0 rotate-360 " />
      <MoonIcon className="dark:block hidden transition-all scale-0 dark:scale-100 rotate-360 " />
    </Button>
  );
}
