<!-- Post de COLEÇÃO do portfólio (zenvv.dev). Cobre os apps CTR `colecao` da
     curadoria: analises-cae, almoxarifado, apontamentos-mover, equipamentos.
     `homepage` entra como menção de uma linha. Flagships (SSMA, Pistas,
     Amostras+Checklists, Kanban PCO) têm post próprio. Molde do
     bello-ecosystems. Sem imagens ainda (sem acesso ao ambiente real do CTR). -->

# Ecossistema de Apps: CTR

O CTR (Centro Tecnológico Randon) é o campo de provas do grupo Randon: entrada de amostras, análise de engenharia, operação de pistas, controle de produção, segurança. Ao longo do projeto, além dos quatro apps flagship — [**SSMA**](/projects/risk-analysis-app), [**Apontamento de Pistas**](/projects/pistas), [**Amostras e Checklists**](/projects/amostras-checklists) e [**Kanban PCO**](/projects/kanban-pco) — desenvolvi um conjunto de apps de apoio, menores e mais nichados, todos sobre a mesma base de **SharePoint Online**, sem Dataverse.

## Análises CAE

Apontamento de horas trabalhadas contra o orçamento de cada análise de engenharia do CAE (Computer-Aided Engineering), com relatório de fechamento em PDF. Cada análise tem um orçamento de horas estimado ou é cobrada por recurso entregue, independente do tempo gasto; sem uma ferramenta dedicada, acompanhar quanto do orçamento já foi consumido dependia de controle manual.

A tela inicial mostra as análises em andamento do usuário, horas já apontadas e horas restantes do orçamento. Tem dois jeitos de lançar: um lançamento único com dedução automática do intervalo de almoço/expediente, ou múltiplos lançamentos manuais sem dedução. Ao concluir, o app decide sozinho o status da análise — some da fila de "em andamento" e trava a `Duração Real` como a soma de todos os apontamentos.

```powerfx
// horas restantes do orçamento do usuário logado
$"{Text(Sum(Filter(Analises_2, 'Criado por'.DisplayName = User().FullName), 'Duração Estimada') - Sum(Filter(Apontamentos, 'Criado por'.DisplayName = User().FullName), Duração), "[$-pt-BR]##0,#0")} horas restantes para apontar"
```

O relatório de fechamento usa a função nativa `PDF()` do Power Apps (renderiza um container visual direto em PDF), diferente do padrão HTML + fluxo (`criarPDF`/`SalvarHTML`) usado nos outros apps do CTR — uma inconsistência entre apps do mesmo ecossistema, mas que resolveu bem o caso de uso.

## Almoxarifado

CRUD de estoque: cadastro de insumos e de saídas/reposição, com cada consumo atrelado a um funcionário e a uma ordem de serviço. Antes do app, não havia como saber o que saía do almoxarifado e pra qual ordem de serviço se destinava — o consumo era difícil de medir, difícil de prever, e não dava pra saber quanto cobrar de um cliente com base nele.

A estrutura de dados já existia; o que o app resolveu foi **usabilidade** pros operadores do almoxarifado, com pouquíssimo tato com tecnologia. A tela de lançamento permite dar baixa em vários materiais de uma vez, numa única confirmação: cada linha desconta do estoque e grava o consumo ao mesmo tempo.

```powerfx
// baixa em lote: pra cada material lançado, grava o consumo e desconta o estoque
ForAll(newMateriaisBaixa,
    Patch(ALMOXARIFADO_CONSUMOS, Defaults(ALMOXARIFADO_CONSUMOS), {
        Operação: {Value: "Baixa"}, Material: {Id: Material.Id, Value: Material.Value},
        Quantidade: Quantidade, Responsável: {Id: Responsavel.Id, Value: Responsavel.Value},
        'Ordem de Serviço': Teste
    });
    Patch(ALMOXARIFADO_MATERIAIS_ESTOQUE, LookUp(ALMOXARIFADO_MATERIAIS_ESTOQUE, ID = Material.Id), {
        'Estoque atual': LookUp(ALMOXARIFADO_MATERIAIS_ESTOQUE, ID = Material.Id).'Estoque atual' - Quantidade
    })
);
```

## Apontamento de Horas MOVER

App de apontamento de horas em projetos do programa federal **MOVER** (incentivo fiscal a projetos de desenvolvimento e inovação), incluindo o subgrupo interno **Olimpo**. Os apontamentos precisavam ser compilados todo dia 20 do mês e enviados pra contabilidade, base pra obter os descontos fiscais do programa junto ao governo.

Três telas: um dashboard pessoal (horas apontadas vs. já `Lançado`), a lista de projetos com progresso de horas, e o apontamento em si — que aceita **múltiplos intervalos de hora** por atividade. `Duração` (calculada) e `Duração Real` (preenchida à mão) ficam lado a lado de propósito: funcionam como conferência cruzada pra contabilidade não repassar um valor errado no fechamento fiscal.

```powerfx
// um intervalo de hora por linha, ligado à atividade
ForAll(dataHoraMultiplas,
    Patch(Horas_Apontadas_1, Defaults(Horas_Apontadas_1), {
        Atividade: {Value: Form1_1.LastSubmit.Atividade, Id: Form1_1.LastSubmit.ID},
        'Hora Inicio': TimeValue(HoraInicio), 'Hora Fim': TimeValue(HoraFim),
        Duração: DateDiff(TimeValue(HoraInicio), TimeValue(HoraFim), TimeUnit.Minutes) / 60
    })
);
```

## Equipamentos

Consulta de equipamentos de teste/laboratório com registro e histórico de manutenção, feito pra manter a conformidade com a norma **ISO 17025**. O cadastro mestre de equipamento não é uma lista SharePoint: vem direto, somente leitura, de um conector **SQL** pro banco do OTS (o sistema de apontamentos do CTR, de um fornecedor terceiro) — o app combina esse dado transacional externo com o próprio histórico de manutenção, gravado em SharePoint.

Um técnico do setor de Suporte Eletrônico registra cada evento (status, prioridade, executor, tipo de manutenção, datas, correção aplicada, foto), e uma tela separada de histórico filtra tudo por equipamento ou setor.

```powerfx
// releitura forçada do cadastro somente-leitura vindo do OTS via SQL
Refresh(RecursosSQL_OTS);
ClearCollect(colEquiSE, RecursosSQL_OTS)
```

## Outros apps do ecossistema

A **Homepage** do CTR centraliza links pros sistemas e processos internos (lista dirigida por dado, com favoritos e contagem de cliques), banners de comunicação interna e um painel lateral com o calendário de visitas de clientes agendadas.

---

_Apps em produção no CTR (Randon Group). Fórmulas e nomes de lista foram simplificados pra leitura._
