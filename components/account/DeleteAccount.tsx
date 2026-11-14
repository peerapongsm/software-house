"use client";

import { useEffect, useRef, useState } from "react";
import Spinner from "@/components/account/Spinner";
import { deleteNeedsAck, isDeleteConfirm } from "@/lib/account.ts";
import { api } from "@/lib/api.ts";
import { orderError } from "@/lib/buy.ts";
import type { Lang } from "@/lib/lang.ts";
import { PLAY_SUBS_URL } from "@/lib/pro.ts";

const COPY = {
  th: {
    title: "ลบบัญชี",
    gone: "ลบแล้วกู้คืนไม่ได้ สิ่งที่จะหายไป:",
    items: [
      "บัญชี การเข้าสู่ระบบ และทุกเครื่องที่ยังเข้าสู่ระบบอยู่",
      "เครื่องที่เชื่อมไว้ทั้งหมด และตัวเชื่อม AI ที่ผูกไว้",
      "สิทธิ์ PeerapoS Pro และข้อมูลการซื้อบน Google Play ที่เก็บไว้ การสมัครผ่านบัตรจะถูกยกเลิกทันทีโดยไม่คืนเงิน และ Pro 1 ปีที่เหลือจะหายไป",
      "แอปแบบซื้อขาดที่ซื้อไว้ จะใช้ไม่ได้ และกู้คืนให้ไม่ได้",
    ],
    stays: "คำสั่งซื้อและอีเมลยืนยันการชำระเงินยังอยู่ เพราะกฎหมายภาษีให้เก็บ",
    typeLabel: "พิมพ์ DELETE เพื่อยืนยัน",
    btn: "ลบบัญชีของฉัน",
    subTitle: "ยังมีการสมัคร PeerapoS Pro",
    subBody: "การลบบัญชีไม่ยกเลิกการสมัครใน Google Play คุณจะยังถูกคิดเงินต่อ และการสมัครนี้ย้ายไปบัญชีใหม่ไม่ได้ ให้ยกเลิกใน Google Play ก่อน การสมัครผ่านบัตรจะถูกยกเลิกทันทีโดยไม่คืนเงิน และ Pro 1 ปีที่เหลือจะหายไป",
    play: "จัดการใน Google Play",
    force: "ลบต่อ ฉันเข้าใจผลที่เกิดกับ Pro แล้ว",
    back: "ยกเลิก",
    how: "ดูวิธีลบบัญชีและสิ่งที่ยังเหลือ",
  },
  en: {
    title: "Delete account",
    gone: "Deleting cannot be undone. This removes:",
    items: [
      "The account, its sign-in and every signed-in device",
      "All linked PCs and the AI connector links",
      "PeerapoS Pro and the Google Play purchase records kept with it. Card subscriptions are cancelled immediately without a refund; remaining prepaid passes are lost",
      "Paid apps you bought stop working, and we cannot restore them",
    ],
    stays: "Orders and the payment confirmation email stay, because tax law requires us to keep them.",
    typeLabel: "Type DELETE to confirm",
    btn: "Delete my account",
    subTitle: "A PeerapoS Pro subscription is still running",
    subBody: "Deleting the account does NOT cancel the Google Play subscription. You keep being charged, and that subscription cannot move to a new account. Cancel it in Google Play first. A card subscription is cancelled immediately without a refund, and remaining prepaid passes are lost.",
    play: "Manage in Google Play",
    force: "Delete anyway; I accept the subscription and pass consequences",
    back: "Cancel",
    how: "How deleting works, and what stays",
  },
};

const btn = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors w-full whitespace-normal text-center [overflow-wrap:anywhere] sm:w-auto";
const danger = `${btn} min-h-[52px] px-6 py-3 bg-red-700 text-white hover:bg-red-800 disabled:opacity-40`;
const dangerOut = `${btn} min-h-11 px-4 py-2 text-[0.9375rem] border border-red-700 text-red-700 bg-sheet hover:bg-red-50 disabled:opacity-40`;
const outSm = `${btn} min-h-11 px-4 py-2 text-[0.9375rem] border border-ink/25 bg-sheet hover:border-ink`;

/** Signed-in only, the bottom of /account. A typed DELETE, then one more confirm if a Play subscription still runs. */
export default function DeleteAccount({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [expanded, setExpanded] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (expanded) heading.current?.focus();
  }, [expanded]);
  const [typed, setTyped] = useState("");
  const [sub, setSub] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(acceptSub: boolean) {
    setErr(null);
    setBusy(true);
    const r = await api("/api/account/delete", { method: "POST", body: { confirm: "DELETE", acceptSub } });
    if (r.ok) {
      location.href = "/";
      return;
    }
    setBusy(false);
    if (deleteNeedsAck(r)) setSub(true);
    else setErr(orderError(r)[lang]);
  }

  if (!expanded) return (
    <div className="mt-10 text-left">
      <button type="button" onClick={() => setExpanded(true)} className="text-sm text-graphite underline underline-offset-4 hover:text-ink">{t.title}</button>
    </div>
  );

  return (
    <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-red-200 bg-sheet p-5">
      <h2 ref={heading} tabIndex={-1} className="font-display text-xl font-bold leading-tight">{t.title}</h2>
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-semibold">{t.gone}</p>
        <ul className="list-disc space-y-1 pl-5 text-graphite">
          {t.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p className="text-graphite">{t.stays}</p>
        <a href="/delete-account" className="font-semibold text-indigo underline">{t.how}</a>
      </div>
      {sub ? (
        <div role="alert" className="flex flex-col gap-3 rounded-xl bg-amber-50 px-3.5 py-3">
          <p className="font-bold text-amber-900">{t.subTitle}</p>
          <p className="text-sm text-amber-900">{t.subBody}</p>
          <div className="flex flex-wrap gap-2">
            <a href={PLAY_SUBS_URL} target="_blank" rel="noopener noreferrer" className={outSm}>{t.play}</a>
            <button type="button" disabled={busy} onClick={() => { setSub(false); setTyped(""); }} className={outSm}>{t.back}</button>
            <button type="button" disabled={busy} onClick={() => submit(true)} className={dangerOut}>
              {busy && <Spinner />}
              {t.force}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex max-w-md flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            {t.typeLabel}
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="min-h-12 rounded-xl border border-line bg-paper px-3.5 py-2 font-mono text-base tracking-wider"
            />
          </label>
          <button type="button" disabled={busy || !isDeleteConfirm(typed)} onClick={() => submit(false)} className={`${danger} self-start`}>
            {busy && <Spinner />}
            {t.btn}
          </button>
        </div>
      )}
      {err && (
        <p role="alert" className="font-semibold text-red-700">
          {err}
        </p>
      )}
    </section>
  );
}
