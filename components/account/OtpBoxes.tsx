"use client";

import { useEffect, useRef, useState } from "react";
import { fillBoxes } from "@/lib/otp.ts";

const EMPTY = ["", "", "", "", "", ""];
const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Six one-digit boxes. Calls `onComplete` once when the sixth digit lands (typed, pasted or autofilled).
 * `error`: bump it after a wrong answer; the boxes shake red, then clear. `good`: green before the redirect.
 * Remount (change `key`) for a new code.
 */
export default function OtpBoxes({
  onComplete,
  disabled,
  error = 0,
  good,
  label,
}: {
  onComplete: (code: string) => void;
  disabled?: boolean;
  error?: number;
  good?: boolean;
  label: string;
}) {
  const [boxes, setBoxes] = useState(EMPTY);
  const [bad, setBad] = useState(false);
  const group = useRef<HTMLDivElement>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const sent = useRef(false);

  // the boxes pop in one by one, and the first takes the focus
  useEffect(() => {
    inputs.current[0]?.focus();
    if (calm()) return;
    inputs.current.forEach((el, i) =>
      el?.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], {
        duration: 250,
        delay: i * 30,
        easing: "cubic-bezier(.22,1,.36,1)",
        fill: "backwards",
      }),
    );
  }, []);

  useEffect(() => {
    if (!error) return;
    setBad(true);
    if (!calm())
      group.current?.animate(
        [{ transform: "none" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "none" }],
        350,
      );
    const t = setTimeout(() => {
      setBad(false);
      setBoxes(EMPTY);
      sent.current = false;
      inputs.current[0]?.focus();
    }, 700);
    return () => clearTimeout(t);
  }, [error]);

  function put(next: string[], focus: number) {
    setBoxes(next);
    if (next.every((d) => d)) {
      if (sent.current) return;
      sent.current = true;
      inputs.current.forEach((el) => el?.blur());
      onComplete(next.join(""));
    } else inputs.current[focus]?.focus();
  }

  function onChange(i: number, v: string) {
    const cur = boxes[i];
    if (cur && v.length > 1) v = v.replace(cur, "");
    if (!v.replace(/\D/g, "")) {
      if (!v) put(boxes.map((d, k) => (k === i ? "" : d)), i);
      return;
    }
    const r = fillBoxes(boxes, i, v);
    put(r.boxes, r.focus);
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !boxes[i] && i > 0) {
      e.preventDefault();
      put(boxes.map((d, k) => (k === i - 1 ? "" : d)), i - 1);
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      inputs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < 5) {
      e.preventDefault();
      inputs.current[i + 1]?.focus();
    }
  }

  function onPaste(i: number, e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const r = fillBoxes(boxes, i, e.clipboardData.getData("text"));
    if (r.boxes.join("") !== boxes.join("")) put(r.boxes, r.focus);
  }

  const tone = (d: string) =>
    good
      ? "border-green-700 bg-green-100 text-green-700"
      : bad
        ? "border-red-700 bg-red-100"
        : disabled
          ? "border-line bg-paper text-line"
          : d
            ? "border-ink bg-sheet"
            : "border-line bg-sheet";

  return (
    <div ref={group} role="group" aria-label={label} className="grid grid-cols-6 gap-2">
      {boxes.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          value={d}
          onChange={(e) => onChange(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={(e) => onPaste(i, e)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          aria-label={String(i + 1)}
          className={`aspect-[4/5] min-h-14 w-full min-w-0 rounded-xl border-2 text-center font-display text-[1.75rem] font-bold tabular-nums caret-indigo transition-colors focus:border-ink focus:outline-none focus:ring-[3px] focus:ring-indigo/25 ${tone(d)}`}
        />
      ))}
    </div>
  );
}
