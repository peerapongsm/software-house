import { test } from "node:test";
import assert from "node:assert/strict";
import { safeNext } from "./next.ts";

const o = "https://peerapongsm.dev";

test("safeNext refuses other origins, schemes and pages", () => {
  for (const n of ["//evil.com", "https://evil.com/buy", "javascript:alert(1)", "/\\evil.com", "/logout", "", null, undefined]) {
    assert.equal(safeNext(n, o), "/account", String(n));
  }
});

test("safeNext keeps /buy, /account and /link with their query", () => {
  assert.equal(safeNext("/buy?renew", o), "/buy?renew");
  assert.equal(safeNext("/link?code=ABCD-EFGH", o), "/link?code=ABCD-EFGH");
  assert.equal(safeNext("/account", o), "/account");
  assert.equal(safeNext("/buy/../logout", o), "/account");
});
