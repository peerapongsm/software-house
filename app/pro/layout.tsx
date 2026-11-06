import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PeerapoS Pro · ค่าสมาชิกเดียวทุกแอป",
  description: "PeerapoS Pro 159 บาทต่อเดือน หรือ 1,590 บาทต่อปี สมัครในแอป PeerapoS Go บน Google Play ใช้ได้กับทุกแอปในบัญชีเดียวกัน",
  // override the root layout's "/" canonical and og:url
  alternates: { canonical: "/pro" },
  openGraph: { url: "/pro" },
};

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return children;
}
