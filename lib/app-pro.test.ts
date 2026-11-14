import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import * as apps from "../app/apps-data.ts";
import * as copy from "../app/copy.ts";

const all = [...apps.APPS, ...apps.PAID_APPS];
const require = createRequire(import.meta.url);
const source = readFileSync(new URL("../components/AppDetail.tsx", import.meta.url), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;

function dialog(app: apps.DesktopApp, lang: "th" | "en") {
  const exports: any = {};
  new Function("require", "exports", js)((id: string) => {
    if (id === "react") return {
      useState(initial: unknown) { return [initial, () => {}]; },
      useRef: () => ({ current: null }), useEffect() {},
    };
    if (id === "@/app/apps-data") return apps;
    if (id === "@/app/copy") return copy;
    if (id === "next/image") return { default: () => null };
    return require(id);
  }, exports);
  const html = renderToStaticMarkup(createElement("dialog", null, createElement(exports.AppDetail, { app, lang, onClose() {}, headingId: "dl-title", headingLevel: 2 })));
  const match = html.match(/<dialog[^>]*>([\s\S]*?)<\/dialog>/);
  assert.ok(match, app.name);
  return match[1];
}

test("all 27 desktop apps are covered (20 free, 7 paid)", () => {
  assert.equal(apps.APPS.length, 20);
  assert.equal(apps.PAID_APPS.length, 7);
});

for (const app of all) for (const lang of ["th", "en"] as const) {
  test(`${app.name} (${lang}): Pro items render directly before install`, () => {
    const items = (app[lang] as any).pro;
    assert.ok(Array.isArray(items) && items.length > 0, "each app needs translated Pro items");
    for (const item of items) {
      assert.ok(typeof item === "string" && item.trim());
      assert.doesNotMatch(item, /฿|2,990|299|document signing|เซ็นเอกสาร|ลงนามเอกสาร/i);
    }
    const html = dialog(app, lang);
    const heading = lang === "th" ? "ฟีเจอร์ Pro" : "Pro features";
    const at = html.indexOf(`>${heading}</h3>`);
    assert.ok(at >= 0, "Pro heading is rendered");
    for (const item of items) assert.ok(html.slice(at).includes(renderToStaticMarkup(createElement("li", null, item))));
    const proEnd = html.indexOf('</section>', at);
    assert.ok(proEnd > at);
    assert.match(html.slice(at, proEnd), /href="\/pro"/);
    assert.ok(html.slice(at, proEnd).includes(lang === "th" ? "ดูราคาและสมัคร Pro" : "See Pro pricing"));
    const next = html.slice(proEnd + '</section>'.length);
    assert.match(next, new RegExp(`^<h3[^>]*>${copy.COPY[lang].dl.guideTitle}</h3>`));
    if (app.price !== undefined) assert.ok(next.includes(copy.COPY[lang].dl.paidFirstStep));
  });
}
