import type { Locale } from "./i18n/translations";

export const PROJECT_TYPES = ["dev", "design"] as const;

export type projectType = (typeof PROJECT_TYPES)[number];

export type Project = {
  slug: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  tecnologias: string[];
  tags: string[];
  empresa?: string;
  type?: projectType;
  image: string | null;
  link?: string | null;
  color?: string | null;
  repo?: string | null;
  icon?: string | null;
};

export const Projetos: Project[] = [
  {
    icon: "/projects/bello_logo.png",
    slug: "erp-bello-aramados",
    title: { en: "ERP - Bello Aramados", pt: "ERP - Bello Aramados" },
    description: {
      en: "(Demo) Custom made ERP system for Bello Aramados, a company specializing in metal furniture and accessories. The system streamlines inventory management, order processing, and customer relationship management.",
      pt: "(Demo) Sistema de ERP personalizado para a Bello Aramados, empresa especializada em móveis e acessórios de metal. O sistema simplifica a gestão de estoque, o processamento de pedidos e o relacionamento com clientes.",
    },
    tecnologias: [
      "Next.js",
      "MSAL",
      "Microsoft Graph API",
      "Sharepoint",
      "TypeScript",
      "TailwindCSS",
    ],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    image: "/projects/bello-sge-demo.png",
    link: "https://bello-sge-demo.vercel.app",
    type: "dev",
    repo: "https://www.github.com/zenvv/bello-sge-demo",
  },
  {
    icon: "/projects/bello_logo.png",
    slug: "operational-app",
    title: { en: "Operational App", pt: "Aplicativo Operacional" },
    description: {
      en: "Operational app for Bello Aramados, designed to register the operators' work and provide real-time updates on production status. The app enhances communication between the production team and management, ensuring efficient workflow and timely delivery of products.",
      pt: "Aplicativo operacional para a Bello Aramados, desenvolvido para registrar o trabalho dos operadores e fornecer atualizações em tempo real sobre o status da produção. O app melhora a comunicação entre a equipe de produção e a gestão, garantindo um fluxo de trabalho eficiente e a entrega pontual dos produtos.",
    },
    tecnologias: ["Power Apps", "Power Automate", "SharePoint"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    image: null,
    link: null,
    type: "dev",
  },
  {
    icon: "/projects/bello_logo.png",
    slug: "bello-website",
    title: {
      en: "Redesigned Institucional Website",
      pt: "Redesign do Website Institucional",
    },
    description: {
      en: "...",
      pt: "...",
    },
    tecnologias: ["HTML", "CSS", "PHP", "JavaScript", "MySQL"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    image: "/projects/site-bello.png",
    link: "https://belloaramados.com/",
    type: "dev",
  },
  {
    slug: "risk-analysis-app",
    title: { en: "Risk Analysis App", pt: "App de Análise de Risco" },
    description: {
      en: "Risk analysis app for Bello Aramados, designed to identify and assess potential risks in the production process. The app helps management make informed decisions and implement effective risk mitigation strategies.",
      pt: "App de análise de risco para a Bello Aramados, desenvolvido para identificar e avaliar os riscos potenciais no processo de produção. O app ajuda a gestão a tomar decisões informadas e implementar estratégias eficazes de mitigação de riscos.",
    },
    tecnologias: ["Power Apps", "Power Automate", "SharePoint"],
    tags: ["Web", "Software"],
    empresa: "Centro Tecnológico Randon",
    image: null,

    type: "dev",
  },
  {
    icon: "/projects/sferi-icon.png",
    slug: "sferi",
    title: { en: "Sferi", pt: "Sferi" },
    description: {
      en: "sferi is a Figma-inspired design tool (shapes, frames, typography, gradients, image fills, groups, layers, the works) built from scratch on the HTML canvas, via Konva, as a personal deep-dive into how canvas-based editors actually work under the hood: hit-testing, transforms, clipping, undo history, all of it.",
      pt: "sferi is a Figma-inspired design tool (shapes, frames, typography, gradients, image fills, groups, layers, the works) built from scratch on the HTML canvas, via Konva, as a personal deep-dive into how canvas-based editors actually work under the hood: hit-testing, transforms, clipping, undo history, all of it.",
    },
    tecnologias: [
      "Vite",
      "React",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "Zustand",
      "Konva",
      "GSAP",
      "jsPDF",
    ],
    tags: ["Web", "Software"],
    image: "/projects/sferi-image.png",

    type: "dev",
    repo: "https://github.com/zenvv/sferi",
    link: "https://sferi.vercel.app/",
  },
  {
    icon: "/projects/not-my-typo-icon.png",
    slug: "not-my-typo",
    title: { en: "Not My Typo", pt: "Not My Typo" },
    description: {
      en: "Not My Typo is a from-scratch clone of the monkeytype.com typing-test experience: words stream across the screen, you type them, and the app tracks your words-per-minute, accuracy, consistency, and misses.",
      pt: "Not My Typo is a from-scratch clone of the monkeytype.com typing-test experience: words stream across the screen, you type them, and the app tracks your words-per-minute, accuracy, consistency, and misses.",
    },
    tecnologias: [
      "Vite",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Zustand",
      "shadcn/ui",
    ],
    tags: ["Web", "Software"],
    image: "/projects/not-my-typo.png",

    type: "dev",
    repo: "https://github.com/zenvv/not-my-typo",
    link: "https://not-my-typo.vercel.app/",
  },
  {
    slug: "bello-pregos-fixadores",
    title: { en: "Bello Prego & Fixadores", pt: "Bello Prego & Fixadores" },
    description: {
      en: "Logomark",
      pt: "Logomarca",
    },
    tecnologias: ["Figma"],
    tags: ["Design", "Figma"],
    empresa: "Bello Pregos & Fixadores",
    image: "/projects/bfx-logo.png",
    type: "design",
    color: "#ED2C26",
  },
  {
    slug: "mini-factory",
    title: { en: "Mini Factory", pt: "Mini Factory" },
    description: {
      en: "Logomark",
      pt: "Logomarca",
    },
    tecnologias: ["Figma"],
    tags: ["Design", "Figma"],
    image: "/projects/mf-logo.png",
    type: "design",
    color: "#FF5400",
  },
];
