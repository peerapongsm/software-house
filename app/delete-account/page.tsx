"use client";

import Shell from "@/components/account/Shell";
import { EMAIL } from "@/app/site-info";
import { useLang } from "@/lib/lang.ts";
import { PLAY_SUBS_URL } from "@/lib/pro.ts";

const COPY = {
  th: {
    h1: "ลบบัญชี PeerapoS",
    lead: "ลบได้เองทั้งบนเว็บและในแอป ไม่ต้องรอเรา",
    stepsH: "ลบบัญชีทำยังไง",
    steps: [
      "บนเว็บ เข้า “บัญชีของฉัน” เลื่อนลงไปสุด กด “ลบบัญชี” แล้วพิมพ์ DELETE เพื่อยืนยัน",
      "ในแอป PeerapoS Pair บนมือถือ เปิดตั้งค่า เข้าหน้า Pro แล้วกดลบบัญชี",
    ],
    goneH: "ลบแล้วจะหายไป",
    gone: [
      "บัญชี การเข้าสู่ระบบ และทุกเครื่องที่ยังเข้าสู่ระบบอยู่",
      "เครื่องที่เชื่อมไว้ทั้งหมด และตัวเชื่อม AI ที่ผูกไว้",
      "สิทธิ์ PeerapoS Pro และข้อมูลการซื้อบน Google Play ที่เก็บไว้กับบัญชี",
    ],
    stayH: "อะไรยังอยู่",
    stay: [
      "คำสั่งซื้อและอีเมลยืนยันการชำระเงิน เก็บไว้ตามกฎหมายภาษี แม้ลบบัญชีแล้ว",
      "ข้อมูลบนเครื่องของคุณเอง ลบได้โดยถอนการติดตั้งแอปหรือลบโฟลเดอร์ข้อมูลของแอป",
    ],
    warnH: "ก่อนลบ อ่านข้อนี้",
    warn: [
      "แอปแบบซื้อขาดที่ซื้อไว้จะใช้ไม่ได้ และกู้คืนให้ไม่ได้",
      "ถ้ามี PeerapoS Pro ให้ยกเลิกใน Google Play ก่อน การลบบัญชีไม่ยกเลิกการสมัคร คุณจะยังถูกคิดเงินต่อ และการสมัครนั้นย้ายไปบัญชีใหม่ไม่ได้",
    ],
    play: "จัดการใน Google Play",
    fallbackH: "ถ้าลบเองไม่ได้",
    fallback: `ส่งอีเมลมาที่ ${EMAIL} จากอีเมลของบัญชี เราตรวจว่าเป็นคุณ แล้วตอบภายใน 30 วัน`,
    back: "กลับไปหน้าบัญชี",
    privacy: "นโยบายความเป็นส่วนตัว",
  },
  en: {
    h1: "Delete your PeerapoS account",
    lead: "You can delete it yourself, on the website or in the app. No need to wait for us.",
    stepsH: "How to delete",
    steps: [
      "On the website, open My account, scroll to the bottom, press Delete account and type DELETE to confirm.",
      "In the PeerapoS Pair app on your phone, open Settings, go to Pro and press Delete account.",
    ],
    goneH: "What is removed",
    gone: [
      "The account, its sign-in and every signed-in device",
      "All linked PCs and the AI connector links",
      "PeerapoS Pro and the Google Play purchase records kept with the account",
    ],
    stayH: "What stays",
    stay: [
      "Orders and the payment confirmation email stay, because tax law requires us to keep sales records, even after the account is deleted.",
      "Data on your own PC is not touched. Uninstall the app or delete its data folder to remove it.",
    ],
    warnH: "Read before you delete",
    warn: [
      "Paid apps you bought stop working, and we cannot restore them.",
      "If you have PeerapoS Pro, cancel it in Google Play first. Deleting the account does NOT cancel the Google Play subscription: you keep being charged, and that subscription cannot move to a new account.",
    ],
    play: "Manage in Google Play",
    fallbackH: "Cannot delete it yourself?",
    fallback: `Email ${EMAIL} from the account's email address. We check it is you, then reply within 30 days.`,
    back: "Back to my account",
    privacy: "Privacy policy",
  },
};

// Picture steps in the /pro style: one flat shape per step, ink lines, indigo accent.
const P = { fill: "var(--color-sheet)", stroke: "var(--color-ink)", strokeWidth: 3, strokeLinejoin: "round" } as const;
const ACC = { fill: "var(--color-indigo)" };
const SOFT = { fill: "var(--color-indigo)", fillOpacity: 0.15 };
const PIC = [
  // a monitor with a person and an account card
  <>
    <rect {...P} x="14" y="10" width="92" height="62" rx="6" />
    <circle {...SOFT} cx="60" cy="34" r="10" />
    <path {...SOFT} d="M44 60c2-8 26-8 32 0z" />
    <path d="M48 86h24M60 72v14" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
  </>,
  // a phone with a bin
  <>
    <rect {...P} x="38" y="8" width="44" height="80" rx="8" />
    <rect {...SOFT} x="44" y="18" width="32" height="50" rx="3" />
    <rect {...ACC} x="50" y="40" width="20" height="4" rx="2" />
    <path {...ACC} d="M52 48h16l-2 18h-12z" />
  </>,
];

/** /delete-account: how to delete, what goes, what stays, the Play warning and the fallback. Public, no sign-in. */
export default function DeleteAccountPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  return (
    <Shell lang={lang} setLang={setLang}>
      <article className="mx-auto mt-2 flex max-w-3xl flex-col gap-8 lg:mt-6">
        <header className="flex flex-col gap-3">
          <h1 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight md:text-[2.75rem]">{t.h1}</h1>
          <p className="text-lg text-graphite">{t.lead}</p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold">{t.stepsH}</h2>
          <ol className="flex flex-col gap-3">
            {t.steps.map((s, i) => (
              <li key={s} className="flex items-center gap-4 rounded-2xl border border-line bg-sheet p-4">
                <svg viewBox="0 0 120 96" aria-hidden="true" focusable="false" className="w-24 shrink-0 rounded-xl bg-paper">
                  {PIC[i]}
                </svg>
                <p className="text-[1.0625rem] leading-snug">
                  <b className="text-indigo">{i + 1}.</b> {s}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="flex flex-col gap-3 rounded-2xl border border-line bg-sheet p-5">
            <h2 className="font-display text-xl font-bold">{t.goneH}</h2>
            <ul className="list-disc space-y-2 pl-5 text-graphite">
              {t.gone.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col gap-3 rounded-2xl border border-line bg-sheet p-5">
            <h2 className="font-display text-xl font-bold">{t.stayH}</h2>
            <ul className="list-disc space-y-2 pl-5 text-graphite">
              {t.stay.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-sheet p-5">
          <h2 className="font-display text-xl font-bold">{t.warnH}</h2>
          <ul className="list-disc space-y-2 pl-5 text-graphite">
            {t.warn.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <a href={PLAY_SUBS_URL} target="_blank" rel="noopener noreferrer" className="self-start font-semibold text-indigo underline">
            {t.play}
          </a>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-xl font-bold">{t.fallbackH}</h2>
          <p className="leading-relaxed text-graphite">{t.fallback}</p>
        </section>

        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <a href="/account" className="text-indigo underline">{t.back}</a>
          <a href="/privacy" className="text-indigo underline">{t.privacy}</a>
        </div>
      </article>
    </Shell>
  );
}
