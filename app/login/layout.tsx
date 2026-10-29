import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ · PeerapoS",
  robots: { index: false, follow: false },
  // override the root layout's "/" canonical and og:url
  alternates: { canonical: "/login" },
  openGraph: { url: "/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
