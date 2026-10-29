import { test } from "node:test";
import assert from "node:assert/strict";
import { exact, forSale, maxActive, orderError, orderId, orderItems, payStep, perMonth, slipError, startSel } from "./buy.ts";
import type { Catalogue, Licence } from "./api.ts";

const NOW = Date.parse("2026-10-30T12:00:00+07:00");
const DAY = 864e5;
const iso = (d: number) => new Date(NOW + d * DAY).toISOString();
const lic = (tier: Licence["tier"], apps: string[] = []): Licence => ({ id: "L-ABCDEFGH", name: "ร้านสมใจ", apps, tier });
const q = (s: string) => new URLSearchParams(s);

test("orderId: only a well-formed order id from ?order=", () => {
  assert.equal(orderId(q("order=O-0123456789")), "O-0123456789");
  assert.equal(orderId(q("order=O-ABCDEFGHJK")), "O-ABCDEFGHJK");
  assert.equal(orderId(q("order=O-123")), null);
  assert.equal(orderId(q("order=O-ABCDEFGHIL")), null); // I and L are not in the alphabet
  assert.equal(orderId(q("order=../x")), null);
  assert.equal(orderId(q("")), null);
});

test("maxActive: Max until in the future only", () => {
  assert.equal(maxActive(null, NOW), false);
  assert.equal(maxActive(lic(null), NOW), false);
  assert.equal(maxActive(lic({ t: "pro", until: iso(30) }), NOW), false);
  assert.equal(maxActive(lic({ t: "max", until: iso(30) }), NOW), true);
  assert.equal(maxActive(lic({ t: "max", until: iso(-1) }), NOW), false);
});

test("startSel: plain /buy picks Pro monthly on the tier tab", () => {
  assert.deepEqual(startSel(q(""), null, NOW), {
    sel: { kind: "tier", tier: "pro", period: "m", apps: [], addMax: false },
    renewFrom: null,
  });
});

test("startSel: ?app opens the app tab, ?max picks Max", () => {
  assert.equal(startSel(q("app"), null, NOW).sel.kind, "app");
  const m = startSel(q("max"), lic({ t: "pro", until: iso(30) }), NOW);
  assert.equal(m.sel.kind, "tier");
  assert.equal(m.sel.tier, "max");
});

test("startSel: ?renew picks the current tier and notes the date it extends from", () => {
  const until = iso(15);
  assert.deepEqual(startSel(q("renew"), lic({ t: "pro", until }), NOW), {
    sel: { kind: "tier", tier: "pro", period: "m", apps: [], addMax: false },
    renewFrom: until,
  });
  // past until: the renewal starts at payment, so no date to show
  const late = startSel(q("renew"), lic({ t: "max", until: iso(-3) }), NOW);
  assert.equal(late.sel.tier, "max");
  assert.equal(late.renewFrom, null);
  // nothing to renew
  assert.equal(startSel(q("renew"), lic(null, ["account"]), NOW).renewFrom, null);
});

test("startSel: active Max can't pick Pro", () => {
  assert.equal(startSel(q(""), lic({ t: "max", until: iso(100) }), NOW).sel.tier, "max");
});

test("orderItems: apps carry no months, tiers carry 1 or 12", () => {
  assert.deepEqual(
    orderItems([
      { id: "wholesale", months: null, price: 899000 },
      { id: "max", months: 12, price: 349000 },
    ]),
    [{ id: "wholesale" }, { id: "max", months: 12 }],
  );
});

test("perMonth: annual price over 12, to the satang", () => {
  assert.equal(perMonth(349000), 29083);
  assert.equal(perMonth(159000), 13250);
});

test("exact: amount to transfer, always two decimals", () => {
  assert.equal(exact(15937), "159.37");
  assert.equal(exact(899000), "8990.00");
  assert.equal(exact(34905), "349.05");
});

test("payStep: which step an order status shows", () => {
  assert.equal(payStep("open"), "pay");
  assert.equal(payStep("expired"), "pay");
  assert.equal(payStep("paid"), "done");
  assert.equal(payStep("review"), "review");
  assert.equal(payStep("issuing"), "review");
  assert.equal(payStep("rejected"), "closed");
  assert.equal(payStep("whatever"), "closed");
});

test("slipError: JPG, PNG or WebP up to 2 MB", () => {
  assert.equal(slipError({ size: 2 * 1024 * 1024, type: "image/jpeg" }), null);
  assert.equal(slipError({ size: 1000, type: "image/png" }), null);
  assert.equal(slipError({ size: 1000, type: "image/webp" }), null);
  assert.match(slipError({ size: 2 * 1024 * 1024 + 1, type: "image/jpeg" })!.th, /2 MB/);
  assert.match(slipError({ size: 1000, type: "application/pdf" })!.en, /JPG/);
});

test("forSale: drops items the catalogue does not sell", () => {
  const cat: Catalogue = {
    tiers: [
      { id: "pro", monthly: 15900, annual: 159000 },
      { id: "max", monthly: 34900, annual: 349000 },
    ],
    apps: [
      { id: "account", price: 999000 },
      { id: "wholesale", price: 899000 },
    ],
    onSale: ["pro", "account"],
  };
  assert.deepEqual(forSale(cat), {
    tiers: [{ id: "pro", monthly: 15900, annual: 159000 }],
    apps: [{ id: "account", price: 999000 }],
    onSale: ["pro", "account"],
  });
});

test("orderError: the server's message, else a connect or generic line", () => {
  const owned = { th: "มีแอปนี้แล้ว", en: "You already own this app." };
  assert.deepEqual(orderError({ ok: false, status: 409, error: "owned", message: owned }), owned);
  assert.match(orderError({ ok: false, status: 0, error: "net" }).th, /เชื่อมต่อไม่ได้/);
  assert.match(orderError({ ok: false, status: 500, error: "http" }).en, /went wrong/);
});
