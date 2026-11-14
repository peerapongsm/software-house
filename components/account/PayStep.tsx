"use client";

import { useEffect, useState } from "react";
import { EMAIL } from "@/app/site-info";
import OrderBox from "@/components/account/OrderBox";
import Spinner from "@/components/account/Spinner";
import { api, type Licence, type Msg } from "@/lib/api.ts";
import { orderError, payStep } from "@/lib/buy.ts";
import type { Lang } from "@/lib/lang.ts";

/** GET /api/order/:id is public; only the signed-in buyer can start another checkout. */
type Order = { status: string; amountSatang?: number; expiresAt?: string; lines?: { id: string; priceSatang: number }[]; message?: Msg };

const POLL_MS = 5000;
const PAY_RETRY_DELAY_MS = 25_000;
const POLLS = 360; // 30 min of a visible tab, then reload to check again

const COPY = {
  confirming: { th: "ได้รับการชำระเงินแล้ว กำลังยืนยัน", en: "Payment received, confirming" },
  waiting: { th: "รอยืนยันการชำระเงิน", en: "Waiting for the payment to confirm" },
  payAgain: { th: "ยังไม่ได้ชำระ? ชำระเงิน", en: "Not paid yet? Pay" },
  later: { th: "หยุดเช็กสถานะแล้ว รีเฟรชหน้านี้ภายหลัง", en: "Status checks stopped. Refresh this page later." },
  unpaid: { th: "ยังไม่ได้ชำระ", en: "Not paid yet" },
  paidH: { th: "ชำระเงินแล้ว", en: "Payment received" },
  paidMsg: { th: "เครื่องที่เชื่อมกับบัญชีนี้จะอัปเดตเอง", en: "PCs linked to this account update by themselves." },
  newPcH: { th: "เครื่องใหม่", en: "On a new PC" },
  pc1: { th: "เปิดแอป PeerapoS", en: "Open a PeerapoS app." },
  pc2: { th: "กด “เปิดใช้”", en: "Press “Activate”." },
  pc3: { th: "กด “เชื่อมเครื่องนี้” บนเว็บ", en: "Press “Link this PC” on the web." },
  toAccount: { th: "ไปที่บัญชีของฉัน", en: "Go to my account" },
  review: { th: "รอเจ้าของตรวจ", en: "The owner is checking this order" },
  recheck: { th: "เช็กสถานะ", en: "Check status" },
  closedH: { th: "คำสั่งซื้อปิดแล้ว", en: "Order closed" },
  closed: { th: "คำสั่งซื้อนี้ปิดแล้ว ถ้าชำระเงินแล้วติดต่อ " + EMAIL, en: "This order is closed. If you already paid, contact " + EMAIL + "." },
  again: { th: "เริ่มสั่งซื้อใหม่", en: "Start a new order" },
  retry: { th: "ลองอีกครั้ง", en: "Try again" },
  signIn: { th: "เข้าสู่ระบบเพื่อชำระเงิน", en: "Sign in to pay" },
} satisfies Record<string, Msg>;

// picture parts: line, base, accent line, soft fill, ink fill, ok fill, white tick
const L = { fill: "none", stroke: "var(--color-ink)", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const B = { fill: "var(--color-sheet)" };
const AL = { fill: "none", stroke: "var(--color-indigo)", strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const S = { fill: "var(--color-indigo)", fillOpacity: 0.15 };
const A = { fill: "var(--color-indigo)" };
const I = { fill: "var(--color-ink)" };
const OK = { fill: "var(--color-green-700)" };
const OW = { fill: "none", stroke: "var(--color-sheet)", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const Pic = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 120 96" aria-hidden="true" focusable="false" className="w-24 rounded-xl bg-paper group-data-[row]:lg:mx-auto group-data-[row]:lg:w-full group-data-[row]:lg:max-w-[168px]">
    {children}
  </svg>
);

const Monitor = () => (
  <>
    <rect {...B} {...L} x="14" y="10" width="92" height="62" rx="6" />
    <path {...L} d="M48 86h24M60 72v14" />
  </>
);

// a new PC: open the app → press "เปิดใช้" → approve on the web
const PC_PICS = [
  <Pic key="1">
    <Monitor />
    {[24, 50, 76].map((x) => (
      <rect key={x} {...(x === 50 ? A : S)} x={x} y="20" width="20" height="20" rx="5" />
    ))}
    {[24, 50, 76].map((x) => (
      <rect key={x} {...S} x={x} y="46" width="20" height="18" rx="5" />
    ))}
    <path {...AL} d="M66 36l8 14 2-6 6-2z" />
  </Pic>,
  <Pic key="2">
    <Monitor />
    <rect {...S} x="24" y="20" width="72" height="44" rx="4" />
    <path {...L} d="M34 30h30M34 38h22" />
    <rect {...A} x="34" y="47" width="36" height="11" rx="5.5" />
    <path {...AL} d="M64 52l8 14 2-6 6-2z" />
  </Pic>,
  <Pic key="3">
    <rect {...B} {...L} x="14" y="14" width="92" height="68" rx="6" />
    <path {...L} d="M14 27h92" />
    <circle {...I} cx="22" cy="21" r="2" />
    <circle {...I} cx="29" cy="21" r="2" />
    <circle {...OK} cx="60" cy="44" r="9" />
    <path {...OW} d="M55.5 44l3 3 5.5-6" />
    <rect {...A} x="38" y="60" width="44" height="11" rx="5.5" />
  </Pic>,
];

/** Numbered picture steps; `row` lays them side by side on desktop (wide cards only, so Thai lines stay long). */
function Pics({ pics, texts, row }: { pics: React.ReactNode[]; texts: React.ReactNode[]; row?: boolean }) {
  const r = row ? "lg:flex-1 lg:grid-cols-1 lg:content-start lg:text-center" : "";
  return (
    <ol data-row={row || undefined} className={`group flex flex-col gap-2.5 ${row ? "lg:flex-row lg:gap-5" : ""}`}>
      {pics.map((p, i) => (
        <li key={i} className={`grid grid-cols-[96px_1fr] items-center gap-3 ${r}`}>
          {p}
          <p>
            <b className="text-indigo">{i + 1}.</b> {texts[i]}
          </p>
        </li>
      ))}
    </ol>
  );
}

const sheet = "flex flex-col gap-4 rounded-2xl border border-line bg-sheet p-5";
const btn = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-colors";
const dark = `${btn} bg-ink text-white hover:bg-indigo-deep`;
const out = `${btn} border border-ink/25 bg-sheet hover:border-ink`;
const h1 = "font-display text-[2rem] font-bold leading-[1.15] tracking-tight md:text-[2.75rem]";

/** /buy?order=<id>: poll for confirmed payment; a browser return never grants apps. */
export default function PayStep({ lang, id, confirming, cancelled, signedIn, lic, email, onOrdered, accountErr, onRetry }: {
  lang: Lang; id: string; confirming: boolean; cancelled: boolean; signedIn?: boolean; lic: Licence | null; email: string; onOrdered: (id: string, confirming?: boolean) => void; accountErr: Msg | null; onRetry: () => void;
}) {
  const t = (key: keyof typeof COPY) => COPY[key][lang];
  const [o, setO] = useState<Order | null>(null);
  const [loadErr, setLoadErr] = useState<Msg | null>(null);
  const [busy, setBusy] = useState(false);
  const [retryReady, setRetryReady] = useState(false);
  const [retryOpen, setRetryOpen] = useState(false);
  const [pollEnded, setPollEnded] = useState(false);

  useEffect(() => {
    setRetryReady(false);
    setRetryOpen(false);
    if (o?.status !== "open" || cancelled || confirming) return;
    const timer = setTimeout(() => setRetryReady(true), PAY_RETRY_DELAY_MS);
    return () => clearTimeout(timer);
  }, [o?.status, id, cancelled, confirming]);

  async function load(quiet = false) {
    if (!quiet) setBusy(true);
    const r = await api<Order>(`/api/order/${id}`);
    if (!quiet) setBusy(false);
    if (r.ok) {
      setLoadErr(null);
      setO(r.data);
    } else if (r.status === 404) setO({ status: "closed", message: r.message });
    else if (!quiet) setLoadErr(orderError(r));
  }

  useEffect(() => {
    load();
  }, [id]);

  const live = (confirming && (!o || o.status === "confirming")) || o?.status === "open" || o?.status === "expired" || o?.status === "issuing";
  useEffect(() => {
    setPollEnded(false);
    if (!live) return;
    let n = 0;
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (++n > POLLS) {
        setPollEnded(true);
        return clearInterval(timer);
      }
      load(true);
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [live, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [o && payStep(o.status, cancelled)]);

  if (!o)
    return (
      <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-4 text-center">
        {loadErr ? (
          <>
            <p role="alert" className="font-semibold text-red-700">{loadErr[lang]}</p>
            <button type="button" onClick={() => load()} disabled={busy} className={out}>
              {busy && <Spinner />}
              {t("retry")}
            </button>
          </>
        ) : (
          <>
            {confirming && <p role="status">{t("confirming")}</p>}
            <Spinner />
          </>
        )}
      </div>
    );

  const step = confirming && ["open", "expired", "confirming"].includes(o.status) ? "waiting" : payStep(o.status, cancelled);

  if (step === "done")
    return (
      <div className={`${sheet} mx-auto mt-6 max-w-3xl items-center text-center`}>
        <svg viewBox="0 0 48 48" aria-hidden="true" className="size-14">
          <circle {...OK} cx="24" cy="24" r="22" />
          <path {...OW} strokeWidth={4} d="M14 25l7 7 13-15" />
        </svg>
        <h1 className={h1}>{t("paidH")}</h1>
        <p>{t("paidMsg")}</p>
        <div className="mt-2 w-full rounded-xl bg-paper p-4 text-left">
          <h2 className="mb-3 font-display text-xl font-bold lg:text-center">{t("newPcH")}</h2>
          <Pics pics={PC_PICS} texts={[t("pc1"), t("pc2"), t("pc3")]} row />
        </div>
        <a href="/account" className={`${dark} w-full sm:w-auto`}>{t("toAccount")}</a>
      </div>
    );

  if (step === "review" || step === "closed") {
    const review = step === "review";
    const msg = review ? t("review") : (o.message?.[lang] ?? t("closed"));
    return (
      <div className={`${sheet} mx-auto mt-6 max-w-md text-center`}>
        <h1 className={h1}>{review ? t("review") : t("closedH")}</h1>
        <p role="status">{msg}</p>
        {review ? (
          <>
            <button type="button" onClick={() => load()} disabled={busy} className={out}>
              {busy && <Spinner />}
              {t("recheck")}
            </button>
            {loadErr && <p role="alert" className="font-semibold text-red-700">{loadErr[lang]}</p>}
          </>
        ) : (
          <a href="/buy" className={dark}>{t("again")}</a>
        )}
      </div>
    );
  }

  return (
    <div className={sheet + " mx-auto mt-6 max-w-md"}>
      <h1 className={h1 + " text-center"}>{step === "waiting" ? t(confirming ? "confirming" : "waiting") : t("unpaid")}</h1>
      {step === "waiting" ? (
        <>
          <div role="status" className="flex justify-center text-graphite">{pollEnded ? t("later") : <Spinner />}</div>
          {signedIn && !confirming && retryReady && !retryOpen && <button type="button" onClick={() => setRetryOpen(true)} className={out}>{t("payAgain")}</button>}
        </>
      ) : null}
      {(step !== "waiting" || (retryOpen && !confirming)) && (signedIn ? (
        <OrderBox key={id} lang={lang} lines={(o.lines ?? []).map((l) => ({ id: l.id, price: l.priceSatang }))} lic={lic} email={email} previousOrder={id} onOrdered={onOrdered} />
      ) : signedIn === false ? (
        <a href={"/login?next=" + encodeURIComponent("/buy" + location.search)} className={dark}>{t("signIn")}</a>
      ) : accountErr ? (
        <>
          <p role="alert" className="font-semibold text-red-700">{accountErr[lang]}</p>
          <button type="button" onClick={onRetry} className={out}>{t("retry")}</button>
        </>
      ) : <Spinner />)}
      {loadErr && <p role="alert" className="font-semibold text-red-700">{loadErr[lang]}</p>}
    </div>
  );
}
