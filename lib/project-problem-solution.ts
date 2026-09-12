import type { Locale } from "@/lib/i18n/translations";

/**
 * Problem/solution excerpts for the handful of projects whose documentation
 * already separates "the problem" (a Context section) from "the solution" (an
 * opening summary or a dedicated Solution section) cleanly enough to lead the
 * page with them. Text is copied verbatim from the project's own
 * `content/<locale>.md` — see the matching edits there, which remove the
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
        "Centralizes everything the company has to pay — whether it comes from the Purchasing queue, a manual entry or a forecast spreadsheet — and tracks bank balances alongside the entries.",
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
        "- There was no production control on the shop floor.\n- What existed was an Excel spreadsheet cross-referencing orders, products and quantities, but the result never reached the person at the machine.\n- The operator had no way to know which order to prioritize, how much had already been done, or when to stop for inspection.\n- The fix wasn't just the app: I redesigned the PCP process itself to follow strict FIFO (order → work order → queue → production), so the queue materialized in `Filas` already reflects real production priority — the app is the visible edge of that redesign.\n- Audience: 30+ production operators a day, with no familiarity with technology. Most of the design decisions were about **what to take off the screen**.",
      solution:
        "Shop-floor app for the Piracicaba plant. For every machine it shows what to produce now, in the right order, and records each report already subtracting it from what's left. Runs on a tablet, used by 30+ operators daily across the plant.",
    },
    pt: {
      problem:
        "- Não existia controle de produção no chão de fábrica.\n- O que existia era uma planilha de Excel que cruzava pedidos, produtos e quantidades, mas o resultado não chegava a quem estava na máquina.\n- O operador não tinha como saber qual pedido priorizar, quanto já tinha sido feito, nem quando parar pra inspeção.\n- A solução não foi só o app: reorganizei o próprio processo do PCP pra seguir FIFO estrito (pedido → ordem de produção → fila → produção), pra que a fila materializada em `Filas` já refletisse a prioridade real de produção — o app é a ponta visível desse redesenho.\n- Público: 30+ operadores de produção por dia, sem familiaridade com tecnologia. A maior parte das decisões de projeto foi sobre **o que tirar da tela**.",
      solution:
        "App de chão de fábrica da unidade de Piracicaba. Mostra pra cada máquina o que produzir agora, na ordem certa, e registra cada apontamento já descontando do que falta. Roda em tablet, usado por 30+ operadores diariamente em toda a fábrica.",
    },
  },
  nailly: {
    en: {
      problem:
        "- The user is a middle-aged manicurist, tired, with her hands busy. Not a dev, not a \"persona\": a real person who today **forgets appointments** and **can't remember whether she already charged someone**.\n- The work is already mentally heavy (hours talking to people). The app exists to **take load off her head**, not add to it.\n- Single scoping test: _does this reduce her mental load?_ If not, it's out. If a screen needs more than two taps for its most common task, it's wrong.\n- She serves 20–40 regulars, on weekly / biweekly / monthly recurrence. Three are home visits. She **gets paid in batches** — R$ 180 at once covering the month's 4 sessions — not per appointment.\n- Two surfaces, two audiences: **her panel** (authenticated, opened dozens of times a day) and a **public form** for new clients to request a slot (picture a 65-year-old, in a hurry, on street 4G).",
      solution:
        "Scheduling and finance app for a self-employed manicurist. A mobile-first PWA, used almost 100% on an Android phone, between one client and the next. It replaces Google Calendar + informal WhatsApp billing with a single tool built for the real workflow of someone who sees ~6–8 clients a day and gets paid in batches.",
    },
    pt: {
      problem:
        "- A usuária é uma manicure de meia-idade, cansada, com as mãos ocupadas. Não é dev, não é \"persona\": é uma pessoa real que hoje **esquece agendamentos** e **não lembra se já cobrou**.\n- O trabalho já é mentalmente pesado (horas conversando com gente). O app existe para **tirar carga da cabeça dela**, não adicionar.\n- Critério de escopo único: _isso reduz a carga mental dela?_ Se não, não entra. Se uma tela exige mais de dois toques para a tarefa mais comum, está errada.\n- Ela atende entre 20 e 40 clientes fixas, com recorrência semanal, quinzenal ou mensal. Três são a domicílio. **Recebe pagamento em lote** — R$ 180 de uma vez cobrindo as 4 sessões do mês — e não por atendimento.\n- Duas telas, dois públicos: o **painel dela** (autenticado, aberto dezenas de vezes por dia) e um **formulário público** para clientes novas pedirem horário (uma pessoa de 65 anos, com pressa, no 4G da rua).",
      solution:
        "App de agenda e controle financeiro para uma manicure autônoma. PWA, mobile-first, usado quase 100% num Android, entre um atendimento e outro. Ele substitui o Google Agenda + a cobrança informal no WhatsApp por uma ferramenta só, feita para o fluxo real de uma profissional que atende ~6–8 clientes por dia e recebe em lote.",
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
};
