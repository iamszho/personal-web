@AGENTS.md

# Personal Web — Claude Code Guide

## Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 — `@theme inline` in `src/styles/globals.css`
- **Fonts**: Hanken Grotesk (sans) + JetBrains Mono (mono) via `next/font/google`
- **Language**: TypeScript (strict)

## Project structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout — imports globals.css, mounts fonts
│   └── (app)/
│       ├── layout.tsx      # Group layout — renders Navbar for all inner routes
│       ├── page.tsx        # / home page (Hero + LockScroll)
│       ├── about-me/
│       ├── projects/
│       ├── experience/
│       ├── blog/           # Commented out in Navbar — not available yet
│       └── contact/
├── components/
│   ├── Button.tsx          # Primary / outline / ghost variants, slide animation
│   ├── LockScroll.tsx      # Sets overflow:hidden on <html> — used on / only
│   ├── NeuralBackground.tsx  # Canvas neural net animation (currently unused)
│   ├── SnapScroll.tsx      # Sets scroll-snap-type:y mandatory on <html>
│   ├── VantaBackground.tsx # Vanta DOTS effect (Three.js) — used in Hero
│   ├── layout/
│   │   └── Navbar.tsx      # Sticky navbar — brand link + nav links + Contact CTA
│   └── sections/
│       └── Hero.tsx        # Home hero — full viewport, Vanta background
└── styles/
    └── globals.css         # Tailwind @theme inline — all design tokens
```

## Design tokens (globals.css)
All colours, spacing, and radii are defined as CSS custom properties in `@theme inline` and available as Tailwind utilities. Never use hardcoded hex values — always use the token class.

| Token | Value | Tailwind class |
|---|---|---|
| `--color-primary` | `#00d992` | `bg-primary` / `text-primary` / `border-primary` |
| `--color-canvas` | `#101010` | `bg-canvas` |
| `--color-canvas-soft` | `#1a1a1a` | `bg-canvas-soft` |
| `--color-hairline` | `#3d3a39` | `border-hairline` |
| `--color-ink` | `#f2f2f2` | `text-ink` |
| `--color-ink-strong` | `#ffffff` | `text-ink-strong` |
| `--color-body` | `#bdbdbd` | `text-body` |
| `--color-mute` | `#8b949e` | `text-mute` |

## Font setup (critical)
next/font must use `variable` mode — never `className` mode. The `body` in `globals.css` sets `font-family: var(--font-sans)`, which would bypass next/font entirely if `className` is used.

```ts
// layout.tsx — correct pattern
const hankenGrotesk = Hanken_Grotesk({ variable: "--font-hanken", ... });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", ... });
// apply both .variable to <html>
```

```css
/* globals.css — reference the next/font CSS variable */
--font-sans: var(--font-hanken), system-ui, sans-serif;
--font-mono: var(--font-mono), monospace;
```

## Design rules (from DESING.md)
- Dark canvas only — no light mode.
- Buttons use `rounded-none` (0 px). Cards use `rounded-md` (8 px). Status pills use `rounded-full`.
- Electric green `#00d992` is the single accent — CTAs, active states, brand marks only.
- Hairline `1px solid border-hairline` is the elevation system — no drop shadows on cards.
- Hanken Grotesk for all copy; JetBrains Mono for code, snippets, and eyebrow counters.

## Key conventions
- Add new page sections as components in `src/components/sections/`.
- Add new layout chrome (footer, sidebar) in `src/components/layout/`.
- The `(app)` group layout (`src/app/(app)/layout.tsx`) is the only place to mount shared UI like Navbar — do not import Navbar inside individual pages.
- Never put `max-w-*` on hero headlines or body paragraphs — it creates a visually compressed text block. Let the section container control the width.
- Run `npm run build` to verify before committing.

## Routing
- `/` resolves to `src/app/(app)/page.tsx` — the route group `(app)` does not add to the URL.
- There is no `/home` route. The brand link in Navbar (`iamszho`) links to `/`.
- Blog link is commented out in `src/components/layout/Navbar.tsx` — uncomment when ready.

## Scroll behaviour
- `/` has scroll locked via `LockScroll` (mounted in `(app)/page.tsx`). Do not remove it unless adding multi-section content.
- Pages that need full-page snap scrolling use `SnapScroll` (sets `scroll-snap-type: y mandatory` on `<html>`). Each snap section must be `h-screen snap-start`. Currently used in `/about-me`.

## Navbar
- Links use a slide animation (same as `Button.tsx`): `group relative overflow-hidden` + absolute slider div + text color transition.
- Active link: `bg-primary border-primary`, slider is `bg-canvas`, text `text-canvas → text-primary`.
- Inactive link: `bg-canvas-soft border-hairline`, slider is `bg-primary`, text `text-body → text-canvas`.

## VantaBackground
- Wraps a `<div>` ref and initialises Vanta DOTS via dynamic import inside `useEffect` (SSR-safe).
- THREE must be imported statically (`import * as THREE from "three"`) and assigned to `window.THREE` before calling Vanta — otherwise Vanta cannot find `PerspectiveCamera`.
- Colors: `color: 0x00d992`, `color2: 0x00d992`, `backgroundColor: 0x101010`.
