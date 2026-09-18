import type { Locale } from "@/lib/i18n/translations";
import { NFS_REDUCTION, RISK_REDUCTION } from "@/data/metrics";

export type ResultBlock =
  | {
      kind: "reduction";
      from: string;
      to: string;
      label: Record<Locale, string>;
    }
  | { kind: "count"; value: string; label: Record<Locale, string> };

export type ProjectDecision = {
  title: Record<Locale, string>;
  body: Record<Locale, string>;
};

export type ProjectScreen = {
  src: string;
  caption: Record<Locale, string>;
};

export type ProjectPageContent = {
  /** One sentence, no jargon, under ~20 words. */
  subtitle: Record<Locale, string>;
  role: Record<Locale, string>;
  duration: Record<Locale, string>;
  status: Record<Locale, string>;
  /** Up to 3, business-language title first, the technical "why" after. */
  decisions: ProjectDecision[];
  /** 2-4 big-number blocks. */
  results: ResultBlock[];
  /** Up to 5, one-line caption each. */
  screens: ProjectScreen[];
  /** Short paragraphs, 2-3. */
  whatIdDoDifferently: Record<Locale, string[]>;
};

/**
 * The fixed page template (subtitle, role/duration/stack/status grid,
 * decisions, screens, results, "what I'd do differently") only applies to
 * projects listed here, the 4 curated on the home page. Everything else
 * keeps the previous markdown-first layout in `pid/project.tsx` until a
 * later pass extends this to the rest.
 */
export const PROJECT_PAGE_CONTENT: Partial<Record<string, ProjectPageContent>> =
  {
    "erp-bello-aramados": {
      subtitle: {
        en: "One system for a metalworks' six sectors, from the customer order to the cash register.",
        pt: "Um sistema único para os seis setores de uma metalúrgica, do pedido do cliente ao caixa.",
      },
      role: {
        en: "Developer, end to end, sole owner",
        pt: "Desenvolvedor responsável, ponta a ponta",
      },
      duration: {
        en: "5 months (Mar–Jul 2026)",
        pt: "5 meses (mar–jul/2026)",
      },
      status: { en: "In production", pt: "Em produção" },
      decisions: [
        {
          title: {
            en: "Reusing what the company already paid for",
            pt: "Aproveitar o que a empresa já pagava",
          },
          body: {
            en: "Data lives in SharePoint and login uses the company's own Microsoft 365 accounts: no new database or server.",
            pt: "Os dados ficam no SharePoint e o login usa as contas Microsoft 365 da própria empresa, sem banco ou servidor novo.",
          },
        },
        {
          title: {
            en: "New screens without writing new code",
            pt: "Telas novas sem escrever código novo",
          },
          body: {
            en: "About 18 registration screens are generated from configuration instead of hand-built one by one.",
            pt: "Cerca de 18 telas de cadastro são geradas a partir de configuração, em vez de construídas uma a uma.",
          },
        },
        {
          title: {
            en: "Fragile automations became tested code",
            pt: "Automações frágeis viraram código testado",
          },
          body: {
            en: "Five Power Automate flows that glued sectors together were rewritten as pure, tested functions.",
            pt: "Cinco fluxos do Power Automate que colavam os setores foram reescritos como funções puras e testadas.",
          },
        },
      ],
      results: [
        {
          kind: "count",
          value: "6",
          label: { en: "areas integrated", pt: "áreas integradas" },
        },
        {
          kind: "count",
          value: "5",
          label: {
            en: "automations ported from Power Automate",
            pt: "automações migradas do Power Automate",
          },
        },
        {
          kind: "count",
          value: "~18",
          label: {
            en: "screens generated from configuration",
            pt: "telas geradas por configuração",
          },
        },
        {
          kind: "count",
          value: "2",
          label: { en: "manufacturing plants", pt: "plantas produtivas" },
        },
      ],
      screens: [
        {
          src: "/projects/erp-bello-aramados/images/dashboard-pcp.png",
          caption: {
            en: "PPC dashboard: production queues, machine status and per-operator logging.",
            pt: "Dashboard do PCP: filas de produção, status das máquinas e apontamento por operador.",
          },
        },
        {
          src: "/projects/erp-bello-aramados/images/pedidos-comercial.png",
          caption: {
            en: "Sales, order list: a stats panel recalculated over whatever's filtered.",
            pt: "Comercial, lista de pedidos: painel de estatísticas recalculado sobre os itens filtrados.",
          },
        },
        {
          src: "/projects/erp-bello-aramados/images/pagamentos-financeiro.png",
          caption: {
            en: "Finance, payments queue: installments grouped by due week.",
            pt: "Financeiro, fila de pagamentos: parcelas agrupadas por semana de vencimento.",
          },
        },
        {
          src: "/projects/erp-bello-aramados/images/users-admin.png",
          caption: {
            en: "Admin, users: a per-sector permission matrix for each person.",
            pt: "Admin, usuários: matriz de permissões por setor de cada pessoa.",
          },
        },
      ],
      whatIdDoDifferently: {
        en: [
          "I'd run more use-case testing with the actual users before each delivery, instead of validating internally and adjusting after it was already in production.",
          "I'd also push the reusable CRUD logic further: it covers most registration screens today, but a few core flows are still hand-written and could inherit more of the config-driven pattern.",
        ],
        pt: [
          "Faria mais testes de caso de uso com os usuários antes de cada entrega, em vez de validar internamente e ajustar depois de já estar em produção.",
          "Também expandiria ainda mais a lógica de CRUD reaproveitável: hoje ela cobre a maior parte dos cadastros, mas alguns fluxos principais ainda são escritos à mão e poderiam herdar mais do padrão config-driven.",
        ],
      },
    },

    "nfs-transporte": {
      subtitle: {
        en: "A manual invoice-and-declaration cycle that took hours became one form with an automatic flow.",
        pt: "Um ciclo manual de notas e declarações que levava horas virou um formulário com fluxo automático.",
      },
      role: {
        en: "Developer, end to end, sole owner",
        pt: "Desenvolvedor responsável, ponta a ponta",
      },
      duration: {
        en: "14 months (Jan 2022–Mar 2023, first version)",
        pt: "14 meses (jan/2022–mar/2023, primeira versão)",
      },
      status: { en: "In production", pt: "Em produção" },
      decisions: [
        {
          title: {
            en: "A list, not a spreadsheet",
            pt: "Uma lista, não uma planilha",
          },
          body: {
            en: "Power Automate handles row updates far more reliably against a SharePoint list than against Excel.",
            pt: "O Power Automate lida com atualização de linhas de forma muito mais confiável numa lista do SharePoint do que numa planilha Excel.",
          },
        },
        {
          title: {
            en: "Scanning became a habit, not just a feature",
            pt: "Digitalizar virou hábito, não só recurso técnico",
          },
          body: {
            en: "The automatic invoice link only works because scanning on arrival, organized by client, became routine.",
            pt: "O link automático da nota só funciona porque digitalizar na chegada, organizado por cliente, virou rotina operacional.",
          },
        },
        {
          title: {
            en: "Automatic capture by e-mail, no direct integration",
            pt: "Captura automática por e-mail, sem integração direta",
          },
          body: {
            en: "Qualitor exposes no API, so the viable path was intercepting the e-mail it already sends.",
            pt: "O Qualitor não expõe API, então o caminho viável foi interceptar por e-mail o PDF que o sistema já envia.",
          },
        },
      ],
      results: [
        {
          kind: "reduction",
          from: NFS_REDUCTION.from,
          to: NFS_REDUCTION.to,
          label: {
            en: "manual effort per cycle",
            pt: "esforço manual por ciclo",
          },
        },
        {
          kind: "count",
          value: "4",
          label: {
            en: "automated flows running the cycle",
            pt: "fluxos automatizados no ciclo",
          },
        },
      ],
      screens: [],
      whatIdDoDifferently: {
        en: [
          "I'd fix the `DEC_TRANSP_CANCELADO` flow to check the status change itself, not just its current value: today it resends the cancellation e-mail on any later edit, not only the first time. No practical impact so far, but it's an inconsistency I'd clean up on a revisit.",
          "I'd also look for a more direct integration with Qualitor: the final PDF arrives today through an e-mail workaround because the system exposes no API. It works well, but it's the kind of fragile dependency I'd replace if the platform ever opened a direct option.",
        ],
        pt: [
          "Ajustaria o flow `DEC_TRANSP_CANCELADO` pra verificar a mudança de status, não só o valor atual: hoje ele reenvia o e-mail de cancelamento em qualquer edição posterior, não só na primeira vez. Sem impacto prático até hoje, mas é uma inconsistência que eu revisaria.",
          "Também buscaria uma integração mais direta com o Qualitor: o PDF final chega hoje por um workaround de e-mail porque o sistema não expõe API. Funciona bem, mas é o tipo de dependência frágil que eu substituiria se a plataforma abrisse uma opção direta.",
        ],
      },
    },

    "risk-analysis-app": {
      subtitle: {
        en: "A Test Risk Analysis that took 1h30 now takes about 15 minutes.",
        pt: "Análise de Risco de Teste que levava 1h30 passou a levar cerca de 15 minutos.",
      },
      role: {
        en: "Process digitization, pain-point mapping and end-to-end development",
        pt: "Digitalização do processo, mapeamento de dores e desenvolvimento ponta a ponta",
      },
      duration: {
        en: "5 months (Nov 2024–Mar 2025)",
        pt: "5 meses (nov/2024–mar/2025)",
      },
      status: { en: "In production", pt: "Em produção" },
      decisions: [
        {
          title: {
            en: "Approval doesn't block the app",
            pt: "Aprovação não trava o app",
          },
          body: {
            en: "Each role signs its own step in its own column; a flow aggregates the status instead of the app recalculating it every time the screen opens.",
            pt: "Cada papel assina sua própria etapa numa coluna própria; um flow agrega o status em vez do app recalcular isso toda vez que a tela abre.",
          },
        },
        {
          title: {
            en: "Only the HSE Engineer can mark “Critical”",
            pt: "Só o Engenheiro de SSMA marca “Crítico”",
          },
          body: {
            en: "A deliberate decision to keep that classification out of the hands of whoever has an interest in prioritizing their own test.",
            pt: "Decisão deliberada pra tirar essa classificação das mãos de quem tem interesse em priorizar o próprio teste.",
          },
        },
        {
          title: {
            en: "One approval pattern, reused twice",
            pt: "Um padrão de fila, reaproveitado",
          },
          body: {
            en: "The ADR and tooling-shop service releases use the same sequential-signature logic, avoiding two approval mechanisms built from scratch.",
            pt: "A ADR e a liberação de serviços de ferramentaria usam a mesma lógica de fila por assinatura, evitando desenhar dois mecanismos de aprovação do zero.",
          },
        },
      ],
      results: [
        {
          kind: "reduction",
          from: RISK_REDUCTION.from,
          to: RISK_REDUCTION.to,
          label: {
            en: "ADR approval chain",
            pt: "cadeia de aprovação da ADR",
          },
        },
        {
          kind: "count",
          value: "40–50",
          label: {
            en: "analyses processed a month",
            pt: "análises processadas por mês",
          },
        },
        {
          kind: "count",
          value: "8",
          label: {
            en: "screens, the largest app in the project",
            pt: "telas, o maior app do projeto",
          },
        },
      ],
      screens: [
        {
          src: "/projects/risk-analysis-app/images/example2_censored.png",
          caption: {
            en: "New ADR: a guided, step-by-step form; sensitive fields redacted.",
            pt: "Nova Análise de Risco: formulário guiado em etapas; dados sensíveis ocultados.",
          },
        },
        {
          src: "/projects/risk-analysis-app/images/example_censored.png",
          caption: {
            en: "Indicators: analyses by month and by criticality; data redacted.",
            pt: "Indicadores: análises por mês e por criticidade; dados ocultados.",
          },
        },
      ],
      whatIdDoDifferently: {
        en: [
          "I'd split “Risk Analysis” into its own app for the test engineers, with queries and interface optimized for their specific flow, instead of sharing space with tooling-shop services, licenses and people management.",
          "“App SSMA” itself would become a dashboard focused only on the HSE sector; today it mixes audiences and ends up less clear for each of them.",
          "I'd also close a couple of security gaps that today are only enforced at the interface level: marking an analysis as “Critical”, for instance, is a visual restriction (the option disappears from the form for anyone who isn't the HSE Engineer), not an actual constraint in the database.",
        ],
        pt: [
          "Separaria a Análise de Risco (ADR) num app próprio, dedicado aos engenheiros de teste, com consultas e interface otimizadas pro fluxo deles, em vez de dividir espaço com ferramentaria, licenças e gestão de pessoas.",
          "O “App SSMA” viraria um dashboard focado só no setor de SSMA; hoje ele mistura públicos e acaba menos claro pra cada um.",
          "Também fecharia algumas brechas de segurança que hoje só são resolvidas na interface: marcar uma análise como “Crítico”, por exemplo, é uma restrição visual (a opção some do formulário pra quem não é Engenheiro de SSMA), não uma trava real no banco.",
        ],
      },
    },

    "operational-app": {
      subtitle: {
        en: "A shop-floor app that tells 30+ operators what to make now, in the right order.",
        pt: "Um app de chão de fábrica que mostra pra 30+ operadores o que produzir agora, na ordem certa.",
      },
      role: {
        en: "Process redesign (PCP/FIFO) and end-to-end development",
        pt: "Redesenho do processo (PCP/FIFO) e desenvolvimento ponta a ponta",
      },
      duration: {
        en: "5 months (Oct 2025–Mar 2026), part-time",
        pt: "5 meses (out/2025–mar/2026), part-time",
      },
      status: { en: "In production", pt: "Em produção" },
      decisions: [
        {
          title: {
            en: "The number updates before the system confirms it",
            pt: "O número atualiza antes do sistema confirmar",
          },
          body: {
            en: "The remaining quantity shows a local estimate right after a report, marked with an asterisk, while Power Automate reconciles the real number in the background.",
            pt: "A quantidade restante mostra uma estimativa local logo após o apontamento, marcada com asterisco, enquanto o Power Automate reconcilia o número real em segundo plano.",
          },
        },
        {
          title: {
            en: "One screen for three different sectors",
            pt: "Uma tela só para três setores diferentes",
          },
          body: {
            en: "Fabrication, Assembly and Finishing share the same machines screen and the same three actions, filtered differently instead of three separate interfaces.",
            pt: "Fabricação, Montagem e Acabamento dividem a mesma tela de máquinas e as mesmas três ações, filtradas de forma diferente em vez de três interfaces separadas.",
          },
        },
        {
          title: {
            en: "Planning and reporting stayed apart",
            pt: "Planejamento e apontamento ficaram separados",
          },
          body: {
            en: "One app builds and prioritizes the queue; another is for the operator to report against it — the operator never sees the planning, only their own queue.",
            pt: "Um app monta e prioriza a fila; outro é pro operador apontar sobre ela — o operador nunca vê o planejamento, só a própria fila.",
          },
        },
      ],
      results: [
        {
          kind: "count",
          value: "30+",
          label: {
            en: "shop-floor operators using it daily",
            pt: "operadores de chão de fábrica usando diariamente",
          },
        },
        {
          kind: "count",
          value: "3",
          label: {
            en: "sector logics unified in one screen",
            pt: "lógicas de setor unificadas numa tela",
          },
        },
        {
          kind: "count",
          value: "~3 min",
          label: {
            en: "for the official quantity to catch up to the local estimate",
            pt: "para a quantidade oficial alcançar a estimativa local",
          },
        },
      ],
      screens: [
        {
          src: "/projects/operational-app/images/02-maquinas.png",
          caption: {
            en: "Machines panel: step at the top of the queue, hourly target and remaining quantity.",
            pt: "Painel de máquinas: etapa no topo da fila, meta por hora e quantidade restante.",
          },
        },
        {
          src: "/projects/operational-app/images/05-restante-estimado.png",
          caption: {
            en: "Right after a report, the remaining quantity shows with an asterisk: a local estimate while Power Automate recalculates.",
            pt: "Logo após um apontamento, a quantidade restante aparece com asterisco: estimativa local enquanto o Power Automate recalcula.",
          },
        },
        {
          src: "/projects/operational-app/images/06-iniciar-1-operadores.png",
          caption: {
            en: "Start wizard, step 1 of 4: who is at the machine.",
            pt: "Assistente de início, 1/4: quem está na máquina.",
          },
        },
        {
          src: "/projects/operational-app/images/13-reporte-2-conformidade.png",
          caption: {
            en: "Boolean parameter: Conforming, N/A or Non-conforming — each type comes from the machine's own register.",
            pt: "Parâmetro booleano: Conforme, N/A ou Não Conforme — o tipo vem do cadastro da máquina.",
          },
        },
      ],
      whatIdDoDifferently: {
        en: [
          "I'd validate the 4-step start wizard directly with operators earlier: the extra summary screen came from watching real hesitation on the shop floor, and I'd rather have caught that before the first rollout.",
          "The optimistic estimate is only as good as the 3-minute Power Automate cadence behind it; I'd look at a faster trigger so the asterisk clears sooner for the operator.",
        ],
        pt: [
          "Validaria o assistente de início de 4 passos direto com os operadores mais cedo: a tela extra de resumo veio de observar hesitação real no chão de fábrica, e eu preferia ter percebido isso antes do primeiro rollout.",
          "A estimativa otimista só é tão boa quanto a cadência de 3 minutos do Power Automate por trás dela; eu buscaria um gatilho mais rápido pra o asterisco sumir antes pro operador.",
        ],
      },
    },

    "bello-financeiro": {
      subtitle: {
        en: "One queue for everything Bello Aramados had to pay, later folded into the ERP's own Finance module.",
        pt: "Uma fila só para tudo que a Bello Aramados tinha a pagar, depois incorporada ao módulo Financeiro do ERP.",
      },
      role: {
        en: "Developer, end to end, sole owner",
        pt: "Desenvolvedor responsável, ponta a ponta",
      },
      duration: { en: "Built in Jun 2026", pt: "Desenvolvido em jun/2026" },
      status: {
        en: "Superseded by the ERP's Finance module (Jul 2026)",
        pt: "Substituído pelo módulo Financeiro do ERP (jul/2026)",
      },
      decisions: [
        {
          title: {
            en: "One row per installment, not per order",
            pt: "Uma linha por parcela, não por pedido",
          },
          body: {
            en: "Purchasing's automation already splits a payment into installments when creating the entries, so Finance tracks month by month what's due without opening each order.",
            pt: "A automação de Compras já divide o pagamento em parcelas ao criar os lançamentos, então o Financeiro acompanha mês a mês o que vence sem abrir cada pedido.",
          },
        },
        {
          title: {
            en: "Two sectors, two lists, glued by flows",
            pt: "Dois setores, duas listas, coladas por flows",
          },
          body: {
            en: "SharePoint can't restrict permissions per column, so Purchasing and Finance keep separate lists that feed each other through Power Automate instead of sharing one.",
            pt: "O SharePoint não restringe permissão por coluna, então Compras e Financeiro mantêm listas separadas que se alimentam via Power Automate, em vez de dividir uma só.",
          },
        },
        {
          title: {
            en: "The bank balance is never stored",
            pt: "O saldo do banco nunca é gravado",
          },
          body: {
            en: "It's calculated from the opening balance minus every paid and verified entry, so the number can't go stale relative to the ledger.",
            pt: "É calculado a partir do saldo inicial menos cada lançamento pago e verificado, então o número nunca fica desatualizado em relação ao razão.",
          },
        },
      ],
      results: [
        {
          kind: "count",
          value: "5",
          label: {
            en: "Power Automate flows integrating Purchasing and the forecast spreadsheet",
            pt: "fluxos do Power Automate integrando Compras e a planilha de previsão",
          },
        },
        {
          kind: "count",
          value: "2",
          label: {
            en: "plants sharing the same payables queue",
            pt: "plantas compartilhando a mesma fila de pagamentos",
          },
        },
        {
          kind: "count",
          value: "3",
          label: {
            en: "payment origins unified in one queue: Purchasing, manual entry and forecast",
            pt: "origens de pagamento unificadas numa fila: Compras, lançamento manual e previsão",
          },
        },
      ],
      screens: [
        {
          src: "/projects/bello-financeiro/images/02-pagamentos.png",
          caption: {
            en: "Payments list: queue grouped by due week, with per-week totals of paid vs. pending.",
            pt: "Lista de pagamentos: fila agrupada por semana de vencimento, com o total pago vs. pendente de cada semana.",
          },
        },
        {
          src: "/projects/bello-financeiro/images/11-bancos-resumo.png",
          caption: {
            en: "Banks summary: current balance computed from the opening balance minus paid and verified entries.",
            pt: "Resumo dos bancos: saldo atual calculado a partir do saldo inicial menos os lançamentos pagos e verificados.",
          },
        },
        {
          src: "/projects/bello-financeiro/images/15-previsao-comparativo.png",
          caption: {
            en: "Forecast comparison: forecast amount against the actual amount of each entry.",
            pt: "Comparativo de previsão: valor previsto contra o valor real de cada lançamento.",
          },
        },
        {
          src: "/projects/bello-financeiro/images/04-pagamento-validar.png",
          caption: {
            en: "Validating a payment: the review step where an entry becomes verified.",
            pt: "Validação de um pagamento: a etapa de revisão em que o lançamento vira verificado.",
          },
        },
      ],
      whatIdDoDifferently: {
        en: [
          "The project is already superseded by the ERP's Finance module, so most of what I'd change (unifying data with Purchasing, native permissions) is exactly what that rebuild fixed.",
          "If I were to keep maintaining this version, I'd move the forecast import off a manually uploaded spreadsheet and closer to a proper recurring integration.",
        ],
        pt: [
          "O projeto já foi substituído pelo módulo Financeiro do ERP, então a maior parte do que eu mudaria (unificar dados com Compras, permissões nativas) é exatamente o que aquela reconstrução resolveu.",
          "Se eu continuasse mantendo essa versão, tiraria a previsão de depender de upload manual de planilha e aproximaria de uma integração recorrente de verdade.",
        ],
      },
    },

    "bello-compras": {
      subtitle: {
        en: "Supplier and purchase-order tracking for Bello Aramados, payment methods followed until fully paid.",
        pt: "Acompanhamento de fornecedores e pedidos de compra da Bello Aramados, até o pagamento completo.",
      },
      role: {
        en: "Developer, end to end, sole owner",
        pt: "Desenvolvedor responsável, ponta a ponta",
      },
      duration: { en: "Built in May 2026", pt: "Desenvolvido em mai/2026" },
      status: { en: "In production", pt: "Em produção" },
      decisions: [
        {
          title: {
            en: "One row per payment method, not per installment",
            pt: "Uma linha por forma de pagamento, não por parcela",
          },
          body: {
            en: "An order can split across several payment methods; Purchasing tracks each method's own progress, while Finance's queue explodes the installment-credit ones into one row per installment.",
            pt: "Um pedido pode se dividir em várias formas de pagamento; Compras acompanha o progresso de cada forma, enquanto a fila do Financeiro explode as de crédito parcelado em uma linha por parcela.",
          },
        },
        {
          title: {
            en: "Complete only once fully paid",
            pt: "Só conclui quando o valor bate",
          },
          body: {
            en: "An order can't be marked completed until the sum of its payment methods matches its total value, so a partial payment can't slip through as done.",
            pt: "Um pedido só pode ser marcado como concluído quando a soma das formas de pagamento bate com o valor total, então um pagamento parcial não passa como concluído.",
          },
        },
        {
          title: {
            en: "Purchasing and Finance don't share a list",
            pt: "Compras e Financeiro não dividem uma lista",
          },
          body: {
            en: "The same permission limitation as the Finance app: the two sectors' data stays on separate SharePoint lists, replicated by an automation instead of merged.",
            pt: "Mesma limitação de permissão do app do Financeiro: os dados dos dois setores ficam em listas separadas do SharePoint, replicadas por automação em vez de unificadas.",
          },
        },
      ],
      results: [
        {
          kind: "count",
          value: "5",
          label: {
            en: "payment methods supported, each with its own rule",
            pt: "formas de pagamento suportadas, cada uma com regra própria",
          },
        },
        {
          kind: "count",
          value: "100%",
          label: {
            en: "of an order's value required before it can be completed",
            pt: "do valor do pedido exigido antes de concluir",
          },
        },
      ],
      screens: [
        {
          src: "/projects/bello-compras/images/01-listagem-pedidos.jpg",
          caption: {
            en: "Order listing: filterable by year, month, status, unit, due date and payment method.",
            pt: "Listagem de pedidos: filtrável por ano, mês, status, unidade, vencimento e forma de pagamento.",
          },
        },
        {
          src: "/projects/bello-compras/images/03-forma-pagamento.jpg",
          caption: {
            en: "Payment method registered: the system tracks percentage paid until it reaches 100%.",
            pt: "Forma de pagamento registrada: o sistema acompanha o percentual pago até chegar a 100%.",
          },
        },
        {
          src: "/projects/bello-compras/images/04-listagem-fornecedores.jpg",
          caption: {
            en: "Supplier listing: tax ID, address, contact and materials/services.",
            pt: "Listagem de fornecedores: CNPJ, endereço, contato e materiais/serviços.",
          },
        },
      ],
      whatIdDoDifferently: {
        en: [
          "I'd give the payment-method form more built-in validation: today a boleto without an attached file can still be saved, and it only gets caught later when Finance reviews it.",
          "I'd also look at merging this with the Finance app's supplier and category registers sooner instead of keeping two apps in sync by convention.",
        ],
        pt: [
          "Eu daria mais validação nativa pro formulário de forma de pagamento: hoje um boleto sem arquivo anexado ainda salva, e só é pego depois quando o Financeiro revisa.",
          "Também buscaria unificar mais cedo os cadastros de fornecedor e categoria com o app do Financeiro, em vez de manter dois apps sincronizados por convenção.",
        ],
      },
    },

    "bello-website": {
      subtitle: {
        en: "A full visual and UX redesign of Bello Aramados' institutional site, same backend, new experience.",
        pt: "Um redesign completo de visual e UX do site institucional da Bello Aramados, mesmo back-end, experiência nova.",
      },
      role: {
        en: "Front-end and back-end redesign, sole owner",
        pt: "Redesign de front-end e back-end, responsável único",
      },
      duration: { en: "Built in Feb 2026", pt: "Desenvolvido em fev/2026" },
      status: { en: "In production", pt: "Em produção" },
      decisions: [
        {
          title: {
            en: "Same URLs, same backend, new experience",
            pt: "Mesmas URLs, mesmo back-end, experiência nova",
          },
          body: {
            en: "The redesign kept PHP (CodeIgniter), page structure and URLs untouched — old category links still redirect — so the change is ~90% visual and UX, not a rewrite.",
            pt: "O redesign manteve PHP (CodeIgniter), estrutura de páginas e URLs intactas — links antigos de categoria ainda redirecionam — então a mudança é ~90% visual e de UX, não uma reescrita.",
          },
        },
        {
          title: {
            en: "One place for colors, type and spacing",
            pt: "Um lugar só para cores, tipografia e espaçamento",
          },
          body: {
            en: "The same button used to be recreated across 5 different files; centralizing those tokens in one CSS source was what made the rest of the redesign consistent to ship.",
            pt: "O mesmo botão era recriado em 5 arquivos diferentes; centralizar esses tokens numa fonte CSS só foi o que tornou o resto do redesign consistente de entregar.",
          },
        },
        {
          title: {
            en: "Security and accessibility, not just a new look",
            pt: "Segurança e acessibilidade, não só uma cara nova",
          },
          body: {
            en: "Behind the visual pass: spam protection on the contact form (a hidden field plus a minimum interval between submissions), a visible focus indicator, reduced-motion support and a correct declared page language.",
            pt: "Por trás do visual: proteção antispam no formulário de contato (campo oculto mais intervalo mínimo entre envios), indicador de foco visível, suporte a movimento reduzido e idioma da página declarado corretamente.",
          },
        },
      ],
      results: [
        {
          kind: "count",
          value: "6",
          label: {
            en: "pages fully redesigned, plus header and footer",
            pt: "páginas redesenhadas por completo, mais cabeçalho e rodapé",
          },
        },
        {
          kind: "count",
          value: "~90%",
          label: {
            en: "of the change is layout and visual, same backend and URLs",
            pt: "da mudança é layout e visual, mesmo back-end e URLs",
          },
        },
        {
          kind: "count",
          value: "1",
          label: {
            en: "long-standing bug fixed: the footer's Facebook icon linking to Instagram",
            pt: "bug antigo corrigido: ícone do Facebook no rodapé linkando pro Instagram",
          },
        },
      ],
      screens: [
        {
          src: "/projects/bello-website/images/home--desktop.png",
          caption: {
            en: "Home page, before and after: full-screen hero and business-sector grid redesigned with icons.",
            pt: "Página inicial, antes e depois: hero em tela cheia e grade de setores redesenhada com ícones.",
          },
        },
        {
          src: "/projects/bello-website/images/sobre--desktop.png",
          caption: {
            en: "About page, before and after: the milestones timeline became a vertical, scroll-filled track.",
            pt: "Página Sobre, antes e depois: a timeline de marcos virou uma trilha vertical preenchida pelo scroll.",
          },
        },
        {
          src: "/projects/bello-website/images/servicos--desktop.png",
          caption: {
            en: "Services page, before and after: each production step got its own icon, connected by flow arrows.",
            pt: "Página Serviços, antes e depois: cada etapa da produção ganhou ícone próprio, ligado por setas de fluxo.",
          },
        },
        {
          src: "/projects/bello-website/images/contato--desktop.png",
          caption: {
            en: "Contact page, before and after: icons on every field, and the map moved below the form.",
            pt: "Página Contato, antes e depois: ícones em todos os campos, e o mapa foi pra abaixo do formulário.",
          },
        },
      ],
      whatIdDoDifferently: {
        en: [
          "I'd push further on the CMS side: content still lives in code rather than an editable panel, so any copy change still goes through a deploy.",
          "I'd also revisit the products page filtering earlier in the process — it was the page that changed the most compared to my first draft, since real category data exposed edge cases the mockup didn't show.",
        ],
        pt: [
          "Eu avançaria mais no lado de CMS: o conteúdo ainda vive no código em vez de um painel editável, então qualquer troca de texto ainda passa por deploy.",
          "Também revisitaria o filtro da página de produtos mais cedo no processo: foi a página que mais mudou em relação ao meu primeiro rascunho, porque os dados reais de categoria expuseram casos que o mockup não mostrava.",
        ],
      },
    },

    "rpa-sap-pyautogui": {
      subtitle: {
        en: "A screen-clicking robot that pulled SAP reports and refreshed a Power BI dashboard, four times a day.",
        pt: "Um robô de cliques na tela que extraía relatórios do SAP e atualizava um dashboard no Power BI, quatro vezes ao dia.",
      },
      role: {
        en: "RPA developer, sole owner",
        pt: "Desenvolvedor do RPA, responsável único",
      },
      duration: { en: "Built in May 2024", pt: "Desenvolvido em mai/2024" },
      status: {
        en: "Ran unattended in production",
        pt: "Rodou em produção, sem intervenção",
      },
      decisions: [
        {
          title: {
            en: "Simulating the user, not the API",
            pt: "Simulando o usuário, não a API",
          },
          body: {
            en: "With no admin access to enable SAP GUI Scripting, the viable path was driving the interface the way a person would: fixed screen coordinates and keyboard shortcuts.",
            pt: "Sem acesso de admin pra habilitar o SAP GUI Scripting, o caminho viável foi operar a interface como uma pessoa faria: coordenadas de tela fixas e atalhos de teclado.",
          },
        },
        {
          title: {
            en: "A machine that never changes",
            pt: "Uma máquina que nunca muda",
          },
          body: {
            en: "The whole automation depends on one dedicated notebook always in the same state — fixed resolution, SAP always maximized in the same spot — since PyAutoGUI has no idea what's actually on screen.",
            pt: "Toda a automação depende de um notebook dedicado sempre no mesmo estado — resolução fixa, SAP sempre maximizado no mesmo lugar —, já que o PyAutoGUI não sabe o que está de fato na tela.",
          },
        },
        {
          title: {
            en: "No retries, on purpose",
            pt: "Sem retentativas, de propósito",
          },
          body: {
            en: "Generous fixed delays instead of image recognition or automatic retries: a reasonable trade-off only because the environment is controlled and nobody touches the machine during a run.",
            pt: "Esperas fixas generosas em vez de reconhecimento de imagem ou retentativas automáticas: uma troca razoável só porque o ambiente é controlado e ninguém toca a máquina durante a execução.",
          },
        },
      ],
      results: [
        {
          kind: "count",
          value: "4x/dia",
          label: {
            en: "fully unattended runs a day",
            pt: "execuções autônomas por dia",
          },
        },
        {
          kind: "count",
          value: "9–12 min",
          label: {
            en: "end to end, from opening SAP to publishing the dashboard",
            pt: "de ponta a ponta, da abertura do SAP à publicação do dashboard",
          },
        },
        {
          kind: "count",
          value: "3",
          label: {
            en: "SAP transactions chained in one run (ZMM075, ME2L, MB51)",
            pt: "transações do SAP encadeadas numa execução (ZMM075, ME2L, MB51)",
          },
        },
      ],
      screens: [],
      whatIdDoDifferently: {
        en: [
          "I'd add at least minimal image-based checks before each click, since a single unexpected popup (a Windows update notification, for instance) silently derails the whole run with no error surfaced.",
          "I no longer have the original script, which taught me to always keep a personal, sanitized copy of anything I build for a client, for exactly this kind of situation.",
        ],
        pt: [
          "Eu adicionaria pelo menos checagens mínimas por imagem antes de cada clique, já que um popup inesperado (uma notificação de atualização do Windows, por exemplo) derruba a execução inteira sem erro nenhum aparecer.",
          "Não tenho mais o script original, o que me ensinou a sempre guardar uma cópia pessoal e higienizada de tudo que construo pra um cliente, exatamente pra esse tipo de situação.",
        ],
      },
    },

    pistas: {
      subtitle: {
        en: "Offline-first track-usage logging for CTR's test tracks, where there's barely any signal.",
        pt: "Apontamento de uso de pista do CTR, funcionando offline onde quase não há sinal.",
      },
      role: {
        en: "Developer, end to end, sole owner",
        pt: "Desenvolvedor responsável, ponta a ponta",
      },
      duration: { en: "Built in Jul 2025", pt: "Desenvolvido em jul/2025" },
      status: { en: "In production", pt: "Em produção" },
      decisions: [
        {
          title: {
            en: "Sync is manual, on purpose",
            pt: "Sincronização manual, de propósito",
          },
          body: {
            en: "A dedicated button avoids partial writes over an unstable connection: the controller decides when to send data instead of the app retrying silently in the background.",
            pt: "Um botão dedicado evita gravações parciais numa conexão instável: o controlador decide quando enviar os dados em vez do app tentar de novo sozinho em segundo plano.",
          },
        },
        {
          title: {
            en: "Resume instead of retype",
            pt: "Retomar em vez de digitar de novo",
          },
          body: {
            en: "A finished report from the last two days can be reused as a template for the next one, since the same test often runs again the same day with the same driver and axles.",
            pt: "Um apontamento finalizado nos últimos dois dias pode virar modelo pro próximo, já que o mesmo teste costuma rodar de novo no mesmo dia, com o mesmo motorista e eixos.",
          },
        },
        {
          title: {
            en: "One device, one controller",
            pt: "Um dispositivo, um controlador",
          },
          body: {
            en: "The app runs on a single device at a time, so a sync conflict between two devices editing the same report never became a real problem worth solving.",
            pt: "O app roda num único dispositivo por vez, então um conflito de sincronização entre dois aparelhos editando o mesmo apontamento nunca virou um problema real a resolver.",
          },
        },
      ],
      results: [
        {
          kind: "count",
          value: "0",
          label: {
            en: "internet required to log a full day of track usage",
            pt: "internet necessária pra apontar um dia inteiro de uso de pista",
          },
        },
        {
          kind: "count",
          value: "5",
          label: {
            en: "track segments checked in the daily condition inspection",
            pt: "trechos de pista no checklist diário de condição",
          },
        },
        {
          kind: "count",
          value: "2 dias",
          label: {
            en: "window to resume a recent report instead of retyping it",
            pt: "janela pra retomar um apontamento recente em vez de digitar de novo",
          },
        },
      ],
      screens: [
        {
          src: "/projects/pistas/images/example_censored.png",
          caption: {
            en: "Reports screen: Running and Finished tabs; sensitive data redacted.",
            pt: "Tela de apontamentos: abas Rodando e Finalizado; dados sensíveis ocultados.",
          },
        },
      ],
      whatIdDoDifferently: {
        en: [
          "I'd add a lightweight conflict check even for the single-device assumption, since a lost or swapped device today has no safety net beyond \"don't do that.\"",
          "The daily track inspection and the usage log share a lot of context (same tracks, same shifts) that I'd consider surfacing together in one screen, instead of two separate flows that happen to run side by side.",
        ],
        pt: [
          "Eu adicionaria uma checagem leve de conflito mesmo pra premissa de dispositivo único, já que um aparelho perdido ou trocado hoje não tem rede de segurança além de \"não faça isso\".",
          "A inspeção diária de pista e o apontamento de uso compartilham bastante contexto (mesmas pistas, mesmos turnos) que eu consideraria juntar numa tela só, em vez de dois fluxos separados que só acontecem lado a lado.",
        ],
      },
    },

    "amostras-checklists": {
      subtitle: {
        en: "One data set, two apps: entry/exit checklists for logistics, a lookup panel for engineering and sales.",
        pt: "Uma base só, dois apps: checklists de entrada/saída pra logística, painel de consulta pra engenharia e comercial.",
      },
      role: {
        en: "Developer, end to end, sole owner",
        pt: "Desenvolvedor responsável, ponta a ponta",
      },
      duration: { en: "Built in May 2025", pt: "Desenvolvido em mai/2025" },
      status: { en: "In production", pt: "Em produção" },
      decisions: [
        {
          title: {
            en: "Questions come from a table, not the screen",
            pt: "Perguntas vêm de uma tabela, não da tela",
          },
          body: {
            en: "Each checklist type's questions are metadata, so a new sample type doesn't require touching the app — the trade-off is damage ending up as JSON in a text column, without native SharePoint filtering.",
            pt: "As perguntas de cada tipo de checklist são metadados, então um tipo de amostra novo não exige mexer no app — a troca é que avarias viram JSON numa coluna de texto, sem filtro nativo do SharePoint.",
          },
        },
        {
          title: {
            en: "Nothing loads until you ask for it",
            pt: "Nada carrega até você pedir",
          },
          body: {
            en: "Images, checklists and fiscal data inside a sample only process the first time their tab is clicked, so opening a sample never generates images or runs flows it doesn't need yet.",
            pt: "Imagens, checklists e dados fiscais dentro de uma amostra só processam na primeira vez que a aba é clicada, então abrir uma amostra nunca gera imagens ou roda flows que ainda não precisa.",
          },
        },
        {
          title: {
            en: "One flow to cross two SharePoint sites",
            pt: "Um flow pra cruzar dois sites do SharePoint",
          },
          body: {
            en: "Invoice and transport-declaration data lives in a list on a different site than the sample's own; a flow does that cross-reference, since Power Apps can't do it client-side at a reasonable speed.",
            pt: "Dados de nota e declaração de transporte ficam numa lista em outro site, diferente do da amostra; um flow faz esse cruzamento, já que o Power Apps não consegue fazer isso client-side numa velocidade razoável.",
          },
        },
      ],
      results: [
        {
          kind: "count",
          value: "2",
          label: {
            en: "apps sharing one data set: Checklists for logistics, Amostras for engineering and sales",
            pt: "apps sobre uma única base: Checklists pra logística, Amostras pra engenharia e comercial",
          },
        },
        {
          kind: "count",
          value: "3",
          label: {
            en: "tabs loaded on demand: images, checklists and fiscal data",
            pt: "abas carregadas sob demanda: imagens, checklists e dados fiscais",
          },
        },
        {
          kind: "count",
          value: "4",
          label: {
            en: "sample types covered: body, chassis, whole vehicle or part",
            pt: "tipos de amostra cobertos: carroceria, chassi, veículo inteiro ou peça",
          },
        },
      ],
      screens: [
        {
          src: "/projects/amostras-checklists/images/01-checklist-dinamico.png",
          caption: {
            en: "The dynamic checklist form: questions and their type come from a standards table, not a fixed screen.",
            pt: "O formulário dinâmico de checklist: perguntas e seu tipo vêm de uma tabela de padrões, não de uma tela fixa.",
          },
        },
      ],
      whatIdDoDifferently: {
        en: [
          "I'd move damage records off a JSON text column and into their own list once the volume justified it, trading implementation simplicity for native filtering and reporting.",
          "I'd also look at caching the cross-site fiscal lookup instead of calling the flow every time a sample's Fiscal tab is opened, since that data changes rarely once a sample is closed out.",
        ],
        pt: [
          "Eu tiraria os registros de avaria de uma coluna JSON e passaria pra uma lista própria assim que o volume justificasse, trocando simplicidade de implementação por filtro e relatório nativos.",
          "Também buscaria cachear a consulta fiscal entre sites em vez de chamar o flow toda vez que a aba Fiscal de uma amostra abre, já que esse dado muda pouco depois que a amostra é encerrada.",
        ],
      },
    },

    "kanban-pco": {
      subtitle: {
        en: "A digital mirror of CTR's physical test kanban, feeding real history into Power BI.",
        pt: "Um espelho digital do kanban físico de testes do CTR, alimentando histórico real no Power BI.",
      },
      role: {
        en: "Developer, end to end, sole owner",
        pt: "Desenvolvedor responsável, ponta a ponta",
      },
      duration: { en: "Built in Aug 2025", pt: "Desenvolvido em ago/2025" },
      status: { en: "In production", pt: "Em produção" },
      decisions: [
        {
          title: {
            en: "Edits stay local until confirmed",
            pt: "Edições ficam locais até confirmar",
          },
          body: {
            en: "Moving a card only patches a local collection; the real SharePoint write happens once, in a batch, when the PCO confirms — not on every drag while cards are still being sorted.",
            pt: "Mover um card só faz patch numa coleção local; a gravação real no SharePoint acontece de uma vez, em lote, quando o PCO confirma — não a cada arrasto enquanto os cards ainda estão sendo organizados.",
          },
        },
        {
          title: {
            en: "Power BI gets its own feed, not a live write",
            pt: "O Power BI tem alimentação própria, não gravação direta",
          },
          body: {
            en: "A scheduled daily flow re-syncs the planning list Power BI reads from, instead of the app writing to it on every change, keeping the board itself fast to use.",
            pt: "Um flow diário agendado ressincroniza a lista de planejamento que o Power BI lê, em vez do app gravar nela a cada mudança, mantendo o board rápido de usar.",
          },
        },
        {
          title: {
            en: "Two boards, on purpose",
            pt: "Dois boards, de propósito",
          },
          body: {
            en: "The two boards duplicate some logic, but CAE's exploratory studies (no service order yet) don't fit the same phase set as regular operations, so splitting them avoided a per-sector configuration screen.",
            pt: "Os dois boards duplicam parte da lógica, mas os estudos exploratórios do CAE (sem ordem de serviço ainda) não cabem no mesmo conjunto de fases da operação normal, então separá-los evitou uma tela de configuração por setor.",
          },
        },
      ],
      results: [
        {
          kind: "count",
          value: "2",
          label: {
            en: "boards: general operations and the CAE sector's own logic",
            pt: "boards: operação geral e a lógica própria do setor CAE",
          },
        },
        {
          kind: "count",
          value: "1",
          label: {
            en: "daily automated sync feeding Power BI's Kanban and Gantt",
            pt: "sincronização diária automatizada alimentando o Kanban e Gantt no Power BI",
          },
        },
      ],
      screens: [],
      whatIdDoDifferently: {
        en: [
          "I'd add a lightweight \"undo\" for the batch confirm: today, once the PCO commits a round of moves, correcting a mistaken one means editing it again from scratch.",
          "The two boards' duplicated phase logic works, but I'd look at a single configurable phase set per sector instead of two boards that have to be kept in sync by hand whenever the process changes.",
        ],
        pt: [
          "Eu adicionaria um \"desfazer\" leve pro commit em lote: hoje, depois que o PCO confirma uma rodada de movimentos, corrigir um errado significa editar de novo do zero.",
          "A lógica de fases duplicada entre os dois boards funciona, mas eu buscaria um conjunto de fases configurável por setor em vez de dois boards que precisam ser mantidos em sincronia manualmente sempre que o processo muda.",
        ],
      },
    },
  };
