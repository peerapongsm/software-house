"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import AiCard from "@/components/account/AiCard.ts";
import { appName } from "@/components/account/BuyPicker";
import DeleteAccount from "@/components/account/DeleteAccount";
import Shell from "@/components/account/Shell";
import Spinner from "@/components/account/Spinner";
import { day, lastUsed, ownedPaid, pillText, proView, removedAll, type AccountData, type Device } from "@/lib/account.ts";
import type { Grant } from "@/lib/ai.ts";
import { api, API_BASE, type Licence, type Msg } from "@/lib/api.ts";
import { orderError } from "@/lib/buy.ts";
import { useLang, type Lang } from "@/lib/lang.ts";
import { PLAY_SUBS_URL } from "@/lib/pro.ts";

const COPY = {
  th: {
    title: "บัญชีของฉัน",
    out: "ออกจากระบบ",
    retry: "ลองอีกครั้ง",
    empty: "ยังไม่ได้ซื้ออะไร",
    choose: "เลือกแอป",
    noTier: "ยังไม่มี Pro",
    subscribe: "ดู PeerapoS Pro",
    manage: "จัดการใน Google Play",
    until: "ใช้ได้ถึง",
    name: "ชื่อ",
    id: "รหัสลูกค้า",
    apps: "แอปที่ซื้อแล้ว",
    noApps: "ยังไม่ได้ซื้อแอป",
    download: "ดาวน์โหลด",
    noFile: "ยังไม่มีไฟล์ติดตั้ง ลองใหม่ภายหลัง",
    tooMany: "ดาวน์โหลดถี่เกินไป รอ 1 นาทีแล้วลองใหม่",
    net: "เชื่อมต่อไม่ได้ ลองอีกครั้ง",
    buyApp: "ซื้อแอปเพิ่ม",
    pcs: "เครื่องที่เชื่อมไว้",
    noPcs: "เปิดแอป PeerapoS แล้วกด “เปิดใช้”",
    over: "เกินโควตา",
    remove: "ยกเลิก",
    resetKey: "รีเซ็ตกุญแจเครื่องนี้",
    keyReset: "รีเซ็ตแล้ว ปิดแล้วเปิดแอปบนเครื่องนี้ใหม่",
    removeAll: "ยกเลิกทุกเครื่อง",
    removeAllAsk: "ยกเลิกทุกเครื่องที่เชื่อมไว้ไหม เครื่องที่ยังใช้ต้องกด “เปิดใช้” ในแอปใหม่",
    replaced: "ถ้าแอปขึ้นว่า “ร้านนี้เปิดอยู่บนอีกเครื่อง” แต่เครื่องนั้นไม่ใช่ของคุณ กด “ยกเลิกทุกเครื่อง” แล้วเปิดใช้เครื่องของคุณใหม่",
  },
  en: {
    title: "My account",
    out: "Sign out",
    retry: "Try again",
    empty: "Nothing bought yet",
    choose: "Choose apps",
    noTier: "No Pro yet",
    subscribe: "See PeerapoS Pro",
    manage: "Manage in Google Play",
    until: "Valid until",
    name: "Name",
    id: "Customer ID",
    apps: "Apps you own",
    noApps: "No apps bought yet",
    download: "Download",
    noFile: "The installer isn't ready yet. Try again later.",
    tooMany: "Too many downloads. Wait a minute and try again.",
    net: "Can't connect. Try again.",
    buyApp: "Buy more apps",
    pcs: "Linked PCs",
    noPcs: "Open a PeerapoS app and press “Activate”",
    over: "Over limit",
    remove: "Remove",
    resetKey: "Reset this PC's key",
    keyReset: "Key reset. Close and reopen the app on this PC.",
    removeAll: "Remove all PCs",
    removeAllAsk: "Remove every linked PC? A PC you still use needs “Activate” in the app again.",
    replaced: "If the app says “This shop is open on another PC” and that PC isn't yours, press “Remove all PCs”, then activate your own PC again.",
  },
};

type T = (typeof COPY)["th"] | (typeof COPY)["en"];

const btn = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors whitespace-nowrap";
const dark = `${btn} min-h-[52px] px-6 py-3 bg-ink text-white hover:bg-indigo-deep`;
const out = `${btn} min-h-[52px] px-6 py-3 border border-ink/25 bg-sheet hover:border-ink`;
const outSm = `${btn} min-h-11 px-4 py-2 text-[0.9375rem] border border-ink/25 bg-sheet hover:border-ink`;
const sheet = "rounded-2xl border border-line bg-sheet p-5";
const cardTitle = "font-display text-xl font-bold leading-tight";
const TONE = { ok: "bg-green-100 text-green-700", warn: "bg-amber-100 text-amber-700", err: "bg-red-100 text-red-700" };

const Pill = ({ tone, children }: { tone: keyof typeof TONE; children: React.ReactNode }) => (
  <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[0.8125rem] font-bold ${TONE[tone]}`}>{children}</span>
);

const PcIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-7 shrink-0 text-graphite">
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </svg>
);

const Icon = ({ slug, size }: { slug: string; size: string }) => (
  <Image src={`/apps/${slug}.png`} alt="" width={96} height={96} className={`${size} shrink-0 rounded-[22%] shadow-tile`} />
);

function Empty({ t }: { t: T }) {
  return (
    <div className={`${sheet} mt-5 flex flex-col items-center gap-3 px-5 py-10 text-center`}>
      <div aria-hidden="true" className="flex gap-2">
        {["wash", "stock", "pos", "room", "account"].map((s) => (
          <Icon key={s} slug={s} size="size-10 lg:size-11" />
        ))}
      </div>
      <p className={cardTitle}>{t.empty}</p>
      <div className="flex flex-wrap justify-center gap-2">
        <a href="/buy" className={dark}>{t.choose}</a>
        <a href="/pro" className={out}>{t.subscribe}</a>
      </div>
    </div>
  );
}

function Plan({ t, lang, lic, now }: { t: T; lang: Lang; lic: Licence; now: number }) {
  const tier = lic.tier;
  const view = proView(tier ? { source: "play", until: tier.until } : null, now);
  return (
    <article className={`${sheet} flex flex-col gap-4`}>
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <p className="font-display text-[2rem] font-extrabold leading-[1.1] tracking-tight lg:text-[2.5rem]">
          {tier ? "PeerapoS Pro" : t.noTier}
        </p>
        {view.status && <Pill tone={view.status.tone}>{pillText(view.status)[lang]}</Pill>}
      </div>
      <dl className={`grid gap-3 rounded-xl bg-paper px-3.5 py-3 ${tier ? "grid-cols-2" : ""}`}>
        {tier && (
          <div>
            <dt className="text-[0.8125rem] text-graphite">{t.until}</dt>
            <dd className="font-bold">{day(tier.until, lang)}</dd>
          </div>
        )}
        <div className="min-w-0">
          <dt className="text-[0.8125rem] text-graphite">{t.name}</dt>
          <dd className="font-bold [overflow-wrap:anywhere]">{lic.name}</dd>
        </div>
      </dl>
      {(view.manage || view.subscribe) && (
        <div className="flex flex-wrap gap-2">
          {view.manage && (
            <a href={PLAY_SUBS_URL} target="_blank" rel="noopener noreferrer" className={out}>{t.manage}</a>
          )}
          {view.subscribe && <a href="/pro" className={dark}>{t.subscribe}</a>}
        </div>
      )}
      <p className="text-[0.8125rem] text-graphite">
        {t.id} <span className="whitespace-nowrap">{lic.id}</span>
      </p>
    </article>
  );
}

function Apps({ t, lic }: { t: T; lic: Licence }) {
  const apps = ownedPaid(lic.apps);
  const [dl, setDl] = useState<{ slug: string; msg: string } | null>(null);
  const [checking, setChecking] = useState<string | null>(null);
  // HEAD first: a missing installer, the rate limit or a lost session shows one line here, not a JSON tab
  async function download(e: MouseEvent<HTMLAnchorElement>, slug: string) {
    e.preventDefault();
    const href = e.currentTarget.href;
    setDl(null);
    setChecking(slug);
    let status = 0;
    try {
      status = (await fetch(href, { method: "HEAD", credentials: "include" })).status;
    } catch {}
    setChecking(null);
    if (status === 200) location.href = href;
    else if (status === 401) location.href = "/login?next=" + encodeURIComponent("/account");
    else setDl({ slug, msg: status === 404 ? t.noFile : status === 429 ? t.tooMany : t.net });
  }
  return (
    <article className={`${sheet} flex flex-col gap-4`}>
      <h2 className={cardTitle}>{t.apps}</h2>
      {apps.length ? (
        apps.map((slug) => (
          <div key={slug} className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Icon slug={slug} size="size-10" />
              <b className="min-w-0 flex-1">PeerapoS {appName(slug)}</b>
              <a href={`${API_BASE}/api/download/${slug}`} onClick={(e) => download(e, slug)} aria-busy={checking === slug} className={outSm}>
                {checking === slug && <Spinner />}
                {t.download}
              </a>
            </div>
            {dl?.slug === slug && <p role="alert" className="text-sm font-semibold text-red-700">{dl.msg}</p>}
          </div>
        ))
      ) : (
        <p className="text-sm text-graphite">{t.noApps}</p>
      )}
      <a href="/buy?app" className={`${outSm} self-start`}>{t.buyApp}</a>
    </article>
  );
}

function Pcs({
  t,
  lang,
  devices,
  limit,
  now,
  removing,
  err,
  note,
  keyDone,
  onRemove,
  onReset,
  onRemoveAll,
}: {
  t: T;
  lang: Lang;
  devices: Device[];
  limit: number;
  now: number;
  /** what is running: a PC id (remove), `key:<id>` (key reset) or `*` (remove all) */
  removing: string | null;
  err: Msg | null;
  note: Msg | null;
  /** the PC whose relay key was just reset */
  keyDone: string | null;
  onRemove: (id: string) => void;
  onReset: (id: string) => void;
  onRemoveAll: () => void;
}) {
  return (
    <article className={`${sheet} flex flex-col gap-4`}>
      <div className="flex items-start justify-between gap-3">
        <h2 className={cardTitle}>{t.pcs}</h2>
        <span className="text-sm tabular-nums text-graphite">
          {devices.length} / {limit}
        </span>
      </div>
      {devices.length > 0 && (
        <div className="flex flex-col gap-2 rounded-xl bg-paper px-3.5 py-3">
          <p className="text-sm text-graphite">{t.replaced}</p>
          <button type="button" disabled={removing !== null} onClick={onRemoveAll} className={`${outSm} self-start disabled:opacity-40`}>
            {removing === "*" && <Spinner />}
            {t.removeAll}
          </button>
        </div>
      )}
      {devices.length ? (
        devices.map((d) => (
          <div key={d.id} className="flex items-center gap-3">
            <PcIcon />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <b className="[overflow-wrap:anywhere]">{d.pc}</b>
                {d.over && <Pill tone="warn">{t.over}</Pill>}
              </span>
              <span className="block text-sm text-graphite">{lastUsed(d.lastSeen, now)[lang]}</span>
              {keyDone === d.id ? (
                <span role="status" className="block text-sm font-semibold text-green-700">{t.keyReset}</span>
              ) : (
                <button
                  type="button"
                  disabled={removing !== null}
                  onClick={() => onReset(d.id)}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo underline disabled:opacity-40"
                >
                  {removing === `key:${d.id}` && <Spinner />}
                  {t.resetKey}
                </button>
              )}
            </span>
            <button type="button" disabled={removing !== null} onClick={() => onRemove(d.id)} className={`${outSm} disabled:opacity-40`}>
              {removing === d.id && <Spinner />}
              {t.remove}
            </button>
          </div>
        ))
      ) : (
        <div className="flex items-center gap-3 text-graphite">
          <PcIcon />
          <span>{t.noPcs}</span>
        </div>
      )}
      {note && (
        <p role="status" className="font-semibold text-green-700">
          {note[lang]}
        </p>
      )}
      {err && (
        <p role="alert" className="font-semibold text-red-700">
          {err[lang]}
        </p>
      )}
    </article>
  );
}

// Signed-in only: plan, owned apps with their downloads, the PCs linked to this account and the AI apps connected to it.
export default function Account() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const [data, setData] = useState<AccountData | null>(null);
  const [now, setNow] = useState(0);
  const [err, setErr] = useState<Msg | null>(null);
  const [busy, setBusy] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [pcErr, setPcErr] = useState<Msg | null>(null);
  const [pcNote, setPcNote] = useState<Msg | null>(null);
  const [keyDone, setKeyDone] = useState<string | null>(null);
  const [grants, setGrants] = useState<Grant[] | null>(null);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [aiErr, setAiErr] = useState<Msg | null>(null);

  useEffect(() => {
    document.title = `${t.title} · PeerapoS`;
  }, [t]);

  async function load() {
    const r = await api<AccountData>("/api/account");
    if (r.ok) {
      setNow(Date.now());
      setData(r.data);
    } else if (r.status === 401) location.replace("/login?next=/account");
    return r;
  }

  async function start() {
    setErr(null);
    setBusy(true);
    const r = await load();
    setBusy(false);
    if (!r.ok && r.status !== 401) setErr(orderError(r));
  }

  async function loadGrants() {
    const r = await api<{ grants: Grant[] }>("/api/ai/grants");
    if (r.ok) setGrants(r.data.grants);
    else if (r.status === 401) location.replace("/login?next=/account");
    else setAiErr(orderError(r));
  }

  useEffect(() => {
    start();
    loadGrants();
  }, []);

  async function remove(id: string) {
    setPcErr(null);
    setPcNote(null);
    setKeyDone(null);
    setRemoving(id);
    const r = await api(`/api/devices/${encodeURIComponent(id)}/remove`, { method: "POST" });
    if (r.ok) {
      // the list changes ranks and over-limit marks, so take the server's view
      setData((d) => d && { ...d, devices: d.devices.filter((x) => x.id !== id) });
      await load();
    } else if (r.status === 401) location.replace("/login?next=/account");
    else setPcErr(orderError(r));
    setRemoving(null);
  }

  /** The PC may register a new relay key (lost with a Windows reinstall, spec §3.1). */
  async function resetKey(id: string) {
    setPcErr(null);
    setPcNote(null);
    setKeyDone(null);
    setRemoving(`key:${id}`);
    const r = await api(`/api/devices/${encodeURIComponent(id)}/relay-key/reset`, { method: "POST" });
    if (r.ok) setKeyDone(id);
    else if (r.status === 401) location.replace("/login?next=/account");
    else setPcErr(orderError(r));
    setRemoving(null);
  }

  /** "Not my PC" in an app ends here: every PC goes, and the relay closes their connections. */
  async function removeAll() {
    if (!confirm(t.removeAllAsk)) return;
    setPcErr(null);
    setPcNote(null);
    setKeyDone(null);
    setRemoving("*");
    const r = await api<{ removed: number }>("/api/devices/revoke-all", { method: "POST" });
    if (r.ok) {
      setPcNote(removedAll(r.data.removed));
      await load();
    } else if (r.status === 401) location.replace("/login?next=/account");
    else setPcErr(orderError(r));
    setRemoving(null);
  }

  async function revokeGrant(id: string) {
    setAiErr(null);
    setRevoking(id);
    const r = await api(`/api/ai/grants/${encodeURIComponent(id)}/revoke`, { method: "POST" });
    if (r.ok) setGrants((g) => g && g.filter((x) => x.id !== id));
    else if (r.status === 401) location.replace("/login?next=/account");
    else setAiErr(orderError(r));
    setRevoking(null);
  }

  const lic = data?.licence ?? null;

  return (
    <Shell lang={lang} setLang={setLang} signedIn={data ? true : undefined}>
      {err ? (
        <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-4 text-center">
          <p role="alert" className="font-semibold text-red-700">{err[lang]}</p>
          <button type="button" onClick={start} disabled={busy} className={out}>
            {busy && <Spinner />}
            {t.retry}
          </button>
        </div>
      ) : !data ? (
        <div className="mt-10 flex justify-center text-graphite">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight md:text-[2.75rem]">{t.title}</h1>
              <p className="mt-1.5 text-graphite [overflow-wrap:anywhere]">{data.email}</p>
            </div>
            <a href="/logout" className={outSm}>{t.out}</a>
          </div>
          {lic ? (
            <div className="mt-5 grid items-start gap-3.5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <Plan t={t} lang={lang} lic={lic} now={now} />
              <Apps t={t} lic={lic} />
              <Pcs
                t={t}
                lang={lang}
                devices={data.devices}
                limit={data.limit}
                now={now}
                removing={removing}
                err={pcErr}
                note={pcNote}
                keyDone={keyDone}
                onRemove={remove}
                onReset={resetKey}
                onRemoveAll={removeAll}
              />
              <AiCard lang={lang} grants={grants} revoking={revoking} err={aiErr} onRevoke={revokeGrant} spin={<Spinner />} />
            </div>
          ) : (
            <Empty t={t} />
          )}
          <DeleteAccount lang={lang} />
        </>
      )}
    </Shell>
  );
}
