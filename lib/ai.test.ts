import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AiCard from "../components/account/AiCard.ts";
import { grantOrigin, grantSince, scopeText, verifiedDomain, type Grant } from "./ai.ts";

const G: Grant = { id: "g1", client: "Claude", scopes: ["peerapos.read"], createdAt: "2026-11-04T03:00:00.000Z", expiresAt: null };

const card = (grants: Grant[] | null, lang: "th" | "en" = "th") =>
  renderToStaticMarkup(h(AiCard, { lang, grants, revoking: null, err: null, onRevoke: () => {}, spin: null }));

test("verifiedDomain: only the host of an https client id", () => {
  assert.equal(verifiedDomain("https://claude.ai/oauth/metadata.json"), "claude.ai");
  assert.equal(verifiedDomain("http://claude.ai/m.json"), null);
  assert.equal(verifiedDomain("0f3Kq9a2Zx"), null);
  assert.equal(verifiedDomain(undefined), null);
});

test("grantOrigin: the verified domain, else the name is the app's own word", () => {
  assert.deepEqual(grantOrigin({ ...G, clientId: "https://claude.ai/m.json" }), { th: "เผยแพร่โดย claude.ai", en: "Published by claude.ai" });
  assert.deepEqual(grantOrigin({ ...G, clientId: "0f3Kq9a2Zx" }), { th: "ชื่อที่แอปแจ้งเอง", en: "Name given by the app itself" });
  assert.deepEqual(grantOrigin(G), { th: "ชื่อที่แอปแจ้งเอง", en: "Name given by the app itself" });
});

test("scopeText and grantSince: read, or read and drafts; the day it was connected", () => {
  assert.deepEqual(scopeText(["peerapos.read"]), { th: "อ่านข้อมูล", en: "Read" });
  assert.deepEqual(scopeText(["peerapos.read", "peerapos.draft"]), { th: "อ่านข้อมูล และสร้างร่าง", en: "Read and create drafts" });
  assert.deepEqual(grantSince(G), { th: "เชื่อมเมื่อ 4 พ.ย. 2569", en: "Connected 4 Nov 2026" });
});

test("AI card: an empty list says so, in Thai and English", () => {
  assert.match(card([]), /AI ที่เชื่อมต่อ/);
  assert.match(card([]), /ยังไม่มี AI ที่เชื่อมต่อ/);
  assert.match(card([], "en"), /No AI connected yet/);
  assert.doesNotMatch(card(null), /ยังไม่มี AI/);
});

test("AI card: a client name is text, never markup", () => {
  const html = card([{ ...G, client: "<b>x</b>" }]);
  assert.match(html, /&lt;b&gt;x&lt;\/b&gt;/);
  assert.doesNotMatch(html, /<b>x/);
  assert.match(html, /ตัดการเชื่อมต่อ/);
  assert.match(html, /ชื่อที่แอปแจ้งเอง/);
});
