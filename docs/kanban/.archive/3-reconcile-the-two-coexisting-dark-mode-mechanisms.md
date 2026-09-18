---
title: Reconcile the two coexisting dark-mode mechanisms
priority: med
roi: med
status: todo
release: ""
blocked_by: []
related: []
modules: [account-preferences]
archived: 2026-09-16
questions: []
verify:
  - "Fresh browser profile, no saved preference, OS set to light mode: reload the site and confirm it paints light immediately, with no flash of a dark frame first."
  - "Set the in-app theme to Light, then hard-reload with the OS in dark mode: confirm the page paints light immediately, with no dark flash first."
  - "With an explicit in-app theme choice active, change the OS system appearance while the tab stays open: confirm the app theme does NOT follow the OS change — it keeps the explicit choice."
  - "Manual check pending: fresh profile with a light OS preference must paint light immediately."
  - "Manual check pending: saved Light preference must survive a dark-OS hard reload with no dark flash."
  - "Manual check pending: an explicit in-app choice must ignore live OS appearance changes."
---

Three uncoordinated mechanisms currently control theming: the pre-hydration script in `pages/_document.tsx`, `next-themes`'s `ThemeProvider` in `pages/_app.tsx`, and the `darkMode` preference applied by `AuthContext` and `AppLayout`. Only the last mechanism reads the actual saved preference (`localStorage["darkMode"]` and Firestore). The other two therefore cause an explicit choice to flash and correct on page load, while `next-themes` can replace that choice when the OS appearance changes. Consolidate theming on the existing `darkMode` mechanism.

## Worth noting
- **First-visit theme**: When no preference is saved, use the OS color-scheme preference; every no-preference fallback must stay synchronized.

## By `ui-designer` agent
No mockup is required: first-visit theming changes only the existing color tokens painted before hydration; layout, controls, and theme-toggle interaction remain unchanged.

<!-- agent -->

## Scope
- Keep the existing `darkMode` boolean preference (`localStorage["darkMode"]` and Firestore via `AuthContext`) as the single source of truth.
- Remove `next-themes`'s `ThemeProvider` from `pages/_app.tsx` and the `next-themes` dependency.
- Update the blocking script in `pages/_document.tsx` to read `localStorage["darkMode"]`; when no value is saved, use OS `prefers-color-scheme`, matching `AuthContext` so the first paint agrees with the theme applied immediately afterward.
- Update `AuthContext`'s no-preference fallback to use OS `prefers-color-scheme`; retain the current behavior for an explicit saved preference.
- Update `AppLayout`'s no-preference fallback to use OS `prefers-color-scheme`, so the toggle state matches the first-visit theme.
- No change to the toggle button, its icon/position, the Firestore schema, or `AuthContext`'s existing race-condition handling.

## Todo
- [x] Remove the `next-themes` import and `ThemeProvider` wrapper from `pages/_app.tsx`.
- [x] Remove `next-themes` from `package.json` and the lockfile.
- [x] Update the inline script in `pages/_document.tsx` to read `localStorage.getItem("darkMode")`, use `prefers-color-scheme` when it is absent, and drop the unused `"theme"`-key logic.
- [x] Update `AuthContext`'s no-preference fallback to use `prefers-color-scheme`, matching the inline script.
- [x] Update `AppLayout`'s no-preference fallback to use `prefers-color-scheme`, matching the inline script and `AuthContext`.
- [x] Run `npm test` and confirm it still passes unchanged.

## Decided by the agent
- **Why duplicate `"darkMode"` and its fallback?**: The pre-hydration script runs before bundled modules load, while `AuthContext` and `AppLayout` initialize state independently; keep the key and no-preference fallback synchronized across all three.
- **Why are the no-flash checks manual?**: The repository has no browser or end-to-end test runner (`npm test` covers only `tests/**/*.test.ts`), so the checks remain under `verify:` rather than becoming Todo steps.
- **Why skip `tech-stack-advisor`?**: This work removes an unused dependency; it does not select or replace one.

### Overruled by the user
