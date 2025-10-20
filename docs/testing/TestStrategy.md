# Test Strategy — Cypress × DemoBlaze
**Date:** 2025-10-16

## 1. Approach
Risk-based, smoke-first. Cover the most business-critical flows with robust, low-maintenance E2E specs. Keep selectors text-based and tie waits to network events with `cy.intercept`.

## 2. Coverage Matrix (Capabilities → Specs)
| Capability | Risk | Spec |
|---|---|---|
| Checkout (cart → purchase) | High | `add_to_cart_checkout.cy.js` |
| Auth + cart maintenance | High | `auth_login_cart_delete.cy.js` |
| Catalog pagination | Medium | `catalog_pagination.cy.js` |
| Contact us | Low | `contact_form.cy.js` |

## 3. Test Data & State
- **Unique usernames** for signup (timestamp-based).  
- **Ephemeral data** only; assume backend resets.  
- **Idempotence:** tests restore their own state (e.g., delete in cart or verify via totals).

## 4. Non-Functional Considerations
- **Flakiness control:** explicit waits via `cy.intercept`, stable DOM/text selectors, retries in run mode.
- **Speed:** headless Chrome; optional parallelization by splitting specs across jobs.

## 5. Environment & Config
- baseUrl: `https://www.demoblaze.com`  
- viewport: 1366×768; defaultCommandTimeout: 10s  
- artifacts: videos + screenshots on failure (in plan for next release)

## 6. CI
- GitHub Actions job `e2e`.  
- Optional matrix: browser in [chrome, electron].  
- Upload artifacts; publish JUnit (optional) for trends.

## 7. Prioritization
- Execute **High** risk specs on every PR + nightly.  
- Medium/Low on nightly; optional on PR if pipeline budget allows.

## 8. Exit Criteria for a Checkpoint
- All High risk specs pass 2 consecutive runs.  
- No new Sev-1 defects; flake rate ≤ 2%.

## 9. Maintenance
- Review failing tests within 24h; mark flaky if reproduced; open issue with run links.
