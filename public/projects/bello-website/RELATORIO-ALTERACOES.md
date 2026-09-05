# Bello Aramados — Relatório de Alterações do Site

**Versão anterior → Nova versão** · Documento para revisão (base do PDF de entrega)

---

## Visão geral

O site da Bello Aramados passou por uma **repaginação visual completa**. A estrutura de
páginas, os endereços (URLs) e o conteúdo continuam os mesmos — o que mudou foi a
**aparência, a organização das informações e a experiência de navegação**, especialmente
no celular.

Em números: cerca de **90% das alterações são de layout e design**. O restante são
melhorias de funcionamento que não aparecem diretamente na tela (proteção do formulário
de contato contra spam, suporte a idiomas, acessibilidade e otimização para busca).

**Principais destaques:**

- Novo cabeçalho e rodapé, com o **selo ISO 9001:2015** em evidência.
- Página inicial reconstruída: processos de solda em vídeo, materiais trabalhados,
  diferenciais e as duas unidades (Caxias do Sul e Piracicaba).
- Página **Sobre** com linha do tempo interativa (rola conforme a página desce).
- Página **Serviços** com o processo produtivo ilustrado passo a passo.
- Página **Produtos** com destaque visual por categoria e filtro de produtos.
- **Formulário de contato** mais guiado (exemplos em cada campo, aviso do que falta
  preencher) e com proteção anti-spam.
- Site inteiro adaptado para leitura em celular e para navegação por teclado/leitor de tela.

> **Como ler os comparativos:** em cada seção, a imagem mostra **Antes — Site Antigo** à
> esquerda e **Depois — Site Atual** à direita.

---

## 1. Cabeçalho e Rodapé (todas as páginas)

### Cabeçalho

**O que mudou:**

- **Selo ISO 9001:2015** adicionado ao lado da marca (e também no topo e no menu do celular).
- Contato comercial ficou mais direto: ícone de telefone + **"COMERCIAL"**
  (antes era o texto "Falar com comercial (54) 3416.5069").
- Os ícones de redes sociais e o botão **"Orçar Projeto Personalizado"** saíram do topo
  (as redes sociais continuam no rodapé).
- **Menu do celular refeito**: abre em tela cheia, com a marca e o selo ISO no topo,
  itens de navegação em lista com indicação da página atual e um botão "Falar com Comercial"
  ao final.
- A página inicial ganhou um cabeçalho com tratamento visual próprio (sobre a imagem do hero).

*Referência técnica:* `application/modules/comum/views/header.php`; estilos em
`comum/assets/css/main.css` (classes `.home-header`, `.logo-iso-seal`,
`.menu-mobile-header`, `.menu-mobile-nav`, `.menu-mobile-cta`).

### Rodapé

**O que mudou:**

- Telefone e e-mail agora aparecem como **cartões com ícone** (antes era uma lista simples).
- Endereços das **duas unidades** (Caxias do Sul e Piracicaba) reorganizados com ícone de
  localização e hierarquia mais clara.
- Bloco de navegação renomeado de "Navegação" para **"Atalhos:"**, com ícone de link em cada item.
- Correção: o primeiro ícone de rede social agora leva de fato ao **Facebook** da empresa
  (antes o ícone do Facebook apontava para o Instagram).
- Linha e textura decorativas para dar acabamento à seção.

*Referência técnica:* `application/modules/comum/views/footer.php`; classes `.contact-box`,
`.box-text__city`, `.footer-line`, `.footer-grid-bg` em `main.css`.

---

## 2. Página Inicial (Home)

![Comparativo Home — desktop](_screenshots/comparativo/home--desktop.png)

**O que mudou:**

- **Topo (hero):** ocupa a tela toda com a foto da fábrica ao fundo; o contador "1/4" saiu;
  o texto entra com uma animação suave e há uma barra que indica o tempo de troca do slide.
- **Setores de atuação:** a grade de categorias (Ventilação, Avicultura, Automotivo,
  Gastronomia, Armazenagem, Energia Solar) foi redesenhada, mais limpa e com ícones.
- **Nova seção institucional** (substitui um carrossel de imagens que era pouco informativo):
  - **Processos de solda** — Solda Ponto, Solda Projeção e Solda MIG, com vídeo curto real
    da produção.
  - **Materiais** — Aço Carbono, Aço Inox e Aço Galvanizado.
  - **Diferenciais** — "Equipe qualificada" e "Qualidade garantida".
  - **Unidades** — cartões de Caxias do Sul e Piracicaba com foto e link "Onde encontrar".
- Botão de chamada alterado de "Sobre" para **"Saiba mais"**.

*Referência técnica:* `application/modules/home/views/home.php`,
`home/assets/css/home.css`, `home/assets/js/home.js`. Principais blocos novos:
`.machine-card`, `.about__materials`, `.about__feature`, `.about__unit`, `.banner-timer`.

---

## 3. Página Sobre

![Comparativo Sobre — desktop](_screenshots/comparativo/sobre--desktop.png)

**O que mudou:**

- **Missão, Visão e Valores** agora têm ícone e um enquadramento mais organizado.
- **Linha do tempo redesenhada:** era um carrossel horizontal com setas; virou uma
  **trilha vertical** (marcos alternando entre esquerda e direita) que se preenche
  conforme o visitante rola a página. Ao final, um bloco de fechamento com chamada
  "Ver nossos produtos".
- Título principal ajustado para ser reconhecido como título da página (melhora o
  posicionamento em buscas).

*Referência técnica:* `application/modules/sobre/views/sobre.php`,
`sobre/assets/css/sobre.css`, `sobre/assets/js/sobre.js`. Blocos novos:
`.timeline-track`, `.item-timeline--left/--right`, `.timeline-final`, `.value__icon`.

---

## 4. Página Serviços

![Comparativo Serviços — desktop](_screenshots/comparativo/servicos--desktop.png)

**O que mudou:**

- **Processo produtivo ilustrado:** cada etapa (Projeto, Matéria-prima, Corte, Dobra,
  Montagem, Acabamento, Expedição) ganhou um ícone, e as etapas são ligadas por setas de
  fluxo (antes eram apenas círculos numa linha).
- **Seção "Equipamentos de Ponta"** reorganizada: o vídeo dos equipamentos vira um plano
  de fundo com o texto dividido em introdução + complemento, e há um cartão de vídeo
  dedicado do maquinário.
- **Bloco "Tenho um Projeto"** ganhou imagem de fundo e botão de estilo padronizado
  (antes era só um título com link).

*Referência técnica:* `application/modules/servicos/views/servicos.php`,
`servicos/assets/css/servicos.css`. Blocos novos: `.step__icon`, `.step__arrow`,
`.timeline__connector`, `.equipments__bg`, `.equipments__video-card`, `.project__media`.

---

## 5. Página Produtos

![Comparativo Produtos — desktop](_screenshots/comparativo/produtos--desktop.png)

**O que mudou:**

- **Faixa de destaque por categoria:** ao selecionar uma categoria, a imagem de fundo da
  faixa muda com uma transição suave.
- **Filtro de produtos:** a grade passa a mostrar só os produtos da categoria selecionada,
  com um aviso "Selecione outra categoria para ver mais produtos".
- As fotos dos produtos podem ser **ampliadas** (abrem em destaque ao clicar).
- Caixa **"Soluções personalizadas"** reposicionada junto à lista de produtos, com imagem
  ilustrativa e botão "Entrar em contato" (antes dizia só "Contato").
- Ajuste de texto: **"Metalúrgica Bello" → "Bello Aramados"**.
- Endereços antigos de categoria continuam funcionando (redirecionam para o novo).

*Referência técnica:* `application/modules/produtos/views/produtos.php`,
`produtos/assets/css/produtos.css`, `produtos/assets/js/produtos.js`. Blocos novos:
`.products-hero`, `.products-hero__bg`, `.section-divider`, `.products-hint`,
`.product__expand-icon`.

---

## 6. Página Contato

![Comparativo Contato — desktop](_screenshots/comparativo/contato--desktop.png)

**O que mudou:**

- Cada campo do formulário ganhou **ícone** e **exemplo de preenchimento**
  ("Ex: João da Silva", "Ex: (54) 99999-9999", "Ex: nome@empresa.com.br"…).
- O seletor "Qual objetivo?" virou botões (Comercial / Financeiro / Trabalho / Outros).
- Ao anexar currículo (opção "Trabalhe conosco"): filtro de tipo de arquivo (PDF/DOC) e
  botão "×" para remover o anexo.
- **Aviso do que falta preencher:** o botão "Enviar" fica desabilitado com a mensagem
  "Preencha os campos destacados para continuar" até o formulário estar completo.
- O mapa das unidades foi movido para baixo do formulário, ocupando a largura toda
  (antes ficava ao lado, sobrepondo o formulário em algumas telas).

*Referência técnica:* `application/modules/contato/views/contato.php`,
`contato/assets/css/contato.css`, `contato/assets/js/contato.js`. Classes novas:
`.label-icon`, `.submit-row`, `.form-status-hint`, `.file-remove-btn`.

---

## 7. Melhorias que não aparecem no visual

| Área | O que mudou | Referência técnica |
|---|---|---|
| **Formulário de contato** | Proteção anti-spam (campo oculto + intervalo mínimo entre envios); novo modelo de e-mail de notificação; tratamento de erro mais claro no envio | `contato/controllers/Contato.php`, `contato/models/Contato_m.php`, `contato/views/email_notification.php` (novo) |
| **Acessibilidade** | Indicador de foco visível para quem navega por teclado; respeito à opção "reduzir animações" do sistema; textos alternativos em imagens; link "pular para o conteúdo" | `comum/assets/css/shared/accessibility.css` (novo) |
| **Idiomas** | O site declara corretamente o idioma da página (pt-br / en / es) conforme a navegação | `comum/views/layouts/default.php` e demais layouts |
| **Padrão de código visual** | Cores, tipografia e espaçamentos centralizados num único lugar; botões de ação padronizados (antes o mesmo botão era recriado em 5 arquivos) | `comum/assets/css/shared/variables.css` e `buttons.css` (novos) |
| **Textos de título/aba** | Padronizados para "Bello Aramados ∙ [Página]" (havia resquícios de "Aice" e "Bello - …") | vários controllers |

---

### Arquivos de apoio

```
_screenshots/
├── comparativo/          → imagens "Antes | Depois" lado a lado (as usadas neste documento)
│   ├── home--desktop.png
│   ├── sobre--desktop.png
│   ├── servicos--desktop.png
│   ├── produtos--desktop.png
│   └── contato--desktop.png
└── desktop/              → capturas individuais de cada site (1440px)
```
