"use client";

import { useEffect, useRef, useState } from "react";
import Shell from "@/components/account/Shell";
import Spinner from "@/components/account/Spinner";
import { api, type Msg } from "@/lib/api.ts";
import { useLang } from "@/lib/lang.ts";
import { clientIdError, GOOGLE_SCRIPT, googleError, SCRIPT_FAILED } from "@/lib/login.ts";
import { safeNext } from "@/lib/next.ts";

// One Google button, nothing else (owner: Google is the only sign-in on the website and Android).

const COPY = {
  th: {
    title: "เข้าสู่ระบบ",
    loading: "กำลังโหลดปุ่ม Google",
    accept: "เข้าสู่ระบบแปลว่ายอมรับ",
    terms: "ข้อกำหนด",
    and: "และ",
    privacy: "นโยบายความเป็นส่วนตัว",
  },
  en: {
    title: "Sign in",
    loading: "Loading the Google button",
    accept: "Signing in means you accept the",
    terms: "Terms",
    and: "and",
    privacy: "Privacy",
  },
};

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const SETUP = clientIdError(CLIENT_ID);

type Gis = {
  accounts: {
    id: {
      initialize(o: object): void;
      renderButton(el: HTMLElement, o: object): void;
    };
  };
};

const go = () => location.replace(safeNext(new URLSearchParams(location.search).get("next"), location.origin));

export default function Login() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const [signedIn, setSignedIn] = useState<boolean>();
  const [ready, setReady] = useState(false); // Google's script is loaded
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<Msg | null>(null);
  const box = useRef<HTMLDivElement>(null);
  // Google calls back outside React; this ref always holds the latest handler.
  const onCredential = useRef<(credential: string) => void>(() => {});

  onCredential.current = async (credential) => {
    setBusy(true);
    setMsg(null);
    const r = await api("/api/login/google", { method: "POST", body: { credential } });
    if (r.ok) return go(); // stays busy until the page leaves
    setBusy(false);
    setMsg(googleError(r));
  };

  useEffect(() => {
    document.title = `${t.title} · PeerapoS`;
  }, [t]);

  // already signed in: straight on to where they were going
  useEffect(() => {
    api("/api/me").then((r) => (r.ok ? go() : setSignedIn(false)));
  }, []);

  // load Google's script once; it stays for the life of the page
  useEffect(() => {
    if (SETUP) return;
    if ((window as unknown as { google?: Gis }).google) return setReady(true);
    const s = document.createElement("script");
    s.src = GOOGLE_SCRIPT;
    s.async = true;
    s.onload = () => setReady(true);
    s.onerror = () => setMsg(SCRIPT_FAILED);
    document.head.appendChild(s);
  }, []);

  // draw the button, again when the language changes (Google sets its wording at render time)
  useEffect(() => {
    const g = (window as unknown as { google?: Gis }).google;
    if (!ready || !g || !box.current) return;
    g.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (r: { credential: string }) => onCredential.current(r.credential),
    });
    g.accounts.id.renderButton(box.current, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "signin_with",
      shape: "pill",
      width: Math.min(box.current.clientWidth, 400) || 320,
      locale: lang,
    });
  }, [ready, lang]);

  const shown = SETUP ?? msg;

  return (
    <Shell lang={lang} setLang={setLang} signedIn={signedIn}>
      <div className="mx-auto mt-6 flex max-w-md flex-col gap-4">
        <h1 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight">{t.title}</h1>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-sheet p-5">
          <div ref={box} className="flex min-h-11 w-full justify-center" />
          {!SETUP && !ready && !msg && <p className="text-graphite">{t.loading}</p>}
          {busy && <Spinner />}
          {shown && (
            <p role="alert" className="text-center font-semibold text-red-700">
              {shown[lang]}
            </p>
          )}
          <p className="text-center text-sm text-graphite">
            {t.accept}{" "}
            <a href="/terms" className="font-semibold text-ink underline">{t.terms}</a> {t.and}{" "}
            <a href="/privacy" className="font-semibold text-ink underline">{t.privacy}</a>
          </p>
        </div>
      </div>
    </Shell>
  );
}
