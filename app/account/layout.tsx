import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "บัญชีของฉัน · PeerapoS",
  robots: { index: false, follow: false },
  // override the root layout's "/" canonical and og:url
  alternates: { canonical: "/account" },
  openGraph: { url: "/account" },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
