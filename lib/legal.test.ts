import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

test("delete-account: reuses the Terms deletion wording in both languages", () => {
  const terms = readFileSync(new URL("../app/terms/page.tsx", import.meta.url), "utf8");
  const page = readFileSync(new URL("../app/delete-account/page.tsx", import.meta.url), "utf8");
  const deletion = terms.match(/deletion: \{\s*th: ("[^"]+"),\s*en: ("[^"]+"),\s*\}/);
  assert.ok(deletion);
  for (const text of deletion.slice(1)) {
    assert.ok(page.includes(JSON.parse(text)), "deletion warning matches Terms");
  }
});

// Render the real static pages with the installed compiler; node --test cannot load TSX.
function article(page: string, lang: "th" | "en") {
  const source = readFileSync(new URL(`../app/${page}/page.tsx`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports: { default?: React.ComponentType } = {};
  new Function("require", "exports", outputText)(createRequire(import.meta.url), exports);
  const html = renderToStaticMarkup(createElement(exports.default!));
  const match = html.match(new RegExp(`<article lang="${lang}"[^>]*>([\\s\\S]*?)</article>`));
  assert.ok(match, `${page} has a ${lang} article`);
  return match[1].replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'");
}

for (const lang of ["th", "en"] as const) {
  test(`privacy (${lang}): website Google sign-in stays; Pair is a free companion without data collection`, () => {
    const text = article("privacy", lang);
    assert.match(text, lang === "th" ? /Google ส่งรหัสบัญชีที่คงที่ อีเมล และชื่อ/ : /Google sends us the stable account id, email and name/);
    assert.match(text, lang === "th" ? /แอป PeerapoS Pair บน Android เป็นแอปคู่หูฟรี ไม่ต้องเข้าสู่ระบบ ไม่มีการซื้อในแอป และไม่เก็บข้อมูลส่วนบุคคล/ : /PeerapoS Pair Android app is a free companion\. It has no sign-in or purchases and collects no personal data/);
  });

  test(`terms (${lang}): website subscriptions disclose monthly and yearly card renewal and cancellation`, () => {
    const text = article("terms", lang);
    assert.match(text, /Stripe/);
    assert.match(text, /PromptPay/);
    assert.match(text, lang === "th" ? /PeerapoS Pro จำหน่ายบนเว็บไซต์นี้เท่านั้น/ : /PeerapoS Pro is sold only on this website/);
    assert.doesNotMatch(text, /159|1,590|baht|\u0e1a\u0e32\u0e17/i);
    assert.match(text, /\/account/);
    assert.match(text, lang === "th" ? /ต่ออายุอัตโนมัติ/ : /renew automatically/);
    assert.match(text, lang === "th" ? /ไม่คืนเงินตามสัดส่วน/ : /no partial refunds/i);
    assert.match(text, lang === "th" ? /รายเดือน.*รายปี/ : /monthly.*yearly/);
    assert.doesNotMatch(text, /\b(?:prepaid|1-year|annual) pass(?:es)?\b|จ่ายครั้งเดียว|Pro 1 ปี|2 years|2 ปี/i);
    assert.doesNotMatch(text, /not sold on this website|ไม่ขายบนเว็บไซต์นี้/i);
  });

  test(`terms (${lang}): full refunds and lost disputes revoke rights with the specified PC limits`, () => {
    const text = article("terms", lang);
    assert.match(text, lang === "th" ? /คืนเงินเต็มจำนวน/ : /full refund/i);
    assert.match(text, lang === "th" ? /แพ้ข้อพิพาท/ : /lost card dispute/i);
    assert.match(text, lang === "th" ? /ตรวจสิทธิ์ครั้งถัดไป/ : /next licence check/i);
    assert.match(text, lang === "th" ? /Pro สิ้นสุดทันที/ : /Pro ends immediately/);
    assert.match(text, /14/);
    assert.doesNotMatch(text, /Google Play|play\.google\.com/);
  });

  test(`privacy (${lang}): Stripe receives checkout data and retains its own payment records`, () => {
    const text = article("privacy", lang);
    assert.match(text, /Stripe Payments Singapore/);
    assert.match(text, /Stripe, Inc\./);
    assert.match(text, /metadata/);
    assert.match(text, lang === "th" ? /อีเมล/ : /email/);
    assert.match(text, lang === "th" ? /ไม่เห็นหมายเลขบัตร/ : /never see card numbers/);
    assert.match(text, lang === "th" ? /ระยะเวลาเก็บข้อมูลของ Stripe/ : /Stripe's retention policy/);
    assert.doesNotMatch(text, /slip|สลิป/i);
  });

  test(`legal pages (${lang}): account deletion covers website card subscriptions; date is current`, () => {
    for (const page of ["terms", "privacy"]) {
      const text = article(page, lang);
      assert.match(text, lang === "th" ? /ยกเลิกทันที.*ไม่คืนเงิน/ : /cancelled immediately without a refund/);
      assert.doesNotMatch(text, /prepaid pass|Pro 1 ปี/);
      assert.doesNotMatch(text, /Google Play|Play purchase|Play records|บน Play/);
      assert.match(text, lang === "th" ? /14 พฤศจิกายน 2569/ : /14 November 2026/);
      assert.doesNotMatch(text, /slip|สลิป/i);
    }
  });
}

test("Pro pages, metadata and deletion confirmation have no Play purchase, management, trial or purchase-data wording in either language", () => {
  for (const path of [
    "app/account/page.tsx", "app/delete-account/page.tsx", "app/delete-account/layout.tsx",
    "app/terms/page.tsx", "app/privacy/page.tsx", "app/pro/page.tsx", "lib/pro.ts",
    "components/account/DeleteAccount.tsx",
  ]) {
    const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /Google Play|PLAY_(?:SUBS_)?URL|play\.google\.com|Play purchase|Play records|บน Play/i, path);
    assert.doesNotMatch(source, /subscribe in Pair|สมัคร.{0,20}(?:ในแอป|ผ่านแอป) PeerapoS Pair/i, path);
  }
});
