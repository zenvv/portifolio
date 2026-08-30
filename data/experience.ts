import type { Locale } from "@/lib/i18n/translations";

export type CompanyRole = {
  index: number;
  title: Record<Locale, string>;
  start: Record<Locale, string>;
  end: Record<Locale, string>;
  /** Short footnote, e.g. a part-time/full-time transition date. */
  note?: Record<Locale, string>;
  activities: Record<Locale, string[]>;
};

export type Company = {
  index: number;
  icon: string;
  url: string;
  name: string;
  roles: CompanyRole[];
};

export const Companies: Company[] = [
  {
    index: 0,
    icon: "/clients/bello_logo.png",
    name: "Bello Aramados",
    url: "https://www.belloaramados.com",
    roles: [
      {
        index: 0,
        title: {
          en: "Independent Contractor (Software Development & IT)",
          pt: "Prestador de Serviços PJ (Desenvolvimento & TI)",
        },
        start: { en: "Oct 2025", pt: "Out 2025" },
        end: { en: "Present", pt: "Atual" },
        note: {
          en: "Part-time through Feb 2026, full-time since Mar 2026",
          pt: "Colaboração part-time até fev/2026, full-time desde mar/2026",
        },
        activities: {
          en: [
            "Architected and built the SGE (internal ERP), unifying 4 areas previously managed on isolated spreadsheets: cut production order creation from ~30–45min to instant and implemented end-to-end traceability (Purchasing→Finance, Logistics→Finance) that didn't exist before, with granular RBAC per department/role and an audit log with notifications.",
            "Fully refactored the legacy institutional website (PHP, jQuery, MySQL, CSS), adding full responsiveness, fixing vulnerabilities, and implementing security layers on the contact form.",
            "Structured the production planning & control (PCP) logic from scratch (FIFO queue, Order→Production Order→Queue tree) — a process with no formal control before — and translated that logic into a daily time-tracking app used by 30+ shop-floor operators with no tech background.",
            "Built 8+ Power Apps applications and authored 10+ Power Automate flows to keep production databases up to date.",
          ],
          pt: [
            "Arquitetei e desenvolvi o SGE, unificando 4 áreas antes geridas em planilhas isoladas: reduzi a criação de ordens de produção de ~30-45min para instantânea e implementei rastreabilidade ponta-a-ponta (Compras→Financeiro, Logística→Financeiro) antes inexistente, com RBAC granular por setor/papel e log de auditoria/notificações.",
            "Refatorei inteiramente o site institucional legado (PHP, jQuery, MySQL, CSS), com responsividade completa, correção de vulnerabilidades e implementação de camadas de segurança no formulário de contato.",
            "Estruturei do zero a lógica de PCP (fila FIFO, árvore Pedido→Ordem→Fila), processo sem nenhum controle formal antes, traduzindo a lógica para aplicativo de apontamento de uso diário por 30+ operadores de chão de fábrica sem familiaridade tecnológica.",
            "Desenvolvi 8+ aplicações em Power Apps e formulei +10 fluxos de Power Automate para atualização de bancos de produção.",
          ],
        },
      },
    ],
  },
  {
    index: 1,
    icon: "/clients/ctr-logo.png",
    name: "Centro Tecnológico Randon",
    url: "https://www.ctrandon.com",
    roles: [
      {
        index: 0,
        title: {
          en: "Jr. Data Intelligence Analyst",
          pt: "Analista de Inteligência de Dados Jr.",
        },
        start: { en: "Jan 2025", pt: "Jan 2025" },
        end: { en: "Feb 2026", pt: "Fev 2026" },
        activities: {
          en: [
            "Developed Power Platform applications for operations, accounting, safety, test engineering, logistics, warehousing, and gatehouse/reception.",
            "Built an operating revenue forecasting system (Excel, MS Fabric, Power BI, Power Automate), used as a reference by the operations, sales, and accounting teams.",
            "Modeled ETLs and dashboards in Power BI; automated ERP (SAP) data extraction with Python (Pandas, OpenPyXL, NumPy, PyAutoGUI).",
            "Designed and structured several company controls from scratch — most notably, maintenance controls and process controls for the tax and purchasing departments.",
            "Acted as key user for the rollout of Randoncorp's internal AI initiative (Project BRAIN) at my unit.",
          ],
          pt: [
            "Desenvolvi aplicações em Power Platform para operação, contabilidade, segurança, engenharia de testes, logística, almoxarifado e portaria.",
            "Criei sistema de previsibilidade de receita operacional (Excel, MS Fabric, Power BI, Power Automate), usado como referência pelas áreas de operação, comercial e contabilidade.",
            "Modelei ETLs e dashboards em Power BI; automatizei extração de dados do ERP (SAP) com Python (Pandas, OpenPyXL, numpy, pyautogui).",
            "Desenhei e estruturei do zero diversos controles da empresa. Em destaque: os controles de manutenção e processos para áreas fiscal e de compras.",
            "Atuei como key user na implementação de IA interna da Randoncorp (Projeto BRAIN) na unidade que fazia parte.",
          ],
        },
      },
      {
        index: 1,
        title: {
          en: "Administrative Assistant",
          pt: "Assistente Administrativo",
        },
        start: { en: "Jun 2023", pt: "Jun 2023" },
        end: { en: "Jan 2025", pt: "Jan 2025" },
        activities: {
          en: [
            "Operated the SAP-ERP system and automated internal processes (Power Automate) with forms (MS Forms) and integration to tables (SharePoint Lists, Excel).",
          ],
          pt: [
            "Operei o sistema SAP-ERP e automatizei processos internos (Power Automate) com formulários (MS Forms) e integração a tabelas (Sharepoint Lists, Excel).",
          ],
        },
      },
      {
        index: 2,
        title: { en: "Intern", pt: "Estagiário" },
        start: { en: "Nov 2022", pt: "Nov 2022" },
        end: { en: "Jun 2023", pt: "Jun 2023" },
        activities: {
          en: [
            "Supported early administrative operations using the SAP-ERP system.",
          ],
          pt: [
            "Apoiei operações administrativas iniciais utilizando o sistema SAP-ERP.",
          ],
        },
      },
    ],
  },
];
