import {
  ChartBarIcon,
  GlobeIcon,
  GraphIcon,
  PenNibIcon,
  PuzzlePieceIcon,
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
  {
    icon?: IconComponent;
    activeBg: string;
    activeText: string;
    disabled?: boolean;
  }
> = {
  all: {
    icon: PuzzlePieceIcon,
    activeBg: "bg-foreground",
    activeText: "text-background",
  },
  web: { icon: GlobeIcon, activeBg: "bg-[#b4637a]", activeText: "text-white" },
  powerapps: {
    icon: PowerAppsIconSolid,
    activeBg: "bg-[#907aa9]",
    activeText: "text-white",
  },
  automation: {
    icon: GraphIcon,
    activeBg: "bg-[#286983]",
    activeText: "text-white",
  },
  bi: {
    icon: ChartBarIcon,
    activeBg: "bg-[#ea9d34]",
    activeText: "text-yellow-950",
    disabled: false,
  },
  design: {
    icon: PenNibIcon,
    activeBg: "bg-[#56949f]",
    activeText: "text-white",
  },
};
