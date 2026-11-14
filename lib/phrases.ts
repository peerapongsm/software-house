export function splitPhrases(text: string): { text: string; thai: boolean }[] {
  return text.split(/( )/).filter(Boolean).map((text) => ({ text, thai: /[\u0E00-\u0E7F]/.test(text) }));
}
