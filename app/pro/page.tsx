"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/account/Shell";
import { PLAY_URL, PRO_PRICE, PRO_PASS, PRO_COPY, proBuyError, type ProPlan } from "@/lib/pro.ts";
import Spinner from "@/components/account/Spinner";
import { api, type Catalogue, type Msg, type Licence } from "@/lib/api.ts";
import { checkoutNext } from "@/lib/buy.ts";
import { baht } from "@/lib/cart.ts";
import { useLang } from "@/lib/lang.ts";

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
  // a phone with a sign-in card and a check
  <>
    <rect {...P} x="38" y="8" width="44" height="80" rx="8" />
    <circle {...SOFT} cx="60" cy="34" r="9" />
    <rect {...SOFT} x="46" y="50" width="28" height="12" rx="6" />
    <circle {...ACC} cx="60" cy="72" r="7" />
    <path d="M56.5 72l2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
  </>,
  // a monitor with a linked check
  <>
    <rect {...P} x="14" y="10" width="92" height="62" rx="6" />
    <path d="M48 86h24M60 72v14" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
    <circle {...ACC} cx="60" cy="41" r="13" />
    <path d="M53 41l5 5 9-10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </>,
];

/** One numbered picture step. Pictures lead on mobile and sit in a row on desktop. */
function Step({ n, pic, text }: { n: number; pic: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-4 rounded-2xl border border-line bg-sheet p-4 lg:flex-col lg:items-stretch lg:text-center">
      <svg viewBox="0 0 120 96" aria-hidden="true" focusable="false" className="w-24 shrink-0 rounded-xl bg-paper lg:mx-auto lg:w-full lg:max-w-[168px]">
        {pic}
      </svg>
      <p className="text-[1.0625rem] leading-snug">
        <b className="text-indigo">{n}.</b> {text}
      </p>
    </li>
  );
}

/** /pro: public Pro information, Google Play and signed-in web checkout. */
export default function ProPage() {
  const [lang, setLang] = useLang();
  const t = (key: Exclude<keyof typeof PRO_COPY, "steps" | "gets" | "facts">) => PRO_COPY[key][lang];
  const [prices, setPrices] = useState<Catalogue["pro"] | null>(null);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState<ProPlan | null>(null);
  const [err, setErr] = useState<Msg | null>(null);

  async function loadPrices() {
    setErr(null);
    const r = await api<Catalogue>("/api/catalogue");
    if (r.ok) setPrices(r.data.pro);
    else setErr(proBuyError(r));
  }

  useEffect(() => { loadPrices(); }, []);

  async function buy(plan: ProPlan) {
    if (busy || !prices) return;
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
        <section className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight md:text-[2.75rem]">{t("h1")}</h1>
            <p className="text-lg text-graphite">{t("lead")}</p>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-sheet p-5">
            <h2 className="font-display text-xl font-bold">{t("playH")}</h2>
            <p className="font-display text-[2.5rem] font-extrabold leading-none tracking-tight tabular-nums">
              {baht(PRO_PRICE.monthly)}{" "}
              <small className="font-body text-[0.9375rem] font-medium tracking-normal text-graphite">{t("month")}</small>
            </p>
            <p className="font-display text-xl font-bold tabular-nums">
              {baht(PRO_PRICE.annual)} <small className="font-body text-[0.9375rem] font-medium text-graphite">{t("year")}</small>
            </p>
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-deep"
            >
              {t("get")}
            </a>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-line bg-sheet p-5" aria-labelledby="web-pro">
          <h2 id="web-pro" className="font-display text-xl font-bold">{t("webH")}</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {(["month", "year", "pass"] as const).map((plan) => (
              <button key={plan} type="button" onClick={() => buy(plan)} disabled={busy !== null || !prices}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 whitespace-normal rounded-xl bg-ink px-6 py-3 text-center font-semibold text-white transition-colors [overflow-wrap:anywhere] hover:bg-indigo-deep disabled:opacity-50 sm:w-auto">
                {busy === plan && <Spinner />}
                <span>{t(plan === "month" ? "monthBuy" : plan === "year" ? "yearBuy" : "passBuy")} {prices && baht(plan === "month" ? prices.monthly : plan === "year" ? prices.annual : PRO_PASS)} ({t(plan === "pass" ? "passNote" : "card")})</span>
              </button>
            ))}
          </div>
          <p className="text-sm text-graphite">{t("renewNote")}</p>
          <label className="flex min-h-12 items-center gap-3">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="size-5 shrink-0 accent-indigo" />
            <span>{t("accept")} <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo underline underline-offset-4">{t("terms")}</a></span>
          </label>
          {!prices && err && <button type="button" onClick={loadPrices} className="min-h-[52px] w-full rounded-xl border border-ink/25 px-6 py-3 font-semibold sm:w-auto">{t("retry")}</button>}
          {err && <p role="alert" className="font-semibold text-red-700">{err[lang]}</p>}
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-bold">{t("stepsH")}</h2>
          <ol className="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-5">
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
                <li key={x.en}>{x[lang]}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-sheet p-5">
            <h2 className="mb-3 font-display text-xl font-bold">{t("factsH")}</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              {PRO_COPY.facts.map((x) => (
                <li key={x.en}>{x[lang]}</li>
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
