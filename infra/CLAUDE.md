# CLAUDE.md — infra

> AWS CloudFormation stacks for the portfolio. Being built one resource at a time.
> Root rules in `/CLAUDE.md` apply here too.

## Hosting (target)

- The site has one CloudFront distribution. Its root serves the React web app (`web/dist/main/`) from a private S3 bucket with Origin Access Control
- `main` only: `ryanmurphy.dev` redirects to `www.ryanmurphy.dev` through a second distribution in front of an S3 redirect bucket (S3 website endpoints are HTTP only, and `.dev` requires HTTPS)
- The web bucket is read only through CloudFront; viewers are redirected to HTTPS
- SPA routing: a Lambda@Edge origin-request function rewrites app routes to `index.html`
- `develop` only: a Lambda@Edge viewer-request function requires basic auth. `main` is public
- API: `/api/v1*` goes to API Gateway on the same distribution, uncached. The API is its own stack (`<Project>-<Stage>-api`, `api/template.yaml`). Its raw `execute-api` URL is public on both stages, so it skips develop's basic auth: don't put anything private behind the API without fixing that
- Stages: `develop` and `main`, each its own stack
- CloudFormation templates, deployed from GitHub Actions with AWS access keys stored as GitHub secrets (my standard for now; OIDC may come later)
- `main` is served at `www.ryanmurphy.dev` (and its cloudfront.net URL); `develop` only at its cloudfront.net URL
- The Eddy project's infra is a reference for ideas only. Ask before carrying over any of its details

## Defined in the Template

Logical IDs follow the naming rules in `/CLAUDE.md`.

- `WebBucket` (`<Project>-<Stage>-web`) and `WebLogsBucket` (`<Project>-<Stage>-web-logs`, log prefix `web/`)
- `WebLogsBucketPolicy`: allows S3 log delivery, denies non-HTTPS requests
- `WebBucketPolicy`: `SiteDistribution` can read files (`s3:GetObject`), non-HTTPS requests are denied. No `s3:ListBucket` on purpose, so a missing file returns 403, not 404
- `SiteDistribution`, with `WebCachePolicy`, `WebOriginRequestPolicy` and `WebOriginAccessControl`
- `WebSpaRewriteFunction` (Lambda@Edge, origin-request) and `LambdaEdgeRole`. CloudFront takes the published version (`.Version`), never `$LATEST` or an alias
- Parameter `ApiGatewayId`: the API stack's REST API ID, used by `SiteDistribution`'s `ApiOrigin` (origin path `/<Stage>`, HTTPS only, TLSv1.2)
- `/api/v1*` cache behavior: `GET`, `HEAD` and `OPTIONS` only (a write method needs this changed), managed `CachingDisabled`, `WebOriginRequestPolicy`, and `ApiResponseHeadersPolicy` (security headers)
- Behind the `IsDevelop` condition: `SiteBasicAuthFunction` (Lambda@Edge, viewer-request) and `SiteBasicAuthRole`, which can read only the basic auth parameter. Each new cache behavior needs this association too, or its path is open on develop
- Behind the `IsMain` condition: `SiteDistribution`'s alias `www.ryanmurphy.dev` and its ACM certificate (`sni-only`, minimum `TLSv1.2_2021`)
- Also behind `IsMain`: `SiteRedirectBucket` (`<Project>-<Stage>-site-redirect`, no files, no access logs) and `SiteRedirectDistribution` (alias `ryanmurphy.dev`, same certificate, managed `CachingDisabled` policy, `WebOriginRequestPolicy` to pass query strings)
- Output `SiteDistributionId`: `web.yaml` reads it to invalidate the cache, so renaming it breaks the web deploy

## Layout

- `index.yaml`: the CloudFormation template (uses the SAM transform)
- `functions/originRequests/webSpaRewrite/`: the SPA rewrite function. A path without a `.` becomes `/index.html`
- `functions/originRequests/webSpaSubpathRewrite/`: for showcasing other SPAs (from this repo or not) at one-level subroutes (`/<prefix>`), each from its own S3 origin. Its header comment has the rules. Not in the template yet
- `functions/viewerRequests/siteBasicAuth/`: basic auth check, attached as viewer-request on the develop distribution only (`SiteBasicAuthFunction`, with its own `SiteBasicAuthRole`)
- `scripts/`: deploy helper scripts
  - `create-sam-cli-s3-bucket.sh`: creates the `<Project>-sam-cli` bucket if missing
  - `set-parameter-overrides.sh`: writes `Stage`, `Project` and `ApiGatewayId` to `scripts/.overrides` (gitignored)
  - `print-parameter-overrides.sh`: prints them as `key=value` for the deploy command. Its output is logged, so never add a secret

## Pipeline

`/.github/workflows/deploy-all.yaml` runs on pushes to `develop` or `main`. In order, it calls `api.yaml` when `api/**`, the root `package.json` or `api.yaml` changed; `infra.yaml` when `infra/**` or `infra.yaml` changed; and `web.yaml` when `web/**`, the root `package.json` or `web.yaml` changed. A failure stops the parts after it. A manual run deploys all three.

`infra.yaml`:

1. Signs in to AWS with the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` secrets of the branch's GitHub environment
2. Creates the SAM CLI bucket if missing
3. Reads the `ApiGatewayId` output of stack `<Project>-<Stage>-api`, so that stack must exist and renaming the output breaks this deploy
4. Writes the parameter overrides
5. Packages the template
6. Deploys stack `<Project>-<Stage>`

`Project` comes from the `PROJECT` GitHub variable (`rm-portfolio`).

## Philosophy

- Cheap by default: serverless, no VPC, no always-on resources.
- Build one resource at a time, following the plan workflow in `/CLAUDE.md`.
- Everything is defined in a template. The only exceptions are the SAM CLI bucket, created by a script in the pipeline, and these hand-made ones: the SSM parameters (see Security & Secrets), the ACM certificate and the Route 53 records for `www` and the apex.

## Guardrails

Never do these without explicit approval in chat:

- Deploy, update or delete a stack, including creating a change set
- Run `aws` CLI commands against a real account
- Sync or upload files to S3, or invalidate a CloudFront cache
- Touch DNS, certificates, IAM or billing

Writing and editing templates locally is fine. Deploys are CI only.

## Web Builds

- `npm run web:build` (from the root) writes two builds: `web/dist/main/` and `web/dist/maintenance/`
- Replaced files are not kept. `web.yaml` uses `aws s3 sync web/dist/main/ s3://<web-bucket> --delete`, so the bucket matches the new build; don't wipe the bucket first
- Each web deploy then invalidates `/*`
- Current caching: `WebCachePolicy` TTL is 300s default and 3600s max, compression is on, and the upload sets no `Cache-Control`
- TODO: cache strategy (hashed assets long-cache, `index.html` no-cache)
- TODO: how the maintenance build is served and how to switch to it

## Conventions

- No `docs/patterns/infra.md` yet. Ask before settling a convention, don't invent one
- Stack naming is in `/CLAUDE.md`. Parameters are `Project`, `Stage` and `ApiGatewayId`; buckets are tagged with both
- No S3 versioning on any bucket unless I say otherwise
- Default region `us-east-1`. Lambda@Edge functions and CloudFront ACM certificates must live there
- The API is a separate stack; TODO: whether to split further
- TODO: DNS (Route 53) and certificate (ACM) in a template, CI/CD role, budget alarm

## Security & Secrets

- No secrets, account IDs or credentials in templates or git. This repo is public-facing
- Secrets live in SSM Parameter Store (see `/CLAUDE.md`)
- `/portfolio/develop/basic-auth` is created by hand, outside the template (CloudFormation can't create a SecureString): value `Basic <base64 of user:password>`, default `aws/ssm` key, in `us-east-1`. The function caches it while warm, so a change isn't immediate, and returns 401 to everyone if it can't read it
- `/portfolio/main/certificate-arn` is created by hand (String, `us-east-1`): the ARN of the wildcard ACM certificate. It's kept out of git because it contains the account ID. Both distributions read it with an SSM dynamic reference, so changing the value takes effect only on a later stack update that re-resolves it
- Buckets: all public access blocked, ACLs disabled, HTTPS only (each bucket policy denies non-HTTPS requests). Exception: `SiteRedirectBucket` has no bucket policy, because CloudFront reaches its website endpoint over HTTP
- Access logs for the web bucket are permanently deleted after 30 days
- TODO: least-privilege IAM (the deploy step's IAM capabilities are broader than needed; leave for now)

## Cost

- TODO: AWS Budgets alarm threshold
- API throttling is set in `api/template.yaml` (10 requests/second, burst 20). TODO: usage plans
- TODO: limits on any Lambda that calls an LLM (rate limit, max tokens, kill switch)

## Commands

- Lint (from the root): `sam validate --lint --template-file infra/index.yaml --region us-east-1`
- Deploy: CI only
