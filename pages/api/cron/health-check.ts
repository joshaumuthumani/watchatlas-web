import type { NextApiRequest, NextApiResponse } from "next";
import { cronState, type DebounceState } from "@/lib/cronState";
import { sendAllNotifications } from "@/lib/notifications";

const TMDB_BASE = "https://api.themoviedb.org/3";

const FAILURE_THRESHOLD = 2;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify Vercel cron secret (prevents unauthorized invocations)
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return res.status(500).json({ error: "Cron secret not configured" });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "TMDB API key not configured" });
  }

  let debounceState: DebounceState;

  try {
    debounceState = await cronState.getDebounceState();
  } catch (error) {
    console.error("Failed to read health-check debounce state", error);
    return res.status(500).json({ error: "Failed to persist health-check debounce state" });
  }

  let currentStatus: "healthy" | "degraded";

  try {
    const response = await fetch(`${TMDB_BASE}/configuration?api_key=${apiKey}`, {
      signal: AbortSignal.timeout(10000),
    });
    currentStatus = response.ok ? "healthy" : "degraded";
  } catch {
    currentStatus = "degraded";
  }

  const nextState: DebounceState = {
    lastKnownStatus: debounceState.lastKnownStatus,
    consecutiveFailures:
      currentStatus === "degraded" ? debounceState.consecutiveFailures + 1 : 0,
  };

  const now = new Date().toISOString();
  let notified = false;
  let notification: Parameters<typeof sendAllNotifications>[0] | undefined;

  // Detect state transitions (with debounce for failures)
  if (nextState.lastKnownStatus !== null && nextState.lastKnownStatus !== currentStatus) {
    if (currentStatus === "degraded" && nextState.consecutiveFailures >= FAILURE_THRESHOLD) {
      notification = {
        title: "TMDB API is DOWN",
        message: "WatchAtlas cannot reach the TMDB API. The site is showing empty content to visitors.",
        severity: "critical",
        timestamp: now,
        details: {
          "Consecutive Failures": nextState.consecutiveFailures,
          "Site URL": process.env.NEXT_PUBLIC_SITE_URL || "N/A",
        },
      };
      nextState.lastKnownStatus = currentStatus;
    } else if (currentStatus === "healthy") {
      notification = {
        title: "TMDB API RECOVERED",
        message: "WatchAtlas has reconnected to the TMDB API. The site is functioning normally.",
        severity: "recovery",
        timestamp: now,
      };
      nextState.lastKnownStatus = currentStatus;
    }
  } else {
    nextState.lastKnownStatus = currentStatus;
  }

  try {
    await cronState.saveDebounceState(nextState);
  } catch (error) {
    console.error("Failed to save health-check debounce state", error);
    return res.status(500).json({ error: "Failed to persist health-check debounce state" });
  }

  if (notification) {
    await sendAllNotifications(notification);
    notified = true;
  }

  return res.status(200).json({
    checked: now,
    status: currentStatus,
    consecutiveFailures: nextState.consecutiveFailures,
    notified,
  });
}
