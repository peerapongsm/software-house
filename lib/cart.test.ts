import { test } from "node:test";
import assert from "node:assert/strict";
import { baht, cartLines, total } from "./cart.ts";
import type { Catalogue } from "./api.ts";

const cat: Catalogue = {
  tiers: [
    { id: "pro", monthly: 15900, annual: 159000 },
    { id: "max", monthly: 34900, annual: 349000 },
  ],
  apps: [
    { id: "account", price: 999000 },
    { id: "wholesale", price: 899000 },
    { id: "property", price: 799000 },
    { id: "academy", price: 799000 },
    { id: "service", price: 599000 },
    { id: "contractor", price: 599000 },
    { id: "wellness", price: 499000 },
  ],
  onSale: ["pro", "max", "account", "wholesale", "property", "academy", "service", "contractor", "wellness"],
};

test("app tab: each picked app plus the Max add-on", () => {
  const lines = cartLines({ kind: "app", tier: "pro", period: "y", apps: ["wholesale", "service"], addMax: true }, cat);
  assert.deepEqual(lines, [
    { id: "wholesale", months: null, price: 899000 },
    { id: "service", months: null, price: 599000 },
    { id: "max", months: 12, price: 349000 },
  ]);
  assert.equal(total(lines), 899000 + 599000 + 349000);
});

test("app tab without the add-on has no tier line", () => {
  const lines = cartLines({ kind: "app", tier: "max", period: "m", apps: ["account"], addMax: false }, cat);
  assert.deepEqual(lines, [{ id: "account", months: null, price: 999000 }]);
});

test("tier tab: one line for the picked tier and period", () => {
  const lines = cartLines({ kind: "tier", tier: "max", period: "m", apps: ["wholesale"], addMax: true }, cat);
  assert.deepEqual(lines, [{ id: "max", months: 1, price: 34900 }]);
  assert.equal(total(lines), 34900);
});

test("baht shows satang only when there are some", () => {
  assert.equal(baht(29083), "฿290.83");
  assert.equal(baht(899000), "฿8,990");
  assert.equal(baht(15905), "฿159.05");
  assert.equal(baht(0), "฿0");
});
