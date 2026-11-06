import { test } from "node:test";
import assert from "node:assert/strict";
import { baht, cartLines, total } from "./cart.ts";
import type { Catalogue } from "./api.ts";

const cat: Catalogue = {
  pro: { monthly: 15900, annual: 159000 },
  apps: [
    { id: "account", price: 999000 },
    { id: "wholesale", price: 899000 },
    { id: "property", price: 799000 },
    { id: "academy", price: 799000 },
    { id: "service", price: 599000 },
    { id: "contractor", price: 599000 },
    { id: "wellness", price: 499000 },
  ],
  onSale: ["account", "wholesale", "property", "academy", "service", "contractor", "wellness"],
};

test("cart: one line per picked app, priced from the catalogue", () => {
  const lines = cartLines(["wholesale", "service"], cat);
  assert.deepEqual(lines, [
    { id: "wholesale", price: 899000 },
    { id: "service", price: 599000 },
  ]);
  assert.equal(total(lines), 899000 + 599000);
});

test("cart: ids the catalogue does not list are dropped", () => {
  assert.deepEqual(cartLines(["pro", "max", "account"], cat), [{ id: "account", price: 999000 }]);
  assert.deepEqual(cartLines([], cat), []);
  assert.equal(total([]), 0);
});

test("baht shows satang only when there are some", () => {
  assert.equal(baht(29083), "฿290.83");
  assert.equal(baht(899000), "฿8,990");
  assert.equal(baht(15905), "฿159.05");
  assert.equal(baht(0), "฿0");
});
