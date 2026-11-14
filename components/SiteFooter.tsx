"use client";

import { useEffect, useState } from "react";
import { COPY, type Lang } from "@/app/copy";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = COPY[lang];
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
  );
}
