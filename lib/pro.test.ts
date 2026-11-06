import { test } from "node:test";
import assert from "node:assert/strict";
import { PLAY_SUBS_URL, PLAY_URL, PRO_PRICE } from "./pro.ts";
import { baht } from "./cart.ts";

test("PLAY_URL: the PeerapoS Go listing on Google Play", () => {
  assert.equal(PLAY_URL, "https://play.google.com/store/apps/details?id=dev.peerapongsm.go");
});

test("PRO_PRICE: 159 a month, 1,590 a year, in satang", () => {
  assert.deepEqual(PRO_PRICE, { monthly: 15900, annual: 159000 });
  assert.equal(baht(PRO_PRICE.monthly), "฿159");
  assert.equal(baht(PRO_PRICE.annual), "฿1,590");
});

test("PLAY_SUBS_URL: the Google Play subscriptions page", () => {
  assert.equal(PLAY_SUBS_URL, "https://play.google.com/store/account/subscriptions");
});
