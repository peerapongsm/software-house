// /account card "AI ที่เชื่อมต่อ". Plain createElement, not JSX, so `node --test` can render it (lib/ai.test.ts):
// the client name comes from the AI app and must stay text.

import { createElement as h, type ReactNode } from "react";
import { grantOrigin, grantSince, scopeText, type Grant } from "../../lib/ai.ts";
import type { Msg } from "../../lib/api.ts";
import type { Lang } from "../../lib/lang.ts";

const COPY = {
  th: { title: "AI ที่เชื่อมต่อ", none: "ยังไม่มี AI ที่เชื่อมต่อ", revoke: "ตัดการเชื่อมต่อ" },
  en: { title: "Connected AI", none: "No AI connected yet", revoke: "Disconnect" },
};

// the same classes as the other /account cards
const outSm =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors whitespace-nowrap min-h-11 px-4 py-2 text-[0.9375rem] border border-ink/25 bg-sheet hover:border-ink";
const muted = "block text-sm text-graphite";

/** `grants` null = still loading (shows `spin`) or failed (`err`); `revoking` = the grant whose disconnect is running. */
export default function AiCard({
  lang,
  grants,
  revoking,
  err,
  onRevoke,
  spin,
}: {
  lang: Lang;
  grants: Grant[] | null;
  revoking: string | null;
  err: Msg | null;
  onRevoke: (id: string) => void;
  spin: ReactNode;
}) {
  const t = COPY[lang];
  const body =
    grants === null
      ? !err && h("div", { className: "flex justify-center text-graphite" }, spin)
      : grants.length === 0
        ? h("p", { className: "text-sm text-graphite" }, t.none)
        : grants.map((g) =>
            h(
              "div",
              { key: g.id, className: "flex items-center gap-3" },
              h(
                "span",
                { className: "min-w-0 flex-1" },
                h("b", { className: "block [overflow-wrap:anywhere]" }, g.client),
                h("span", { className: muted }, grantOrigin(g)[lang]),
                h("span", { className: muted }, `${grantSince(g)[lang]} · ${scopeText(g.scopes)[lang]}`),
              ),
              h(
                "button",
                { type: "button", disabled: revoking !== null, onClick: () => onRevoke(g.id), className: `${outSm} disabled:opacity-40` },
                revoking === g.id && spin,
                t.revoke,
              ),
            ),
          );
  return h(
    "article",
    { className: "flex flex-col gap-4 rounded-2xl border border-line bg-sheet p-5" },
    h("h2", { className: "font-display text-xl font-bold leading-tight" }, t.title),
    body,
    err && h("p", { role: "alert", className: "font-semibold text-red-700" }, err[lang]),
  );
}
