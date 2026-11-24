# 0001: Client rendering approach

- Status: Accepted
- Date: 2026-11-24

## Context

A plain SPA ships near-empty HTML. The client is deployed as static files to S3 behind CloudFront.

## Decision

Vite + React + TypeScript SPA (Option A in `client/CLAUDE.md`). It is the simplest option and matches the "lean first" philosophy.

## Consequences

- Weakest link previews and SEO of the options considered.
- Build-time prerendering can be added later without changing the S3 + CloudFront deploy or restructuring the app.
- Infra and API are unaffected.
