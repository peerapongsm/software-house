import Image from "next/image";

const SIZE = {
  sm: { img: "size-10 lg:size-11", text: "text-[0.6875rem]" },
  md: { img: "size-14", text: "text-[0.8125rem]" },
};

/** An app icon with its short name under it, like the home page's tile wall. Icons live at /apps/<slug>.png. */
export default function Tile({ slug, name, size = "sm" }: { slug: string; name: string; size?: "sm" | "md" }) {
  const s = SIZE[size];
  return (
    <span className="flex flex-col items-center gap-1 text-center">
      <Image src={`/apps/${slug}.png`} alt="" width={96} height={96} className={`${s.img} rounded-[22%] shadow-tile`} />
      <span className={`${s.text} font-semibold leading-tight text-graphite`}>{name}</span>
    </span>
  );
}
