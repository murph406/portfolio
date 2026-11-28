# Infra

AWS infrastructure for the portfolio, defined with CloudFormation. **In progress:** the buckets and their policies, the CloudFront distribution, the routing function, develop-only basic auth, the `main` custom domain and the apex redirect are defined, and CI uploads the web build.

## Hosting

```
CloudFront distribution
├── /api/v1*  → API Gateway        (later)
└── /*        → private S3 bucket  (React web app)
```

`main` is served at `www.ryanmurphy.dev`, and `ryanmurphy.dev` redirects there through a second distribution and an S3 redirect bucket. A Lambda@Edge function sends app routes to `index.html`. On `develop` only, a second one requires basic auth, checked against a value kept in SSM Parameter Store.

## Deployment

`develop` and `main` each have their own stack (`rm-portfolio-<stage>`). Pushing infra changes to either branch deploys it with GitHub Actions (`.github/workflows/deploy-all.yaml`, which calls `infra.yaml`).

## Check the template

From the repo root, with the AWS SAM CLI installed:

```bash
sam validate --lint --template-file infra/index.yaml --region us-east-1
```
