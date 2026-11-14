import { test } from "node:test";
import assert from "node:assert/strict";
import { day, deleteNeedsAck, isDeleteConfirm, lastUsed, ownedPaid, pillText, proView, removedAll } from "./account.ts";

const NOW = Date.parse("2026-10-30T15:00:00+07:00");

test("pillText: one line per plan status, TH and EN", () => {
  assert.deepEqual(pillText({ tone: "ok", days: 45, kind: "active" }), { th: "ใช้งานอยู่", en: "Active" });
  assert.deepEqual(pillText({ tone: "warn", days: 15, kind: "soon" }), { th: "เหลือ 15 วัน", en: "15 days left" });
  assert.deepEqual(pillText({ tone: "warn", days: 1, kind: "soon" }), { th: "เหลือ 1 วัน", en: "1 day left" });
  assert.deepEqual(pillText({ tone: "warn", days: 11, kind: "grace" }), {
    th: "หมดอายุ ใช้ต่อได้อีก 11 วัน",
    en: "Expired, 11 days of grace left",
  });
  assert.deepEqual(pillText({ tone: "err", days: 0, kind: "expired" }), { th: "หมดอายุแล้ว", en: "Expired" });
});

test("day: Thai Buddhist date in TH, day month year in EN, Bangkok time", () => {
  assert.equal(day("2026-11-12T00:00:00+07:00", "th"), "12 พ.ย. 2569");
  assert.equal(day("2026-11-12T00:00:00+07:00", "en"), "12 Nov 2026");
  // 23:30 UTC on the 11th is already the 12th in Bangkok
  assert.equal(day("2026-11-11T23:30:00Z", "en"), "12 Nov 2026");
});

test("lastUsed: today and yesterday with the time, then days ago, then a date", () => {
  assert.deepEqual(lastUsed("2026-10-30T10:42:00+07:00", NOW), { th: "ใช้ล่าสุด วันนี้ 10:42", en: "Last used today 10:42" });
  assert.deepEqual(lastUsed("2026-10-29T08:05:00+07:00", NOW), { th: "ใช้ล่าสุด เมื่อวาน 08:05", en: "Last used yesterday 08:05" });
  assert.deepEqual(lastUsed("2026-10-28T23:59:00+07:00", NOW), { th: "ใช้ล่าสุด 2 วันก่อน", en: "Last used 2 days ago" });
  assert.deepEqual(lastUsed("2026-09-30T12:00:00+07:00", NOW), { th: "ใช้ล่าสุด 30 วันก่อน", en: "Last used 30 days ago" });
  assert.deepEqual(lastUsed("2026-08-15T12:00:00+07:00", NOW), { th: "ใช้ล่าสุด 15 ส.ค. 2569", en: "Last used 15 Aug 2026" });
});

test("lastUsed: the day boundary is Bangkok midnight, not UTC", () => {
  // 00:10 Bangkok on the 30th = 17:10 UTC on the 29th: still today
  assert.equal(lastUsed("2026-10-29T17:10:00Z", NOW).en, "Last used today 00:10");
});

test("lastUsed: never seen, or a clock ahead of ours", () => {
  assert.deepEqual(lastUsed(null, NOW), { th: "ยังไม่ได้ใช้", en: "Not used yet" });
  assert.equal(lastUsed("2026-10-30T15:05:00+07:00", NOW).en, "Last used today 15:05");
});

test("ownedPaid: only known paid apps, in catalogue order", () => {
  assert.deepEqual(ownedPaid(["wellness", "account", "../x", "wash"]), ["account", "wellness"]);
  assert.deepEqual(ownedPaid([]), []);
});

test("removedAll: how many PCs “ยกเลิกทุกเครื่อง” removed", () => {
  assert.deepEqual(removedAll(3), { th: "ยกเลิกแล้ว 3 เครื่อง", en: "3 PCs removed" });
  assert.deepEqual(removedAll(1), { th: "ยกเลิกแล้ว 1 เครื่อง", en: "1 PC removed" });
});

test("isDeleteConfirm: the typed word DELETE, spaces around it ignored, nothing else", () => {
  assert.equal(isDeleteConfirm("DELETE"), true);
  assert.equal(isDeleteConfirm("  DELETE "), true);
  assert.equal(isDeleteConfirm("delete"), false);
  assert.equal(isDeleteConfirm("DELETE ACCOUNT"), false);
  assert.equal(isDeleteConfirm(""), false);
});

test("deleteNeedsAck: 409 activeSub means a Play subscription is still running", () => {
  assert.equal(deleteNeedsAck({ ok: false, status: 409, error: "activeSub" }), true);
  assert.equal(deleteNeedsAck({ ok: false, status: 409, error: "other" }), false);
  assert.equal(deleteNeedsAck({ ok: false, status: 500, error: "http" }), false);
});

test("proView: no Pro can subscribe with no management or renewal", () => {
  assert.deepEqual(proView(null, NOW), { status: null, source: null, manage: null, renew: false, subscribe: true });
});

test("proView: Stripe opens the portal, Play opens Play", () => {
  for (const [source, manage] of [["stripe", "portal"], ["play", "play"]] as const) {
    const view = proView({ source, until: "2026-12-09T15:00:00+07:00", cancelling: true }, NOW);
    assert.equal(view.status?.kind, "active");
    assert.deepEqual([view.source, view.manage, view.renew, view.subscribe], [source, manage, false, false]);
  }
});

test("proView: passes renew in the last 30 days, never open subscription management", () => {
  for (const [until, renew] of [["2026-12-09T15:00:00+07:00", false], ["2026-11-29T15:00:00+07:00", true], ["2026-11-19T15:00:00+07:00", true]] as const) {
    const view = proView({ source: "pass", until, cancelling: false }, NOW);
    assert.deepEqual([view.source, view.manage, view.renew, view.subscribe], ["pass", null, renew, false]);
  }
});

test("proView: ended coverage can subscribe even during PC grace; ended passes can renew", () => {
  for (const until of ["2026-10-30T15:00:00+07:00", "2026-10-25T00:00:00+07:00", "2026-09-01T00:00:00+07:00"]) {
    const view = proView({ source: "pass", until, cancelling: false }, NOW);
    assert.deepEqual([view.manage, view.renew, view.subscribe], [null, true, true]);
  }
});
