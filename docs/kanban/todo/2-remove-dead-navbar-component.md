---
title: Remove dead NavBar component
priority: low
roi: low
status: ready
release: ""
blocked_by: []
related: []
modules: []
questions: []
---

`components/NavBar.tsx` is unused; `AppLayout.tsx` is the active navigation shell. Remove the obsolete component so the codebase has a single, clear navigation shell.

## Worth noting

<!-- agent -->

## Scope
- Delete `components/NavBar.tsx` entirely.
- Make no other changes. Its dependencies (`lib/firebase`, `lib/AuthContext`, and
  `firebase/auth`) are shared modules that remain in use elsewhere.

## Todo
- [ ] Delete `components/NavBar.tsx`.
- [ ] Run `npm run build` and `npm test` — both must still pass (proves nothing referenced it).
- [ ] `grep -rn "NavBar"` across the repo returns no results.

## Decided by the agent
- **No specialist review is needed**: The repository search found only the component's own
  definition, with no import, dynamic import, or test reference; deleting it therefore changes
  no rendered output, library choice, or visual design.

### Overruled by the user
