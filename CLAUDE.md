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
- **Settled decisions stay settled.** Check `/docs/decisions` before proposing architectural changes.
- TODO: additional principles as they emerge

## Repo Map

```
/CLAUDE.md              ← you are here
/client/                TypeScript React SPA → S3 + CloudFront        (see client/CLAUDE.md)
/api/                   API Gateway + Lambda (no VPC)                  (see api/CLAUDE.md)
/infra/                 CloudFormation stacks                          (see infra/CLAUDE.md)
/agents/                Scoring agents: site, GitHub, LinkedIn, resume (see agents/CLAUDE.md)
/content/               Career source of truth                         (see content/CLAUDE.md)
/shared/                TODO: shared types / API contracts (confirm)
/docs/decisions/        ADRs (architecture decision records)
/docs/plans/            Feature plans: numbered steps, each with a verification check
/docs/patterns/         My conventions per workspace (api.md, infra.md, client.md, ...)
/.claude/               settings, hooks, subagents, slash commands
/private/               gitignored: raw resume drafts, LinkedIn exports, personal data
```

## Workflow

Build small and iteratively. Never one-shot a feature or a stack.

1. **Plan:** for any non-trivial feature, write `docs/plans/<feature>.md` before writing code. Each step is numbered, small (one resource, one endpoint, one component), has a concrete verification check (a command, URL, or visible result), and a checkbox.
2. **Review:** I review and edit the plan before any code is written.
3. **Build one step:** implement only the step I name.
4. **Stop and verify:** after each step, stop, state exactly how to verify it, and wait. Do not continue to the next step on your own.
5. **Commit:** once verified, the step is committed and checked off in the plan.
6. **Adapt:** if a step reveals something unexpected or is too big, update the plan (or split the step into a sub-plan) before continuing. The plan file is the source of truth.

## Patterns

- My conventions for each workspace live in `docs/patterns/<workspace>.md` (extracted from past production projects and reviewed by me).
- Follow the pattern doc for the workspace you're working in. If a pattern doc and existing code disagree, ask.
- Once a working example exists in the repo (e.g. the first handler or component), treat it as the reference implementation for new work of the same kind.
- If a pattern doc is missing for what you're doing, say so rather than inventing a convention.

## Tech Stack

- **Client:** TypeScript, React. TODO: build tool (Vite?), routing, styling, state
- **API:** API Gateway + Lambda. TODO: runtime (Node/TS?), bundler (esbuild?), one Lambda per route vs. router
- **Infra:** AWS CloudFormation, CloudFront + S3 for static hosting
- **Monorepo:** TODO: package manager / workspaces (npm, pnpm, yarn), task runner (none, Turborepo, Nx)
- **CI/CD:** TODO: GitHub Actions, AWS auth via OIDC (no long-lived keys)
- **Testing:** TODO: unit test framework, e2e, coverage expectations
- **Lint/format:** TODO: ESLint, Prettier, cfn-lint

## Commands

> Exact commands Claude should run. Fill in as tooling is chosen.

- Install: TODO
- Dev (client): TODO
- Dev (api, local): TODO
- Typecheck: TODO
- Lint: TODO
- Test: TODO
- Build: TODO
- Validate infra: TODO (`cfn-lint`?)
- Deploy: TODO (human-run or CI only; see Guardrails)
- Run scoring agents: TODO

## Definition of Done

A change is done only when:

- [ ] Typecheck, lint and tests pass for every affected workspace
- [ ] New behavior has tests (TODO: define what requires tests)
- [ ] No secrets, personal data or `/private` content in the diff
- [ ] Relevant CLAUDE.md / docs / ADRs updated if conventions changed
- [ ] TODO: client-specific bars (a11y, Lighthouse) once defined

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

- TODO: environments (dev / prod?) and stack naming convention
- TODO: AWS account(s) and default region
- Note: ACM certificates for CloudFront must live in `us-east-1`
- Secrets live in TODO: SSM Parameter Store / Secrets Manager, never in git
- TODO: domain / Route 53 setup

## Cost Guardrails

- TODO: AWS Budgets alarm threshold
- TODO: API Gateway throttling / usage plan limits
- TODO: limits on any Lambda that calls an LLM (rate limit, max tokens, kill switch)

## Git Workflow

- TODO: branch naming (e.g. `feat/`, `fix/`, `chore/`)
- TODO: commit style (Conventional Commits?)
- TODO: PR size and description expectations
- TODO: may Claude commit to branches on its own, or only propose diffs?

## Claude Assets (`/.claude`)

- `settings.json`: TODO: permissions, hooks
- `agents/`: TODO: subagents (scorers, reviewer, etc.)
- `commands/`: TODO: slash commands, e.g. `/score-resume`, `/score-site`, `/new-adr`
- `skills/`: TODO
- All of the above are committed; they are part of the showcase.

## Decisions Log

- ADRs live in `/docs/decisions/NNNN-title.md`
- TODO: ADR template
- Seed ADRs to write:
  - TODO: CloudFormation over CDK / Terraform / SAM
  - TODO: No VPC for Lambda
  - TODO: Monorepo structure and tooling
  - TODO: Single source of truth for career data (`/content`)

## Open Questions

- TODO: how agents run: Claude Code subagents locally, Lambda + model API, or both?
- TODO: vendor, fork or borrow rubrics from the AI-Era Job Kit?
- TODO: where scoring results are stored, and is history committed (for "measure")?
- TODO: public "score me" feature on the site, or private tooling only?