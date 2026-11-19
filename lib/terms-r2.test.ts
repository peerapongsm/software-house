import { test } from "node:test";
import assert from "node:assert/strict";
import { legalArticle } from "./legal-test-helper.ts";

for (const lang of ["th", "en"] as const) {
  test(`Terms R2 (${lang}): existing users get notice and control over updates`, () => {
    const { text, html } = legalArticle("terms", lang);
    for (const phrase of lang === "th" ? [
      "ฟีเจอร์อาจเปลี่ยนแปลงหรือย้ายไปอยู่ใน PeerapoS Pro", "มีผลกับผู้ใช้เดิมด้วย",
      "แจ้งล่วงหน้าบนเว็บไซต์และในแอป", "ขอบเขตฟีเจอร์ของ Pro", "เลือกไม่อัปเดตและใช้เวอร์ชันเดิมต่อได้",
      "ปิดการอัปเดตอัตโนมัติแล้วเปิดกลับ", "ติดตั้งเวอร์ชันก่อนหน้า", "ทำต่อให้เสร็จ", "19 พฤศจิกายน 2569",
    ] : [
      "Features may change or move to PeerapoS Pro", "including for existing users",
      "in advance on the website and in the app's What's new", "Changes to the scope of Pro",
      "decline an update and keep your current version", "turn automatic updates off and resume",
      "install an earlier version", "finishable", "19 November 2026",
    ]) assert.ok(text.includes(phrase), phrase);
    assert.match(text, /https:\/\/dl\.peerapongsm\.dev/);
    assert.doesNotMatch(text, /by email to the account|ทางอีเมลของบัญชี/);
    assert.match(html, /inline-block max-w-full/);
  });

  test(`Terms R2 (${lang}): paid-app 14-day refunds and opt-in processor scope`, () => {
    const { text } = legalArticle("terms", lang);
    for (const phrase of lang === "th" ? [
      "ขอคืนเงินเต็มจำนวนได้ภายใน 14 วันนับจากวันที่ซื้อ โดยอีเมลมาที่ contact@peerapongsm.dev", "หลังจากนั้นถือว่าการขายเป็นที่สิ้นสุด",
      "ผู้ประมวลผลข้อมูลให้ร้าน", "รีเลย์ PeerapoS Pair", "ตัวเชื่อม AI", "การสำรองข้อมูลไป Google Drive",
      "ส่งผ่านข้อมูลที่เข้ารหัส เราอ่านเนื้อหาไม่ได้", "ข้อมูลส่วนนั้นไม่ได้เข้ารหัสปลายทาง",
    ] : [
      "request a full refund within 14 days of purchase by emailing contact@peerapongsm.dev", "After 14 days, sales are final",
      "data processor for the shop", "PeerapoS Pair relay", "AI connector", "Google Drive backup",
      "encrypted data whose contents we cannot read", "that traffic is not end-to-end encrypted",
    ]) assert.ok(text.includes(phrase), phrase);
    assert.doesNotMatch(text, /Paid app sales are final\. We do not give refunds/);
  });
}
