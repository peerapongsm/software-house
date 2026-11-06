"use client";

import Shell from "@/components/account/Shell";
import { PLAY_URL, PRO_PRICE } from "@/lib/pro.ts";
import { baht } from "@/lib/cart.ts";
import { useLang } from "@/lib/lang.ts";

const COPY = {
  th: {
    h1: "PeerapoS Pro",
    lead: "สมัครครั้งเดียว ใช้ได้กับทุกแอปในบัญชี Google เดียวกัน",
    month: "/ เดือน",
    year: "/ ปี",
    get: "ดาวน์โหลดจาก Google Play",
    stepsH: "ทำตาม 3 ขั้นตอนนี้",
    steps: [
      "ติดตั้ง PeerapoS Go จาก Google Play",
      "เข้าสู่ระบบด้วย Google แล้วสมัคร PeerapoS Pro",
      "บนคอมพิวเตอร์ กด “เชื่อมเครื่องนี้” แล้วเข้าสู่ระบบด้วยบัญชี Google เดียวกัน",
    ],
    getH: "Pro ให้อะไรบ้าง",
    gets: [
      "ฟีเจอร์ Pro ในแอปฟรีทุกตัว",
      "ฟีเจอร์ Pro ในแอปแบบซื้อขาดที่คุณเป็นเจ้าของ",
      "รีเลย์ ตัวเชื่อม AI และ PeerapoS Go",
    ],
    factsH: "ก่อนสมัคร",
    facts: [
      "ใช้ได้กับทุกแอปในบัญชีเดียวกัน ไม่ต้องสมัครซ้ำ",
      "สมัครได้เฉพาะในแอปบน Google Play ไม่ขายบนเว็บนี้",
      "ยังไม่มีบน iPhone จะมาทีหลัง",
    ],
    buyApps: "แอปแบบซื้อขาด ซื้อได้ที่หน้า /buy",
  },
  en: {
    h1: "PeerapoS Pro",
    lead: "Subscribe once. It works on every app in the same Google account.",
    month: "/ month",
    year: "/ year",
    get: "Get it on Google Play",
    stepsH: "Three steps",
    steps: [
      "Install PeerapoS Go from Google Play.",
      "Sign in with Google, then subscribe to PeerapoS Pro.",
      "On the PC, press “Link this PC” and sign in with the same Google account.",
    ],
    getH: "What Pro gives you",
    gets: [
      "Pro features in every free app",
      "Pro features in the paid apps you own",
      "Relay, the AI connector and PeerapoS Go",
    ],
    factsH: "Before you subscribe",
    facts: [
      "One Pro works on every app in the same account. No need to subscribe again.",
      "Bought only in the store app. This website does not sell Pro.",
      "Not on iPhone yet. It comes later.",
    ],
    buyApps: "Paid apps are bought at /buy",
  },
};

// Picture tiles in the site's style: one flat shape per step, ink lines, indigo accent.
const P = { fill: "var(--color-sheet)", stroke: "var(--color-ink)", strokeWidth: 3, strokeLinejoin: "round" } as const;
const ACC = { fill: "var(--color-indigo)" };
const SOFT = { fill: "var(--color-indigo)", fillOpacity: 0.15 };
const PIC = [
  // a phone with a store bag
  <>
    <rect {...P} x="38" y="8" width="44" height="80" rx="8" />
    <rect {...SOFT} x="44" y="18" width="32" height="58" rx="3" />
    <path {...ACC} d="M52 40h16l-2 22h-12z" />
    <path d="M57 40c0-5 6-5 6 0" fill="none" stroke="var(--color-indigo)" strokeWidth="2.5" />
  </>,
  // a phone with a sign-in card and a check
  <>
    <rect {...P} x="38" y="8" width="44" height="80" rx="8" />
    <circle {...SOFT} cx="60" cy="34" r="9" />
    <rect {...SOFT} x="46" y="50" width="28" height="12" rx="6" />
    <circle {...ACC} cx="60" cy="72" r="7" />
    <path d="M56.5 72l2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
  </>,
  // a monitor with a linked check
  <>
    <rect {...P} x="14" y="10" width="92" height="62" rx="6" />
    <path d="M48 86h24M60 72v14" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
    <circle {...ACC} cx="60" cy="41" r="13" />
    <path d="M53 41l5 5 9-10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </>,
];

/** One numbered picture step. Pictures lead on mobile and sit in a row on desktop. */
function Step({ n, pic, text }: { n: number; pic: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-4 rounded-2xl border border-line bg-sheet p-4 lg:flex-col lg:items-stretch lg:text-center">
      <svg viewBox="0 0 120 96" aria-hidden="true" focusable="false" className="w-24 shrink-0 rounded-xl bg-paper lg:mx-auto lg:w-full lg:max-w-[168px]">
        {pic}
      </svg>
      <p className="text-[1.0625rem] leading-snug">
        <b className="text-indigo">{n}.</b> {text}
      </p>
    </li>
  );
}

/** /pro: what PeerapoS Pro is, the three picture steps, what it gives, and the facts before buying. Public, no sign-in. */
export default function ProPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  return (
    <Shell lang={lang} setLang={setLang}>
      <div className="mt-2 flex flex-col gap-8 lg:mt-6 lg:gap-10">
        <section className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight md:text-[2.75rem]">{t.h1}</h1>
            <p className="text-lg text-graphite">{t.lead}</p>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-sheet p-5">
            <p className="font-display text-[2.5rem] font-extrabold leading-none tracking-tight tabular-nums">
              {baht(PRO_PRICE.monthly)}{" "}
              <small className="font-body text-[0.9375rem] font-medium tracking-normal text-graphite">{t.month}</small>
            </p>
            <p className="font-display text-xl font-bold tabular-nums">
              {baht(PRO_PRICE.annual)} <small className="font-body text-[0.9375rem] font-medium text-graphite">{t.year}</small>
            </p>
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-deep"
            >
              {t.get}
            </a>
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-bold">{t.stepsH}</h2>
          <ol className="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-5">
            {t.steps.map((s, i) => (
              <Step key={i} n={i + 1} pic={PIC[i]} text={s} />
            ))}
          </ol>
        </section>

        <section className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-2xl border border-line bg-sheet p-5">
            <h2 className="mb-3 font-display text-xl font-bold">{t.getH}</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              {t.gets.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-sheet p-5">
            <h2 className="mb-3 font-display text-xl font-bold">{t.factsH}</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              {t.facts.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-graphite">
              <a href="/buy" className="font-semibold text-indigo underline-offset-4 hover:underline">{t.buyApps}</a>
            </p>
          </div>
        </section>
      </div>
    </Shell>
  );
}
