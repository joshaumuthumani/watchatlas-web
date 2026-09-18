---
title: Verify and harden quota-independent image delivery
priority: high
roi: high
status: todo
release: ""
blocked_by: []
related: []
modules: [browse-search, where-to-watch, account-preferences]
archived: 2026-09-16
questions: []
verify:
  - With a known live TMDB source and a deliberately invalid path on each representative browse, discovery, detail, and service-selection state, confirm the screen matches its mockup and remains usable; note the success and unavailable counts.
  - In browser DevTools Network after exercising those states, confirm no request URL contains /_next/image and no failed image is caused by a Vercel transformation response.
---

On browse, discovery, title-detail, and service-selection pages, published posters, backdrops, and provider logos load directly from their source without a Vercel image-transformation request. When a source is unavailable, the page retains its title, availability information, and usable controls, and shows the designed local unavailable-image state instead of a broken or blank image.

## Worth noting

- **Delivery policy**: Keep direct TMDB URLs and a durable local fallback asset so remote-image failures cannot invoke Vercel processing, at the cost of image optimization.
- **Unavailable-image behavior**: Use the designed fallback only for null, empty, or failed source requests; available sources continue to show their original images.

## By `ui-designer` agent

<Mockup src=".mockups/6/browse-unavailable-source.tsx" label="Browse, unavailable poster source" />

<Mockup src=".mockups/6/discovery-unavailable-poster.tsx" label="Discovery results, unavailable poster source" />

<Mockup src=".mockups/6/title-detail-unavailable-poster.tsx" label="Title detail, unavailable poster source" />

<Mockup src=".mockups/6/service-picker-unavailable-logo.tsx" label="Service picker, unavailable provider logo source" />

<!-- agent -->

## Today
- `next.config.js` globally disables Next image optimization, but `ShowCard`, search suggestions, title detail, provider logos, and the service picker render image paths independently.
- `getPosterUrl()` returns `/placeholder.png` for null or empty posters, but that asset is absent from `public/`.
- The rendering paths do not recover from source-load failures or measure image outcomes.

## Scope
- Cover every current remote-image entry point: browse and discovery cards, including search suggestions; the title poster and backdrop; title availability-provider logos; and settings service-picker logos.
- Preserve `images.unoptimized: true` so every successful remote source makes a direct `image.tmdb.org` browser request, never a request to `/_next/image` or another Vercel transformation endpoint.
- Use one valid local fallback asset and an accessible unavailable-source treatment for null or empty paths and browser `load` failures, while retaining the title, media type, year, provider name, and all existing page actions or availability content.
- Apply the fallback to posters, backdrops, and provider logos without masking successful sources or replacing an available image with a quota or transformation error.
- Add lightweight, testable outcome measurement that separately records successful source loads and source-unavailable fallbacks for representative states without sending a Vercel image request or blocking page rendering.
- Keep future enhancement processing outside Vercel request handling and non-blocking for publication and display.

## Todo
- [x] Inventory and cover every image renderer and URL helper listed in Scope, including direct CSS backdrop URLs and literal provider-logo URLs, not only `getPosterUrl()` callers.
- [x] Add the durable local fallback asset and shared image-state behavior for missing and failed poster, backdrop, and provider-logo sources; update the UI components so the states match the reviewed mockups and preserve surrounding content.
- [x] Retain and test the global Next configuration that disables image optimization; remove or correct every path that bypasses the direct-source policy.
- [ ] Add automated coverage for direct TMDB URL construction, the real fallback asset, null or empty source handling, and image-outcome counting; run the existing test suite and production build.
- [ ] Perform representative browser QA for browse, discovery, title detail, and service selection with both a loadable and an unavailable source; record success and fallback counts, and confirm that network traffic contains no `/_next/image` request.

### Acceptance criteria
- A valid TMDB poster, backdrop, or provider-logo source displays on every affected route, and its browser network request targets the source directly without a Vercel or Next transformation request.
- A null, empty, or failed source shows the reviewed local unavailable-image treatment without a broken-image glyph. Title cards retain title, type, and year; detail retains title, back action, and availability; provider controls retain the provider name and selection state.
- The local fallback asset exists in the production build, and the same unavailable-source path works for poster, backdrop, and provider-logo failures.
- Outcome measurement reports separate success and unavailable counts for the representative QA run. A failed source increments only the unavailable count and does not make its screen unusable.
- `npm test` and `npm run build` pass after the change.

## Decided by the agent
- **Fallback ownership**: Use a bundled local fallback and client-observed outcome counters instead of a new image CDN or analytics service, avoiding a dependency and keeping delivery independent of Vercel quota.

### Overruled by the user

## Source

- `/Users/josh/Dev/watchatlas-web/.akb/boards/docs/kanban/plans/5-restore-images-while-preserving-image-processing-tier-limits.md`
