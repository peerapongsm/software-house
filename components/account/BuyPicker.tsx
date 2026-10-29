"use client";

import Image from "next/image";
import { APPS } from "@/app/apps-data";
import Tile from "@/components/account/Tile";
import type { Catalogue, Licence } from "@/lib/api.ts";
import { maxActive, perMonth } from "@/lib/buy.ts";
import { baht, type Selection } from "@/lib/cart.ts";
import type { Lang } from "@/lib/lang.ts";

const FREE = APPS.map((a) => ({ slug: a.icon.slice("/apps/".length, -".png".length), name: a.name.replace(/^PeerapoS /, "") }));

/** "wholesale" → "Wholesale": the paid apps' short names. */
export const appName = (slug: string) => slug[0].toUpperCase() + slug.slice(1);

const COPY = {
  th: {
    want: "ต้องการอะไร",
    kindTier: "สมัคร Pro หรือ Max",
    kindApp: "ซื้อแอป",
    period: "รอบบิล",
    m: "รายเดือน",
    y: "รายปี",
    free2: "ฟรี 2 เดือน",
    perM: "/ เดือน",
    perY: (p: string) => `/ ปี · ตกเดือนละ ${p}`,
    proHint: `ฟีเจอร์ Pro ในแอปฟรีทั้ง ${FREE.length} ตัว`,
    maxHint: "ฟีเจอร์ Pro ในทุกแอป ทั้งแอปฟรี และแอปเสียเงินที่ซื้อไว้หรือจะซื้อทีหลัง",
    plus: `+ แอปฟรีทั้ง ${FREE.length} ตัว`,
    hasMax: "มี Max อยู่แล้ว",
    apps: "แอป",
    owned: "ซื้อแล้ว",
    addMax: "เพิ่ม PeerapoS Max",
    addMaxHint: "ฟีเจอร์ Pro ในทุกแอป รวมแอปที่เลือกด้วย",
  },
  en: {
    want: "What do you want?",
    kindTier: "Subscribe to Pro or Max",
    kindApp: "Buy app",
    period: "Billing",
    m: "Monthly",
    y: "Annual",
    free2: "2 months free",
    perM: "/ month",
    perY: (p: string) => `/ year · ${p} a month`,
    proHint: `Pro features in all ${FREE.length} free apps.`,
    maxHint: "Pro features in every app: all free apps and the paid apps you buy, now or later.",
    plus: `+ all ${FREE.length} free apps`,
    hasMax: "You have Max",
    apps: "Apps",
    owned: "Owned",
    addMax: "Add PeerapoS Max",
    addMaxHint: "Pro features in every app, including the ones you pick here.",
  },
};

type T = (typeof COPY)["th"] | (typeof COPY)["en"];

function Period({ t, period, onChange }: { t: T; period: "m" | "y"; onChange: (p: "m" | "y") => void }) {
  return (
    <div role="group" aria-label={t.period} className="inline-flex self-start rounded-full border border-line bg-sheet p-[3px]">
      {(["m", "y"] as const).map((p) => (
        <button
          key={p}
          type="button"
          aria-pressed={period === p}
          onClick={() => onChange(p)}
          className={`min-h-10 whitespace-nowrap rounded-full px-[18px] py-2 font-semibold transition-colors ${period === p ? "bg-ink text-white" : "text-graphite hover:text-ink"}`}
        >
          {t[p]}
          {p === "y" && (
            <span className={`ml-1.5 rounded-full px-2 py-px text-xs font-bold text-indigo ${period === p ? "bg-white" : "bg-indigo/10"}`}>{t.free2}</span>
          )}
        </button>
      ))}
    </div>
  );
}

function Price({ t, tier, period, small }: { t: T; tier?: Catalogue["tiers"][number]; period: "m" | "y"; small?: boolean }) {
  if (!tier) return null;
  return (
    <p className={`font-display font-extrabold leading-none tracking-tight tabular-nums ${small ? "text-xl" : "text-[1.75rem]"}`}>
      {baht(period === "m" ? tier.monthly : tier.annual)}{" "}
      <small className="font-body text-[0.9375rem] font-medium tracking-normal text-graphite">
        {period === "m" ? t.perM : t.perY(baht(perMonth(tier.annual)))}
      </small>
    </p>
  );
}

/** Round tick for a radio card, rounded square for a checkbox card. */
function Tick({ on, box }: { on: boolean; box?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-6 shrink-0 place-items-center border-2 ${box ? "rounded-md" : "rounded-full"} ${on ? "border-ink bg-ink" : "border-line"}`}
    >
      {on && (
        <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 6.5l2.5 2.5 4.5-5.5" />
        </svg>
      )}
    </span>
  );
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-[0.8125rem] font-bold text-green-700">{children}</span>
);

const edge = (on: boolean) => `rounded-2xl border-2 bg-sheet ${on ? "border-ink shadow-[0_0_0_1px_var(--color-ink)]" : "border-line"}`;
const card = (on: boolean) => `${edge(on)} flex h-full flex-col gap-3 p-[18px]`;
const focusRing = "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-indigo rounded-2xl";

/** Left column of /buy: what to buy. The order box reads the same selection. */
export default function BuyPicker({
  lang,
  cat,
  lic,
  sel,
  onSel,
  now,
}: {
  lang: Lang;
  cat: Catalogue;
  lic: Licence | null;
  sel: Selection;
  onSel: (s: Selection) => void;
  now: number;
}) {
  const t = COPY[lang];
  const hasMax = maxActive(lic, now);
  const owned = new Set(lic?.apps ?? []);
  const tier = (id: "pro" | "max") => cat.tiers.find((x) => x.id === id);
  const set = (p: Partial<Selection>) => onSel({ ...sel, ...p });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="kind" className="mb-1.5 block font-semibold">{t.want}</label>
        <div className="relative">
          <select
            id="kind"
            value={sel.kind}
            onChange={(e) => set({ kind: e.target.value as Selection["kind"] })}
            className="min-h-12 w-full appearance-none rounded-xl border border-line bg-sheet py-2.5 pl-3.5 pr-10 font-semibold focus:border-ink focus:outline-none focus:ring-[3px] focus:ring-indigo/25"
          >
            <option value="tier">{t.kindTier}</option>
            <option value="app">{t.kindApp}</option>
          </select>
          <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-[18px] -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </div>

      {sel.kind === "tier" ? (
        <>
          <Period t={t} period={sel.period} onChange={(period) => set({ period })} />
          <div role="radiogroup" aria-label="PeerapoS Pro / Max" className="grid gap-3.5 lg:grid-cols-2">
            {tier("pro") && (
              <label className={`relative block ${hasMax ? "cursor-default" : "cursor-pointer"} ${focusRing}`}>
                <input
                  type="radio"
                  name="tier"
                  value="pro"
                  checked={sel.tier === "pro"}
                  disabled={hasMax}
                  onChange={() => set({ tier: "pro" })}
                  className="sr-only"
                />
                <div className={card(sel.tier === "pro" && !hasMax)}>
                  <span className="absolute right-4 top-4">{hasMax ? <Pill>{t.hasMax}</Pill> : <Tick on={sel.tier === "pro"} />}</span>
                  <div className={`flex flex-col gap-3 ${hasMax ? "opacity-55" : ""}`}>
                    <p className="pr-8 font-display text-xl font-bold leading-tight">PeerapoS Pro</p>
                    <Price t={t} tier={tier("pro")} period={sel.period} />
                  </div>
                  <p className="text-sm text-graphite">{t.proHint}</p>
                  <ul className="grid grid-cols-5 gap-x-1 gap-y-2.5">
                    {FREE.map((a) => (
                      <li key={a.slug}>
                        <Tile slug={a.slug} name={a.name} />
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
            )}
            {tier("max") && (
              <label className={`relative block cursor-pointer ${focusRing}`}>
                <input type="radio" name="tier" value="max" checked={sel.tier === "max"} onChange={() => set({ tier: "max" })} className="sr-only" />
                <div className={card(sel.tier === "max")}>
                  <span className="absolute right-4 top-4">
                    <Tick on={sel.tier === "max"} />
                  </span>
                  <p className="pr-8 font-display text-xl font-bold leading-tight">PeerapoS Max</p>
                  <Price t={t} tier={tier("max")} period={sel.period} />
                  <p className="text-sm text-graphite">{t.maxHint}</p>
                  <ul className="grid grid-cols-5 gap-x-1 gap-y-2.5">
                    {cat.apps.map((a) => (
                      <li key={a.id}>
                        <Tile slug={a.id} name={appName(a.id)} />
                      </li>
                    ))}
                  </ul>
                  <p className="self-start rounded-full bg-paper px-3.5 py-1 text-[0.9375rem] font-bold text-graphite">{t.plus}</p>
                </div>
              </label>
            )}
          </div>
        </>
      ) : (
        <>
          <div role="group" aria-label={t.apps} className="grid gap-3.5 lg:grid-cols-2">
            {cat.apps.map((a) => {
              const own = owned.has(a.id);
              const on = !own && sel.apps.includes(a.id);
              return (
                <label key={a.id} className={`relative block ${own ? "cursor-default" : "cursor-pointer"} ${focusRing}`}>
                  <input
                    type="checkbox"
                    checked={on}
                    disabled={own}
                    onChange={() => set({ apps: on ? sel.apps.filter((x) => x !== a.id) : [...sel.apps, a.id] })}
                    className="sr-only"
                  />
                  <div className={`${edge(on)} flex h-full items-center gap-3.5 px-4 py-3.5`}>
                    <Image
                      src={`/apps/${a.id}.png`}
                      alt=""
                      width={96}
                      height={96}
                      className={`size-14 shrink-0 rounded-[22%] shadow-tile ${own ? "opacity-55" : ""}`}
                    />
                    <span className={`flex min-w-0 flex-1 flex-col gap-0.5 ${own ? "opacity-55" : ""}`}>
                      <span className="font-display text-[1.0625rem] font-bold leading-tight">PeerapoS {appName(a.id)}</span>
                      <span className="font-display text-xl font-extrabold leading-none tracking-tight tabular-nums">{baht(a.price)}</span>
                    </span>
                    {own ? <Pill>{t.owned}</Pill> : <Tick on={on} box />}
                  </div>
                </label>
              );
            })}
          </div>

          {!hasMax && tier("max") && (
            <div className={`flex flex-col gap-3 rounded-2xl border-2 bg-sheet p-5 ${sel.addMax ? "border-solid border-ink" : "border-dashed border-line"}`}>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={sel.addMax}
                  onChange={(e) => set({ addMax: e.target.checked })}
                  className="mt-0.5 size-[22px] shrink-0 accent-ink"
                />
                <span>
                  <b>{t.addMax}</b>
                  <br />
                  <span className="text-sm text-graphite">{t.addMaxHint}</span>
                </span>
              </label>
              <div className="flex flex-wrap items-center justify-between gap-3 pl-[34px]">
                <Period t={t} period={sel.period} onChange={(period) => set({ period })} />
                <Price t={t} tier={tier("max")} period={sel.period} small />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
