# Test Policy — Cypress × DemoBlaze
**Project:** Portfolio E2E Demos (Cypress)  
**Date:** 2025-10-16

## 1. Purpose
Define the principles, responsibilities, and quality objectives governing testing for the DemoBlaze E2E automation project. This policy applies to all test assets in the repository and CI pipelines.(optional)

## 2. Quality Objectives
- **Functional correctness:** Critical user journeys (browse, add to cart, checkout, login, cart maintenance) must be automated and stable.
- **Stability/Flake tolerance:** ≤ 2% flaky rate per rolling 14 days (retries included).
- **Maintainability:** Tests follow clear structure, resilient selectors, and reviewable code.
- **Traceability:** Each test maps to a user-facing capability and a risk category.

## 3. Test Levels & Scope
- **E2E UI tests (Cypress):** cover main happy paths + selected negative cases.
-- **Out of scope:** performance/load, security, accessibility audits (can be added later).

## 4. Environments
- **Target:** https://www.demoblaze.com (public demo, data resets are expected).
- **Browsers:** Chrome stable in CI; Electron as fallback. Local dev may add Edge/Firefox with separate jobs.
- **Data:** Ephemeral test data; avoid long-lived assumptions.

## 5. Tools
- Cypress v15+ (Node 18/20)/ GitHub Actions for CI, artifacts (videos/screenshots), JUnit/JSON reporters (optional).

## 6. Roles & Responsibilities
- **Author/Maintainer:** creates tests, reviews PRs, maintains CI, triages flakes.
- **Reviewer:** code review, approves changes, ensures policy compliance. (mininum  AI review)

## 7. Entry/Exit Criteria
**Entry:** repo accepted; baseUrl configured.  
**Exit:** all P1 tests pass; no open Sev-1 defects; flaky rate under threshold.

## 8. Defect Management
- Defects tracked in repository issues (labels: `bug`, `flaky`, `infra`).
- Include: steps, expected/actual, screenshots/video links, failing spec, CI run URL.

## 9. Reporting & Cadence
- **Per-PR:** CI status + artifacts.  
- **Daily/Nightly:** scheduled run, trend summary.  
- **Release/Checkpoint:** publish a test report using the template in this repo.

## 10. Change Control
- Tests added/changed via PR with review; major structure changes require approval from maintainer.
