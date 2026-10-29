"use client";

import { useEffect, useRef, useState } from "react";
import OtpBoxes from "@/components/account/OtpBoxes";
import Shell from "@/components/account/Shell";
import Spinner from "@/components/account/Spinner";
import { api, type Msg } from "@/lib/api.ts";
import { useLang } from "@/lib/lang.ts";
import { afterStart, afterVerify, clock, RESEND_S } from "@/lib/login.ts";
import { safeNext } from "@/lib/next.ts";

// No guidance text on this page (owner): heading, email, button, then the six boxes,
// one red line and the resend button. Errors are the only other words.

const COPY = {
  th: { title: "เข้าสู่ระบบ", email: "อีเมล", go: "เข้าสู่ระบบ", again: "ส่งรหัสอีกครั้ง", boxes: "รหัส 6 หลักที่ส่งไปทางอีเมล" },
  en: { title: "Sign in", email: "Email", go: "Sign in", again: "Send code again", boxes: "6-digit code sent by email" },
};

// Invisible Cloudflare Turnstile guards login/start; only when a site key is set.
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
type Turnstile = { render(el: HTMLElement, o: object): string; execute(id: string): void; reset(id: string): void };

const go = () => location.replace(safeNext(new URLSearchParams(location.search).get("next"), location.origin));

export default function Login() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const [signedIn, setSignedIn] = useState<boolean>();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<Msg | null>(null);
  const [round, setRound] = useState(0); // a new code remounts fresh boxes
  const [wrongTick, setWrongTick] = useState(0);
  const [dead, setDead] = useState(false);
  const [good, setGood] = useState(false);
  const [left, setLeft] = useState(0); // seconds until "send again"
  const span = useRef(RESEND_S);
  const wrongs = useRef(0);
  const inFlight = useRef(false);
  const tsBox = useRef<HTMLDivElement>(null);
  const ts = useRef<{ id?: string; done?: (token?: string) => void }>({});

  useEffect(() => {
    document.title = `${t.title} · PeerapoS`;
  }, [t]);

  // already signed in: straight on to where they were going
  useEffect(() => {
    api("/api/me").then((r) => (r.ok ? go() : setSignedIn(false)));
  }, []);

  useEffect(() => {
    if (!TURNSTILE_KEY) return;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => {
      const w = (window as unknown as { turnstile?: Turnstile }).turnstile;
      if (!w || !tsBox.current) return;
      ts.current.id = w.render(tsBox.current, {
        sitekey: TURNSTILE_KEY,
        execution: "execute",
        appearance: "interaction-only",
        callback: (token: string) => ts.current.done?.(token),
        "error-callback": () => ts.current.done?.(),
      });
    };
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  useEffect(() => {
    if (left <= 0) return;
    const id = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(id);
  }, [left]);

  /** A fresh Turnstile token, or undefined (no key, not loaded, failed: the server then decides). */
  function turnstileToken(): Promise<string | undefined> {
    const w = (window as unknown as { turnstile?: Turnstile }).turnstile;
    const id = ts.current.id;
    if (!TURNSTILE_KEY || !w || id === undefined) return Promise.resolve(undefined);
    return new Promise((resolve) => {
      const timer = setTimeout(() => ts.current.done?.(), 15000);
      ts.current.done = (token) => {
        clearTimeout(timer);
        ts.current.done = undefined;
        resolve(token);
      };
      w.reset(id);
      w.execute(id);
    });
  }

  async function send() {
    if (inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setMsg(null);
    const turnstile = await turnstileToken();
    const r = afterStart(await api("/api/login/start", { method: "POST", body: { email: email.trim(), turnstile } }));
    inFlight.current = false;
    setBusy(false);
    if (r.kind === "err") return setMsg(r.msg);
    if (r.kind === "sent") {
      setRound((n) => n + 1);
      setWrongTick(0);
      setDead(false);
      wrongs.current = 0;
    }
    setStep("code");
    span.current = r.wait;
    setLeft(r.wait);
  }

  async function verify(code: string) {
    if (inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setMsg(null);
    const r = afterVerify(await api("/api/login/verify", { method: "POST", body: { email: email.trim(), code } }), wrongs.current);
    inFlight.current = false;
    if (r.kind === "ok") {
      setGood(true);
      setTimeout(go, 450);
      return; // stays busy: boxes locked green until the page changes
    }
    setBusy(false);
    if (r.kind === "wrong") wrongs.current++;
    if (r.kind === "dead") setDead(true);
    setMsg(r.msg);
    setWrongTick((n) => n + 1);
  }

  const btn = "relative inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-colors";

  return (
    <Shell lang={lang} setLang={setLang} signedIn={signedIn}>
      <div className="mx-auto mt-6 flex max-w-md flex-col gap-4">
        <h1 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight">{t.title}</h1>
        <form
          className="flex flex-col gap-4 rounded-2xl border border-line bg-sheet p-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === "email") send();
          }}
        >
          <div>
            <label htmlFor="em" className="mb-1.5 block font-semibold">{t.email}</label>
            <input
              id="em"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={step === "code"}
              className="min-h-12 w-full rounded-xl border border-line bg-sheet px-3.5 py-2.5 [overflow-wrap:anywhere] focus:border-ink focus:outline-none focus:ring-[3px] focus:ring-indigo/25 read-only:border-transparent read-only:bg-paper read-only:text-graphite"
            />
          </div>

          {step === "email" ? (
            <button disabled={busy} className={`${btn} bg-ink text-white hover:bg-indigo-deep disabled:bg-ink/70`}>
              {busy && <Spinner />}
              {t.go}
            </button>
          ) : (
            <OtpBoxes key={round} label={t.boxes} onComplete={verify} disabled={busy || dead} error={wrongTick} good={good} />
          )}
          {TURNSTILE_KEY && <div ref={tsBox} />}

          {msg && (
            <p role="alert" className="-mt-1 text-center font-semibold text-red-700">
              {msg[lang]}
            </p>
          )}

          {step === "code" && (
            <button
              type="button"
              onClick={send}
              disabled={left > 0 || busy}
              className={`${btn} overflow-hidden border border-ink/25 bg-sheet enabled:hover:border-ink disabled:text-graphite`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left bg-paper transition-transform duration-1000 ease-linear"
                style={{ transform: `scaleX(${left / span.current})` }}
              />
              <span className="relative">{t.again}</span>
              {left > 0 && <span className="relative tabular-nums text-graphite">{clock(left)}</span>}
            </button>
          )}
        </form>
      </div>
    </Shell>
  );
}
