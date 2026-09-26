# WatchAtlas — Decision Log

Running log of significant decisions: date, decision, alternatives considered, why.
Entries marked `[inferred]` were reconstructed from code and git history during onboarding (2026-07-19) — the rationale is a best guess, not a commitment. Entries without the marker were decided together and are authoritative.

---

## 2026-09-26 — Graphify retired; Serena is the sole code-navigation aid

- **Decision:** Removed Graphify from WatchAtlas entirely, following the canonical inventory-first cutover procedure (`serena-code-intelligence-reference.md` § Existing-repository cutover from Graphify) — the same pattern Ledger completed on 2026-09-20. Deleted `.github/workflows/graphify-lifecycle.yml`, `.github/scripts/graphify-gate.sh`, the generated `docs/graphify.json` and `docs/graphify-refresh-log.jsonl` markers, and `graphify-out/GRAPH_REPORT.md`; removed the now-unused `graphify-out/*` exception from `.gitignore`.
- **Serena added first, per the canonical step ordering:** generated and verified `.serena/project.yml` (TypeScript language server, `default_modes: [no-memories]`, no absolute paths or secrets) via `serena project create . --ls typescript --index` — 51 TypeScript files indexed. Ran `serena project health-check` (exit 0): `GetSymbolsOverviewTool`, `FindSymbolTool`, and `FindReferencingSymbolsTool` all executed successfully against real project symbols. Repeated the same health-check from a separate fresh clone containing only the committed `.serena/.gitignore` + `project.yml` (no copied cache): identical file count (51) and identical symbol/reference results, confirming the index is rebuildable from committed config alone, not a hidden dependency on machine-local state.
- **Why now, not earlier:** this is a straightforward retrofit oversight, not a deliberate deferral — Ledger and Chronicle already completed the equivalent cutover in September; WatchAtlas's `graphify-lifecycle.yml` kept running unnoticed. Confirmed before deleting anything (canonical step 3, "confirm no consumer exists"): `git rulesets` show branch protection's required status checks are only `test`, `gitleaks`, `semgrep`, `dependency-audit`, `Vercel` — no Graphify check was ever required. Neither `independent-review.yml` nor `pr-verdict.yml` waits on a "Graph freshness" check. The job produced a committed artifact with zero downstream consumer, run on every PR (hosted runner) and every push-to-main (self-hosted runner + a minted GitHub App token), for pure CI cost.
- **One real consumer found and resolved before deletion:** `docs/kanban/todo/2-remove-dead-navbar-component.md` (status `implementing`) contained an open `[user]` question asking whether to run a trusted Graphify refresh to confirm `NavBar.tsx` had no remaining references. Verified the underlying work (`NavBar.tsx` deletion, production-build fix) already shipped in commit `5139eee` (2026-09-18) — `grep` confirms zero remaining references to `NavBar` in any `.ts`/`.tsx` file. The card was stale, not a live blocker; resolved and archived (`akb raw archive 2`) rather than deleted by hand, per the kanban tool's own archival contract.
- **Not removed by this entry (operator-owned, per canonical step 6):** the `GOOSE_GH_APP_ID` / `GOOSE_GH_APP_PRIVATE_KEY` GitHub Actions secrets that the deleted lifecycle workflow used to mint its post-merge commit token. No other workflow in this repo references either secret — confirmed via `grep -rl "GOOSE_GH_APP" .github/`, zero hits post-deletion. Josh should remove them from repo secrets manually once this PR merges.
- **Historical references left untouched, on purpose:** `TOKEN_LOG.md`'s 2026-08-15 entry, `.ai-code-review/changes/*.json`, and `docs/kanban/deliveries/8bwqsmb8.json` all mention Graphify as a record of past work — per the canonical rule, history is preserved in Git, never rewritten or scrubbed to fabricate a clean-slate narrative.
- **Scope:** CI/tooling cutover only — no application code, architecture, or evaluation content was authored or altered by this entry.

---

## 2026-09-26 — Linear cutover: WatchAtlas's sole planning/intent store is now Linear (supersedes 2026-09-18 GitHub-authority entry)

- **Decision:** Per the canonical `sdlc-pipeline.md` / `github-projects-webhook-sync.md` org-wide policy (Linear is authoritative for planning; GitHub Issues/Projects are optional non-authoritative projections), WatchAtlas's declared intent store is now **Linear** — workspace `josh-muthumani`, team `JOS`. This supersedes the 2026-09-18 "Control-plane authority and no-webhook reconciliation" entry, which had named GitHub Issues + Project #13 "WatchAtlas Board" as authoritative. Same pattern as Ledger (PR #201/#247) and Chronicle (PR #137).
- **Migration mechanism:** Linear's native GitHub importer (Settings → Import/Export → GitHub), run manually by Josh against `aurora-peak/watchatlas-web`, not the `linear` CLI/API — this is a one-time bulk import, not a scriptable steady-state operation.
- **Verification:** All 34 previously-open GitHub issues confirmed present in Linear under the `WatchAtlas` project by title match (34/34, zero missing either direction), with `type:` labels and Feature→Story parent/sub-issue hierarchy preserved intact by the importer. Cross-checked via `linear issues list` and `gh issue list`.
- **Migration inventory — all 34 previously-open GitHub issues, now closed on GitHub with a pointer comment to their new Linear ID:**

| GitHub issue | Type | Linear ID | Linear parent |
|---|---|---|---|
| [#3](https://github.com/aurora-peak/watchatlas-web/issues/3) | Feature | JOS-159 | — |
| [#4](https://github.com/aurora-peak/watchatlas-web/issues/4) | Feature | JOS-160 | — |
| [#5](https://github.com/aurora-peak/watchatlas-web/issues/5) | Feature | JOS-161 | — |
| [#6](https://github.com/aurora-peak/watchatlas-web/issues/6) | Feature | JOS-162 | — |
| [#7](https://github.com/aurora-peak/watchatlas-web/issues/7) | Feature | JOS-163 | — |
| [#8](https://github.com/aurora-peak/watchatlas-web/issues/8) | Feature | JOS-164 | — |
| [#9](https://github.com/aurora-peak/watchatlas-web/issues/9) | Feature | JOS-165 | — |
| [#10](https://github.com/aurora-peak/watchatlas-web/issues/10) | Feature | JOS-166 | — |
| [#11](https://github.com/aurora-peak/watchatlas-web/issues/11) | Feature | JOS-167 | — |
| [#12](https://github.com/aurora-peak/watchatlas-web/issues/12) | Bug | JOS-168 | — |
| [#16](https://github.com/aurora-peak/watchatlas-web/issues/16) | Story | JOS-169 | JOS-160 |
| [#17](https://github.com/aurora-peak/watchatlas-web/issues/17) | Story | JOS-170 | JOS-160 |
| [#18](https://github.com/aurora-peak/watchatlas-web/issues/18) | Story | JOS-171 | JOS-160 |
| [#19](https://github.com/aurora-peak/watchatlas-web/issues/19) | Story | JOS-172 | JOS-161 |
| [#20](https://github.com/aurora-peak/watchatlas-web/issues/20) | Story | JOS-173 | JOS-161 |
| [#21](https://github.com/aurora-peak/watchatlas-web/issues/21) | Story | JOS-174 | JOS-161 |
| [#22](https://github.com/aurora-peak/watchatlas-web/issues/22) | Story | JOS-175 | JOS-162 |
| [#23](https://github.com/aurora-peak/watchatlas-web/issues/23) | Story | JOS-176 | JOS-162 |
| [#24](https://github.com/aurora-peak/watchatlas-web/issues/24) | Story | JOS-177 | JOS-162 |
| [#25](https://github.com/aurora-peak/watchatlas-web/issues/25) | Story | JOS-178 | JOS-162 |
| [#26](https://github.com/aurora-peak/watchatlas-web/issues/26) | Bug | JOS-179 | — |
| [#28](https://github.com/aurora-peak/watchatlas-web/issues/28) | Task | JOS-180 | — |
| [#29](https://github.com/aurora-peak/watchatlas-web/issues/29) | Story | JOS-181 | JOS-163 |
| [#35](https://github.com/aurora-peak/watchatlas-web/issues/35) | Bug | JOS-182 | — |
| [#42](https://github.com/aurora-peak/watchatlas-web/issues/42) | Unlabeled | JOS-183 | — |
| [#43](https://github.com/aurora-peak/watchatlas-web/issues/43) | Unlabeled | JOS-184 | — |
| [#45](https://github.com/aurora-peak/watchatlas-web/issues/45) | Bug | JOS-185 | — |
| [#47](https://github.com/aurora-peak/watchatlas-web/issues/47) | Bug | JOS-186 | — |
| [#48](https://github.com/aurora-peak/watchatlas-web/issues/48) | Bug | JOS-187 | — |
| [#49](https://github.com/aurora-peak/watchatlas-web/issues/49) | Task | JOS-188 | — |
| [#50](https://github.com/aurora-peak/watchatlas-web/issues/50) | Bug | JOS-189 | — |
| [#91](https://github.com/aurora-peak/watchatlas-web/issues/91) | Unlabeled | JOS-190 | — |
| [#92](https://github.com/aurora-peak/watchatlas-web/issues/92) | Unlabeled | JOS-191 | — |
| [#93](https://github.com/aurora-peak/watchatlas-web/issues/93) | Unlabeled | JOS-192 | — |

- **GitHub Project retired:** Closed "WatchAtlas Board" (user-level GitHub Project #13, `joshaumuthumani`) — it is now a stale non-authoritative surface per the org-wide policy, not deleted (history preserved).
- **Still open (not part of this entry):** the Linear-aware `work-item-link` CI check (validating `Resolves JOS-<id>` via the Linear GraphQL API, per Chronicle's PR pattern) is not yet wired — it needs a new `LINEAR_CI_READ_KEY` repository secret that only Josh can add. Until that check lands, `CLAUDE.md`'s "every change maps to a GitHub issue" workflow section is stale and should be read as "every change maps to a Linear issue" — not yet updated in this entry; tracked as a follow-up.
- **Scope:** planning/intent-store cutover only — no application code, architecture, or evaluation content was authored or altered by this entry.

## 2026-09-25 — SDLC sync: declared Stage 3, in progress (issue #98)

- **Decision:** Add the README Stage/Tier line required by Stage 1 (`docs/sdlc-sync-contract.md` in `projects-status`). Declared stage is **3, in progress** — the lower of two candidate readings, per the sync skill's "never inflate; when ambiguous, declare the lower stage" rule.
- **Evidence for Stage 3 (mechanical, file-existence only):** `docs/architecture/` is non-empty (`architecture.md`, `threat-model.md`, `design-review.md`, `adr/0001-server-side-tmdb-proxy.md`); tier confirmed in the 2026-09-17 entry below.
- **Evidence against declaring higher:** `docs/architecture/design-review.md` (dated 2026-09-17) states in its own words that Architecture and requirements governance is a **"BLOCKER for Stage 3 completion"** and that the repo is "not yet architecture-gate ready." No later entry in this log records the council reconciling or freezing that review.
- **Flagged drift (not resolved by this entry):** git history shows continued feature development and real merged PRs (e.g. #58, #59, #60 and later) flowing through an operating Stage 10 PR gate (`.github/workflows/ci.yml`, `independent-review.yml`, `pr-verdict.yml`) after the 2026-09-17 blocker was recorded. That is Stage 9/10-level activity happening while Stage 3 is still marked blocked in this repo's own documentation. This sync intentionally does not resolve that contradiction — it surfaces it for the repo owner to either formally close Stage 3 (reconcile the council findings, freeze the architecture docs) or explicitly accept continuing to build ahead of it.
- **Gaps not filled by this sync (declared stage is 3, so these sit beyond it and are reported, not fabricated):** Stage 3A design-direction artifacts (`docs/design/` was empty — a stub was added, see below), Stage 5 (`docs/evaluations/`), Stage 7 (`docs/planning/` — related planning content exists under `docs/superpowers/plans/` and `docs/kanban/` instead, a `present_under_different_name` candidate the repo owner should confirm rather than this sync renaming anything), Stage 9.5 (`work-item-link.yml`), Stage 11 (`docs/review-policy.md`). `.github/workflows/gate.yml` is also absent; `ci.yml` + `security.yml` appear to cover the same isolation/scan intent (another `present_under_different_name` candidate, same pattern as Ledger PR #201).
- **Scope:** bookkeeping only — no architecture, PRD, threat-model, or evaluation content was authored or altered by this entry.

## 2026-09-18 — Control-plane authority and no-webhook reconciliation (issue #81)

- **Authority:** GitHub Issues, projected into GitHub Project #13 WatchAtlas Board, is the single authoritative intent/work-item source for approved requirements, Feature/Story/Task/Bug hierarchy, ownership, stage gates, acceptance criteria, and approvals. GitHub remains authoritative for issue/PR lifecycle, checks, reviews, merges, and closes. Titles are not identity keys; Issue IDs and Project item IDs are.
- **Webhook decision:** No event-driven repository webhook is configured at this time. This is an explicit owner-approved skip, not an unconfigured integration.
- **Reason and impact:** WatchAtlas has an executable backlog, but a dedicated public HTTPS receiver, webhook secret/HMAC verification, delivery-id audit/idempotency store, least-privilege App, retry/alerting, and reconciliation owner are not yet justified. Project #13 is updated manually as issues/PRs change and reviewed by periodic reconciliation; it is not real-time automation.
- **Manual process:** Each repository change links exactly one canonical GitHub Issue. Project #13 records operational Status and blocked reasons. PR/review/check/merge facts are verified from GitHub before Project updates. Ambiguous close-without-merge outcomes are flagged for owner review rather than treated as completion.
- **Review date:** Reassess event-driven webhook synchronization before a second actively maintained repository projection or when manual reconciliation creates material delivery drift; otherwise at the next Stage 1 control review.

## 2026-09-18 — Public-repository exception for Stage 10 external review (issue #72)

- **Decision:** Install canonical Stage 10 Phase 2 and Phase 3 workflow logic with `runs-on: ubuntu-latest` for both jobs.
- **Trust boundary:** WatchAtlas is public. Phase 2 is triggered by pull requests and processes PR-derived data with a credentialed external reviewer. The local Apple-Silicon runner has root and Docker-host access; public, fork, and untrusted PR activity must not reach it.
- **Exception:** GitHub-hosted execution is mandatory for this public-facing Phase 2/3 chain. This preserves the isolation rule for CI and security; it is not an adapter-availability fallback.
- **Bootstrap:** The initial Phase 3 workflow-run approval cannot be proven until its workflow exists on main. The first bootstrap merge needs human approval. Then a disposable PR must prove exact-SHA Phase 2 evidence and a formal APPROVED review from pr-external-review-bot.
- **Operator dependency:** OPENROUTER_PR_APPROVER_KEY and PR_EXTERNAL_REVIEW_APP_PRIVATE_KEY_B64 remain operator-managed. No secret value is committed, read, or configured by this change.

## 2026-09-18 — Trusted Graphify refresh runner boundary (issue #69)

- **Decision:** Route only the `Refresh Graphify report` job to `[self-hosted, local-linux-ci]`. It runs exclusively after a trusted `main` push or an owner-initiated manual dispatch.
- **Trust boundary:** WatchAtlas is public. The local Apple-Silicon runners run as root and can access the host Docker socket (Docker-outside-of-Docker); any job on them can control the host Docker daemon. Public, fork, and otherwise untrusted pull-request source must never reach those runners.
- **Hosted-runner exception:** `.github/workflows/ci.yml` and `.github/workflows/security.yml` retain `ubuntu-latest` for every pull-request checkout, test, and scanner job. This is a required isolation control, not an availability fallback.
- **Why:** The Graphify job has no `pull_request` trigger and is restricted to protected-`main` source or a repository-owner manual dispatch. That bounded trusted surface may use the already registered local runner pool without widening the Docker-host trust boundary.
- **Verification:** A real manually dispatched run must be shown in GitHub Actions metadata/logs as claimed by `watchatlas-local-linux-ci-1`, `-2`, or `-3` before this routing is considered effective.

## 2026-09-17 — Architecture review artifacts and current gate status

- **Decision:** Keep the current single-application shape as the provisional architecture: Next.js Pages Router on Vercel, server-side TMDB proxy routes, Firebase Auth/Firestore for preferences, and a separately protected monitoring cron.
- **Why:** It matches the current product scope and existing boundaries without introducing service or deployment complexity prematurely.
- **Security change:** Explicitly document browser/BFF/external trust boundaries, STRIDE risks, and verification criteria in `docs/architecture/`.
- **Project tier:** **load-bearing**, confirmed by Josh on 2026-09-18. The full Stage 3 Architecture Council is required; the throwaway-tier exemption does not apply.
- **Status:** Provisional, not frozen. Stage 3 remains blocked until Stage 2 requirements status is recorded, required council evidence is complete, and the mandatory external architecture review pair is available.
- **Immediate fixes:** Removed PII-bearing settings-page auth logs and expanded `.env.local.example` to include deployment-only monitoring variables. Credential rotation remains an operator action outside this repository.

## [inferred] Pivot from Expo/React Native to a Next.js web app

- **Date:** pre–git history of this repo (a `.expo/` remnant remains)
- **Decision:** Rebuild WatchAtlas as a web app on Next.js 14 (Pages Router) instead of continuing the Expo mobile app.
- **Why (guess):** Faster iteration, single deploy target (Vercel), no app-store friction for a content-discovery product.

## [inferred] Proxy all TMDB calls through internal API routes

- **Date:** early in repo history
- **Decision:** The browser never calls TMDB directly; `lib/tmdb.ts` hits `/api/tmdb/*`, which call TMDB server-side with `Cache-Control: s-maxage` CDN caching.
- **Alternatives:** direct client calls with `NEXT_PUBLIC_TMDB_API_KEY`.
- **Why (guess):** Hide the API key, centralize error handling, and get Vercel CDN caching for free. The key migration (`TMDB_API_KEY` server-only, dropping the `NEXT_PUBLIC_` fallback) is still in flight.

## [inferred] Firebase (Google-only auth + Firestore) for user preferences

- **Date:** early in repo history
- **Decision:** Google sign-in via GSI + Firebase Auth; preferences (`favoriteCountries`, `darkMode`) in a **named** Firestore database `watchatlaspreference` under `users/{uid}`.
- **Alternatives:** no accounts (localStorage only), NextAuth, Supabase.
- **Why (guess):** Minimal-friction single-provider auth; Firestore free tier fits a tiny per-user document. The named (non-default) database looks deliberate but its reason is undocumented — possibly region or project-organization related.

## [inferred] Country-centric "where to watch" as the core differentiator

- **Date:** ongoing
- **Decision:** Detail pages group TMDB watch-provider data by country and continent (`lib/getDisplayCountries.ts`, `lib/countryContinents.ts`), filterable by the user's favorite countries.
- **Why (guess):** Global availability comparison is the product's reason to exist versus TMDB itself or JustWatch's single-country view.

## [inferred] Remove AI recommendations (Gemini)

- **Date:** 2026 (commits `60ab384` → `5df64da` "remove AI tech debt")
- **Decision:** After iterating on Gemini-powered recommendations (model updates, 1.5-flash, fallback chain), rip the feature out entirely and simplify the UI (merge browse into home).
- **Why (guess):** Maintenance cost and quality didn't justify the feature; simplification preferred. A stale `GEMINI_API_KEY` env entry remains.

## [inferred] Uptime monitoring with multi-channel alerting

- **Date:** recent (commits `e8108a4` and earlier)
- **Decision:** `/api/health` TMDB probe + `StatusBanner` polling + daily Vercel cron (`/api/cron/health-check`, `CRON_SECRET`-protected) that fans out Discord/Slack/Resend-email alerts on status transitions with a 2-failure debounce. The debounce document is stored in `watchatlaspreference/system-status/health-check-debounce` through `firebase-admin`, using a Vercel service-account secret.
- **Why (guess):** TMDB is a hard dependency; surface outages to users (banner) and to the operator (alerts). Persisting the debounce state keeps the alert transition logic reliable across serverless cold starts without weakening client Firestore rules.

## [inferred] Dark-first hand-rolled design system on Tailwind v4

- **Date:** ongoing
- **Decision:** CSS-variable design system in `styles/globals.css` with dark as default and a `.light` override class; NextUI for components.
- **Why (guess):** Media-browsing apps read better dark; variables allow theming without a framework. Two theme mechanisms (next-themes vs. the custom `darkMode` toggle) currently coexist — likely unintentional drift, not a decision.

---

## 2026-07-19 — Apple platform apps: SwiftUI multiplatform, hybrid backend, app-aware redesign

- **Decision:** Launch iOS/iPadOS/macOS/tvOS apps as a program of sub-projects (see `docs/superpowers/specs/2026-07-19-apple-apps-program.md`). Stack: Swift + SwiftUI multiplatform. Backend: hybrid — native Firebase SDK for auth/user data, existing Next.js API routes for TMDB/discover/recommendations. Sequencing: app requirements + API contract (5a, incl. Sign in with Apple) are nailed down as an **input to the UI redesign**, so #1 produces one cross-platform design language.
- **Alternatives:** React Native / Capacitor (weak tvOS+macOS); full BFF or Firebase-only backends; apps entirely before or entirely after the redesign.
- **Why:** Only SwiftUI treats all four targets as first-class; hybrid mirrors the proven web architecture without re-exposing the TMDB key; an app-aware redesign avoids restyling the apps right after launch.

## 2026-07-19 — Roadmap order: services → watchlist/alerts → AI recs → UI redesign

- **Decision:** Build in this order: (1) preferred-services selection, (2) watchlist + leaving/coming-soon alerts, (3) proper AI recommendation engine, (4) complete UI redesign last — with the redesign now taking the Apple-apps requirements (5a) as an input, and the app builds following it.
- **Alternatives:** UI-first; AI-first.
- **Why:** Services preference is foundational and feeds both the watchlist alerts (scoped to your services/countries) and the recommender (subscription signals). Redesigning the UI last means every surface exists before restyling. Noted risk for watchlist alerts: TMDB exposes only *current* availability, so leaving/coming-soon needs snapshot-diffing or another source — to be resolved in that project's brainstorm.

## 2026-07-19 — Watchlist alerts via global snapshot-diffing, in-app only

- **Decision:** Detect availability changes by daily-diffing TMDB provider data per unique watchlisted title (global snapshots + append-only events), surfaced in-app on a dedicated `/watchlist` page as a badged grid with a 7-day badge window. Requires firebase-admin for the cron. No email; no predictive "leaving soon" in v1.
- **Alternatives:** third-party expiry API (paid vendor, patchy coverage — event schema leaves room to add it later as `changeType: "leaving"`); per-user diffing (cost scales with users instead of titles); email digests (own project later).
- **Why:** Free, TMDB-terms-safe, and honest about what the data supports; global diffing keeps cron cost proportional to unique titles. Full design: `docs/superpowers/specs/2026-07-19-watchlist-availability-design.md`.

## 2026-07-19 — Ship the roadmap as two releases: Phase 2 (v2.0) and Phase 3 (v3.0)

- **Decision:** The PRD (`docs/PRD.md`) frames the roadmap as two releases against the shipped v1.0 web app. **Phase 2** = preferred services, watchlist + availability alerts, AI recommendations, and the cross-platform UI redesign (with app requirements 5a as a gating input). **Phase 3** = the Apple app builds themselves (5b–5e) plus App Store release operations.
- **Alternatives:** one undifferentiated backlog; a release per feature; putting the redesign in Phase 3 alongside the apps.
- **Why:** Phase 2 is everything that ships on the existing web stack and can go out as one coherent product update; Phase 3 introduces a genuinely new platform, toolchain, and external dependency (App Store review) and shouldn't gate web releases. Keeping the redesign in Phase 2 — but after 5a — means the apps start against a finished design language instead of driving one.

## 2026-07-19 — Adopt standard project docs + GitHub backlog structure

- **Decision:** Onboard WatchAtlas to the standard workflow: `docs/ARCHITECTURE.md`, this decision log, `CLAUDE.md`, `GitHub-Project-Setup.md`, `type:` labels, and a "WatchAtlas Board" user-level GitHub Project.
- **Why:** Consistency with other projects (chronicle, trove, ledger); gives agents and Josh a shared map and a captured-work rule.

## 2026-07-19 — Preferred services are one flat global set, and only reorder

- **Decision:** `favoriteServices` is a single flat list of TMDB provider IDs applied across every favorite country, not a per-country mapping. On detail pages the selection only ever reorders providers into "Your services" and "Also available on" — nothing is hidden.
- **Alternatives:** per-country service selections; a "my services only" filter toggle.
- **Why:** TMDB provider IDs are global (Netflix is 8 everywhere), so a flat set is coherent — a service simply never matches in a country where it does not operate. Reordering rather than filtering keeps the country-comparison view, which is the product's reason to exist, intact.
- **Scope note:** the split applies to the three streaming tiers — `flatrate`, `free` and `ads` — matching `STREAMING_KEYS` in `lib/providerPreferences.ts` and the `with_watch_monetization_types` set that `pages/api/tmdb/discover.ts` queries. `rent` and `buy` are excluded and keep their existing flat rendering — a "your services" framing on purchase tiers would read as endorsement.
