# Web patterns

## Components

- `entries/<target>/` holds what boots one build: `index.tsx`, plus `router.ts` if it routes. Pages and everything else stay shared in `src/`.
- `components/elements/` holds the bare control (`Radio`, `Checkbox`).
- `components/composites/<Control>Field` holds one control with its label (`RadioField`, `CheckboxField`).
- `components/layouts/<Name>` holds a route layout that renders its page through `<Outlet />`.
- `components/sections/<Name>` holds a block of a page or layout (`Header`, `Hero`, `Footer`).
- `pages/<Name>` holds a route's page, and `hooks/<useName>` holds a shared hook.
- Each component, page and hook has its own folder, with an `index.ts` that re-exports its default export.
- Props are typed as `<Name>Props`.

## Styling

- Each component or page that needs styles has a `<Name>.module.css` beside it, imported as `s`.
- No inline CSS: no `style` props or attributes.
- Global styles live only in `web/src/styles/global/`.
- Use theme tokens for color, not raw values.
- Gap, padding and margin use the spacing scale in `layout.css`: `--space-xs`, `--space-sm`, `--unit`, `--space-md`, `--space-lg`, `--space-xl`. Corners use `--radius`.

Reference: `web/src/components/sections/Hero/`.

## Responsive

- Mobile-first: base styles are the phone layout, and `min-width` queries add to it.
- Fluid before breakpoints: use `clamp()`, `flex-wrap` and `max-width`. Add a query only when a layout breaks.
- Two breakpoints: `48rem` (tablet) and `64rem` (desktop), written literally: `@media (width >= 48rem)`.
- No breakpoint variables: `var()` does not work in `@media`.
- Queries live in the component's own `.module.css`.

## Theming

Reference: `web/src/styles/global/theme.css`.

### Layers

1. **Foundation:** one hex per color (`--primary`), the value to change to re-theme. `--on-primary` is the color drawn on top of it. After re-theming, run `npm run web:favicons`.
2. **Tokens:** named by role (`--surface-1`, `--text-2`), written once as `light-dark(<light>, <dark>)`. Each side takes its hue from the foundation with `hsl(from var(--primary) h <s> <l>)`; keep `s` or `l` to inherit it.
3. **Switch:** `color-scheme: light dark` on `:root` lets the system theme pick the side, live. No JavaScript.

Components use tokens only, with no theme selectors of their own.

Don't use `--primary` as text color: it's too low in contrast on the dark surface. Use a `--text-*` token.

### Tuning

Edit the saturation and lightness on either side of a token. HSL lightness is not perceived brightness, so recheck contrast after changing a foundation hex.

### Adding a color

Add one foundation hex, then only the tokens that are needed, in the same shape:

```css
--red: #ed4337;
--red-surface-1: light-dark(hsl(from var(--red) h 50% 97%), hsl(from var(--red) h 25% 15%));
```

### Reusing in another project

1. Copy `theme.css`, import it from the global stylesheet and change `--primary`.
2. Keep `color-scheme: light dark` on `:root`. Nothing else is needed to follow the system theme.

### Browser support

The source uses CSS relative color syntax and `light-dark()`: roughly Chrome/Edge 123+, Firefox 128+, Safari 18+. The Vite production build currently rewrites `light-dark()` into a variable fallback, which relies on the `color-scheme` rule being in processed CSS. Relative color syntax is not rewritten.
