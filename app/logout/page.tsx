"use client";

import { useEffect, useRef, useState } from "react";
import Shell from "@/components/account/Shell";
import Spinner from "@/components/account/Spinner";
import { api } from "@/lib/api.ts";
import { useLang } from "@/lib/lang.ts";

const COPY = {
  th: { title: "ออกจากระบบ", fail: "ออกจากระบบไม่ได้ ลองอีกครั้ง", retry: "ลองอีกครั้ง" },
  en: { title: "Sign out", fail: "Couldn't sign out. Try again.", retry: "Try again" },
};

// Ends the session on the server, then home. A shared PC must not stay signed in quietly,
// so a failed call says so and offers a retry instead of leaving.
export default function Logout() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const [failed, setFailed] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    document.title = `${t.title} · PeerapoS`;
  }, [t]);

  async function out() {
    setFailed(false);
    const r = await api("/api/logout", { method: "POST" });
    // 401: no session left, which is what we wanted
    if (r.ok || r.status === 401) location.replace("/");
    else setFailed(true);
  }

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    out();
  }, []);

  return (
    <Shell lang={lang} setLang={setLang}>
      <div className="mx-auto mt-6 flex max-w-md flex-col gap-4">
        <h1 className="flex items-center gap-3 font-display text-[2rem] font-bold leading-[1.15] tracking-tight">
          {t.title}
          {!failed && <Spinner />}
        </h1>
        {failed && (
          <>
            <p role="alert" className="font-semibold text-red-700">{t.fail}</p>
            <button
              type="button"
              onClick={out}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-deep"
            >
              {t.retry}
            </button>
          </>
        )}
      </div>
    </Shell>
  );
}
