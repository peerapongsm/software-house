import { test } from "node:test";
import assert from "node:assert/strict";
import { safeNext } from "./next.ts";

const o = "https://peerapongsm.dev";

test("safeNext refuses other origins, schemes and pages", () => {
  for (const n of ["//evil.com", "https://evil.com/buy", "javascript:alert(1)", "/\\evil.com", "/logout", "", null, undefined]) {
    assert.equal(safeNext(n, o), "/account", String(n));
  }
});

test("safeNext keeps /buy and /link with their query, /account without one", () => {
  assert.equal(safeNext("/buy?renew", o), "/buy?renew");
  assert.equal(safeNext("/link?code=ABCD-EFGH", o), "/link?code=ABCD-EFGH");
  assert.equal(safeNext("/account", o), "/account");
  assert.equal(safeNext("/account?x=1", o), "/account");
  assert.equal(safeNext("/buy/../logout", o), "/account");
});

test("safeNext lets an AI connector authorize request through, and nothing that only looks like one", () => {
  assert.equal(safeNext("/api/oauth/authorize?x=1", o), "/api/oauth/authorize?x=1");
  const q = "/api/oauth/authorize?response_type=code&client_id=https%3A%2F%2Fclaude.ai%2Fm.json&state=a%2Fb";
  assert.equal(safeNext(q, o), q);
  for (const n of [
    "https://evil.example",
    "//evil.example",
    "/api/oauthX",
    "/account?next=/api/oauth/authorize?",
    "https://evil.example/api/oauth/authorize?x=1",
    "//evil.example/api/oauth/authorize?x=1",
    "/api/oauth/authorize",
    "/api/oauth/authorizeX?x=1",
    "/api/oauth/authorize/../../logout?x=1",
    "/api/oauth/token?x=1",
  ]) {
    assert.equal(safeNext(n, o), "/account", n);
  }
});
