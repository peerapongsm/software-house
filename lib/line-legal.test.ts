import { test } from "node:test";
import assert from "node:assert/strict";
import { legalArticle } from "./legal-test-helper.ts";

// LINE connector wording follows the relay code after review round 3: per-event extracts (never chat text) sealed to
// the PC, link rows 7 days, opt-outs 90 days, chat live only, mixed letter+digit codes, unread removed hooks.
for (const lang of ["th", "en"] as const) {
  test(`Privacy LINE (${lang}): retention, sealing, live-only chat and the shop's own OA`, () => {
    const { text } = legalArticle("privacy", lang);
    for (const phrase of lang === "th" ? [
      "ตัวเชื่อม LINE ของร้าน", "ปิดเป็นค่าเริ่มต้น", "ในแอปฟรีต้องมี Pro", "อยู่ในเครื่องหลักของร้านเท่านั้น",
      "relay.peerapongsm.dev", "ไม่เกิน 7 วัน", "ไม่เกิน 90 วัน", "ส่งต่อถึงเครื่องร้านทันทีเท่านั้น ไม่เก็บไว้",
      "ตรงถึง LINE ไม่ผ่านเรา", "มีแค่เครื่องนั้นที่เปิดอ่านได้", "ไม่เก็บข้อความที่ลูกค้าพิมพ์", "ปนทั้งตัวอักษรและตัวเลข",
      "ไม่นับและไม่ถูกเก็บ", "LINE รับข้อความยืนยัน", "ลองใหม่ทุกนาที", "เก็บไว้แค่โทเคน", "เราไม่อ่านและไม่เก็บ",
      "ยกเลิก LINE", "หรือ STOP", "LINE userId", "ผู้ประมวลผลให้ร้าน",
    ] : [
      "A shop's LINE connector", "off by default", "Free apps need Pro", "stay only on the shop's main PC",
      "relay.peerapongsm.dev", "at most 7 days", "at most 90 days", "live only and never kept",
      "straight to LINE, not through us", "Only that PC can open it", "The text the customer typed is not kept",
      "always mix letters and digits", "do not and are not kept", "once LINE accepts a confirmation message", "retries every minute",
      "keeps only the token", "neither read nor kept by us",
      "ยกเลิก LINE", "or STOP", "LINE userId", "we are its data processor",
    ]) assert.ok(text.includes(phrase), phrase);
    // disclosures that the round-3 relay fixes made untrue
    assert.doesNotMatch(text, /ข้อความทั้งชุด|ถูกเก็บแบบเข้ารหัสไปด้วย|ตัวอักษรหรือตัวเลข 6 ตัว|ทิ้งโดยไม่คัด|หมดอายุตามเวลาข้างบน/);
    assert.doesNotMatch(text, /whole delivery|kept encrypted along with it|6 letters or digits|without being sorted|expire on the schedule above/);
  });

  test(`Terms LINE (${lang}): controller, processor, cross-border and no messages from us`, () => {
    const { text } = legalArticle("terms", lang);
    for (const phrase of lang === "th" ? [
      "ตัวเชื่อม LINE", "ไม่ว่าทางใด รวมถึงทาง LINE", "Channel access token ของร้านเอง",
      "ร้านเป็นผู้ควบคุมข้อมูลของลูกค้าที่เชื่อม LINE", "เราเป็นผู้ประมวลผลข้อมูลให้ร้าน", "Cloudflare ซึ่งอาจอยู่นอกประเทศไทย", "นับในโควตาข้อความของร้าน",
    ] : [
      "the LINE connector", "by any channel, LINE included", "the shop's own LINE Official Account and Channel access token",
      "The shop is the data controller for its customers who link their LINE", "the shop's data processor",
      "Cloudflare servers, which may be outside Thailand", "counts against the shop's message quota",
    ]) assert.ok(text.includes(phrase), phrase);
  });
}

test("LINE legal copy has no Thai full stops", () => {
  for (const page of ["privacy", "terms"] as const) {
    assert.doesNotMatch(legalArticle(page, "th").text, /[฀-๿]\.(\s|$)/);
  }
});
