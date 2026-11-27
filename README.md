# Ryan Murphy — Portfolio

> Full stack engineer with a product mindset, building and running apps end to end, from the user experience to the infrastructure behind it.

**Live site:** https://www.ryanmurphy.dev · **LinkedIn:** https://www.linkedin.com/in/ryanmurphy-dev · **Resume:** https://www.ryanmurphy.dev/resume.pdf

---

## What This Is

This repo is three things:

1. **My portfolio:** a production-grade personal site on a serverless AWS stack.
2. **My job-search toolkit:** pre-built agents that score my website, GitHub, LinkedIn and resume so I can see where I stand and track improvement over time.
3. **How I build with AI:** the `CLAUDE.md` files, rules, skills and settings in this repo show the workflow I use to develop with AI coding tools, with guardrails.

## Architecture

```
CloudFront distribution
├── /api/v1*  → API Gateway → Lambda   (planned)
└── /*        → private S3 bucket      (React client)
```

| Layer  | Tech                                  | Folder     | Status      |
| ------ | ------------------------------------- | ---------- | ----------- |
| Client | TypeScript, React, Vite               | `client/`  | In progress |
| Infra  | AWS CloudFormation, CloudFront + S3   | `infra/`   | In progress |
| API    | API Gateway + Lambda (no VPC)         | `api/`     | Not started |
| Data   | Career source of truth                | `content/` | Not started |

## Repo Structure

```
client/          React SPA
infra/           CloudFormation template and deploy scripts
content/         Career data: single source of truth
docs/patterns/   Coding conventions per workspace
.claude/         Claude Code settings, rules and skills
```

## Getting Started

**Prerequisites:** Node 24 (what CI uses) and npm. The AWS SAM CLI is only needed to lint the infra template.

```bash
npm --prefix client install
npm run client:start:main
```

## Scripts

| Command                            | What it does                          |
| ---------------------------------- | ------------------------------------- |
| `npm run client:start:main`        | Run the site locally                  |
| `npm run client:start:maintenance` | Run the maintenance page locally      |
| `npm run client:build`             | Typecheck and build both targets      |
| `npm run client:lint`              | Lint the client                       |
| `npm run client:favicons`          | Regenerate favicons (needs Chrome)    |

## Deployment

- GitHub Actions runs on pushes to `develop` and `main`, using AWS access keys stored as GitHub secrets
- Infra: each branch deploys its own CloudFormation stack
- Client: the workflow is set up to lint and build; uploading to S3 is not built yet

## License

TODO
