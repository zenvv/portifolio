import type { ComponentType } from "react";
import PowerAppsIcon from "@/lib/icons/PowerAppsIcon";
import MsGraphIcon from "@/lib/icons/MsGraphIcon";

export type IconComponent = ComponentType<{ className?: string }>;

/** Either an Iconify icon id ("devicon:react") or a locally-drawn SVG component. */
export type TechIcon = string | IconComponent;

/**
 * Icon lookup keyed by canonical tech name. Covers every entry in StackList
 * plus a few libraries that only show up in project tech chips (not part of
 * the personal Stack section).
 */
export const TECH_ICONS: Record<string, TechIcon> = {
  // languages
  HTML: "devicon:html5",
  CSS: "devicon:css3",
  JavaScript: "devicon:javascript",
  TypeScript: "devicon:typescript",
  Python: "devicon:python",
  PHP: "devicon:php",

  // frameworks
  React: "devicon:react",
  "Next.js": "devicon:nextjs",
  Svelte: "devicon:svelte",
  "Tailwind CSS": "devicon:tailwindcss",

  // data
  Supabase: "devicon:supabase",
  MySQL: "devicon:mysql",
  PostgreSQL: "devicon:postgresql",
  "Microsoft Fabric": "thesvg-color:microsoft-fabric",
  "Microsoft Power BI": "logos:microsoft-power-bi",
  Excel: "selfhst:microsoft-excel",
  "Sharepoint Lists": "selfhst:microsoft-sharepoint",

  // automation
  "Microsoft Power Apps": PowerAppsIcon,
  "Microsoft Power Automate": "selfhst:microsoft-power-automate",
  "Microsoft Graph API": MsGraphIcon,
  N8N: "selfhst:n8n",

  // microsoft
  "Microsoft Entra ID": "selfhst:microsoft-entra-id",
  "Microsoft Admin": "selfhst:microsoft-365",
  MSAL: "selfhst:microsoft-azure",

  // tools
  GitHub: "simple-icons:github",
  Docker: "devicon:docker",
  Vercel: "simple-icons:vercel",
  Zod: "simple-icons:zod",
  Zustand: "devicon:zustand",
  "Node.js": "devicon:nodejs",
  NPM: "devicon:npm",
  PNPM: "devicon:pnpm",
  Vite: "logos:vite-icon",

  // design
  Figma: "devicon:figma",
  "Adobe Photoshop": "logos:adobe-photoshop",
  "Adobe Illustrator": "logos:adobe-illustrator",
  "Adobe After Effects": "logos:adobe-after-effects",

  // ai
  "Claude Code": "logos:claude-icon",
  MCP: "logos:model-context-protocol-icon",

  // other
  "SAP ERP/HANA": "logos:sap",

  // project-only (not part of the Stack section, only used in project tech chips)
  "shadcn/ui": "simple-icons:shadcnui",
  Konva: "simple-icons:konva",
  GSAP: "simple-icons:gsap",
};

/** Alternate spellings used in project tech chips, mapped to a TECH_ICONS key. */
const TECH_ALIASES: Record<string, string> = {
  SharePoint: "Sharepoint Lists",
  Sharepoint: "Sharepoint Lists",
  TailwindCSS: "Tailwind CSS",
  "Power Apps": "Microsoft Power Apps",
  "Power Automate": "Microsoft Power Automate",
};

export function getTechIcon(name: string): TechIcon | undefined {
  return TECH_ICONS[name] ?? TECH_ICONS[TECH_ALIASES[name]];
}
