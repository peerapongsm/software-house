"use client";

import { EMAIL } from "@/app/site-info";
import type { Lang } from "@/lib/lang.ts";

const COPY = {
  th: { pro: "Pro", apps: "แอป", contact: "ติดต่อ", account: "บัญชีของฉัน", signIn: "เข้าสู่ระบบ", terms: "ข้อกำหนด", privacy: "ความเป็นส่วนตัว", delete: "ลบบัญชี", menu: "เมนู" },
  en: { pro: "Pro", apps: "Apps", contact: "Contact", account: "My account", signIn: "Sign in", terms: "Terms", privacy: "Privacy", delete: "Delete account", menu: "Menu" },
};

function LangSwitcher({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div role="group" aria-label="ภาษา / Language" className="flex rounded-full border border-line bg-sheet p-0.5 text-sm font-semibold">
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

/** Site header, page body and dark footer shared by the account pages. `signedIn` undefined = not known yet. */
export default function Shell({
  lang,
  setLang,
  signedIn,
  children,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  signedIn?: boolean;
  children: React.ReactNode;
}) {
  const t = COPY[lang];
  const who = signedIn === false ? t.signIn : t.account;
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 p-4 md:px-8 md:py-6">
        <a href="/" className="flex items-center gap-2 leading-none">
          <img src="/logo.png" alt="" width={32} height={32} className="size-8 md:size-9" />
          <span className="font-display text-2xl font-extrabold tracking-tight md:text-[1.7rem]">PeerapoS</span>
        </a>
        <div className="flex items-center gap-2.5">
          <nav aria-label={t.menu} className="hidden items-center gap-6 font-semibold text-graphite md:flex">
            <a href="/#apps" className="hover:text-ink">{t.apps}</a>
            <a href="/pro" className="hover:text-ink">{t.pro}</a>
            <a href="/#contact" className="hover:text-ink">{t.contact}</a>
          </nav>
          <a
            href={signedIn === false ? "/login" : "/account"}
            aria-label={who}
            className="flex size-10 items-center justify-center gap-2 rounded-full border border-line bg-sheet text-sm font-semibold hover:border-ink md:size-auto md:px-3.5 md:py-1.5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
            {signedIn !== undefined && <span className="hidden whitespace-nowrap md:inline">{who}</span>}
          </a>
          <LangSwitcher lang={lang} onChange={setLang} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-2 md:px-8 md:pb-24">{children}</main>

      <footer className="bg-ink text-sm text-white/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 md:flex-row md:justify-between md:px-8">
          <span>© 2026 พีระพอส (PeerapoS)</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="/terms" className="whitespace-nowrap text-white/85 hover:text-white">{t.terms}</a>
            <a href="/privacy" className="whitespace-nowrap text-white/85 hover:text-white">{t.privacy}</a>
            <a href="/delete-account" className="whitespace-nowrap text-white/85 hover:text-white">{t.delete}</a>
            <a href={`mailto:${EMAIL}`} className="whitespace-nowrap text-white/85 hover:text-white">{EMAIL}</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
