import { watchatlaspreference } from "@/lib/firebaseAdmin";

export type DebounceState = {
  lastKnownStatus: "healthy" | "degraded" | null;
  consecutiveFailures: number;
};

const debounceStateDocument = watchatlaspreference
  .collection("system-status")
  .doc("health-check-debounce");

const defaultState: DebounceState = {
  lastKnownStatus: null,
  consecutiveFailures: 0,
};

export const cronState = {
  async getDebounceState(): Promise<DebounceState> {
    const snapshot = await debounceStateDocument.get();

    if (!snapshot.exists) return defaultState;

    const state = snapshot.data();
    if (
      !state ||
      (state.lastKnownStatus !== "healthy" && state.lastKnownStatus !== "degraded") ||
      !Number.isSafeInteger(state.consecutiveFailures) ||
      state.consecutiveFailures < 0
    ) {
      throw new Error("Health-check debounce state is invalid");
    }

    return state as DebounceState;
  },

  async saveDebounceState(state: DebounceState): Promise<void> {
    await debounceStateDocument.set(state, { merge: true });
  },
};
