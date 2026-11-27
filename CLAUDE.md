# CLAUDE.md — Portfolio Monorepo (Root)

> Root context for every Claude session in this repo. Keep this file lean (~150 lines max).
> Workspace-specific rules live in each workspace's own `CLAUDE.md`. Detail lives in `/docs`.
> When Claude makes the same mistake twice, add a line here.

---

## Mission

This repo is three things at once:

1. **The product:** a production-grade personal portfolio (React client, serverless API, AWS infra)
2. **The toolkit:** pre-built agents that score my website, GitHub, LinkedIn and resume so I can market myself accurately and track improvement over time.
3. **The meta-layer:** a public demonstration of how I build software with AI: CLAUDE.md files, agents, commands, hooks and workflows are part of the deliverable.

This repo is read by hiring managers. Every file, commit and PR should be something I'd want reviewed.

Methodology follows [*Job Hunting in the Age of AI* (Jerome Hardaway, master.dev)](https://github.com/Vets-Who-Code/ai-era-job-kit) and its AI-Era Job Kit: **gather the data, build the artifacts, ship, and measure.**

## Core Principles

- **Sharpen, never invent.** AI improves what is true; it never fabricates experience, metrics, titles, dates or skills. Any career claim must trace back to `/content`. If a fact is missing, ask. Do not fill the gap.
- **Ask before acting outside the code.** Proposing is free; deploying, deleting and spending money are not (see Guardrails).
- **Small, reviewable changes.** One concern per change. Explain the why, not just the what.
- **Types end to end.** Shared contracts between client and API; no `any` without a comment explaining why.
- **Cheap by default.** Serverless, no VPC, no always-on resources.

## Repo Map

```
/CLAUDE.md              ← you are here
/client/                TypeScript React SPA → S3 + CloudFront        (see client/CLAUDE.md)
/api/                   API Gateway + Lambda (no VPC)                  (not started)
/infra/                 CloudFormation stacks                          (see infra/CLAUDE.md)
/agents/                Scoring agents: site, GitHub, LinkedIn, resume (see agents/CLAUDE.md)
/content/               Career source of truth                         (see content/CLAUDE.md)
/shared/                Shared types / API contracts                   (not created)
/docs/plans/            Feature plans, local only (gitignored)
/docs/patterns/         My conventions per workspace (client.md so far)
/.claude/               Skills now; settings, hooks, subagents and commands planned
/private/               gitignored: resume drafts, LinkedIn exports, personal data
```

## Workflow

Build small and iteratively. Never one-shot a feature or a stack.

1. **Plan:** for any non-trivial feature, write `docs/plans/<feature>.md` before writing code. Each step is numbered, small (one resource, one endpoint, one component), has a concrete verification check (a command, URL, or visible result), and a checkbox.
2. **Review:** I review and edit the plan before any code is written.
3. **Build one step:** implement only the step I name.
4. **Stop and verify:** after each step, stop, state exactly how to verify it, and wait. Do not continue to the next step on your own.
5. **Commit:** once verified, the step is committed and checked off in the plan. Plans stay local; never commit them.
6. **Adapt:** if a step reveals something unexpected or is too big, update the plan (or split the step into a sub-plan) before continuing. The plan file is the source of truth.

## Patterns

- My conventions for each workspace live in `docs/patterns/<workspace>.md` (extracted from past production projects and reviewed by me).
- Follow the pattern doc for the workspace you're working in. If a pattern doc and existing code disagree, ask.
- Once a working example exists in the repo (e.g. the first handler or component), treat it as the reference implementation for new work of the same kind.
- If a pattern doc is missing for what you're doing, say so rather than inventing a convention.

## Tech Stack

- **Client:** TypeScript, React, Vite SPA. react-router, CSS Modules (see client/CLAUDE.md)
- **API:** API Gateway + Lambda. TODO: runtime (Node/TS?), bundler (esbuild?), one Lambda per route vs. router
- **Infra:** AWS CloudFormation, CloudFront + S3 for static hosting
- **Monorepo:** npm, no workspaces; root scripts call each package with `npm --prefix`
- **CI/CD:** GitHub Actions, AWS auth via OIDC (no long-lived keys). `.github/workflows/infra.yaml` only signs in so far
- **Testing:** TODO: unit test framework, e2e, coverage expectations
- **Lint/format:** ESLint (client). TODO: cfn-lint

## Commands

> Exact commands Claude should run, from the root. Add more as tooling is chosen.

- Install (client): `npm --prefix client install`
- Dev (client): `npm run client:start:main` or `npm run client:start:maintenance`
- Build (client): `npm run client:build` (typechecks, then builds `client/dist/main/` and `client/dist/maintenance/`)
- Typecheck (client): `npm --prefix client run typecheck`
- Lint (client): `npm run client:lint`
- Favicons (client): `npm run client:favicons` (regenerates them from `Logo`, needs Google Chrome)
- Deploy: TODO (human-run or CI only; see Guardrails)

## Definition of Done

A change is done only when:

- [ ] Typecheck and lint pass for every affected workspace
- [ ] Tests pass and cover new behavior, once a workspace has a test setup (none yet)
- [ ] No secrets, `/private` content or new personal data in the diff
- [ ] Relevant CLAUDE.md / docs updated if conventions changed

## Guardrails

Claude must **never** do the following without explicit approval in chat:

- Deploy, update or delete any CloudFormation stack
- Run `aws` CLI commands against real accounts (read-only `describe`/`list` TODO: decide if allowed)
- Touch DNS, certificates, IAM or billing
- Commit or push directly to `main`
- Commit secrets, `.env` files, or anything from `/private`
- Fabricate or "enhance" career data (see Core Principles)

Enforcement (CLAUDE.md is guidance; these are the hard limits):

- TODO: `.claude/settings.json` permission denies (e.g. `aws cloudformation deploy`, `aws * delete*`)
- TODO: hooks (e.g. lint/format after edit, block writes to `/private`, secret scan)

## Environments & Secrets

- Environments: `develop` and `main`, each its own stack
- TODO: stack naming convention
- TODO: AWS account(s) and default region
- Note: Lambda@Edge functions and CloudFront ACM certificates must live in `us-east-1`
- Secrets live in TODO: SSM Parameter Store / Secrets Manager, never in git
- TODO: domain / Route 53 setup

## Cost Guardrails

- TODO: AWS Budgets alarm threshold
- TODO: API Gateway throttling / usage plan limits
- TODO: limits on any Lambda that calls an LLM (rate limit, max tokens, kill switch)

## Git Workflow

- Work happens on `develop`, not `main`
- TODO: branch naming (e.g. `feat/`, `fix/`, `chore/`)
- TODO: commit style (Conventional Commits?)
- TODO: PR size and description expectations
- TODO: may Claude commit to branches on its own, or only propose diffs?

## Claude Assets (`/.claude`)

- `skills/`: `favicons`
- Planned: `settings.json` (permissions, hooks), `agents/` (scorers, reviewer), `commands/` (e.g. `/score-resume`)
- Shared assets are committed; they are part of the showcase. `settings.local.json` is not.

## Open Questions

- TODO: how agents run: Claude Code subagents locally, Lambda + model API, or both?
- TODO: vendor, fork or borrow rubrics from the AI-Era Job Kit?
- TODO: where scoring results are stored, and is history committed (for "measure")?
- TODO: public "score me" feature on the site, or private tooling only?
