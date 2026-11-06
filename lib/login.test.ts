import { test } from "node:test";
import assert from "node:assert/strict";
import { clientIdError, GOOGLE_SCRIPT, googleError, SCRIPT_FAILED } from "./login.ts";

const fail = (status: number, error: string, message?: { th: string; en: string }) =>
  ({ ok: false, status, error, message, data: { ok: false, error } }) as const;

test("the Google Identity Services script is Google's own URL", () => {
  assert.equal(GOOGLE_SCRIPT, "https://accounts.google.com/gsi/client");
});

test("googleError: no connection says to try again", () => {
  assert.deepEqual(googleError({ ok: false, status: 0, error: "net" }), {
    th: "เชื่อมต่อไม่ได้ ลองอีกครั้ง",
    en: "Can't connect. Try again.",
  });
});

test("googleError: rate limit says to wait a moment", () => {
  assert.deepEqual(googleError(fail(429, "rateLimited")), {
    th: "ลองถี่เกินไป รอสักครู่แล้วลองใหม่",
    en: "Too many tries. Wait a moment and try again.",
  });
});

test("googleError: every refused Google token says so, and what to do", () => {
  const refused = {
    th: "Google ปฏิเสธการเข้าสู่ระบบนี้ ลองใหม่ หรือใช้บัญชี Google อื่น",
    en: "Google refused this sign-in. Try again, or use another Google account.",
  };
  for (const e of ["malformed", "alg", "kid", "signature", "iss", "aud", "expired", "unverified"]) {
    assert.deepEqual(googleError(fail(401, e)), refused, e);
  }
});

test("googleError: signed out of Google says to sign in to Google again", () => {
  assert.deepEqual(googleError(fail(401, "signedOut")), {
    th: "ถ้ายังไม่ได้เข้าสู่ระบบ Google ในเบราว์เซอร์นี้ ให้เข้าก่อนแล้วลองอีกครั้ง",
    en: "You are signed out of Google here. Sign in to Google, then try again.",
  });
});

test("googleError: anything else is a plain try-again", () => {
  const oops = { th: "มีบางอย่างผิดพลาด ลองอีกครั้ง", en: "Something went wrong. Try again." };
  assert.deepEqual(googleError(fail(400, "badRequest")), oops);
  assert.deepEqual(googleError(fail(403, "badOrigin")), oops);
  assert.deepEqual(googleError(fail(500, "server")), oops);
});

test("clientIdError: no client id stops the button with one clear line", () => {
  assert.equal(clientIdError("1234-abc.apps.googleusercontent.com"), null);
  for (const id of [undefined, "", "   "]) {
    const m = clientIdError(id);
    assert.ok(m, String(id));
    assert.match(m.en, /not set up/i);
  }
});

test("SCRIPT_FAILED: the Google button did not load, and what to do", () => {
  assert.deepEqual(SCRIPT_FAILED, {
    th: "โหลดปุ่ม Google ไม่ได้ ลองปิดตัวบล็อกโฆษณาแล้วโหลดหน้าใหม่",
    en: "Could not load the Google button. Turn off the blocker and reload.",
  });
});

test("Thai copy keeps out polite particles", () => {
  const samples = [
    googleError({ ok: false, status: 0, error: "net" }),
    googleError(fail(429, "rateLimited")),
    googleError(fail(401, "expired")),
    googleError(fail(401, "signedOut")),
    googleError(fail(500, "server")),
    clientIdError(undefined) as { th: string; en: string },
    SCRIPT_FAILED,
  ];
  for (const m of samples) assert.doesNotMatch(m.th, /ครับ|ค่ะ|นะ|คะ/, m.th);
});
