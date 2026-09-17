import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  getImageOutcomeCounts,
  recordImageOutcome,
  resetImageOutcomeCounts,
} from "../lib/imageDelivery";

describe("image delivery safeguards", () => {
  test("keeps Next image optimization disabled", () => {
    const nextConfig = require("../next.config.js");
    assert.equal(nextConfig.images.unoptimized, true);
  });

  test("ships the local unavailable-image asset", () => {
    assert.equal(existsSync(join(process.cwd(), "public", "image-unavailable.svg")), true);
  });

  test("counts loaded and unavailable image outcomes separately", () => {
    resetImageOutcomeCounts();
    recordImageOutcome("browse", "loaded");
    recordImageOutcome("detail", "unavailable");
    recordImageOutcome("provider", "unavailable");

    assert.deepEqual(getImageOutcomeCounts(), { loaded: 1, unavailable: 2 });
  });
});
