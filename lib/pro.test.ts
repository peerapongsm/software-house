import { test } from "node:test";
import assert from "node:assert/strict";
import { PLAY_SUBS_URL, PLAY_URL, PRO_PRICE, PRO_PASS, proBuyError, proDonePoll } from "./pro.ts";
import { baht } from "./cart.ts";

test("PLAY_URL: the PeerapoS Pair listing on Google Play", () => {
  assert.equal(PLAY_URL, "https://play.google.com/store/apps/details?id=dev.peerapongsm.pair");
});

test("PRO_PRICE: 159 a month, 1,590 a year, in satang", () => {
  assert.deepEqual(PRO_PRICE, { monthly: 15900, annual: 159000 });
  assert.equal(baht(PRO_PRICE.monthly), "฿159");
  assert.equal(baht(PRO_PRICE.annual), "฿1,590");
});

test("PLAY_SUBS_URL: the Google Play subscriptions page", () => {
  assert.equal(PLAY_SUBS_URL, "https://play.google.com/store/account/subscriptions");
});

test("PRO_PASS: the prepaid year costs 1,590 baht", () => {
  assert.equal(PRO_PASS, 159000);
});

test("proDonePoll: waits at first and stops at 60 seconds", () => {
  const t = Date.parse("2026-11-14T00:00:00Z");
  assert.equal(proDonePoll(t, t + 5_000, null), "wait");
  assert.equal(proDonePoll(t, t + 59_999, null), "wait");
  assert.equal(proDonePoll(t, t + 60_000, null), "late");
  assert.equal(proDonePoll(t, t + 61_000, null), "late");
});

test("proDonePoll: only future coverage completes, even if cancellation is scheduled", () => {
  const t = Date.parse("2026-11-14T00:00:00Z");
  for (const source of ["play", "stripe", "pass"] as const) {
    assert.equal(proDonePoll(t, t + 61_000, { source, until: "2027-01-01", cancelling: true }), "done");
    assert.equal(proDonePoll(t, t, { source, until: "2026-11-14T00:00:00Z", cancelling: false }), "wait");
    assert.equal(proDonePoll(t, t + 61_000, { source, until: "2026-11-13", cancelling: false }), "late");
  }
});

test("proBuyError: existing Pro identifies source and date in both languages", () => {
  for (const [source, th, en] of [["play", "Google Play", "Google Play"], ["stripe", "บัตร", "card"], ["pass", "บัตรรายปี", "pass"]]) {
    const msg = proBuyError({ ok: false, status: 409, error: "proActive", data: { source, until: "2027-01-01" } });
    assert.ok(msg.th.includes(th));
    assert.ok(msg.en.includes(en));
    assert.ok(msg.th.includes("2027-01-01"));
    assert.ok(msg.en.includes("2027-01-01"));
  }
});

test("proBuyError: actionable bilingual messages for limits, closed sales, consent and connection failures", () => {
  for (const [error, th, en] of [["passLimit", "2 ปี", "2 years"], ["salesOff", "ปิด", "closed"], ["needConsent", "ยอมรับ", "terms"]]) {
    const msg = proBuyError({ ok: false, status: 409, error });
    assert.ok(msg.th.includes(th));
    assert.ok(msg.en.includes(en));
  }
  assert.deepEqual(proBuyError({ ok: false, status: 0, error: "net" }), { th: "เชื่อมต่อไม่ได้ ลองอีกครั้ง", en: "Can't connect. Try again." });
  const message = { th: "ลองใหม่ภายหลัง", en: "Try later." };
  assert.deepEqual(proBuyError({ ok: false, status: 503, error: "payDown", message }), message);
  assert.match(proBuyError({ ok: false, status: 500, error: "http" }).en, /Try again/);
});
