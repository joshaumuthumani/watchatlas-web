# Architecture Specification: WatchAtlas Web

## 1. System Overview
**WatchAtlas** is a global streaming availability guide built with Next.js 14 (Pages Router), TypeScript, and Tailwind CSS. It communicates with the TMDB v3 API via server-side proxy routes and uses Firebase Auth (Google) and Firestore (named database `watchatlaspreference`) for user preferences.

## 2. Architectural Shape
- **Framework:** Next.js 14 Pages Router running on Vercel serverless functions.
- **Client Tier:** React components rendered client-side and server-side (SSR/SSG hybrid via Next.js).
- **Server Tier:** Next.js API routes (`pages/api/tmdb/*`, `pages/api/health.ts`, `pages/api/cron/health-check.ts`) acting as a secure backend-for-frontend (BFF) proxy.
- **Data & Auth Tier:** Firebase Auth (Google Sign-In via Google Identity Services) + Cloud Firestore (`watchatlaspreference`).

## 3. Trust Boundaries
Explicit trust boundaries are established to separate untrusted browser execution environments from sensitive backend credentials:

1. **Client Browser Boundary (`Untrusted`):**
   - Runs user-provided code, scripts, and handles user interactions.
   - Contains `NEXT_PUBLIC_FIREBASE_*` config and `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (publicly safe identifiers).
   - **Prohibited:** Cannot hold or access `TMDB_API_KEY`, `CRON_SECRET`, or `FIREBASE_ADMIN_SERVICE_ACCOUNT`.

2. **Server-Side API Proxy Boundary (`Trusted BFF`):**
   - Next.js API routes executing securely in the Vercel serverless environment.
   - Holds secure environment secrets (`TMDB_API_KEY`, `CRON_SECRET`, `FIREBASE_ADMIN_SERVICE_ACCOUNT`).
   - Validates incoming client requests, rate-limits, or proxies queries safely to external third-party services (TMDB).

3. **External Third-Party Services (`Zero Trust / External`):**
   - TMDB v3 API (`api.themoviedb.org`).
   - Google Auth / Firebase Authentication endpoints.
   - Resend Email API.

## 4. Data Ownership & Storage Patterns
- **User Preferences:** Stored in Cloud Firestore under a dedicated named database `watchatlaspreference` at path `users/{uid}`. Contains `favoriteCountries`, `favoriteServices`, and `darkMode` state.
- **Health Check & Cron State:** Stored under `system-status/health-check-debounce` using the Firebase Admin SDK inside Vercel serverless cron functions.
- **Catalog/provider data:** TMDB remains the external system of record; WatchAtlas does not currently persist catalog responses.
- **Lifecycle gap:** Firestore rules, retention, deletion/export, and schema tests are not present in this repository and remain required verification evidence.

## 5. Stage-Gate Status and Council Evidence

This is a provisional current-state architecture, not a frozen Stage 3 output.

- **Project tier:** **load-bearing**, confirmed by Josh on 2026-09-18 and recorded in `docs/DECISIONS.md`. The full Stage 3 Architecture Council is required; the throwaway-tier exemption does not apply.
- **Stage 2 requirements:** PRDs exist, but approval/settled status for the current scope is not evidenced.
- **Required seats:** `project-architect` and `security-architect` are mandatory; `backend-architect` and `cloud-security-architect` are conditional and applicable. `data-architect` is conditional and applicable because Firestore persistence exists, but the seat is unavailable in this Mac environment; its review has not been silently absorbed.
- **External architecture review:** `BLOCKED / NOT RUN`. This load-bearing system changes identity, persistent data, external integrations, and cloud-managed access. Required independent pair evidence is absent.
- **Stage 5/6:** No concrete component evaluation or disposable prototype is authorized by this document.
