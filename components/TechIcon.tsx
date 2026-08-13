import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import type { TechIcon as TechIconValue } from "@/lib/tech-icons";

export default function TechIcon({
  icon,
  className,
}: {
  icon: TechIconValue;
  className?: string;
}) {
  if (typeof icon === "string") {
    return <Icon icon={icon} className={cn("size-4 shrink-0", className)} />;
  }

  const Custom = icon;
  return <Custom className={cn("size-4 shrink-0", className)} />;
}
