import { test } from "node:test";
import assert from "node:assert/strict";
import { appInfo, askedAt, linkResult, typeCode, userCode } from "./link.ts";

const NOW = Date.parse("2026-10-30T15:00:00+07:00");

test("typeCode: upper-case, only code letters, dash after the 4th, at most 8", () => {
  assert.equal(typeCode("abcd"), "ABCD");
  assert.equal(typeCode("abcde"), "ABCD-E");
  assert.equal(typeCode("abcd-efgh"), "ABCD-EFGH");
  assert.equal(typeCode(" ab cd ef gh jk "), "ABCD-EFGH");
  // 0, O, 1 and I are never in a code
  assert.equal(typeCode("O0I1wx29"), "WX29");
  assert.equal(typeCode(""), "");
});

test("userCode: a whole code from ?code= or the field, else null", () => {
  assert.equal(userCode("ABCD-EFGH"), "ABCD-EFGH");
  assert.equal(userCode("abcdefgh"), "ABCD-EFGH");
  assert.equal(userCode(" wx29-k7mp "), "WX29-K7MP");
  assert.equal(userCode("ABCD-EFG"), null);
  assert.equal(userCode("ABCD-EFGHJ"), null);
  assert.equal(userCode("ABCD-EF0H"), null);
  assert.equal(userCode(null), null);
  assert.equal(userCode(""), null);
});

test("appInfo: free and paid apps get their name and icon; anything else no icon", () => {
  assert.deepEqual(appInfo("pos"), { name: "PeerapoS POS", icon: "/apps/pos.png" });
  assert.deepEqual(appInfo("wash"), { name: "PeerapoS Wash", icon: "/apps/wash.png" });
  assert.deepEqual(appInfo("wholesale"), { name: "PeerapoS Wholesale", icon: "/apps/wholesale.png" });
  assert.deepEqual(appInfo("../x"), { name: "PeerapoS", icon: null });
});

test("askedAt: Bangkok clock time and how long ago", () => {
  assert.deepEqual(askedAt("2026-10-30T14:59:40+07:00", NOW), { th: "ขอเมื่อ 14:59 · เมื่อสักครู่", en: "Asked at 14:59 · just now" });
  assert.deepEqual(askedAt("2026-10-30T14:57:00+07:00", NOW), { th: "ขอเมื่อ 14:57 · 3 นาทีก่อน", en: "Asked at 14:57 · 3 min ago" });
  // a clock a little ahead of ours is still "just now"
  assert.equal(askedAt("2026-10-30T15:00:20+07:00", NOW).en, "Asked at 15:00 · just now");
});

test("linkResult: each answer from device request, approve and deny", () => {
  assert.deepEqual(linkResult({ ok: true, data: {} }), { kind: "ok" });
  assert.deepEqual(linkResult({ ok: false, status: 401, error: "signedOut" }), { kind: "out" });
  assert.deepEqual(linkResult({ ok: false, status: 404, error: "notFound" }), { kind: "gone" });
  assert.deepEqual(linkResult({ ok: false, status: 400, error: "badCode" }), { kind: "gone" });
  assert.deepEqual(linkResult({ ok: false, status: 409, error: "full" }), { kind: "full" });
  assert.deepEqual(linkResult({ ok: false, status: 409, error: "nothingBought" }), { kind: "nothing" });
  assert.deepEqual(linkResult({ ok: false, status: 0, error: "net" }), {
    kind: "err",
    msg: { th: "เชื่อมต่อไม่ได้ ลองอีกครั้ง", en: "Can't connect. Try again." },
  });
  const message = { th: "ช้าลงหน่อย", en: "Slow down." };
  assert.deepEqual(linkResult({ ok: false, status: 429, error: "rateLimited", message }), { kind: "err", msg: message });
});
