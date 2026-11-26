# CLAUDE.md — client

> TypeScript React SPA, built to static files and served from S3 behind CloudFront.
> Root rules in `/CLAUDE.md` apply here too.

## Philosophy

- Lean first: fast load, clear content, no extras. React is here for future features, not today's needs.
- No state library, UI framework or animation library until a real feature needs it.

## Rendering Decision

Vite + React SPA. Build-time prerendering can be added later if link previews/SEO need it.

## Stack

- Routing: `react-router` v8. Routes live in `src/router/`, pages in `src/pages/<Name>/`
- Styling: scoped CSS Modules (`<Name>.module.css` beside the component); color tokens in `src/styles/global/theme.css`
- TODO: testing (unit, component, e2e)

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint` (autofix: `npm run lint:fix`)
- Favicons: `npm run favicons`
- Test: TODO

## Conventions

- Folder layout and component patterns: `/docs/patterns/client.md`
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

- TODO: client-side routing fallback (CloudFront error responses → `index.html`)
- TODO: cache strategy (hashed assets long-cache, `index.html` no-cache)
