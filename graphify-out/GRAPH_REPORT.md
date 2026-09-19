# Graph Report - watchatlas-web  (2026-09-19)

## Corpus Check
- 100 files · ~117,380 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 3, .example 1, .toml 1)

## Summary
- 569 nodes · 802 edges · 42 communities (26 shown, 16 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 61 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ce0ec3ec`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- preferences.ts
- tmdb.ts
- WatchAtlas — Decision Log
- providerCatalog.ts
- package.json
- ref_node_assert
- [id].tsx
- AppLayout
- compilerOptions
- WatchAtlas — Product Requirements
- ResilientImage.tsx
- WatchAtlas — Product Requirements (Core)
- GitHub Project Setup — Reusable Playbook
- WatchAtlas Web Threat Model
- Design
- Design
- Design
- dependencies
- Decomposition
- 2-remove-dead-navbar-component.md
- ai-code-review-prompt-2026-08-19T21-46-03-097Z.md
- Architecture Specification: WatchAtlas Web
- ADR-0001: Keep TMDB Access Behind a Server-Side Proxy
- GitHub Project, Webhook, and Intent-Store Declaration
- api/health.ts
- Kanban board
- Shipped
- extends
- vercel.json
- config.md
- decisions.md
- redesign.md
- rejected.md
- modules.md
- releases.md
- countryContinents.ts
- next-env.d.ts
- TOKEN_LOG.md
- global.d.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 18 edges
2. `WatchAtlas — Decision Log` - 18 edges
3. `compilerOptions` - 17 edges
4. `useAuth()` - 14 edges
5. `GitHub Project Setup — Reusable Playbook` - 13 edges
6. `UserPreferences` - 11 edges
7. `getTMDBImageUrl()` - 11 edges
8. `WatchAtlas — Product Requirements (Core)` - 11 edges
9. `WatchAtlas — Product Requirements` - 11 edges
10. `Global Constraints` - 11 edges

## Surprising Connections (you probably didn't know these)
- `4. `/discover` page` --references--> `ShowCard()`  [INFERRED]
  docs/superpowers/specs/2026-07-19-ai-recommendations-design.md → components/ShowCard.tsx
- `5. Home row — "On My Services"` --references--> `ShowCard()`  [INFERRED]
  docs/superpowers/specs/2026-07-19-preferred-services-design.md → components/ShowCard.tsx
- `4. `/watchlist` page UI (Option B — badged grid)` --references--> `ShowCard()`  [INFERRED]
  docs/superpowers/specs/2026-07-19-watchlist-availability-design.md → components/ShowCard.tsx
- `Task 8: Two-tier provider split logic` --references--> `FavoriteService`  [INFERRED]
  docs/superpowers/plans/2026-07-19-preferred-services.md → lib/preferences.ts
- `5.1 Preferred streaming services — *spec: `2026-07-19-preferred-services-design.md`, issue #3*` --references--> `UserPreferences`  [INFERRED]
  docs/PRD.md → lib/preferences.ts

## Import Cycles
- None detected.

## Communities (42 total, 16 thin omitted)

### Community 0 - "preferences.ts"
Cohesion: 0.09
Nodes (42): LoadState, ServicePicker(), ServicePickerProps, HealthStatus, Auth & preferences, Task 1: Add `favoriteServices` to the preference model, Task 4: "My Services" picker in Settings, AuthContext (+34 more)

### Community 1 - "tmdb.ts"
Cohesion: 0.05
Nodes (23): Props, ShowCard(), Known drift & issues (as of 2026-07-19), Acceptance criteria, By `ui-designer` agent, Decided by the agent, Overruled by the user, Scope (+15 more)

### Community 2 - "WatchAtlas — Decision Log"
Cohesion: 0.04
Nodes (45): Architecture ground rules, CLAUDE.md — WatchAtlas, Commands, Guardrails, What this is, Workflow — no uncaptured work, StatusBanner(), Data flow (TMDB) (+37 more)

### Community 3 - "providerCatalog.ts"
Cohesion: 0.08
Nodes (32): Global Constraints, Preferred Streaming Services Implementation Plan, Self-Review, Task 10: Update the docs and open the PR, Task 2: Provider-catalog merge logic, Task 3: `GET /api/tmdb/providers-list` route, Task 5: Discover merge logic, Task 6: `GET /api/tmdb/discover` route (+24 more)

### Community 4 - "package.json"
Cohesion: 0.06
Nodes (35): devDependencies, autoprefixer, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss, tsx (+27 more)

### Community 5 - "ref_node_assert"
Cohesion: 0.09
Nodes (25): By `tech-stack-advisor` agent, Decided by the agent, Overruled by the user, Scope, Todo, Worth noting, cronState, DebounceState (+17 more)

### Community 6 - "[id].tsx"
Cohesion: 0.10
Nodes (24): Task 9: Two-tier where-to-watch on the detail page, 6. Detail page — two-tier where-to-watch, 7. Pure logic + tests, Country, getCountryList(), getCountryMeta(), lib_full_country_list_with_flags, getDisplayCountries() (+16 more)

### Community 7 - "AppLayout"
Cohesion: 0.07
Nodes (26): AppLayout(), 1. Architecture and requirements governance — **BLOCKER for Stage 3 completion**, 2. Trust boundaries — **partially explicit, incompletely verified**, 3. Data ownership and lifecycle — **clear for v1, under-specified for growth**, 4. Frontend design system — **functional, but carrying drift**, 5. Backend/API design — **good seam, needs consistent policy**, 6. Security and operations — **highest immediate risk**, Conclusion (+18 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, allowJs, baseUrl, esModuleInterop, incremental, isolatedModules, jsx (+11 more)

### Community 9 - "WatchAtlas — Product Requirements"
Cohesion: 0.11
Nodes (18): 10. Revision History, 1. Overview & Goals, 2. Non-Goals, 3. Users & Use Cases, 4. Current State (v1.0 baseline), 5.1 Preferred streaming services — *spec: `2026-07-19-preferred-services-design.md`, issue #3*, 5.2 Watchlist & availability alerts — *spec: `2026-07-19-watchlist-availability-design.md`, issue #4*, 5.3 AI recommendation engine — *spec: `2026-07-19-ai-recommendations-design.md`, issue #5* (+10 more)

### Community 10 - "ResilientImage.tsx"
Cohesion: 0.17
Nodes (12): Props, ResilientImage(), getImageOutcomeCounts(), IMAGE_FALLBACK_SRC, ImageOutcome, ImageOutcomeCounts, ImageSurface, recordImageOutcome() (+4 more)

### Community 11 - "WatchAtlas — Product Requirements (Core)"
Cohesion: 0.12
Nodes (16): 10. Revision History, 1. Overview & Goals, 2. Non-Goals, 3. Users & Use Cases, 4. Current State (v1.0 baseline), 5.1 Preferred streaming services — *spec: `2026-07-19-preferred-services-design.md`, issue #3*, 5.2 Watchlist & availability alerts — *spec: `2026-07-19-watchlist-availability-design.md`, issue #4*, 5.3 AI recommendation engine — *spec: `2026-07-19-ai-recommendations-design.md`, issue #5* (+8 more)

### Community 12 - "GitHub Project Setup — Reusable Playbook"
Cohesion: 0.13
Nodes (14): 0. What you end up with, 1. Repo, README, and `CLAUDE.md`, 2. Create the four `type:` labels, 3. Issue hierarchy + naming conventions, 4. Create the Project board, 5. Configure the Status field, 6. Add issues to the board (in bulk), 7. Set up the views (+6 more)

### Community 13 - "WatchAtlas Web Threat Model"
Cohesion: 0.15
Nodes (12): Actors, Assets, Assets and Actors, Attack-Surface Inventory, Council Evidence Status, Priority Findings, Residual Risks and Owners, Scope (+4 more)

### Community 14 - "Design"
Cohesion: 0.15
Nodes (12): 1. Candidate generation (server-side, pure logic + TMDB calls), 2. Curation — `POST /api/recommend`, 3. Caching & cost control, 4. `/discover` page, 5. Error handling, 6. Testing, AI Recommendation Engine — Design Spec, Backlog mapping (+4 more)

### Community 15 - "Design"
Cohesion: 0.15
Nodes (12): 1. Data model, 2. Provider catalog route — `GET /api/tmdb/providers-list?regions=IN,US`, 3. Settings UI — "My Services", 4. Discover route — `GET /api/tmdb/discover?regions=IN,US&providers=8|337`, 5. Home row — "On My Services", Backlog mapping, Decisions made during brainstorm, Design (+4 more)

### Community 16 - "Design"
Cohesion: 0.15
Nodes (12): 1. Watchlist storage, 2. Snapshot + diff pipeline, 3. Read path, 4. `/watchlist` page UI (Option B — badged grid), 5. Error handling, 6. Pure logic + tests, Backlog mapping, Decisions made during brainstorm (+4 more)

### Community 17 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, firebase, firebase-admin, framer-motion, @heroicons/react, lucide-react, next, @nextui-org/react (+4 more)

### Community 18 - "Decomposition"
Cohesion: 0.18
Nodes (10): 5a. App requirements, API contract & auth hardening — *feeds the redesign*, 5b. iOS / iPadOS app — *the bulk of the Swift work*, 5c. tvOS app, 5d. macOS app, 5e. Release operations, Apple Platform Apps (iOS / iPadOS / macOS / tvOS) — Program Overview, Decomposition, Explicitly out of scope for the program (+2 more)

### Community 19 - "2-remove-dead-navbar-component.md"
Cohesion: 0.22
Nodes (7): Decided by the agent, Overruled by the user, Scope, Todo, Worth noting, Board, Tasks

### Community 20 - "ai-code-review-prompt-2026-08-19T21-46-03-097Z.md"
Cohesion: 0.25
Nodes (7): File Analysis Instructions, 📋 How to Use This Review Result, Method 1: Command Palette (Recommended), Method 2: Tree View Panel, Method 3: Extension Tree View, Response Format Requirements, Review Criteria

### Community 21 - "Architecture Specification: WatchAtlas Web"
Cohesion: 0.29
Nodes (6): 1. System Overview, 2. Architectural Shape, 3. Trust Boundaries, 4. Data Ownership & Storage Patterns, 5. Stage-Gate Status and Council Evidence, Architecture Specification: WatchAtlas Web

### Community 22 - "ADR-0001: Keep TMDB Access Behind a Server-Side Proxy"
Cohesion: 0.33
Nodes (5): ADR-0001: Keep TMDB Access Behind a Server-Side Proxy, Alternatives Considered, Consequences, Context, Decision

### Community 23 - "GitHub Project, Webhook, and Intent-Store Declaration"
Cohesion: 0.33
Nodes (5): Current state, GitHub Project, GitHub Project, Webhook, and Intent-Store Declaration, Inbound webhooks, Intent store

### Community 24 - "api/health.ts"
Cohesion: 0.47
Nodes (4): checkTMDB(), handler(), CronHealthCheckResponse, HealthCheckResponse

### Community 25 - "Kanban board"
Cohesion: 0.40
Nodes (4): Boundaries, Execution mode, Kanban board, Route ambiguous requests

## Knowledge Gaps
- **295 isolated node(s):** `next/core-web-vitals`, `Props`, `LoadState`, `ServicePickerProps`, `Props` (+290 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 352 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `tmdb.ts` to `preferences.ts`, `providerCatalog.ts`, `package.json`, `ref_node_assert`, `[id].tsx`, `AppLayout`, `api/health.ts`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `UserPreferences` connect `preferences.ts` to `providerCatalog.ts`, `WatchAtlas — Product Requirements`, `WatchAtlas — Product Requirements (Core)`, `Design`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `WatchAtlas — Architecture (Current State)` connect `WatchAtlas — Decision Log` to `preferences.ts`, `tmdb.ts`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useAuth()` (e.g. with `Task 4: "My Services" picker in Settings` and `Task 7: "On My Services" home row`) actually correct?**
  _`useAuth()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `next/core-web-vitals`, `Props`, `LoadState` to the rest of the system?**
  _295 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `preferences.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0889894419306184 - nodes in this community are weakly interconnected._
- **Should `tmdb.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05333333333333334 - nodes in this community are weakly interconnected._