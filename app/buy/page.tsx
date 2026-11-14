"use client";

import { useEffect, useState } from "react";
import BuyPicker from "@/components/account/BuyPicker";
import OrderBox from "@/components/account/OrderBox";
import PayStep from "@/components/account/PayStep";
import Shell from "@/components/account/Shell";
import Spinner from "@/components/account/Spinner";
import { api, type Catalogue, type Licence, type Msg } from "@/lib/api.ts";
import { forSale, orderError, orderId, proRedirect, startPick } from "@/lib/buy.ts";
import { cartLines } from "@/lib/cart.ts";
import { useLang } from "@/lib/lang.ts";

const COPY = {
  th: { title: "เลือกแอป", retry: "ลองอีกครั้ง" },
  en: { title: "Choose apps", retry: "Try again" },
};

type Account = { email: string; licence: Licence | null };

// Buying needs a session; an order status can be checked without one.
export default function Buy() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const [signedIn, setSignedIn] = useState<boolean>();
  const [cancelled, setCancelled] = useState(false);
  const [order, setOrder] = useState<string | null>(null);
  const [confirmingOrder, setConfirmingOrder] = useState<string | null>(null);
  const [acct, setAcct] = useState<Account | null>(null);
  const [cat, setCat] = useState<Catalogue | null>(null);
  const [sel, setSel] = useState<string[] | null>(null);
  const [err, setErr] = useState<Msg | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = `${t.title} · PeerapoS`;
  }, [t]);

  async function start() {
    const q = new URLSearchParams(location.search);
    const to = proRedirect(q);
    if (to) return location.replace(to);
    const oid = orderId(q);
    setOrder(oid);
    setCancelled(q.get("cancelled") === "1");
    setErr(null);
    setBusy(true);
    const [a, c] = await Promise.all([api<Account>("/api/account"), oid ? null : api<Catalogue>("/api/catalogue")]);
    setBusy(false);
    if (a.ok) {
      setSignedIn(true);
      setAcct(a.data);
    }
    else if (a.status === 401) {
      if (!oid) return location.replace(`/login?next=${encodeURIComponent("/buy" + location.search)}`);
      setSignedIn(false);
    }
    if (!c) { // ?order: the pay step loads the order itself
      if (!a.ok && a.status !== 401) setErr(orderError(a));
      return;
    }
    if (!a.ok) return setErr(orderError(a));
    if (!c.ok) return setErr(orderError(c));
    const shop = forSale(c.data);
    setAcct(a.data);
    setCat(shop);
    setSel(startPick(q, shop, a.data.licence));
  }

  useEffect(() => {
    start();
  }, []);

  function ordered(id: string, confirming = false) {
    setConfirmingOrder(confirming ? id : null);
    setCancelled(false);
    setOrder(id);
  }

  const lic = acct?.licence ?? null;
  const lines = cat && sel ? cartLines(sel, cat) : [];

  return (
    <Shell lang={lang} setLang={setLang} signedIn={signedIn}>
      {order ? (
        <PayStep key={order} lang={lang} id={order} confirming={confirmingOrder === order} cancelled={cancelled} signedIn={signedIn} lic={lic} email={acct?.email ?? ""} onOrdered={ordered} accountErr={err} onRetry={start} />
      ) : err ? (
        <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-4 text-center">
          <p role="alert" className="font-semibold text-red-700">{err[lang]}</p>
          <button
            type="button"
            onClick={start}
            disabled={busy}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-ink/25 bg-sheet px-6 py-3 font-semibold hover:border-ink"
          >
            {busy && <Spinner />}
            {t.retry}
          </button>
        </div>
      ) : !acct || !cat || !sel ? (
        <div className="mt-10 flex justify-center text-graphite">
          <Spinner />
        </div>
      ) : (
        <>
          <h1 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight md:text-[2.75rem]">{t.title}</h1>
          <div className="mt-5 flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-8">
            <BuyPicker lang={lang} cat={cat} lic={lic} sel={sel} onSel={setSel} />
            <OrderBox lang={lang} lines={lines} lic={lic} email={acct.email} onOrdered={ordered} />
          </div>
        </>
      )}
    </Shell>
  );
}
