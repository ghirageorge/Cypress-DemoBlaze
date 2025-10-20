# Test Plan — Cypress × DemoBlaze
**Date:** 2025-10-16  
**Plan Owner:** QA Maintainer

## 1. Test Items
- Website under test: https://www.demoblaze.com
- Specs:
  - `add_to_cart_checkout.cy.js`
  - `auth_login_cart_delete.cy.js`
  - `catalog_pagination.cy.js`
  - `contact_form.cy.js`

## 2. Features to be Tested
- Browse categories, add to cart, purchase
- Signup/Login and cart maintenance (delete)
- Pagination (next/prev) on catalog
- Contact modal submission

## 3. Features Not Covered
- Payment gateway integration/back-end validation
- Order history persistence
- Admin flows
- Accessibility, performance/load, pen-test

## 4. Test Approach
Follow the strategy document; run High risk specs on PR and all specs nightly. Use risk to inform order: Checkout → Auth+Cart → Pagination → Contact.

## 5. Pass/Fail Criteria
- **Pass:** all assertions met; no uncaught errors; network calls return 2xx where asserted.  
- **Fail:** assertion error, unhandled JS error, or network error that invalidates the scenario.

## 6. Suspension/Resumption
- Suspend if target site is down or returning 5xx/Cloudflare blocks.  
- Resume when health check succeeds and transient blocks cleared.

## 7. Test Deliverables
- Test code, CI config, screenshots/videos on failure, (optional) JUnit/JSON results, nightly **Test Report**.

## 8. Environment
- CI: Ubuntu runners, Node 20, Chrome stable.  
- Local: Windows 11 or macOS; Node 18/20, Chrome stable.

## 9. Schedule 
- **PR pipeline:** High risk specs + smoke.  
- **Nightly (02:00 EET):** all specs.  
- **Weekly summary (Fri):** publish Test Report.

## 10. Responsibilities
- Author: writes specs & maintains CI.  
- Reviewer: code review & sign-off.  
- Maintainer: triage flakes, generate weekly reports.

## 11. Risks & Contingencies
See **Risk Assessment**. If Checkout is unstable, block merges until passing or justified with a tracked defect.

## 12. Approvals
- QA Maintainer: George  
- Repo Owner: George alterego :)
