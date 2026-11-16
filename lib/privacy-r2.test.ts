import { test } from "node:test";
import assert from "node:assert/strict";
import { legalArticle } from "./legal-test-helper.ts";

for (const lang of ["th", "en"] as const) {
  test(`Privacy R2 (${lang}): full connections, report fields and safeguards`, () => {
    const { text, html } = legalArticle("privacy", lang);
    for (const phrase of lang === "th" ? [
      "ตรวจหาเวอร์ชันใหม่", "รายงานปัญหาหรือส่งความเห็น", "เฉพาะเมื่อคุณเปิดใช้เอง: ตรวจสิทธิ์ Pro",
      "รีเลย์ PeerapoS Pair", "ตัวเชื่อม AI", "Google Drive", "วันละครั้ง", "เปิดเป็นค่าเริ่มต้น",
      "ประกาศในแอปก่อนส่งครั้งแรก", "ประโยชน์โดยชอบด้วยกฎหมาย", "มาตรา 24(5)",
      "ชื่อและเวอร์ชันแอป", "รุ่น Windows", "ภาษาไทยหรืออังกฤษ", "โหมดฟรี Pro หรือเครื่องลูก",
      "7 วันที่ผ่านมา", "เวลาที่เปิดหน้าต่างแอปใช้งานวันนี้", "999", "จำนวนบริษัท (1, 2, 3 หรือ 4 ขึ้นไป)", "บริษัทที่เปิดอยู่",
      "ห้อง สินค้า ลูกค้า หรือรถ", "ที่จับคู่ ที่เชื่อมต่อวันนี้ และที่ใช้รีเลย์วันนี้", "0–99",
      "รหัสสุ่มหนึ่งรหัสต่อคอมพิวเตอร์", "รหัสที่แฮชแยก", "ไม่ผูกกับบัญชี สิทธิ์ใช้งาน อีเมล Google การชำระเงิน รายงานปัญหา หรือข้อมูลรีเลย์",
      "ไม่มีข้อมูลร้านหรือลูกค้า", "ไม่มีชื่อ ยอดเงิน ข้อความที่พิมพ์เอง", "หรืออายุ", "ไม่เก็บตำแหน่งที่ตั้งทุกชนิด",
      "Cloudflare เป็นผู้ประมวลผล", "ไม่เก็บ และไม่บันทึก IP ในล็อก", "3 เดือนแล้วลบ",
      "ตั้งค่า > เกี่ยวกับ", "หยุดนับและส่ง", "ลบตัวนับและรหัสสถิติ", "เราไม่ขอให้ใครส่งรหัสสถิติมาให้เรา", "ถ้าอยากคัดค้านหรือลบ ให้ปิดสวิตช์นี้", "สถิติการใช้งาน 3 เดือน", "17 พฤศจิกายน 2569",
    ] : [
      "Update check", "Problem reports and feedback", "Only when you turn them on: Pro licence checks",
      "PeerapoS Pair relay", "AI connector", "Google Drive", "once a day", "on by default",
      "notice before the first report", "legitimate interest", "PDPA section 24(5)",
      "App name and version", "Windows version", "Thai or English", "free, Pro or other-PC client mode",
      "last 7 days", "foreground-use range", "999", "Company-count range", "open company",
      "rooms, products, customers or vehicles", "paired devices, devices connected today and devices using relay today", "0–99",
      "One random id per PC", "separate hashed id", "never linked to account, licence, email, Google, payment, feedback, relay or AI connector data",
      "pseudonymous personal data", "No shop or customer data, names, amounts, free text", "or age", "No location of any kind",
      "Cloudflare is our processor", "we do not read, store or log it", "3 months, then deleted",
      "Settings > About", "stops counting and sending", "deletes local counters and the statistics id on that PC",
      "We never ask anyone to send us their statistics id", "To object or delete, use this switch", "Usage statistics, 3 months", "17 November 2026",
    ]) assert.ok(text.includes(phrase), phrase);
    for (const range of ["0–15", "15–60", "60–240", "240", "0–10", "11–50", "51–200", "201", "0–20"]) assert.ok(text.includes(range), range);
    assert.doesNotMatch(text, /anonymous|ไม่ระบุตัวตน|no usage tracking or analytics|only two cases|แค่สองกรณี|daily problem-report summary|สรุปรายงานปัญหาวันละครั้ง|received reports are sent to Claude|ระบบส่งรายงานที่ได้รับไปให้ Claude/i);
    assert.match(html, /inline-block max-w-full/);
  });

  test(`Privacy R2 (${lang}): providers have actual privacy and terms links`, () => {
    const { html } = legalArticle("privacy", lang);
    for (const url of [
      "https://www.cloudflare.com/privacypolicy/", "https://stripe.com/privacy", "https://resend.com/legal/privacy-policy",
      "https://policies.google.com/privacy", "https://www.anthropic.com/legal/privacy", "https://openai.com/policies/privacy-policy/",
      "https://www.cloudflare.com/website-terms/", "https://stripe.com/legal/ssa", "https://resend.com/legal/terms-of-service",
      "https://policies.google.com/terms", "https://www.anthropic.com/legal/consumer-terms", "https://openai.com/policies/terms-of-use/",
    ]) assert.ok(html.includes(`href="${url}"`), url);
  });
}
