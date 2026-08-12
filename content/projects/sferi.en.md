<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/projects/sferi/logo_black.svg">
  <img alt="sferi" src="/projects/sferi/logo_black.svg" width="180">
</picture>

### a design tool built from scratch on the HTML canvas

**[sferi.vercel.app](https://sferi.vercel.app)**

---

## About

[sferi](https://sferi.vercel.app) is a Figma-inspired design tool (shapes, frames, typography, gradients, image fills, groups, layers, the works) built from scratch on the HTML canvas, via [Konva](http://konvajs.org/), as a personal deep-dive into how canvas-based editors actually work under the hood: hit-testing, transforms, clipping, undo history, all of it.

##

![Empty canvas, dark mode](/projects/sferi/1-overview.png)

**Editing a fill.** Shapes and text placed on the frame, the color picker open on the selected layer, editing its hex value directly.

![Editing a fill color on the selected text layer](/projects/sferi/2-editing.png)

**A finished layout.** Frame, text, star and ellipse, each its own entry in the layers panel on the left.

![Finished layout with the layers panel listing every object](/projects/sferi/3-layout.png)

**The frame, cropped.** The same layout, isolated to just the 512x512 frame.

![Cropped view of the finished frame](/projects/sferi/4-poster.png)

## Stack

- React 19 + TypeScript
- Vite, with `@vitejs/plugin-react` and `vite-plugin-svgr`
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Konva / react-konva for the canvas rendering engine
- GSAP + `@gsap/react` for animation (the intro on the logo, mostly)
- Base UI primitives, styled shadcn-style, in `components/ui`
- Phosphor Icons and Tabler Icons
- react-resizable-panels and react-rnd for the panel layout
- jsPDF for PDF export
- ESLint + typescript-eslint

## Features

- Frames and shapes (rectangle, ellipse, triangle, polygon, star, seal)
- Rich text, with solid, gradient or image fills
- Borders with inside, center or outside positioning
- Per-corner radius, groups and a draggable layers panel
- Align and distribute, full undo and redo
- Copy, cut, paste, duplicate, zoom and pan
- Keyboard shortcuts, light and dark themes

## On backlog

- A pen tool for custom vector paths
- Line and arrow tools
- Clip paths
- SVG/vector import
- Drag-and-drop importing for images and SVGs
- Saving/loading whole projects as files

## License

MIT, see [LICENSE](LICENSE).

<br>

<sub>ᕕ(⌐■_■)ᕗ ♪♬</sub>
