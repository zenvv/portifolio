<picture>
  <source media="(prefers-color-scheme: light)" srcset="/projects/not-my-typo/logo-NMT-comfundo.svg">
  <img alt="Not My Typo" src="/projects/not-my-typo/logo-NMT-comfundo.svg" width="360">
</picture>

# NOT MY TYPO

<p><em>um clone estilo monkeytype.com</em></p>

<picture>
  <a href="https://not-my-typo.vercel.app" target="_blank">
  <img alt="Not My Typo" src="/projects/not-my-typo/play-it-button.png" width="180px" >
  </a>
</picture>

## Sobre

**Not My Typo** é um clone feito do zero da experiência de teste de digitação do
[monkeytype.com](monkeytype.com): as palavras passam pela tela, você digita, e o app
acompanha suas palavras por minuto, precisão, consistência e erros.

Foi construído primeiro como projeto de prática/aprendizado, com uma camada de
customização profunda encaixada em seguida: temas, fontes, raio de borda, estilo do
cursor, sons de digitação e exibição de estatísticas são todos configurações de
primeira classe, voltadas ao usuário, e não um acréscimo de última hora.

Não há sistema de contas, backend nem placar. Tudo roda no cliente e persiste no
`localStorage`.

## Preview

<picture>
  <img alt="Not My Typo" src="/projects/not-my-typo/screenshot3.png" >
</picture>

## Funcionalidades

- **Quatro modos de teste**: contagem fixa de palavras (30/60/90), cronometrado
  (15s/30s/60s), zen (sem tempo, infinito) e citações;
- **Estatísticas ao vivo e finais que nunca divergem**: WPM bruto e apenas-correto,
  precisão, consistência e contagem de erros são calculados pelas mesmas funções puras
  tanto para o HUD em tempo real quanto para a tela de resultados;
- **Seis idiomas**: inglês, português (Brasil), francês, espanhol, alemão e italiano.
  As listas de palavras são buscadas ao vivo de uma [API gratuita de palavras](https://random-word-api.herokuapp.com/home)
  e caem instantaneamente para listas locais embutidas caso essa API esteja lenta ou
  inacessível, então um teste nunca trava ou quebra no meio;
- **Filtro de raridade de palavras**: um seletor opcional de dificuldade (de palavras
  bem comuns a propositalmente raras);
- **Customização orientada por configuração**: 14 paletas de cores, 11 famílias de
  fontes (monoespaçada, sem serifa e serifada), 4 predefinições de raio de canto,
  tema claro/escuro/sistema, 3 estilos de cursor e um pacote de sons de digitação
  estilo teclado mecânico com volume ajustável.

<picture>
  <img alt="Not My Typo" src="/projects/not-my-typo/screenshot2.png" >
</picture>

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [zustand](https://zustand.docs.pmnd.rs/) para o único pedaço de estado ligado à taxa
  de digitação que precisa re-renderizar independente do resto
- [Phosphor Icons](https://phosphoricons.com/) e [Lucide](https://lucide.dev/)

---

Feito e desenhado por [zenvv](https://github.com/zenvv) :-)
