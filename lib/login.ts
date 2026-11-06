// What /login shows for Google sign-in: the one red line for a failed POST /api/login/google,
// for a missing client id, and for a Google button script that did not load.

import type { ApiResult, Msg } from "./api.ts";

export const GOOGLE_SCRIPT = "https://accounts.google.com/gsi/client";

const NET: Msg = { th: "เชื่อมต่อไม่ได้ ลองอีกครั้ง", en: "Can't connect. Try again." };
const OOPS: Msg = { th: "มีบางอย่างผิดพลาด ลองอีกครั้ง", en: "Something went wrong. Try again." };
const RATE: Msg = { th: "ลองหลายครั้งเกินไป รอสักครู่แล้วลองใหม่", en: "Too many tries. Wait a moment and try again." };
const REFUSED: Msg = {
  th: "Google ไม่ยอมรับการเข้าสู่ระบบนี้ ลองใหม่ หรือใช้บัญชี Google อื่น",
  en: "Google refused this sign-in. Try again, or use another Google account.",
};
const SIGNED_OUT: Msg = {
  th: "ถ้ายังไม่ได้เข้า Google ในเบราว์เซอร์นี้ ให้เข้า Google ก่อนแล้วลองอีกครั้ง",
  en: "You are signed out of Google here. Sign in to Google, then try again.",
};
const NO_CLIENT: Msg = {
  th: "ระบบเข้าสู่ระบบยังไม่พร้อม ลองใหม่ภายหลัง",
  en: "Sign-in is not set up yet on this site. Try again later.",
};

/** The Google button script did not load (blocked, offline). */
export const SCRIPT_FAILED: Msg = {
  th: "ถ้าโหลดปุ่ม Google ไม่ได้ ให้ปิดตัวบล็อกโฆษณาแล้วโหลดหน้าใหม่",
  en: "Could not load the Google button. Turn off the blocker and reload.",
};

/** What a failed POST /api/login/google says. Every refused token comes back 401, so one line covers them all. */
export function googleError(r: Extract<ApiResult<unknown>, { ok: false }>): Msg {
  if (r.status === 0) return NET;
  if (r.status === 429 || r.error === "rateLimited") return RATE;
  if (r.status === 401 && r.error === "signedOut") return SIGNED_OUT;
  if (r.status === 401) return REFUSED;
  return OOPS;
}

/** A missing or blank NEXT_PUBLIC_GOOGLE_CLIENT_ID: the page shows this line and no button. */
export const clientIdError = (id: string | undefined): Msg | null => (id?.trim() ? null : NO_CLIENT);
