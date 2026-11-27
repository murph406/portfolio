# CLAUDE.md — web

> TypeScript React SPA, built to static files and served from S3 behind CloudFront.
> Root rules in `/CLAUDE.md` apply here too.

## Philosophy

- Lean first: fast load, clear content, no extras. React is here for future features, not today's needs.
- No state library, UI framework or animation library until a real feature needs it.

## Rendering Decision

Vite + React SPA. Build-time prerendering can be added later if link previews/SEO need it.

## Stack

- Routing: `react-router` v8. Routes live in `src/entries/main/router.ts`, pages in `src/pages/<Name>/`
- Styling: scoped CSS Modules (`<Name>.module.css` beside the component); color tokens in `src/styles/global/theme.css`
- TODO: testing (unit, component, e2e)

## Entries and Env

- Each build target is a folder in `src/entries/`: `main` (the site) and `maintenance` (one page, no router)
- `VITE_BUILD_TARGET` picks the entry (default `main`). A new target also goes in `vite.config.ts` and `package.json` scripts
- Env files are per target: copy `example.env` to `.env.<target>.local` (gitignored; never commit it)
- `VITE_` values are public: they can be copied into the browser bundle. Never put a secret in one

## Commands

- Dev: `npm run dev:main` or `npm run dev:maintenance`
- Build: `npm run build` (typechecks, then writes `dist/main/` and `dist/maintenance/`); one target: `npm run build:<target>`
- Preview: `npm run preview` (main); maintenance: `VITE_BUILD_TARGET=maintenance npm run preview`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint` (autofix: `npm run lint:fix`)
- Favicons: `npm run favicons`
- Test: TODO

## Conventions

- Folder layout and component patterns: `/docs/patterns/web.md`
- Import order and style rules are enforced by `eslint.config.js` (no semicolons)
- Import across folders with the `@` aliases in `tsconfig.json`
- Scope component styles with CSS Modules. No inline CSS (`style` props or attributes). Global styles belong only in `src/styles/global/`
- Use theme color tokens, not raw color values
- No arrow functions in JSX. Declare handlers as hoisted functions and pass them by name
- Each page sets its own `<title>` as `Page name | Ryan Murphy` (React 19 document metadata; no helmet library)
- Career content is rendered from `/content`; never hardcode resume facts in components. Exception until `/content` has a format: a short, true bio and tagline

## Quality Bars

- TODO: accessibility target (proposed: WCAG 2.2 AA)
- Don't use `--primary` as text color (about 3.35:1 on the dark `--surface-1`; normal text needs 4.5:1)
- Respect `prefers-reduced-motion` (see `src/hooks/useScrollShrink/`)
- Browser support: roughly Chrome/Edge 123+, Firefox 128+, Safari 18+
- TODO: SEO and link previews (meta description, Open Graph, `index.html` title, web manifest name)

## SPA on CloudFront

- Routing fallback: a Lambda@Edge function rewrites app routes to `index.html` (see `infra/CLAUDE.md`). Paths with a `.` pass through, so routes must not contain one
- TODO: cache strategy (hashed assets long-cache, `index.html` no-cache)
