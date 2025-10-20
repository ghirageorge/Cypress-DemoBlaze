# Test Monitoring Plan — Cypress × DemoBlaze
**Date:** 2025-10-16

## 1. What We Track
- **Pass rate** per spec (PR and nightly)
- **Flaky rate**: tests that pass on retry / total executions
- **Mean runtime** per spec
- **Top failing specs** (7-day window)
- **Infra issues** (site down, CDN errors)

## 2. How We Collect
- Enable Cypress JUnit and JSON outputs (optional):
  - JUnit for CI test summary
  - Upload artifacts (screenshots/videos) on failure
- Tag runs: PR-<number> vs nightly-<date>

## 3. Thresholds & Alerts
- Flaky rate > 2% for P1 for 3 consecutive days → open flaky issue.
- Any P1 failure on PR → block merge.
- Nightly failure rate > 20% → investigate environment or target availability.

## 4. Cadence
- **Per PR:** check CI status, review artifacts on fail.  
- **Daily:** review nightly dashboard; triage new failures.  
- **Weekly:** trend snapshot in Test Report.

## 5. Ownership
- QA Maintainer monitors and triages; assigns owners on defects.


