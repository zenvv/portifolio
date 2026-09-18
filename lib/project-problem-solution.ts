import type { Locale } from "@/lib/i18n/translations";

/**
 * Problem/solution excerpts for the handful of projects whose documentation
 * already separates "the problem" (a Context section) from "the solution" (an
 * opening summary or a dedicated Solution section) cleanly enough to lead the
 * page with them. Text is copied verbatim from the project's own
 * `content/<locale>.md`; see the matching edits there, which remove the
 * duplicated source paragraph/section from the markdown body. Projects not
 * listed here don't get this treatment; their markdown is unchanged.
 */
export const PROBLEM_SOLUTION: Partial<
  Record<string, Record<Locale, { problem: string; solution: string }>>
> = {
  "erp-bello-aramados": {
    en: {
      problem:
        "Before it, each sector ran its process on a mix of spreadsheets, isolated Power Apps and dozens of Power Automate flows gluing one sector to the next.",
      solution:
        "The SGE unifies the master data (CRUD) and the flow tracking of those sectors in a single interface, keeping an order's traceability from the sale to the cash desk.",
    },
    pt: {
      problem:
        "Antes dele, cada setor tocava seu processo em uma mistura de planilhas, apps de Power Apps isolados e dezenas de flows de Power Automate colando um setor no outro.",
      solution:
        "O SGE unifica o cadastro (CRUD) e o acompanhamento de fluxo desses setores numa interface só, com a rastreabilidade de um pedido preservada da venda até o caixa.",
    },
  },
  "bello-financeiro": {
    en: {
      problem:
        "- Finance had no way to compile what came in from Purchasing.\n- Invoice, boleto and payment receipt were scattered, with no link to the purchase that originated them.\n- There was no standardized way to build the accounts-payable forecast, nor to see bank balance and statement next to the entries.",
      solution:
        "Centralizes everything the company has to pay, whether it comes from the Purchasing queue, a manual entry or a forecast spreadsheet, and tracks bank balances alongside the entries.",
    },
    pt: {
      problem:
        "- O financeiro não tinha como compilar o que entrava vindo de Compras.\n- Nota fiscal, boleto e comprovante ficavam soltos, sem vínculo com a compra que os originou.\n- Não havia forma padronizada de montar a previsão de contas a pagar nem de ver saldo e extrato dos bancos junto dos lançamentos.",
      solution:
        "Centraliza tudo que a empresa tem a pagar, venha da fila do setor de Compras, de um lançamento manual ou de uma planilha de previsão, e acompanha o saldo dos bancos junto com os lançamentos.",
    },
  },
  "operational-app": {
    en: {
      problem:
        "- There was no production control on the shop floor.\n- What existed was an Excel spreadsheet cross-referencing orders, products and quantities, but the result never reached the person at the machine.\n- The operator had no way to know which order to prioritize, how much had already been done, or when to stop for inspection.\n- The fix wasn't just the app: I redesigned the PCP process itself to follow strict FIFO (order → work order → queue → production), so the queue materialized in `Filas` already reflects real production priority: the app is the visible edge of that redesign.\n- Audience: 30+ production operators a day, with no familiarity with technology. Most of the design decisions were about **what to take off the screen**.",
      solution:
        "Shop-floor app for the Piracicaba plant. For every machine it shows what to produce now, in the right order, and records each report already subtracting it from what's left. Runs on a tablet, used by 30+ operators daily across the plant.",
    },
    pt: {
      problem:
        "- Não existia controle de produção no chão de fábrica.\n- O que existia era uma planilha de Excel que cruzava pedidos, produtos e quantidades, mas o resultado não chegava a quem estava na máquina.\n- O operador não tinha como saber qual pedido priorizar, quanto já tinha sido feito, nem quando parar pra inspeção.\n- A solução não foi só o app: reorganizei o próprio processo do PCP pra seguir FIFO estrito (pedido → ordem de produção → fila → produção), pra que a fila materializada em `Filas` já refletisse a prioridade real de produção: o app é a ponta visível desse redesenho.\n- Público: 30+ operadores de produção por dia, sem familiaridade com tecnologia. A maior parte das decisões de projeto foi sobre **o que tirar da tela**.",
      solution:
        "App de chão de fábrica da unidade de Piracicaba. Mostra pra cada máquina o que produzir agora, na ordem certa, e registra cada apontamento já descontando do que falta. Roda em tablet, usado por 30+ operadores diariamente em toda a fábrica.",
    },
  },
  "bello-compras": {
    en: {
      problem:
        "Before this app, Bello Aramados' Purchasing sector had no structured control. Every purchase was registered manually, with no dedicated system, and the process had been assembled from tools borrowed from other companies in different industries than Bello's. There was no simple, direct way to track orders in progress and the status of each payment.",
      solution:
        "The app covers the full cycle of a purchase within the sector: supplier registration, order creation and editing, and payment control. An order is only marked as completed once the total paid matches the order's total value.",
    },
    pt: {
      problem:
        "Antes desse app, o setor de Compras da Bello Aramados não tinha um controle estruturado. Cada compra era registrada de forma manual, sem sistema próprio, e o processo foi montado com base em ferramentas usadas em outras empresas, de ramos diferentes do da Bello. Faltava um jeito simples e direto de acompanhar pedidos em andamento e o status de cada pagamento.",
      solution:
        "O app cobre o ciclo de uma compra dentro do setor: cadastro de fornecedores, criação e edição de pedidos, e controle de pagamentos. O pedido só é marcado como concluído quando o total pago bate com o valor total.",
    },
  },
  "risk-analysis-app": {
    en: {
      problem:
        "- The Test Risk Analysis (ADR) — the document describing the test, its risks and the preventive measures — was filled in a spreadsheet, printed, and physically circulated to collect each responsible party's signature before a vehicle could run on track.\n- The process took **1h30 per analysis**.\n- There was no way to locate an analysis afterward: the information stayed only with the responsible engineer, and a signature could get lost along the way.\n- Outside the ADR, CTR's tooling-shop services (bending, welding) often had no service order or risk analysis of their own, leaving the operator with no cover for what they were doing.",
      solution:
        "Digitized the ADR into a form with a sequential approval queue (Test Engineer → Brigade Member → Track Controller → HSE Engineer → Operations Coordinator), cutting an estimated 1h30 down to about 15 minutes and, while I was there, handling 40 to 50 analyses a month. It grew to also cover tooling-service releases, environmental licenses and access management — the largest app in the project, with 8 screens.",
    },
    pt: {
      problem:
        "- A Análise de Risco de Teste (ADR) — o documento que descreve o teste, os riscos e as medidas preventivas — era preenchida em planilha, impressa e circulava fisicamente pra coletar a assinatura de cada responsável antes de liberar a rodagem.\n- O processo levava **1h30 por análise**.\n- Não tinha como localizar uma análise depois: a informação ficava só com o engenheiro responsável, e uma assinatura podia se perder no meio do caminho.\n- Fora da ADR, os serviços de ferramentaria do CTR (dobra, solda) muitas vezes não tinham ordem de serviço nem análise de risco própria, deixando o operador sem respaldo sobre o que estava fazendo.",
      solution:
        "Digitalizei a ADR num formulário com fila de aprovação sequencial (Engenheiro Responsável → Brigadista → Controlador de Pista → Engenheiro de SSMA → Coordenador de Operações), reduzindo uma estimativa de 1h30 pra cerca de 15 minutos e, enquanto eu estava lá, respondendo por 40 a 50 análises emitidas por mês. Cresceu pra cobrir também liberação de serviços de ferramentaria, licenças ambientais e gestão de pessoas habilitadas — o maior app do projeto, com 8 telas.",
    },
  },
  pistas: {
    en: {
      problem:
        "- The Track Controller filled in, on a physical spreadsheet, the entry and exit time of every driver on every track, test by test.\n- Each track has a different hourly rate, so this logging fed directly into the client's billing.\n- Someone then had to retype everything into a table to close the month and generate the invoice.\n- CTR's test tracks have very limited internet — some areas only weak 3G/4G — and Power Apps only has native offline caching via Dataverse, which CTR doesn't use: the whole base lives in SharePoint.",
      solution:
        "A logging CRUD (driver, test, track, axles) that works entirely offline: a local on-device caching workaround (`SaveData`/`LoadData`) holds everything while there's no signal, and the controller syncs manually once back online. Validated repeatedly, still in use today.",
    },
    pt: {
      problem:
        "- O Controlador de Pista preenchia numa planilha física o horário de entrada e saída de cada motorista em cada pista, teste a teste.\n- Cada pista tem uma precificação por hora diferente, então esse apontamento impacta direto na cobrança do cliente.\n- Alguém precisava digitar tudo de novo numa tabela pra fechar o mês e gerar a cobrança.\n- As pistas de teste têm internet muito limitada — algumas áreas só com 3G/4G fraco — e o Power Apps só tem cache nativo offline via Dataverse, que o CTR não usa: a base inteira está em SharePoint.",
      solution:
        "Um CRUD de apontamento (motorista, teste, pista, eixos) que funciona inteiramente offline: um workaround de cache local no dispositivo (`SaveData`/`LoadData`) guarda tudo enquanto não há rede, e o controlador sincroniza manualmente quando volta a ter sinal. Validado repetidas vezes, em uso até hoje.",
    },
  },
  "amostras-checklists": {
    en: {
      problem:
        "- Every sample arriving at CTR (body, chassis, whole vehicle or part) needs an entry checklist and an exit checklist, to record its condition coming in and compare it against how it leaves.\n- Without that, a discrepancy (damage, a missing part) had no reliable way to be pinned to before or after its time at CTR.\n- Once filled in, whoever needed to follow up on a sample afterward (engineering, sales, logistics) had no single place to see checklist, images and fiscal paperwork together: it meant digging through separate lists.",
      solution:
        "Two apps over the same data, two audiences: **Checklists**, which logistics uses to fill a dynamic entry/exit form (questions come from a standards table, per sample type) and generate the PDF; and **Amostras**, where engineering and sales look up everything about a sample — images, checklists and fiscal documents — in tabs loaded on demand.",
    },
    pt: {
      problem:
        "- Toda amostra que chega ao CTR (carroceria, chassi, veículo inteiro ou peça) precisa de um checklist de entrada e um de saída, pra registrar o estado em que entrou e comparar com o de saída.\n- Sem isso, uma divergência (avaria, peça faltando) não tinha como ser atribuída com segurança a antes ou depois da passagem pelo CTR.\n- Depois de preenchido, quem precisava acompanhar a amostra (engenharia, comercial, logística) não tinha um lugar único pra ver checklist, imagens e documentação fiscal juntos: precisava vasculhar listas separadas.",
      solution:
        "Dois apps sobre a mesma base, dois públicos: **Checklists**, que a logística usa pra preencher um formulário dinâmico de entrada/saída (as perguntas vêm de uma tabela de padrões, por tipo de amostra) e gerar o PDF; e **Amostras**, onde engenharia e comercial consultam tudo sobre uma amostra — imagens, checklists e documentos fiscais — em abas carregadas sob demanda.",
    },
  },
  "nfs-transporte": {
    en: {
      problem:
        "- There was no standard way to request a Transportation Declaration: it arrived over Teams, e-mail, in person, even a sticky note.\n- A declaration was typed by hand into Qualitor while looking at the physical invoice, and the ticket number was then written on the invoice itself.\n- Invoices were only filed physically, with no standard way to receive, organize or track whether one had already been returned.\n- A cycle that could take an estimated **up to 6h**, between searching, communication noise and rework.",
      solution:
        "A standardized Microsoft Forms request feeding a central SharePoint list, with automatic status e-mails at every step. Invoices started being scanned on arrival and organized by client, with a direct link embedded in the list; and the declaration's final PDF started being captured automatically by a flow that reads the fiscal sector's e-mail. Manual effort dropped from an estimated 6h to about 20 minutes.",
    },
    pt: {
      problem:
        "- Não havia forma padrão de pedir uma Declaração de Transporte: chegava por Teams, e-mail, pessoalmente ou até post-it.\n- A declaração era digitada à mão no Qualitor olhando a nota fiscal física, e o número do chamado depois anotado na própria nota.\n- Notas fiscais ficavam arquivadas só fisicamente, sem forma padronizada de receber, organizar ou rastrear se uma nota já tinha retornado.\n- Um ciclo que podia levar uma estimativa de **até 6h**, entre busca, ruído de comunicação e retrabalho.",
      solution:
        "Formulário padronizado (Microsoft Forms) alimentando uma lista central no SharePoint, com avisos automáticos por e-mail a cada mudança de status. Notas fiscais passaram a ser digitalizadas na chegada e organizadas por cliente, com link direto embutido na lista; e o PDF final da declaração passou a ser capturado automaticamente por um fluxo que lê o e-mail do setor fiscal. Esforço manual caiu de uma estimativa de 6h para cerca de 20 minutos.",
    },
  },
  "kanban-pco": {
    en: {
      problem:
        "- CTR already had a physical kanban — sticky notes on a whiteboard in the garage — discussed in a daily meeting with the whole operations team.\n- The physical board wasn't the problem: what came after it was. Each sector reported progress through a different channel (electronics support one way, the lab another, engineering sometimes forgot).\n- With no single source, there was no way to build a reliable timeline of how a test evolved, or to feed management a Gantt to track it.",
      solution:
        "A digital board that mirrors the physical one, without replacing it: the PCO (operations scheduler) moves cards on a tablet during the meeting itself, generating a real history of every phase change and feeding a Kanban and Gantt in Power BI for management to track without attending the meeting. A separate board (`KANBAN CAE`) covers the simulation-engineering sector's own logic, including exploratory studies with no service order yet.",
    },
    pt: {
      problem:
        "- O CTR já tinha um kanban físico — post-its num quadro branco na garagem — discutido numa reunião diária com toda a equipe de operação.\n- O quadro físico não era o problema: era o depois dele. Cada setor reportava andamento por um canal diferente (suporte eletrônico de um jeito, laboratório de outro, engenharia às vezes esquecia).\n- Sem uma fonte única, não dava pra montar uma linha do tempo confiável de como um teste evoluiu, nem alimentar a gestão com um Gantt de acompanhamento.",
      solution:
        "Um board digital que espelha o físico, sem substituí-lo: o PCO move os cards no tablet durante a própria reunião, gerando um histórico real de cada mudança de fase e alimentando um Kanban e Gantt no Power BI pra gestão acompanhar sem precisar estar na reunião. Um board separado (`KANBAN CAE`) cobre a lógica própria do setor de engenharia de simulação, incluindo estudos exploratórios sem ordem de serviço ainda.",
    },
  },
  "bello-website": {
    en: {
      problem:
        "The site's look and mobile navigation hadn't kept up: a mobile menu that didn't feel native, a phone number spelled out instead of an icon, a home carousel that said little, and small bugs like the footer's Facebook icon linking to Instagram.",
      solution:
        "A full visual and UX redesign — same PHP (CodeIgniter) backend, same URLs and content — that touches every page, rebuilds the mobile menu from scratch, and adds spam protection, accessibility and language fixes behind the scenes.",
    },
    pt: {
      problem:
        "A aparência do site e a navegação mobile estavam desatualizadas: um menu mobile que não parecia nativo, telefone escrito por extenso em vez de ícone, um carrossel na home que dizia pouco, e bugs pequenos como o ícone do Facebook no rodapé linkando pro Instagram.",
      solution:
        "Um redesign completo de visual e UX — mesmo back-end PHP (CodeIgniter), mesmas URLs e conteúdo — que passa por todas as páginas, reconstrói o menu mobile do zero e adiciona proteção antispam, acessibilidade e correções de idioma por trás da tela.",
    },
  },
  "rpa-sap-pyautogui": {
    en: {
      problem:
        "Someone from the administrative sector had to log into SAP by hand, run a report across three transactions, export it, and rebuild a Power BI dashboard from the result — with no set schedule, since it depended on someone remembering to do it.",
      solution:
        "A PyAutoGUI robot that drives SAP by screen coordinates and keyboard shortcuts, running the same routine unattended four times a day: opens SAP, runs the three transactions, exports to Excel, and refreshes and publishes the Power BI dashboard.",
    },
    pt: {
      problem:
        "Alguém do setor administrativo precisava logar no SAP manualmente, rodar um relatório em três transações, exportar e reconstruir um dashboard no Power BI a partir do resultado — sem periodicidade fixa, já que dependia de alguém lembrar de fazer.",
      solution:
        "Um robô em PyAutoGUI que opera o SAP por coordenadas de tela e atalhos de teclado, rodando a mesma rotina sozinho quatro vezes ao dia: abre o SAP, roda as três transações, exporta pro Excel e atualiza e publica o dashboard no Power BI.",
    },
  },
};
