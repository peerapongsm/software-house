// Six one-digit boxes for the email code. Pure input handling; the component owns focus and submit.

export const digitsFrom = (s: string) => s.replace(/\D/g, "").slice(0, 6);

/** Writes the digits typed or pasted at box `at`. A full six-digit paste fills every box from the first. */
export function fillBoxes(cur: string[], at: number, typed: string): { boxes: string[]; focus: number } {
  const d = digitsFrom(typed);
  const boxes = [...cur];
  if (!d) return { boxes, focus: at };
  const start = d.length === 6 ? 0 : at;
  for (let i = 0; i < d.length && start + i < 6; i++) boxes[start + i] = d[i];
  return { boxes, focus: Math.min(start + d.length, 5) };
}
