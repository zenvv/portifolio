<!-- Post de projeto do portfólio (zenvv.dev). Redesign do site institucional
     da Bello Aramados. Imagens comparativas em ./images/. -->

# Website Institucional — Bello Aramados

Redesign completo do site institucional da **Bello Aramados**, metalúrgica de arames, aramados, grades e telas com duas unidades (Caxias do Sul e Piracicaba). A estrutura de páginas, os endereços (URLs) e o conteúdo continuam os mesmos — o que mudou foi a **aparência, a organização das informações e a experiência de navegação**, especialmente no celular. Stack: **PHP (CodeIgniter)** no backend, **CSS puro** e JavaScript pontual no frontend.

## Contexto

Cerca de **90% das alterações são de layout e design**. O restante é bastidor: proteção do formulário de contato contra spam, suporte a múltiplos idiomas, acessibilidade e otimização para busca.

> Nos comparativos abaixo, cada imagem mostra **Antes — Site Antigo** à esquerda e **Depois — Site Atual** à direita.

## Cabeçalho e rodapé

No cabeçalho, o **selo ISO 9001:2015** passou a ficar em evidência ao lado da marca, o contato comercial virou um ícone de telefone + "Comercial" (antes era um texto longo com o número por extenso), e o menu do celular foi refeito do zero: abre em tela cheia, com a marca e o selo no topo, itens de navegação em lista e um botão de contato ao final.

No rodapé, telefone e e-mail viraram cartões com ícone, os endereços das duas unidades ganharam hierarquia mais clara, e corrigi um bug em que o ícone do Facebook apontava para o Instagram da empresa.

## Home

<figure>
  <img src="/projects/bello-website/images/home--desktop.png" alt="Comparativo da página inicial">
  <figcaption>Antes (esquerda) e depois (direita) da página inicial.</figcaption>
</figure>

O topo passou a ocupar a tela inteira, com a fábrica ao fundo e uma barra indicando o tempo de troca do slide. A grade de setores de atuação (Ventilação, Avicultura, Automotivo, Gastronomia, Armazenagem, Energia Solar) foi redesenhada com ícones. E um carrossel de imagens pouco informativo deu lugar a uma seção institucional de verdade: processos de solda com vídeo real da produção, materiais trabalhados, diferenciais da empresa e as duas unidades lado a lado.

## Sobre

<figure>
  <img src="/projects/bello-website/images/sobre--desktop.png" alt="Comparativo da página Sobre">
  <figcaption>Antes (esquerda) e depois (direita) da página Sobre.</figcaption>
</figure>

Missão, Visão e Valores ganharam ícone e um enquadramento mais organizado. A mudança maior foi a **linha do tempo**: era um carrossel horizontal com setas, virou uma trilha vertical que se preenche conforme o visitante rola a página, com os marcos alternando entre esquerda e direita.

## Serviços

<figure>
  <img src="/projects/bello-website/images/servicos--desktop.png" alt="Comparativo da página Serviços">
  <figcaption>Antes (esquerda) e depois (direita) da página Serviços.</figcaption>
</figure>

Cada etapa do processo produtivo (Projeto, Matéria-prima, Corte, Dobra, Montagem, Acabamento, Expedição) ganhou ícone próprio e passou a ser ligada por setas de fluxo, em vez de círculos soltos numa linha. A seção de equipamentos foi reorganizada com o vídeo do maquinário como plano de fundo, e o bloco final de contato ganhou imagem e um botão de estilo padronizado.

## Produtos

<figure>
  <img src="/projects/bello-website/images/produtos--desktop.png" alt="Comparativo da página Produtos">
  <figcaption>Antes (esquerda) e depois (direita) da página Produtos.</figcaption>
</figure>

A faixa de destaque agora troca a imagem de fundo conforme a categoria selecionada, e a grade de produtos passou a filtrar de verdade por categoria. As fotos ficaram ampliáveis, e a caixa de "Soluções personalizadas" foi reposicionada junto à listagem. URLs antigas de categoria continuam funcionando, redirecionando para as novas.

## Contato

<figure>
  <img src="/projects/bello-website/images/contato--desktop.png" alt="Comparativo da página Contato">
  <figcaption>Antes (esquerda) e depois (direita) da página Contato.</figcaption>
</figure>

Cada campo do formulário ganhou ícone e exemplo de preenchimento, o seletor de objetivo do contato virou botões, e o botão "Enviar" fica desabilitado com um aviso até o formulário estar completo. O mapa das unidades saiu de ao lado do formulário (onde sobrepunha o conteúdo em telas menores) para ocupar a largura toda, abaixo dele.

## Por trás da tela

| Área | O que mudou |
|---|---|
| **Formulário de contato** | Proteção anti-spam (campo oculto + intervalo mínimo entre envios) e novo modelo de e-mail de notificação |
| **Acessibilidade** | Indicador de foco para navegação por teclado, respeito à opção "reduzir animações" do sistema, textos alternativos em imagens e link "pular para o conteúdo" |
| **Idiomas** | O idioma declarado da página (pt-br / en / es) passou a refletir corretamente a navegação |
| **CSS** | Cores, tipografia e espaçamentos centralizados num único lugar — antes o mesmo botão era recriado em 5 arquivos diferentes |

---

_Site em produção na Bello Aramados. Nomes de arquivo e classes foram simplificados para leitura._
