import {
  ChartBarIcon,
  GlobeIcon,
  GraphIcon,
  PenNibIcon,
} from "@phosphor-icons/react";
import PowerAppsIconSolid from "@/lib/icons/PowerAppsIconSolid";
import type { IconComponent } from "@/lib/tech-icons";
import { PROJECT_TYPES, type projectType } from "@/data/projects";

export type ProjectTypeFilterValue = projectType | "all";

export const PROJECT_TYPE_FILTER_VALUES: ProjectTypeFilterValue[] = [
  "all",
  ...PROJECT_TYPES,
];

/**
 * Icon + accent color for each project type, used by the project type filter.
 * `activeBg`/`activeText` are the SELECTED state: the type's color fills the
 * whole control and the label/icon turn to `activeText` for contrast.
 */
export const PROJECT_TYPE_META: Record<
  ProjectTypeFilterValue,
  { icon?: IconComponent; activeBg: string; activeText: string; disabled?: boolean }
> = {
  all: { activeBg: "bg-foreground", activeText: "text-background" },
  web: { icon: GlobeIcon, activeBg: "bg-indigo-600", activeText: "text-white" },
  powerapps: {
    icon: PowerAppsIconSolid,
    activeBg: "bg-pink-600",
    activeText: "text-white",
  },
  automation: {
    icon: GraphIcon,
    activeBg: "bg-blue-600",
    activeText: "text-white",
  },
  bi: {
    icon: ChartBarIcon,
    activeBg: "bg-yellow-500",
    activeText: "text-yellow-950",
    disabled: true,
  },
  design: {
    icon: PenNibIcon,
    activeBg: "bg-teal-600",
    activeText: "text-white",
  },
};
