// /link page rules: the link code from ?code= or the field, the asking app's name and icon,
// when the PC asked, and what each answer from device request/approve/deny means for the card.

import { APPS } from "../app/apps-data.ts";
import { PAID, type ApiResult, type Msg } from "./api.ts";
import { orderError } from "./buy.ts";

const NOT_CODE = /[^ABCDEFGHJKLMNPQRSTUVWXYZ23456789]/g; // the Worker's alphabet: no 0, O, 1, I
const CODE_RE = /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{8}$/;
const BKK = 7 * 36e5;

/** What the code field shows while typing: upper-case, code letters only, "ABCD-EFGH". */
export function typeCode(s: string): string {
  const c = s.toUpperCase().replace(NOT_CODE, "").slice(0, 8);
  return c.length > 4 ? `${c.slice(0, 4)}-${c.slice(4)}` : c;
}

/** A whole code ("ABCD-EFGH"), or null. Spaces and the dash are optional; anything else makes it no code. */
export function userCode(s: string | null | undefined): string | null {
  const c = (s ?? "").toUpperCase().replace(/[\s-]/g, "");
  return CODE_RE.test(c) ? `${c.slice(0, 4)}-${c.slice(4)}` : null;
}

const capital = (s: string) => s[0].toUpperCase() + s.slice(1);

/** The app that asked: "PeerapoS POS" and its icon. An app this site doesn't list gets no icon. */
export function appInfo(app: string): { name: string; icon: string | null } {
  const free = APPS.find((a) => a.icon === `/apps/${app}.png`);
  if (free) return { name: free.name, icon: free.icon };
  if ((PAID as readonly string[]).includes(app)) return { name: `PeerapoS ${capital(app)}`, icon: `/apps/${app}.png` };
  return { name: "PeerapoS", icon: null };
}

/** "ขอเมื่อ 14:57 · 3 นาทีก่อน". Codes live 10 minutes, so minutes are enough. */
export function askedAt(iso: string, now: number): Msg {
  const t = Date.parse(iso);
  const at = new Date(t + BKK).toISOString().slice(11, 16);
  const min = Math.floor((now - t) / 6e4);
  return min < 1
    ? { th: `ขอเมื่อ ${at} · เมื่อสักครู่`, en: `Asked at ${at} · just now` }
    : { th: `ขอเมื่อ ${at} · ${min} นาทีก่อน`, en: `Asked at ${at} · ${min} min ago` };
}

export type LinkResult =
  | { kind: "ok" }
  | { kind: "out" } // signed out: go to /login and come back
  | { kind: "gone" } // expired, used or unknown code
  | { kind: "full" }
  | { kind: "nothing" }
  | { kind: "err"; msg: Msg };

export function linkResult(r: ApiResult<unknown>): LinkResult {
  if (r.ok) return { kind: "ok" };
  if (r.status === 401) return { kind: "out" };
  if (r.status === 404 || r.status === 400) return { kind: "gone" };
  if (r.error === "full") return { kind: "full" };
  if (r.error === "nothingBought") return { kind: "nothing" };
  return { kind: "err", msg: orderError(r) };
}
