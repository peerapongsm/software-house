"use client";

import { useEffect, useRef, useState } from "react";
import { EMAIL } from "@/app/site-info";
import Spinner from "@/components/account/Spinner";
import { api, type Msg } from "@/lib/api.ts";
import { exact, orderError, payStep, slipError } from "@/lib/buy.ts";
import type { Lang } from "@/lib/lang.ts";

/** GET /api/order/:id. The order id is the capability: no session needed (phone upload). */
type Order = { status: string; amountSatang?: number; expiresAt?: string; qrSvg?: string; uploadQrSvg?: string; message?: Msg };

const POLL_MS = 5000;
const POLLS = 360; // 30 min of a visible tab, then the slip answer or a reload moves it on

const COPY = {
  th: {
    payH: "โอนด้วยพร้อมเพย์",
    exactL: "โอนให้ตรง",
    thb: "บาท",
    exactNote: "ต้องโอนให้ตรงทุกสตางค์",
    copy: "คัดลอกยอด",
    before: "โอนภายใน",
    expired: "หมดเวลาโอนแล้ว ถ้าโอนไปแล้ว อัปโหลดสลิปได้ภายใน 7 วัน ถ้ายังไม่โอน เริ่มสั่งซื้อใหม่",
    howH: "วิธีโอน",
    how1d: "เปิดแอปธนาคารในมือถือ สแกน QR บนจอ",
    how1m: "แคปหน้าจอ QR แล้วสแกนจากรูปในแอปธนาคาร",
    how2: "เช็กยอดให้ตรงทุกสตางค์ แล้วกดโอน",
    how3: "บันทึกสลิปลงเครื่อง",
    how4: "กลับมาหน้านี้ อัปโหลดสลิป",
    upH: "อัปโหลดสลิป",
    upHint: "ใช้รูปสลิปที่แอปธนาคารบันทึกไว้",
    upBtn: "เลือกรูปสลิป",
    checking: "กำลังตรวจสลิป อย่าปิดหน้านี้…",
    phoneH: "อัปโหลดสลิปจากมือถือ",
    phoneHint: "สแกนด้วยกล้องมือถือ เปิดหน้านี้ที่ขั้นอัปโหลด",
    back: "ย้อนกลับไปแก้ไข",
    paidH: "ชำระเงินแล้ว",
    paidMsg: "เครื่องที่เชื่อมกับบัญชีนี้จะอัปเดตเอง",
    newPcH: "เครื่องใหม่",
    pc1: "เปิดแอป PeerapoS",
    pc2: "กด เปิดใช้",
    pc3: "กด เชื่อมเครื่องนี้ บนเว็บ",
    toAccount: "ไปที่บัญชีของฉัน",
    reviewH: "ได้รับสลิปแล้ว",
    review: "ได้รับสลิปแล้ว จะตรวจให้ภายใน 24 ชม.",
    issuing: "สลิปผ่านแล้ว รอสักครู่",
    recheck: "เช็กสถานะ",
    closedH: "คำสั่งซื้อปิดแล้ว",
    closed: `คำสั่งซื้อนี้ปิดแล้ว ถ้าโอนเงินแล้วติดต่อ ${EMAIL}`,
    again: "เริ่มสั่งซื้อใหม่",
    retry: "ลองอีกครั้ง",
  },
  en: {
    payH: "Pay with PromptPay",
    exactL: "Transfer exactly",
    thb: "THB",
    exactNote: "Exact to the satang",
    copy: "Copy amount",
    before: "Pay before",
    expired: "Payment time is over. If you already paid, upload the slip within 7 days. If not, start a new order.",
    howH: "How to pay",
    how1d: "Open your bank app on the phone and scan the QR on screen.",
    how1m: "Screenshot the QR, then scan it from photos in your bank app.",
    how2: "Check the amount matches to the satang, then pay.",
    how3: "Save the slip to your phone.",
    how4: "Come back here and upload the slip.",
    upH: "Upload the slip",
    upHint: "Use the slip image your bank app saved.",
    upBtn: "Choose slip image",
    checking: "Checking the slip. Keep this page open…",
    phoneH: "Upload the slip from your phone",
    phoneHint: "Scan with the phone camera to open this page at the upload step.",
    back: "Go back and edit",
    paidH: "Payment received",
    paidMsg: "PCs linked to this account update by themselves.",
    newPcH: "On a new PC",
    pc1: "Open a PeerapoS app.",
    pc2: "Press Activate.",
    pc3: "Press Link this PC on the web.",
    toAccount: "Go to my account",
    reviewH: "Slip received",
    review: "Slip received. We check it within 24 h.",
    issuing: "The slip passed. One moment.",
    recheck: "Check status",
    closedH: "Order closed",
    closed: `This order is closed. If you already paid, contact ${EMAIL}.`,
    again: "Start a new order",
    retry: "Try again",
  },
};

const COPIED: Msg = { th: "คัดลอกแล้ว", en: "Copied" };
const COPY_FAIL: Msg = { th: "คัดลอกไม่ได้ เลือกตัวเลขแล้วคัดลอกเอง", en: "Couldn't copy. Select the amount and copy it." };

const when = (iso: string, lang: Lang) => {
  try {
    return new Date(iso).toLocaleString(lang === "th" ? "th-TH" : "en-GB", { timeZone: "Asia/Bangkok", dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
};

/** The QR SVG from /api/order, drawn as an image so nothing in it can run. */
const Qr = ({ svg, small, label }: { svg: string; small?: boolean; label: string }) =>
  svg.startsWith("<svg") ? (
    <img
      src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
      alt={label}
      className={`mx-auto block aspect-square h-auto shrink-0 rounded-xl border border-line bg-white ${small ? "w-[168px] p-2.5" : "w-full max-w-[280px] p-3.5"}`}
    />
  ) : null;

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

const Phone = () => (
  <>
    <rect {...B} {...L} x="38" y="8" width="44" height="80" rx="8" />
    <rect {...S} x="44" y="18" width="32" height="58" rx="3" />
  </>
);

const Monitor = () => (
  <>
    <rect {...B} {...L} x="14" y="10" width="92" height="62" rx="6" />
    <path {...L} d="M48 86h24M60 72v14" />
  </>
);

const PAY_PICS = [
  <Pic key="1">
    <Phone />
    <rect {...I} x="50" y="31" width="7" height="7" />
    <rect {...I} x="63" y="31" width="7" height="7" />
    <rect {...I} x="50" y="55" width="7" height="7" />
    <rect {...I} x="61" y="45" width="4" height="4" />
    <rect {...I} x="66" y="56" width="4" height="4" />
    <path {...AL} d="M47 32v-6h6M67 26h6v6M73 58v6h-6M53 64h-6v-6" />
    <path {...AL} d="M44 47h32" />
  </Pic>,
  <Pic key="2">
    <Phone />
    <rect {...B} {...L} x="45" y="30" width="30" height="18" rx="3" />
    <text x="60" y="43" textAnchor="middle" fill="var(--color-ink)" fontSize="11" fontWeight="800">฿</text>
    <circle {...OK} cx="60" cy="62" r="8" />
    <path {...OW} d="M56 62l3 3 5-6" />
  </Pic>,
  <Pic key="3">
    <Phone />
    <rect {...B} {...L} x="49" y="22" width="22" height="28" rx="2" />
    <path {...L} d="M54 30h12M54 36h12M54 42h7" />
    <path {...AL} d="M60 54v12M54 61l6 6 6-6M51 71h18" />
  </Pic>,
  <Pic key="4">
    <rect {...B} {...L} x="14" y="14" width="92" height="68" rx="6" />
    <path {...L} d="M14 27h92" />
    <circle {...I} cx="22" cy="21" r="2" />
    <circle {...I} cx="29" cy="21" r="2" />
    <rect {...S} x="30" y="36" width="34" height="36" rx="3" />
    <path {...L} d="M34 66l9-11 7 8 4-5 7 8" />
    <path {...AL} d="M82 72V42M73 51l9-9 9 9" />
  </Pic>,
];

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

/** /buy?order=<id>: pay by PromptPay QR, upload the slip, then done or review. Polls the order every 5 s while unpaid. */
export default function PayStep({ lang, id, signedIn }: { lang: Lang; id: string; signedIn?: boolean }) {
  const t = COPY[lang];
  const [o, setO] = useState<Order | null>(null);
  const [loadErr, setLoadErr] = useState<Msg | null>(null);
  const [busy, setBusy] = useState(false);
  const [slipErr, setSlipErr] = useState<Msg | null>(null);
  const [copied, setCopied] = useState<Msg | null>(null);
  const gen = useRef(0); // a slip answer outranks a poll that left before it

  async function load(quiet = false) {
    const g = gen.current;
    if (!quiet) setBusy(true);
    const r = await api<Order>(`/api/order/${id}`);
    if (!quiet) setBusy(false);
    if (g !== gen.current) return;
    if (r.ok) {
      setLoadErr(null);
      setO(r.data);
    } else if (r.status === 404) setO({ status: "closed", message: r.message });
    else if (!quiet) setLoadErr(orderError(r));
  }

  useEffect(() => {
    load();
  }, [id]);

  const live = o?.status === "open" || o?.status === "expired" || o?.status === "issuing";
  useEffect(() => {
    if (!live) return;
    let n = 0;
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (++n > POLLS) return clearInterval(timer);
      load(true);
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [live, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [o && payStep(o.status)]);

  async function upload(f: File) {
    const bad = slipError(f);
    if (bad) return setSlipErr(bad);
    gen.current++;
    setSlipErr(null);
    setBusy(true);
    const form = new FormData();
    form.append("slip", f);
    const r = await api<Order>(`/api/order/${id}/slip`, { method: "POST", form });
    gen.current++;
    setBusy(false);
    if (r.ok) setO((cur) => ({ ...cur, ...r.data }));
    else setSlipErr(orderError(r));
  }

  async function copy(amount: string) {
    try {
      await navigator.clipboard.writeText(amount);
      setCopied(COPIED);
    } catch {
      setCopied(COPY_FAIL);
    }
    setTimeout(() => setCopied(null), 2500);
  }

  if (!o)
    return (
      <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-4 text-center">
        {loadErr ? (
          <>
            <p role="alert" className="font-semibold text-red-700">{loadErr[lang]}</p>
            <button type="button" onClick={() => load()} disabled={busy} className={out}>
              {busy && <Spinner />}
              {t.retry}
            </button>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    );

  const step = payStep(o.status);

  if (step === "done")
    return (
      <div className={`${sheet} mx-auto mt-6 max-w-3xl items-center text-center`}>
        <svg viewBox="0 0 48 48" aria-hidden="true" className="size-14">
          <circle {...OK} cx="24" cy="24" r="22" />
          <path {...OW} strokeWidth={4} d="M14 25l7 7 13-15" />
        </svg>
        <h1 className={h1}>{t.paidH}</h1>
        <p>{t.paidMsg}</p>
        <div className="mt-2 w-full rounded-xl bg-paper p-4 text-left">
          <h2 className="mb-3 font-display text-xl font-bold lg:text-center">{t.newPcH}</h2>
          <Pics pics={PC_PICS} texts={[t.pc1, t.pc2, t.pc3]} row />
        </div>
        <a href="/account" className={`${dark} w-full sm:w-auto`}>{t.toAccount}</a>
      </div>
    );

  if (step === "review" || step === "closed") {
    const review = step === "review";
    const msg = o.status === "issuing" ? t.issuing : (o.message?.[lang] ?? (review ? t.review : t.closed));
    return (
      <div className={`${sheet} mx-auto mt-6 max-w-md text-center`}>
        <h1 className={h1}>{review ? t.reviewH : t.closedH}</h1>
        <p role="status">{msg}</p>
        {review ? (
          <>
            <button type="button" onClick={() => load()} disabled={busy} className={out}>
              {busy && <Spinner />}
              {t.recheck}
            </button>
            {loadErr && <p role="alert" className="font-semibold text-red-700">{loadErr[lang]}</p>}
          </>
        ) : (
          <a href="/buy" className={dark}>{t.again}</a>
        )}
      </div>
    );
  }

  // pay
  const amount = exact(o.amountSatang ?? 0);
  const open = o.status === "open" && typeof o.qrSvg === "string";
  return (
    <div className="mt-2 grid gap-5 lg:grid-cols-2 lg:items-start">
      <div className={`${sheet} items-center text-center lg:row-span-3`}>
        <h1 className={h1}>{t.payH}</h1>
        <p className="font-semibold text-graphite">{t.exactL}</p>
        <p className="font-display text-[clamp(2.75rem,14vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight tabular-nums">
          {amount}
          <small className="ml-1.5 text-xl font-bold tracking-normal">{t.thb}</small>
        </p>
        <p className="rounded-full bg-indigo/10 px-3.5 py-0.5 font-bold">{t.exactNote}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => copy(amount)} className={`${out} min-h-11 px-4 py-2 text-[0.9375rem]`}>
            {t.copy}
          </button>
          <span role="status" className="font-semibold text-green-700">{copied?.[lang]}</span>
        </div>
        {open && (
          <>
            <Qr svg={o.qrSvg!} label="PromptPay QR" />
            {o.expiresAt && (
              <p className="text-sm text-graphite">
                {t.before} <time dateTime={o.expiresAt}>{when(o.expiresAt, lang)}</time>
              </p>
            )}
          </>
        )}
        {o.status === "expired" && <p className="rounded-xl bg-amber-100 px-3.5 py-3 text-[0.9375rem] text-amber-700">{t.expired}</p>}
      </div>

      <div className={sheet}>
        <h2 className="font-display text-xl font-bold">{t.howH}</h2>
        <Pics
          pics={PAY_PICS}
          texts={[
            <>
              <span className="hidden lg:inline">{t.how1d}</span>
              <span className="lg:hidden">{t.how1m}</span>
            </>,
            t.how2,
            t.how3,
            t.how4,
          ]}
        />
      </div>

      <div className={sheet}>
        <h2 className="font-display text-xl font-bold">{t.upH}</h2>
        <p className="-mt-2 text-sm text-graphite">{t.upHint}</p>
        <input
          id="slip"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          className="peer sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            e.target.value = ""; // the same file again retries
            if (f) upload(f);
          }}
        />
        <label
          htmlFor="slip"
          aria-disabled={busy}
          className={`${dark} cursor-pointer peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-indigo aria-disabled:cursor-default aria-disabled:bg-ink/70`}
        >
          {busy && <Spinner />}
          {t.upBtn}
        </label>
        {busy && <p role="status" className="text-center text-sm text-graphite">{t.checking}</p>}
        {slipErr && (
          <p role="alert" className="rounded-xl bg-red-100 px-3.5 py-2.5 font-semibold text-red-700">
            {slipErr[lang]}
          </p>
        )}
      </div>

      {o.uploadQrSvg && (
        <div className={`${sheet} hidden lg:flex lg:flex-row lg:items-center`}>
          <Qr svg={o.uploadQrSvg} small label="QR" />
          <div>
            <h2 className="font-display text-xl font-bold">{t.phoneH}</h2>
            <p className="text-sm text-graphite">{t.phoneHint}</p>
          </div>
        </div>
      )}

      {signedIn && (
        <a href="/buy" className="justify-self-start font-semibold text-indigo underline-offset-4 hover:underline lg:col-start-2">
          {t.back}
        </a>
      )}
    </div>
  );
}
