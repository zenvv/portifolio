import type { ComponentType } from "react";
import PowerAppsIcon from "@/lib/icons/PowerAppsIcon";
import MsGraphIcon from "@/lib/icons/MsGraphIcon";
import MsGraphIconSolid from "@/lib/icons/MsGraphIconSolid";
import MicrosoftFabricIcon from "@/lib/icons/MicrosoftFabricIcon";
import ZustandIcon from "@/lib/icons/ZustandIcon";

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
  Vite: "thesvg-color:vite",

  // design
  Figma: "devicon:figma",
  "Adobe Photoshop": "logos:adobe-photoshop",
  "Adobe Illustrator": "logos:adobe-illustrator",
  "Adobe After Effects": "logos:adobe-after-effects",

  // ai
  "Claude Code": "logos:claude-icon",
  MCP: "logos:model-context-protocol-icon",
  "Agent Skills": "logos:claude-icon",
  "Claude Agent SDK": "logos:claude-icon",

  // other
  "SAP ERP/HANA": "logos:sap",

  // project-only (not part of the Stack section, only used in project tech chips)
  "shadcn/ui": "simple-icons:shadcnui",
  Konva: "simple-icons:konva",
  GSAP: "simple-icons:gsap",
};

/**
 * Solid single-color counterpart to TECH_ICONS, used for the Stack section's
 * secondary (non-featured) list. Only technologies with a genuine flat/mono
 * brand mark are listed here; getSolidTechIcon() falls back to TECH_ICONS
 * for anything not covered (e.g. GitHub, Vercel, Zod, whose brand marks are
 * already single-color, so there's nothing to swap on hover).
 */
export const SOLID_TECH_ICONS: Record<string, TechIcon> = {
  // languages
  HTML: "simple-icons:html5",
  CSS: "simple-icons:css3",
  JavaScript: "simple-icons:javascript",
  TypeScript: "simple-icons:typescript",
  Python: "simple-icons:python",
  PHP: "simple-icons:php",

  // frameworks
  React: "simple-icons:react",
  "Next.js": "simple-icons:nextdotjs",
  Svelte: "simple-icons:svelte",
  "Tailwind CSS": "simple-icons:tailwindcss",

  // data
  Supabase: "simple-icons:supabase",
  MySQL: "lineicons:mysql",
  PostgreSQL: "simple-icons:postgresql",
  "Microsoft Fabric": MicrosoftFabricIcon,
  "Microsoft Power BI": "simple-icons:powerbi",
  Excel: "simple-icons:microsoftexcel",
  "Sharepoint Lists": "simple-icons:microsoftsharepoint",

  // automation
  "Microsoft Power Apps": "simple-icons:powerapps",
  "Microsoft Power Automate": "simple-icons:powerautomate",
  "Microsoft Graph API": MsGraphIconSolid,
  N8N: "simple-icons:n8n",

  // tools
  Docker: "simple-icons:docker",
  Zustand: "devicon-plain:zustand",
  Vite: "simple-icons:vite",

  // design
  Figma: "simple-icons:figma",

  // ai
  "Claude Code": "simple-icons:claude",
  MCP: "simple-icons:modelcontextprotocol",
  "Agent Skills": "simple-icons:anthropic",
  "Claude Agent SDK": "simple-icons:anthropic",

  // other
  "SAP ERP/HANA": "simple-icons:sap",
};

/** Alternate spellings used in project tech chips, mapped to a TECH_ICONS key. */
const TECH_ALIASES: Record<string, string> = {
  SharePoint: "Sharepoint Lists",
  Sharepoint: "Sharepoint Lists",
  "SharePoint Lists": "Sharepoint Lists",
  TailwindCSS: "Tailwind CSS",
  "Power Apps": "Microsoft Power Apps",
  "Power Automate": "Microsoft Power Automate",
  "Power BI": "Microsoft Power BI",
  SAP: "SAP ERP/HANA",
  "SAP ERP": "SAP ERP/HANA",
  "SAP S4/HANA": "SAP ERP/HANA",
  Claude: "Claude Code",
  "MS Graph": "Microsoft Graph API",
  "MS Graph API": "Microsoft Graph API",
  NextJS: "Next.js",
  Next: "Next.js",
};

export function getTechIcon(name: string): TechIcon | undefined {
  return TECH_ICONS[name] ?? TECH_ICONS[TECH_ALIASES[name]];
}

/** Solid/mono variant for a tech name; falls back to the colored icon when no dedicated flat mark exists. */
export function getSolidTechIcon(name: string): TechIcon | undefined {
  return (
    SOLID_TECH_ICONS[name] ??
    SOLID_TECH_ICONS[TECH_ALIASES[name]] ??
    getTechIcon(name)
  );
}
