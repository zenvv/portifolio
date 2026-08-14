import NextjsIcon from "@iconify-react/devicon/nextjs"
import TailwindcssIcon from "@iconify-react/devicon/tailwindcss"
import TypescriptIcon from "@iconify-react/devicon/typescript"
import MicrosoftAzureIcon from "@iconify-react/logos/microsoft-azure"
import MicrosoftPowerAutomateIcon from "@iconify-react/selfhst/microsoft-power-automate"
import MicrosoftSharepointIcon from "@iconify-react/selfhst/microsoft-sharepoint"
import PhpIcon from "@iconify-react/devicon/php"
import JavascriptIcon from "@iconify-react/devicon/javascript"
import PowerAppsIcon from "@/lib/custom/PowerAppsIcon"
import PowerAppsSolidIcon from "@/lib/custom/PowerAppsSolidIcon"
import PowerAutomateSolidIcon from "@/lib/custom/PowerAutomateSolidIcon"
import MsGraphIcon from "@/lib/custom/MsGraphIcon"
import MsGraphSolidIcon from "@/lib/custom/MsGraphSolidIcon"
import Html5Icon from "@iconify-react/devicon/html5"
import Css3Icon from "@iconify-react/devicon/css3"
import ReactColoredIcon from "@iconify-react/devicon/react"
import NodejsColoredIcon from "@iconify-react/devicon/nodejs"
import GitColoredIcon from "@iconify-react/devicon/git"
import FigmaColoredIcon from "@iconify-react/devicon/figma"
import GithubColoredIcon from "@iconify-react/devicon/github"

import NextjsSolidIcon from "@iconify-react/griddy-icons/nextjs"
import TailwindSolidIcon from "@iconify-react/griddy-icons/tailwind"
import TypescriptSolidIcon from "@iconify-react/griddy-icons/typescript"
import PhpSolidIcon from "@iconify-react/griddy-icons/php"
import JavascriptSolidIcon from "@iconify-react/griddy-icons/javascript"
import Html5SolidIcon from "@iconify-react/griddy-icons/html-5"
import Css3SolidIcon from "@iconify-react/griddy-icons/css-3"
import ReactSolidIcon from "@iconify-react/griddy-icons/react"
import NodejsSolidIcon from "@iconify-react/griddy-icons/nodejs"
import GitSolidIcon from "@iconify-react/griddy-icons/git"
import FigmaSolidIcon from "@iconify-react/griddy-icons/figma"
import GithubSolidIcon from "@iconify-react/griddy-icons/github"
import SqlIcon from "@iconify-react/griddy-icons/sql"
import MysqlIcon from "@iconify-react/devicon/mysql"
import MysqlIcon2 from "@iconify-react/fontisto/mysql"
import MicrosoftSharepointIcon2 from "@iconify-react/mdi/microsoft-sharepoint"
import DockerIcon from "@iconify-react/selfhst/docker"
import DockerIcon2 from "@iconify-react/griddy-icons/docker"
import AzureIcon from "@iconify-react/codicon/azure"
import SupabaseIcon from "@iconify-react/devicon/supabase"
import SupabaseIcon2 from "@iconify-react/devicon-plain/supabase"
import N8nIcon2 from "@iconify-react/simple-icons/n8n"
import N8nIcon from "@iconify-react/selfhst/n8n"

import type { ComponentType, SVGProps } from "react"

export type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { width?: string; height?: string }
>

export const CATEGORIES = [
  "front-end",
  "frameworks",
  "automação",
  "backend",
  "tools",
  "microsoft",
  "design",
] as const

export type TechCategory = (typeof CATEGORIES)[number]

export type TechIconEntry = {
  label: string
  category: TechCategory
  /** primary-colored, monochrome icon shown by default */
  solid: IconComponent
  /** brand-colored icon revealed on hover */
  colored: IconComponent
}

export const ItemsIndex: Record<string, TechIconEntry> = {
  // front-end
  HTML: { label: "HTML", category: "front-end", solid: Html5SolidIcon, colored: Html5Icon },
  CSS: { label: "CSS", category: "front-end", solid: Css3SolidIcon, colored: Css3Icon },
  JAVASCRIPT: {
    label: "JavaScript",
    category: "front-end",
    solid: JavascriptSolidIcon,
    colored: JavascriptIcon,
  },
  TYPESCRIPT: {
    label: "TypeScript",
    category: "front-end",
    solid: TypescriptSolidIcon,
    colored: TypescriptIcon,
  },
  REACT: { label: "React", category: "front-end", solid: ReactSolidIcon, colored: ReactColoredIcon },
  TAILWINDCSS: {
    label: "TailwindCSS",
    category: "front-end",
    solid: TailwindSolidIcon,
    colored: TailwindcssIcon,
  },

  // frameworks
  "NEXT.JS": { label: "Next.js", category: "frameworks", solid: NextjsSolidIcon, colored: NextjsIcon },

  // automação
  "POWER AUTOMATE": {
    label: "Power Automate",
    category: "automação",
    solid: PowerAutomateSolidIcon,
    colored: MicrosoftPowerAutomateIcon,
  },
  N8N: {
    label: "N8N",
    category: "automação",
    solid: N8nIcon2,
    colored: N8nIcon,
  },

  // backend
  PHP: { label: "PHP", category: "backend", solid: PhpSolidIcon, colored: PhpIcon },
  "NODE.JS": {
    label: "Node.js",
    category: "backend",
    solid: NodejsSolidIcon,
    colored: NodejsColoredIcon,
  },
  MYSQL: {
    label: "MySQL",
    category: "backend",
    solid: MysqlIcon2,
    colored: MysqlIcon,
  },
  SQL: {
    label: "SQL",
    category: "backend",
    solid: SqlIcon,
    colored: SqlIcon,
  },
  SUPABASE: {
    label: "Supabase",
    category: "backend",
    solid: SupabaseIcon2,
    colored: SupabaseIcon,
  },

  // tools
  GIT: { label: "Git", category: "tools", solid: GitSolidIcon, colored: GitColoredIcon },
  GITHUB: {
    label: "GitHub",
    category: "tools",
    solid: GithubSolidIcon,
    colored: GithubColoredIcon,
  },
  DOCKER: {
    label: "Docker",
    category: "tools",
    solid: DockerIcon2,
    colored: DockerIcon,
  },

  // microsoft
  "MICROSOFT GRAPH API": {
    label: "Microsoft Graph API",
    category: "microsoft",
    solid: MsGraphSolidIcon,
    colored: MsGraphIcon,
  },
  MSAL: { label: "MSAL", category: "microsoft", solid: AzureIcon, colored: MicrosoftAzureIcon },
  "POWER APPS": {
    label: "Power Apps",
    category: "microsoft",
    solid: PowerAppsSolidIcon,
    colored: PowerAppsIcon,
  },
  SHAREPOINT: {
    label: "SharePoint",
    category: "microsoft",
    solid: MicrosoftSharepointIcon2,
    colored: MicrosoftSharepointIcon,
  },

  // design
  FIGMA: { label: "Figma", category: "design", solid: FigmaSolidIcon, colored: FigmaColoredIcon },
}

function normalizeTechName(tecnologia: string) {
  return tecnologia.trim().toUpperCase()
}

export function getTechIcon(tecnologia: string): TechIconEntry | undefined {
  return ItemsIndex[normalizeTechName(tecnologia)]
}
