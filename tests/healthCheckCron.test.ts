import { before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";

let healthCheckHandler: any;
let cronState: any;

before(async () => {
  const privateKey = generateKeyPairSync("rsa", { modulusLength: 2048 }).privateKey.export({
    type: "pkcs8",
    format: "pem",
  });
  process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT = JSON.stringify({
    project_id: "watchatlas-test",
    client_email: "test@watchatlas-test.iam.gserviceaccount.com",
    private_key: privateKey,
  });

  ({ default: healthCheckHandler } = await import("../pages/api/cron/health-check"));
  ({ cronState } = await import("../lib/cronState"));
});

type MockResponse = {
  statusCode: number;
  body: any;
  status: (code: number) => MockResponse;
  json: (body: unknown) => MockResponse;
};

function createResponse(): MockResponse {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

function tmdbResponse(ok: boolean): Response {
  return { ok } as Response;
}

function installEnvironment(t: { after: (callback: () => void) => void }) {
  const originalCronSecret = process.env.CRON_SECRET;
  const originalApiKey = process.env.TMDB_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.CRON_SECRET = "cron-secret";
  process.env.TMDB_API_KEY = "tmdb-key";
  globalThis.fetch = (async () => tmdbResponse(true)) as typeof fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalCronSecret === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = originalCronSecret;
    if (originalApiKey === undefined) delete process.env.TMDB_API_KEY;
    else process.env.TMDB_API_KEY = originalApiKey;
  });
}

async function invoke() {
  const res = createResponse();
  await healthCheckHandler(
    { headers: { authorization: "Bearer cron-secret" } } as any,
    res as any
  );
  return res;
}

describe("health-check cron", () => {
  test("persists a first healthy result", async (t) => {
    installEnvironment(t);
    const saved: any[] = [];
    t.mock.method(cronState, "getDebounceState", async () => ({
      lastKnownStatus: null,
      consecutiveFailures: 0,
    }));
    t.mock.method(cronState, "saveDebounceState", async (state) => {
      saved.push(state);
    });

    const res = await invoke();

    assert.equal(res.statusCode, 200);
    assert.deepEqual(saved, [{ lastKnownStatus: "healthy", consecutiveFailures: 0 }]);
    assert.equal(res.body.notified, false);
  });

  test("debounces persisted degradation until the failure threshold", async (t) => {
    installEnvironment(t);
    globalThis.fetch = (async () => tmdbResponse(false)) as typeof fetch;
    const saved: any[] = [];
    t.mock.method(cronState, "getDebounceState", async () => ({
      lastKnownStatus: "healthy",
      consecutiveFailures: 0,
    }));
    t.mock.method(cronState, "saveDebounceState", async (state) => {
      saved.push(state);
    });

    const first = await invoke();
    t.mock.restoreAll();
    t.mock.method(cronState, "getDebounceState", async () => saved[0]);
    t.mock.method(cronState, "saveDebounceState", async (state) => {
      saved.push(state);
    });
    const second = await invoke();

    assert.equal(first.body.notified, false);
    assert.equal(second.body.notified, true);
    assert.deepEqual(saved, [
      { lastKnownStatus: "healthy", consecutiveFailures: 1 },
      { lastKnownStatus: "degraded", consecutiveFailures: 2 },
    ]);
  });

  test("sends a recovery after persisted degradation", async (t) => {
    installEnvironment(t);
    const saved: any[] = [];
    t.mock.method(cronState, "getDebounceState", async () => ({
      lastKnownStatus: "degraded",
      consecutiveFailures: 2,
    }));
    t.mock.method(cronState, "saveDebounceState", async (state) => {
      saved.push(state);
    });

    const res = await invoke();

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.notified, true);
    assert.deepEqual(saved, [{ lastKnownStatus: "healthy", consecutiveFailures: 0 }]);
  });

  test("returns 500 without notifying when debounce persistence fails", async (t) => {
    installEnvironment(t);
    t.mock.method(console, "error", () => undefined);
    let fetchCalls = 0;
    globalThis.fetch = (async () => {
      fetchCalls += 1;
      return tmdbResponse(false);
    }) as typeof fetch;
    t.mock.method(cronState, "getDebounceState", async () => ({
      lastKnownStatus: "healthy",
      consecutiveFailures: 1,
    }));
    t.mock.method(cronState, "saveDebounceState", async () => {
      throw new Error("Firestore unavailable");
    });

    const res = await invoke();

    assert.equal(res.statusCode, 500);
    assert.equal(res.body.error, "Failed to persist health-check debounce state");
    assert.equal(fetchCalls, 1);
  });

  test("returns 500 without probing or notifying when debounce state cannot be read", async (t) => {
    installEnvironment(t);
    t.mock.method(console, "error", () => undefined);
    let fetchCalls = 0;
    globalThis.fetch = (async () => {
      fetchCalls += 1;
      return tmdbResponse(true);
    }) as typeof fetch;
    t.mock.method(cronState, "getDebounceState", async () => {
      throw new Error("Firestore unavailable");
    });

    const res = await invoke();

    assert.equal(res.statusCode, 500);
    assert.equal(res.body.error, "Failed to persist health-check debounce state");
    assert.equal(fetchCalls, 0);
  });
});
