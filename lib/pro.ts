// PeerapoS Pro: Google Play, web card subscriptions and prepaid passes.

import type { ApiResult, Msg, ProInfo, ProSource } from "./api.ts";
import { day } from "./account.ts";
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
const NEED_CONSENT: Msg = { th: "ยอมรับเงื่อนไขก่อนชำระเงิน", en: "Accept the terms before paying." };

export function proBuyError(r: ApiResult<unknown> & { ok: false }): Msg {
  if (r.status === 0) return orderError(r);
  if (r.error === "proActive") {
    const source = SOURCE[r.data?.source as ProSource];
    const until = r.data?.until;
    if (source && typeof until === "string") return {
      th: "มี Pro อยู่แล้วจาก " + source.th + " ถึง " + day(until, "th") + " รอให้หมดอายุแล้วลองอีกครั้ง",
      en: "You already have Pro from " + source.en + " until " + day(until, "en") + ". Wait until it ends, then try again.",
    };
  }
  if (r.error === "passLimit") return PASS_LIMIT;
  if (r.error === "needConsent") return NEED_CONSENT;
  return orderError(r);
}

/** A browser return only polls for confirmed rights; it never grants Pro. */
export function proDonePoll(startedAt: number, now: number, pro: ProInfo | null, before: string | null = null): "done" | "wait" | "late" {
  if (pro && Date.parse(pro.until) > Math.max(now, before ? Date.parse(before) : 0)) return "done";
  return now - startedAt >= 60_000 ? "late" : "wait";
}

export const PRO_COPY = {
  h1: { th: "PeerapoS Pro", en: "PeerapoS Pro" },
  lead: { th: "สมัครครั้งเดียว ใช้ได้กับทุกแอปในบัญชี Google เดียวกัน", en: "Subscribe once. It works on every app in the same Google account." },
  month: { th: "/ เดือน", en: "/ month" },
  year: { th: "/ ปี", en: "/ year" },
  get: { th: "ดาวน์โหลดจาก Google Play", en: "Get it on Google Play" },
  stepsH: { th: "ทำตาม 3 ขั้นตอนนี้", en: "Three steps" },
  steps: [
    { th: "ติดตั้ง PeerapoS Pair จาก Google Play", en: "Install PeerapoS Pair from Google Play." },
    { th: "เข้าสู่ระบบด้วย Google แล้วสมัคร PeerapoS Pro", en: "Sign in with Google, then subscribe to PeerapoS Pro." },
    { th: "บนคอมพิวเตอร์ กด “เชื่อมเครื่องนี้” แล้วเข้าสู่ระบบด้วยบัญชี Google เดียวกัน", en: "On the PC, press “Link this PC” and sign in with the same Google account." },
  ],
  getH: { th: "Pro ให้อะไรบ้าง", en: "What Pro gives you" },
  gets: [
    { th: "ฟีเจอร์ Pro ในแอปฟรีทุกตัว", en: "Pro features in every free app" },
    { th: "ฟีเจอร์ Pro ในแอปแบบซื้อขาดที่คุณเป็นเจ้าของ", en: "Pro features in the paid apps you own" },
    { th: "รีเลย์ ตัวเชื่อม AI และ PeerapoS Pair", en: "Relay, the AI connector and PeerapoS Pair" },
    { th: "สำรองข้อมูลไป Google Drive ของคุณเองในแอปฟรี (แอปแบบซื้อขาดมีให้อยู่แล้ว)", en: "Backup to your own Google Drive in the free apps (paid apps already include it)" },
  ],
  factsH: { th: "ก่อนสมัคร", en: "Before you subscribe" },
  facts: [
    { th: "ใช้ได้กับทุกแอปในบัญชีเดียวกัน ไม่ต้องสมัครซ้ำ", en: "One Pro works on every app in the same account. No need to subscribe again." },
    { th: "ซื้อบนเว็บหรือสมัครใน Pair บน Android", en: "Buy on the website or subscribe in Pair on Android." },
    { th: "ยังไม่มีบน iPhone จะมาทีหลัง", en: "Not on iPhone yet. It comes later." },
  ],
  buyApps: { th: "ซื้อแอปแบบซื้อขาด", en: "Buy paid apps" },
  playH: { th: "ในแอป Pair บน Android", en: "In Pair on Android" },
  webH: { th: "ซื้อบนเว็บ", en: "Buy on the website" },
  monthBuy: { th: "ซื้อแบบรายเดือน", en: "Buy monthly" },
  yearBuy: { th: "ซื้อแบบรายปี", en: "Buy yearly" },
  passBuy: { th: "ซื้อบัตรรายปี", en: "Buy a 1-year pass" },
  card: { th: "บัตร", en: "card" },
  passNote: { th: "PromptPay หรือบัตร ไม่ต่ออายุอัตโนมัติ", en: "PromptPay or card, no auto-renew" },
  renewNote: { th: "ต่ออายุอัตโนมัติ ยกเลิกได้ทุกเมื่อในหน้าบัญชี", en: "Renews automatically; cancel any time from your account" },
  accept: { th: "ฉันยอมรับ", en: "I accept the" },
  retry: { th: "ลองอีกครั้ง", en: "Try again" },
  terms: { th: "ข้อกำหนดการใช้งาน", en: "Terms of use" },
} satisfies Record<string, Msg | Msg[]>;
