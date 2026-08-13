export const TECH_TYPES = [
  "languages",
  "frameworks",
  "data",
  "automation",
  "microsoft",
  "tools",
  "design",
  "ai",
  "other",
] as const;

export type techType = (typeof TECH_TYPES)[number];

export const TECH_LEVELS = [
  "learning",
  "beginner",
  "intermediate",
  "advanced",
] as const;

export type techLevel = (typeof TECH_LEVELS)[number];

export type stackTypes = {
  index: number;
  name: string;
  link: string;
  level: techLevel;
  type: techType;
};

export const StackList: stackTypes[] = [
  // languages
  {
    index: 0,
    name: "HTML",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    level: "advanced",
    type: "languages",
  },
  {
    index: 1,
    name: "CSS",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    level: "advanced",
    type: "languages",
  },
  {
    index: 2,
    name: "JavaScript",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    level: "advanced",
    type: "languages",
  },
  {
    index: 3,
    name: "TypeScript",
    link: "https://www.typescriptlang.org/",
    level: "advanced",
    type: "languages",
  },
  {
    index: 4,
    name: "Python",
    link: "https://www.python.org/",
    level: "intermediate",
    type: "languages",
  },
  {
    index: 5,
    name: "PHP",
    link: "https://www.php.net/",
    level: "intermediate",
    type: "languages",
  },

  // frameworks
  {
    index: 6,
    name: "React",
    link: "https://react.dev/",
    level: "advanced",
    type: "frameworks",
  },
  {
    index: 7,
    name: "Next.js",
    link: "https://nextjs.org/",
    level: "advanced",
    type: "frameworks",
  },
  {
    index: 8,
    name: "Svelte",
    link: "https://svelte.dev/",
    level: "intermediate",
    type: "frameworks",
  },
  {
    index: 9,
    name: "Tailwind CSS",
    link: "https://tailwindcss.com/",
    level: "advanced",
    type: "frameworks",
  },

  // data
  {
    index: 10,
    name: "Supabase",
    link: "https://supabase.com/",
    level: "intermediate",
    type: "data",
  },
  {
    index: 11,
    name: "MySQL",
    link: "https://www.mysql.com/",
    level: "intermediate",
    type: "data",
  },
  {
    index: 12,
    name: "PostgreSQL",
    link: "https://www.postgresql.org/",
    level: "intermediate",
    type: "data",
  },
  {
    index: 13,
    name: "Microsoft Fabric",
    link: "https://www.microsoft.com/pt-br/microsoft-fabric",
    level: "advanced",
    type: "data",
  },
  {
    index: 14,
    name: "Microsoft Power BI",
    link: "https://www.microsoft.com/pt-br/power-platform/products/power-bi",
    level: "advanced",
    type: "data",
  },
  {
    index: 15,
    name: "Excel",
    link: "https://www.microsoft.com/pt-br/microsoft-365/excel",
    level: "advanced",
    type: "data",
  },
  {
    index: 16,
    name: "Sharepoint Lists",
    link: "https://www.microsoft.com/pt-br/microsoft-365/microsoft-lists",
    level: "advanced",
    type: "data",
  },

  // automation
  {
    index: 17,
    name: "Microsoft Power Apps",
    link: "https://www.microsoft.com/pt-br/power-platform/products/power-apps",
    level: "advanced",
    type: "automation",
  },
  {
    index: 18,
    name: "Microsoft Power Automate",
    link: "https://www.microsoft.com/pt-br/power-platform/products/power-automate",
    level: "advanced",
    type: "automation",
  },
  {
    index: 19,
    name: "Microsoft Graph API",
    link: "https://learn.microsoft.com/en-us/graph/use-the-api",
    level: "beginner",
    type: "automation",
  },
  {
    index: 20,
    name: "N8N",
    link: "https://n8n.io/",
    level: "learning",
    type: "automation",
  },

  // microsoft
  {
    index: 21,
    name: "Microsoft Entra ID",
    link: "https://www.microsoft.com/pt-br/security/business/identity-access/microsoft-entra-id",
    level: "intermediate",
    type: "microsoft",
  },
  {
    index: 22,
    name: "Microsoft Admin",
    link: "https://www.microsoft.com/pt-br/microsoft-365/business/microsoft-365-administration",
    level: "intermediate",
    type: "microsoft",
  },

  // tools
  {
    index: 23,
    name: "GitHub",
    link: "https://github.com/",
    level: "advanced",
    type: "tools",
  },
  {
    index: 24,
    name: "Docker",
    link: "https://www.docker.com/",
    level: "learning",
    type: "tools",
  },
  {
    index: 25,
    name: "Vercel",
    link: "https://vercel.com/",
    level: "intermediate",
    type: "tools",
  },
  {
    index: 26,
    name: "Zod",
    link: "https://zod.dev/",
    level: "intermediate",
    type: "tools",
  },
  {
    index: 27,
    name: "Zustand",
    link: "https://zustand-demo.pmnd.rs/",
    level: "learning",
    type: "tools",
  },
  {
    index: 28,
    name: "Node.js",
    link: "https://nodejs.org/",
    level: "intermediate",
    type: "tools",
  },
  {
    index: 29,
    name: "NPM",
    link: "https://www.npmjs.com/",
    level: "intermediate",
    type: "tools",
  },
  {
    index: 30,
    name: "PNPM",
    link: "https://pnpm.io/",
    level: "intermediate",
    type: "tools",
  },

  // design
  {
    index: 31,
    name: "Figma",
    link: "https://www.figma.com/",
    level: "advanced",
    type: "design",
  },
  {
    index: 32,
    name: "Adobe Photoshop",
    link: "https://www.adobe.com/products/photoshop.html",
    level: "advanced",
    type: "design",
  },
  {
    index: 33,
    name: "Adobe Illustrator",
    link: "https://www.adobe.com/products/illustrator.html",
    level: "intermediate",
    type: "design",
  },
  {
    index: 34,
    name: "Adobe After Effects",
    link: "https://www.adobe.com/products/aftereffects.html",
    level: "advanced",
    type: "design",
  },

  // ai
  {
    index: 35,
    name: "Claude Code",
    link: "https://claude.com/product/claude-code",
    level: "learning",
    type: "ai",
  },
  {
    index: 36,
    name: "MCP",
    link: "https://modelcontextprotocol.io/",
    level: "learning",
    type: "ai",
  },
  {
    index: 37,
    name: "Agent Skills",
    link: "https://code.claude.com/docs/en/skills",
    level: "learning",
    type: "ai",
  },
  {
    index: 38,
    name: "Claude Agent SDK",
    link: "https://docs.claude.com/en/api/agent-sdk/overview",
    level: "learning",
    type: "ai",
  },

  // other
  {
    index: 39,
    name: "SAP ERP/HANA",
    link: "https://www.sap.com/products/erp/s4hana.html",
    level: "advanced",
    type: "other",
  },
];
