"use client";

import Image from "next/image";
import { COPY, type Lang } from "./copy";
import { useEffect, useRef, useState } from "react";
import { APPS, PAID_APPS, downloadUrl, shotUrls, type DesktopApp } from "./apps-data";
import { EMAIL, FACEBOOK_URL, FAQ, FASTWORK_URL, LINE_URL, TIKTOK_URL } from "./site-info";
const ARMORY_URL = "https://armory.peerapongsm.dev/";

// Brand icon paths from simple-icons (CC0), 24×24 viewBox unless noted.
const SOCIALS: { name: string; href: string; bg: string; path: string; viewBox?: string }[] = [
  {
    name: "LINE",
    href: LINE_URL,
    bg: "bg-[#06C755] fill-white",
    path: "M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314",
  },
  {
    name: "Facebook",
    href: FACEBOOK_URL,
    bg: "bg-[#0866FF] fill-white",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    name: "TikTok",
    href: TIKTOK_URL,
    bg: "bg-ink fill-white",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.840-.02 8.75-.08 1.4-.54 2.79-1.350 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.150-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    // Fastwork isn't in simple-icons; mark from fastwork.com/favicon.svg (40×40), cropped to the mark.
    name: "Fastwork",
    href: FASTWORK_URL,
    bg: "bg-white fill-[#1A1F2E]",
    viewBox: "4 4 32 32",
    path: "M32.883 24.9073L26.9362 20.3268L27.0544 21.2126C27.1112 21.573 27.1396 21.9373 27.1396 22.3021C27.1389 22.6189 27.1183 22.9353 27.0781 23.2495L31.4779 26.641C31.8864 26.9311 32.1722 27.3633 32.2792 27.8531C32.3861 28.343 32.3067 28.8552 32.0564 29.2895C31.8061 29.7238 31.4029 30.0489 30.9258 30.2012C30.4486 30.3536 29.9319 30.3221 29.4767 30.1131L22.8533 27.3705C23.7503 26.8648 24.4969 26.1293 25.0165 25.2395C25.5361 24.3497 25.81 23.3375 25.8102 22.3068C25.809 21.9365 25.7742 21.5671 25.7061 21.2031L24.1969 9.83476C24.0642 8.81628 23.566 7.88093 22.7951 7.20324C22.0243 6.52556 21.0335 6.15186 20.0076 6.15186C18.9818 6.15186 17.991 6.52556 17.2201 7.20324C16.4493 7.88093 15.951 8.81628 15.8183 9.83476L14.8295 17.2811L15.5345 16.7363C15.819 16.5075 16.1211 16.3016 16.4381 16.1205C16.7074 15.9656 16.9854 15.8264 17.2707 15.7037L18.004 10.1948C18.0524 9.69697 18.2842 9.23504 18.6541 8.89895C19.0241 8.56286 19.5057 8.37668 20.0052 8.37668C20.5048 8.37668 20.9864 8.56286 21.3564 8.89895C21.7263 9.23504 21.9581 9.69697 22.0065 10.1948L22.9527 17.3C21.8955 16.6787 20.6693 16.4078 19.4492 16.5261C18.229 16.6443 17.0775 17.1457 16.159 17.9584L7.11804 24.9216C6.30101 25.5452 5.73894 26.4455 5.53701 27.4541C5.33508 28.4627 5.50713 29.5104 6.02096 30.4011C6.5348 31.2919 7.35521 31.9646 8.32866 32.2935C9.30212 32.6224 10.3619 32.5848 11.3097 32.1878L18.2406 29.3221L17.4174 28.981C17.0799 28.8472 16.7526 28.6889 16.4381 28.5073C16.1677 28.3519 15.9085 28.1778 15.6622 27.9863L10.5244 30.1131C10.0691 30.3221 9.5524 30.3536 9.07527 30.2012C8.59813 30.0489 8.19495 29.7238 7.94464 29.2895C7.69432 28.8552 7.61489 28.343 7.72189 27.8531C7.82889 27.3633 8.11462 26.9311 8.52315 26.641L14.2003 22.2642C14.2003 22.2642 14.2003 22.2926 14.2003 22.3068C14.2013 23.4928 14.5643 24.6502 15.2408 25.6239C15.9173 26.5975 16.8748 27.3408 17.9851 27.7542L28.7008 32.1736C29.6482 32.5674 30.7063 32.6027 31.6777 32.2728C32.6492 31.9429 33.4675 31.2704 33.9802 30.3808C34.4928 29.4912 34.6646 28.4452 34.4636 27.438C34.2626 26.4309 33.7025 25.5314 32.8877 24.9073H32.883ZM16.4002 22.2926C16.4012 21.5827 16.6123 20.8889 17.0069 20.2991C17.4015 19.7093 17.9619 19.2498 18.6173 18.9788C19.2726 18.7078 19.9935 18.6373 20.6888 18.7764C21.3842 18.9155 22.0227 19.2578 22.5237 19.7602C23.0248 20.2625 23.3659 20.9023 23.5039 21.5986C23.6418 22.295 23.5705 23.0167 23.299 23.6725C23.0274 24.3283 22.5678 24.8888 21.9782 25.2831C21.3885 25.6774 20.6954 25.8879 19.9863 25.8879C19.515 25.8879 19.0483 25.7948 18.6129 25.6141C18.1775 25.4334 17.782 25.1685 17.4489 24.8345C17.1158 24.5006 16.8518 24.1043 16.6719 23.6681C16.4919 23.2319 16.3996 22.7645 16.4002 22.2926Z",
  },
];

/** "PeerapoS Wash" → "Wash": the tile label under each icon. */
const short = (a: DesktopApp) => a.name.replace(/^PeerapoS /, "");

// Native scroll-snap carousel; arrows and dots just scroll the track.
function Carousel({ srcs, alt, labels }: { srcs: string[]; alt: string; labels: { prev: string; next: string; shot: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const go = (n: number) => ref.current?.scrollTo({ left: n * ref.current.clientWidth, behavior: "smooth" });
  const arrow =
    "grid size-11 shrink-0 place-items-center rounded-full border border-line bg-sheet text-xl text-ink transition-colors hover:border-ink disabled:opacity-30";

  return (
    <div className="mt-6">
      <div
        ref={ref}
        onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-xl border border-line bg-paper [scrollbar-width:none]"
      >
        {srcs.map((src, n) => (
          // click opens the full-size image in a new tab for reading small text
          <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="w-full shrink-0 snap-center">
            <Image src={src} alt={`${alt} — ${labels.shot} ${n + 1}/${srcs.length}`} width={1920} height={1080} className="aspect-video w-full" />
          </a>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label={labels.prev} className={arrow}>
          ‹
        </button>
        <div className="flex gap-2">
          {srcs.map((src, n) => (
            <button
              key={src}
              type="button"
              onClick={() => go(n)}
              aria-label={`${labels.shot} ${n + 1}`}
              aria-current={i === n}
              className={`h-2.5 rounded-full transition-all ${i === n ? "w-7 bg-ink" : "w-2.5 bg-line"}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(i + 1)} disabled={i === srcs.length - 1} aria-label={labels.next} className={arrow}>
          ›
        </button>
      </div>
    </div>
  );
}

function LangSwitcher({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex rounded-full border border-line bg-sheet p-0.5 text-sm font-semibold">
      {(["th", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 transition-colors ${lang === l ? "bg-ink text-white" : "text-graphite hover:text-ink"}`}
        >
          {l === "th" ? "ไทย" : "EN"}
        </button>
      ))}
    </div>
  );
}

/** The signature: every app tile, laid out like pinned apps on a Windows Start menu. */
function TileWall({ label, onOpen }: { label: string; onOpen: (a: DesktopApp) => void }) {
  return (
    <ul aria-label={label} className="grid grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-6">
      {APPS.map((a, n) => (
        <li key={a.name} className="tile-in" style={{ animationDelay: `${120 + n * 45}ms` }}>
          <button
            type="button"
            onClick={() => onOpen(a)}
            aria-haspopup="dialog"
            className="group flex w-full flex-col items-center gap-1.5 rounded-xl p-1 text-center"
          >
            <Image
              src={a.icon}
              alt=""
              width={96}
              height={96}
              className="size-14 rounded-[22%] shadow-tile transition-transform group-hover:-translate-y-0.5 sm:size-[4.5rem] lg:size-20"
            />
            <span className="text-[0.8rem] font-semibold leading-tight text-graphite group-hover:text-ink sm:text-sm">{short(a)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("th");
  const t = COPY[lang];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openAppName, setOpenAppName] = useState<string | null>(null);
  const app = APPS.find((a) => a.name === openAppName) ?? PAID_APPS.find((a) => a.name === openAppName);

  function openApp(a: DesktopApp) {
    setOpenAppName(a.name);
    dialogRef.current?.showModal();
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // 2000s-style hit counter: every page load counts, like the originals did.
  // ponytail: free Abacus API, no backend; if it's down the counter just stays hidden.
  const [visits, setVisits] = useState<number | null>(null);
  useEffect(() => {
    fetch("https://abacus.jasoncameron.dev/hit/peerapongsm.dev/visits")
      .then((r) => r.json())
      .then((d) => typeof d.value === "number" && setVisits(d.value))
      .catch(() => {});
  }, []);

  return (
    <main className="overflow-x-clip">
      {/* ── Header ─────────────────────────────────────── */}
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-6">
        <a href="#top" className="flex items-center gap-2 leading-none">
          <img src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 sm:h-9 sm:w-9" />
          <span className="font-display text-2xl font-extrabold tracking-tight sm:text-[1.7rem]">PeerapoS</span>
        </a>
        <div className="flex items-center gap-3 md:gap-6">
          <nav className="hidden items-center gap-6 font-semibold text-graphite lg:flex">
            <a href="#apps" className="hover:text-ink">{t.navApps}</a>
            <a href="#paid" className="hover:text-ink">{t.navPaid}</a>
            <a href="#custom" className="hover:text-ink">{t.navCustom}</a>
            <a href="#about" className="hover:text-ink">{t.navAbout}</a>
            <a href="#contact" className="hover:text-ink">{t.navContact}</a>
          </nav>
          <LangSwitcher lang={lang} onChange={setLang} />
        </div>
      </header>

      {/* ── Hero: headline + the tile wall ─────────────── */}
      <section id="top" className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-6 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:pb-28 lg:pt-14">
        <div className="max-w-xl">
          <p className="mb-3 font-semibold text-indigo">{t.eyebrow}</p>
          <h1 className="font-display text-[2.6rem] font-bold leading-[1.15] tracking-tight sm:text-6xl">{t.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-graphite sm:text-xl">{t.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#apps" className="rounded-xl bg-ink px-6 py-3.5 font-semibold text-white transition-colors hover:bg-indigo-deep">
              {t.heroApps}
            </a>
            <a href="#custom" className="rounded-xl border border-ink/25 bg-sheet px-6 py-3.5 font-semibold transition-colors hover:border-ink">
              {t.heroCustom}
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-sheet p-3 sm:p-6 lg:w-[30rem]">
          <TileWall label={t.wallLabel} onOpen={openApp} />
        </div>
      </section>

      {/* ── Apps ───────────────────────────────────────── */}
      <section id="apps" className="border-t border-line bg-sheet py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{t.appsTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-graphite">{t.appsSub}</p>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-graphite">{t.winOnly}</p>

          {/* mobile: compact one-line rows; tablet: two columns, desktop: four, with the feature chips */}
          <ul className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-10 lg:grid-cols-4">
            {APPS.map((a) => {
              const c = a[lang];
              return (
                <li key={a.name} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => openApp(a)}
                    aria-haspopup="dialog"
                    className="group flex w-full items-center gap-4 py-4 text-left md:items-start md:py-6"
                  >
                    <Image src={a.icon} alt="" width={96} height={96} className="size-12 shrink-0 rounded-[22%] md:size-14" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-bold group-hover:text-indigo md:text-xl">{a.name}</span>
                      <span className="block leading-snug text-graphite">{c.tagline}</span>
                      <span className="mt-3 hidden flex-wrap gap-1.5 md:flex">
                        {c.chips.map((chip) => (
                          <span key={chip} className="rounded-md bg-paper px-2 py-0.5 text-sm text-graphite">
                            {chip}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-2xl text-line group-hover:text-ink md:hidden">
                      ›
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Paid apps ──────────────────────────────────── */}
      <section id="paid" className="border-t border-line bg-sheet py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <p className="mb-4 inline-block rounded-full bg-indigo px-4 py-2 font-semibold text-white">{t.paidSoon}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{t.paidTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-graphite">{t.paidSub}</p>
          <ul className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-10 lg:grid-cols-4">
            {PAID_APPS.map((a) => {
              const c = a[lang];
              return (
                <li key={a.name} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => openApp(a)}
                    aria-haspopup="dialog"
                    className="group flex w-full items-center gap-4 py-4 text-left md:items-start md:py-6"
                  >
                    <Image src={a.icon} alt="" width={96} height={96} className="size-12 shrink-0 rounded-[22%] md:size-14" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-bold group-hover:text-indigo md:text-xl">{a.name}</span>
                      {a.price !== undefined && (
                        <span className="block text-xl font-bold text-indigo">
                          ฿{a.price.toLocaleString("en-US")} <span className="text-sm font-semibold text-graphite">{t.oneTime}</span>
                        </span>
                      )}
                      <span className="block leading-snug text-graphite">{c.tagline}</span>
                      <span className="mt-3 hidden flex-wrap gap-1.5 md:flex">
                        {c.chips.map((chip) => (
                          <span key={chip} className="rounded-md bg-paper px-2 py-0.5 text-sm text-graphite">
                            {chip}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-2xl text-line group-hover:text-ink md:hidden">
                      ›
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Custom apps ────────────────────────────────── */}
      <section id="custom" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{t.customTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-graphite">{t.customSub}</p>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {t.steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-ink pt-5">
                <h3 className="mt-1 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-graphite">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 flex flex-col gap-3 rounded-2xl border border-line bg-sheet p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="font-display text-xl font-bold">{t.armoryTitle}</h3>
              <p className="mt-1 leading-relaxed text-graphite">{t.armoryBody}</p>
            </div>
            <a href={ARMORY_URL} className="shrink-0 font-semibold text-indigo underline decoration-2 underline-offset-4 hover:text-indigo-deep">
              {t.armoryLink}
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ: same answers feed the FAQPage JSON-LD and /llms.txt ── */}
      <section id="faq" className="border-t border-line py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{t.faqTitle}</h2>
          <div className="mt-8 border-t border-line">
            {FAQ[lang].map((f) => (
              <details key={f.q} className="group border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl text-graphite transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-graphite">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────── */}
      <section id="about" className="border-t border-line bg-sheet py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-8 lg:grid-cols-[22rem_1fr] lg:gap-16">
          <Image
            src="/peter.webp"
            alt="Peerapong (Peter) Saksommon"
            width={768}
            height={750}
            className="aspect-square w-40 rounded-2xl object-cover sm:w-48 lg:w-full"
          />
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{t.aboutTitle}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">{t.aboutBody}</p>
            <ul className="mt-8 max-w-2xl border-t border-line">
              {t.creds.map((c) => (
                <li key={c} className="border-b border-line py-3 font-semibold">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────── */}
      <section id="contact" className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{t.contactTitle}</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">{t.contactSub}</p>
          <ul className="mt-9 flex flex-wrap items-center gap-3">
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-block rounded-xl bg-white px-6 py-3.5 text-lg font-semibold text-ink transition-colors hover:bg-paper"
              >
                {EMAIL}
              </a>
            </li>
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className={`grid size-14 place-items-center rounded-xl border border-white/25 ${s.bg}`}
                >
                  <svg viewBox={s.viewBox ?? "0 0 24 24"} aria-hidden="true" className="size-7">
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <footer className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 พีระพอส (PeerapoS)</span>
            {visits !== null && (
              <span className="flex items-center gap-2">
                {t.visitor}
                <span className="rounded border-2 border-white/40 bg-black px-1.5 py-0.5 font-mono text-base font-bold tracking-[0.25em] text-[#39ff14] [text-shadow:0_0_6px_#39ff14]">
                  {String(visits).padStart(6, "0")}
                </span>
              </span>
            )}
            <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href="/terms" className="hover:text-white">{t.terms}</a>
              <a href="/privacy" className="hover:text-white">{t.privacy}</a>
              <a href="/delete-account" className="hover:text-white">{t.deleteAccount}</a>
              {/* White chip: the DBD logo is purple/blue on transparent, unreadable on bg-ink */}
              <a
                href="https://dbdregistered.dbd.go.th/api/public/shopinfoReg?param=C1DFB0EB759AA8D60773404F348C82B490A06A8033600509694D96B7FAE4530C"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-white px-1.5 py-1 opacity-90 transition-opacity hover:opacity-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://dbdregistered.dbd.go.th/api/public/bannerreg?param=C1DFB0EB759AA8D60773404F348C82B490A06A8033600509694D96B7FAE4530C"
                  alt="DBD Registered"
                  width={324}
                  height={154}
                  className="h-8 w-auto"
                />
              </a>
            </span>
          </footer>
        </div>
      </section>

      {/* ── App dialog ─────────────────────────────────── */}
      {/* Native <dialog>, not a window.open popup, so popup blockers never fire.
          Download button is a plain link to the installer on the app's GitHub release. */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpenAppName(null)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        aria-labelledby="dl-title"
        className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-2xl bg-sheet text-ink shadow-2xl backdrop:bg-ink/60"
      >
        {app && (
          <div className="p-5 sm:p-8">
            <div className="flex items-center gap-4">
              <Image src={app.icon} alt="" width={96} height={96} className="size-16 shrink-0 rounded-[22%]" />
              <div className="min-w-0">
                <h2 id="dl-title" className="break-words font-display text-2xl font-bold sm:text-3xl">
                  {app.name}
                  {app.price !== undefined && (
                    <span className="mt-1 block text-xl text-indigo sm:ml-3 sm:mt-0 sm:inline-block">
                      ฿{app.price.toLocaleString("en-US")} <span className="text-sm font-semibold text-graphite">{t.oneTime}</span>
                    </span>
                  )}
                </h2>
                <p className="text-lg text-graphite">{app[lang].tagline}</p>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="ml-auto shrink-0 self-start rounded-full border border-line px-5 py-2 font-semibold hover:border-ink"
              >
                {t.dl.close}
              </button>
            </div>

            {app.shots > 0 && <Carousel key={app.name} srcs={shotUrls(app)} alt={app.name} labels={t.dl} />}

            <p className="mt-5 max-w-3xl leading-relaxed text-graphite">{app[lang].description}</p>

            <h3 className="mt-6 font-display text-lg font-bold">{t.dl.features}</h3>
            <ul className="mt-2 grid list-disc gap-x-8 gap-y-1 pl-5 leading-relaxed text-graphite sm:grid-cols-2">
              {app[lang].features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <p className="mt-5 text-sm font-semibold text-graphite">
              {t.uiLang[app.uiLang]} · {t.winOnly}
            </p>

            {app.price !== undefined ? (
              <>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="mt-6 block w-full cursor-not-allowed rounded-xl bg-line px-6 py-4 text-center text-lg font-semibold text-graphite"
                >
                  {t.comingSoon}
                </button>
                <p className="mt-2 text-center text-sm text-graphite">{t.paidNote}</p>
              </>
            ) : (
            <>
            <h3 className="mt-6 font-display text-lg font-bold">{t.dl.guideTitle}</h3>
            {/* Numbers are written out (1, 2.1, 2.2 …) so sub-steps read the way they're spoken. */}
            <ol className="mt-3 grid gap-2 leading-relaxed">
              {t.dl.steps.map(([step, ...subs], i) => (
                <li key={step}>
                  <span className="flex gap-2">
                    <span className="w-6 shrink-0 font-semibold">{i + 1}.</span>
                    <span>{step}</span>
                  </span>
                  {subs.length > 0 && (
                    <ol className="mt-1 grid gap-1 pl-8">
                      {subs.map((s, j) => (
                        <li key={s} className="flex gap-2">
                          <span className="w-8 shrink-0 font-semibold">
                            {i + 1}.{j + 1}
                          </span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>

            <a
              href={downloadUrl(app)}
              className="mt-6 block rounded-xl bg-ink px-6 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-indigo-deep"
            >
              {t.dl.button}
            </a>
            </>
            )}
          </div>
        )}
      </dialog>
    </main>
  );
}
