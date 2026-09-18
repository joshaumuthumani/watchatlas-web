# Graph Report - watchatlas-web  (2026-09-18)

## Corpus Check
- 100 files · ~115,248 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 3, .example 1, .toml 1)

## Summary
- 575 nodes · 804 edges · 44 communities (27 shown, 17 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 61 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7aab15cf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- preferences.ts
- package.json
- README.md
- tmdb.ts
- [id].tsx
- ref_node_assert_strict
- providerCatalog.ts
- AppLayout
- Global Constraints
- next
- compilerOptions
- ResilientImage.tsx
- WatchAtlas — Product Requirements
- WatchAtlas — Product Requirements (Core)
- GitHub Project Setup — Reusable Playbook
- WatchAtlas Web Threat Model
- Design
- Design
- Design
- Decomposition
- devDependencies
- 2-remove-dead-navbar-component.md
- ai-code-review-prompt-2026-08-19T21-46-03-097Z.md
- Architecture Specification: WatchAtlas Web
- ADR-0001: Keep TMDB Access Behind a Server-Side Proxy
- GitHub Project, Webhook, and Intent-Store Declaration
- Kanban board
- _document.tsx
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
1. `compilerOptions` - 17 edges
2. `WatchAtlas — Decision Log` - 15 edges
3. `useAuth()` - 14 edges
4. `GitHub Project Setup — Reusable Playbook` - 13 edges
5. `UserPreferences` - 11 edges
6. `getTMDBImageUrl()` - 11 edges
7. `next` - 11 edges
8. `WatchAtlas — Product Requirements (Core)` - 11 edges
9. `WatchAtlas — Product Requirements` - 11 edges
10. `Global Constraints` - 11 edges

## Surprising Connections (you probably didn't know these)
- `5.1 Preferred streaming services — *spec: `2026-07-19-preferred-services-design.md`, issue #3*` --references--> `UserPreferences`  [INFERRED]
  docs/PRD-core.md → lib/preferences.ts
- `1. Data model` --references--> `UserPreferences`  [INFERRED]
  docs/superpowers/specs/2026-07-19-preferred-services-design.md → lib/preferences.ts
- `6. Detail page — two-tier where-to-watch` --references--> `splitProvidersByPreference()`  [INFERRED]
  docs/superpowers/specs/2026-07-19-preferred-services-design.md → lib/providerPreferences.ts
- `4. Frontend design system — **functional, but carrying drift**` --references--> `AppLayout()`  [INFERRED]
  docs/architecture/design-review.md → components/AppLayout.tsx
- `Known drift & issues (as of 2026-07-19)` --references--> `AppLayout()`  [INFERRED]
  docs/ARCHITECTURE.md → components/AppLayout.tsx

## Import Cycles
- None detected.

## Communities (44 total, 17 thin omitted)

### Community 0 - "preferences.ts"
Cohesion: 0.08
Nodes (41): LoadState, ServicePicker(), ServicePickerProps, HealthStatus, StatusBanner(), AuthContext, AuthContextType, AuthProvider() (+33 more)

### Community 1 - "package.json"
Cohesion: 0.05
Nodes (38): dependencies, firebase, firebase-admin, framer-motion, @heroicons/react, lucide-react, next, @nextui-org/react (+30 more)

### Community 2 - "README.md"
Cohesion: 0.05
Nodes (34): Architecture ground rules, CLAUDE.md — WatchAtlas, Commands, Guardrails, What this is, Workflow — no uncaptured work, 2026-07-19 — Adopt standard project docs + GitHub backlog structure, 2026-07-19 — Apple platform apps: SwiftUI multiplatform, hybrid backend, app-aware redesign (+26 more)

### Community 3 - "tmdb.ts"
Cohesion: 0.08
Nodes (23): Props, ShowCard(), Acceptance criteria, By `ui-designer` agent, Decided by the agent, Overruled by the user, Scope, Source (+15 more)

### Community 4 - "[id].tsx"
Cohesion: 0.09
Nodes (25): Known drift & issues (as of 2026-07-19), Task 9: Two-tier where-to-watch on the detail page, 7. Pure logic + tests, Country, getCountryList(), getCountryMeta(), lib_full_country_list_with_flags, getDisplayCountries() (+17 more)

### Community 5 - "ref_node_assert_strict"
Cohesion: 0.08
Nodes (26): By `tech-stack-advisor` agent, Decided by the agent, Overruled by the user, Scope, Todo, Worth noting, cronState, DebounceState (+18 more)

### Community 6 - "providerCatalog.ts"
Cohesion: 0.12
Nodes (21): Task 6: `GET /api/tmdb/discover` route, DiscoverItem, MAX_DISCOVER_PROVIDERS, MAX_DISCOVER_REGIONS, MAX_DISCOVER_RESULTS, mergeDiscoverResults(), parseProviderIds(), mergeProviderCatalog() (+13 more)

### Community 7 - "AppLayout"
Cohesion: 0.09
Nodes (24): AppLayout(), 1. Architecture and requirements governance — **BLOCKER for Stage 3 completion**, 2. Trust boundaries — **partially explicit, incompletely verified**, 3. Data ownership and lifecycle — **clear for v1, under-specified for growth**, 4. Frontend design system — **functional, but carrying drift**, 5. Backend/API design — **good seam, needs consistent policy**, 6. Security and operations — **highest immediate risk**, Conclusion (+16 more)

### Community 8 - "Global Constraints"
Cohesion: 0.10
Nodes (24): Auth & preferences, Data flow (TMDB), Directory map, Environment variables, Monitoring (built-out, previously undocumented), Stack, WatchAtlas — Architecture (Current State), What it is (+16 more)

### Community 9 - "next"
Cohesion: 0.10
Nodes (7): checkTMDB(), handler(), MOVIE_LISTS, TV_LISTS, next, CronHealthCheckResponse, HealthCheckResponse

### Community 10 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, allowJs, baseUrl, esModuleInterop, incremental, isolatedModules, jsx (+11 more)

### Community 11 - "ResilientImage.tsx"
Cohesion: 0.16
Nodes (13): Props, ResilientImage(), getImageOutcomeCounts(), IMAGE_FALLBACK_SRC, ImageOutcome, ImageOutcomeCounts, ImageSurface, recordImageOutcome() (+5 more)

### Community 12 - "WatchAtlas — Product Requirements"
Cohesion: 0.11
Nodes (17): 10. Revision History, 1. Overview & Goals, 2. Non-Goals, 3. Users & Use Cases, 4. Current State (v1.0 baseline), 5.2 Watchlist & availability alerts — *spec: `2026-07-19-watchlist-availability-design.md`, issue #4*, 5.3 AI recommendation engine — *spec: `2026-07-19-ai-recommendations-design.md`, issue #5*, 5.4 App requirements & API contract (5a) — *spec: `2026-07-19-apple-apps-program.md`, issue #6* (+9 more)

### Community 13 - "WatchAtlas — Product Requirements (Core)"
Cohesion: 0.12
Nodes (16): 10. Revision History, 1. Overview & Goals, 2. Non-Goals, 3. Users & Use Cases, 4. Current State (v1.0 baseline), 5.1 Preferred streaming services — *spec: `2026-07-19-preferred-services-design.md`, issue #3*, 5.2 Watchlist & availability alerts — *spec: `2026-07-19-watchlist-availability-design.md`, issue #4*, 5.3 AI recommendation engine — *spec: `2026-07-19-ai-recommendations-design.md`, issue #5* (+8 more)

### Community 14 - "GitHub Project Setup — Reusable Playbook"
Cohesion: 0.13
Nodes (14): 0. What you end up with, 1. Repo, README, and `CLAUDE.md`, 2. Create the four `type:` labels, 3. Issue hierarchy + naming conventions, 4. Create the Project board, 5. Configure the Status field, 6. Add issues to the board (in bulk), 7. Set up the views (+6 more)

### Community 15 - "WatchAtlas Web Threat Model"
Cohesion: 0.15
Nodes (12): Actors, Assets, Assets and Actors, Attack-Surface Inventory, Council Evidence Status, Priority Findings, Residual Risks and Owners, Scope (+4 more)

### Community 16 - "Design"
Cohesion: 0.15
Nodes (12): 1. Data model, 2. Provider catalog route — `GET /api/tmdb/providers-list?regions=IN,US`, 3. Settings UI — "My Services", 4. Discover route — `GET /api/tmdb/discover?regions=IN,US&providers=8|337`, 6. Detail page — two-tier where-to-watch, Backlog mapping, Decisions made during brainstorm, Design (+4 more)

### Community 17 - "Design"
Cohesion: 0.17
Nodes (11): 1. Candidate generation (server-side, pure logic + TMDB calls), 2. Curation — `POST /api/recommend`, 3. Caching & cost control, 5. Error handling, 6. Testing, AI Recommendation Engine — Design Spec, Backlog mapping, Decisions made during brainstorm (+3 more)

### Community 18 - "Design"
Cohesion: 0.17
Nodes (11): 1. Watchlist storage, 2. Snapshot + diff pipeline, 3. Read path, 5. Error handling, 6. Pure logic + tests, Backlog mapping, Decisions made during brainstorm, Design (+3 more)

### Community 19 - "Decomposition"
Cohesion: 0.18
Nodes (10): 5a. App requirements, API contract & auth hardening — *feeds the redesign*, 5b. iOS / iPadOS app — *the bulk of the Swift work*, 5c. tvOS app, 5d. macOS app, 5e. Release operations, Apple Platform Apps (iOS / iPadOS / macOS / tvOS) — Program Overview, Decomposition, Explicitly out of scope for the program (+2 more)

### Community 20 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, autoprefixer, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss, tsx (+3 more)

### Community 21 - "2-remove-dead-navbar-component.md"
Cohesion: 0.22
Nodes (7): Decided by the agent, Overruled by the user, Scope, Todo, Worth noting, Board, Tasks

### Community 22 - "ai-code-review-prompt-2026-08-19T21-46-03-097Z.md"
Cohesion: 0.25
Nodes (7): File Analysis Instructions, 📋 How to Use This Review Result, Method 1: Command Palette (Recommended), Method 2: Tree View Panel, Method 3: Extension Tree View, Response Format Requirements, Review Criteria

### Community 23 - "Architecture Specification: WatchAtlas Web"
Cohesion: 0.29
Nodes (6): 1. System Overview, 2. Architectural Shape, 3. Trust Boundaries, 4. Data Ownership & Storage Patterns, 5. Stage-Gate Status and Council Evidence, Architecture Specification: WatchAtlas Web

### Community 24 - "ADR-0001: Keep TMDB Access Behind a Server-Side Proxy"
Cohesion: 0.33
Nodes (5): ADR-0001: Keep TMDB Access Behind a Server-Side Proxy, Alternatives Considered, Consequences, Context, Decision

### Community 25 - "GitHub Project, Webhook, and Intent-Store Declaration"
Cohesion: 0.33
Nodes (5): Current state, GitHub Project, GitHub Project, Webhook, and Intent-Store Declaration, Inbound webhooks, Intent store

### Community 26 - "Kanban board"
Cohesion: 0.40
Nodes (4): Boundaries, Execution mode, Kanban board, Route ambiguous requests

## Knowledge Gaps
- **294 isolated node(s):** `next/core-web-vitals`, `Props`, `LoadState`, `ServicePickerProps`, `Props` (+289 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 356 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `UserPreferences` connect `Global Constraints` to `Design`, `preferences.ts`, `WatchAtlas — Product Requirements (Core)`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `WatchAtlas — Architecture (Current State)` connect `Global Constraints` to `[id].tsx`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `package.json`, `ref_node_assert_strict`, `providerCatalog.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useAuth()` (e.g. with `Task 4: "My Services" picker in Settings` and `Task 7: "On My Services" home row`) actually correct?**
  _`useAuth()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `next/core-web-vitals`, `Props`, `LoadState` to the rest of the system?**
  _294 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `preferences.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07547169811320754 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._