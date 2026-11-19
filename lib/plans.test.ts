import { test } from "node:test";
import assert from "node:assert/strict";
import { APPS, FEATURED_SLUGS, slugOf, splitFeatured } from "../app/apps-data.ts";
import { ACCOUNT_PCS } from "./plans.ts";

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
