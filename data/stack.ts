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

export type stackTypes = {
  index: number;
  name: string;
  link: string;
  learning?: boolean;
  featured?: boolean;
  type: techType;
};

export const StackList: stackTypes[] = [
  // languages
  {
    index: 0,
    name: "HTML",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    type: "languages",
  },
  {
    index: 1,
    name: "CSS",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    type: "languages",
  },
  {
    index: 2,
    name: "JavaScript",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    type: "languages",
  },
  {
    index: 3,
    name: "TypeScript",
    link: "https://www.typescriptlang.org/",
    type: "languages",
    featured: true,
  },
  {
    index: 4,
    name: "Python",
    link: "https://www.python.org/",
    type: "languages",
    featured: true,
  },
  { index: 5, name: "PHP", link: "https://www.php.net/", type: "languages" },

  // frameworks
  {
    index: 6,
    name: "React",
    link: "https://react.dev/",
    type: "frameworks",
    featured: true,
  },
  {
    index: 7,
    name: "Next.js",
    link: "https://nextjs.org/",
    type: "frameworks",
    featured: true,
  },
  { index: 8, name: "Svelte", link: "https://svelte.dev/", type: "frameworks" },
  {
    index: 9,
    name: "Tailwind CSS",
    link: "https://tailwindcss.com/",
    type: "frameworks",
  },

  // data
  { index: 10, name: "Supabase", link: "https://supabase.com/", type: "data" },
  { index: 11, name: "MySQL", link: "https://www.mysql.com/", type: "data" },
  {
    index: 12,
    name: "PostgreSQL",
    link: "https://www.postgresql.org/",
    type: "data",
    featured: true,
  },
  {
    index: 13,
    name: "Microsoft Fabric",
    link: "https://www.microsoft.com/pt-br/microsoft-fabric",
    type: "data",
  },
  {
    index: 14,
    name: "Microsoft Power BI",
    link: "https://www.microsoft.com/pt-br/power-platform/products/power-bi",
    type: "data",
    featured: true,
  },
  {
    index: 15,
    name: "Excel",
    link: "https://www.microsoft.com/pt-br/microsoft-365/excel",
    type: "data",
  },
  {
    index: 16,
    name: "Sharepoint Lists",
    link: "https://www.microsoft.com/pt-br/microsoft-365/microsoft-lists",
    type: "data",
  },

  // automation
  {
    index: 17,
    name: "Microsoft Power Apps",
    link: "https://www.microsoft.com/pt-br/power-platform/products/power-apps",
    type: "automation",
    featured: true,
  },
  {
    index: 18,
    name: "Microsoft Power Automate",
    link: "https://www.microsoft.com/pt-br/power-platform/products/power-automate",
    type: "automation",
    featured: true,
  },
  {
    index: 19,
    name: "Microsoft Graph API",
    link: "https://learn.microsoft.com/en-us/graph/use-the-api",
    type: "automation",
  },
  {
    index: 20,
    name: "N8N",
    link: "https://n8n.io/",
    type: "automation",
    learning: true,
  },

  // tools
  { index: 23, name: "GitHub", link: "https://github.com/", type: "tools" },
  { index: 26, name: "Vite", link: "https://vite.dev/", type: "tools" },
  {
    index: 24,
    name: "Docker",
    link: "https://www.docker.com/",
    type: "tools",
    learning: true,
  },
  { index: 25, name: "Vercel", link: "https://vercel.com/", type: "tools" },
  { index: 26, name: "Zod", link: "https://zod.dev/", type: "tools" },
  {
    index: 27,
    name: "Zustand",
    link: "https://zustand-demo.pmnd.rs/",
    type: "tools",
    learning: true,
  },

  // design
  { index: 31, name: "Figma", link: "https://www.figma.com/", type: "design" },

  // ai
  {
    index: 35,
    name: "Claude Code",
    link: "https://claude.com/product/claude-code",
    type: "ai",
    learning: true,
  },
  {
    index: 36,
    name: "MCP",
    link: "https://modelcontextprotocol.io/",
    type: "ai",
    learning: true,
  },
  {
    index: 37,
    name: "Agent Skills",
    link: "https://code.claude.com/docs/en/skills",
    type: "ai",
    learning: true,
  },
  {
    index: 38,
    name: "Claude Agent SDK",
    link: "https://docs.claude.com/en/api/agent-sdk/overview",
    type: "ai",
    learning: true,
  },

  // other
  {
    index: 39,
    name: "SAP ERP/HANA",
    link: "https://www.sap.com/products/erp/s4hana.html",
    type: "other",
  },
];
