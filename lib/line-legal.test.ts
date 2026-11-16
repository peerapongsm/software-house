import { test } from "node:test";
import assert from "node:assert/strict";
import { legalArticle } from "./legal-test-helper.ts";

// LINE connector wording follows the relay code: link rows 7 days, opt-outs 90 days, chat live only, sealed to the PC.
for (const lang of ["th", "en"] as const) {
  test(`Privacy LINE (${lang}): retention, sealing, live-only chat and the shop's own OA`, () => {
    const { text } = legalArticle("privacy", lang);
    for (const phrase of lang === "th" ? [
      "ตัวเชื่อม LINE ของร้าน", "ปิดเป็นค่าเริ่มต้น", "ในแอปฟรีต้องมี Pro", "อยู่ในเครื่องหลักของร้านเท่านั้น",
      "relay.peerapongsm.dev", "ไม่เกิน 7 วัน", "ไม่เกิน 90 วัน", "ส่งต่อถึงเครื่องร้านทันทีเท่านั้น ไม่เก็บไว้",
      "ตรงถึง LINE ไม่ผ่านเรา", "มีแค่เครื่องนั้นที่เปิดอ่านได้", "ข้อความทั้งชุดที่ LINE ส่งมา",
      "ยกเลิก LINE", "หรือ STOP", "LINE userId", "ทิ้งโดยไม่คัดและไม่เก็บ", "ผู้ประมวลผลให้ร้าน",
    ] : [
      "A shop's LINE connector", "off by default", "Free apps need Pro", "stay only on the shop's main PC",
      "relay.peerapongsm.dev", "at most 7 days", "at most 90 days", "live only and never kept",
      "straight to LINE, not through us", "Only that PC can open it", "the whole delivery LINE sent",
      "ยกเลิก LINE", "or STOP", "LINE userId", "dropped without being sorted or kept", "we are its data processor",
    ]) assert.ok(text.includes(phrase), phrase);
  });

  test(`Terms LINE (${lang}): controller, processor, cross-border and no messages from us`, () => {
    const { text } = legalArticle("terms", lang);
    for (const phrase of lang === "th" ? [
      "ตัวเชื่อม LINE", "ไม่ว่าทางใด รวมถึงทาง LINE", "Channel access token ของร้านเอง",
      "ร้านเป็นผู้ควบคุมข้อมูลของลูกค้าที่เชื่อม LINE", "เราเป็นผู้ประมวลผลข้อมูลให้ร้าน", "Cloudflare ซึ่งอาจอยู่นอกประเทศไทย",
    ] : [
      "the LINE connector", "by any channel, LINE included", "the shop's own LINE Official Account and Channel access token",
      "The shop is the data controller for its customers who link their LINE", "the shop's data processor",
      "Cloudflare servers, which may be outside Thailand",
    ]) assert.ok(text.includes(phrase), phrase);
  });
}

test("LINE legal copy has no Thai full stops", () => {
  for (const page of ["privacy", "terms"] as const) {
    assert.doesNotMatch(legalArticle(page, "th").text, /[฀-๿]\.(\s|$)/);
  }
});
