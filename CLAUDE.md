# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — dev server at http://localhost:3000 (also re-generates the `AGENTS.md` block)
- `npm run build` — production build; also the type-check gate (`tsconfig` has `noEmit`, there is no separate `tsc` script)
- `npm run start` — serve the production build
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`: `eslint-config-next` core-web-vitals + typescript). Lint one file with `npx eslint app/page.tsx`

No test runner is configured yet.

## Stack and architecture

Freshly bootstrapped `create-next-app` project — the design system itself has not been built yet.

- **Next.js 16.3 + React 19.2, App Router only** (`app/`, no `src/` dir, no Pages Router). Versioned Next docs ship in `node_modules/next/dist/docs/` (`01-app/` is the relevant tree) — consult them rather than relying on memory, per AGENTS.md. Note Next 16 conventions like the globally available route-typing helpers (`LayoutProps<"/">` in `app/layout.tsx`, no import) and `proxy` replacing `middleware`.
- **Tailwind CSS v4**, CSS-first: there is no `tailwind.config.js`. Tailwind is loaded via `@import "tailwindcss"` in `app/globals.css` and the `@tailwindcss/postcss` plugin. Design tokens are CSS custom properties on `:root` (swapped under `prefers-color-scheme: dark`) and exposed to Tailwind utilities through the `@theme inline` block (e.g. `--color-background` → `bg-background`). New tokens should follow that same pattern.
- **Fonts**: Geist / Geist Mono via `next/font/google` in `app/layout.tsx`, exposed as `--font-geist-sans` / `--font-geist-mono` and mapped to `font-sans` / `font-mono` in `@theme`.
- **Import alias**: `@/*` resolves to the repo root (e.g. `@/app/...`).
