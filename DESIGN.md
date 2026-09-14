# Design

<!-- impeccable:design-schema 1 -->

## Name

Papel & Grade ("Paper & Grid"), a measured-drawing register: paper-and-ink neutrals, fine grid hairlines, registration marks and coordinate ticks, with the brand yellow spent only on details.

## Color

Restrained strategy: warm paper/ink neutrals plus one accent, never a second hue.

- `--background` / `--foreground`: warm paper `#F6F4EE` / warm ink `#201D18` (light); warm near-black `#17140F` / warm off-white `#EEE9DD` (dark, the default theme for new visitors).
- `--card` / `--popover`: a shade lighter than background in each theme (`#FBFAF6` light, `#201C14` dark).
- `--muted`, `--secondary`, `--accent` (shadcn's neutral hover token, distinct from the brand accent below): one shared warm-gray surface per theme (`#ECE6D6` light, `#2B2519` dark).
- `--muted-foreground`: `#86806E` light, `#9C9483` dark.
- `--border` / `--input`: `#DDD6C4` light, `#342E22` dark.
- `--primary` / `--ring` (the brand accent): `#F2A900` in both themes, a tuned-down version of `/public/logo.svg`'s `#FFAE00`, with `--primary-foreground` set to the theme's ink color so text on a yellow surface is always dark. Spent only on: the hero CTA, project-card index badges, `ImpactStats` values, "Solution" label, focus rings. Never on headline or body text: the italic hero name and section titles stay on the ink/paper scale.
- `--destructive`: left at the shadcn default red-orange in both themes (semantic, not brand).
- `--radius`: `0rem`, every corner, everywhere, per an explicit follow-up brief ("padronizar todos os botões pra serem quadrados", "remover bordas arredondadas num geral"). This zeroes every `rounded-sm/md/lg/xl/2xl/3xl/4xl` usage sitewide (all shadcn primitives included) through the theme scale; the handful of hardcoded `rounded-full` buttons that sit outside that scale (hero CTA, lightbox chrome, disclosure triggers) were edited individually to drop the class. `components/ui/carousel.tsx` and `components/ui/switch.tsx` still carry `rounded-full` but are dead code (unused anywhere in the app); left alone rather than edited for no visible effect.

## Type

Three-role system, each role fixed to one typeface, never mixed within a role:

- **Display** (`--font-heading`, `font-heading` utility): `Fraunces Variable`, italic for the hero name and every project-title moment (`ProjectCard`, `FeaturedBanner`, project detail `<h1>`); upright medium weight for structural section titles (`SectionTitle`, used by Experience/Education/Contact/project-group headings, and by every shadcn Dialog/Sheet/Card title since those primitives already carried the `font-heading` class before this redesign).
- **Body** (`--font-sans`, the default `font-sans`): `Public Sans Variable`, all paragraph copy, descriptions, nav links, buttons.
- **Annotation** (`--font-mono`, `font-mono`): `IBM Plex Mono` (latin 400/500/600): every uppercase eyebrow/label that survived the floor review (hero role line only; see Structure), tech-line lists, meta rows (company · date), project-card index badges, ruler-tick numerals, the `@zenvv` handle under the logo.

Google-Fonts-cliché faces (Inter/Space Grotesk as "the safe face") and the AI-cliché cream+serif combination were deliberately avoided per the skill's calibration list; Fraunces/Public Sans/IBM Plex Mono were pinned by the user against a mocked comparison before this build started, not chosen from that list at build time.

## Structure: the shared grammar

A "technical drafting" vocabulary reused at varying intensity instead of a literal theme, so it reads as one system rather than a costume. `<Scales>` (the app's original diagonal-hatch divider) was removed entirely in a follow-up pass at the user's request; every place it marked a section boundary now uses a plain `border-t`/`border-b` hairline instead.

- **`<CornerMarks>`** (`components/CornerMarks.tsx`): four small "+" registration marks pinned to a `relative` ancestor's corners. Used on the home hero only (removed from the project-detail masthead in the follow-up pass; see below).
- **`<RulerTicks>`** (`components/RulerTicks.tsx`): a full-bleed row of coordinate numerals between two dashed hairlines. Used once, closing the hero.
- **`.bg-blueprint-grid`** (`src/index.css`): a 27px two-axis hairline grid at `var(--border)` strength. Reserved for the hero only now: a follow-up brief explicitly asked to remove the grid background from the project-detail masthead ("remover fundo de grade do banner").
- **Index badges**: small mono numeral chips (`01`, `02`, …) on project cards (grid, on the home page) and rows (running list, on the projects page), a deliberate brief-pinned "catalog plate" device kept through two rounds of otherwise-heavy simplification.
- **`SectionTitle`** (`components/SectionTitle.tsx`): redesigned in the follow-up pass from a centered pill floating on a masked divider line to a mono uppercase label flanked by real hairline rules (`align` still controls where the label sits: start/center/end). Used for every section heading site-wide (Contato, Sobre mim, Experiência, Educação, project-list groups) plus, unusually, the desktop `TableOfContents` and `ArticleImageIndex` rail labels which echo the same register without using the component itself.

## No modals for disclosure (follow-up pass, still holds)

A second brief asked for a quieter, more static site. Its modal-avoidance half still holds: three `Dialog`-based popups became inline `Collapsible`s: `StackSection`'s "show all technologies" (`components/home/Stack.tsx`). `AboutPersonal`'s old "Fotos"/"Músicas" collapsibles were later removed outright (see About/Experience/Education/Personal below), not just de-modaled. The markdown-embedded image lightbox (`components/markdown/MarkdownCarousel.tsx`) is explicitly exempt: it's a media viewer, not an information-disclosure modal.

Its animation-avoidance half was **lifted by a later brief**: the original "no entrance animations" ask was a reaction to a specific buggy implementation, not a standing ban on motion. Screen-transition animations stay off (route changes are still instant; the `::view-transition-*` neutralization in `src/index.css` is untouched), but scroll-triggered reveals are back and now used deliberately, once per surface, each playing exactly once on first scroll-into-view (respecting `prefers-reduced-motion`):

- **`ProblemSolution`** (project detail): the block's signature moment. On scroll-into-view, the problem's list items (or paragraph) stagger in first, then a connecting line/arrow draws, then the solution card scales and fades in as the block's clear point of emphasis: a real animate-in-stages transformation, not a static two-column pair.
- **`ImpactStats`** (home): the three count-based metrics (`+25`/`+18`/`+60`) count up from 0 once the section scrolls into view, via `requestAnimationFrame` + ease-out-cubic: the SaaS-style "numbers ticking up" read the brief asked for.

Both use `motion/react`'s `useInView`/`useReducedMotion` (same library already used by `Hero`'s letter-hover interaction), triggered `once`, and both are the *one* authored moment for their surface rather than a scattered pile of entrance effects.

## Projects list (follow-up pass)

Rebuilt per an explicit brief: search bar and the tech/company multi-select filters are gone; `ProjectsFilterPanel` is now a plain row of type-only chips (`components/.../ProjectsFilterPanel.tsx`, no search, no popovers, no sliding indicator). The featured-carousel banner (`FeaturedBanner.tsx`) is deleted. Cards became rows: `ProjectListRow.tsx` (new): thumbnail left, title/description/tech-line stacked right, one hairline between rows, replacing the 3-column grid on this page only (the home page's `FeaturedProjects` grid still uses the original `ProjectCard`). Group order changed to lead with personal projects, client work after.

## Project detail (follow-up pass)

- The masthead (title/meta/description) is centered, the type icon is gone, and the grid background/corner marks were removed from it (kept only on the home hero).
- Tech-stack chips moved from inside the masthead to below the banner image.
- A sticky sub-nav (`top-16`, right under the main `Navbar`) replaced the old plain back-link bar: **back** left, the project name **center** (absolutely centered, not just flexbox `justify-between`, which drifted off-center whenever the two side groups differed in width, fading in via an `IntersectionObserver` on the `<h1>` once it scrolls out of view), **actions** (Github/"Abrir") right. A third follow-up brief reordered this from an earlier left-actions/right-back layout.
- `TableOfContents` and the new `ArticleImageIndex` (`components/markdown/ArticleImageIndex.tsx`, caps at 6 thumbnails: the 6th gets a dimmed "+N" overlay instead of a 7th tile) moved to the left of the markdown column and live inside `SidebarRail` (`components/markdown/SidebarRail.tsx`): a genuinely `fixed`-position panel, not `sticky`: a hidden placeholder reserves the column's width in flow (so the article doesn't shift) while the visible panel tracks that placeholder's `left` (on resize) *and* `top` (on scroll, clamped to never rise above the target offset), so it starts exactly where the placeholder begins (i.e. at the article text, not floating over the masthead/banner above it, a bug in an earlier pass that only recomputed `left`) and only locks to the fixed offset once the page has scrolled that far, and it never drifts over the content below it the way a plain `sticky` nav could once its own content list ran long. `TableOfContents` was split into the plain nav content (goes in the rail) and `TableOfContentsMobile` (the FAB+Sheet, rendered separately since it must never be hidden below `xl`).
- `ProblemSolution` redesigned around a centered title and a three-stage scroll-triggered reveal (problem lists in → a line/arrow draws → the solution card forms with more visual weight: a primary-tinted border and background, larger padding); see the animation note above. The transformation is the point of the block, so it's drawn and staged, not just implied by two static adjacent labels.
- `.prose` restyled: links use `--primary` in both themes (was a hardcoded blue split by theme), headings use `font-heading`, blockquotes are a plain left-border callout in `--primary` (was a gradient wash), inline code sits on `--muted` instead of `foreground/10`.
- A "Voltar ao topo" button closes the article, above the new sitewide footer.

## About/Experience/Education/Personal (follow-up pass)

Collapsed from five stacked, separately-headed sections into one "Sobre mim" region: a centered `SectionTitle`, then a 2-column split (`sm:grid-cols-2`), **left column**: the bio paragraph, then `AboutPersonal` (Fora do expediente); **right column**: `CompanySection` (Experiência) stacked over `EducationSection` (Educação), swapped from an earlier pass that put Experience/Education on the left. Mobile stacks to one column in that same DOM order (bio → personal → experience → education) without responsive `order-*` hacks. `SectionTitle` calls inside the nested sections use `align="start"` (a left label with a trailing rule). Education dropped its second ("Ensino Médio") entry: only the ongoing IFRS degree remains, on the reasoning that a high-school line doesn't add signal next to a Systems Analysis and Development degree.

`AboutPersonal` no longer hides anything behind disclosures: the photo scatter (`FloatingGallery`) shows 7 photos (a fresh random slice of the pool shuffled on each mount, not a fixed first-five) with no "show more photos" escape hatch to a full masonry grid (`PhotoMasonry.tsx` was deleted as a result, being left with no caller). The songs list (`components/home/Songs.tsx`, now `SongsList`) is inline below the teaser paragraph too, simplified from artwork-thumbnail cards to plain rows (track · artist, with a low-opacity arrow that brightens on hover to signal the link without requiring a hover to discover it), with no "show songs" toggle either. The teaser copy itself was rewritten to read as a closing personal note rather than a meta-description of the section.

## Footer

`components/Footer.tsx`, mounted once in `App.tsx` outside the `max-w-7xl` route content so it spans full width like `Navbar`. Rebuilt from scratch on a later brief replacing the earlier "live schematic" (wired SVG traces to contact terminals) with a plainer, calmer layout: a full-bleed band in `bg-muted` (a shade lighter/distinct from the page's own background in both themes, no grid texture, no corner marks), name + `@zenvv` on the left, the four `socials` as icon-only links on the right, and a giant `font-heading italic` "zenvv" watermark bleeding across the background at ~5% foreground opacity: decorative texture, not another composition competing with the two real content groups in front of it.

## Navbar

Logo left; a row of four icon-only contact buttons (GitHub/LinkedIn/email/WhatsApp, reusing `socials` from `components/sidebar/Contact.tsx`), hidden below `sm` to keep the bar uncluttered on narrow screens; language selector + theme toggle right. Only the wordmark (italic Fraunces + mono handle) and the header's hairline (solid → dashed) were restyled beyond that.

## Contact (home)

Rebuilt from a loose row of ghost-variant icon buttons into `ContactGrid` (a named export of `components/sidebar/Contact.tsx`, alongside the original button-row `ContactLinks` which a now-dead `NavLinks.tsx` still references): a 2×2 (1-column on mobile) grid of full rows: icon, label, a short caption (a translated one-liner for GitHub/LinkedIn/WhatsApp, the literal address for email), an outbound arrow that nudges and tints primary on hover, divided by hairlines rather than individually boxed/shadowed cards, so it reads as one bordered block in the same register as `ImpactStats`' stat grid rather than a generic card grid. A one-line subheading under the "Contato" `SectionTitle` gives it a lead-in.

## Impact stats (home)

Rebuilt with the brief's specific numbers and a SaaS-metrics feel: a highlighted "process time cut" block (two before→after reductions, `6h → 20min` and `1h30 → 15min`, each with its own caption) above a 3-column grid of count-up stats (`+25` processos automatizados, `+18` apps em Power Platform, `+60` fluxos de automação) that animate from 0 once the section scrolls into view. Given a real `SectionTitle` ("Meu desempenho"/"My track record", with a `ChartLineUpIcon`) for the first time: the earlier floor-review ban was on a *decorative label floating above* the numbers with no heading structure of its own; this is the section's actual heading, in the same component every other section (Contato, Sobre mim, Educação, Experiência) already uses, not a second label stacked over one.

## Stack (home)

`FeaturedTileDesktop` (icon + always-visible name pill) replaced with `FeaturedIconTile`: icon-only, larger (`size-12`/`size-14`), the name and "learning" status moved into a `Tooltip` on hover/focus instead of sitting in the flow: the row reads as a clean mark grid, centered, rather than a wrapped list of labeled pills. The "show all" `CollapsibleTrigger` moved out of that row into its own centered line below it.

## Projects page width bug (follow-up pass)

The page's root `<div>` was missing `w-full min-w-0` (present on the Home and Detail page roots); inside `App.tsx`'s flex row, a flex item with no explicit width falls back to its content's intrinsic min-width, so the whole page's measured width silently tracked whichever project titles/rows happened to be longest. Fixed by matching the other two pages' root className.

## What the floor review changed

An independent finish-reviewer pass (adapted for this code-led, user-pinned build; see `index.html`'s direction-contract comment) flagged the mono-label-above-heading "kicker/eyebrow" pattern as a hard, brief-independent ban. Two clearly decorative instances were removed as a result: `FeaturedProjects`' split "Projetos de" / "em Destaque" two-line treatment (now one `<h2>`, `t.hero.projects.title`) and `ImpactStats`' floating "Em números" label (removed outright: the yellow numbers read as stats without it). The hero's role line ("desenvolvedor de software · ui/ux designer") was kept: it functions as a subtitle under a name, not a decorative kicker over a heading that would otherwise speak for itself, and it was the direction contract's explicit, user-approved FIRST VIEWPORT commitment.

## Fonts installed

`@fontsource-variable/fraunces` (+ `wght-italic.css`), `@fontsource-variable/public-sans`, `@fontsource/ibm-plex-mono` (`latin-{400,500,600}.css`). Removed: `@fontsource-variable/{sora,azeret-mono,inter,bricolage-grotesque}` (all unreferenced after the swap; `inter` and `bricolage-grotesque` were already dead weight before this redesign).
