# Graph Report - watchatlas-card2-bug  (2026-09-18)

## Corpus Check
- 98 files · ~115,123 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .example 1, .csv 1)

## Summary
- 498 nodes · 691 edges · 53 communities (22 shown, 31 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 37 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0539c355`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- preferences.ts
- [id].tsx
- compilerOptions
- package.json
- ShowCard Component
- dependencies
- providerCatalog.ts
- tmdb.ts
- WatchAtlas
- healthCheckCron.test.ts
- next
- AppLayout
- Architecture Rule: Tailwind + CSS Variables
- _document.tsx
- vercel.json
- WatchAtlas — Decision Log
- WatchAtlas — Product Requirements
- WatchAtlas — Product Requirements (Core)
- countryContinents.ts
- ResilientImage.tsx
- next-env.d.ts
- GitHub Project Setup — Reusable Playbook
- WatchAtlas Web Threat Model
- 2-remove-dead-navbar-component.md
- ai-code-review-prompt-2026-08-19T21-46-03-097Z.md
- Architecture Specification: WatchAtlas Web
- Architecture Rule: TMDB Proxy Only
- global.d.ts
- GitHub Issue Hierarchy (Feature → Story → Task)
- ADR-0001: Keep TMDB Access Behind a Server-Side Proxy
- Kanban board
- Shipped
- config.md
- decisions.md
- redesign.md
- rejected.md
- modules.md
- releases.md
- Architecture Rule: AppLayout is Live Shell
- Architecture Rule: Cache Control Headers
- Environment Variables & Secrets
- TOKEN_LOG.md
- Vercel Deployment
- TMDB Logo
- Firestore Integration (lib/firestore.ts)
- Architecture Rule: Named Firestore Database
- AI Recommendation Engine Design Spec
- Apple Platform Apps Program Overview
- Preferred Services Design Spec
- Watchlist + Availability Alerts Design Spec

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `WatchAtlas — Decision Log` - 15 edges
3. `useAuth()` - 13 edges
4. `GitHub Project Setup — Reusable Playbook` - 13 edges
5. `getTMDBImageUrl()` - 11 edges
6. `next` - 11 edges
7. `WatchAtlas — Product Requirements (Core)` - 11 edges
8. `WatchAtlas — Product Requirements` - 11 edges
9. `react` - 10 edges
10. `WatchAtlas Web Threat Model` - 10 edges

## Surprising Connections (you probably didn't know these)
- `5.1 Preferred streaming services — *spec: `2026-07-19-preferred-services-design.md`, issue #3*` --references--> `UserPreferences`  [INFERRED]
  docs/PRD-core.md → lib/preferences.ts
- `4. Frontend design system — **functional, but carrying drift**` --references--> `AppLayout()`  [INFERRED]
  docs/architecture/design-review.md → components/AppLayout.tsx
- `Known drift & issues (as of 2026-07-19)` --references--> `AppLayout()`  [INFERRED]
  docs/ARCHITECTURE.md → components/AppLayout.tsx
- `Scope` --references--> `AppLayout()`  [INFERRED]
  docs/kanban/.archive/3-reconcile-the-two-coexisting-dark-mode-mechanisms.md → components/AppLayout.tsx
- `Todo` --references--> `AppLayout()`  [INFERRED]
  docs/kanban/.archive/3-reconcile-the-two-coexisting-dark-mode-mechanisms.md → components/AppLayout.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **** — workflow:boardHierarchy, workflow:commits, rule:tmdbProxy, rule:firestoreDatabase [INFERRED]

## Communities (53 total, 31 thin omitted)

### Community 0 - "preferences.ts"
Cohesion: 0.08
Nodes (46): NavBar(), styles, Window, LoadState, ServicePicker(), ServicePickerProps, HealthStatus, Auth & preferences (+38 more)

### Community 1 - "[id].tsx"
Cohesion: 0.11
Nodes (22): Country, getCountryList(), getCountryMeta(), lib_full_country_list_with_flags, getDisplayCountries(), ProviderEntry, buildProviderDisplayTiers(), collectStreamingProviders() (+14 more)

### Community 2 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, allowJs, baseUrl, esModuleInterop, incremental, isolatedModules, jsx (+11 more)

### Community 3 - "package.json"
Cohesion: 0.06
Nodes (32): devDependencies, autoprefixer, postcss, tailwindcss, @tailwindcss/postcss, tsx, tw-animate-css, @types/node (+24 more)

### Community 5 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, firebase, firebase-admin, framer-motion, @heroicons/react, lucide-react, next, @nextui-org/react (+4 more)

### Community 6 - "providerCatalog.ts"
Cohesion: 0.11
Nodes (23): DiscoverItem, MAX_DISCOVER_PROVIDERS, MAX_DISCOVER_REGIONS, MAX_DISCOVER_RESULTS, mergeDiscoverResults(), parseProviderIds(), canonicalizeRegionSet(), CatalogProvider (+15 more)

### Community 7 - "tmdb.ts"
Cohesion: 0.09
Nodes (19): Props, ShowCard(), Acceptance criteria, By `ui-designer` agent, Decided by the agent, Overruled by the user, Scope, Source (+11 more)

### Community 8 - "WatchAtlas"
Cohesion: 0.50
Nodes (4): WatchAtlas Banner Image, WatchAtlas Logo, Aurora Peak, WatchAtlas

### Community 9 - "healthCheckCron.test.ts"
Cohesion: 0.08
Nodes (26): By `tech-stack-advisor` agent, Decided by the agent, Overruled by the user, Scope, Todo, Worth noting, cronState, DebounceState (+18 more)

### Community 10 - "next"
Cohesion: 0.10
Nodes (7): checkTMDB(), handler(), MOVIE_LISTS, TV_LISTS, next, CronHealthCheckResponse, HealthCheckResponse

### Community 11 - "AppLayout"
Cohesion: 0.07
Nodes (27): AppLayout(), 1. Architecture and requirements governance — **BLOCKER for Stage 3 completion**, 2. Trust boundaries — **partially explicit, incompletely verified**, 3. Data ownership and lifecycle — **clear for v1, under-specified for growth**, 4. Frontend design system — **functional, but carrying drift**, 5. Backend/API design — **good seam, needs consistent policy**, 6. Security and operations — **highest immediate risk**, Conclusion (+19 more)

### Community 15 - "WatchAtlas — Decision Log"
Cohesion: 0.08
Nodes (24): StatusBanner(), Data flow (TMDB), Directory map, Environment variables, Known drift & issues (as of 2026-07-19), Monitoring (built-out, previously undocumented), Stack, WatchAtlas — Architecture (Current State) (+16 more)

### Community 16 - "WatchAtlas — Product Requirements"
Cohesion: 0.11
Nodes (17): 10. Revision History, 1. Overview & Goals, 2. Non-Goals, 3. Users & Use Cases, 4. Current State (v1.0 baseline), 5.2 Watchlist & availability alerts — *spec: `2026-07-19-watchlist-availability-design.md`, issue #4*, 5.3 AI recommendation engine — *spec: `2026-07-19-ai-recommendations-design.md`, issue #5*, 5.4 App requirements & API contract (5a) — *spec: `2026-07-19-apple-apps-program.md`, issue #6* (+9 more)

### Community 17 - "WatchAtlas — Product Requirements (Core)"
Cohesion: 0.12
Nodes (16): 10. Revision History, 1. Overview & Goals, 2. Non-Goals, 3. Users & Use Cases, 4. Current State (v1.0 baseline), 5.1 Preferred streaming services — *spec: `2026-07-19-preferred-services-design.md`, issue #3*, 5.2 Watchlist & availability alerts — *spec: `2026-07-19-watchlist-availability-design.md`, issue #4*, 5.3 AI recommendation engine — *spec: `2026-07-19-ai-recommendations-design.md`, issue #5* (+8 more)

### Community 19 - "ResilientImage.tsx"
Cohesion: 0.17
Nodes (12): Props, ResilientImage(), getImageOutcomeCounts(), IMAGE_FALLBACK_SRC, ImageOutcome, ImageOutcomeCounts, ImageSurface, recordImageOutcome() (+4 more)

### Community 21 - "GitHub Project Setup — Reusable Playbook"
Cohesion: 0.13
Nodes (14): 0. What you end up with, 1. Repo, README, and `CLAUDE.md`, 2. Create the four `type:` labels, 3. Issue hierarchy + naming conventions, 4. Create the Project board, 5. Configure the Status field, 6. Add issues to the board (in bulk), 7. Set up the views (+6 more)

### Community 22 - "WatchAtlas Web Threat Model"
Cohesion: 0.15
Nodes (12): Actors, Assets, Assets and Actors, Attack-Surface Inventory, Council Evidence Status, Priority Findings, Residual Risks and Owners, Scope (+4 more)

### Community 23 - "2-remove-dead-navbar-component.md"
Cohesion: 0.22
Nodes (7): Decided by the agent, Overruled by the user, Scope, Todo, Worth noting, Board, Tasks

### Community 24 - "ai-code-review-prompt-2026-08-19T21-46-03-097Z.md"
Cohesion: 0.25
Nodes (7): File Analysis Instructions, 📋 How to Use This Review Result, Method 1: Command Palette (Recommended), Method 2: Tree View Panel, Method 3: Extension Tree View, Response Format Requirements, Review Criteria

### Community 25 - "Architecture Specification: WatchAtlas Web"
Cohesion: 0.29
Nodes (6): 1. System Overview, 2. Architectural Shape, 3. Trust Boundaries, 4. Data Ownership & Storage Patterns, 5. Stage-Gate Status and Council Evidence, Architecture Specification: WatchAtlas Web

### Community 29 - "ADR-0001: Keep TMDB Access Behind a Server-Side Proxy"
Cohesion: 0.33
Nodes (5): ADR-0001: Keep TMDB Access Behind a Server-Side Proxy, Alternatives Considered, Consequences, Context, Decision

### Community 30 - "Kanban board"
Cohesion: 0.40
Nodes (4): Boundaries, Execution mode, Kanban board, Route ambiguous requests

## Knowledge Gaps
- **251 isolated node(s):** `Window`, `styles`, `Props`, `LoadState`, `ServicePickerProps` (+246 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 310 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `healthCheckCron.test.ts`, `package.json`, `providerCatalog.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `UserPreferences` connect `preferences.ts` to `WatchAtlas — Product Requirements (Core)`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `react` connect `preferences.ts` to `package.json`, `[id].tsx`, `ResilientImage.tsx`, `tmdb.ts`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **What connects `Window`, `styles`, `Props` to the rest of the system?**
  _251 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `preferences.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07894736842105263 - nodes in this community are weakly interconnected._
- **Should `[id].tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1103448275862069 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._