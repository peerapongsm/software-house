import type { Metadata } from "next";

// Public, no sign-in: Google Play asks for a web page that explains account deletion. Linked from /account and the footers.
export const metadata: Metadata = {
  title: "ลบบัญชี · Delete account — PeerapoS",
  description: "How to delete your PeerapoS account on the website or in the app, what is removed, what stays, and the Google Play subscription warning.",
  // override the root layout's "/" canonical and og:url
  alternates: { canonical: "/delete-account" },
  openGraph: { url: "/delete-account" },
};

export default function DeleteAccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
