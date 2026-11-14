import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PeerapoS Pro · ค่าสมาชิกเดียวทุกแอป",
  description: "PeerapoS Pro: สำรองข้อมูลบน Google ตัวเชื่อม AI และฟีเจอร์อื่น ๆ",
  // override the root layout's "/" canonical and og:url
  alternates: { canonical: "/pro" },
  openGraph: { url: "/pro" },
};

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return children;
}
