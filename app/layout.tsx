import type { Metadata } from "next";
// Self-hosted via @fontsource so CI builds never fetch from Google Fonts.
import "@fontsource/bricolage-grotesque/latin-500.css";
import "@fontsource/bricolage-grotesque/latin-700.css";
import "@fontsource/bricolage-grotesque/latin-800.css";
// Looped Thai on purpose: the owner found loopless Thai faces hard to read.
import "@fontsource/ibm-plex-sans-thai-looped/thai-400.css";
import "@fontsource/ibm-plex-sans-thai-looped/thai-500.css";
import "@fontsource/ibm-plex-sans-thai-looped/thai-600.css";
import "@fontsource/ibm-plex-sans-thai-looped/thai-700.css";
import "@fontsource/ibm-plex-sans-thai-looped/latin-400.css";
import "@fontsource/ibm-plex-sans-thai-looped/latin-500.css";
import "@fontsource/ibm-plex-sans-thai-looped/latin-600.css";
import "@fontsource/ibm-plex-sans-thai-looped/latin-700.css";
import "./globals.css";
import { APPS, downloadUrl } from "./apps-data";
import { EMAIL, FAQ, FASTWORK_URL, LINE_URL, SERVICES, SITE_URL, TIKTOK_URL } from "./site-info";

const TITLE = "PeerapoS Software House | รับทำแอปและเขียนโปรแกรมตามสั่ง + โปรแกรมฟรีสำหรับ SME";
const DESCRIPTION =
  "Software house รับทำแอปและเขียนโปรแกรมตามสั่งสำหรับธุรกิจ ทั้งโปรแกรม Windows และเว็บแอป ระบบสต็อก ลูกค้า ใบสั่งงาน แจ้งซ่อม ใช้เวลาเป็นสัปดาห์ พร้อมโปรแกรมฟรีสำหรับ SME ใช้งานออฟไลน์";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "software house",
    "รับทำแอป",
    "รับเขียนโปรแกรม",
    "รับทำโปรแกรม",
    "รับทำแอปตามสั่ง",
    "custom application",
    "custom software development Thailand",
    "รับทำเว็บแอป",
    "โปรแกรมฟรี SME",
    "โปรแกรมสต็อกฟรี",
    "โปรแกรมร้านค้า",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "PeerapoS",
    title: TITLE,
    description: DESCRIPTION,
    locale: "th_TH",
    alternateLocale: ["en_US"],
    images: [{ url: "/apps/shots/stock-1.webp", width: 1920, height: 1080, alt: "PeerapoS Stock" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/apps/shots/stock-1.webp"] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
};

// schema.org graph for Google rich results and AI answer engines.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#org`,
      name: "PeerapoS",
      alternateName: "PeerapoS Software House",
      description: DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/apps/shots/stock-1.webp`,
      email: EMAIL,
      founder: { "@id": `${SITE_URL}/#peter` },
      areaServed: { "@type": "Country", name: "Thailand" },
      knowsLanguage: ["th", "en"],
      sameAs: [TIKTOK_URL, LINE_URL, FASTWORK_URL],
      priceRange: "฿500–฿4,500+",
      knowsAbout: ["Custom software development", "Custom application development", "Web applications", "Windows desktop applications", "Inventory systems", "CRM", "Manufacturing execution systems"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "รับทำแอปและเขียนโปรแกรมตามสั่ง (Custom app development)", serviceType: "Custom software development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "รับทำโปรแกรม Windows ใช้งานออฟไลน์ (Windows desktop apps)", serviceType: "Desktop application development" } },
          ...SERVICES.map((s) => ({
            "@type": "Offer",
            url: FASTWORK_URL,
            itemOffered: { "@type": "Service", name: `${s.th} (${s.en})`, serviceType: s.type },
            priceSpecification: { "@type": "UnitPriceSpecification", minPrice: s.price, priceCurrency: "THB", unitText: s.unit },
          })),
        ],
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#peter`,
      name: "Peerapong (Peter) Saksommon",
      alternateName: "พีระพงศ์ ศักดิ์สมมนต์",
      jobTitle: "Software Architect",
      worksFor: { "@type": "Organization", name: "Bank of Thailand" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Syracuse University" },
        { "@type": "CollegeOrUniversity", name: "University of Washington" },
      ],
      hasCredential: "Microsoft Certified: Azure Solutions Architect Expert",
      image: `${SITE_URL}/peter.webp`,
      url: `${SITE_URL}/#about`,
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: SITE_URL, name: "PeerapoS", inLanguage: ["th", "en"], publisher: { "@id": `${SITE_URL}/#org` } },
    {
      "@type": "FAQPage",
      mainEntity: [...FAQ.th, ...FAQ.en].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    ...APPS.map((a) => ({
      "@type": "SoftwareApplication",
      name: a.name,
      description: `${a.th.tagline} — ${a.en.tagline} ${a.en.description}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Windows 10, Windows 11",
      downloadUrl: downloadUrl(a),
      offers: { "@type": "Offer", price: "0", priceCurrency: "THB" },
      author: { "@id": `${SITE_URL}/#org` },
    })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }} />
        {children}
        {/* Cloudflare Web Analytics: cookieless visit counts (site is DNS-only, so no auto-inject). */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "11d043768e5c43f79ab5670c2cb322e8"}'
        />
      </body>
    </html>
  );
}
