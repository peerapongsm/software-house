// Order-box lines for display. The Worker recomputes every price; this total is never sent.
import type { Catalogue } from "./api.ts";

export type Line = { id: string; months: 1 | 12 | null; price: number };

export type Selection = {
  kind: "tier" | "app";
  tier: "pro" | "max";
  period: "m" | "y";
  apps: string[];
  addMax: boolean;
};

function tierLine(id: "pro" | "max", period: "m" | "y", cat: Catalogue): Line[] {
  const t = cat.tiers.find((x) => x.id === id);
  if (!t) return [];
  return [period === "m" ? { id, months: 1, price: t.monthly } : { id, months: 12, price: t.annual }];
}

export function cartLines(sel: Selection, cat: Catalogue): Line[] {
  if (sel.kind === "tier") return tierLine(sel.tier, sel.period, cat);
  const apps = sel.apps.flatMap((id): Line[] => {
    const a = cat.apps.find((x) => x.id === id);
    return a ? [{ id, months: null, price: a.price }] : [];
  });
  return sel.addMax ? [...apps, ...tierLine("max", sel.period, cat)] : apps;
}

export const total = (lines: Line[]) => lines.reduce((s, l) => s + l.price, 0);

/** 899000 → "฿8,990", 29083 → "฿290.83". Integer satang in, text out. */
export function baht(satang: number): string {
  const whole = Math.floor(satang / 100).toLocaleString("en-US");
  const sat = satang % 100;
  return `฿${whole}${sat ? "." + String(sat).padStart(2, "0") : ""}`;
}
