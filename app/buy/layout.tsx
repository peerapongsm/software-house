import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เลือกสินค้า · PeerapoS",
  robots: { index: false, follow: false },
  // override the root layout's "/" canonical and og:url
  alternates: { canonical: "/buy" },
  openGraph: { url: "/buy" },
};

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
