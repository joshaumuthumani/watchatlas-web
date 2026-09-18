import { afterEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import { sendAllNotifications, type NotificationPayload } from "../lib/notifications";

const payload: NotificationPayload = { title: "TMDB API is DOWN", message: "Health probe failed", severity: "critical", timestamp: "2026-09-18T17:33:24.960Z" };
const originalFetch = globalThis.fetch;
const originalApiKey = process.env.RESEND_API_KEY;
const originalRecipient = process.env.NOTIFICATION_EMAIL_TO;
afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalApiKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalApiKey;
  if (originalRecipient === undefined) delete process.env.NOTIFICATION_EMAIL_TO; else process.env.NOTIFICATION_EMAIL_TO = originalRecipient;
});
describe("health-check notifications", () => {
  test("sends only the configured Resend email notification", async () => {
    process.env.RESEND_API_KEY = "test-resend-key"; process.env.NOTIFICATION_EMAIL_TO = "alerts@example.test";
    const requests: Array<{ url: string; init?: RequestInit }> = [];
    globalThis.fetch = (async (url, init) => { requests.push({ url: String(url), init }); return { ok: true } as Response; }) as typeof fetch;
    await sendAllNotifications(payload);
    assert.equal(requests.length, 1); assert.equal(requests[0].url, "https://api.resend.com/emails"); assert.equal(requests[0].init?.method, "POST");
    assert.equal((requests[0].init?.headers as Record<string, string>).Authorization, "Bearer test-resend-key");
  });
  test("does not make a request when Resend configuration is absent", async () => {
    delete process.env.RESEND_API_KEY; delete process.env.NOTIFICATION_EMAIL_TO;
    globalThis.fetch = (async () => { throw new Error("must not call fetch"); }) as typeof fetch;
    await sendAllNotifications(payload);
  });
});
