import { test } from "node:test";
import assert from "node:assert/strict";
import { day, deleteNeedsAck, isDeleteConfirm, lastUsed, ownedPaid, pillText, proView, removedAll } from "./account.ts";

const NOW = Date.parse("2026-10-30T15:00:00+07:00");

test("pillText: one line per plan status, TH and EN", () => {
  assert.deepEqual(pillText({ tone: "ok", days: 45, kind: "active" }), { th: "ใช้งานอยู่", en: "Active" });
  assert.deepEqual(pillText({ tone: "warn", days: 15, kind: "soon" }), { th: "เหลือ 15 วัน", en: "15 days left" });
  assert.deepEqual(pillText({ tone: "warn", days: 1, kind: "soon" }), { th: "เหลือ 1 วัน", en: "1 day left" });
  assert.deepEqual(pillText({ tone: "warn", days: 11, kind: "grace" }), {
    th: "หมดอายุ ใช้ต่อได้อีก 11 วัน",
    en: "Expired, 11 days of grace left",
  });
  assert.deepEqual(pillText({ tone: "err", days: 0, kind: "expired" }), { th: "หมดอายุแล้ว", en: "Expired" });
});

test("day: Thai Buddhist date in TH, day month year in EN, Bangkok time", () => {
  assert.equal(day("2026-11-12T00:00:00+07:00", "th"), "12 พ.ย. 2569");
  assert.equal(day("2026-11-12T00:00:00+07:00", "en"), "12 Nov 2026");
  // 23:30 UTC on the 11th is already the 12th in Bangkok
  assert.equal(day("2026-11-11T23:30:00Z", "en"), "12 Nov 2026");
});

test("lastUsed: today and yesterday with the time, then days ago, then a date", () => {
  assert.deepEqual(lastUsed("2026-10-30T10:42:00+07:00", NOW), { th: "ใช้ล่าสุด วันนี้ 10:42", en: "Last used today 10:42" });
  assert.deepEqual(lastUsed("2026-10-29T08:05:00+07:00", NOW), { th: "ใช้ล่าสุด เมื่อวาน 08:05", en: "Last used yesterday 08:05" });
  assert.deepEqual(lastUsed("2026-10-28T23:59:00+07:00", NOW), { th: "ใช้ล่าสุด 2 วันก่อน", en: "Last used 2 days ago" });
  assert.deepEqual(lastUsed("2026-09-30T12:00:00+07:00", NOW), { th: "ใช้ล่าสุด 30 วันก่อน", en: "Last used 30 days ago" });
  assert.deepEqual(lastUsed("2026-08-15T12:00:00+07:00", NOW), { th: "ใช้ล่าสุด 15 ส.ค. 2569", en: "Last used 15 Aug 2026" });
});

test("lastUsed: the day boundary is Bangkok midnight, not UTC", () => {
  // 00:10 Bangkok on the 30th = 17:10 UTC on the 29th: still today
  assert.equal(lastUsed("2026-10-29T17:10:00Z", NOW).en, "Last used today 00:10");
});

test("lastUsed: never seen, or a clock ahead of ours", () => {
  assert.deepEqual(lastUsed(null, NOW), { th: "ยังไม่ได้ใช้", en: "Not used yet" });
  assert.equal(lastUsed("2026-10-30T15:05:00+07:00", NOW).en, "Last used today 15:05");
});

test("ownedPaid: only known paid apps, in catalogue order", () => {
  assert.deepEqual(ownedPaid(["wellness", "account", "../x", "wash"]), ["account", "wellness"]);
  assert.deepEqual(ownedPaid([]), []);
});

test("removedAll: how many PCs “ยกเลิกทุกเครื่อง” removed", () => {
  assert.deepEqual(removedAll(3), { th: "ยกเลิกแล้ว 3 เครื่อง", en: "3 PCs removed" });
  assert.deepEqual(removedAll(1), { th: "ยกเลิกแล้ว 1 เครื่อง", en: "1 PC removed" });
});

test("isDeleteConfirm: the typed word DELETE, spaces around it ignored, nothing else", () => {
  assert.equal(isDeleteConfirm("DELETE"), true);
  assert.equal(isDeleteConfirm("  DELETE "), true);
  assert.equal(isDeleteConfirm("delete"), false);
  assert.equal(isDeleteConfirm("DELETE ACCOUNT"), false);
  assert.equal(isDeleteConfirm(""), false);
});

test("deleteNeedsAck: 409 activeSub means a Play subscription is still running", () => {
  assert.equal(deleteNeedsAck({ ok: false, status: 409, error: "activeSub" }), true);
  assert.equal(deleteNeedsAck({ ok: false, status: 409, error: "other" }), false);
  assert.equal(deleteNeedsAck({ ok: false, status: 500, error: "http" }), false);
});

test("proView: no Pro can subscribe with no management or renewal", () => {
  assert.deepEqual(proView(null, NOW), { status: null, source: null, manage: null, renew: false, subscribe: true });
});

test("proView: Stripe opens the portal, Play opens Play", () => {
  for (const [source, manage] of [["stripe", "portal"], ["play", "play"]] as const) {
    const view = proView({ source, until: "2026-12-09T15:00:00+07:00", cancelling: true }, NOW);
    assert.equal(view.status?.kind, "active");
    assert.deepEqual([view.source, view.manage, view.renew, view.subscribe], [source, manage, false, false]);
  }
});

test("proView: passes renew in the last 30 days, never open subscription management", () => {
  for (const [until, renew] of [["2026-12-09T15:00:00+07:00", false], ["2026-11-29T15:00:00+07:00", true], ["2026-11-19T15:00:00+07:00", true]] as const) {
    const view = proView({ source: "pass", until, cancelling: false }, NOW);
    assert.deepEqual([view.source, view.manage, view.renew, view.subscribe], ["pass", null, renew, false]);
  }
});

test("proView: ended coverage can subscribe even during PC grace; ended passes can renew", () => {
  for (const until of ["2026-10-30T15:00:00+07:00", "2026-10-25T00:00:00+07:00", "2026-09-01T00:00:00+07:00"]) {
    const view = proView({ source: "pass", until, cancelling: false }, NOW);
    assert.deepEqual([view.manage, view.renew, view.subscribe], [null, true, true]);
  }
});

// Compile the client card in memory: all API calls and navigation stay stubbed.
import ts from "typescript";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { renderToStaticMarkup } from "react-dom/server";
import * as accountRules from "./account.ts";
import * as proRules from "./pro.ts";
import { safeStripeUrl } from "./api.ts";
import { orderError } from "./buy.ts";

function planHarness() {
  const calls: unknown[] = [];
  const navigations: string[] = [];
  let response: unknown = { ok: true, data: { url: "https://billing.stripe.com/p/session" } };
  const states: unknown[] = [];
  let cursor = 0;
  let clock = NOW;
  const effects: (() => unknown)[] = [];
  const timers = new Map<number, { at: number; run: () => unknown }>();
  let timerId = 0;
  const nativeRequire = createRequire(import.meta.url);
  const source = readFileSync(new URL("../app/account/page.tsx", import.meta.url), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} as any };
  const stubRequire = (id: string): any => {
    if (id === "react") return { useState: (initial: unknown) => {
      const index = cursor++;
      if (!(index in states)) states[index] = initial;
      return [states[index], (value: unknown) => { states[index] = value; }];
    }, useEffect: (effect: () => unknown) => { effects.push(effect); } };
    if (id === "@/lib/account.ts") return accountRules;
    if (id === "@/lib/pro.ts") return proRules;
    if (id === "@/lib/api.ts") return { safeStripeUrl, api: async (...args: unknown[]) => { calls.push(args); return response; } };
    if (id === "@/lib/buy.ts") return { orderError };
    if (id === "@/lib/lang.ts") return { useLang: () => ["en", () => {}] };
    if (id.startsWith("@/") || id === "next/image") return () => null;
    return nativeRequire(id);
  };
  new Function("require", "module", "exports", "location", "Date", "setTimeout", "clearTimeout", "document", js + "\nmodule.exports.card = Plan; module.exports.copy = COPY;")(stubRequire, mod, mod.exports, { search: "?pro=done", assign: (url: string) => navigations.push(url), replace: (url: string) => navigations.push(url) },
    { now: () => clock }, (run: () => unknown, delay: number) => {
      timers.set(++timerId, { at: clock + delay, run });
      return timerId;
    }, (id: number) => timers.delete(id), { title: "" });
  return { calls, navigations, timers, effects,
    account: () => { cursor = 0; return mod.exports.default(); },
    advance: async (ms: number) => {
      clock += ms;
      for (const [id, timer] of [...timers]) if (timers.has(id) && timer.at <= clock) { timers.delete(id); await timer.run(); }
    },
    respond: (r: unknown) => { response = r; }, render: (source: "play" | "stripe" | "pass", lang = "en") => {
    cursor = 0;
    return mod.exports.card({ t: mod.exports.copy[lang], lang, now: NOW, lic: { id: "L-TEST", name: "Shop", apps: [], tier: null, pro: { source, until: "2026-11-19T15:00:00+07:00", cancelling: true } } });
  } };
}

function nodes(tree: any): any[] {
  if (!tree || typeof tree !== "object") return [];
  return [tree, ...[tree.props?.children].flat(Infinity).flatMap(nodes)];
}

test("deleteNeedsAck: activeSub requires acknowledgement only on 409", () => {
  assert.equal(deleteNeedsAck({ ok: false, status: 409, error: "activeSub" }), true);
  assert.equal(deleteNeedsAck({ ok: false, status: 400, error: "activeSub" }), false);
});

test("account Pro card uses the authoritative source even without tier", () => {
  for (const [source, label] of [["play", "Google Play"], ["stripe", "Card (auto-renew)"], ["pass", "Prepaid annual pass"]] as const) {
    const html = renderToStaticMarkup(planHarness().render(source));
    assert.ok(html.includes(label), html);
    assert.ok(html.includes("19 Nov 2026"), html);
    assert.equal(html.includes(proRules.PLAY_SUBS_URL), source === "play");
  }
});

test("account portal posts an empty body and only navigates to an allowed Stripe URL", async () => {
  for (const url of ["https://billing.stripe.com/p/session", "https://evil.example/", "javascript:alert(1)"]) {
    const h = planHarness();
    h.respond({ ok: true, data: { url } });
    const button = nodes(h.render("stripe")).find((n) => n.type === "button");
    assert.ok(button, "Manage subscription button");
    await button.props.onClick();
    assert.deepEqual(h.calls, [["/api/pro/portal", { method: "POST" }]]);
    assert.deepEqual(h.navigations, url.startsWith("https://billing.stripe.com/") ? [url] : []);
    if (!h.navigations.length) assert.ok(nodes(h.render("stripe")).some((n) => n.props?.role === "alert"));
  }
});

test("account pass renewal requires explicit inline consent", async () => {
  const h = planHarness();
  let tree = h.render("pass");
  const checkbox = nodes(tree).find((n) => n.type === "input" && n.props.type === "checkbox");
  assert.ok(checkbox, "Inline terms checkbox");
  const button = nodes(tree).find((n) => n.type === "button");
  assert.ok(button, "Renew pass button");
  await button.props.onClick();
  assert.deepEqual(h.calls, []);
  checkbox.props.onChange({ target: { checked: true } });
  h.respond({ ok: true, data: { url: "https://checkout.stripe.com/c/pay/test" } });
  tree = h.render("pass");
  await nodes(tree).find((n) => n.type === "button").props.onClick();
  assert.deepEqual(h.calls, [["/api/pro/checkout", { method: "POST", body: { plan: "pass", consent: true } }]]);
  assert.deepEqual(h.navigations, ["https://checkout.stripe.com/c/pay/test"]);
});


test("account portal explains a missing Stripe subscription without navigating", async () => {
  const h = planHarness();
  h.respond({ ok: false, status: 404, error: "noStripeSub" });
  await nodes(h.render("stripe")).find((n) => n.type === "button").props.onClick();
  assert.deepEqual(h.navigations, []);
  assert.ok(renderToStaticMarkup(h.render("stripe")).includes("No card subscription found"));
});

test("account return polls server coverage every 3 seconds and stops when confirmed", async () => {
  const h = planHarness();
  const data = { licence: null };
  h.respond({ ok: true, data });
  h.account();
  const cleanups = h.effects.map((run) => run());
  await Promise.resolve();
  assert.equal(h.calls.filter((c: any) => c[0] === "/api/account").length, 1);
  await h.advance(3_000);
  assert.equal(h.calls.filter((c: any) => c[0] === "/api/account").length, 2);
  h.respond({ ok: true, data: { licence: { pro: { source: "stripe", until: "2026-12-01T00:00:00Z" } } } });
  await h.advance(3_000);
  assert.equal(h.timers.size, 0);
  assert.ok(nodes(h.account()).some((n) => n.props?.role === "status" && n.props.children === "Pro is ready to use."));
  for (const cleanup of cleanups) if (typeof cleanup === "function") cleanup();
});

test("account return stops after 60 seconds, shows refresh advice, and cleans up on unmount", async () => {
  for (const unmount of [false, true]) {
    const h = planHarness();
    h.respond({ ok: true, data: { licence: null } });
    h.account();
    const cleanups = h.effects.map((run) => run());
    await Promise.resolve();
    if (unmount) for (const cleanup of cleanups) if (typeof cleanup === "function") cleanup();
    await h.advance(60_000);
    assert.equal(h.timers.size, 0);
    assert.equal(h.calls.filter((c: any) => c[0] === "/api/account").length, 1);
    if (!unmount) assert.ok(nodes(h.account()).some((n) => n.props?.role === "status" && n.props.children.includes("Refresh your account later")));
  }
});


test("account return settles a hung initial request into a retry button at the deadline", async () => {
  const h = planHarness();
  h.respond(new Promise(() => {}));
  h.account();
  h.effects.forEach((run) => run());
  await h.advance(60_000);
  const tree = h.account();
  assert.ok(nodes(tree).some((n) => n.type === "button" && n.props.onClick && !n.props.disabled), "A retry must be available after the deadline");
  assert.equal(nodes(tree).some((n) => n.props?.className === "mt-10 flex justify-center text-graphite"), false);
});
