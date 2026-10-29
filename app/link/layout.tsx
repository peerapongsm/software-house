import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เชื่อมเครื่อง · PeerapoS",
  robots: { index: false, follow: false },
  // override the root layout's "/" canonical and og:url
  alternates: { canonical: "/link" },
  openGraph: { url: "/link" },
};

export default function LinkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
