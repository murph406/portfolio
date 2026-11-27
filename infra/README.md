# Infra

AWS infrastructure for the portfolio, defined with CloudFormation. **In progress:** the site bucket and its access log bucket are defined; CloudFront is next.

## Planned hosting

```
CloudFront distribution
├── /api/v1*  → API Gateway        (later)
└── /*        → private S3 bucket  (React web app)
```

A Lambda@Edge function sends app routes to `index.html`.

## Deployment

`develop` and `main` each have their own stack (`rm-portfolio-<stage>`). Pushing infra changes to either branch deploys it with GitHub Actions (`.github/workflows/infra.yaml`).

## Check the template

From the repo root, with the AWS SAM CLI installed:

```bash
sam validate --lint --template-file infra/index.yaml --region us-east-1
```
