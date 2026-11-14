import { downloadUrl, shotUrls, slugOf, type DesktopApp } from "../app/apps-data.ts";
import type { AppPage } from "../app/app-pages-data.ts";
import { SITE_URL } from "../app/site-info.ts";

export function appTitle(app: DesktopApp): string {
  return `${app.name} — ${app.th.tagline.replace(/\.$/, "")} | PeerapoS`;
}

export function appJsonLd(app: DesktopApp, page: AppPage) {
  const url = `${SITE_URL}/apps/${slugOf(app)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#app`,
        url,
        name: app.name,
        description: `${app.th.tagline} ${app.en.tagline}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows 10, Windows 11",
        screenshot: shotUrls(app).map(path => `${SITE_URL}${path}`),
        ...(app.price === undefined ? { downloadUrl: downloadUrl(app) } : {}),
        offers: app.price === undefined
          ? { "@type": "Offer", price: "0", priceCurrency: "THB" }
          : { "@type": "Offer", price: String(app.price), priceCurrency: "THB", url: `${SITE_URL}/buy?app=${app.id}`, availability: "https://schema.org/InStock" },
        author: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "FAQPage",
        mainEntity: [...page.th.faq, ...page.en.faq].map(({ q, a }) => ({
          "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "PeerapoS", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: app.name, item: url },
        ],
      },
    ] as const,
  };
}

export function isPlainClick(e: { button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean }): boolean {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}
