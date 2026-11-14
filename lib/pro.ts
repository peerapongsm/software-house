// PeerapoS Pro: Google Play, web card subscriptions and prepaid passes.

import type { ApiResult, Msg, ProInfo, ProSource } from "./api.ts";
import { orderError } from "./buy.ts";

/** PeerapoS Pair on Google Play. */
export const PLAY_URL = "https://play.google.com/store/apps/details?id=dev.peerapongsm.pair";

/** Where a subscriber cancels or changes Pro (Google Play). */
export const PLAY_SUBS_URL = "https://play.google.com/store/account/subscriptions";

/** Satang, shown on /pro. */
export const PRO_PRICE = { monthly: 15900, annual: 159000 };

export const PRO_PASS = 159000;
export type ProPlan = "month" | "year" | "pass";

const SOURCE: Record<ProSource, Msg> = {
  play: { th: "Google Play", en: "Google Play" },
  stripe: { th: "บัตร", en: "card" },
  pass: { th: "บัตรรายปี", en: "prepaid pass" },
};
const PASS_LIMIT: Msg = { th: "ซื้อบัตรล่วงหน้าได้ไม่เกิน 2 ปี รอให้ใกล้หมดอายุแล้วลองอีกครั้ง", en: "Passes cover up to 2 years ahead. Try again closer to expiry." };
const SALES_OFF: Msg = { th: "ปิดรับชำระเงินชั่วคราว ลองใหม่ภายหลัง", en: "Sales are temporarily closed. Try later." };
const NEED_CONSENT: Msg = { th: "ยอมรับเงื่อนไขก่อนชำระเงิน", en: "Accept the terms before paying." };

export function proBuyError(r: ApiResult<unknown> & { ok: false }): Msg {
  if (r.status === 0) return orderError(r);
  if (r.error === "proActive") {
    const source = SOURCE[r.data?.source as ProSource];
    const until = r.data?.until;
    if (source && typeof until === "string") return {
      th: "มี Pro อยู่แล้วจาก " + source.th + " ถึง " + until + " รอให้หมดอายุแล้วลองอีกครั้ง",
      en: "You already have Pro from " + source.en + " until " + until + ". Wait until it ends, then try again.",
    };
  }
  if (r.error === "passLimit") return PASS_LIMIT;
  if (r.error === "salesOff") return SALES_OFF;
  if (r.error === "needConsent") return NEED_CONSENT;
  return orderError(r);
}

/** A browser return only polls for confirmed rights; it never grants Pro. */
export function proDonePoll(startedAt: number, now: number, pro: ProInfo | null): "done" | "wait" | "late" {
  if (pro && Date.parse(pro.until) > now) return "done";
  return now - startedAt >= 60_000 ? "late" : "wait";
}
