# AGENTS.md

Guidance for coding agents working on **replacearr.com** — the public marketing site for [Replacearr](https://github.com/replacearr/replacearr). Persistent Cursor rules live in `.cursor/rules/` and apply automatically; this file is the map.

## What this repo is

A React 19 + Vite multi-page marketing site for Replacearr. Plain CSS (no Tailwind), Motion (`motion/react`), Lucide icons, and React Router. Deployed to GitHub Pages at [replacearr.com](https://replacearr.com).

| Path | Role |
| :--- | :--- |
| `src/pages/` | Home, Product, Install, Gallery |
| `src/components/SiteShell.tsx` | Shared nav + footer |
| `src/styles/tokens.css` | Color, type, spacing tokens |
| `src/styles/layout.css` | Shell + shared UI primitives |
| `public/images/` | Logos and app screenshots from `replacearr/images/` |
| `public/CNAME` | Custom domain `replacearr.com` |
| `.github/workflows/deploy.yml` | Build + GitHub Pages deploy |
| `.cursor/rules/` | Agent design and stack rules |

Product source of truth is the sibling app repo `replacearr/replacearr`. Do not add Go server code, SQLite, or the embedded SPA here.

## Routes

| Path | Page |
| :--- | :--- |
| `/` | Brand hero + proofs + screenshot strip |
| `/product` | Capabilities with real UI shots |
| `/install` | Docker Hub / GitHub / Discord get-started |
| `/gallery` | Curated desktop + mobile screenshots |

## Rules

| Rule | When |
| :--- | :--- |
| `.cursor/rules/project-core.mdc` | Every task |
| `.cursor/rules/design-system.mdc` | Visual / layout / motion work |
| `.cursor/rules/react-vite.mdc` | `src/**`, Vite config, deps |

## Design invariants

- **Stack:** React 19, Vite, `react-router-dom`, `motion`, `lucide-react`, plain CSS. No Tailwind or CSS-in-JS.
- **Look:** Light signal-board — stone page `#F2F5F8`, ink `#101820`, teal accent `#0D9488`. Display **Bricolage Grotesque**; body **Figtree**.
- **Brand:** Replacearr is hero-level on the home first viewport over the dark atmosphere background (gradients + grid). Product screenshots live below the fold and on Gallery — no hero video/screenshot.
- **Copy:** Sonarr / Radarr / Prowlarr are legacy context only (“replaces the *arr stack”). Never outbound-link those apps as destinations. CTAs go to GitHub, Docker Hub, Discord.
- **Motion:** Restrained entrance motion; honor `prefers-reduced-motion`.
- **Deploy:** `npm run build` writes `dist/` and copies `index.html` → `404.html` for SPA deep links on Pages.

## Working agreement

- Prefer `npm run dev`, `npm run build`, `npm run typecheck`.
- Do not hand-edit `dist/`.
- Refresh screenshots/logos from `/home/ldrrp/Workspaces/replacearr/images/` into `public/images/`.
- Preserve `public/CNAME` and `.nojekyll`.
- Keep secrets out of the repo.

## Verify

```bash
npm install
npm run typecheck
npm run build
npm run dev
```
