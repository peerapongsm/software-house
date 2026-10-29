import { test } from "node:test";
import assert from "node:assert/strict";
import { api } from "./api.ts";

type Call = { url: string; init: RequestInit };

function fakeFetch(respond: () => Response | Promise<Response>) {
  const calls: Call[] = [];
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return respond();
  }) as typeof fetch;
  return calls;
}

const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

test("GET sends the session cookie and returns the data", async () => {
  const calls = fakeFetch(() => json(200, { ok: true, email: "a@b.co" }));
  const r = await api<{ email: string }>("/api/me");
  assert.deepEqual(r, { ok: true, data: { ok: true, email: "a@b.co" } });
  assert.equal(calls[0].url, "/api/me");
  assert.equal(calls[0].init.method, "GET");
  assert.equal(calls[0].init.credentials, "include");
  assert.equal(calls[0].init.body, undefined);
});

test("POST sends JSON, {} when there is no body", async () => {
  const calls = fakeFetch(() => json(200, { ok: true }));
  await api("/api/logout", { method: "POST" });
  await api("/api/login/start", { method: "POST", body: { email: "a@b.co" } });
  assert.equal(calls[0].init.body, "{}");
  assert.equal(calls[1].init.body, JSON.stringify({ email: "a@b.co" }));
  assert.equal(new Headers(calls[1].init.headers).get("content-type"), "application/json");
});

test("form posts go as multipart without a JSON content type", async () => {
  const calls = fakeFetch(() => json(200, { ok: true }));
  const form = new FormData();
  await api("/api/order/O-1/slip", { method: "POST", form });
  assert.equal(calls[0].init.body, form);
  assert.equal(new Headers(calls[0].init.headers).get("content-type"), null);
});

test("API errors keep status, code, message and the body", async () => {
  fakeFetch(() => json(400, { ok: false, error: "wrongCode", left: 2, message: { th: "ผิด", en: "Wrong" } }));
  const r = await api("/api/login/verify", { method: "POST", body: { email: "a@b.co", code: "000000" } });
  assert.equal(r.ok, false);
  if (r.ok) return;
  assert.equal(r.status, 400);
  assert.equal(r.error, "wrongCode");
  assert.deepEqual(r.message, { th: "ผิด", en: "Wrong" });
  assert.equal(r.data.left, 2);
});

test("a non-JSON error still fails cleanly", async () => {
  fakeFetch(() => new Response("Bad gateway", { status: 502 }));
  const r = await api("/api/me");
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.status, 502);
});

test("network failure is status 0, error net", async () => {
  fakeFetch(() => Promise.reject(new TypeError("Failed to fetch")));
  assert.deepEqual(await api("/api/me"), { ok: false, status: 0, error: "net" });
});
