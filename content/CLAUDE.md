# CLAUDE.md — content

> Single source of truth for my career data. Goal: the site renders it and the resume is
> generated from it. Neither is built yet.
> Root rules in `/CLAUDE.md` apply here too.

## Rules

- Only I add or change facts here. Claude may propose edits but must not apply them without approval.
- Every claim must be true and defensible in an interview.
- Metrics need a source or a note explaining how they were measured.

## Structure

- TODO: format (JSON with a schema? Markdown with frontmatter?)
- TODO: files (profile, experience, projects, skills, education, impact statements)
- TODO: schema location and validation command

## Consumers

- `web`: will render the portfolio
- TODO: resume generator (output formats?)

## Public vs. Private

- Everything here is public (committed)
- Raw drafts, exports and anything sensitive go in `/content/private/` (gitignored)
- TODO: decide what personal info is OK to publish elsewhere (email? location? phone: no)

## Temporary Exception

Until `/content` has a format, the web app may hardcode a short bio and tagline. Every claim must still be true.
