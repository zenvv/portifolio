import type { Locale } from "../lib/i18n/translations";

export const PROJECT_TYPES = [
  "web",
  "powerapps",
  "automation",
  "bi",
  "design",
] as const;

export type projectType = (typeof PROJECT_TYPES)[number];

export type Project = {
  index: number;
  slug: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  /** Short, one-line pitch (max ~1 sentence), e.g. "figma-inspired vector designing tool". */
  shortDescription: Record<Locale, string>;
  /** Free-form "Mês/Ano" string, e.g. "Mar/2024". */
  createdAt: string;
  tecnologias: string[];
  tags: string[];
  empresa?: string;
  type?: projectType;
  /** Optional caption shown under the banner image (`projects/<slug>/images/banner.*`). */
  imageCaption?: Record<Locale, string>;
  link?: string | null;
  color?: string | null;
  repo?: string | null;
  featured?: boolean;
};

export const Projetos: Project[] = [
  {
    index: 0,
    slug: "erp-bello-aramados",
    title: { en: "ERP - Bello Aramados", pt: "ERP - Bello Aramados" },
    description: {
      en: "(Demo) Custom Next.js ERP for Bello Aramados: production, orders, purchasing and finance, with granular RBAC and Microsoft Graph integration.",
      pt: "(Demo) ERP personalizado em Next.js para a Bello Aramados: produção, pedidos, compras e financeiro, com RBAC granular e integração via Microsoft Graph.",
    },
    shortDescription: {
      en: "Custom ERP for production, sales, finance and tax area",
      pt: "ERP personalizado para produção, comercial, financeiro e fiscal",
    },
    createdAt: "Jun/2026",
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
    link: "https://bello-sge-demo.vercel.app",
    type: "web",
    repo: "https://www.github.com/zenvv/bello-sge-demo",
    featured: true,
  },
  {
    index: 1,
    slug: "operational-app",
    title: { en: "Operational App", pt: "Aplicativo Operacional" },
    description: {
      en: "Operational app for Bello Aramados, designed to register the operators' work and provide real-time updates on production status. The app enhances communication between the production team and management, ensuring efficient workflow and timely delivery of products.",
      pt: "Aplicativo operacional para a Bello Aramados, desenvolvido para registrar o trabalho dos operadores e fornecer atualizações em tempo real sobre o status da produção. O app melhora a comunicação entre a equipe de produção e a gestão, garantindo um fluxo de trabalho eficiente e a entrega pontual dos produtos.",
    },
    shortDescription: {
      en: "Real-time industrial production tracking app for operators",
      pt: "Apontamentos e acompanhamento de produção industrial em tempo real para operadores",
    },
    createdAt: "Mar/2026",
    tecnologias: ["Power Apps", "Power Automate", "SharePoint"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    link: null,
    type: "powerapps",
    featured: true,
  },
  {
    index: 5,
    slug: "bello-website",
    title: {
      en: "Institucional Website",
      pt: "Website Institucional",
    },
    description: {
      en: "Redesign of Bello Aramados' website: standardized styling, optimized load times, animations and responsiveness. Stack: PHP (CodeIgniter) + JS for specific functions, vanilla CSS",
      pt: "Redesign do site da Bello Aramados: padronização de estilos, otimização de carregamento, animações e responsividade. Stack: PHP (CodeIgniter) + JS pontual, CSS puro",
    },
    shortDescription: {
      en: "Institutional website redesign",
      pt: "Redesign do site institucional",
    },
    createdAt: "Feb/2026",
    tecnologias: ["HTML", "CSS", "PHP", "JavaScript", "MySQL"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    link: "https://belloaramados.com/",
    type: "web",
    featured: false,
  },
  {
    index: 2,
    slug: "risk-analysis-app",
    title: { en: "HSE App", pt: "App SSMA" },
    description: {
      en: "Risk analysis app for Bello Aramados, designed to identify and assess potential risks in the production process. The app helps management make informed decisions and implement effective risk mitigation strategies.",
      pt: "App de análise de risco para a Bello Aramados, desenvolvido para identificar e avaliar os riscos potenciais no processo de produção. O app ajuda a gestão a tomar decisões informadas e implementar estratégias eficazes de mitigação de riscos.",
    },
    shortDescription: {
      en: "-todo-",
      pt: "Analises de Riscos de Teste, Serviços de Ferramentaria, Licenças Ambientais, Gestão de Pessoas e Indicadores.",
    },
    createdAt: "Mar/2025",
    tecnologias: ["Power Apps", "Power Automate", "SharePoint"],
    tags: ["Web", "Software"],
    empresa: "Centro Tecnológico Randon",
    type: "powerapps",
    featured: true,
  },
  {
    index: 2,
    slug: "nfs-transporte",
    title: {
      en: "Automation of Invoices and Transportation Declarations",
      pt: "Automação de NFs e Declarações de Transporte",
    },
    description: {
      en: "I redesigned the workflow for receiving invoices and issuing Transportation Declarations (a substitute document, since the CTR does not have state registration) for vehicle test samples received daily. The previous process was manual: physical invoice filed, located manually each time a sample was returned, the call was filled out field by field in Qualitor, the declaration was printed and stapled to the invoice.</br>A cycle of up to **6 hours** between searching, bottlenecks, and rework. I implemented a standardized form (Microsoft Forms + SharePoint List) with automatic status notifications via email, a policy for scanning invoices upon arrival with automatic organization by client folder, and automatic capture of the PDF issued by Qualitor with registration in the list and direct sending to the engineer. Reducing the cycle to about 15 minutes.",
      pt: "Redesenhei o fluxo de recebimento de notas fiscais e emissão de Declarações de Transporte (documento substituto, já que o CTR não possui inscrição estadual) para amostras de teste veicular recebidas diariamente. O processo anterior era manual: nota física arquivada, localizada à mão a cada retorno de amostra, chamado preenchido campo a campo no Qualitor, declaração impressa e grampeada à nota. </br> Um ciclo de **até 6h** entre busca, gargalos e retrabalho. Implementei formulário padronizado (Microsoft Forms + SharePoint List) com notificações automáticas de status por e-mail, política de digitalização das notas na chegada com organização automática por pasta de cliente, e captura automática do PDF emitido pelo Qualitor com registro na lista e envio direto ao engenheiro. Reduzindo o ciclo para cerca de 15 minutos.",
    },
    shortDescription: {
      en: "Cut a 6h manual invoice/declaration cycle down to ~15-30min",
      pt: "Reduziu um ciclo manual de notas/declarações de 6h para ~15-30min",
    },
    createdAt: "Apr/2022",
    tecnologias: ["Microsoft Forms", "Power Automate", "SharePoint Lists"],
    tags: ["Microsoft", "Automation"],
    empresa: "Centro Tecnológico Randon",
    type: "automation",
    featured: true,
  },
  {
    index: 2,
    slug: "rpa-sap-pyautogui",
    title: {
      en: "RPA with PyAutoGUI for SAP Report Extraction",
      pt: "RPA com PyAutoGUI para Extração de Relatórios SAP",
    },
    description: {
      en: "",
      pt: "",
    },
    shortDescription: {
      en: "RPA that pulls SAP reports and refreshes a Power BI dashboard",
      pt: "RPA que extrai relatórios do SAP e atualiza um dashboard Power BI",
    },
    createdAt: "May/2024",
    tecnologias: ["Python", "SAP ERP/HANA", "Excel", "Power BI"],
    tags: ["Microsoft", "Automation"],
    empresa: "Centro Tecnológico Randon",
    imageCaption: {
      en: "* Illustrative simulation of an RPA workflow (**Python** + **PyAutoGUI**) I built to pull reports from an ERP system, consolidate the data, and refresh a **Power BI dashboard**. Fully autonomous, ~10 min end-to-end. The original recording can't be shared due to a _data confidentiality agreement_, so I recreated the process in an abstract form.",
      pt: "* Simulação ilustrativa do fluxo de uma automação RPA (**Python + PyAutoGUI**) que desenvolvi para extrair relatórios de um ERP, consolidar os dados e atualizar um **dashboard no Power BI**. 100% autônoma, ~10 min de execução. O vídeo original não pode ser divulgado por _cláusula de confidencialidade de dados_, então recriei o processo de forma abstrata.",
    },
    type: "automation",
    featured: true,
  },
  {
    index: 3,
    slug: "sferi",
    title: { en: "Sferi", pt: "Sferi" },
    description: {
      en: "sferi is a Figma-inspired design tool (shapes, frames, typography, gradients, image fills, groups, layers, the works) built from scratch on the HTML canvas, via Konva, as a personal deep-dive into how canvas-based editors actually work under the hood: hit-testing, transforms, clipping, undo history, all of it.",
      pt: "sferi é uma ferramenta de design inspirada no Figma (formas, frames, tipografia, gradientes, preenchimento com imagem, grupos, camadas, tudo isso) construída do zero sobre o HTML canvas, via Konva, como um mergulho pessoal em como editores baseados em canvas realmente funcionam por baixo dos panos: hit-testing, transformações, clipping, histórico de undo, tudo.",
    },
    shortDescription: {
      en: "Figma-inspired vector designing tool",
      pt: "Ferramenta de design vetorial inspirada no Figma",
    },
    createdAt: "Agu/2026",
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
    featured: true,
    type: "web",
    repo: "https://github.com/zenvv/sferi",
    link: "https://sferi.vercel.app/",
  },
  {
    index: 5,
    slug: "not-my-typo",
    title: { en: "Not My Typo", pt: "Not My Typo" },
    description: {
      en: "Not My Typo is a from-scratch clone of the monkeytype.com typing-test experience: words stream across the screen, you type them, and the app tracks your words-per-minute, accuracy, consistency, and misses.",
      pt: "Not My Typo é um clone feito do zero da experiência de teste de digitação do monkeytype.com: as palavras passam pela tela, você digita, e o app acompanha suas palavras por minuto, precisão, consistência e erros.",
    },
    shortDescription: {
      en: "MonkeyType inspired mini-game",
      pt: "Mini-game inspirado no MonkeyType",
    },
    createdAt: "Jul/2026",
    tecnologias: [
      "Vite",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Zustand",
      "shadcn/ui",
    ],
    tags: ["Web", "Software"],
    type: "web",
    repo: "https://github.com/zenvv/not-my-typo",
    link: "https://not-my-typo.vercel.app/",
    featured: false,
  },
  {
    index: 1,
    slug: "bello-compras",
    title: { en: "Purchasing App", pt: "App de Compras" },
    description: {
      en: "Internal app for Bello Aramados' Purchasing sector: supplier registration, purchase order creation and tracking, and payment method control through confirmation with the finance sector.",
      pt: "App interno da Bello Aramados para o setor de Compras: cadastro de fornecedores, criação e acompanhamento de pedidos de compra, e controle das formas de pagamento até a confirmação com o setor financeiro.",
    },
    shortDescription: {
      en: "purchase order and supplier management app",
      pt: "app de gestão de pedidos de compra e fornecedores",
    },
    createdAt: "Mai/2026",
    tecnologias: ["Power Apps", "Power Automate", "SharePoint"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    type: "powerapps",
    featured: true,
  },
  {
    index: 4,
    slug: "bello-financeiro",
    title: { en: "Finance App", pt: "App Financeiro" },
    description: {
      en: "(Demo) Internal app for Bello Aramados' Finance sector: centralizes everything the company has to pay — from the Purchasing queue, a manual entry or a forecast spreadsheet — and tracks bank balances alongside the entries.",
      pt: "(Demo) App interno da Bello Aramados para o setor Financeiro: centraliza tudo que a empresa tem a pagar — vindo da fila de Compras, de um lançamento manual ou de uma planilha de previsão — e acompanha o saldo dos bancos junto com os lançamentos.",
    },
    shortDescription: {
      en: "Accounts-payable and bank-balance control app",
      pt: "App de contas a pagar e controle de saldo dos bancos",
    },
    createdAt: "Jun/2026",
    tecnologias: ["Power Apps", "Power Automate", "SharePoint"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    type: "powerapps",
    featured: true,
  },
  {
    index: 6,
    slug: "bello-pregos-fixadores",
    title: { en: "Bello Prego & Fixadores", pt: "Bello Prego & Fixadores" },
    description: {
      en: "Logomark",
      pt: "Logomarca",
    },
    shortDescription: {
      en: "logomark design",
      pt: "design de logomarca",
    },
    createdAt: "May/2026",
    tecnologias: ["Figma"],
    tags: ["Design", "Figma"],
    empresa: "Bello Aramados",
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
    shortDescription: {
      en: "logomark design",
      pt: "design de logomarca",
    },
    createdAt: "Apr/2025",
    tecnologias: ["Figma"],
    tags: ["Design", "Figma"],
    type: "design",
    color: "#FF5400",
  },
];
