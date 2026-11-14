"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { COPY, type Lang } from "@/app/copy";
import { downloadUrl, shotUrls, type DesktopApp } from "@/app/apps-data";

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

export function AppDetail({ app, lang, onClose, headingId, headingLevel = 1 }: { app: DesktopApp; lang: Lang; onClose?: () => void; headingId?: string; headingLevel?: 1 | 2 }) {
  const t = COPY[lang];
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <div className="p-5 sm:p-8">
      <div className="flex items-center gap-4">
        <Image src={app.icon} alt="" width={96} height={96} className="size-16 shrink-0 rounded-[22%]" />
        <div className="min-w-0">
          <Heading id={headingId} className="break-words font-display text-2xl font-bold sm:text-3xl">
            {app.name}
            {app.price !== undefined && (
              <span className="mt-1 block text-xl text-indigo sm:ml-3 sm:mt-0 sm:inline-block">
                ฿{app.price.toLocaleString("en-US")} <span className="text-sm font-semibold text-graphite">{t.oneTime}</span>
              </span>
            )}
          </Heading>
          <p className="text-lg text-graphite">{app[lang].tagline}</p>
        </div>
        {onClose && <button
          type="button"
          onClick={onClose}
          className="ml-auto shrink-0 self-start rounded-full border border-line px-5 py-2 font-semibold hover:border-ink"
        >
          {t.dl.close}
        </button>}
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

      <section aria-labelledby="app-pro-title">
        <h3 id="app-pro-title" className="mt-6 font-display text-lg font-bold">{t.dl.proTitle}</h3>
        <ul className="mt-2 grid list-disc gap-x-8 gap-y-1 pl-5 leading-relaxed text-graphite sm:grid-cols-2">
          {app[lang].pro.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <p className="mt-3 text-sm">
          <a href="/pro" className="font-semibold text-indigo underline underline-offset-4">{t.dl.proLink}</a>
        </p>
      </section>

      <h3 className="mt-6 font-display text-lg font-bold">{t.dl.guideTitle}</h3>
      {/* Numbers are written out (1, 2.1, 2.2 …) so sub-steps read the way they're spoken. */}
      <ol className="mt-3 grid gap-2 leading-relaxed">
        {(app.price !== undefined ? [[t.dl.paidFirstStep], ...t.dl.steps.slice(1)] : t.dl.steps).map(([step, ...subs], i) => (
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

      {app.price !== undefined ? (
        <a
          href={`/buy?app=${app.id}`}
          className="mt-6 block rounded-xl bg-ink px-6 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-indigo-deep"
        >
          {t.buy} ฿{app.price.toLocaleString("en-US")}
        </a>
      ) : (
      <a
        href={downloadUrl(app)}
        className="mt-6 block rounded-xl bg-ink px-6 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-indigo-deep"
      >
        {t.dl.button}
      </a>
      )}
    </div>
  );
}
