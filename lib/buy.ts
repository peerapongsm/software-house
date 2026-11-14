// /buy page rules (paid apps only): the starting pick from the query, the order body, and which
// step an order shows. Copy for the one error line in the order box.

import { safeStripeUrl, type ApiResult, type Catalogue, type Licence, type Msg } from "./api.ts";
import type { Line } from "./cart.ts";

export function checkoutNext(data: { url?: unknown; status?: string; orderId?: string }):
  | { kind: "go"; url: string }
  | { kind: "confirming"; orderId: string | null }
  | { kind: "error" } {
  const url = safeStripeUrl(data.url);
  if (url) return { kind: "go", url };
  if (data.status === "confirming") return { kind: "confirming", orderId: data.orderId ?? null };
  return { kind: "error" };
}

const ORDER_RE = /^O-[0-9A-HJKMNP-TV-Z]{10}$/;

const NET: Msg = { th: "เชื่อมต่อไม่ได้ ลองอีกครั้ง", en: "Can't connect. Try again." };
const OOPS: Msg = { th: "มีบางอย่างผิดพลาด ลองอีกครั้ง", en: "Something went wrong. Try again." };
const ORDER_ERRORS: ReadonlyMap<string, Msg> = new Map([
  ["tooManyOrders", { th: "มีคำสั่งซื้อที่ยังไม่ชำระหลายรายการ ชำระรายการเดิมก่อน หรือรอ 1 วันให้หมดอายุ", en: "You have several unpaid orders. Pay one of them or wait a day." }],
  ["payDown", { th: "ระบบชำระเงินขัดข้อง ลองใหม่ในอีกไม่กี่นาที", en: "Payments are down. Try again in a few minutes." }],
  ["salesOff", { th: "ยังไม่เปิดขายตอนนี้", en: "Sales are closed right now." }],
]);

/** The order in ?order= (phone-upload link), if it looks like one. */
export function orderId(q: URLSearchParams): string | null {
  const id = q.get("order");
  return id && ORDER_RE.test(id) ? id : null;
}

/** Old ?max and ?pro links land on /pro. */
export const proRedirect = (q: URLSearchParams): string | null => (q.has("max") || q.has("pro") ? "/pro" : null);

/** First pick from ?app=<id>: that app, if it can be bought now and the account does not own it yet. */
export function startPick(q: URLSearchParams, cat: Catalogue, lic: Licence | null): string[] {
  const id = q.get("app");
  if (!id || lic?.apps.includes(id) || !cat.apps.some((a) => a.id === id)) return [];
  return [id];
}

/** POST /api/order items: the app ids only, the Worker prices them. */
export const orderItems = (lines: Line[]) => lines.map((l) => ({ id: l.id }));

/** Amount to transfer, exact to the satang ("159.37"). */
export const exact = (satang: number) => (satang / 100).toFixed(2);

export type PayStep = "pay" | "waiting" | "done" | "review" | "cancelled" | "closed";

export function payStep(status: string, cancelled: boolean): PayStep {
  if (status === "open") return cancelled ? "cancelled" : "waiting";
  if (status === "expired") return "pay";
  if (status === "paid") return "done";
  if (status === "review" || status === "issuing") return "review";
  return "closed";
}

/** Only what is on sale gets a card. */
export function forSale(cat: Catalogue): Catalogue {
  const on = new Set(cat.onSale);
  return { ...cat, apps: cat.apps.filter((a) => on.has(a.id)) };
}

export const orderError = (r: ApiResult<unknown> & { ok: false }): Msg => (r.status === 0 ? NET : (ORDER_ERRORS.get(r.error) ?? r.message ?? OOPS));
