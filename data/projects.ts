import type { Locale } from "../lib/i18n/translations";

export const PROJECT_TYPES = ["dev", "design", "automation"] as const;

export type projectType = (typeof PROJECT_TYPES)[number];

export type Project = {
  index: number;
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
  featured?: boolean;
};

export const Projetos: Project[] = [
  {
    index: 0,
    icon: "/projects/bello_logo.png",
    slug: "erp-bello-aramados",
    title: { en: "ERP - Bello Aramados", pt: "ERP - Bello Aramados" },
    description: {
      en: "(Demo) Custom Next.js ERP for Bello Aramados: production, orders, purchasing and finance, with granular RBAC and Microsoft Graph integration.",
      pt: "(Demo) ERP personalizado em Next.js para a Bello Aramados: produção, pedidos, compras e financeiro, com RBAC granular e integração via Microsoft Graph.",
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
    featured: true,
  },
  {
    index: 1,
    icon: "/projects/powerapps-logo.svg",
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
    featured: true,
  },
  {
    index: 5,
    icon: "/projects/bello_logo.png",
    slug: "bello-website",
    title: {
      en: "Institucional Website",
      pt: "Website Institucional",
    },
    description: {
      en: "Redesign of Bello Aramados' website: standardized styling, optimized load times, animations and responsiveness. Stack: PHP (CodeIgniter) + JS for specific functions, vanilla CSS",
      pt: "Redesign do site da Bello Aramados: padronização de estilos, otimização de carregamento, animações e responsividade. Stack: PHP (CodeIgniter) + JS pontual, CSS puro",
    },
    tecnologias: ["HTML", "CSS", "PHP", "JavaScript", "MySQL"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    image: "/projects/site-bello.png",
    link: "https://belloaramados.com/",
    type: "dev",
    featured: false,
  },
  {
    index: 2,
    icon: "/projects/powerapps-logo.svg",
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
    featured: true,
  },
  {
    index: 2,
    icon: "",
    slug: "nfs-transporte",
    title: {
      en: "Automation of Invoices and Transportation Declarations",
      pt: "Automação de NFs e Declarações de Transporte",
    },
    description: {
      en: "I redesigned the workflow for receiving invoices and issuing Transportation Declarations (a substitute document, since the CTR does not have state registration) for vehicle test samples received daily. The previous process was manual: physical invoice filed, located manually each time a sample was returned, the call was filled out field by field in Qualitor, the declaration was printed and stapled to the invoice. A cycle of up to 6 hours between searching, bottlenecks, and rework. I implemented a standardized form (Microsoft Forms + SharePoint List) with automatic status notifications via email, a policy for scanning invoices upon arrival with automatic organization by client folder, and automatic capture of the PDF issued by Qualitor with registration in the list and direct sending to the engineer. Reducing the cycle to about 15 minutes.",
      pt: "Redesenhei o fluxo de recebimento de notas fiscais e emissão de Declarações de Transporte (documento substituto, já que o CTR não possui inscrição estadual) para amostras de teste veicular recebidas diariamente. O processo anterior era manual: nota física arquivada, localizada à mão a cada retorno de amostra, chamado preenchido campo a campo no Qualitor, declaração impressa e grampeada à nota. Um ciclo de até 6h entre busca, gargalos e retrabalho. Implementei formulário padronizado (Microsoft Forms + SharePoint List) com notificações automáticas de status por e-mail, política de digitalização das notas na chegada com organização automática por pasta de cliente, e captura automática do PDF emitido pelo Qualitor com registro na lista e envio direto ao engenheiro. Reduzindo o ciclo para cerca de 15 minutos.",
    },
    tecnologias: ["Microsoft Forms", "Power Automate", "SharePoint Lists"],
    tags: ["Microsoft", "Automation"],
    empresa: "Centro Tecnológico Randon",
    image: null,
    type: "automation",
    featured: true,
  },
  {
    index: 3,
    icon: "/projects/sferi-icon.png",
    slug: "sferi",
    title: { en: "Sferi", pt: "Sferi" },
    description: {
      en: "sferi is a Figma-inspired design tool (shapes, frames, typography, gradients, image fills, groups, layers, the works) built from scratch on the HTML canvas, via Konva, as a personal deep-dive into how canvas-based editors actually work under the hood: hit-testing, transforms, clipping, undo history, all of it.",
      pt: "sferi é uma ferramenta de design inspirada no Figma (formas, frames, tipografia, gradientes, preenchimento com imagem, grupos, camadas, tudo isso) construída do zero sobre o HTML canvas, via Konva, como um mergulho pessoal em como editores baseados em canvas realmente funcionam por baixo dos panos: hit-testing, transformações, clipping, histórico de undo, tudo.",
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
    featured: true,

    type: "dev",
    repo: "https://github.com/zenvv/sferi",
    link: "https://sferi.vercel.app/",
  },
  {
    index: 5,
    icon: "/projects/not-my-typo-icon.png",
    slug: "not-my-typo",
    title: { en: "Not My Typo", pt: "Not My Typo" },
    description: {
      en: "Not My Typo is a from-scratch clone of the monkeytype.com typing-test experience: words stream across the screen, you type them, and the app tracks your words-per-minute, accuracy, consistency, and misses.",
      pt: "Not My Typo é um clone feito do zero da experiência de teste de digitação do monkeytype.com: as palavras passam pela tela, você digita, e o app acompanha suas palavras por minuto, precisão, consistência e erros.",
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
    featured: false,
  },
  {
    index: 6,
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
    index: 7,
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
