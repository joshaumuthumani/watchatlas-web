# Configuration

This file adapts ai4kanban to your project. `akb raw init` seeds it at
`docs/kanban/config.md`; setup fills in the project. Edit the defaults whenever the project
needs something different.

The board's flows read these values — when one says "your planning sources" or "your
reference docs", it means what's set here.

**This file lives with your board, at `docs/kanban/config.md`, and carries your project's
settings — it's yours.** The skill folder (`SKILL.md`, `kanban.mjs`) is generic and owned
by upstream, so an update overwrites it wholesale; this file is never touched. See
`akb guide update`.

- **Setup** — this board is set up; plan and create cards freely.
- **Project** — WatchAtlas: Global streaming availability guide: search TMDB titles and see where to stream, rent, or buy them across every country, grouped by continent.
- **Stale after** — 30 days
  _(how long a card may sit untouched before `akb raw list --stale` calls it stuck.)_
- **Planning sources** — what to read when proposing new work:
  the README and package manifests, the codebase, project documentation, and board memory.
- **Reference docs** — optional files the flows read when they exist:
  - roadmap / direction: none
  - user-facing docs the work should keep in sync: `docs/` when it contains project docs
  - anything else worth scanning each loop: none
