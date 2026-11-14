import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

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
  test(`terms (${lang}): website subscriptions disclose renewal, cancellation and prepaid coverage`, () => {
    const text = article("terms", lang);
    assert.match(text, /Stripe/);
    assert.match(text, /PromptPay/);
    assert.match(text, /159/);
    assert.match(text, /1,590/);
    assert.match(text, /\/account/);
    assert.match(text, lang === "th" ? /ต่ออายุอัตโนมัติ/ : /renew automatically/);
    assert.match(text, lang === "th" ? /ไม่คืนเงินตามสัดส่วน/ : /no partial refunds/i);
    assert.match(text, lang === "th" ? /ไม่ต่ออายุอัตโนมัติ/ : /does not auto-renew/);
    assert.match(text, lang === "th" ? /ไม่เกิน 2 ปี/ : /up to 2 years/);
    assert.doesNotMatch(text, /not sold on this website|ไม่ขายบนเว็บไซต์นี้/i);
  });

  test(`terms (${lang}): full refunds and lost disputes revoke rights with the specified PC limits`, () => {
    const text = article("terms", lang);
    assert.match(text, lang === "th" ? /คืนเงินเต็มจำนวน/ : /full refund/i);
    assert.match(text, lang === "th" ? /แพ้ข้อพิพาท/ : /lost card dispute/i);
    assert.match(text, lang === "th" ? /ตรวจสิทธิ์ครั้งถัดไป/ : /next licence check/i);
    assert.match(text, lang === "th" ? /Pro สิ้นสุดทันที/ : /Pro ends immediately/);
    assert.match(text, /14/);
    assert.match(text, /Google Play/);
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

  test(`legal pages (${lang}): account deletion distinguishes card, pass and Play; date is current`, () => {
    for (const page of ["terms", "privacy"]) {
      const text = article(page, lang);
      assert.match(text, lang === "th" ? /ยกเลิกทันที.*ไม่คืนเงิน/ : /cancelled immediately without a refund/);
      assert.match(text, lang === "th" ? /บัตรรายปีที่เหลือจะหายไป/ : /remaining prepaid passes are lost/);
      assert.match(text, lang === "th" ? /ไม่ยกเลิกการสมัครใน Google Play/ : /does NOT cancel a Google Play subscription/);
      assert.match(text, lang === "th" ? /14 พฤศจิกายน 2569/ : /14 November 2026/);
      assert.doesNotMatch(text, /slip|สลิป/i);
    }
  });
}
