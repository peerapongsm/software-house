import { useEffect, useState } from "react";

export type Lang = "th" | "en";

const KEY = "pps-lang";

/** TH by default; the choice is remembered per browser. Storage can throw (private mode, blocked), so it is optional. */
export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, set] = useState<Lang>("th");

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "th" || v === "en") set(v);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(l: Lang) {
    set(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }

  return [lang, setLang];
}
