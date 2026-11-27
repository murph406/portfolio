# CLAUDE.md — infra

> AWS CloudFormation stacks for the portfolio. No templates yet.
> Root rules in `/CLAUDE.md` apply here too.

## Hosting

- One CloudFront distribution. Its root serves the React client (`client/dist/main/`) from a private S3 bucket with Origin Access Control
- SPA routing: a Lambda@Edge origin-request function rewrites app routes to `index.html`
- API (not yet): `/api/v1*` goes to API Gateway on the same distribution. **No code for it until I say so**
- Stages: `develop` and `main`, each its own stack
- CloudFormation templates, deployed from GitHub Actions with AWS access keys stored as GitHub secrets (my standard for now; OIDC may come later)
- Custom domain comes later; launch on the cloudfront.net URL
- The Eddy project's infra is a reference for ideas only. Ask before carrying over any of its details

## Layout

- `index.yaml`: the CloudFormation template (empty for now)
- `functions/originRequests/client/`: the SPA rewrite function
- `scripts/`: deploy helper scripts
- `/.github/workflows/infra.yaml`: the pipeline (so far it only signs in to AWS, using the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` secrets of the branch's GitHub environment)

## Philosophy

- Cheap by default: serverless, no VPC, no always-on resources.
- Build one resource at a time, following the plan workflow in `/CLAUDE.md`.
- Everything is defined in a template. No hand-made console changes.

## Guardrails

Never do these without explicit approval in chat:

- Deploy, update or delete a stack, including creating a change set
- Run `aws` CLI commands against a real account
- Sync or upload files to S3, or invalidate a CloudFront cache
- Touch DNS, certificates, IAM or billing

Writing and editing templates locally is fine. Deploys are human-run or CI only.

## Client Builds

- `npm run client:build` (from the root) writes two builds: `client/dist/main/` and `client/dist/maintenance/`
- TODO: cache strategy (hashed assets long-cache, `index.html` no-cache)
- TODO: how the maintenance build is served and how to switch to it

## Conventions

- No `docs/patterns/infra.md` yet. Ask before settling a convention, don't invent one
- TODO: how to split stacks, and stack and resource naming
- TODO: parameters and tags
- Lambda@Edge functions and CloudFront ACM certificates must live in `us-east-1`
- TODO: default region for everything else
- TODO: DNS (Route 53), certificates (ACM), CI/CD role, budget alarm, access logs

## Security & Secrets

- No secrets, account IDs or credentials in templates or git. This repo is public-facing
- TODO: SSM Parameter Store or Secrets Manager
- TODO: baseline (proposed: private S3 bucket with CloudFront Origin Access Control, HTTPS only, least-privilege IAM)

## Cost

- TODO: AWS Budgets alarm threshold
- TODO: API Gateway throttling / usage plan limits
- TODO: limits on any Lambda that calls an LLM (rate limit, max tokens, kill switch)

## Commands

- Lint: TODO (`cfn-lint`?)
- Deploy: TODO (human-run or CI only)
