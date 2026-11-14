import type { DesktopApp } from "../app/apps-data.ts";
import type { AppPage } from "../app/app-pages-data.ts";
import { COPY } from "../app/copy.ts";
import { FAQ } from "../app/site-info.ts";

const copySchema = {
  type: "object",
  additionalProperties: false,
  required: ["metaDescription", "useCase", "faq"],
  properties: {
    metaDescription: { type: "string", minLength: 1, maxLength: 155 },
    useCase: { type: "string", minLength: 1 },
    faq: {
      type: "array", minItems: 3, maxItems: 4,
      items: {
        type: "object", additionalProperties: false, required: ["q", "a"],
        properties: { q: { type: "string", minLength: 1 }, a: { type: "string", minLength: 1 } },
      },
    },
  },
};

export const PAGE_COPY_SCHEMA = {
  type: "object", additionalProperties: false, required: ["th", "en"],
  properties: { th: copySchema, en: copySchema },
};

export function validatePageCopy(app: DesktopApp, page: AppPage | undefined): string[] {
  const errors: string[] = [];
  if (!page || typeof page !== "object" || Array.isArray(page)) return ["Page copy is missing or invalid"];

  function checkText(value: unknown, path: string) {
    if (typeof value !== "string" || !value.trim()) { errors.push(`${path} must be non-empty text`); return; }
    if (value.includes("|")) errors.push(`${path} must not contain |`);
    // Currency amounts only: feature counts (Windows 10, 2 PCs, tax forms) are allowed facts.
    const amounts = value.matchAll(/(?:฿|baht\b|บาท)\s*(\d[\d,]*(?:\.\d+)?)|(\d[\d,]*(?:\.\d+)?)\s*(?:฿|บาท|baht\b)/gi);
    for (const match of amounts) {
      const amount = Number((match[1] ?? match[2]).replaceAll(",", ""));
      if (app.price === undefined || amount !== app.price) errors.push(`${path} contains a price other than this app's own`);
    }
  }

  for (const lang of ["th", "en"] as const) {
    const copy = page[lang];
    if (!copy || typeof copy !== "object" || Array.isArray(copy)) { errors.push(`${lang} copy is missing or invalid`); continue; }
    checkText(copy.metaDescription, `${lang}.metaDescription`);
    if (typeof copy.metaDescription === "string" && copy.metaDescription.length > 155) errors.push(`${lang}.metaDescription must be at most 155 characters`);
    checkText(copy.useCase, `${lang}.useCase`);
    if (!Array.isArray(copy.faq)) { errors.push(`${lang}.faq must be an array`); continue; }
    if (copy.faq.length < 3 || copy.faq.length > 4) errors.push(`${lang}.faq must have 3–4 entries`);
    copy.faq.forEach((faq, i) => {
      checkText(faq?.q, `${lang}.faq[${i}].q`);
      checkText(faq?.a, `${lang}.faq[${i}].a`);
    });
  }
  if (Array.isArray(page.th?.faq) && Array.isArray(page.en?.faq) && page.th.faq.length !== page.en.faq.length) errors.push("TH and EN FAQ counts must match");
  return errors;
}

export function promptFor(app: DesktopApp): { system: string; user: string } {
  const paid = app.price !== undefined;
  const siteFacts = Object.fromEntries((["th", "en"] as const).map(lang => [lang, {
    ...(paid ? { paidSub: COPY[lang].paidSub } : { freeApps: FAQ[lang].at(-1) }),
    windows: COPY[lang].winOnly,
    install: { steps: paid ? [COPY[lang].dl.paidFirstStep, ...COPY[lang].dl.steps.slice(1)] : COPY[lang].dl.steps },
  }]));
  return {
    system: `Write Thai and English app page copy as the supplied JSON schema.
Use only the allowed facts above (no invented features, prices, platforms, integrations, counts).
Allowed facts = this app's apps-data.ts entry plus the supplied site-wide claims the site already publishes.
Free apps: free within limits, no ads, no account, works offline on Windows 10/11 (64-bit), data stays on the user's PC, optional PeerapoS Pro subscription lifts limits.
Paid apps: one-time price, free updates, no monthly fee, 2 PCs on the same LAN and 2 companies. Do not apply free-app claims to paid apps.
Install steps come from copy.ts dl. Pro may be named but never priced.
At least 2 of each app's FAQs must be about that app's own features (not site-wide facts), so pages don't share near-identical FAQs.
Never mention prices other than the app's own; free apps must not mention any currency amount.
Each FAQ answer opens with one direct sentence; questions phrased the way Thai SME owners search.
Thai register per kien-thai (no polite particles in UI copy, natural not translated).
EN is a faithful translation of the TH, with matching FAQ counts and order.
Write 3–4 FAQs in each language, a non-empty useCase, and metaDescription ≤ 155 chars. Never include | in any field.`,
    user: `Allowed app facts:\n${JSON.stringify(app, null, 2)}${paid ? `\nApp price: ฿${app.price!.toLocaleString("en-US")}` : ""}\nAllowed site-wide facts (only the applicable app tier):\n${JSON.stringify(siteFacts, null, 2)}`,
  };
}
