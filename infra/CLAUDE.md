# CLAUDE.md — infra

> AWS CloudFormation stacks for the portfolio. Being built one resource at a time.
> Root rules in `/CLAUDE.md` apply here too.

## Hosting (target)

- One CloudFront distribution. Its root serves the React web app (`web/dist/main/`) from a private S3 bucket with Origin Access Control
- The site bucket is read only through CloudFront; viewers are redirected to HTTPS
- SPA routing: a Lambda@Edge origin-request function rewrites app routes to `index.html`
- API (not yet): `/api/v1*` goes to API Gateway on the same distribution. **No code for it until I say so**
- Stages: `develop` and `main`, each its own stack
- CloudFormation templates, deployed from GitHub Actions with AWS access keys stored as GitHub secrets (my standard for now; OIDC may come later)
- Custom domain comes later; launch on the cloudfront.net URL
- The Eddy project's infra is a reference for ideas only. Ask before carrying over any of its details

## Built So Far

- Site bucket (`<Project>-<Stage>`) and its access log bucket (`<Project>-<Stage>-logs`)
- Log bucket policy: allows S3 log delivery, denies non-HTTPS requests
- Not yet: CloudFront, Origin Access Control, site bucket policy, Lambda@Edge, web upload

## Layout

- `index.yaml`: the CloudFormation template (uses the SAM transform)
- `functions/originRequests/client/`: the SPA rewrite function (empty for now)
- `scripts/`: deploy helper scripts
  - `create-sam-cli-s3-bucket.sh`: creates the `<Project>-sam-cli` bucket if missing
  - `set-parameter-overrides.sh`: writes `Stage` and `Project` to `scripts/.overrides` (gitignored)
  - `print-parameter-overrides.sh`: prints them as `key=value` for the deploy command. Its output is logged, so never add a secret

## Pipeline

`/.github/workflows/infra.yaml` runs on pushes to `develop` or `main` that touch `infra/**` or the workflow:

1. Signs in to AWS with the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` secrets of the branch's GitHub environment
2. Creates the SAM CLI bucket if missing
3. Writes the parameter overrides
4. Packages the template
5. Deploys stack `<Project>-<Stage>`

`Project` comes from the `PROJECT` GitHub variable (`rm-portfolio`).

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

Writing and editing templates locally is fine. Deploys are CI only.

## Web Builds

- `npm run web:build` (from the root) writes two builds: `web/dist/main/` and `web/dist/maintenance/`
- Replaced files are not kept. The upload step (not built yet) uses `aws s3 sync web/dist/main/ s3://<site-bucket> --delete`, so the bucket matches the new build; don't wipe the bucket first
- TODO: cache strategy (hashed assets long-cache, `index.html` no-cache)
- TODO: how the maintenance build is served and how to switch to it

## Conventions

- No `docs/patterns/infra.md` yet. Ask before settling a convention, don't invent one
- Stack naming is in `/CLAUDE.md`. Parameters are `Project` and `Stage`; buckets are tagged with both
- No S3 versioning on any bucket unless I say otherwise
- Default region `us-east-1`. Lambda@Edge functions and CloudFront ACM certificates must live there
- TODO: how to split stacks
- TODO: DNS (Route 53), certificates (ACM), CI/CD role, budget alarm

## Security & Secrets

- No secrets, account IDs or credentials in templates or git. This repo is public-facing
- Secrets live in SSM Parameter Store (see `/CLAUDE.md`)
- Buckets: all public access blocked, ACLs disabled, HTTPS only (site bucket deny still to be added, with its CloudFront policy)
- Access logs for the site bucket are permanently deleted after 30 days
- TODO: least-privilege IAM (the deploy step's IAM capabilities are broader than needed; leave for now)

## Cost

- TODO: AWS Budgets alarm threshold
- TODO: API Gateway throttling / usage plan limits
- TODO: limits on any Lambda that calls an LLM (rate limit, max tokens, kill switch)

## Commands

- Lint (from the root): `sam validate --lint --template-file infra/index.yaml --region us-east-1`
- Deploy: CI only
