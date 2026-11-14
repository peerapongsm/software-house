// "|" in copy marks an extra allowed line break inside Thai text that has no space there (rendered as <wbr>).
export function splitPhrases(text: string): { text: string; thai: boolean; wbr?: true }[] {
  return text
    .split(/( |\|)/)
    .filter(Boolean)
    .map((text) => (text === "|" ? { text, thai: false, wbr: true } : { text, thai: /[฀-๿]/.test(text) }));
}
