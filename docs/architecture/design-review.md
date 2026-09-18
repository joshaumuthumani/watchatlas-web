# WatchAtlas Web — Design Review

**Review date:** 2026-09-17
**Repository:** `watchatlas-web`
**Review type:** current-state design and architecture assessment
**Status:** evidence-based draft; not a Stage 3 freeze

## Executive assessment

WatchAtlas has a coherent product boundary and a sensible small-system shape: a Next.js Pages Router application, a server-side TMDB backend-for-frontend, Firebase Auth/Firestore for user preferences, and Vercel scheduled monitoring. The strongest design decision is keeping TMDB credentials behind server routes. The main weakness is not the choice of technologies; it is incomplete boundary enforcement and documentation drift around a system that already has several production trust boundaries.

**Current state: usable foundation, but not yet architecture-gate ready.** The repository contains architecture and product documentation, tests for pure helpers, and explicit operational code. It does not yet contain evidence that Firestore rules, external secret rotation, public-route abuse controls, or the required independent architecture review have been validated.

## What is working well

- **Clear product differentiator:** country-first streaming availability rather than a generic title browser.
- **Appropriate scale fit:** one Next.js deployment with serverless API routes avoids premature service decomposition.
- **Good credential boundary:** `lib/tmdb.ts` calls internal `/api/tmdb/*`; server routes read `TMDB_API_KEY`.
- **Explicit persistence model:** user preferences are normalized before use and stored under `users/{uid}` in the named Firestore database.
- **Operational resilience:** TMDB health probing, cron debounce state, timeouts, CDN caching, and multi-channel notifications are already represented in code.
- **Improving theme correctness:** the latest commit removed the `next-themes` provider/dependency and aligned first paint with the existing `darkMode` preference mechanism.
- **Useful pure-function seam:** `preferences`, provider catalog/merge, country helpers, and image delivery are isolated enough to test without browser infrastructure.

## Current design findings

### 1. Architecture and requirements governance — **BLOCKER for Stage 3 completion**

- The project tier is **load-bearing**, confirmed by Josh on 2026-09-18 and recorded in `docs/DECISIONS.md`; the full Stage 3 Architecture Council is required.
- The repository contains PRDs, but this review cannot establish that Stage 2 requirements are settled/approved for the current work.
- `docs/architecture/architecture.md` and `threat-model.md` were created as working artifacts during this review; they must not be treated as frozen until the council reconciles specialist findings and independent review evidence.
- The required external architecture review pair has not been run in this environment. Missing evidence fails closed.

### 2. Trust boundaries — **partially explicit, incompletely verified**

The browser, Next.js/Vercel runtime, Firebase/Google, TMDB, and notification providers are distinct boundaries. The server-only TMDB key and cron bearer check are visible in code. However:

- Firestore rules are not present in this repository, so cross-user access control cannot be verified from source.
- Client-side Firestore writes rely on deployed rules and client-side normalization; the rules/schema contract is not an artifact here.
- Public TMDB routes have caching, but a repository-wide rate-limit policy is not evident.
- Vercel environment access, rotation history, and webhook permissions are external controls not proven by the repo.

### 3. Data ownership and lifecycle — **clear for v1, under-specified for growth**

The preference document is owned by the authenticated user identity and the cron debounce document is owned by the monitoring job. TMDB remains an external system of record for catalog/provider data. This is a good ownership split for the current product.

Gaps:

- No repository evidence for Firestore retention, deletion/export, or rule tests.
- `favoriteServices` is intentionally global rather than country-specific; this is coherent but should remain an explicit compatibility constraint for future watchlist/alerts work.
- The planned availability snapshot feature would introduce new persistent data, lifecycle, and cron-cost decisions and must trigger a new Stage 3 review.
- Country/continent data has competing sources documented in `docs/ARCHITECTURE.md`; one canonical source should be selected before further geography features.

### 4. Frontend design system — **functional, but carrying drift**

The live shell is `components/AppLayout.tsx` and styling uses CSS variables in `styles/globals.css`, with a dark-first visual direction and an OS-aware first visit. This is a reasonable base for a media discovery product.

Risks:

- `AppLayout` still owns some presentation state and inline style decisions, making token and component-level auditing harder.
- The UI-heavy Stage 3A/4A artifacts required by the canonical process are not present: no locked style record, complete component/state matrix, machine-readable tokens, or accessibility validation report.
- `components/NavBar.tsx` remains dead code according to the architecture docs and contributes duplicate auth/navigation concepts.
- `lib/countryContinents.ts` remains a misleading alternate data source even though current pages use the JSON catalog.
- The design docs mention 42 `Undefined` continent values; this creates a visible taxonomy defect in settings and detail grouping.

### 5. Backend/API design — **good seam, needs consistent policy**

API routes are sensibly grouped by upstream capability and use server-side TMDB access. Caching is a strong choice for a read-heavy discovery product. The main missing cross-cutting concern is a shared validation/error/timeout policy: routes should consistently bound inputs, return stable public errors, and avoid leaking upstream detail.

### 6. Security and operations — **highest immediate risk**

- The local `.env.local` currently contains real-looking credentials. It is gitignored, but the values must be treated as compromised if they have ever been committed or shared; rotate TMDB, Firebase, Google, and any other affected credentials.
- Firestore rules and deployment settings are not reviewable here.
- Public proxy endpoints can be used to amplify TMDB traffic without a documented rate limit.
- Client auth error handling logs raw error details. These may contain provider-specific identifiers or operational information and should be reduced to safe user-facing messages plus controlled server diagnostics.
- Notifications are best-effort and not part of the user-data path, but webhook failures should be observable without logging secrets or payload-sensitive data.

## Three immediate fixes

### Fix 1 — Make the architecture and threat boundaries durable

**Implemented in this review:**

- `docs/architecture/architecture.md`
- `docs/architecture/threat-model.md`
- `docs/architecture/adr/0001-server-side-tmdb-proxy.md`

These documents explicitly name the browser/BFF/external trust boundaries, data ownership, STRIDE threats, attack surface, mitigations, and verification criteria. They are working drafts pending the required council and external review.

**Next verification:** record the Stage 2 settled/approved status, then reconcile the artifacts against specialist review and independent review evidence.

### Fix 2 — Remove PII-bearing client auth logs

**Implemented in this review:** removed the settings-page logs that emitted the user email, client ID prefix, sign-in callback progress, and successful user email. The remaining client errors are limited to setup/failure messages and should still be reviewed before production observability is added.

**Next verification:** run a production bundle/log audit and add a regression check or lint rule preventing `console.log` of auth users, emails, UIDs, credentials, or tokens.

### Fix 3 — Close configuration and data-source drift before adding features

**Immediate action:** treat the checked-out architecture notes as the source of known drift and do not add new geography or account features until:

1. all production-only variables are listed in `.env.local.example` (`CRON_SECRET`, `FIREBASE_ADMIN_SERVICE_ACCOUNT`, `NEXT_PUBLIC_SITE_URL`, and notification variables);
2. Firestore rules/schema tests are supplied from the Firebase project or emulator;
3. the JSON country catalog is declared canonical and the unused competing continent map is removed or explicitly marked as a migration source;
4. the latest theme consolidation is verified with tests/build; and
5. credential rotation is completed outside the repository.

This is intentionally a configuration/governance fix rather than provisioning new services.

## Prioritized recommendation backlog

| Priority | Finding | Recommended owner | Exit evidence |
|---|---|---|---|
| P0 | Stage 2 approval/settled status missing | Product owner | Recorded Stage 2 approval artifact |
| P0 | Mandatory external architecture review absent | Architecture process owner | Versioned pair reports + disposition |
| P0 | Firestore rules not reviewable | Firebase/operator owner | Rules + emulator tests |
| P1 | Credentials may be exposed in history/local workflows | Operator/security owner | Rotations + secret scan |
| P1 | Public proxy abuse controls inconsistent | Backend/platform owner | Validation/rate-limit tests and policy |
| P1 | Country taxonomy has `Undefined` values and competing source | Product/data owner | Canonical dataset and tests |
| P2 | Dead navigation/data modules and unused dependencies | Maintainer | Removal PR + build/test evidence |
| P2 | Page/component/E2E coverage is thin | Test owner | Critical journey browser tests |

## Stage status

- **Stage 3:** blocked/incomplete — the load-bearing tier is recorded, but requirements status, applicable council evidence, and external-review evidence are missing.
- **Stage 3A / 4A:** applicable because this is UI-heavy; not run. A locked design direction and implementation contract do not exist in this review.
- **Stage 4:** not run; diagram must depict the frozen architecture, not this provisional draft.
- **Stage 5:** not run; concrete tooling/components must be independently evaluated before provisioning.
- **Stage 6:** not run; no disposable prototype should be built until Stage 5 validates the stack and the single riskiest question is selected.

## Conclusion

Do not migrate frameworks or split services. The design is fundamentally sound for its current scale. The immediate goal should be to make the existing trust boundaries enforceable and auditable: establish requirements status, verify Firestore rules, rotate credentials, standardize API validation, and complete the required design and architecture gates. Once those are evidenced, the current Next.js + Firebase + TMDB shape is a reasonable candidate to proceed with rather than a reason to replatform.
