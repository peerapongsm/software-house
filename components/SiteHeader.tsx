"use client";

import { COPY, type Lang } from "@/app/copy";

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

export function SiteHeader({ lang, onLang, home }: { lang: Lang; onLang: (l: Lang) => void; home: boolean }) {
  const t = COPY[lang];

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-8 sm:py-6">
      <a href={home ? "#top" : "/"} className="flex shrink-0 items-center gap-1.5 leading-none sm:gap-2">
        <img src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 sm:h-9 sm:w-9" />
        <span className="font-display text-xl font-extrabold tracking-tight sm:text-[1.7rem]">PeerapoS</span>
      </a>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4 xl:gap-6">
        <nav className="hidden items-center gap-4 font-semibold text-graphite lg:flex xl:gap-6">
          <a href={home ? "#apps" : "/#apps"} className="hover:text-ink">{t.navApps}</a>
          <a href={home ? "#paid" : "/#paid"} className="hover:text-ink">{t.navPaid}</a>
          <a href={home ? "#custom" : "/#custom"} className="hover:text-ink">{t.navCustom}</a>
          <a href={home ? "#about" : "/#about"} className="hover:text-ink">{t.navAbout}</a>
          <a href={home ? "#contact" : "/#contact"} className="hover:text-ink">{t.navContact}</a>
        </nav>
        <a
          href="/account"
          aria-label={t.navAccount}
          className="flex size-10 items-center justify-center gap-2 rounded-full border border-line bg-sheet text-sm font-semibold hover:border-ink sm:size-auto sm:px-3.5 sm:py-1.5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
          </svg>
          <span className="hidden whitespace-nowrap sm:inline">{t.navAccount}</span>
        </a>
        <LangSwitcher lang={lang} onChange={onLang} />
      </div>
    </header>
  );
}
