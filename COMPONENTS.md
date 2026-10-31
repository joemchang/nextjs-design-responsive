# Component Inventory

## App (`app/`)

| Component | File | Exported? | Notes |
|---|---|---|---|
| `RootLayout` | `app/layout.tsx:29` | default | Root layout; also exports `metadata` |
| `Home` | `app/page.tsx:56` | default | The portfolio page |
| `Sparkle` | `app/page.tsx:15` | local | Decorative, takes `className` |
| `Ticker` | `app/page.tsx:23` | local | Y2K-style ticker |
| `HitCounter` | `app/page.tsx:38` | local | Retro hit counter |
| `ThemeToggle` | `app/theme-toggle.tsx:31` | named | Light/dark toggle, stores `theme` in storage |
| `Volt` | `app/volt.tsx:83` | named | Mascot, hide state stored under `volt-hidden` |
| `VoltRobot` | `app/volt.tsx:210` | local | Robot graphic, takes a `waving` prop |
| `WorkGrid` | `app/work-grid.tsx:34` | named | Project grid, takes `projects: Project[]` |
| `TitleBar` | `app/work-grid.tsx:21` | local | Window-style title bar, takes `file` |

Other files in `app/`: `content.ts` (data), `globals.css` (tokens and Tailwind).

## Storybook (`stories/`)

Unmodified Storybook starter components.

| Component | File | Props |
|---|---|---|
| `Button` | `stories/Button.tsx` | `primary`, `backgroundColor`, `size`, `label`, `onClick` |
| `Header` | `stories/Header.tsx:15` | `user`, `onLogin`, `onLogout`, `onCreateAccount` |
| `Page` | `stories/Page.tsx:10` | none |

Each has a `.stories.ts` and a `.css` file. Also present: `Configure.mdx` and `assets/`.

## Observations

- Only 5 components are exported (`RootLayout`, `Home`, `ThemeToggle`, `Volt`, `WorkGrid`); the rest are private to their files.
- No shared component library yet. `Sparkle`, `Ticker`, `HitCounter`, `TitleBar` and `VoltRobot` are candidates for extraction.
- `stories/Button.tsx` uses `<style jsx>` (styled-jsx), which is unconfirmed as set up in this Next project.
- `CLAUDE.md` says there is no test runner, but `vitest.config.ts` and `.storybook/` now exist.
