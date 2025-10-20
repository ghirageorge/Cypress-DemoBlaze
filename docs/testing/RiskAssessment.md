# Risk Assessment & Prioritization — Cypress × DemoBlaze
**Date:** 2025-10-16

Scoring: **Impact (1–5)** × **Likelihood (1–5)** = **Risk**.  
Priority guidance: P1 (≥15), P2 (8–14), P3 (≤7).

| Spec | Business Impact | Likelihood | Risk | Priority | Rationale | Mitigations |
|---|---:|---:|---:|---|---|---|
| add_to_cart_checkout.cy.js | 5 | 4 | **20** | **P1** | Breaks the core purchase path | Intercepts for by-category/add-to-cart, text selectors, retries in run mode |
| auth_login_cart_delete.cy.js | 4 | 3 | **12** | **P2** | Auth/cart integrity; frequent UI changes possible | Unique usernames, assert navbar auth state, totals recompute check |
| catalog_pagination.cy.js | 3 | 3 | **9** | **P2** | Navigation experience; not revenue-critical | Compare item names across pages, adequate timeouts |
| contact_form.cy.js | 2 | 3 | **6** | **P3** | Non-critical; alert-based confirmation | Stub window.alert, basic modal visibility checks |

**Execution Order:** P1 → P2 (auth) → P2 (pagination) → P3 (contact).  
**Merge Gate (PR):** require P1 pass; recommend P2 pass; allow P3 to be nightly-only if timeboxed.

**Known External Risks:** Demo site resets, CDN slowness, Cloudflare challenges.  
**Operational Mitigations:** increase defaultCommandTimeout, rerun workflow, document transient outages in report.
