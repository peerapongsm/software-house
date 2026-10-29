// /buy page rules: the starting pick from the query, what the account may still buy,
// the order body, and which step an order shows. Copy for the one error line in the order box.

import type { ApiResult, Catalogue, Licence, Msg } from "./api.ts";
import type { Line, Selection } from "./cart.ts";

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

/** Max still running: Pro can't be bought and the Max add-on is hidden. */
export const maxActive = (lic: Licence | null, now: number) => lic?.tier?.t === "max" && Date.parse(lic.tier.until) > now;

/** First pick from ?renew / ?app / ?max. `renewFrom`: the date a renewal extends from, when it is still ahead. */
export function startSel(q: URLSearchParams, lic: Licence | null, now: number): { sel: Selection; renewFrom: string | null } {
  const tier = lic?.tier ?? null;
  const renew = q.has("renew") && tier !== null;
  const pick: Selection["tier"] = renew ? tier.t : q.has("max") || maxActive(lic, now) ? "max" : "pro";
  return {
    sel: { kind: q.has("app") && !renew ? "app" : "tier", tier: pick, period: "m", apps: [], addMax: false },
    renewFrom: renew && Date.parse(tier.until) > now ? tier.until : null,
  };
}

/** POST /api/order items. */
export const orderItems = (lines: Line[]) => lines.map((l) => (l.months ? { id: l.id, months: l.months } : { id: l.id }));

/** Annual price shown per month, in satang. */
export const perMonth = (annual: number) => Math.round(annual / 12);

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
  return { ...cat, tiers: cat.tiers.filter((t) => on.has(t.id)), apps: cat.apps.filter((a) => on.has(a.id)) };
}

export const orderError = (r: ApiResult<unknown> & { ok: false }): Msg => (r.status === 0 ? NET : (r.message ?? OOPS));
