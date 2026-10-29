import { test } from "node:test";
import assert from "node:assert/strict";
import { digitsFrom, fillBoxes } from "./otp.ts";

const empty = () => ["", "", "", "", "", ""];

test("digitsFrom keeps only digits, at most six", () => {
  assert.equal(digitsFrom(" 123 456 "), "123456");
  assert.equal(digitsFrom("123456\n"), "123456");
  assert.equal(digitsFrom("12a3"), "123");
  assert.equal(digitsFrom("1234567"), "123456");
});

test("fillBoxes fills from the box typed in and stops at the last", () => {
  assert.deepEqual(fillBoxes(empty(), 2, "98765"), { boxes: ["", "", "9", "8", "7", "6"], focus: 5 });
  assert.deepEqual(fillBoxes(empty(), 0, "4"), { boxes: ["4", "", "", "", "", ""], focus: 1 });
});

test("fillBoxes: a full six-digit paste fills every box from any box", () => {
  assert.deepEqual(fillBoxes(["1", "", "", "", "", ""], 3, " 123 456 "), { boxes: ["1", "2", "3", "4", "5", "6"], focus: 5 });
});

test("fillBoxes ignores input with no digits", () => {
  assert.deepEqual(fillBoxes(["1", "", "", "", "", ""], 1, "a"), { boxes: ["1", "", "", "", "", ""], focus: 1 });
});
