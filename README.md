# Ryan Murphy — Portfolio

> Full stack engineer with a product mindset, building and running apps end to end, from the user experience to the infrastructure behind it.

**LinkedIn:** https://www.linkedin.com/in/ryanmurphy-dev · **Live site:** coming soon · **Resume:** coming soon

---

## What This Is

This repo is three things:

1. **My portfolio:** a production-grade personal site on a serverless AWS stack.
2. **My job-search toolkit:** pre-built agents, integrated rather than stored in this repo, that score my website, GitHub, LinkedIn and resume so I can see where I stand and track improvement over time.
3. **How I build with AI:** the `CLAUDE.md` files, rules, skills and settings in this repo show the workflow I use to develop with AI coding tools, with guardrails.

## Architecture

```
CloudFront distribution
├── /api/v1*  → API Gateway → Lambda   (planned)
└── /*        → private S3 bucket      (React web app)
```

| Layer  | Tech                                  | Folder     | Status      |
| ------ | ------------------------------------- | ---------- | ----------- |
| Web    | TypeScript, React, Vite               | `web/`     | In progress |
| Infra  | AWS CloudFormation, CloudFront + S3   | `infra/`   | In progress |
| API    | API Gateway + Lambda (no VPC)         | `api/`     | Not started |
| Data   | Career source of truth                | `content/` | Not started |

## Repo Structure

```
web/             React SPA
infra/           CloudFormation template, Lambda@Edge function and deploy scripts
content/         Career data: single source of truth
docs/patterns/   Coding conventions per workspace
.claude/         Claude Code settings, rules and skills
.github/         GitHub Actions workflows
```

## Getting Started

**Prerequisites:** Node 24 (what CI uses) and npm. The AWS SAM CLI is only needed to lint the infra template.

```bash
npm --prefix web install
npm run web:start:main
```

## Scripts

| Command                         | What it does                          |
| ------------------------------- | ------------------------------------- |
| `npm run web:start:main`        | Run the site locally                  |
| `npm run web:start:maintenance` | Run the maintenance page locally      |
| `npm run web:build`             | Typecheck and build both targets      |
| `npm run web:lint`              | Lint the web app                      |
| `npm run web:favicons`          | Regenerate favicons (needs Chrome)    |

## Deployment

- Pushing to `develop` or `main` runs `.github/workflows/deploy-all.yaml`, using AWS access keys stored as GitHub secrets
- Only the parts that changed are deployed, infra before web. A manual run deploys both
- Infra: each branch deploys its own CloudFormation stack
- Web: lint, build, upload to S3, then invalidate the CloudFront cache

## License

TODO
