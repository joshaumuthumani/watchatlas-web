#!/usr/bin/env bash
set -euo pipefail
EXPECTED="${1:?usage: graphify-gate.sh <expected-sha>}"
REC=docs/graphify.json
if [ ! -f "$REC" ]; then
  echo "::error::$REC missing — repository is unclassified for Graphify (Stage 1 retrofit required)"
  exit 1
fi
STATUS=$(jq -r '.status // "missing"' "$REC")
REASON=$(jq -r '.skip_reason // ""' "$REC")
if [ "$STATUS" = skipped ]; then
  [ -n "$REASON" ] && [ "$REASON" != null ] || { echo '::error::skipped with no skip_reason'; exit 1; }
  echo "Graphify N/A: $REASON"
  exit 0
fi
[ "$STATUS" = enabled ] || { echo "::error::unrecognised Graphify status $STATUS"; exit 1; }
[ "$(jq -r '.last_refresh.result // "missing"' "$REC")" = success ] || { echo '::error::latest lifecycle refresh failed'; exit 1; }
graphify extract . --code-only --update
GRAPH=graphify-out/graph.json
[ -f "$GRAPH" ] || { echo "::error::$GRAPH missing after extraction"; exit 1; }
BUILT=$(jq -r '.built_at_commit // ""' "$GRAPH")
NODES=$(jq '.nodes | length' "$GRAPH")
PREV=$(jq -r '.last_refresh.nodes // 0' "$REC")
[ "$BUILT" = "$EXPECTED" ] || { echo "::error::graph stale: $BUILT != $EXPECTED"; exit 1; }
[ "$NODES" -gt 0 ] || { echo '::error::graph has zero nodes'; exit 1; }
if [ "$PREV" -gt 0 ] && [ "$NODES" -lt $(( PREV * 9 / 10 )) ]; then
  JUST=$(jq -r '.drift_justification // ""' "$REC")
  [ -n "$JUST" ] && [ "$JUST" != null ] || { echo "::error::node count collapsed $PREV -> $NODES without drift_justification"; exit 1; }
fi
echo "Graphify fresh: $BUILT ($NODES nodes)"
