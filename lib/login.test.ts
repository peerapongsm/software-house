import { test } from "node:test";
import assert from "node:assert/strict";
import { afterStart, afterVerify, clock } from "./login.ts";

const fail = (status: number, error: string, data: object = {}, message?: { th: string; en: string }) =>
  ({ ok: false, status, error, message, data: { ok: false, error, ...data } }) as const;

test("clock shows M:SS for the resend wait", () => {
  assert.equal(clock(60), "1:00");
  assert.equal(clock(59), "0:59");
  assert.equal(clock(5), "0:05");
  assert.equal(clock(725), "12:05");
});

test("afterStart: sent waits 60 s; tooSoon waits retryIn and keeps the earlier code", () => {
  assert.deepEqual(afterStart({ ok: true, data: { ok: true } }), { kind: "sent", wait: 60 });
  assert.deepEqual(afterStart(fail(429, "tooSoon", { retryIn: 42 })), { kind: "wait", wait: 42 });
  assert.deepEqual(afterStart(fail(429, "tooSoon")), { kind: "wait", wait: 60 });
});

test("afterStart errors: mail quota, network, server message, fallback", () => {
  const quota = afterStart(fail(503, "mailQuota"));
  assert.equal(quota.kind === "err" && quota.msg.th, "ส่งรหัสไม่ได้ตอนนี้ ลองใหม่พรุ่งนี้");
  const net = afterStart({ ok: false, status: 0, error: "net" });
  assert.equal(net.kind === "err" && net.msg.th, "เชื่อมต่อไม่ได้ ลองอีกครั้ง");
  const bot = afterStart(fail(403, "bot", {}, { th: "ลองใหม่", en: "Try again." }));
  assert.deepEqual(bot, { kind: "err", msg: { th: "ลองใหม่", en: "Try again." } });
  const other = afterStart(fail(400, "huh"));
  assert.equal(other.kind, "err");
});

test("afterVerify: right code signs in", () => {
  assert.deepEqual(afterVerify({ ok: true, data: { ok: true } }, 0), { kind: "ok" });
});

test("afterVerify: a wrong code says how many tries are left", () => {
  const r = afterVerify(fail(400, "wrongCode", { left: 2 }), 0);
  assert.equal(r.kind, "wrong");
  assert.equal(r.kind === "wrong" && r.msg.th, "รหัสไม่ถูกต้อง เหลืออีก 2 ครั้ง");
  const one = afterVerify(fail(400, "wrongCode", { left: 1 }), 1);
  assert.equal(one.kind === "wrong" && one.msg.en, "Wrong code. 1 try left.");
});

test("afterVerify: the third wrong code kills it", () => {
  const dead3 = "รหัสไม่ถูกต้อง 3 ครั้งแล้ว ขอรหัสใหม่";
  const left0 = afterVerify(fail(400, "wrongCode", { left: 0 }), 2);
  assert.equal(left0.kind === "dead" && left0.msg.th, dead3);
  const killed = afterVerify(fail(400, "codeDead"), 2);
  assert.equal(killed.kind === "dead" && killed.msg.th, dead3);
});

test("afterVerify: codeDead without three wrongs here means the code ran out", () => {
  const r = afterVerify(fail(400, "codeDead"), 0);
  assert.equal(r.kind === "dead" && r.msg.th, "รหัสหมดอายุแล้ว ขอรหัสใหม่");
});

test("afterVerify: network failure is a plain error, boxes stay usable", () => {
  const r = afterVerify({ ok: false, status: 0, error: "net" }, 0);
  assert.equal(r.kind === "err" && r.msg.th, "เชื่อมต่อไม่ได้ ลองอีกครั้ง");
});
