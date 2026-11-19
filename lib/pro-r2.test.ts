import { test } from "node:test";
import assert from "node:assert/strict";
import { APPS } from "../app/apps-data.ts";
import { APP_PAGES } from "../app/app-pages-data.ts";
import { COPY } from "../app/copy.ts";
import { PRO_COPY } from "./pro.ts";
import { FAQ } from "../app/site-info.ts";

const expected = {
  file: {
    th: ["แบบฟอร์ม A/B/C", "ใบแจ้งยอดลูกค้า", "รายงานยอดขาย", "เริ่มแก้ไขเอกสาร", "รายการเอกสารเป็น Excel", "คำนำหน้าเลขเอกสาร", "หมายเหตุเริ่มต้น", "ราคาล่าสุดและเงื่อนไขล่าสุด"],
    en: ["A/B/C forms", "statement PDFs", "sales reports", "revisions of issued documents", "document lists to Excel", "revision suffix style", "default notes", "last price and last terms"],
  },
  room: {
    th: ["นำเข้าห้องและผู้เช่า", "กรอกมิเตอร์", "PDF รวมทั้งเดือน", "เริ่มแก้ไขบิล", "รายสองสัปดาห์"],
    en: ["Import rooms and tenants", "meter Excel templates", "month-wide PDFs", "revisions of issued or paid bills", "two-week stays"],
  },
  garage: {
    th: ["ใบโทรติดตาม", "วันเข้ารับบริการครั้งถัดไป", "ต้นทุนภายใน", "กำไรบนแดชบอร์ด", "เริ่มงานเคลมประกัน", "ประวัติเคลื่อนไหวอะไหล่", "ของใกล้หมด", "รายงานสั่งซื้อเพิ่ม", "ขายอะไหล่หน้าร้าน"],
    en: ["call-back sheets", "next-service date", "internal costs", "dashboard revenue and profit", "Start insurance claims", "parts movement history", "low-stock alerts", "reorder reports", "walk-in counter sales"],
  },
  stock: {
    th: ["รอบตรวจนับสต็อกใหม่", "PeerapoS Pair", "แผ่นป้ายบาร์โค้ด", "มูลค่าสินค้ากับต้นทุนเฉลี่ย", "ส่งออกรายงานเคลื่อนไหว", "รายงานสั่งซื้อเพิ่มพร้อมจำนวนแนะนำ", "เพิ่มเข้ารายการรับสินค้า"],
    en: ["new stock count rounds", "PeerapoS Pair", "barcode label sheets", "stock value and average cost", "export movement reports", "reorder reports with suggested quantities", "add to receipt"],
  },
};

for (const lang of ["th", "en"] as const) {
  test(`Pro R2 (${lang}): common benefits and each app's locked features`, () => {
    const benefits = PRO_COPY.gets.map(x => x[lang]).join(" ");
    for (const phrase of lang === "th" ? ["20 เครื่อง", "มือถือ แท็บเล็ต", "คอมพิวเตอร์เครื่องอื่นในร้าน", "ใช้ PeerapoS Pair จากนอกร้าน", "ตัวเชื่อม AI", "Google Drive"] : ["20 devices in total", "phones, tablets", "other PCs in the shop", "Use PeerapoS Pair away from the shop", "AI connector", "Google Drive"]) assert.ok(benefits.includes(phrase), phrase);
    for (const [slug, phrases] of Object.entries(expected)) {
      const app = APPS.find(a => a.name.toLowerCase() === `peerapos ${slug}`)!;
      const text = app[lang].pro.join(" ").replaceAll("|", "");
      for (const phrase of phrases[lang]) assert.ok(text.includes(phrase), `${slug}: ${phrase}`);
      assert.match(text, lang === "th" ? /อุปกรณ์รวมสูงสุด 20 เครื่อง/ : /20 devices in total/);
      assert.ok(text.includes(lang === "th" ? "ใช้ PeerapoS Pair จากนอกร้าน" : "Use PeerapoS Pair away from the shop"));
      assert.doesNotMatch(text, /5 other PCs|5 เครื่อง|4G/);
    }
    assert.equal(PRO_COPY.updated[lang], lang === "th" ? "อัปเดตล่าสุด 19 พฤศจิกายน 2569" : "Last updated 19 November 2026");
    assert.match(PRO_COPY.existing[lang], lang === "th" ? /ทำต่อให้เสร็จ/ : /finishable/);
  });

  test(`Free wording (${lang}): homepage and every free app qualify Pro features`, () => {
    const phrase = lang === "th" ? "ใช้ฟรี ฟีเจอร์บางอย่างต้องใช้ PeerapoS Pro" : "Free to use; some features need PeerapoS Pro";
    for (const key of ["heroSub", "appsSub"] as const) assert.ok(COPY[lang][key].includes(phrase));
    assert.ok(FAQ[lang].at(-1)!.a.includes(phrase));
    for (const app of APPS) {
      const slug = app.name.slice(9).toLowerCase();
      assert.ok(APP_PAGES[slug][lang].useCase.includes(phrase), slug);
    }
  });
}
