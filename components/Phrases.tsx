import { splitPhrases } from "@/lib/phrases";

export function Phrases({ text }: { text: string }) {
  return <span>{splitPhrases(text).map((chunk, i) => chunk.wbr ? <wbr key={i} /> : chunk.thai
    ? <span key={i} className="inline-block max-w-full">{chunk.text}</span>
    : chunk.text)}</span>;
}
