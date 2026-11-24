# Ryan Murphy — Portfolio

> Full stack engineer with a product mindset, building and running apps end to end, from the user experience to the infrastructure behind it.

**Live site:** https://www.ryanmurphy.dev · **LinkedIn:** https://www.linkedin.com/in/ryanmurphy-dev · **Resume:** https://www.ryanmurphy.dev/resume.pdf

---

## What This Is

This repo is three things:

1. **My portfolio:** a production-grade personal site on a serverless AWS stack.
2. **My job-search toolkit:** agents that score my website, GitHub, LinkedIn and resume so I can see where I stand and track improvement over time.
3. **How I build with AI:** the `CLAUDE.md` files, agents, commands and hooks in this repo show the workflow I use to develop with AI coding tools, with guardrails.

## Architecture

TODO: diagram (client → CloudFront → S3; client → API Gateway → Lambda)

| Layer  | Tech                                   | Folder    |
| ------ | -------------------------------------- | --------- |
| Client | TypeScript, React                      | `client/` |
| API    | API Gateway + Lambda (no VPC)          | `api/`    |
| Infra  | AWS CloudFormation, CloudFront + S3    | `infra/`  |
| Agents | Claude Code subagents / commands       | `agents/` |
| Data   | Career source of truth                 | `content/`|

Key decisions and their reasoning are recorded in [`docs/decisions/`](docs/decisions/).

## Repo Structure

```
client/          React SPA
api/             Lambda handlers
infra/           CloudFormation templates
agents/          Scoring agents (site, GitHub, LinkedIn, resume)
content/         Career data: single source of truth
docs/decisions/  Architecture decision records
.claude/         Claude Code settings, hooks, agents, commands
```

## Getting Started

**Prerequisites:** TODO (Node version, package manager, AWS CLI, cfn-lint)

```bash
# TODO: install
# TODO: run client locally
# TODO: run api locally
```

## Scripts

| Command | What it does |
| ------- | ------------ |
| TODO    | TODO         |

## Deployment

- TODO: GitHub Actions + AWS OIDC flow
- TODO: environments (dev / prod)

## Scoring Agents

- TODO: how to run each scorer
- TODO: where results go and how history is tracked
- Built on the methodology from *Job Hunting in the Age of AI* (Jerome Hardaway, master.dev) and its AI-Era Job Kit. Agents sharpen real experience; they never invent it.

## AI-Assisted Development

- TODO: short explanation of how `CLAUDE.md` files are layered (root + per workspace)
- TODO: what guardrails are enforced (permissions, hooks) and why
- TODO: link to a write-up / blog post about the workflow

## Roadmap

Start small and apply early. New automation gets built when a manual step becomes a real pain, not before.

**Now**
- [ ] Lean portfolio site: fast, clear, accessible
- [ ] Career data written up as markdown in `content/` (one file per role/experience)
- [ ] One strong baseline resume
- [ ] Decide client rendering approach (SPA vs. prerender vs. Astro); see `client/CLAUDE.md`

**Next**
- [ ] Scoring agents: site, GitHub, LinkedIn, resume
- [ ] Tailored resumes per job description, generated as PDF from `content/`
- [ ] Wins log: dated notes per role for reviews, raises and future searches (private by default)

**Later**
- [ ] "Get to know me" chat on the site (reads public `content/` only)
- [ ] Application tracking and score history over time

## License

TODO
