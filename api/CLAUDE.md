# CLAUDE.md — api

> API Gateway + Lambda (no VPC), TypeScript on Node 24, deployed as its own stack.
> Root rules in `/CLAUDE.md` apply here too.

## Request Path

CloudFront (`/api/v1*`) → API Gateway → Lambda → `use()` (middleware) → controller → response helper

## Layout

- `template.yaml`: the stack (role, REST API, one function and log group per route)
- `src/controllers/<name>/index.ts`: one Lambda per route
- `src/middleware/`: `use(...middlewares)(handler)`. It parses the JSON body, then runs each middleware; the first one to return a response stops the chain. A body that isn't valid JSON becomes `null`
- `src/lib/response/`: response helpers (`ok`, `badRequest`, ...) and the `ApiResponse<T>` envelope
- `src/lib/vars/`: values read from the environment
- `openapi/openapi.yaml`: hand-written API docs, shown by `docs/index.html` (local only, never deployed)
- `bruno/`: Bruno request collection (`environments/local.bru` points at port 8000). Never put a secret in these files; they're committed
- `samconfig.toml`: local build and `start-api` settings

## Conventions

The health check (`src/controllers/health/`) is the reference implementation. No `docs/patterns/api.md` yet: ask before settling a new convention.

- Return responses through `src/lib/response`, so every body has the same shape
- Export the handler wrapped in `use()`
- Import across folders with `@/`
- No semicolons, single quotes, ordered imports (`eslint.config.js`)

## Adding a Route

1. Controller in `src/controllers/<name>/index.ts`
2. Function and log group in `template.yaml` (names follow `/CLAUDE.md`; edit one block at a time)
3. Path in `openapi/openapi.yaml`
4. Request in `bruno/`
5. If it needs more than `GET`, headers or cookies: CloudFront in `infra/index.yaml` currently allows only `GET`, `HEAD` and `OPTIONS` on `/api/v1*`, and forwards query strings but no headers or cookies

## Security

- The raw `execute-api` URL is public on both stages and skips develop's basic auth (see `infra/CLAUDE.md`). Don't put anything private behind the API without fixing that
- `ApiLambdaRole` is shared by all functions and can only write logs. Touching IAM needs approval
- Secrets go in SSM Parameter Store (see `/CLAUDE.md`)
- CORS is open only when running locally (`isLocal`); in AWS the site and API share a domain
- Throttling: 10 requests/second, burst 20, set in `template.yaml`

## Commands (from the root)

- Install: `npm --prefix api install`
- Dev: `npm run api:start` (port 8000, needs SAM CLI and Docker; restart after template changes)
- Docs: `npm run api:docs` (port 3000)
- Build: `npm run api:build`
- Typecheck: `npm run api:typecheck`
- Lint: `npm run api:lint` and `sam validate --lint --template-file api/template.yaml --region us-east-1`
- Test: TODO
- Deploy: CI only (`.github/workflows/api.yaml`)

The `ApiGatewayId` output is read by `infra.yaml`; renaming it breaks the infra deploy.

## Open TODOs

Undecided or not built. Ask before settling any of these.

- TODO: error handling (an unhandled error returns API Gateway's 502, not the `ApiError` shape)
- TODO: invalid JSON bodies (currently `null`, no 400) and input validation
- TODO: auth, and closing off the raw `execute-api` URL
- TODO: endpoint type (none set, so SAM defaults to edge-optimized behind our own CloudFront)
- TODO: CloudFront methods, headers and CORS preflight for write routes
- TODO: shared types with web (`/shared` isn't created; the envelope lives in `src/lib/response`)
- TODO: what `dataYear` means and where it should be set (hardcoded `'2026'` twice)
- TODO: unit test framework and coverage
- TODO: `sam validate --lint` in `api.yaml` (CI doesn't run it)
- TODO: logging format, alarms and tracing
- TODO: usage plans
- TODO: `docs/patterns/api.md`
