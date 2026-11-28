---
name: favicons
description: Regenerate the favicon files in web/public/favicon from the Logo component. Use after the Logo's markup, styles or colors change, or when asked to update the favicons.
---

# Favicons

`web/src/components/elements/Logo` is the source of truth. Never edit the images by hand.

1. From the repo root, run `npm run web:favicons`. It needs Google Chrome installed.
2. Open every PNG in `web/public/favicon/`, not a sample. Check that each matches the Logo: one centered copy of the letters, nothing clipped, expected colors.
3. Report which files changed (`git status --short web/public/favicon`). Never commit.

Run it on macOS: the letters use the system font, so another OS draws them differently.
