"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { appName } from "@/components/account/BuyPicker";
import Shell from "@/components/account/Shell";
import Spinner from "@/components/account/Spinner";
import { day, lastUsed, ownedPaid, pillText, type AccountData, type Device } from "@/lib/account.ts";
import { api, API_BASE, type Licence, type Msg } from "@/lib/api.ts";
import { orderError } from "@/lib/buy.ts";
import { useLang, type Lang } from "@/lib/lang.ts";
import { planStatus } from "@/lib/status.ts";

const COPY = {
  th: {
    title: "บัญชีของฉัน",
    out: "ออกจากระบบ",
    retry: "ลองอีกครั้ง",
    empty: "ยังไม่ได้ซื้ออะไร",
    choose: "เลือกสินค้า",
    noTier: "ยังไม่มี Pro",
    subscribe: "สมัคร Pro หรือ Max",
    until: "ใช้ได้ถึง",
    name: "ชื่อ",
    renew: "ต่ออายุ",
    upgrade: "อัปเกรดเป็น Max",
    id: "รหัสลูกค้า",
    apps: "แอปที่ซื้อแล้ว",
    noApps: "ยังไม่ได้ซื้อแอป",
    download: "ดาวน์โหลด",
    noFile: "ยังไม่มีไฟล์ติดตั้ง ลองใหม่ภายหลัง",
    tooMany: "ดาวน์โหลดถี่เกินไป รอ 1 นาทีแล้วลองใหม่",
    net: "เชื่อมต่อไม่ได้ ลองอีกครั้ง",
    buyApp: "ซื้อแอปเพิ่ม",
    pcs: "เครื่องที่เชื่อมไว้",
    noPcs: "เปิดแอป PeerapoS แล้วกด เปิดใช้",
    over: "เกินโควตา",
    remove: "ยกเลิก",
  },
  en: {
    title: "My account",
    out: "Sign out",
    retry: "Try again",
    empty: "Nothing bought yet",
    choose: "Choose product",
    noTier: "No Pro yet",
    subscribe: "Subscribe to Pro or Max",
    until: "Valid until",
    name: "Name",
    renew: "Renew",
    upgrade: "Upgrade to Max",
    id: "Customer ID",
    apps: "Apps you own",
    noApps: "No apps bought yet",
    download: "Download",
    noFile: "The installer isn't ready yet. Try again later.",
    tooMany: "Too many downloads. Wait a minute and try again.",
    net: "Can't connect. Try again.",
    buyApp: "Buy more apps",
    pcs: "Linked PCs",
    noPcs: "Open a PeerapoS app and press Activate",
    over: "Over limit",
    remove: "Remove",
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
      <a href="/buy" className={dark}>{t.choose}</a>
    </div>
  );
}

function Plan({ t, lang, lic, now }: { t: T; lang: Lang; lic: Licence; now: number }) {
  const tier = lic.tier;
  const st = tier && planStatus(tier.until, now);
  return (
    <article className={`${sheet} flex flex-col gap-4`}>
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-[2rem] font-extrabold leading-[1.1] tracking-tight lg:text-[2.5rem]">
          {tier ? `PeerapoS ${tier.t === "max" ? "Max" : "Pro"}` : t.noTier}
        </p>
        {st && <Pill tone={st.tone}>{pillText(st)[lang]}</Pill>}
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
      <div className="flex flex-wrap gap-2">
        {tier ? (
          <>
            <a href="/buy?renew" className={dark}>{t.renew}</a>
            {tier.t === "pro" && <a href="/buy?max" className={out}>{t.upgrade}</a>}
          </>
        ) : (
          <a href="/buy" className={dark}>{t.subscribe}</a>
        )}
      </div>
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
  onRemove,
}: {
  t: T;
  lang: Lang;
  devices: Device[];
  limit: number;
  now: number;
  removing: string | null;
  err: Msg | null;
  onRemove: (id: string) => void;
}) {
  return (
    <article className={`${sheet} flex flex-col gap-4`}>
      <div className="flex items-start justify-between gap-3">
        <h2 className={cardTitle}>{t.pcs}</h2>
        <span className="text-sm tabular-nums text-graphite">
          {devices.length} / {limit}
        </span>
      </div>
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
      {err && (
        <p role="alert" className="font-semibold text-red-700">
          {err[lang]}
        </p>
      )}
    </article>
  );
}

// Signed-in only: plan, owned apps with their downloads, and the PCs linked to this account.
export default function Account() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const [data, setData] = useState<AccountData | null>(null);
  const [now, setNow] = useState(0);
  const [err, setErr] = useState<Msg | null>(null);
  const [busy, setBusy] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [pcErr, setPcErr] = useState<Msg | null>(null);

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

  useEffect(() => {
    start();
  }, []);

  async function remove(id: string) {
    setPcErr(null);
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
                onRemove={remove}
              />
            </div>
          ) : (
            <Empty t={t} />
          )}
        </>
      )}
    </Shell>
  );
}
