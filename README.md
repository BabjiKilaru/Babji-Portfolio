# Calm Canvas Portfolio

Live site: https://babjikilaru.com

A focused portfolio for Babji Kilaru that highlights backend, cloud, and React work with motion-aware UI patterns, resumable navigation, and accessible forms.

## Tech stack
- React + Vite + TypeScript for a fast, modern front end
- Tailwind CSS with custom tokens and motion controls
- Radix-based toast/tooltip primitives for feedback
- React Router for in-page navigation and skip links

## Getting started
```sh
npm install
npm run dev
```

## Production build
```sh
npm run build
npm run preview   # optional: serve the built assets locally
```

## GitHub Pages deployment
- Set the base path for your repo before building, e.g. `VITE_BASE_PATH=/portfolio/ npm run build` (defaults to `/` if unset).
- The build creates `dist/404.html` automatically so GitHub Pages refreshes route requests correctly.
- Deploy `dist/` to the `gh-pages` branch (for example with `git subtree push --prefix dist origin gh-pages` or your preferred workflow).
- Or run `npm run deploy` (defaults base path to `/calm-canvas-portfolio/`; override with `VITE_BASE_PATH` if your repo name differs).

Notes:
- The router uses `basename={import.meta.env.BASE_URL}` so it respects the configured base path.
- Static assets (resume, OG image) resolve via the Vite base path to stay valid on subpaths.

## Tests
Basic component and navigation coverage is provided with Vitest and Testing Library.
```sh
npm test
```

## Project notes
- SEO and social metadata live in `index.html` and use `public/og-image.svg`.
- The resume file is served from `public/resume.pdf` and is wired to the download CTA.
- Toasts surface form submission feedback and resume download confirmation; tooltips hint at these actions.
