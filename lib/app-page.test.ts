import { test } from "node:test";
import assert from "node:assert/strict";
import { APPS, PAID_APPS, shotUrls } from "../app/apps-data.ts";
import { APP_PAGES } from "../app/app-pages-data.ts";
import { SITE_URL } from "../app/site-info.ts";
import { appTitle, appJsonLd, isPlainClick } from "./app-page.ts";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import * as apps from "../app/apps-data.ts";
import * as copy from "../app/copy.ts";
import * as helpers from "./app-page.ts";

const wash = APPS[0];
const account = PAID_APPS.find(a => a.id === "account")!;

test("app title uses the Thai tagline without a trailing full stop", () => {
  assert.equal(appTitle(wash), "PeerapoS Wash — สมุดร้านซักรีดและร้านสะดวกซัก | PeerapoS");
  assert.equal(appTitle({ ...wash, th: { ...wash.th, tagline: "Laundry." } }), "PeerapoS Wash — Laundry | PeerapoS");
});

test("paid app JSON-LD identifies the app, purchase offer, bilingual FAQs and breadcrumbs", () => {
  const page = APP_PAGES.account;
  const data = appJsonLd(account, page);
  assert.equal(data["@context"], "https://schema.org");
  const [app, faq, breadcrumbs] = data["@graph"];
  assert.equal(app["@type"], "SoftwareApplication");
  assert.equal(app["@id"], `${SITE_URL}/apps/account#app`);
  assert.equal(app.url, `${SITE_URL}/apps/account`);
  assert.equal(app.name, account.name);
  assert.equal(app.description, `${account.th.tagline} ${account.en.tagline}`);
  assert.equal(app.applicationCategory, "BusinessApplication");
  assert.equal(app.operatingSystem, "Windows 10, Windows 11");
  assert.deepEqual(app.author, { "@id": `${SITE_URL}/#org` });
  assert.deepEqual(app.screenshot, shotUrls(account).map(path => `${SITE_URL}${path}`));
  assert.deepEqual(app.offers, {
    "@type": "Offer", price: "9990", priceCurrency: "THB",
    url: `${SITE_URL}/buy?app=account`, availability: "https://schema.org/InStock",
  });
  assert.ok(!("downloadUrl" in app));
  assert.equal(faq["@type"], "FAQPage");
  assert.equal(faq.mainEntity.length, page.th.faq.length * 2);
  assert.deepEqual(faq.mainEntity, [...page.th.faq, ...page.en.faq].map(({ q, a }) => ({
    "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a },
  })));
  assert.equal(breadcrumbs["@type"], "BreadcrumbList");
  assert.deepEqual(breadcrumbs.itemListElement, [
    { "@type": "ListItem", position: 1, name: "PeerapoS", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: account.name, item: `${SITE_URL}/apps/account` },
  ]);
});

test("free app JSON-LD has a zero THB offer and the existing download URL", () => {
  const [app] = appJsonLd(wash, APP_PAGES.wash)["@graph"];
  assert.deepEqual(app.offers, { "@type": "Offer", price: "0", priceCurrency: "THB" });
  assert.equal(app.downloadUrl, "https://dl.peerapongsm.dev/wash");
});

const plain = { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false };
test("only an unmodified left click opens the dialog", () => {
  assert.equal(isPlainClick(plain), true);
  for (const button of [1, 2]) assert.equal(isPlainClick({ ...plain, button }), false);
  for (const key of ["metaKey", "ctrlKey", "shiftKey", "altKey"] as const) {
    assert.equal(isPlainClick({ ...plain, [key]: true }), false, key);
  }
});

// Like app-pro.test.ts, execute real TSX with only framework boundaries stubbed.
const require = createRequire(import.meta.url);
function load(file: string, stubs: Record<string, unknown>) {
  const source = readFileSync(new URL(file, import.meta.url), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const exports: any = {};
  new Function("require", "exports", js)((id: string) => id in stubs ? stubs[id] : require(id), exports);
  return exports;
}

const clientStubs = {
  "react": { useState: (initial: unknown) => [initial, () => {}], useRef: () => ({ current: null }) },
  "next/image": { default: () => null },
  "@/app/apps-data": apps,
  "@/app/copy": copy,
  "@/app/app-pages-data": { APP_PAGES },
  "@/lib/app-page": helpers,
  "@/lib/lang": { useLang: () => ["th", () => {}] },
  "@/components/SiteHeader": { SiteHeader: () => null },
  "@/components/SiteFooter": { SiteFooter: () => null },
};
const { AppDetail } = load("../components/AppDetail.tsx", clientStubs);

function route(uat = false) {
  return load("../app/apps/[slug]/page.tsx", {
    "next/navigation": { notFound() { throw new Error("NOT_FOUND"); } },
    "@/app/apps-data": apps,
    "@/app/app-pages-data": { APP_PAGES },
    "@/app/site-info": { IS_UAT: uat },
    "@/lib/app-page": helpers,
    "./AppPageView": { default: () => null },
  });
}

test("route exports all 27 unique static params and rejects unknown slugs", async () => {
  const page = route();
  assert.equal(page.dynamicParams, false);
  const params = page.generateStaticParams();
  assert.deepEqual(params, apps.ALL_APPS.map(app => ({ slug: apps.slugOf(app) })));
  assert.equal(new Set(params.map((p: { slug: string }) => p.slug)).size, 27);
  const props = { params: Promise.resolve({ slug: "nope" }) };
  await assert.rejects(page.generateMetadata(props), /NOT_FOUND/);
  await assert.rejects(page.default(props), /NOT_FOUND/);
});

test("metadata uses each app's Thai copy, canonical URL and screenshot or fallback", async () => {
  for (const app of apps.ALL_APPS) {
    const slug = apps.slugOf(app);
    const metadata = await route().generateMetadata({ params: Promise.resolve({ slug }) });
    assert.equal(metadata.title, appTitle(app));
    assert.equal(metadata.description, APP_PAGES[slug].th.metaDescription);
    assert.equal(metadata.alternates.canonical, `/apps/${slug}`);
    assert.equal(metadata.openGraph.url, `/apps/${slug}`);
    assert.deepEqual(metadata.openGraph.images, [shotUrls(app)[0] ?? "/og.jpg"]);
  }
});

test("route emits JSON-LD only in prod and escapes less-than like the root layout", async () => {
  const props = { params: Promise.resolve({ slug: "wash" }) };
  const original = APP_PAGES.wash.th.faq[0].a;
  try {
    APP_PAGES.wash.th.faq[0].a = "</script><script>alert(1)</script>";
    const html = renderToStaticMarkup(await route().default(props));
    assert.match(html, /application\/ld\+json/);
    assert.ok(html.includes("\\u003c/script>"));
    const data = JSON.parse(html.match(/<script[^>]*>([\s\S]*?)<\/script>/)![1]);
    assert.equal(data["@graph"][1].mainEntity[0].acceptedAnswer.text, APP_PAGES.wash.th.faq[0].a);
    assert.doesNotMatch(renderToStaticMarkup(await route(true).default(props)), /application\/ld\+json/);
  } finally {
    APP_PAGES.wash.th.faq[0].a = original;
  }
});

test("app views render H1, use case, every FAQ answer and back link in both languages", () => {
  for (const lang of ["th", "en"] as const) {
    const { default: View } = load("../app/apps/[slug]/AppPageView.tsx", {
      ...clientStubs,
      "@/lib/lang": { useLang: () => [lang, () => {}] },
      "@/components/AppDetail": { AppDetail },
    });
    for (const app of [wash, account]) {
      const slug = apps.slugOf(app);
      const html = renderToStaticMarkup(createElement(View, { slug }));
      assert.match(html, new RegExp(`<h1[^>]*>${app.name}`));
      for (const text of [APP_PAGES[slug][lang].useCase, ...APP_PAGES[slug][lang].faq.flatMap(({ q, a }) => [q, a])]) {
        assert.ok(html.includes(renderToStaticMarkup(createElement("p", null, text)).slice(3, -4)), text);
      }
      assert.ok(html.includes(`href="/#apps"`));
      assert.ok(html.includes(copy.COPY[lang].heroApps));
      assert.ok(!html.includes(copy.COPY[lang].dl.details));
      const dialog = renderToStaticMarkup(createElement(AppDetail, { app, lang, onClose() {} }));
      assert.ok(dialog.includes(`href="/apps/${slug}"`));
      assert.ok(dialog.includes(copy.COPY[lang].dl.details));
    }
  }
});

test("all homepage tiles and cards retain navigation except on plain left clicks", () => {
  let opened = 0;
  let selected = "";
  const { default: Home } = load("../app/page.tsx", {
    ...clientStubs,
    "react": {
      useState: () => [null, (name: string) => { selected = name; }],
      useRef: () => ({ current: { showModal() { opened++; } } }),
    },
    "./apps-data": apps,
    "./copy": copy,
    "./site-info": { FAQ: { th: [], en: [] } },
    "@/components/AppDetail": { AppDetail },
  });
  const links: ReactElement<any>[] = [];
  function walk(node: any) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (typeof node.type === "function") { walk(node.type(node.props)); return; }
    if (node.type === "a" && node.props["aria-haspopup"] === "dialog") links.push(node);
    walk(node.props?.children);
  }
  walk(Home());
  assert.equal(links.length, 47); // 20 hero tiles + 20 free cards + 7 paid cards.
  assert.equal(new Set(links.map(link => link.props.href)).size, 27);
  for (const link of links) {
    let prevented = false;
    link.props.onClick({ ...plain, preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
    assert.equal(apps.appBySlug(link.props.href.split("/").pop())?.name, selected);
    const before = opened;
    for (const change of [{ button: 1 }, { ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }]) {
      prevented = false;
      link.props.onClick({ ...plain, ...change, preventDefault() { prevented = true; } });
      assert.equal(prevented, false);
      assert.equal(opened, before);
    }
  }
  assert.equal(opened, links.length);
});
