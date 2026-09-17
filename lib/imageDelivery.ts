export const IMAGE_FALLBACK_SRC = "/image-unavailable.svg";

export type ImageSurface = "browse" | "discovery" | "detail" | "provider" | "service-picker";
export type ImageOutcome = "loaded" | "unavailable";

export type ImageOutcomeCounts = Record<ImageOutcome, number>;

const imageOutcomeCounts: ImageOutcomeCounts = { loaded: 0, unavailable: 0 };

/**
 * Records only client-observed image outcomes. This deliberately has no network
 * side effect: image delivery must stay independent of Vercel and analytics.
 */
export function recordImageOutcome(surface: ImageSurface, outcome: ImageOutcome) {
  imageOutcomeCounts[outcome] += 1;

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("watchatlas:image-outcome", { detail: { surface, outcome } })
    );
  }
}

export function getImageOutcomeCounts(): ImageOutcomeCounts {
  return { ...imageOutcomeCounts };
}

export function resetImageOutcomeCounts() {
  imageOutcomeCounts.loaded = 0;
  imageOutcomeCounts.unavailable = 0;
}
