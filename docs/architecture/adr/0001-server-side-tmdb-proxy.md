# ADR-0001: Keep TMDB Access Behind a Server-Side Proxy

- **Status:** Accepted
- **Date:** 2026-09-17

## Context
WatchAtlas needs TMDB search, details, and provider data in the browser. TMDB access requires an API key, while browser code is an untrusted execution environment. The application already exposes internal Next.js API routes under `/api/tmdb/*`.

## Decision
All TMDB calls remain behind the Next.js server-side API proxy. The browser calls `lib/tmdb.ts`, which calls internal `/api/tmdb/*` routes. Only server-side routes read `TMDB_API_KEY`. Routes retain bounded inputs, timeouts, sanitized errors, and CDN caching.

## Alternatives Considered
- Calling TMDB directly from the browser with a public environment variable: rejected because the key can be extracted and abused.
- Introducing a separate backend service: rejected for current scale because it adds deployment and operational complexity without a demonstrated need.

## Consequences
- API key remains outside the browser bundle.
- Caching, validation, and error handling are centralized at the BFF boundary.
- Vercel serverless execution remains a runtime dependency.
- Public proxy endpoints must be protected from abuse with input validation, timeouts, caching, and rate limiting as traffic grows.
