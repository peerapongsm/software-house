import { test } from "node:test";
import assert from "node:assert/strict";
import { APPS, FEATURED_SLUGS, slugOf, splitFeatured } from "../app/apps-data.ts";
import { ACCOUNT_PCS, PLAN_NAMES, PLAN_NOTES, PLAN_ROWS } from "./plans.ts";

test("splitFeatured: the top 5 come first, in download order", () => {
  const { featured } = splitFeatured(APPS);
  assert.deepEqual(featured.map(slugOf), ["stock", "file", "room", "pos", "pay"]);
  assert.deepEqual([...FEATURED_SLUGS], ["stock", "file", "room", "pos", "pay"]);
});

test("splitFeatured: rest is every other app, in original order, with no featured slug", () => {
  const { rest } = splitFeatured(APPS);
  assert.equal(rest.length, APPS.length - 5);
  const featured = new Set<string>(FEATURED_SLUGS);
  for (const a of rest) assert.equal(featured.has(slugOf(a)), false);
  const originalOrder = APPS.filter(a => !featured.has(slugOf(a)));
  assert.deepEqual(rest.map(slugOf), originalOrder.map(slugOf));
});

test("splitFeatured: throws when a featured app is missing, instead of showing 4 cards", () => {
  assert.throws(() => splitFeatured(APPS.filter(a => slugOf(a) !== "pos")));
});

test("ACCOUNT_PCS: paid 2, Pro 6, Pro + paid 10 (mirror of licence caps)", () => {
  assert.deepEqual(ACCOUNT_PCS, { paid: 2, pro: 6, proPaid: 10 });
});

test("PLAN_ROWS: 4 rows, each with a label and 4 plan cells", () => {
  assert.equal(PLAN_NAMES.length, 4);
  assert.equal(PLAN_ROWS.length, 4);
  for (const row of PLAN_ROWS) assert.equal(row.cells.length, 4);
});

test("PLAN_ROWS: row 2 counts are 2, 6, 10 in order for paid, Pro and Pro + paid", () => {
  assert.deepEqual(PLAN_ROWS[1].cells.slice(1).map(c => c.en.match(/\d+/)?.[0]), ["2", "6", "10"]);
});

test("plan copy: every cell and note has Thai and English, and no Thai text ends with a full stop", () => {
  const copy = [
    ...PLAN_NAMES,
    ...PLAN_ROWS.flatMap(row => [row.label, ...row.cells]),
    ...Object.values(PLAN_NOTES),
  ];
  for (const m of copy) {
    assert.ok(m.th.trim(), "th");
    assert.ok(m.en.trim(), "en");
    assert.doesNotMatch(m.th, /\.$/);
  }
});

test("PLAN_ROWS: the paid cell says Pro features in the bought apps still need Pro", () => {
  const cell = PLAN_ROWS[2].cells[1];
  assert.match(cell.th, /แอปที่ซื้อ ใช้ได้ตลอด ฟีเจอร์ Pro ของแอปนั้นต้องมี Pro/);
  assert.equal(cell.en, "The apps you bought, for good. Their Pro features need Pro");
  assert.doesNotMatch(cell.en, /every feature/i);
});

test("PLAN_ROWS: the Pro cell is limited to free apps; Pro + paid also opens the bought apps' Pro features", () => {
  assert.equal(PLAN_ROWS[2].cells[2].en, "Pro features in every free app");
  assert.match(PLAN_ROWS[2].cells[2].th, /ฟีเจอร์ Pro ในแอปฟรีทุกตัว/);
  assert.equal(PLAN_ROWS[2].cells[3].en, "Both of the above, and Pro features in the paid apps you bought");
  assert.match(PLAN_ROWS[2].cells[3].th, /ฟีเจอร์ Pro ในแอปซื้อขาดที่คุณมี/);
});

test("PLAN_NOTES.devices: shop PCs are exempt only in free apps; paid apps count every PC that opens them", () => {
  assert.match(PLAN_NOTES.devices.th, /ในแอปฟรี คอมในร้านที่ต่อเข้าเครื่องหลักก็ไม่นับ ส่วนในแอปซื้อขาด ทุกเครื่องที่เปิดแอปต้องเชื่อมและนับ/);
  assert.match(PLAN_NOTES.devices.en, /In the free apps, other shop PCs that connect to the main PC do not count\. In the paid apps, every PC that opens the app, main or shop, must be linked and counts\./);
});
