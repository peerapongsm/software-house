import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { splitPhrases } from "./phrases.ts";
import * as plans from "./plans.ts";

// Render the real pages and phrase component; node --test cannot load TSX.
export function legalArticle(page: "terms" | "privacy", lang: "th" | "en") {
  const require = createRequire(import.meta.url);
  function compile(path: string, resolve: typeof require) {
    const source = readFileSync(new URL(path, import.meta.url), "utf8");
    const js = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    const exports: any = {};
    new Function("require", "exports", js)(resolve, exports);
    return exports;
  }
  const phrases = compile("../components/Phrases.tsx", ((id: string) =>
    id === "@/lib/phrases" ? { splitPhrases } : require(id)) as typeof require);
  const component = compile(`../app/${page}/page.tsx`, ((id: string) =>
    id === "@/components/Phrases" ? phrases : id === "@/lib/plans.ts" ? plans : require(id)) as typeof require);
  const html = renderToStaticMarkup(createElement(component.default));
  const match = html.match(new RegExp(`<article lang="${lang}"[^>]*>([\\s\\S]*?)</article>`));
  assert.ok(match, `${page} has a ${lang} article`);
  return {
    html: match[1],
    text: match[1].replace(/<\/(?:p|li|h\d)>/g, " ").replace(/<[^>]+>/g, "").replace(/&#x27;/g, "'").replace(/&gt;/g, ">"),
  };
}
