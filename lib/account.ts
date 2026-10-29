// /account page rules: the plan pill, dates in Bangkok time, "last used" for a linked PC,
// and which owned apps get a download row.

import { PAID, type Licence, type Msg, type PaidApp } from "./api.ts";
import type { Lang } from "./lang.ts";
import type { PlanStatus } from "./status.ts";

const DAY = 864e5;
const BKK = 7 * 36e5;

/** GET /api/account. */
export type Device = { id: string; pc: string; app: string; lastSeen: string | null; rank: number; over: boolean };
export type AccountData = { email: string; licence: Licence | null; devices: Device[]; limit: number };

export function pillText(s: PlanStatus): Msg {
  if (s.kind === "active") return { th: "ใช้งานอยู่", en: "Active" };
  if (s.kind === "soon") return { th: `เหลือ ${s.days} วัน`, en: `${s.days} ${s.days === 1 ? "day" : "days"} left` };
  if (s.kind === "grace") return { th: `หมดอายุ ใช้ต่อได้อีก ${s.days} วัน`, en: `Expired, ${s.days} ${s.days === 1 ? "day" : "days"} of grace left` };
  return { th: "หมดอายุแล้ว", en: "Expired" };
}

/** "12 พ.ย. 2569" / "12 Nov 2026". */
export const day = (iso: string, lang: Lang) =>
  new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", { timeZone: "Asia/Bangkok", day: "numeric", month: "short", year: "numeric" });

const bkkDay = (t: number) => Math.floor((t + BKK) / DAY);
const hhmm = (t: number) => new Date(t + BKK).toISOString().slice(11, 16);

/** When a linked PC last checked in: today/yesterday with the time, then days ago, then a date. */
export function lastUsed(iso: string | null, now: number): Msg {
  if (!iso) return { th: "ยังไม่ได้ใช้", en: "Not used yet" };
  const t = Date.parse(iso);
  const ago = bkkDay(now) - bkkDay(t);
  const when: Msg =
    ago <= 0 ? { th: `วันนี้ ${hhmm(t)}`, en: `today ${hhmm(t)}` }
    : ago === 1 ? { th: `เมื่อวาน ${hhmm(t)}`, en: `yesterday ${hhmm(t)}` }
    : ago <= 30 ? { th: `${ago} วันก่อน`, en: `${ago} days ago` }
    : { th: day(iso, "th"), en: day(iso, "en") };
  return { th: `ใช้ล่าสุด ${when.th}`, en: `Last used ${when.en}` };
}

/** Owned apps that have a download, in catalogue order. */
export const ownedPaid = (apps: string[]): PaidApp[] => PAID.filter((p) => apps.includes(p));
