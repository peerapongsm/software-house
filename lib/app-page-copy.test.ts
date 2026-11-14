import { test } from "node:test";
import assert from "node:assert/strict";
import { ALL_APPS, APPS, PAID_APPS, slugOf, appBySlug, downloadUrl, shotUrls } from "../app/apps-data.ts";
import { APP_PAGES, type AppPage } from "../app/app-pages-data.ts";
import { validatePageCopy, promptFor, PAGE_COPY_SCHEMA } from "./app-page-copy.ts";

const fixture = (): AppPage => {
  const copy = () => ({ metaDescription: "a".repeat(60), useCase: "Track laundry orders.", faq: Array.from({ length: 3 }, () => ({ q: "Track orders?", a: "Track laundry orders and pickup dates." })) });
  return { th: copy(), en: copy() };
};
const account = PAID_APPS.find(a => a.id === "account")!;

test("slug helpers cover all 27 apps uniquely and preserve asset URLs", () => {
  assert.equal(ALL_APPS.length, 27);
  assert.equal(new Set(ALL_APPS.map(slugOf)).size, 27);
  assert.equal(slugOf(APPS[0]), "wash");
  for (const app of PAID_APPS) assert.equal(app.id, slugOf(app));
  for (const app of ALL_APPS) assert.equal(appBySlug(slugOf(app)), app);
  assert.equal(appBySlug("nope"), undefined);
  assert.equal(downloadUrl(APPS[0]), "https://dl.peerapongsm.dev/wash");
  assert.equal(shotUrls(APPS[0])[0], "/apps/shots/wash-1.webp");
});

test("valid bilingual copy passes", () => assert.deepEqual(validatePageCopy(APPS[0], fixture()), []));
test("missing copy fails", () => assert.ok(validatePageCopy(APPS[0], undefined).length));
test("Thai full stop fails; Thai abbreviations pass", () => {
  const bad = fixture();
  bad.th.faq[0].a = "ใช้ได้ในโปรแกรมเดียว. PeerapoS Wash ช่วยได้";
  assert.ok(validatePageCopy(APPS[0], bad).length);
  const ok = fixture();
  ok.th.faq[0].a = "ทำ ภ.พ.30 และ ภ.ง.ด.3 ได้";
  assert.deepEqual(validatePageCopy(APPS[0], ok), []);
});

for (const [name, mutate] of [
  ["2 FAQs", (p: AppPage) => { p.th.faq.pop(); }],
  ["5 FAQs", (p: AppPage) => { p.th.faq.push(...p.en.faq.slice(0, 2)); p.en.faq.push(...p.en.faq.slice(0, 2)); }],
  ["mismatched FAQ counts", (p: AppPage) => { p.en.faq.push(p.en.faq[0]); }],
  ["empty question", (p: AppPage) => { p.th.faq[0].q = " "; }],
  ["empty answer", (p: AppPage) => { p.en.faq[0].a = ""; }],
  ["long metadata", (p: AppPage) => { p.th.metaDescription = "a".repeat(161); }],
  ["empty use case", (p: AppPage) => { p.en.useCase = " "; }],
] as const) test(`rejects ${name}`, () => {
  const page = fixture(); mutate(page);
  assert.ok(validatePageCopy(APPS[0], page).length);
});

for (const lang of ["th", "en"] as const) for (const field of ["metaDescription", "useCase", "q", "a"] as const) {
  test(`rejects pipe in ${lang}.${field}`, () => {
    const page = fixture();
    if (field === "q" || field === "a") page[lang].faq[0][field] += "|";
    else page[lang][field] += "|";
    assert.ok(validatePageCopy(APPS[0], page).length);
  });
}

for (const amount of ["฿9,990", "9,990 บาท", "9,990 baht", "baht 9990", "฿0", "9,990฿"]) {
  test(`free apps reject ${amount}`, () => {
    const page = fixture(); page.th.useCase = amount;
    assert.ok(validatePageCopy(APPS[0], page).length);
  });
}
for (const [amount, valid] of [["฿9,990", true], ["9,990 บาท", true], ["9990 baht", true], ["9,990฿", true], ["฿2,990", false], ["2,990 บาท", false], ["2990 baht", false], ["2,990฿", false], ["฿9,990.50", false]] as const) {
  test(`account price ${amount}: ${valid}`, () => {
    const page = fixture(); page.en.faq[0].a = amount;
    assert.equal(validatePageCopy(account, page).length === 0, valid);
  });
}

test("four FAQs and 155-character metadata pass; 156 characters fail", () => {
  const page = fixture();
  for (const lang of ["th", "en"] as const) { page[lang].faq.push(page[lang].faq[0]); page[lang].metaDescription = "a".repeat(155); }
  assert.deepEqual(validatePageCopy(APPS[0], page), []);
  page.en.metaDescription += "a";
  assert.ok(validatePageCopy(APPS[0], page).length);
});

test("prompt includes app facts and only the applicable site facts", () => {
  for (const app of ALL_APPS) {
    const { user, system } = promptFor(app);
    assert.ok(user.includes(app.th.tagline));
    for (const feature of app.th.features) assert.ok(user.includes(feature));
    if (app.price !== undefined) assert.ok(user.includes(`฿${app.price.toLocaleString("en-US")}`));
    else assert.ok(!user.includes("฿"));
    assert.ok(system.includes("At least 2"));
  }
});

test("schema requires every field and disallows extra properties", () => {
  assert.equal(PAGE_COPY_SCHEMA.additionalProperties, false);
  assert.deepEqual(PAGE_COPY_SCHEMA.required, ["th", "en"]);
  for (const copy of Object.values(PAGE_COPY_SCHEMA.properties)) {
    assert.equal(copy.additionalProperties, false);
    assert.deepEqual(copy.required, ["metaDescription", "useCase", "faq"]);
    assert.equal(copy.properties.faq.items.additionalProperties, false);
    assert.deepEqual(copy.properties.faq.items.required, ["q", "a"]);
  }
});

test("APP_PAGES covers every app with valid copy and no extra slugs", { skip: Object.keys(APP_PAGES).length === 0 }, () => {
  assert.deepEqual(Object.keys(APP_PAGES).sort(), ALL_APPS.map(slugOf).sort());
  for (const app of ALL_APPS) assert.deepEqual(validatePageCopy(app, APP_PAGES[slugOf(app)]), [], slugOf(app));
});
