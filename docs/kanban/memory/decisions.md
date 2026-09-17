# Decisions

Settled answers to cards' open questions, grouped by topic. Keep only **user-facing**
calls that guide future planning — what a user can see, do, or would care about.
Internal detail stays on the card.

**Stack**: Next.js 14 (Pages Router) + TypeScript + Tailwind v4 + NextUI, deployed on Vercel.
**TMDB access**: all TMDB calls proxy server-side through `/api/tmdb/*`; the key is never exposed to the client.
