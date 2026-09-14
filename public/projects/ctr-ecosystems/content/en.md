<!-- English version of pt.md. SharePoint list/column names kept in Portuguese
     (real identifiers); prose translated. Keep the two files in sync. -->

# App Ecosystem: CTR

CTR (Centro Tecnológico Randon) is the Randon Group's proving ground: sample intake, engineering analysis, track operations, production control, safety. Alongside the four flagship apps — [**HSE**](/projects/risk-analysis-app), [**Track Logging**](/projects/pistas), [**Sample Checklists**](/projects/amostras-checklists) and [**PCO Kanban**](/projects/kanban-pco) — I built a set of smaller, more niche supporting apps, all over the same **SharePoint Online** base, no Dataverse.

## CAE Analyses

Logs hours worked against the budget of each CAE (Computer-Aided Engineering) analysis, with a PDF closing report. Each analysis either has an estimated hours budget or is billed per delivered resource, regardless of time spent; without a dedicated tool, tracking how much of the budget had been used depended on manual control.

The home screen shows the user's ongoing analyses, hours already logged and hours left in the budget. There are two ways to log time: a single entry with automatic lunch/off-hours deduction, or multiple manual entries with no deduction. On completion, the app decides the analysis's status on its own — it drops off the "in progress" queue and locks `Duração Real` as the sum of every logged entry.

```powerfx
// hours left in the logged-in user's budget
$"{Text(Sum(Filter(Analises_2, 'Criado por'.DisplayName = User().FullName), 'Duração Estimada') - Sum(Filter(Apontamentos, 'Criado por'.DisplayName = User().FullName), Duração), "[$-pt-BR]##0,#0")} horas restantes para apontar"
```

The closing report uses Power Apps' native `PDF()` function (renders a visual container straight to PDF), unlike the HTML + flow pattern (`criarPDF`/`SalvarHTML`) used in CTR's other apps — an inconsistency between apps in the same ecosystem, but one that solved this use case well.

## Warehouse (Almoxarifado)

Stock CRUD: registers supplies and their consumption/restocking, with each consumption tied to an employee and a service order. Before the app, there was no way to tell what left the warehouse and which service order it was for — consumption was hard to measure, hard to forecast, and there was no way to know how much to charge a client based on it.

The data structure already existed; what the app solved was **usability** for warehouse operators, who had very little familiarity with technology. The entry screen lets someone deduct several materials at once, in a single confirmation: each row discounts stock and logs the consumption at the same time.

```powerfx
// batch deduction: for each logged material, records the consumption and discounts stock
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

## MOVER Timesheets

Timesheet app for the federal **MOVER** program (a tax incentive for development and innovation projects), including the internal **Olimpo** subgroup. Entries had to be compiled on the 20th of every month and sent to accounting, the basis for the program's tax discounts with the government.

Three screens: a personal dashboard (hours logged vs. already `Lançado`), a project list with hours progress, and the timesheet entry itself — which accepts **multiple time intervals** per activity. `Duração` (calculated) and `Duração Real` (filled in by hand) sit side by side on purpose: together they work as a cross-check so accounting doesn't pass a wrong number into the fiscal closing.

```powerfx
// one time interval per row, linked to the activity
ForAll(dataHoraMultiplas,
    Patch(Horas_Apontadas_1, Defaults(Horas_Apontadas_1), {
        Atividade: {Value: Form1_1.LastSubmit.Atividade, Id: Form1_1.LastSubmit.ID},
        'Hora Inicio': TimeValue(HoraInicio), 'Hora Fim': TimeValue(HoraFim),
        Duração: DateDiff(TimeValue(HoraInicio), TimeValue(HoraFim), TimeUnit.Minutes) / 60
    })
);
```

## Equipment

Lookup for test/lab equipment with maintenance event logging and history, built to keep **ISO 17025** compliance. The master equipment registry isn't a SharePoint list: it's read live, read-only, through a **SQL** connector into the OTS database (CTR's third-party timesheet system) — the app combines that external transactional data with its own maintenance history, stored in SharePoint.

An Electronics Support technician logs each event (status, priority, executor, maintenance type, dates, correction applied, photo), and a separate history screen filters everything by equipment or sector.

```powerfx
// forced reload of the read-only registry coming from OTS via SQL
Refresh(RecursosSQL_OTS);
ClearCollect(colEquiSE, RecursosSQL_OTS)
```

## Other apps in the ecosystem

CTR's **Homepage** centralizes links to internal systems and processes (a data-driven list with favorites and click counts), internal-communication banners, and a side panel with the calendar of scheduled client visits.

---

_Apps in production at CTR (Randon Group). Formulas and list names were simplified for readability._
