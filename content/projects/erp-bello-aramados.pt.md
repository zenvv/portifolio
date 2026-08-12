**[Veja a demo rodando ao vivo](https://bello-sge-demo.vercel.app)**: escolha
qualquer _persona_ na tela de login, sem cadastro nem senha, e explore à
vontade!

Fork de portfólio do **Bello SGE**, um ERP interno real que desenvolvi para a
[**Bello Aramados**](https://www.belloaramados.com), uma empresa de arames,
aramados, grades e produtos similares. O app original roda em produção na
empresa; este fork substitui o backend e a autenticação reais por versões
fictícias, mantendo intacta toda a UI, o sistema de tabelas/formulários
config-driven e a lógica de negócio.

> _Nota de Transparência_: Este projeto foi construído com apoio do **[Claude Code](https://claude.com/claude-code)**
> como acelerador de desenvolvimento: pair programming pra implementação,
> revisão e depuração. As decisões de arquitetura (SharePoint Lists como
> backend via Microsoft Graph, Azure AD/MSAL como autenticação, o desenho do
> RBAC granular por setor, a componentização de CRUDs do sistema em
> tabelas/formulários configuráveis) são minhas, do projeto real; o Claude ajudou a
> implementar, refatorar e depurar boa parte do código em cima delas, principalmente dos setores agregados após a versão 0.0.100 do projeto (Fiscal, Financeiro, Compras).

## Sobre o sistema

O **SGE** (Sistema de Gestão Empresarial) é o ERP interno da
[Bello Aramados](https://www.belloaramados.com). Ele cobre o fluxo
operacional da empresa de ponta a ponta:

- **PCP**: filas de programação de produção, atribuição de máquinas,
  apontamentos, cadastro de operadores, inspeções de qualidade;
- **Comercial**: pedidos de clientes, embarques, cadastro de clientes;
- **Fiscal**: fila de faturamento, notas fiscais, transportadoras, tabela
  de preços;
- **Compras**: pedidos de compra, fornecedores
  pós-conclusão;
- **Financeiro**: fila de pagamentos, receitas, previsão de caixa, bancos,
  centros de custo;
- **Admin**: usuários, permissões por setor (RBAC), log de auditoria.

## O que esta demo tem e o que não tem

**(✓) Tem:**

- Toda a **UI** e **navegação** do sistema real, sem simplificação;
- **RBAC granular funcional:** cada _persona_ vê e edita só o que sua
  função permitiria no sistema real;
- **Dados fictícios**, mas coerentes entre si: um pedido gerado no `seed` já tem
  ordens de produção, embarque e faturamento reais derivados dele, não
  registros soltos;
- A **lógica de negócio** de verdade: geração de ordens de produção a partir de
  um pedido, cálculo de faturamento, fila de pagamentos, fluxo de aprovação
  de alteração de pedidos de Compras;
- Tour de **onboarding** por _persona_ e forma de _reset de dados_ a qualquer
  momento.
  - /\*_feature exclusiva da demo_.

**[✗] Não tem:**

- **Backend real**: sem _SharePoint_, sem _Microsoft Graph_, sem banco de dados;
- **Autenticação real**: sem _Azure AD/MSAL_, o login é um seletor de _persona_;
- **Persistência entre sessões**: os dados vivem em `sessionStorage` e resetam
  ao fechar a aba (ou pelo botão de reset);
- Envio de **e-mail** ou **upload de arquivo** de verdade (upload vira um _Blob_
  local no navegador);
- **Colaboração em tempo real** entre usuários/abas diferentes.

## Capturas de tela

| Dashboard do PCP                                                 | Pedidos do Comercial                                                     |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| ![Dashboard PCP](/projects/erp-bello-aramados/dashboard-pcp.png) | ![Pedidos Comercial](/projects/erp-bello-aramados/pedidos-comercial.png) |

| Gestão de usuários e permissões (Admin)                         |
| --------------------------------------------------------------- |
| ![Usuários Admin](/projects/erp-bello-aramados/users-admin.png) |

## Stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack) + **React 19** + TypeScript
- **Tailwind CSS v4** + **[shadcn/ui](https://ui.shadcn.com/)** (Radix primitives) + Fluent UI / Phosphor icons
- **[TanStack Table](https://tanstack.com/table)** (virtualização com `@tanstack/react-virtual`), **TanStack Query** e **TanStack Form**
- **[Zod](https://zod.dev/)** para validação de schema e **[next-safe-action](https://next-safe-action.dev/)** para as server actions
- **[nuqs](https://nuqs.dev/)** para filtros/ordenação/paginação sincronizados com a URL
- **[Zustand](https://zustand.docs.pmnd.rs/)** (nesta demo, é a `store` que substitui o backend, conforme descrito abaixo)
- **Vitest** + **Testing Library** para testes, **ESLint** (flat config) + **Prettier** + **Husky/lint-staged** pro resto
- No app real (não nesta demo): **Microsoft Graph API** sobre **SharePoint Lists** como backend, **Azure AD / MSAL** como autenticação

## Arquitetura: decisões do app real x adaptação da demo

O app real não usa banco de dados tradicional: o backend é **SharePoint
Lists**, acessado via **Microsoft Graph API**, com **Azure AD/MSAL** cuidando
da autenticação e um RBAC granular (por usuário x setor) controlando o que
cada um vê e edita. Essa escolha (rodar o ERP inteiro em cima de listas do
SharePoint que a empresa já tinha licenciado, em vez de subir um banco e uma
API própria) foi pensada pro contexto da
[Bello Aramados](https://www.belloaramados.com), que já havia toda sua arquitetura de dados armazenadas em soluções Microsoft;

O desenho do
RBAC (Role-Based Access Control) granular também foi pensado respeitando a configuração que fiz dentro do Tenant da Bello e nos inúmeros grupos de segurança componentizados no Entra ID, coisa que foi portada pra lógica do SGE.

Também decidi gerar a maior parte das telas de CRUD a
partir de `config` em vez de escrever cada tabela/formulário à mão.

O Claude
Code entrou na implementação dessas decisões (código, refactors, depuração
de bugs de hidratação/corrida de estado, etc.).

Nesta demo, cada uma dessas peças foi trocada por uma equivalente
client-side, **mantendo a mesma API pública**, pra não precisar tocar na
lógica de negócio nem na UI:

| Peça                     | No app real                                                                                                          | Nesta demo                                                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Autenticação             | Azure AD / MSAL (`app/auth/msalInstance.ts`, `MsalProvider`)                                                         | Escolha de persona em `lib/demo/personas.ts`, sessão em `lib/demo/session.ts` (Zustand + `sessionStorage`)                             |
| Backend / dados          | SharePoint Lists via Microsoft Graph (`hooks/listsService.ts` chamando `/$batch` etc.)                               | `lib/demo/store.ts`: store Zustand com a mesma API (`getItems`/`createItem`/`updateItem`/`deleteItem`), persistida em `sessionStorage` |
| Mapeamento site/lista    | `lib/sitesConfig.ts` com `siteId`/`listId` reais do SharePoint                                                       | Mesmo arquivo, IDs trocados por chaves lógicas que apontam pro registry da store de demo                                               |
| Rotas de API server-side | `lib/api_ordens/graphAppClient.ts` (Graph app-only) + Route Handler `app/(protected)/api/comercial/pedidos/route.ts` | `lib/api_ordens/graphAppClient.ts` reimplementado sobre a store, chamado direto do cliente (sem Route Handler, sem cookie assinado)    |
| Server actions           | `lib/actions/*.actions.ts` com `"use server"`, validando RBAC contra um cookie assinado (`bello_permissions`)        | As mesmas actions, sem `"use server"`: rodam no navegador, validando RBAC contra a persona ativa                                       |
| Tabelas/formulários      | `lib/formConfig.ts` + `config/*.config.ts` gerando UI via `DynamicTable`/`DynamicForm`                               | **Sem alteração**: é o mesmo sistema, config-driven, do app real                                                                       |
| Regra de negócio         | `lib/api_ordens/createOrder.ts`, `lib/api_faturamento/calcularFaturamento.ts`, `lib/api_financeiro/automacoes.ts`    | **Sem alteração**: mesma lógica, só a camada de dados por trás foi trocada                                                             |

---

# Demo

## Live demo

**[Veja a demo rodando ao vivo ↗](https://bello-sge-demo.vercel.app)**

escolha
qualquer _persona_ na tela de login, sem cadastro nem senha, e explore à
vontade!

## Rodando localmente

Este repo usa [pnpm](https://pnpm.io/):

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000): a tela de login já
mostra o seletor de personas, sem nenhuma variável de ambiente necessária.

Outros comandos:

```bash
pnpm build   # build de produção
pnpm start   # roda o build de produção
pnpm lint    # ESLint
pnpm test    # Vitest
```

## Licença

[MIT](./LICENSE).
