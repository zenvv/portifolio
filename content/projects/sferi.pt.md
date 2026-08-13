<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/projects/sferi/logo_black.svg">
  <img alt="sferi" src="/projects/sferi/logo_black.svg" width="180">
</picture>

### uma ferramenta de design construída do zero sobre o HTML canvas

**[sferi.vercel.app](https://sferi.vercel.app)**

---

## Sobre

[sferi](https://sferi.vercel.app) é uma ferramenta de design inspirada no Figma
(formas, frames, tipografia, gradientes, preenchimento com imagem, grupos, camadas,
tudo isso) construída do zero sobre o HTML canvas, via [Konva](http://konvajs.org/),
como um mergulho pessoal em como editores baseados em canvas realmente funcionam por
baixo dos panos: hit-testing, transformações, clipping, histórico de undo, tudo.

##

![Canvas vazio, modo escuro](/projects/sferi/1-overview.png)

**Editando um preenchimento.** Formas e texto colocados no frame, o seletor de cor
aberto na camada selecionada, editando o valor hexadecimal diretamente.

![Editando a cor de preenchimento na camada de texto selecionada](/projects/sferi/2-editing.png)

**Um layout finalizado.** Frame, texto, estrela e elipse, cada um com sua própria
entrada no painel de camadas à esquerda.

![Layout finalizado com o painel de camadas listando cada objeto](/projects/sferi/3-layout.png)

**O frame, recortado.** O mesmo layout, isolado apenas ao frame de 512x512.

![Visão recortada do frame finalizado](/projects/sferi/4-poster.png)

## Stack

- React 19 + TypeScript
- Vite, com `@vitejs/plugin-react` e `vite-plugin-svgr`
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Konva / react-konva para o motor de renderização do canvas
- GSAP + `@gsap/react` para animação (a intro da logo, principalmente)
- Primitivas do Base UI, estilizadas no estilo shadcn, em `components/ui`
- Phosphor Icons e Tabler Icons
- react-resizable-panels e react-rnd para o layout dos painéis
- jsPDF para exportação em PDF
- ESLint + typescript-eslint

## Funcionalidades

- Frames e formas (retângulo, elipse, triângulo, polígono, estrela, selo)
- Texto rico, com preenchimento sólido, gradiente ou imagem
- Bordas com posicionamento interno, central ou externo
- Raio por canto, grupos e um painel de camadas arrastável
- Alinhar e distribuir, undo e redo completos
- Copiar, recortar, colar, duplicar, zoom e pan
- Atalhos de teclado, temas claro e escuro

## Próximos passos

- Uma ferramenta de caneta para caminhos vetoriais customizados
- Ferramentas de linha e seta
- Clip paths
- Importação de SVG/vetor
- Importação por arrastar-e-soltar para imagens e SVGs
- Salvar/carregar projetos inteiros como arquivos

## Licença

MIT, veja [LICENSE](LICENSE).

<br>

<sub>ᕕ(⌐■_■)ᕗ ♪♬</sub>
