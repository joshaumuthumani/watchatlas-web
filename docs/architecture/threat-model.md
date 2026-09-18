# WatchAtlas Web Threat Model

## Scope
This model covers the browser, Next.js API routes on Vercel, Firebase Auth/Firestore, TMDB, and the health-check notification integrations.

## Assets and Actors

### Assets
- `TMDB_API_KEY`, `CRON_SECRET`, and `FIREBASE_ADMIN_SERVICE_ACCOUNT`.
- User identity and preference data (favorite countries/services).
- Cron health state and notification credentials.
- TMDB availability data and application availability.

### Actors
- Anonymous visitor.
- Authenticated user.
- Malicious browser client / automated requester.
- Compromised or misconfigured external integration.
- Vercel/operator account.

## Trust-Boundary Table

| Boundary | Data crossing | Primary risks | Controls |
|---|---|---|---|
| Browser -> Next.js API routes | Search/detail/provider query params | Injection, abuse, excessive upstream cost | Strict parameter validation, bounded pagination, upstream caching, rate limiting |
| Browser -> Firebase Auth | Google credential/token | Account takeover, token misuse | Firebase Auth verification, HTTPS, provider restrictions |
| Browser -> Firestore | User preference reads/writes | Cross-user access, tampering | Firestore rules enforce `request.auth.uid == uid`; schema validation; least privilege |
| Vercel API routes -> TMDB | API key, query params | Secret exposure, abuse, upstream outage | Server-only secret; allowlisted endpoints; bounded input; cache and timeout |
| Vercel cron -> Firestore Admin | Cron state | Unauthorized state mutation | `CRON_SECRET` bearer check; Admin SDK isolated to cron route; strict document path |
| Vercel cron -> Webhooks/email | Health alert payloads | Credential leakage, notification spoofing | Server-only secrets; no sensitive user data; timeout and safe error handling |

## STRIDE Analysis

| Threat | Surface | Risk | Mitigation / verification |
|---|---|---|---|
| Spoofing | Auth callback, cron endpoint | High | Firebase Auth handles credential exchange; verify cron bearer secret; add negative tests for missing/invalid auth |
| Tampering | Firestore preference document | High | Firestore rules and server-side schema validation; test cross-user reads/writes |
| Repudiation | Preference updates, cron transitions | Medium | Minimal structured operational logs without UID/email; record status transitions and request IDs |
| Information disclosure | Client bundle, API errors, logs | High | Never expose server secrets; sanitize errors; remove UID/email debug logs; secret scanning |
| Denial of service | Public TMDB proxy and health endpoint | Medium | CDN caching, timeouts, bounded params, rate limiting or edge protection, upstream failure fallback |
| Elevation of privilege | Admin SDK route, Firestore rules | Critical | Keep Admin SDK only in cron; exact path allowlist; `CRON_SECRET`; review Vercel env access; rules emulator tests |

## Attack-Surface Inventory

- Public Next.js pages and client-side query inputs.
- `/api/tmdb/*` proxy routes.
- `/api/health` and `/api/cron/health-check`.
- Firebase Auth / Google Sign-In integration.
- Firestore user preference rules and named database.
- Notification webhooks and Resend API.
- Vercel deployment and environment settings.
- Dependency supply chain and build artifacts.

## Council Evidence Status

This is a working threat-model draft. The mandatory `security-architect` seat could not be executed because the delegate provider configuration was unavailable; the findings below are repository-grounded analysis and are not a substitute for the required independent seat. A `data-architect` review is also required but unavailable in this Mac environment.

## Priority Findings

1. **High — Firestore rules/schema enforcement must be verified.** The application relies on client-side writes; rules must be deployed and tested to prevent cross-user access or malformed documents.
2. **High — Sensitive auth debug logging exists in the client code.** Remove UID/email logging and ensure production logs do not contain identifiers.
3. **Medium — Public proxy endpoints can be abused.** Add input bounds, timeouts, and platform-level rate limiting where feasible.
4. **Medium — Git history may contain previously committed credentials.** Rotate affected TMDB, Firebase, and Google credentials; run secret scanning.

## Residual Risks and Owners

- TMDB availability and data correctness: product/operator.
- Firebase rules and credential rotation: operator/security owner.
- Vercel environment access and webhook secrets: operator/security owner.
- Rate limiting: platform owner; decision required before materially increasing traffic.

## Verification Criteria

- Automated tests reject invalid cron credentials and unbounded API inputs.
- Firestore emulator/rules tests prove one user cannot read or write another user's preferences.
- Production build contains no server-only secret values.
- Production logs contain no UID/email debug messages.
- Secret scanning and dependency auditing run in CI.
