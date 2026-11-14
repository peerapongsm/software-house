import type { Metadata } from "next";

// Public account-deletion guide, linked from /account and the footers.
export const metadata: Metadata = {
  title: "ลบบัญชี · Delete account — PeerapoS",
  description: "How to delete your PeerapoS account on the website, what is removed, what stays, and what happens to Pro.",
  // override the root layout's "/" canonical and og:url
  alternates: { canonical: "/delete-account" },
  openGraph: { url: "/delete-account" },
};

export default function DeleteAccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
