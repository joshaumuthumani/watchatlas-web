# GitHub Project, Webhook, and Intent-Store Declaration

## Current state

- **Date:** 2026-09-18
- **Scope:** Current WatchAtlas production system, not deferred roadmap integrations.

## GitHub Project

Work is tracked in the [WatchAtlas GitHub Project](https://github.com/orgs/aurora-peak/projects/2). GitHub Issues and that Project are the authoritative delivery-planning record.

## Inbound webhooks

No production WatchAtlas service receives GitHub webhooks. The repository has no deployed webhook receiver, signing secret, or event processor. GitHub Actions workflows are repository automation, not an externally reachable webhook endpoint.

## Intent store

No separate production intent store exists. User preferences are stored in the named Firestore database at users/{uid}; health-check debounce state is stored in Firestore for the monitoring job. Neither is a GitHub delivery-intent store.

A future webhook consumer, external synchronization, or intent store must define the authoritative system, schema, authentication/signature verification, idempotency, access control, retention/deletion, and reconciliation before deployment.
