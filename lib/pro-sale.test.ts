import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import assert from "node:assert/strict";
import ts from "typescript";
import * as pro from "./pro.ts";
import { day } from "./account.ts";
import { checkoutNext } from "./buy.ts";
import { baht } from "./cart.ts";

const require = createRequire(import.meta.url);
function nodes(tree: any): any[] {
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  if (!tree || typeof tree !== "object") return [];
  return [tree, ...nodes(tree.props?.children)];
}
async function page(flag: unknown, lang = "en", member: "play" | "stripe" | "pass" | null = null, failed = false) {
  const states: unknown[] = [];
  let cursor = 0;
  const effects: (() => void)[] = [];
  const calls: string[] = [];
  const source = readFileSync(new URL("../app/pro/page.tsx", import.meta.url), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const exports: any = {};
  new Function("require", "exports", js)((id: string) => {
    if (id === "react") return {
      useState(initial: unknown) { const i = cursor++; if (!(i in states)) states[i] = initial; return [states[i], (v: unknown) => { states[i] = v; }]; },
      useEffect(fn: () => void) { effects.push(fn); },
    };
    if (id === "@/lib/pro.ts") return pro;
    if (id === "@/lib/account.ts") return { day };
    if (id === "@/lib/buy.ts") return { checkoutNext };
    if (id === "@/lib/cart.ts") return { baht };
    if (id === "@/lib/lang.ts") return { useLang: () => [lang, () => {}] };
    if (id === "@/lib/api.ts") return { api: async (path: string) => {
      calls.push(path);
      return path === "/api/catalogue" ? failed ? { ok: false, status: 0, error: "net" } : { ok: true, data: { pro: pro.PRO_PRICE, proOnSale: flag } }
        : { ok: true, data: { licence: member ? { pro: { source: member, until: "2099-01-01" } } : null } };
    } };
    if (id.startsWith("@/")) return () => null;
    return require(id);
  }, exports);
  const render = () => { cursor = 0; return nodes(exports.default()); };
  const initial = render();
  effects.splice(0).forEach(fn => fn());
  await Promise.resolve();
  return { initial, tree: render(), calls };
}
for (const flag of [undefined, false, "true", true]) {
  test(`Pro purchases require catalogue boolean true (${String(flag)})`, async () => {
    const { initial, tree } = await page(flag);
    assert.equal(initial.some(n => n.type === "input"), false, "fail closed before catalogue loads");
    assert.equal(tree.some(n => n.type === "input"), flag === true);
    assert.equal(tree.filter(n => n.type === "button").length, flag === true ? 3 : 0);
    assert.equal(tree.some(n => n.props?.href === pro.PLAY_URL), flag === true);
    assert.equal(JSON.stringify(tree).includes("PeerapoS Pro opens soon"), flag !== true);
    assert.ok(tree.some(n => n.props?.href === "/buy"), "paid-app link remains");
    assert.ok(JSON.stringify(tree).includes("What Pro gives you"));
  });
}
test("Pro opens soon uses exact Thai copy and fails closed on network failure", async () => {
  const { tree } = await page(undefined, "th", null, true);
  assert.ok(JSON.stringify(tree).includes("PeerapoS Pro เปิดให้สมัครเร็ว ๆ นี้"));
  assert.equal(tree.some(n => n.type === "input" || n.type === "button"), false);
});
test("existing Pro member retains account access while Pro sales are closed", async () => {
  for (const lang of ["th", "en"]) for (const source of ["play", "stripe", "pass"] as const) {
    const { tree } = await page(false, lang, source);
    assert.ok(tree.some(n => n.props?.href === "/account"));
    assert.ok(JSON.stringify(tree).includes(lang === "th" ? "คุณมี Pro อยู่แล้ว" : "You already have Pro"));
    assert.equal(tree.some(n => n.type === "input" || n.type === "button"), false);
  }
});
