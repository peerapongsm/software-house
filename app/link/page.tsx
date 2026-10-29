"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Shell from "@/components/account/Shell";
import Spinner from "@/components/account/Spinner";
import { lastUsed, type AccountData, type Device } from "@/lib/account.ts";
import { api, type Msg } from "@/lib/api.ts";
import { orderError } from "@/lib/buy.ts";
import { useLang, type Lang } from "@/lib/lang.ts";
import { appInfo, askedAt, linkResult, typeCode, userCode } from "@/lib/link.ts";

const COPY = {
  th: {
    title: "เชื่อมเครื่อง",
    ask: "เชื่อมเครื่องนี้กับบัญชีของคุณ",
    code: "รหัสจากแอป",
    next: "ต่อไป",
    account: "บัญชี",
    approve: "เชื่อมเครื่องนี้",
    deny: "ไม่ใช่เครื่องของฉัน",
    full: "เครื่องเต็มแล้ว",
    fullHint: "ยกเลิกเครื่องที่ไม่ได้ใช้ แล้วกด “เชื่อมเครื่องนี้” อีกครั้ง",
    over: "เกินโควตา",
    remove: "ยกเลิก",
    nothing: "ยังไม่ได้ซื้ออะไร",
    choose: "เลือกสินค้า",
    linked: "เชื่อมแล้ว กลับไปที่แอปได้เลย",
    denied: "ยกเลิกแล้ว",
    gone: "รหัสนี้หมดอายุแล้ว กดเปิดใช้ในแอปอีกครั้ง",
    retry: "ลองอีกครั้ง",
  },
  en: {
    title: "Link a PC",
    ask: "Link this PC to your account",
    code: "Code from the app",
    next: "Next",
    account: "Account",
    approve: "Link this PC",
    deny: "Not my PC",
    full: "No PCs left",
    fullHint: "Remove a PC you no longer use, then press “Link this PC” again.",
    over: "Over limit",
    remove: "Remove",
    nothing: "Nothing bought yet",
    choose: "Choose product",
    linked: "Linked. You can go back to the app.",
    denied: "Cancelled",
    gone: "This code has expired. Press “Activate” in the app again.",
    retry: "Try again",
  },
};

type T = (typeof COPY)["th"] | (typeof COPY)["en"];

/** GET /api/device/request?code= */
type Req = { pc: string; app: string; createdAt: string };

type View =
  | { v: "load" }
  | { v: "fail"; msg: Msg }
  | { v: "enter" }
  | { v: "ask"; req: Req }
  | { v: "nothing" }
  | { v: "linked" }
  | { v: "denied" };

const btn = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors whitespace-nowrap";
const dark = `${btn} min-h-[52px] px-6 py-3 bg-ink text-white enabled:hover:bg-indigo-deep disabled:bg-ink/70`;
const out = `${btn} min-h-[52px] px-6 py-3 border border-ink/25 bg-sheet enabled:hover:border-ink disabled:text-graphite`;
const outSm = `${btn} min-h-11 px-4 py-2 text-[0.9375rem] border border-ink/25 bg-sheet enabled:hover:border-ink disabled:opacity-40`;
const sheet = "flex flex-col gap-4 rounded-2xl border border-line bg-sheet p-5";
const h1 = "font-display text-[2rem] font-bold leading-[1.15] tracking-tight";

const toLogin = () => location.replace(`/login?next=${encodeURIComponent("/link" + location.search)}`);

const PcIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-7 shrink-0 text-graphite">
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </svg>
);

const Line = ({ msg, lang }: { msg: Msg | null; lang: Lang }) =>
  msg && (
    <p role="alert" className="text-center font-semibold text-red-700">
      {msg[lang]}
    </p>
  );

/** The PCs already on the account, shown when it is full, with "ยกเลิก" on each. */
function FullList({
  t,
  lang,
  pcs,
  now,
  removing,
  onRemove,
}: {
  t: T;
  lang: Lang;
  pcs: { devices: Device[]; limit: number };
  now: number;
  removing: string | null;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-amber-100 p-3.5">
      <div className="flex items-start justify-between gap-3">
        <b className="text-amber-700">{t.full}</b>
        <span className="text-sm tabular-nums text-amber-700">
          {pcs.devices.length} / {pcs.limit}
        </span>
      </div>
      <p className="-mt-2 text-sm text-graphite">{t.fullHint}</p>
      {pcs.devices.map((d) => (
        <div key={d.id} className="flex items-center gap-3 rounded-xl bg-sheet p-3">
          <PcIcon />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <b className="[overflow-wrap:anywhere]">{d.pc}</b>
              {d.over && (
                <span className="whitespace-nowrap rounded-full bg-amber-100 px-2.5 py-0.5 text-[0.8125rem] font-bold text-amber-700">{t.over}</span>
              )}
            </span>
            <span className="block text-sm text-graphite">{lastUsed(d.lastSeen, now)[lang]}</span>
          </span>
          <button type="button" disabled={removing !== null} onClick={() => onRemove(d.id)} className={outSm}>
            {removing === d.id && <Spinner />}
            {t.remove}
          </button>
        </div>
      ))}
    </div>
  );
}

// Approve a PC that pressed "เปิดใช้" (device flow). Signed-in only; the code in ?code= is
// the capability, and the approval binds to whoever is signed in, so the email is on the card.
export default function LinkPc() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const [view, setView] = useState<View>({ v: "load" });
  const [email, setEmail] = useState("");
  const [field, setField] = useState("");
  const [code, setCode] = useState("");
  const [now, setNow] = useState(0);
  const [busy, setBusy] = useState<"next" | "approve" | "deny" | null>(null);
  const [err, setErr] = useState<Msg | null>(null);
  const [pcs, setPcs] = useState<{ devices: Device[]; limit: number } | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${t.title} · PeerapoS`;
  }, [t]);

  useEffect(() => {
    open();
  }, []);

  // keep "N นาทีก่อน" current while the card is up
  useEffect(() => {
    if (view.v !== "ask") return;
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, [view.v]);

  async function open() {
    setView({ v: "load" });
    const me = await api<{ email: string }>("/api/me");
    if (!me.ok) return me.status === 401 ? toLogin() : setView({ v: "fail", msg: orderError(me) });
    setEmail(me.data.email);
    const raw = new URLSearchParams(location.search).get("code");
    const c = userCode(raw);
    setField(typeCode(raw ?? ""));
    if (!c) return setView({ v: "enter" });
    const r = await request(c);
    if (r === "err") setView({ v: "enter" });
  }

  /** Load what asked for this code. On "gone" or an error the code field shows the one red line. */
  async function request(c: string): Promise<"ok" | "err"> {
    setErr(null);
    const r = await api<Req>(`/api/device/request?code=${encodeURIComponent(c)}`);
    const k = linkResult(r);
    if (k.kind === "out") {
      toLogin();
      return "ok";
    }
    if (r.ok) {
      setCode(c);
      setPcs(null);
      setNow(Date.now());
      setView({ v: "ask", req: r.data });
      return "ok";
    }
    setErr(k.kind === "err" ? k.msg : { th: COPY.th.gone, en: COPY.en.gone });
    return "err";
  }

  async function next() {
    const c = userCode(field);
    if (!c || busy) return;
    // the code goes in the URL, so a sign-in on the way or a reload comes back to it
    history.replaceState(null, "", `/link?code=${c}`);
    setBusy("next");
    await request(c);
    setBusy(null);
  }

  async function loadPcs() {
    const r = await api<AccountData>("/api/account");
    if (r.ok) {
      setNow(Date.now());
      setPcs({ devices: r.data.devices, limit: r.data.limit });
    } else if (r.status === 401) toLogin();
    else setErr(orderError(r));
  }

  async function decide(kind: "approve" | "deny") {
    if (busy || removing) return;
    setBusy(kind);
    setErr(null);
    const k = linkResult(await api(`/api/device/${kind}`, { method: "POST", body: { userCode: code } }));
    if (k.kind === "ok") setView({ v: kind === "approve" ? "linked" : "denied" });
    else if (k.kind === "out") toLogin();
    else if (k.kind === "gone") {
      setErr({ th: COPY.th.gone, en: COPY.en.gone });
      setView({ v: "enter" });
    } else if (k.kind === "nothing") setView({ v: "nothing" });
    else if (k.kind === "full") await loadPcs();
    else setErr(k.msg);
    setBusy(null);
  }

  async function remove(id: string) {
    setErr(null);
    setRemoving(id);
    const r = await api(`/api/devices/${encodeURIComponent(id)}/remove`, { method: "POST" });
    if (r.ok) {
      setPcs((p) => p && { ...p, devices: p.devices.filter((d) => d.id !== id) });
      await loadPcs();
    } else if (r.status === 401) toLogin();
    else setErr(orderError(r));
    setRemoving(null);
  }

  const done = (title: string, tone: "ok" | "plain") => (
    <div className={`${sheet} items-center px-5 py-10 text-center`}>
      {tone === "ok" && (
        <span className="grid size-14 place-items-center rounded-full bg-green-100 text-green-700" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-7">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
      )}
      <p className="font-display text-xl font-bold leading-tight">{title}</p>
    </div>
  );

  let body: React.ReactNode;
  if (view.v === "load") {
    body = (
      <div className="mt-10 flex justify-center text-graphite">
        <Spinner />
      </div>
    );
  } else if (view.v === "fail") {
    body = (
      <div className="mt-6 flex flex-col items-center gap-4 text-center">
        <Line msg={view.msg} lang={lang} />
        <button type="button" onClick={open} className={out}>
          {t.retry}
        </button>
      </div>
    );
  } else if (view.v === "enter") {
    const ok = userCode(field) !== null;
    body = (
      <>
        <h1 className={h1}>{t.title}</h1>
        <form
          className={sheet}
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
        >
          <div>
            <label htmlFor="code" className="mb-1.5 block font-semibold">{t.code}</label>
            <input
              id="code"
              autoComplete="off"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              placeholder="XXXX-XXXX"
              value={field}
              onChange={(e) => setField(typeCode(e.target.value))}
              className="min-h-14 w-full rounded-xl border border-line bg-sheet px-3.5 py-2.5 text-center font-display text-2xl font-bold tracking-[0.15em] tabular-nums placeholder:text-line focus:border-ink focus:outline-none focus:ring-[3px] focus:ring-indigo/25"
            />
          </div>
          <button disabled={!ok || busy !== null} className={`${dark} w-full`}>
            {busy === "next" && <Spinner />}
            {t.next}
          </button>
          <Line msg={err} lang={lang} />
        </form>
      </>
    );
  } else if (view.v === "ask") {
    const app = appInfo(view.req.app);
    body = (
      <>
        <h1 className={h1}>{t.ask}</h1>
        <div className={sheet}>
          <div className="flex items-center gap-3">
            {app.icon ? (
              <Image src={app.icon} alt="" width={96} height={96} className="size-12 shrink-0 rounded-[22%] shadow-tile" />
            ) : (
              <PcIcon />
            )}
            <div className="min-w-0">
              <p className="font-display text-xl font-bold leading-tight [overflow-wrap:anywhere]">{view.req.pc}</p>
              <p className="text-graphite">{app.name}</p>
            </div>
          </div>
          <p className="-mt-1 text-sm text-graphite">{askedAt(view.req.createdAt, now)[lang]}</p>
          <p className="rounded-xl bg-paper px-3.5 py-3">
            <span className="text-graphite">{t.account}: </span>
            <b className="[overflow-wrap:anywhere]">{email}</b>
          </p>
          {pcs && <FullList t={t} lang={lang} pcs={pcs} now={now} removing={removing} onRemove={remove} />}
          <button type="button" onClick={() => decide("approve")} disabled={busy !== null || removing !== null} className={`${dark} w-full`}>
            {busy === "approve" && <Spinner />}
            {t.approve}
          </button>
          <button type="button" onClick={() => decide("deny")} disabled={busy !== null || removing !== null} className={`${out} w-full`}>
            {busy === "deny" && <Spinner />}
            {t.deny}
          </button>
          <Line msg={err} lang={lang} />
        </div>
      </>
    );
  } else if (view.v === "nothing") {
    body = (
      <div className={`${sheet} items-center px-5 py-10 text-center`}>
        <p className="font-display text-xl font-bold leading-tight">{t.nothing}</p>
        <a href="/buy" className={dark}>{t.choose}</a>
      </div>
    );
  } else {
    body = view.v === "linked" ? done(t.linked, "ok") : done(t.denied, "plain");
  }

  return (
    <Shell lang={lang} setLang={setLang} signedIn={email ? true : undefined}>
      <div className="mx-auto mt-6 flex max-w-md flex-col gap-4">{body}</div>
    </Shell>
  );
}
