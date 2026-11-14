import type { MetadataRoute } from "next";
import { IS_UAT, SITE_URL } from "./site-info";

export const dynamic = "force-static";

// Everyone welcome, AI crawlers included (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…):
// being quoted by AI answers is the point.
export default function robots(): MetadataRoute.Robots {
  if (IS_UAT) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
