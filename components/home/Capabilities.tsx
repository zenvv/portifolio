import { useLanguage } from "@/lib/i18n/language.provider";
import { cn } from "@/lib/utils";
import {
  ChartBarIcon,
  CodeIcon,
  GraphIcon,
  PenNibIcon,
  type Icon,
} from "@phosphor-icons/react";

type CapabilityKey = "development" | "automation" | "data" | "design";

const ICONS: Record<CapabilityKey, Icon> = {
  development: CodeIcon,
  automation: GraphIcon,
  data: ChartBarIcon,
  design: PenNibIcon,
};

const ORDER: CapabilityKey[] = ["development", "automation", "data", "design"];

export default function Capabilities({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <h2 className="text-sm font-semibold text-foreground">
        {t.capabilities.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ORDER.map((key) => {
          const item = t.capabilities.items[key];
          const CapabilityIcon = ICONS[key];
          return (
            <div
              key={key}
              className="flex flex-col gap-2 rounded-lg border p-3.5"
            >
              <span className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-sm border bg-muted text-muted-foreground">
                  <CapabilityIcon className="size-3.5" />
                </span>
                <span className="text-sm font-medium">{item.title}</span>
              </span>
              <p className="text-xs leading-snug text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
