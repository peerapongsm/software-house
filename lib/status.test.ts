import { test } from "node:test";
import assert from "node:assert/strict";
import { planStatus } from "./status.ts";

const DAY = 864e5;
const now = Date.parse("2026-10-30T12:00:00Z");
const at = (days: number) => new Date(now + days * DAY).toISOString();

test("more than 30 days left is active", () => {
  assert.deepEqual(planStatus(at(45), now), { tone: "ok", days: 45, kind: "active" });
});

test("30 days or less is soon", () => {
  assert.deepEqual(planStatus(at(15), now), { tone: "warn", days: 15, kind: "soon" });
  assert.deepEqual(planStatus(at(30), now), { tone: "warn", days: 30, kind: "soon" });
});

test("up to 14 days past the end is grace, counting the days left", () => {
  assert.deepEqual(planStatus(at(-3), now), { tone: "warn", days: 11, kind: "grace" });
});

test("past the grace is expired", () => {
  assert.equal(planStatus(at(-20), now).tone, "err");
  assert.equal(planStatus(at(-20), now).kind, "expired");
});
