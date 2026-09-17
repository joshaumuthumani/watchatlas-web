---
title: Verify and harden quota-independent image delivery
priority: high
roi: high
status: todo
release: ""
blocked_by: []
related: []
modules: [browse-search, where-to-watch, account-preferences]
questions: []
---

Published images load on browse, title-detail, and service-selection pages without any Vercel server-side image processing. The current free-tier image-processing capacity is exhausted, so a Vercel transformation failure must never leave an otherwise available source image blank.

## Worth noting

- `next.config.js` already sets `images.unoptimized: true`; treat zero Vercel server-side image processing as a hard requirement and verify that no rendering path bypasses it.
- A deliberately unavailable-image state is acceptable only when its source cannot be retrieved. It is not an acceptable fallback for quota or transformation failures.

## By `ui-designer` agent

<Mockup src=".mockups/6/browse-unavailable-source.tsx" label="Browse, unavailable poster source" />

<Mockup src=".mockups/6/discovery-unavailable-poster.tsx" label="Discovery results, unavailable poster source" />

<Mockup src=".mockups/6/title-detail-unavailable-poster.tsx" label="Title detail, unavailable poster source" />

<Mockup src=".mockups/6/service-picker-unavailable-logo.tsx" label="Service picker, unavailable provider logo source" />

<!-- agent -->

## Scope
- Audit every current image rendering path and its asset URL construction for a route that could invoke Vercel/Next image transformations.
- Preserve or correct the delivery path so browsers load display-ready durable assets or untransformed sources directly.
- Verify representative catalog, title-detail, discovery, and service-selection image states; record image-load success and broken-source rates.
- Keep any future image enhancement processing outside Vercel request handling and ensure it cannot block publication or display.

## Todo
- [ ] Inventory the image renderers and source URL helpers used by the three affected modules.
- [ ] Remove or replace any remaining configuration or rendering path that can trigger server-side Vercel image processing.
- [ ] Add or update the lightweight measurement needed to distinguish load failures from unavailable source assets.
- [ ] Check representative browse, discovery, detail, and service-selection pages for successful image display without Vercel image requests.

## Decided by the agent

### Overruled by the user

## Source

- `/Users/josh/Dev/watchatlas-web/.akb/boards/docs/kanban/plans/5-restore-images-while-preserving-image-processing-tier-limits.md`
