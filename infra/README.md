# Infra

AWS infrastructure for the portfolio, defined with CloudFormation. **Not built yet.**

## Planned hosting

```
CloudFront distribution
├── /api/v1*  → API Gateway        (later)
└── /*        → private S3 bucket  (React client)
```

A Lambda@Edge function sends app routes to `index.html`.

## Stages

`develop` and `main`, each its own stack, deployed from GitHub Actions.
