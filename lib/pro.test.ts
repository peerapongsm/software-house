import { readFileSync } from "node:fs";
import * as pro from "./pro.ts";
import { test } from "node:test";
import assert from "node:assert/strict";
import { PLAY_SUBS_URL, PLAY_URL, PRO_PRICE, PRO_PASS, proActive, proBuyError, proDonePoll } from "./pro.ts";
import { baht } from "./cart.ts";
import { day } from "./account.ts";

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

test("proActive: no Pro is inactive", () => {
  assert.equal(proActive(null, Date.parse("2026-11-14T00:00:00Z")), false);
});

test("proActive: every source is active only before expiry, regardless of cancellation", () => {
  const now = Date.parse("2026-11-14T00:00:00Z");
  for (const source of ["play", "stripe", "pass"] as const) {
    for (const cancelling of [false, true]) {
      assert.equal(proActive({ source, until: new Date(now + 1).toISOString(), cancelling }, now), true);
      assert.equal(proActive({ source, until: new Date(now).toISOString(), cancelling }, now), false);
      assert.equal(proActive({ source, until: new Date(now - 1).toISOString(), cancelling }, now), false);
    }
  }
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
  for (const [source, th, en] of [["play", "Google Play", "Google Play"], ["stripe", "การสมัครผ่านบัตร", "card"], ["pass", "Pro 1 ปี", "pass"]]) {
    const msg = proBuyError({ ok: false, status: 409, error: "proActive", data: { source, until: "2027-01-01T00:00:00.000Z" } });
    assert.doesNotMatch(msg.th, /T00:00/);
    assert.doesNotMatch(msg.en, /T00:00/);
    assert.ok(msg.th.includes(th));
    assert.ok(msg.en.includes(en));
    assert.ok(msg.th.includes(day("2027-01-01T00:00:00.000Z", "th")));
    assert.ok(msg.en.includes(day("2027-01-01T00:00:00.000Z", "en")));
  }
});

test("proBuyError: actionable bilingual messages for limits, closed sales, consent and connection failures", () => {
  for (const [error, th, en] of [["passLimit", "2 ปี", "2 years"], ["needConsent", "ยอมรับ", "terms"]]) {
    const msg = proBuyError({ ok: false, status: 409, error });
    assert.ok(msg.th.includes(th));
    assert.ok(msg.en.includes(en));
  }
  assert.deepEqual(proBuyError({ ok: false, status: 0, error: "net" }), { th: "เชื่อมต่อไม่ได้ ลองอีกครั้ง", en: "Can't connect. Try again." });
  assert.deepEqual(proBuyError({ ok: false, status: 503, error: "payDown" }), {
    th: "ระบบชำระเงินขัดข้อง ลองใหม่ในอีกไม่กี่นาที",
    en: "Payments are down. Try again in a few minutes.",
  });
  assert.match(proBuyError({ ok: false, status: 500, error: "http" }).en, /Try again/);
});

test("Pro exports and page do not claim web purchases are unavailable", () => {
  const stale = /not sold on this site|ไม่ได้ขายบนเว็บ|ไม่ขายบนเว็บ|does not sell Pro|only in the store app|เฉพาะในแอปบน Google Play/i;
  assert.doesNotMatch(JSON.stringify(pro), stale);
  assert.doesNotMatch(readFileSync(new URL("../app/pro/page.tsx", import.meta.url), "utf8"), stale);
});

test("Pro metadata describes features without store restrictions or prices", () => {
  const layout = readFileSync(new URL("../app/pro/layout.tsx", import.meta.url), "utf8");
  const description = layout.match(/description: "([^"]+)"/);
  assert.ok(description);
  assert.match(description[1], /สำรองข้อมูล/);
  assert.match(description[1], /Google/);
  assert.match(description[1], /AI/);
  assert.doesNotMatch(description[1], /Google Play|\d/);
});

test("proDonePoll: active pass renewal waits for coverage to advance", () => {
  const t = Date.parse("2026-11-14T00:00:00Z");
  const before = "2027-01-01";
  const active = { source: "pass" as const, until: before, cancelling: false };
  assert.equal(proDonePoll(t, t + 5_000, active, before), "wait");
  assert.equal(proDonePoll(t, t + 60_000, active, before), "late");
  assert.equal(proDonePoll(t, t + 5_000, { ...active, until: "2026-12-01" }, before), "wait");
  assert.equal(proDonePoll(t, t + 5_000, { ...active, until: "2028-01-01" }, before), "done");
  assert.equal(proDonePoll(t, t + 5_000, active, null), "done");
});
