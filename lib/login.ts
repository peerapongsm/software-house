// What /login does with each answer from login/start and login/verify. Copy for the one red line.

import type { ApiResult, Msg } from "./api.ts";

export const RESEND_S = 60;

const NET: Msg = { th: "เชื่อมต่อไม่ได้ ลองอีกครั้ง", en: "Can't connect. Try again." };
const OOPS: Msg = { th: "มีบางอย่างผิดพลาด ลองอีกครั้ง", en: "Something went wrong. Try again." };
const QUOTA: Msg = { th: "ส่งรหัสไม่ได้ตอนนี้ ลองใหม่พรุ่งนี้", en: "Can't send a code right now. Try again tomorrow." };
const DEAD3: Msg = { th: "รหัสไม่ถูกต้อง 3 ครั้งแล้ว ขอรหัสใหม่", en: "Wrong code 3 times. Get a new code." };
const EXPIRED: Msg = { th: "รหัสหมดอายุแล้ว ขอรหัสใหม่", en: "This code has expired. Get a new code." };
const wrong = (n: number): Msg => ({
  th: `รหัสไม่ถูกต้อง เหลืออีก ${n} ครั้ง`,
  en: `Wrong code. ${n} ${n === 1 ? "try" : "tries"} left.`,
});

const errMsg = (r: ApiResult<unknown> & { ok: false }): Msg => (r.status === 0 ? NET : (r.message ?? OOPS));

/** Seconds as M:SS for the resend countdown. */
export const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** `wait`: no new code (sent less than a minute ago), the earlier one still works. */
export type Started = { kind: "sent"; wait: number } | { kind: "wait"; wait: number } | { kind: "err"; msg: Msg };

export function afterStart(r: ApiResult<unknown>): Started {
  if (r.ok) return { kind: "sent", wait: RESEND_S };
  if (r.error === "tooSoon") {
    const s = Number(r.data?.retryIn);
    return { kind: "wait", wait: s > 0 ? Math.ceil(s) : RESEND_S };
  }
  if (r.error === "mailQuota") return { kind: "err", msg: QUOTA };
  return { kind: "err", msg: errMsg(r) };
}

export type Verified = { kind: "ok" } | { kind: "wrong"; left: number; msg: Msg } | { kind: "dead"; msg: Msg } | { kind: "err"; msg: Msg };

/** `wrongs`: wrong answers already seen for this code, so a dead code after three reads as "3 times", else as expired. */
export function afterVerify(r: ApiResult<unknown>, wrongs: number): Verified {
  if (r.ok) return { kind: "ok" };
  if (r.error === "wrongCode") {
    const left = Number(r.data?.left ?? 0);
    return left > 0 ? { kind: "wrong", left, msg: wrong(left) } : { kind: "dead", msg: DEAD3 };
  }
  if (r.error === "codeDead") return { kind: "dead", msg: wrongs >= 2 ? DEAD3 : EXPIRED };
  return { kind: "err", msg: errMsg(r) };
}
