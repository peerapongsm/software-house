import { test } from "node:test";
import assert from "node:assert/strict";
import { exact, forSale, orderError, orderId, orderItems, payStep, proRedirect, startPick } from "./buy.ts";
import type { Catalogue, Licence } from "./api.ts";
import { proBuyError } from "./pro.ts";

const lic = (apps: string[] = []): Licence => ({ id: "L-ABCDEFGH", name: "ร้านสมใจ", apps, tier: null, pro: null });
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

test("orderItems: pay again sends the app id without the snapshot price", () => {
  assert.deepEqual(orderItems([{ id: "account", price: 999000 }]), [{ id: "account" }]);
});

test("exact: amount to transfer, always two decimals", () => {
  assert.equal(exact(15937), "159.37");
  assert.equal(exact(899000), "8990.00");
  assert.equal(exact(25905), "259.05");
});

test("payStep: waiting, cancelled, payable and final order states", () => {
  assert.equal(payStep("open", false), "waiting");
  assert.equal(payStep("open", true), "cancelled");
  assert.equal(payStep("expired", false), "pay");
  assert.equal(payStep("expired", true), "pay");
  assert.equal(payStep("paid", true), "done");
  assert.equal(payStep("review", false), "review");
  assert.equal(payStep("issuing", false), "review");
  assert.equal(payStep("refunded", false), "closed");
  assert.equal(payStep("rejected", false), "closed");
  assert.equal(payStep("whatever", false), "closed");
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

for (const [error, message] of Object.entries({
  tooManyOrders: {
    th: "มีคำสั่งซื้อค้างอยู่หลายรายการ รอสักครู่หรือชำระรายการเดิมก่อน",
    en: "You have several unpaid orders. Pay one of them or wait a day.",
  },
  payDown: {
    th: "ระบบชำระเงินขัดข้อง ลองใหม่อีกครั้งในไม่กี่นาที",
    en: "Payments are down. Try again in a few minutes.",
  },
  salesOff: {
    th: "ยังไม่เปิดขายตอนนี้",
    en: "Sales are closed right now.",
  },
})) {
  for (const errorText of [orderError, proBuyError]) {
    test(`${errorText.name}: ${error} maps to bilingual site copy without an API message`, () => {
      assert.deepEqual(errorText({ ok: false, status: 503, error }), message);
    });
  }
}
