# Cypress JavaScript — DemoBlaze
CI Status:
[![cypress-e2e](https://github.com/ghirageorge/Cypress-DemoBlaze/actions/workflows/workflow.yml/badge.svg)](https://github.com/ghirageorge/Cypress-DemoBlaze/actions/workflows/workflow.yml)

A small, portfolio‑ready end‑to‑end testing project against the public **DemoBlaze** store.  
It demonstrates **Cypress** setup, a clean project structure, **smoke vs full** execution, and a ready‑to‑use **GitHub Actions** pipeline with artifacts.

---

## ✨ What’s inside

- **Cypress v13** project (JavaScript)
- **Scenarios**
  - *Smoke* (fast): Add to cart → Checkout; Catalog pagination
  - *Extra ideas*: auth, cart cleanup, visual checks
- **Base URL** wired for DemoBlaze
- **CI**: GitHub Actions workflow that installs deps, runs tests on **Chrome**, and uploads **videos/screenshots**
- **Windows‑friendly** commands (`npm.cmd`/`npx.cmd` also work)

---

## 🧱 Structure

```
.
├─ cypress/
│  ├─ e2e/
│  │  └─ demoblaze/
│  │     ├─ add_to_cart_checkout.cy.js
│  │     └─ catalog_pagination.cy.js
│  ├─ fixtures/
│  ├─ support/
│  │  ├─ e2e.js
│  │  └─ commands.js
│  └─ downloads/         # (ignored)
├─ cypress.config.js
├─ package.json
├─ package-lock.json
└─ .github/
   └─ workflows/
      └─ cypress.yml
```

> `node_modules/` is excluded from git on purpose. CI rebuilds it deterministically from **package-lock.json**.

---

## ⚙️ Setup

**Requirements**
- Node.js 18+ (tested on 20)
- Internet access (public demo site)

**Install**
```bash
npm install
# PowerShell-safe:
# npm.cmd install
```

---

## ▶️ Run tests locally

Open the Cypress app:
```bash
npx cypress open
# PowerShell-safe:
# npx.cmd cypress open
```

Headless in Chrome:
```bash
npx cypress run --browser chrome
```

Run only the DemoBlaze specs:
```bash
npx cypress run --browser chrome --spec "cypress/e2e/demoblaze/**/*.cy.js"
```

---

## 🧪 Scenarios in this repo

### 1) Add to cart → Checkout *(smoke)*
- Visits home, navigates to a product
- Adds to cart, opens cart, places order
- Asserts success modal

### 2) Catalog pagination *(smoke)*
- Reads product names on page 1
- Goes **Next** and confirms a different set
- Goes **Prev** and validates the original set

> These are intentionally fast & reliable: perfect for **CI smoke** on pull requests.

---

## 🧭 Configuration (cypress.config.js)

```js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
```

---

## 🤖 CI: GitHub Actions

Minimal workflow at **`.github/workflows/cypress.yml`**:

```yaml
name: cypress-e2e

on:
  push: { branches: [ main ] }
  pull_request:
  workflow_dispatch:

jobs:
  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: package-lock.json
      - run: npm ci
      - run: npx cypress install
      - uses: cypress-io/github-action@v6
        with:
          install: false
          browser: chrome
          spec: cypress/e2e/demoblaze/**/*.cy.js
      - if: always()
        uses: actions/upload-artifact@v4
        with: { name: cypress-videos, path: cypress/videos, if-no-files-found: ignore }
      - if: always()
        uses: actions/upload-artifact@v4
        with: { name: cypress-screenshots, path: cypress/screenshots, if-no-files-found: ignore }
```

### Optional: PR smoke vs full suite
Use two jobs: a **smoke** job on PRs (only a couple of specs) and a **full** job on pushes to `main` or nightly.  
Adjust `spec:` to your needs, e.g.
```
# PR smoke
spec: |
  cypress/e2e/demoblaze/add_to_cart_checkout.cy.js
  cypress/e2e/demoblaze/catalog_pagination.cy.js

# Full suite
spec: cypress/e2e/demoblaze/**/*.cy.js
```

Artifacts (videos/screenshots) are available in the run summary for easy triage.

---

## 🧰 Common commands

```bash
npm test                    # runs cypress in headless mode via package.json (if configured)
npm run cypress:open        # opens the Cypress app
npm run cypress:run         # headless run
```

Windows PowerShell tips (when execution policy blocks npm/npx):
```powershell
# temporary bypass for this session
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
# or call the .cmd shims
npm.cmd install
npx.cmd cypress run --browser chrome
```

---

## 🐞 Troubleshooting

| Issue | Fix |
| --- | --- |
| **CI**: “Dependencies lock file is not found” | Ensure **package-lock.json** exists at repo root and is committed; CI uses `npm ci` |
| **No spec files found** | Check the `spec` glob matches your file paths |
| **Target site slow / flaky** | Re-run; demo sites can lag. Use retries or increase timeouts if needed |
| PowerShell: `npm.ps1 cannot be loaded` | Use `npm.cmd`/`npx.cmd` or set execution policy (see above) |
| Videos/Screens not in Git | They’re ignored on purpose; CI uploads them as artifacts |

---

## 📌 Notes & Credits

- Target site: **DemoBlaze** (for demo/testing purposes only).
- This project is intentionally lightweight. It showcase working with Cypress and setting CI.
- TO DO: add Page Objects, negative tests, or visual diffs later.
