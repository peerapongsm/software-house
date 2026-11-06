// Order-box lines for display (paid apps only). The Worker recomputes every price; this total is never sent.
import type { Catalogue } from "./api.ts";

export type Line = { id: string; price: number };

/** One line per picked app id; ids the catalogue does not list are dropped. */
export function cartLines(ids: string[], cat: Catalogue): Line[] {
  return ids.flatMap((id): Line[] => {
    const a = cat.apps.find((x) => x.id === id);
    return a ? [{ id, price: a.price }] : [];
  });
}

export const total = (lines: Line[]) => lines.reduce((s, l) => s + l.price, 0);

/** 899000 → "฿8,990", 29083 → "฿290.83". Integer satang in, text out. */
export function baht(satang: number): string {
  const whole = Math.floor(satang / 100).toLocaleString("en-US");
  const sat = satang % 100;
  return `฿${whole}${sat ? "." + String(sat).padStart(2, "0") : ""}`;
}
