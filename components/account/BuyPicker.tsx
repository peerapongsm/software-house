"use client";

import Image from "next/image";
import type { Catalogue, Licence } from "@/lib/api.ts";
import { baht } from "@/lib/cart.ts";
import type { Lang } from "@/lib/lang.ts";

/** "wholesale" → "Wholesale": the paid apps' short names. */
export const appName = (slug: string) => slug[0].toUpperCase() + slug.slice(1);

const COPY = {
  th: { apps: "แอป", owned: "ซื้อแล้ว" },
  en: { apps: "Apps", owned: "Owned" },
};

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-[0.8125rem] font-bold text-green-700">{children}</span>
);

/** Rounded square tick for a checkbox card. */
function Tick({ on }: { on: boolean }) {
  return (
    <span aria-hidden="true" className={`grid size-6 shrink-0 place-items-center rounded-md border-2 ${on ? "border-ink bg-ink" : "border-line"}`}>
      {on && (
        <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 6.5l2.5 2.5 4.5-5.5" />
        </svg>
      )}
    </span>
  );
}

const focusRing = "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-indigo rounded-2xl";

/** Left column of /buy: the paid apps to tick. The order box reads the same picks. Owned apps show as bought. */
export default function BuyPicker({
  lang,
  cat,
  lic,
  sel,
  onSel,
}: {
  lang: Lang;
  cat: Catalogue;
  lic: Licence | null;
  sel: string[];
  onSel: (apps: string[]) => void;
}) {
  const t = COPY[lang];
  const owned = new Set(lic?.apps ?? []);

  return (
    <div role="group" aria-label={t.apps} className="grid gap-3.5 lg:grid-cols-2">
      {cat.apps.map((a) => {
        const own = owned.has(a.id);
        const on = !own && sel.includes(a.id);
        return (
          <label key={a.id} className={`relative block ${own ? "cursor-default" : "cursor-pointer"} ${focusRing}`}>
            <input
              type="checkbox"
              checked={on}
              disabled={own}
              onChange={() => onSel(on ? sel.filter((x) => x !== a.id) : [...sel, a.id])}
              className="sr-only"
            />
            <div className={`rounded-2xl border-2 bg-sheet ${on ? "border-ink shadow-[0_0_0_1px_var(--color-ink)]" : "border-line"} flex h-full items-center gap-3.5 px-4 py-3.5`}>
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
              {own ? <Pill>{t.owned}</Pill> : <Tick on={on} />}
            </div>
          </label>
        );
      })}
    </div>
  );
}
