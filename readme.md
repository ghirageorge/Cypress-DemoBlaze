# Cypress × DemoBlaze (portfolio-ready mini)

A tiny, reliable E2E demo that shows:
- Category navigation + async waits
- Add to cart + modal/alert handling
- Checkout flow with form validation
- `cy.intercept()` on category and add-to-cart
- Optional visual snapshot (baseline on your machine)

## Quick start
```bash
npm i
npm run cypress:open   # or: npm test


<!-- Why this pair: simple SPA with modals and AJAX—perfect for cy.intercept() and UI/network assertions.
Signature demo you’ll implement:

Add to cart from multiple categories (modal assertions)

Checkout flow with cy.intercept() to assert request/response payloads

Visual snapshot on a stable page (home/product)
Skills shown: network stubbing, retryable assertions, fixtures, visual check, Cypress Dashboard-ready specs -->

