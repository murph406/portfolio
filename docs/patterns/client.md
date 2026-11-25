# Client patterns

## Components

- `components/elements/` holds the bare control (`Radio`, `Checkbox`).
- `components/composites/<Control>Field` holds one control with its label (`RadioField`, `CheckboxField`).

## Styling

- Each component or page that needs styles has a `<Name>.module.css` beside it, imported as `s`.
- No inline CSS: no `style` props or attributes.
- Global styles live only in `client/src/styles/global/`.
- Use theme tokens for color, not raw values.

Reference: `client/src/components/sections/Hero/`.

## Theming

Reference: `client/src/styles/global/theme.css`.

### Layers

1. **Foundation:** one hex per color (`--primary`). The only value to change to re-theme.
2. **Tokens:** named by role (`--surface-1`, `--text-2`), written once as `light-dark(<light>, <dark>)`. Each side takes its hue from the foundation with `hsl(from var(--primary) h <s> <l>)`; keep `s` or `l` to inherit it.
3. **Switch:** `data-theme` on `<html>` sets `color-scheme`, which picks the side.

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
2. Set `data-theme="light"` or `"dark"` on `<html>` before first paint (see `client/public/theme-toggle.js` and `client/src/lib/Theme/theme.ts`).

### Browser support

The source uses CSS relative color syntax and `light-dark()`: roughly Chrome/Edge 123+, Firefox 128+, Safari 18+. The Vite production build currently rewrites `light-dark()` into a variable fallback, which relies on the `color-scheme` rules being in processed CSS. Relative color syntax is not rewritten.
