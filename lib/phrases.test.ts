import { test } from "node:test";
import assert from "node:assert/strict";
import { splitPhrases } from "./phrases.ts";

test("splitPhrases keeps Thai compounds together with a plain space between phrases", () => {
  assert.deepEqual(splitPhrases("ออกใบกำกับภาษี ทำรายงาน"), [
    { text: "ออกใบกำกับภาษี", thai: true },
    { text: " ", thai: false },
    { text: "ทำรายงาน", thai: true },
  ]);
});

test("splitPhrases marks only Thai chunks in mixed text", () => {
  assert.deepEqual(splitPhrases("Windows 10 และ 11"), [
    { text: "Windows", thai: false },
    { text: " ", thai: false },
    { text: "10", thai: false },
    { text: " ", thai: false },
    { text: "และ", thai: true },
    { text: " ", thai: false },
    { text: "11", thai: false },
  ]);
});

test("splitPhrases returns no chunks for empty text", () => {
  assert.deepEqual(splitPhrases(""), []);
});

test("splitPhrases preserves all text including repeated and surrounding spaces", () => {
  for (const text of ["", "ออกใบกำกับภาษี ทำรายงาน", "Windows 10 และ 11", "รายจ่าย  การค้า", " ใบกำกับภาษี ", "  ไทย  English  ", "   ", "Thai\tไทย\nการค้า"]) {
    assert.equal(splitPhrases(text).map((chunk) => chunk.text).join(""), text);
    assert.ok(splitPhrases(text).filter((chunk) => chunk.thai).every((chunk) => !chunk.text.includes(" ")));
  }
});

test("splitPhrases turns | into a break marker and keeps Thai on both sides together", () => {
  assert.deepEqual(splitPhrases("เลือกตัวที่ตรงกับ|งานของคุณ"), [
    { text: "เลือกตัวที่ตรงกับ", thai: true },
    { text: "|", thai: false, wbr: true },
    { text: "งานของคุณ", thai: true },
  ]);
});
