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

## Repo Structure

```
client/          React SPA
api/             Lambda handlers
infra/           CloudFormation templates
agents/          Scoring agents (site, GitHub, LinkedIn, resume)
content/         Career data: single source of truth
docs/patterns/   Coding conventions per workspace
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

- TODO: GitHub Actions + AWS deploy flow (access keys in GitHub secrets for now)
- TODO: environments (dev / prod)

## License

TODO
