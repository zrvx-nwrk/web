# ZRVX Web

A Vite + React + Tailwind CSS landing page for the ZRVX experiment, migrated from Figma Make.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — build static files to `dist/`
- `npm run preview` — preview the built site

## GitHub Pages

The repo is ready for GitHub Pages. The `base` in `vite.config.ts` defaults to `./` (relative), which works for project pages. If you use a custom domain at the root, set `BASE=/` before building:

```bash
BASE=/ npm run build
```

## Nx migration

The project is a single-package Vite app. To move it into an Nx monorepo later, place this folder under `apps/` and create a `project.json` or use Nx's `@nx/vite` plugin.
