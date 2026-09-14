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
  /** ISO "YYYY-MM" string, e.g. "2024-03". Format for display with `formatProjectDate`. */
  createdAt: string;
  tecnologias: string[];
  tags: string[];
  empresa?: string;
  type?: projectType;
  /** Extra type(s) a project also belongs to, beyond its primary `type`, for
   * projects that genuinely span disciplines (e.g. a Power Apps project that
   * also feeds a Power BI dashboard). The type filter matches on `type` OR
   * membership here. */
  additionalTypes?: projectType[];
  /** Optional caption shown under the banner image (`projects/<slug>/images/banner.*`). */
  imageCaption?: Record<Locale, string>;
  link?: string | null;
  color?: string | null;
  repo?: string | null;
};

/**
 * Slugs of the projects shown, in this exact order, in the home "Featured
 * Projects" grid and the projects-page featured banner. This ordered list is
 * the single place to curate them; a project's "featured" status is derived
 * purely from membership here (see {@link FeaturedProjetos}).
 */
export const FEATURED_SLUGS = [
  "erp-bello-aramados",
  "nailly",
  "operational-app",
] as const;

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
      en: "ERP with 6 areas, 7 SharePoint sites and ~18 config-generated screens",
      pt: "ERP com 6 áreas, 7 sites SharePoint e ~18 telas geradas por configuração",
    },
    createdAt: "2026-06",
    tecnologias: [
      "Next.js",
      "MSAL",
      "Microsoft Graph API",
      "SharePoint Lists",
      "TypeScript",
      "Tailwind CSS",
    ],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    link: "https://bello-sge-demo.vercel.app",
    type: "web",
    repo: "https://www.github.com/zenvv/bello-sge-demo",
  },
  {
    index: 1,
    slug: "bello-ecosystems",
    title: {
      en: "Bello App Ecosystem",
      pt: "Ecossistema de Apps Bello",
    },
    description: {
      en: "A set of six Power Apps for Bello Aramados that together work as a mini-ERP over SharePoint lists (no Dataverse). This post covers the three supporting apps (PPC Panel, Logistics and Engineering), each owning one step of a shared production data model.",
      pt: "Um conjunto de seis Power Apps para a Bello Aramados que, juntos, funcionam como um mini-ERP sobre listas de SharePoint (sem Dataverse). Este post cobre os três apps de apoio (Painel PCP, Logística e Engenharia), cada um dono de uma etapa de um modelo de dados de produção compartilhado.",
    },
    shortDescription: {
      en: "6 Power Apps working as a mini-ERP over SharePoint",
      pt: "6 Power Apps funcionando como um mini-ERP sobre SharePoint",
    },
    createdAt: "2026-04",
    tecnologias: [
      "Power Apps",
      "Power Automate",
      "SharePoint Lists",
      "Power Fx",
    ],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    type: "powerapps",
  },
  {
    index: 2,
    slug: "operational-app",
    title: {
      en: "App - Operational Control",
      pt: "App - Controle Operacional",
    },
    description: {
      en: "Operational app for Bello Aramados, designed to register the operators' work and provide real-time updates on production status. The app enhances communication between the production team and management, ensuring efficient workflow and timely delivery of products.",
      pt: "Aplicativo operacional para a Bello Aramados, desenvolvido para registrar o trabalho dos operadores e fornecer atualizações em tempo real sobre o status da produção. O app melhora a comunicação entre a equipe de produção e a gestão, garantindo um fluxo de trabalho eficiente e a entrega pontual dos produtos.",
    },
    shortDescription: {
      en: "Brought FIFO to the shop floor (order → work order → queue → production), built for 30+ operators with little tech familiarity",
      pt: "Levou o PCP para FIFO (pedido → ordem → fila → produção), pensado para 30+ operadores sem afinidade com tecnologia",
    },
    createdAt: "2026-03",
    tecnologias: ["Power Apps", "Power Automate", "SharePoint Lists"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    link: null,
    type: "powerapps",
  },
  {
    index: 3,
    slug: "bello-financeiro",
    title: { en: "App - Finance", pt: "App - Financeiro" },
    description: {
      en: "(Demo) Internal app for Bello Aramados' Finance sector: centralizes everything the company has to pay, whether from the Purchasing queue, a manual entry or a forecast spreadsheet, and tracks bank balances alongside the entries.",
      pt: "(Demo) App interno da Bello Aramados para o setor Financeiro: centraliza tudo que a empresa tem a pagar, seja vindo da fila de Compras, de um lançamento manual ou de uma planilha de previsão, e acompanha o saldo dos bancos junto com os lançamentos.",
    },
    shortDescription: {
      en: "Accounts-payable and bank-balance control app",
      pt: "App de contas a pagar e controle de saldo dos bancos",
    },
    createdAt: "2026-06",
    tecnologias: ["Power Apps", "Power Automate", "SharePoint Lists"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    type: "powerapps",
  },
  {
    index: 4,
    slug: "bello-compras",
    title: { en: "App - Purchasing", pt: "App - Compras" },
    description: {
      en: "Internal app for Bello Aramados' Purchasing sector: supplier registration, purchase order creation and tracking, and payment method control through confirmation with the finance sector.",
      pt: "App interno da Bello Aramados para o setor de Compras: cadastro de fornecedores, criação e acompanhamento de pedidos de compra, e controle das formas de pagamento até a confirmação com o setor financeiro.",
    },
    shortDescription: {
      en: "purchase order and supplier management app",
      pt: "app de gestão de pedidos de compra e fornecedores",
    },
    createdAt: "2026-05",
    tecnologias: ["Power Apps", "Power Automate", "SharePoint Lists"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    type: "powerapps",
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
    createdAt: "2026-02",
    tecnologias: ["HTML", "CSS", "PHP", "JavaScript", "MySQL"],
    tags: ["Web", "Software"],
    empresa: "Bello Aramados",
    link: "https://belloaramados.com/",
    type: "web",
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
    createdAt: "2026-05",
    tecnologias: ["Figma"],
    tags: ["Design", "Figma"],
    empresa: "Bello Aramados",
    type: "design",
    color: "#ED2C26",
  },
  {
    index: 7,
    slug: "risk-analysis-app",
    title: { en: "App - HSE", pt: "App - SSMA" },
    description: {
      en: "Risk-analysis app for the CTR (Randon Group's proving ground): digitized the Test Risk Analysis approval chain from 1h30 down to 10-15min, and grew to cover tooling-service releases, environmental licenses and access management for operators, brigade members, engineers and visitors.",
      pt: "App de SSMA do CTR (campo de provas do grupo Randon): digitalizei a Análise de Risco de Teste, reduzindo o processo de aprovação de 1h30 para 10-15min, e o app cresceu pra cobrir liberação de serviços de ferramentaria, licenças ambientais e gestão de pessoas habilitadas (operadores, brigadistas, engenheiros, visitantes).",
    },
    shortDescription: {
      en: "Cut a 1h30 signature chain to 10-15min, plus tooling releases, licenses and access management",
      pt: "Reduziu de 1h30 para 10-15min a Análise de Risco de Teste, mais ferramentaria, licenças e gestão de pessoas",
    },
    createdAt: "2025-02",
    tecnologias: ["Power Apps", "Power Automate", "SharePoint Lists"],
    tags: ["Web", "Software"],
    empresa: "Centro Tecnológico Randon",
    type: "powerapps",
  },
  {
    index: 8,
    slug: "nfs-transporte",
    title: {
      en: "Automation of Invoices and Transportation Declarations",
      pt: "Automação de NFs e Declarações de Transporte",
    },
    description: {
      en: "Redesigned how CTR received invoices and issued Transportation Declarations (a substitute document, since CTR has no state tax registration) for vehicle test samples arriving daily. The old process was manual and untracked: invoices filed on paper, hand-copied into a ticketing system, printed and stapled to hand to the driver. A standardized form, a SharePoint list as single source of truth, and automatic status e-mails cut a cycle that could take up to 6 hours down to minutes of manual effort.",
      pt: "Redesenhei o recebimento de notas fiscais e a emissão de Declarações de Transporte (documento substituto, já que o CTR não tem inscrição estadual) para amostras de teste veicular recebidas diariamente. O processo antigo era manual e sem rastreio: nota arquivada em papel, copiada à mão pro sistema de chamados, impressa e grampeada pra entregar ao motorista. Um formulário padronizado, uma lista do SharePoint como fonte única de verdade e avisos automáticos por status reduziram um ciclo que podia levar até 6 horas para minutos de esforço manual.",
    },
    shortDescription: {
      en: "Cut a 6h manual invoice/declaration cycle down to 5-10min of hands-on effort",
      pt: "Reduziu de até 6h para 5-10min o esforço manual num ciclo de notas/declarações",
    },
    createdAt: "2022-04",
    tecnologias: ["Microsoft Forms", "Power Automate", "SharePoint Lists"],
    tags: ["Microsoft", "Automation"],
    empresa: "Centro Tecnológico Randon",
    type: "automation",
  },
  {
    index: 9,
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
    createdAt: "2024-05",
    tecnologias: ["Python", "SAP ERP/HANA", "Excel", "Power BI"],
    tags: ["Microsoft", "Automation"],
    empresa: "Centro Tecnológico Randon",
    additionalTypes: ["bi"],
    imageCaption: {
      en: "* Illustrative simulation of an RPA workflow (**Python** + **PyAutoGUI**) I built to pull reports from an ERP system, consolidate the data, and refresh a **Power BI dashboard**. Fully autonomous, ~10 min end-to-end. The original recording can't be shared due to a _data confidentiality agreement_, so I recreated the process in an abstract form.",
      pt: "* Simulação ilustrativa do fluxo de uma automação RPA (**Python + PyAutoGUI**) que desenvolvi para extrair relatórios de um ERP, consolidar os dados e atualizar um **dashboard no Power BI**. 100% autônoma, ~10 min de execução. O vídeo original não pode ser divulgado por _cláusula de confidencialidade de dados_, então recriei o processo de forma abstrata.",
    },
    type: "automation",
  },
  {
    index: 10,
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
    createdAt: "2026-08",
    tecnologias: [
      "Vite",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "Konva",
      "GSAP",
    ],
    tags: ["Web", "Software"],
    type: "web",
    repo: "https://github.com/zenvv/sferi",
    link: "https://sferi.vercel.app/",
  },
  {
    index: 11,
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
    createdAt: "2026-07",
    tecnologias: [
      "Vite",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "shadcn/ui",
    ],
    tags: ["Web", "Software"],
    type: "web",
    repo: "https://github.com/zenvv/not-my-typo",
    link: "https://not-my-typo.vercel.app/",
  },
  {
    index: 12,
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
    createdAt: "2025-04",
    tecnologias: ["Figma"],
    tags: ["Design", "Figma"],
    type: "design",
    color: "#FF5400",
  },
  {
    index: 13,
    slug: "nailly",
    title: { en: "Nailly", pt: "Nailly" },
    description: {
      en: "Scheduling and finance PWA for a self-employed manicurist. A continuous time-band agenda, database-enforced no-overlap booking, batch payments allocated across appointments, recurring clients, a public request form with an approval queue, and Web Push. Built on Next.js 16 and Supabase, with RLS as the security boundary.",
      pt: "PWA de agenda e financeiro para uma manicure autônoma. Agenda como faixa contínua de tempo, agendamento sem sobreposição garantido por constraint no banco, pagamento em lote alocado entre atendimentos, clientes recorrentes, formulário público com fila de aprovação e Web Push. Construído em Next.js 16 sobre Supabase, com RLS como fronteira de segurança.",
    },
    shortDescription: {
      en: "Scheduling and batch-payment finance for 20–40 regulars: a PWA for a self-employed manicurist",
      pt: "Agenda e financeiro em lote para 20–40 clientes fixas: PWA para uma manicure autônoma",
    },
    createdAt: "2026-09",
    tecnologias: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Supabase",
      "PostgreSQL",
      "PWA",
      "Vercel",
      "Zod",
    ],
    tags: ["Web", "Software"],
    empresa: "",
    type: "web",
    // App real fica atrás de login; o link aponta para o formulário público de
    // reserva de uma instância de demonstração (dados fictícios).
    link: "https://nailly-ten.vercel.app/agendar/atelie-aline-demo",
    repo: null,
    color: "#394B35",
    imageCaption: {
      en: "* Demo instance with fictional data (structure identical to production). Public booking form at /agendar/atelie-aline-demo.",
      pt: "* Instância de demonstração com dados fictícios (estrutura idêntica à de produção). Formulário público de reserva em /agendar/atelie-aline-demo.",
    },
  },
  {
    index: 14,
    slug: "pistas",
    title: { en: "App - Track Logging", pt: "App - Apontamento de Pistas" },
    description: {
      en: "Track-usage logging app for CTR's test tracks: records driver, test, track and vehicle axles, plus a daily track-condition inspection. The central challenge was a local-caching workaround over SharePoint so the app works fully offline out on the tracks, where there's no internet.",
      pt: "App de apontamento de uso de pista de testes do CTR: registra motorista, teste, pista e eixos do veículo, com inspeção diária de condição das pistas. O maior desafio foi um workaround de cache local sobre SharePoint pra funcionar offline nas pistas, onde não há internet.",
    },
    shortDescription: {
      en: "Offline-first local-caching workaround over SharePoint for track-test logging",
      pt: "Workaround de cache local offline sobre SharePoint pra apontamento de pista sem internet",
    },
    createdAt: "2025-07",
    tecnologias: ["Power Apps", "SharePoint Lists"],
    tags: ["Web", "Software"],
    empresa: "Centro Tecnológico Randon",
    type: "powerapps",
  },
  {
    index: 15,
    slug: "amostras-checklists",
    title: { en: "App - Sample Checklists", pt: "App - Amostras e Checklists" },
    description: {
      en: "Two apps sharing the same CTR sample data: Checklists builds the dynamic entry/exit checklist for a sample (body, chassis, vehicle or part) and generates the PDF; Amostras consolidates a sample's images, checklists and fiscal paperwork in one place for engineering and sales to look up.",
      pt: "Dois apps sobre a mesma base do CTR: Checklists monta o formulário dinâmico de entrada/saída de amostra (carroceria, chassi, veículo ou peça) e gera o PDF; Amostras reúne, por amostra, imagens, checklists e documentação fiscal num só lugar pra engenharia e comercial consultarem.",
    },
    shortDescription: {
      en: "Sample entry/exit checklist for logistics, paired with a consolidated lookup for engineering",
      pt: "Checklist de entrada/saída de amostra pra logística, com consulta consolidada pra engenharia",
    },
    createdAt: "2025-05",
    tecnologias: ["Power Apps", "Power Automate", "SharePoint Lists"],
    tags: ["Web", "Software"],
    empresa: "Centro Tecnológico Randon",
    type: "powerapps",
  },
  {
    index: 16,
    slug: "kanban-pco",
    title: { en: "App - PCO Kanban", pt: "App - Kanban PCO" },
    description: {
      en: "Digital kanban that mirrors (without replacing) the physical sticky-note board in CTR's garage: the PCO moves cards during the daily operations meeting, generating a real history for each test and feeding a Kanban/Gantt in Power BI for management. App + automation + BI.",
      pt: "Kanban digital que espelha (sem substituir) o quadro físico de post-its da garagem do CTR: o PCO move os cards durante a reunião diária de operação, gerando histórico real de cada teste e alimentando um Kanban/Gantt no Power BI pra gestão. App + automação + BI.",
    },
    shortDescription: {
      en: "Digital mirror of CTR's physical test kanban, feeding a real history and Gantt in Power BI",
      pt: "Espelho digital do kanban físico do CTR, com histórico real e Gantt no Power BI",
    },
    createdAt: "2025-08",
    tecnologias: [
      "Power Apps",
      "Power Automate",
      "Power BI",
      "SharePoint Lists",
    ],
    tags: ["Web", "Software"],
    empresa: "Centro Tecnológico Randon",
    type: "powerapps",
    additionalTypes: ["automation", "bi"],
  },
  {
    index: 17,
    slug: "ctr-ecosystems",
    title: { en: "CTR App Ecosystem", pt: "Ecossistema de Apps CTR" },
    description: {
      en: "Four supporting Power Apps for CTR over the same SharePoint base: CAE hours logging against budget, warehouse stock control, project timesheets for the federal MOVER program, and equipment maintenance history (master registry read live from an external SQL system).",
      pt: "Quatro Power Apps de apoio do CTR sobre a mesma base de SharePoint: apontamento de horas de análises CAE, estoque do almoxarifado, apontamento de horas em projetos do programa MOVER e histórico de manutenção de equipamentos (cadastro mestre lido de um sistema externo via SQL).",
    },
    shortDescription: {
      en: "4 supporting CTR apps: CAE hours, warehouse stock, MOVER timesheets and equipment upkeep",
      pt: "4 apps de apoio do CTR: horas de CAE, almoxarifado, apontamento MOVER e equipamentos",
    },
    createdAt: "2024-10",
    tecnologias: [
      "Power Apps",
      "Power Automate",
      "SharePoint Lists",
      "SQL Server",
    ],
    tags: ["Web", "Software"],
    empresa: "Centro Tecnológico Randon",
    type: "powerapps",
  },
];

const projectBySlug = new Map(Projetos.map((p) => [p.slug, p]));

/**
 * The featured projects, resolved from {@link FEATURED_SLUGS} and kept in that
 * order. Used by the home "Featured Projects" grid and the projects-page
 * featured banner.
 */
export const FeaturedProjetos: Project[] = FEATURED_SLUGS.map((slug) => {
  const project = projectBySlug.get(slug);
  if (!project) {
    throw new Error(
      `FEATURED_SLUGS references an unknown project slug: "${slug}"`,
    );
  }
  return project;
});
