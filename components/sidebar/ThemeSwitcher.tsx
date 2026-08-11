import { useTheme, type Theme } from "@/components/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  LaptopIcon,
  MoonIcon,
  SunDimIcon,
  type Icon,
} from "@phosphor-icons/react";

interface ThemeItems {
  label: string;
  value: Theme;
  icon: Icon;
}

const items: ThemeItems[] = [
  {
    label: "Claro",
    value: "light",
    icon: SunDimIcon,
  },
  {
    label: "Escuro",
    value: "dark",
    icon: MoonIcon,
  },
  {
    label: "Sistema",
    value: "system",
    icon: LaptopIcon,
  },
];

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <ToggleGroup
      spacing={0}
      size={"sm"}
      variant="outline"
      defaultValue={[theme]}
      className="rounded-full! bg-transparent! h-7!"
    >
      {items.map((item) => (
        <ToggleGroupItem
          id={item.value}
          key={item.value}
          className="cursor-pointer rounded-full aspect-square size-7!"
          onClick={() => setTheme(item.value)}
          aria-label={item.label}
          value={item.value}
        >
          <item.icon weight={theme === item.value ? "fill" : "regular"} />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
