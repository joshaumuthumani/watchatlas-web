import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { getPosterUrl, getTMDBImageUrl } from "../lib/tmdb";

describe("getPosterUrl", () => {
  test("builds a TMDB image URL at the default size", () => {
    assert.equal(getPosterUrl("/abc123.jpg"), "https://image.tmdb.org/t/p/w500/abc123.jpg");
  });

  test("honors an explicit size", () => {
    assert.equal(getPosterUrl("/abc123.jpg", "original"), "https://image.tmdb.org/t/p/original/abc123.jpg");
  });

  test("falls back to the bundled unavailable image when a title has no poster", () => {
    assert.equal(getPosterUrl(null), "/image-unavailable.svg");
  });

  test("treats an empty path as no poster rather than building a broken URL", () => {
    assert.equal(getPosterUrl(""), "/image-unavailable.svg");
  });

  test("lets rendered images distinguish an unavailable path from a direct TMDB URL", () => {
    assert.equal(getTMDBImageUrl(null), null);
    assert.equal(getTMDBImageUrl("   "), null);
    assert.equal(getTMDBImageUrl("/abc123.jpg", "w92"), "https://image.tmdb.org/t/p/w92/abc123.jpg");
  });
});
