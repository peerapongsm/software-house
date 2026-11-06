// /buy page rules (paid apps only): the starting pick from the query, the order body, and which
// step an order shows. Copy for the one error line in the order box.

import type { ApiResult, Catalogue, Licence, Msg } from "./api.ts";
import type { Line } from "./cart.ts";

const ORDER_RE = /^O-[0-9A-HJKMNP-TV-Z]{10}$/;
export const SLIP_MAX = 2 * 1024 * 1024;
const SLIP_TYPES = ["image/jpeg", "image/png", "image/webp"];

const NET: Msg = { th: "เชื่อมต่อไม่ได้ ลองอีกครั้ง", en: "Can't connect. Try again." };
const OOPS: Msg = { th: "มีบางอย่างผิดพลาด ลองอีกครั้ง", en: "Something went wrong. Try again." };
const BIG: Msg = { th: "รูปใหญ่เกิน 2 MB ใช้รูปสลิปจากแอปธนาคาร", en: "The image is over 2 MB. Use the slip saved by your bank app." };
const TYPE: Msg = { th: "ใช้รูป JPG PNG หรือ WebP", en: "Use a JPG, PNG or WebP image." };

/** The order in ?order= (phone-upload link), if it looks like one. */
export function orderId(q: URLSearchParams): string | null {
  const id = q.get("order");
  return id && ORDER_RE.test(id) ? id : null;
}

/** Old ?max and ?pro links: Pro is not sold on the website, so they land on /pro. */
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

export type PayStep = "pay" | "done" | "review" | "closed";

export function payStep(status: string): PayStep {
  if (status === "open" || status === "expired") return "pay";
  if (status === "paid") return "done";
  if (status === "review" || status === "issuing") return "review";
  return "closed";
}

export function slipError(f: { size: number; type: string }): Msg | null {
  if (!SLIP_TYPES.includes(f.type)) return TYPE;
  return f.size > SLIP_MAX ? BIG : null;
}

/** Only what is on sale gets a card. */
export function forSale(cat: Catalogue): Catalogue {
  const on = new Set(cat.onSale);
  return { ...cat, apps: cat.apps.filter((a) => on.has(a.id)) };
}

export const orderError = (r: ApiResult<unknown> & { ok: false }): Msg => (r.status === 0 ? NET : (r.message ?? OOPS));
