import { test } from "node:test";
import assert from "node:assert/strict";
import { exact, forSale, orderError, orderId, orderItems, payStep, proRedirect, slipError, startPick } from "./buy.ts";
import type { Catalogue, Licence } from "./api.ts";

const lic = (apps: string[] = []): Licence => ({ id: "L-ABCDEFGH", name: "ร้านสมใจ", apps, tier: null });
const q = (s: string) => new URLSearchParams(s);

const cat: Catalogue = {
  pro: { monthly: 15900, annual: 159000 },
  apps: [
    { id: "account", price: 999000 },
    { id: "wholesale", price: 899000 },
  ],
  onSale: ["account", "wholesale"],
};

test("orderId: only a well-formed order id from ?order=", () => {
  assert.equal(orderId(q("order=O-0123456789")), "O-0123456789");
  assert.equal(orderId(q("order=O-ABCDEFGHJK")), "O-ABCDEFGHJK");
  assert.equal(orderId(q("order=O-123")), null);
  assert.equal(orderId(q("order=O-ABCDEFGHIL")), null); // I and L are not in the alphabet
  assert.equal(orderId(q("order=../x")), null);
  assert.equal(orderId(q("")), null);
});

test("proRedirect: old ?max and ?pro links go to /pro, nothing else", () => {
  assert.equal(proRedirect(q("max")), "/pro");
  assert.equal(proRedirect(q("pro")), "/pro");
  assert.equal(proRedirect(q("max&app=account")), "/pro");
  assert.equal(proRedirect(q("app=account")), null);
  assert.equal(proRedirect(q("renew")), null);
  assert.equal(proRedirect(q("")), null);
});

test("startPick: ?app=<id> preselects that app when it is on sale and not owned", () => {
  assert.deepEqual(startPick(q("app=wholesale"), cat, null), ["wholesale"]);
  assert.deepEqual(startPick(q("app=wholesale"), cat, lic(["account"])), ["wholesale"]);
});

test("startPick: nothing preselected for owned, unknown, or bare ?app", () => {
  assert.deepEqual(startPick(q("app=wholesale"), cat, lic(["wholesale"])), []);
  assert.deepEqual(startPick(q("app=property"), cat, null), []); // not in the catalogue's apps
  assert.deepEqual(startPick(q("app"), cat, null), []);
  assert.deepEqual(startPick(q(""), cat, null), []);
});

test("orderItems: each line is just the app id", () => {
  assert.deepEqual(
    orderItems([
      { id: "wholesale", price: 899000 },
      { id: "account", price: 999000 },
    ]),
    [{ id: "wholesale" }, { id: "account" }],
  );
});

test("exact: amount to transfer, always two decimals", () => {
  assert.equal(exact(15937), "159.37");
  assert.equal(exact(899000), "8990.00");
  assert.equal(exact(25905), "259.05");
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

test("forSale: keeps only the paid apps on sale, the catalogue's Pro price stays", () => {
  const wide: Catalogue = {
    pro: { monthly: 15900, annual: 159000 },
    apps: [
      { id: "account", price: 999000 },
      { id: "wholesale", price: 899000 },
      { id: "service", price: 599000 },
    ],
    onSale: ["account", "service"],
  };
  assert.deepEqual(forSale(wide), {
    pro: { monthly: 15900, annual: 159000 },
    apps: [
      { id: "account", price: 999000 },
      { id: "service", price: 599000 },
    ],
    onSale: ["account", "service"],
  });
});

test("orderError: the server's message, else a connect or generic line", () => {
  const owned = { th: "มีแอปนี้แล้ว", en: "You already own this app." };
  assert.deepEqual(orderError({ ok: false, status: 409, error: "owned", message: owned }), owned);
  assert.match(orderError({ ok: false, status: 0, error: "net" }).th, /เชื่อมต่อไม่ได้/);
  assert.match(orderError({ ok: false, status: 500, error: "http" }).en, /went wrong/);
});
