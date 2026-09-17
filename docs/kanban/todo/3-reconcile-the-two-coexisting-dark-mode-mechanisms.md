---
title: Reconcile the two coexisting dark-mode mechanisms
priority: med
roi: med
status: todo
release: ""
blocked_by: []
related: []
modules: [account-preferences]
questions:
  - question: "[user] Should a first-time visitor with no saved preference get a theme that matches their OS setting, or always start on the app's existing dark default?"
    mode: single
    options:
      - Always dark (current behavior) — matches AuthContext's existing no-preference fallback and the app's dark-first branding (theme-color #0a0a0a, dark hero); zero new logic.
      - Match OS preference on first visit — adds a prefers-color-scheme read to both the _document.tsx script and AuthContext's no-preference fallback, kept in sync by hand between the two; friendlier to light-OS users but is a behavior change beyond fixing the drift bug.
    recommend: [1]
verify:
  - "Fresh browser profile, no saved preference, OS set to light mode: reload the site and confirm it paints dark immediately, with no flash of a light frame first."
  - "Set the in-app theme to Light, then hard-reload with the OS in dark mode: confirm the page paints light immediately, with no dark flash first."
  - "With an explicit in-app theme choice active, change the OS system appearance while the tab stays open: confirm the app's theme does NOT follow the OS change — it keeps the explicit choice."
---

Theming currently runs through three uncoordinated mechanisms: a pre-hydration script in `pages/_document.tsx` that paints the very first frame from `localStorage["theme"]` (a key nothing ever writes) plus OS `prefers-color-scheme`; `next-themes`'s `ThemeProvider` in `pages/_app.tsx`, which nothing in the app ever calls `useTheme()` on but which keeps its own class in sync with OS theme changes; and the real mechanism — a `darkMode` boolean preference (`localStorage["darkMode"]` + Firestore) applied by `AuthContext`/`AppLayout`. Because the first two never read the real preference, a saved theme choice flashes-and-corrects on every page load, and `next-themes`'s OS-change listener can silently revert an explicit in-app choice mid-session whenever the visitor's OS theme changes. Reconcile all three onto the one mechanism that already works.

## Worth noting
- **Why remove `next-themes` entirely?**: Nothing in the app calls its `useTheme()`, and its OS-preference listener is what causes the mid-session drift this card exists to fix — so it's deleted rather than wired up to the real preference.

<!-- agent -->

## Scope
- One source of truth: the existing `darkMode` boolean preference (`localStorage["darkMode"]` + Firestore via `AuthContext`) — unchanged.
- Remove `next-themes`'s `ThemeProvider` from `pages/_app.tsx` and the `next-themes` dependency.
- Fix the blocking script in `pages/_document.tsx` to read `localStorage["darkMode"]` (default `true`, matching `AuthContext`'s own fallback) instead of the unused `"theme"` key and OS `prefers-color-scheme`, so the first paint never disagrees with the theme `AuthContext` applies right after.
- No change to the toggle button, its icon/position, the Firestore schema, or `AuthContext`'s existing race-condition handling.

## Todo
- [ ] Remove the `next-themes` import and `ThemeProvider` wrapper from `pages/_app.tsx`.
- [ ] Remove `next-themes` from `package.json` and the lockfile.
- [ ] Update the inline script in `pages/_document.tsx` to read `localStorage.getItem("darkMode")`, defaulting to `true` (dark) when absent, and drop the `prefers-color-scheme`/`"theme"`-key logic.
- [ ] Run `npm test` and confirm it still passes unchanged.

## Decided by the agent
- **Why does `"darkMode"` stay duplicated in `pages/_document.tsx`?**: That script runs before any bundled module loads, so it cannot import the key from `lib/preferences.ts` — keep it in sync by hand with `AuthContext`/`AppLayout` when either changes.
- **Why no automated test for the "no flash" outcomes?**: The repo has no browser/e2e runner (`npm test` covers only `tests/**/*.test.ts`), so those checks are manual hand-checks (see `verify:`) instead of a Todo step.
- **Why skip `tech-stack-advisor`?**: This card removes an already-unused dependency rather than choosing or replacing one — there are no candidates to weigh.
- **Why skip `ui-designer`?**: The fix changes no screen, layout, or interaction — the toggle button and both themes' visuals are unchanged; only the internal state-sync bug is fixed.

### Overruled by the user
