"use client";

import { useState } from "react";
import { appName } from "@/components/account/BuyPicker";
import Spinner from "@/components/account/Spinner";
import { api, type Licence, type Msg } from "@/lib/api.ts";
import { checkoutNext, orderError, orderItems } from "@/lib/buy.ts";
import { baht, total, type Line } from "@/lib/cart.ts";
import type { Lang } from "@/lib/lang.ts";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY = {
  th: {
    name: "ชื่อ",
    namePh: "ชื่อร้าน บริษัท หรือชื่อคุณ",
    nameHint: "ชื่อนี้แสดงในแอป",
    pick: "เลือกแอปที่ต้องการ",
    receipt: "ส่งใบยืนยันการชำระเงินไปที่",
    total: "ยอดชำระ",
    accept: "ฉันยอมรับ",
    terms: "ข้อกำหนดการใช้งาน",
    and: "และ",
    privacy: "นโยบายความเป็นส่วนตัว",
  },
  en: {
    name: "Name",
    namePh: "Shop, company or your name",
    nameHint: "Shown in the apps.",
    pick: "Pick the apps you want",
    receipt: "Send the payment confirmation to",
    total: "Total",
    accept: "I accept the",
    terms: "Terms of use",
    and: "and the",
    privacy: "Privacy policy",
  },
};

const PAY: Msg = { th: "ชำระเงิน", en: "Pay" };

const NEED_NAME: Msg = { th: "ใส่ชื่อก่อนสั่งซื้อ", en: "Enter a name first." };
const NEED_EMAIL: Msg = { th: "ใส่อีเมลที่จะรับใบยืนยันให้ถูก", en: "Enter a valid email for the confirmation." };

const field =
  "min-h-12 w-full rounded-xl border border-line bg-sheet px-3.5 py-2.5 focus:border-ink focus:outline-none focus:ring-[3px] focus:ring-indigo/25";

/** Right column of /buy: name, lines, receipt email, total, pay, Terms. Errors from the Worker show here. */
export default function OrderBox({
  lang,
  lines,
  lic,
  email,
  onOrdered,
  previousOrder,
}: {
  lang: Lang;
  lines: Line[];
  lic: Licence | null;
  email: string;
  onOrdered: (orderId: string, confirming?: boolean) => void;
  previousOrder?: string;
}) {
  const t = COPY[lang];
  const [previous] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("order:" + previousOrder) ?? "null") as { name?: string; receiptEmail?: string; consent?: boolean } | null;
    } catch {
      return null;
    }
  });
  const [name, setName] = useState(typeof previous?.name === "string" ? previous.name : "");
  const [receipt, setReceipt] = useState(typeof previous?.receiptEmail === "string" ? previous.receiptEmail : email);
  const [consent, setConsent] = useState(previous?.consent === true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<Msg | null>(null);
  const sum = total(lines);

  const label = (l: Line) => `PeerapoS ${appName(l.id)}`;

  async function order(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !lines.length || !consent) return;
    if (!lic && !name.trim()) return setErr(NEED_NAME);
    if (!EMAIL_RE.test(receipt.trim())) return setErr(NEED_EMAIL);
    setErr(null);
    setBusy(true);
    const body = { items: orderItems(lines), ...(lic ? {} : { name: name.trim() }), receiptEmail: receipt.trim(), consent: true };
    const r = await api<{ orderId: string; url?: unknown; status?: string }>("/api/order", { method: "POST", body });
    setBusy(false);
    if (r.ok) {
      const next = checkoutNext(r.data);
      if (next.kind === "error") return setErr(orderError({ ok: false, status: 500, error: "server" }));
      try {
        sessionStorage.setItem("order:" + r.data.orderId, JSON.stringify(body));
      } catch {}
      history.replaceState(null, "", "/buy?order=" + encodeURIComponent(r.data.orderId));
      onOrdered(r.data.orderId, next.kind === "confirming");
      if (next.kind === "go") location.assign(next.url);
      return;
    }
    // the session ran out while picking: sign in again and come back here
    if (r.status === 401) return location.assign(`/login?next=${encodeURIComponent("/buy" + location.search)}`);
    setErr(orderError(r));
  }

  return (
    <form noValidate onSubmit={order} className="flex flex-col gap-4 rounded-2xl border border-line bg-sheet p-5 lg:sticky lg:top-6">
      {lic ? (
        <div className="flex justify-between gap-3">
          <span className="text-graphite">{t.name}</span>
          <b className="text-right">{lic.name}</b>
        </div>
      ) : (
        <div>
          <label htmlFor="shopName" className="mb-1.5 block font-semibold">{t.name}</label>
          <input
            id="shopName"
            maxLength={120}
            autoComplete="organization"
            placeholder={t.namePh}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
          />
          <p className="mt-1.5 text-sm text-graphite">{t.nameHint}</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {lines.length ? (
          lines.map((l) => (
            <div key={l.id} className="flex justify-between gap-3">
              <span className="text-graphite">{label(l)}</span>
              <b className="tabular-nums">{baht(l.price)}</b>
            </div>
          ))
        ) : (
          <p className="text-sm text-graphite">{t.pick}</p>
        )}
      </div>

      <div>
        <label htmlFor="receipt" className="mb-1.5 block font-semibold">{t.receipt}</label>
        <input
          id="receipt"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          value={receipt}
          onChange={(e) => setReceipt(e.target.value)}
          className={`${field} [overflow-wrap:anywhere]`}
        />
      </div>

      <div className="flex items-baseline justify-between border-t border-line pt-3.5">
        <span>{t.total}</span>
        <b className="font-display text-[1.75rem] font-extrabold tabular-nums">{sum ? baht(sum) : "–"}</b>
      </div>

      {err && (
        <p role="alert" className="rounded-xl bg-red-100 px-3.5 py-2.5 font-semibold text-red-700">
          {err[lang]}
        </p>
      )}

      <label className="flex cursor-pointer items-center gap-2.5 text-[0.8125rem] leading-normal text-graphite">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="size-[18px] shrink-0 accent-ink" />
        <span>
          {t.accept}{" "}
          <a href="/terms" target="_blank" className="whitespace-nowrap font-semibold text-indigo">{t.terms}</a> {t.and}{" "}
          <a href="/privacy" target="_blank" className="whitespace-nowrap font-semibold text-indigo">{t.privacy}</a>
        </span>
      </label>
      <button
        disabled={busy || !lines.length || !consent}
        className={`inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3 font-semibold text-white transition-colors enabled:hover:bg-indigo-deep ${busy ? "disabled:bg-ink/70" : "disabled:opacity-40"}`}
      >
        {busy && <Spinner />}
        {PAY[lang]}
      </button>
    </form>
  );
}
