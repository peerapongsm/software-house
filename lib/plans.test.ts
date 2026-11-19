import { test } from "node:test";
import assert from "node:assert/strict";
import { APPS, FEATURED_SLUGS, slugOf, splitFeatured } from "../app/apps-data.ts";
import { ACCOUNT_PCS, PLAN_NAMES, PLAN_NOTES, PLAN_ROWS } from "./plans.ts";

test("splitFeatured: the top 5 come first, in download order", () => {
  const { featured } = splitFeatured(APPS);
  assert.deepEqual(featured.map(slugOf), ["stock", "file", "room", "pos", "pay"]);
  assert.deepEqual([...FEATURED_SLUGS], ["stock", "file", "room", "pos", "pay"]);
});

test("splitFeatured: rest is every other app, in original order, with no featured slug", () => {
  const { rest } = splitFeatured(APPS);
  assert.equal(rest.length, APPS.length - 5);
  const featured = new Set<string>(FEATURED_SLUGS);
  for (const a of rest) assert.equal(featured.has(slugOf(a)), false);
  const originalOrder = APPS.filter(a => !featured.has(slugOf(a)));
  assert.deepEqual(rest.map(slugOf), originalOrder.map(slugOf));
});

test("splitFeatured: throws when a featured app is missing, instead of showing 4 cards", () => {
  assert.throws(() => splitFeatured(APPS.filter(a => slugOf(a) !== "pos")));
});

test("ACCOUNT_PCS: paid 2, Pro 6, Pro + paid 10 (mirror of licence caps)", () => {
  assert.deepEqual(ACCOUNT_PCS, { paid: 2, pro: 6, proPaid: 10 });
});

test("PLAN_ROWS: 4 rows, each with a label and 4 plan cells", () => {
  assert.equal(PLAN_NAMES.length, 4);
  assert.equal(PLAN_ROWS.length, 4);
  for (const row of PLAN_ROWS) assert.equal(row.cells.length, 4);
});

test("PLAN_ROWS: row 2 counts are 2, 6, 10 in order for paid, Pro and Pro + paid", () => {
  assert.deepEqual(PLAN_ROWS[1].cells.slice(1).map(c => c.en.match(/\d+/)?.[0]), ["2", "6", "10"]);
});

test("plan copy: every cell and note has Thai and English, and no Thai text ends with a full stop", () => {
  const copy = [
    ...PLAN_NAMES,
    ...PLAN_ROWS.flatMap(row => [row.label, ...row.cells]),
    ...Object.values(PLAN_NOTES),
  ];
  for (const m of copy) {
    assert.ok(m.th.trim(), "th");
    assert.ok(m.en.trim(), "en");
    assert.doesNotMatch(m.th, /\.$/);
  }
});
