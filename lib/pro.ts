// PeerapoS Pro: website-only card subscriptions; legacy coverage remains displayable.

import type { ApiResult, Msg, ProInfo, ProSource } from "./api.ts";
import { day } from "./account.ts";
import { orderError } from "./buy.ts";

/** Satang, shown on /pro. */
export const PRO_PRICE = { monthly: 29900, annual: 299000 };

export type ProPlan = "month" | "year";

export function proActive(pro: ProInfo | null, now: number): boolean {
  return pro !== null && Date.parse(pro.until) > now;
}

export const PRO_SOURCE_LABEL: Record<ProSource, Msg> = {
  play: { th: "สิทธิ์เดิม", en: "Legacy Pro" },
  stripe: { th: "สมัครผ่านบัตร", en: "Card subscription" },
  pass: { th: "สิทธิ์ Pro เดิม", en: "Legacy Pro coverage" },
};

const SOURCE: Record<ProSource, Msg> = {
  play: { th: "สิทธิ์เดิม", en: "legacy coverage" },
  stripe: { th: "การสมัครผ่านบัตร", en: "card" },
  pass: { th: "สิทธิ์ Pro เดิม", en: "legacy coverage" },
};
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
  if (r.error === "proOff") return PRO_COPY.opensSoon;
  if (r.error === "needConsent") return NEED_CONSENT;
  return orderError(r);
}

/** A browser return only polls for confirmed rights; it never grants Pro. */
export function proDonePoll(startedAt: number, now: number, pro: ProInfo | null, before: string | null = null): "done" | "wait" | "late" {
  if (pro && Date.parse(pro.until) > Math.max(now, before ? Date.parse(before) : 0)) return "done";
  return now - startedAt >= 60_000 ? "late" : "wait";
}

export const PRO_COPY = {
  opensSoon: { th: "PeerapoS Pro เปิดให้สมัครเร็ว ๆ นี้", en: "PeerapoS Pro opens soon" },
  h1: { th: "PeerapoS Pro", en: "PeerapoS Pro" },
  updated: { th: "อัปเดตล่าสุด 17 พฤศจิกายน 2569", en: "Last updated 17 November 2026" },
  existing: { th: "งานที่สร้างไว้แล้วยังเปิดดู ทำต่อให้เสร็จ ยกเลิก พิมพ์ และส่งออกได้ ข้อมูลที่บันทึกไว้ก็ยังเห็นอยู่ แต่ถ้าจะเริ่มงานใหม่หรือออกรายงานด้วยฟีเจอร์ Pro ต้องมี Pro", en: "Existing records stay viewable, finishable, cancellable, printable and exportable. Saved data remains visible. Starting new work or producing reports with Pro features needs Pro." },
  lead: { th: "สมัครครั้งเดียว ใช้ได้กับทุกแอปในบัญชี Google เดียวกัน", en: "Subscribe once. It works on every app in the same Google account." },
  month: { th: "/ เดือน", en: "/ month" },
  year: { th: "/ ปี", en: "/ year" },
  stepsH: { th: "เริ่มใช้ Pro", en: "Start using Pro" },
  steps: [
    { th: "ซื้อบนหน้านี้", en: "Buy on this page." },
    { th: "บนคอมพิวเตอร์ กด “เชื่อมเครื่องนี้” แล้วเข้าสู่ระบบด้วยบัญชี Google เดียวกับตอนซื้อ", en: "On the PC, press “Link this PC” and sign in with the Google account you bought with." },
  ],
  getH: { th: "Pro ให้อะไรบ้าง", en: "What Pro gives you" },
  gets: [
    { th: "ฟีเจอร์ Pro ในแอปฟรีทุกตัว", en: "Pro features in every free app" },
    { th: "ฟีเจอร์ Pro ในแอปแบบซื้อขาดที่คุณเป็นเจ้าของ", en: "Pro features in the paid apps you own" },
    { th: "เชื่อมอุปกรณ์รวมสูงสุด 20 เครื่อง ทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์เครื่องอื่นในร้าน ไม่รวมเครื่องหลัก คอมพิวเตอร์เครื่องอื่นใช้ผ่าน LAN", en: "Connect up to 20 devices in total: phones, tablets and other PCs in the shop, excluding the host PC. Other PCs connect over LAN." },
    { th: "ใช้ PeerapoS Pair จากนอกร้าน", en: "Use PeerapoS Pair away from the shop" },
    { th: "ตัวเชื่อม AI ในทุกแอป", en: "The AI connector in every app" },
    { th: "สำรองข้อมูลไป Google Drive ของคุณเองในแอปฟรี (แอปแบบซื้อขาดมีให้อยู่แล้ว)", en: "Backup to your own Google Drive in the free apps (paid apps already include it)" },
  ],
  factsH: { th: "ก่อนสมัคร", en: "Before you subscribe" },
  facts: [
    { th: "ใช้ได้กับทุกแอปในบัญชีเดียวกัน ไม่ต้องสมัครซ้ำ", en: "One Pro works on every app in the same account. No need to subscribe again." },
    { th: "ซื้อได้บนเว็บไซต์นี้เท่านั้น", en: "Pro is sold only on this website." },
    { th: "ยังไม่มีบน iPhone จะมาทีหลัง", en: "Not on iPhone yet. It comes later." },
  ],
  buyApps: { th: "ซื้อแอปแบบซื้อขาด", en: "Buy paid apps" },
  webH: { th: "ซื้อบนเว็บ", en: "Buy on the website" },
  activeH: { th: "คุณมี Pro อยู่แล้ว", en: "You already have Pro" },
  activeUntil: { th: "ใช้ได้ถึง {date}", en: "Valid until {date}" },
  cancelled: { th: " ยกเลิกแล้ว ไม่ต่ออายุ", en: ", cancelled, won't renew" },
  account: { th: "ดูหรือจัดการในหน้าบัญชี", en: "View or manage on My account" },
  monthBuy: { th: "รายเดือน", en: "Monthly" },
  yearBuy: { th: "รายปี", en: "Yearly" },
  monthNote: { th: "สมัครผ่านบัตร ต่ออายุทุกเดือน", en: "Card subscription, renews monthly" },
  yearNote: { th: "สมัครผ่านบัตร ต่ออายุทุกปี", en: "Card subscription, renews yearly" },
  renewNote: { th: "สมัครผ่านบัตรแล้ว ยกเลิกได้ทุกเมื่อในหน้าบัญชี", en: "Cancel a card subscription any time from your account." },
  accept: { th: "ฉันยอมรับ", en: "I accept the" },
  retry: { th: "ลองอีกครั้ง", en: "Try again" },
  terms: { th: "ข้อกำหนดการใช้งาน", en: "Terms of use" },
} satisfies Record<string, Msg | Msg[]>;
