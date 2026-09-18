---
title: Fix health-check cron's debounce state on serverless
priority: med
roi: high
status: todo
release: ""
blocked_by: []
related: []
modules: [status-monitoring]
archived: 2026-09-16
questions: []
verify:
  - Before deploying, add FIREBASE_ADMIN_SERVICE_ACCOUNT to the Vercel project (Production and Preview as needed) with the complete Firebase service-account JSON; it must never be committed.
---

`pages/api/cron/health-check.ts` keeps `lastKnownStatus` and `consecutiveFailures` in module-level variables to debounce outage alerts. Because Vercel serverless functions do not guarantee a warm instance between cron invocations, that state can reset silently, causing missed alerts or repeated false alerts. Persist the debounce state across invocations.

## Worth noting
- **Firestore persistence via `firebase-admin`**: use a new dependency and a service-account credential stored as a Vercel secret, rather than the existing client SDK, so an unauthenticated write does not require weaker Firestore security rules.

<!-- agent -->

## Scope
- Persist the cron's debounce state (`lastKnownStatus`, `consecutiveFailures`) in the existing `watchatlaspreference` Firestore database rather than module-level variables, so it survives cold starts between cron invocations.
- Read the persisted state at the start of each invocation and write the updated state at the end. Keep the existing threshold, transition, and notification logic unchanged.
- Use `firebase-admin` with a service-account credential from a new environment variable configured in Vercel project settings and never committed, avoiding a Firestore security-rule change.
- If reading or writing state fails, send no notification for that invocation and fail it rather than infer a transition from incomplete state. Returning a `500` rather than a silent `200` keeps the failure visible in Vercel's cron and function logs.

## Todo
- [x] Add `firebase-admin` as a dependency.
- [x] Add `lib/firebaseAdmin.ts`: initialize the admin app once from a service-account credential in a new environment variable, guarding against re-initialization on warm invocations; export the named `watchatlaspreference` Firestore instance. If the private key uses escaped `\n` sequences to fit a PEM key in one environment variable, unescape them before passing it to `cert()`.
- [x] Add `lib/cronState.ts` exporting one object, `export const cronState = { getDebounceState, saveDebounceState }`, rather than loose named exports. This lets tests call `t.mock.method(cronState, ...)` without Node's `--experimental-test-module-mocks` flag, which the project's `npm test` script does not set. `getDebounceState()` returns `{ lastKnownStatus, consecutiveFailures }` from `system-status/health-check-debounce`—separate from the existing `users` collection—and defaults to `{ lastKnownStatus: null, consecutiveFailures: 0 }` when the document does not exist. `saveDebounceState(state)` writes with `{ merge: true }`.
- [x] Update `pages/api/cron/health-check.ts`: remove the module-level `lastKnownStatus` and `consecutiveFailures`, load state with `cronState.getDebounceState()` before the existing debounce logic, and call `cronState.saveDebounceState()` with the computed values before responding. Leave the threshold, transition, and notification logic unchanged.
- [x] Wrap `cronState.getDebounceState()` and `cronState.saveDebounceState()` in `try`/`catch`: on failure, log the error, skip `sendAllNotifications`, and respond with `500` and an `error` field describing the persistence failure, without throwing. The `500` ensures Vercel's cron and function failure logs surface an otherwise silent alerting outage.
- [x] Add `tests/healthCheckCron.test.ts`. Use `t.mock.method(cronState, "getDebounceState" | "saveDebounceState", ...)` from `lib/cronState` and mock `global.fetch` with the pattern in `tests/tmdbRoutes.test.ts`. Cover a first run with no state, degradation persisted across two runs until the alert threshold, recovery after persisted degradation, and a persistence failure that returns `500` and skips notification without throwing.
- [x] Document the new environment variable's name and required Vercel project setting in the PR description; the repository has no `.env.example` to update.

## By `tech-stack-advisor` agent

| Option | What it is | Pros | Cons |
| --- | --- | --- | --- |
| `firebase-admin` | Official Google server SDK, v14.4.0 (September 2026), Apache-2.0, and a new dependency | Writes to the existing `watchatlaspreference` Firestore database with a service account, bypassing security rules without changing them | Adds a dependency and requires a service-account credential as a new secret |
| `firebase` (already installed, client SDK) | Use the client SDK already in `package.json` from the cron route | No new dependency | Subject to Firestore security rules; the document would need a rule permissive enough for unauthenticated writes, exposing it to anyone who discovers the path rather than only the cron |
| Write it ourselves (no store) | Retain today's module-level debounce state | No cost | Does not fix the bug; this is the behavior the card exists to replace |

**Pick: `firebase-admin`** — reuse the project's existing Firestore database without allowing unauthenticated writes through its security rules.

## Decided by the agent
- **Persistence failures fail visibly**: if reading or writing the debounce document fails, log the error, skip the notification rather than act on stale state, and respond `500` so Vercel's cron logs reveal the alerting failure.

### Overruled by the user
