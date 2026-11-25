# CLAUDE.md — client

> TypeScript React SPA, built to static files and served from S3 behind CloudFront.
> Root rules in `/CLAUDE.md` apply here too.

## Philosophy

- Lean first: fast load, clear content, no extras. React is here for future features, not today's needs.
- No state library, UI framework or animation library until a real feature needs it.

## Rendering Decision

Vite + React SPA. See `/docs/decisions/0001-client-rendering.md`. Build-time prerendering can be added later if link previews/SEO need it.

## Stack

- TypeScript, React
- Vite (build/dev), npm
- TODO: routing
- TODO: styling approach
- TODO: state / data fetching
- TODO: testing (unit, component, e2e)

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Test: TODO
- Typecheck: `npm run typecheck`
- Lint: `npm run lint` (autofix: `npm run lint:fix`)

## Conventions

- Import order and style rules are enforced by `eslint.config.js` (no semicolons)
- Import across folders with the `@` aliases in `tsconfig.json`
- TODO: folder structure (features vs. layers)
- TODO: component patterns and naming
- TODO: how API types are consumed (from `/shared`?)
- Career content is rendered from `/content`; never hardcode resume facts in components

## Quality Bars

- TODO: accessibility target (WCAG 2.2 AA?)
- TODO: Lighthouse / Core Web Vitals budgets
- TODO: bundle size budget
- TODO: SEO + Open Graph requirements
- TODO: browser support

## SPA on CloudFront

- TODO: client-side routing fallback (CloudFront error responses → `index.html`)
- TODO: cache strategy (hashed assets long-cache, `index.html` no-cache)

## Don'ts

- TODO
