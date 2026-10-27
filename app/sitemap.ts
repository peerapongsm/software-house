import type { MetadataRoute } from "next";
import { APPS, shotUrls } from "./apps-data";
import { SITE_URL } from "./site-info";

export const dynamic = "force-static";

// ponytail: lastModified = build time; every deploy is a content change on this one-page site.
const BUILT = new Date();

// Image sitemap entries so Google Images can find the share card, logo, app icons and screenshots.
const IMAGES = ["/og.jpg", "/logo.png", ...APPS.flatMap((a) => [a.icon, ...shotUrls(a)])].map((p) => SITE_URL + p);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: BUILT, changeFrequency: "weekly", priority: 1, images: IMAGES },
    { url: `${SITE_URL}/llms.txt`, lastModified: BUILT, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
