"use client";

import { Phrases } from "@/components/Phrases";
import { useEffect, useState } from "react";
import Shell from "@/components/account/Shell";
import { PRO_PRICE, PRO_PASS, PRO_COPY, PRO_SOURCE_LABEL, proActive, proBuyError, type ProPlan } from "@/lib/pro.ts";
import Spinner from "@/components/account/Spinner";
import { api, type Catalogue, type Msg, type Licence, type ProInfo } from "@/lib/api.ts";
import { day } from "@/lib/account.ts";
import { checkoutNext } from "@/lib/buy.ts";
import { baht } from "@/lib/cart.ts";
import { useLang } from "@/lib/lang.ts";
import { PLAN_NAMES, PLAN_NOTES, PLAN_ROWS } from "@/lib/plans.ts";

// Picture tiles in the site's style: one flat shape per step, ink lines, indigo accent.
const P = { fill: "var(--color-sheet)", stroke: "var(--color-ink)", strokeWidth: 3, strokeLinejoin: "round" } as const;
const ACC = { fill: "var(--color-indigo)" };
const SOFT = { fill: "var(--color-indigo)", fillOpacity: 0.15 };
const PIC = [
  // a phone with a store bag
  <>
    <rect {...P} x="38" y="8" width="44" height="80" rx="8" />
    <rect {...SOFT} x="44" y="18" width="32" height="58" rx="3" />
    <path {...ACC} d="M52 40h16l-2 22h-12z" />
    <path d="M57 40c0-5 6-5 6 0" fill="none" stroke="var(--color-indigo)" strokeWidth="2.5" />
  </>,
  // a monitor with a linked check
  <>
    <rect {...P} x="14" y="10" width="92" height="62" rx="6" />
    <path d="M48 86h24M60 72v14" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
    <circle {...ACC} cx="60" cy="41" r="13" />
    <path d="M53 41l5 5 9-10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </>,
];

const PAY_PIC = {
  card: <>
    <rect {...P} x="14" y="18" width="92" height="60" rx="8" />
    <rect fill="var(--color-ink)" x="14" y="30" width="92" height="10" />
    <rect {...ACC} x="26" y="52" width="18" height="13" rx="3" />
    <rect {...SOFT} x="52" y="56" width="42" height="6" rx="3" />
  </>,
  qr: <>
    <rect {...P} x="30" y="8" width="60" height="80" rx="8" />
    {[[38, 26], [70, 26], [38, 58]].map(([x, y]) => (
      <g key={x + "-" + y}>
        <rect {...ACC} x={x} y={y} width="12" height="12" rx="2" />
        <rect fill="var(--color-sheet)" x={x + 3} y={y + 3} width="6" height="6" />
      </g>
    ))}
    <rect {...SOFT} x="56" y="28" width="5" height="5" />
    <rect {...ACC} x="57" y="43" width="5" height="5" />
    <rect {...SOFT} x="68" y="49" width="5" height="5" />
    <rect {...ACC} x="56" y="61" width="5" height="5" />
    <rect {...SOFT} x="75" y="62" width="5" height="5" />
  </>,
} as const;

/** One numbered picture step. Pictures lead on mobile and sit in a row on desktop. */
function Step({ n, pic, text }: { n: number; pic: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-4 rounded-2xl border border-line bg-sheet p-4 lg:flex-col lg:items-stretch lg:text-center">
      <svg viewBox="0 0 120 96" aria-hidden="true" focusable="false" className="w-24 shrink-0 rounded-xl bg-paper lg:mx-auto lg:w-full lg:max-w-[168px]">
        {pic}
      </svg>
      <p className="text-[1.0625rem] leading-snug">
        <b className="text-indigo">{n}.</b> <Phrases text={text} />
      </p>
    </li>
  );
}

/** /pro: public Pro information and signed-in website checkout. */
export default function ProPage() {
  const [lang, setLang] = useLang();
  const t = (key: Exclude<keyof typeof PRO_COPY, "steps" | "gets" | "facts">) => PRO_COPY[key][lang];
  const [proOnSale, setProOnSale] = useState(false);
  const [prices, setPrices] = useState<Catalogue["pro"] | null>(null);
  const [pro, setPro] = useState<ProInfo | null | undefined>(undefined);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState<ProPlan | null>(null);
  const [err, setErr] = useState<Msg | null>(null);

  async function loadPrices() {
    setErr(null);
    const r = await api<Catalogue>("/api/catalogue");
    setProOnSale(r.ok && r.data.proOnSale === true);
    if (r.ok) setPrices(r.data.pro);
    else setErr(proBuyError(r));
  }

  useEffect(() => {
    loadPrices();
    api<{ licence: Licence | null }>("/api/account").then((r) => setPro(r.ok ? r.data.licence?.pro ?? null : null));
  }, []);

  async function buy(plan: ProPlan) {
    if (busy || !prices || !proOnSale) return;
    setBusy(plan);
    setErr(null);
    const account = await api<{ licence: Licence | null }>("/api/account");
    if (!account.ok) {
      setBusy(null);
      if (account.status === 401) return location.assign("/login?next=/pro");
      return setErr(proBuyError(account));
    }
    if (!consent) {
      setBusy(null);
      return setErr(proBuyError({ ok: false, status: 400, error: "needConsent" }));
    }
    try { sessionStorage.setItem("pro:before", account.data.licence?.pro?.until ?? ""); } catch {}
    const r = await api<{ url?: unknown; status?: string }>("/api/pro/checkout", { method: "POST", body: { plan, consent: true } });
    setBusy(null);
    if (r.ok) {
      const next = checkoutNext(r.data);
      if (next.kind === "go") return location.assign(next.url);
      if (next.kind === "confirming") return location.assign("/account?pro=done");
      setErr(proBuyError({ ok: false, status: 502, error: "badCheckoutUrl" }));
    } else if (r.status === 401) return location.assign("/login?next=/pro");
    else setErr(proBuyError(r));
  }
  return (
    <Shell lang={lang} setLang={setLang}>
      <div className="mt-2 flex flex-col gap-8 lg:mt-6 lg:gap-10">
        <section className="flex flex-col gap-3">
          <h1 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight md:text-[2.75rem]">{t("h1")}</h1>
          <p className="text-lg text-graphite"><Phrases text={t("lead")} /></p>
          <p className="text-sm text-graphite"><Phrases text={t("updated")} /></p>
        </section>

        <section id="plans" aria-labelledby="plans-h" className="flex flex-col gap-3">
          <h2 id="plans-h" className="font-display text-xl font-bold">{t("plansH")}</h2>
          <ul className="grid gap-3 lg:hidden">
            {PLAN_NAMES.map((name, c) => (
              <li key={name.en} className="rounded-2xl border border-line bg-sheet p-4">
                <h3 className="font-display text-lg font-bold"><Phrases text={name[lang]} /></h3>
                <dl className="mt-2 flex flex-col gap-2.5">
                  {PLAN_ROWS.map((row) => (
                    <div key={row.label.en} className="flex flex-col gap-0.5">
                      <dt className="text-sm text-graphite"><Phrases text={row.label[lang]} /></dt>
                      <dd className="font-semibold"><Phrases text={row.cells[c][lang]} /></dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
          <div className="hidden overflow-x-auto rounded-2xl border border-line bg-sheet lg:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="p-4" />
                  {PLAN_NAMES.map((name) => (
                    <th key={name.en} scope="col" className="p-4 font-display text-lg font-bold"><Phrases text={name[lang]} /></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_ROWS.map((row) => (
                  <tr key={row.label.en} className="border-b border-line last:border-b-0">
                    <th scope="row" className="p-4 align-top text-sm font-semibold text-graphite"><Phrases text={row.label[lang]} /></th>
                    {row.cells.map((cell, c) => (
                      <td key={c} className="p-4 align-top"><Phrases text={cell[lang]} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-graphite"><Phrases text={PLAN_NOTES.devices[lang]} /></p>
          <p className="text-sm text-graphite">
            <a href={lang === "en" ? "/terms#account-en" : "/terms#account"} className="font-semibold text-indigo underline-offset-4 hover:underline"><Phrases text={PLAN_NOTES.deletion[lang]} /></a>
          </p>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-line bg-sheet p-5 lg:p-7" aria-labelledby="web-pro">
          {pro && proActive(pro, Date.now()) ? (
            <>
              <h2 id="web-pro" className="font-display text-xl font-bold">{t("activeH")}</h2>
              <p className="font-semibold text-graphite"><Phrases text={PRO_SOURCE_LABEL[pro.source][lang]} /></p>
              <p><Phrases text={t("activeUntil").replace("{date}", day(pro.until, lang)) + (pro.cancelling ? t("cancelled") : "")} /></p>
              <a href="/account" className="min-h-[52px] w-full rounded-xl border border-ink/25 px-6 py-3 text-center font-semibold sm:w-auto">{t("account")}</a>
            </>
          ) : !proOnSale ? (
            <p id="web-pro" className="text-graphite"><Phrases text={t("opensSoon")} /></p>
          ) : (
            <>
              <h2 id="web-pro" className="font-display text-xl font-bold">{t("webH")}</h2>
              <label className="flex min-h-12 items-center gap-3">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="size-5 shrink-0 accent-indigo" />
                <span>{t("accept")} <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo underline underline-offset-4">{t("terms")}</a></span>
              </label>
              <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
                <div role="group" aria-labelledby="pay-card" className="flex flex-col gap-3 rounded-xl border border-line bg-paper/60 p-4 lg:p-5">
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 120 96" className="w-16 shrink-0 rounded-lg bg-sheet" aria-hidden="true" focusable="false">{PAY_PIC.card}</svg>
                    <div>
                      <h3 id="pay-card" className="font-display text-lg font-bold">{t("cardH")}</h3>
                      <p className="text-sm text-graphite"><Phrases text={t("cardLead")} /></p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button type="button" onClick={() => buy("month")} disabled={busy !== null || !prices || pro === undefined}
                      className="flex min-h-[52px] flex-col gap-1 rounded-xl border-2 border-ink/15 bg-sheet px-5 py-4 text-left transition-colors hover:border-ink focus-visible:border-ink disabled:opacity-50 disabled:hover:border-ink/15">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-lg font-bold">{t("monthBuy")}</span>
                        <span className="flex items-center gap-2 font-display text-2xl font-extrabold tabular-nums">
                          {busy === "month" && <Spinner />}
                          {baht(prices?.monthly ?? PRO_PRICE.monthly)}
                          <small className="font-body text-[0.9375rem] font-medium text-graphite">{t("month")}</small>
                        </span>
                      </span>
                      <span className="text-sm text-graphite">{t("monthNote")}</span>
                    </button>
                    <button type="button" onClick={() => buy("year")} disabled={busy !== null || !prices || pro === undefined}
                      className="flex min-h-[52px] flex-col gap-1 rounded-xl border-2 border-ink/15 bg-sheet px-5 py-4 text-left transition-colors hover:border-ink focus-visible:border-ink disabled:opacity-50 disabled:hover:border-ink/15">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-lg font-bold">{t("yearBuy")}</span>
                        <span className="flex items-center gap-2 font-display text-2xl font-extrabold tabular-nums">
                          {busy === "year" && <Spinner />}
                          {baht(prices?.annual ?? PRO_PRICE.annual)}
                          <small className="font-body text-[0.9375rem] font-medium text-graphite">{t("year")}</small>
                        </span>
                      </span>
                      <span className="text-sm text-graphite">{t("yearNote")}</span>
                    </button>
                  </div>
                </div>
                <div role="group" aria-labelledby="pay-qr" className="flex flex-col gap-3 rounded-xl border border-line bg-paper/60 p-4 lg:p-5">
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 120 96" className="w-16 shrink-0 rounded-lg bg-sheet" aria-hidden="true" focusable="false">{PAY_PIC.qr}</svg>
                    <div>
                      <h3 id="pay-qr" className="font-display text-lg font-bold">{t("qrH")}</h3>
                      <p className="text-sm text-graphite"><Phrases text={t("qrLead")} /></p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button type="button" onClick={() => buy("passMonth")} disabled={busy !== null || !prices || pro === undefined}
                      className="flex min-h-[52px] flex-col gap-1 rounded-xl border-2 border-ink/15 bg-sheet px-5 py-4 text-left transition-colors hover:border-ink focus-visible:border-ink disabled:opacity-50 disabled:hover:border-ink/15">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-lg font-bold">{t("monthBuy")}</span>
                        <span className="flex items-center gap-2 font-display text-2xl font-extrabold tabular-nums">
                          {busy === "passMonth" && <Spinner />}
                          {baht(prices?.monthly ?? PRO_PRICE.monthly)}
                        </span>
                      </span>
                      <span className="text-sm text-graphite">{t("passMonthNote")}</span>
                    </button>
                    <button type="button" onClick={() => buy("pass")} disabled={busy !== null || !prices || pro === undefined}
                      className="flex min-h-[52px] flex-col gap-1 rounded-xl border-2 border-ink/15 bg-sheet px-5 py-4 text-left transition-colors hover:border-ink focus-visible:border-ink disabled:opacity-50 disabled:hover:border-ink/15">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-lg font-bold">{t("yearBuy")}</span>
                        <span className="flex items-center gap-2 font-display text-2xl font-extrabold tabular-nums">
                          {busy === "pass" && <Spinner />}
                          {baht(prices?.annual ?? PRO_PASS)}
                        </span>
                      </span>
                      <span className="text-sm text-graphite">{t("passNote")}</span>
                    </button>
                  </div>
                </div>
              </div>
              {!prices && err && <button type="button" onClick={loadPrices} className="min-h-[52px] w-full rounded-xl border border-ink/25 px-6 py-3 font-semibold sm:w-auto">{t("retry")}</button>}
              {err && <p role="alert" className="font-semibold text-red-700"><Phrases text={err[lang]} /></p>}
            </>
          )}
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-bold">{t("stepsH")}</h2>
          <ol className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-5">
            {PRO_COPY.steps.map((s, i) => (
              <Step key={i} n={i + 1} pic={PIC[i]} text={s[lang]} />
            ))}
          </ol>
        </section>

        <section className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-2xl border border-line bg-sheet p-5">
            <h2 className="mb-3 font-display text-xl font-bold">{t("getH")}</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              {PRO_COPY.gets.map((x) => (
                <li key={x.en}><Phrases text={x[lang]} /></li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-graphite"><Phrases text={t("existing")} /></p>
          </div>
          <div className="rounded-2xl border border-line bg-sheet p-5">
            <h2 className="mb-3 font-display text-xl font-bold">{t("factsH")}</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              {PRO_COPY.facts.map((x) => (
                <li key={x.en}><Phrases text={x[lang]} /></li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-graphite">
              <a href="/buy" className="font-semibold text-indigo underline-offset-4 hover:underline">{t("buyApps")}</a>
            </p>
          </div>
        </section>
      </div>
    </Shell>
  );
}
