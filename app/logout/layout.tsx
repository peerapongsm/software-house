import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ออกจากระบบ · PeerapoS",
  robots: { index: false, follow: false },
  // override the root layout's "/" canonical and og:url
  alternates: { canonical: "/logout" },
  openGraph: { url: "/logout" },
};

export default function LogoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
