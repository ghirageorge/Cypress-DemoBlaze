# CI: Cypress on GitHub Actions


This repo runs Cypress tests on **GitHub Actions** with:
- **PR smoke** job (fast subset),
- **Full** job on `main` push, scheduled nightly, or manual runs,
- **Artifacts** (videos, screenshots, JUnit XML).


Add to cart from multiple categories (modal assertions)

Checkout flow with cy.intercept() to assert request/response payloads

Visual snapshot on a stable page (home/product)

Skills shown: network stubbing, retryable assertions, fixtures, visual check, Cypress Dashboard-ready specs


## 2) Troubleshooting
- **No spec files found**: ensure `spec:` path matches your repo.
- **Target site slow / flaky**: re-run. Artifacts help debug.
- **Chromium not found**: Ubuntu runner installs via `npx cypress install`.